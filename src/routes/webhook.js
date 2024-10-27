const express = require("express");
const crypto = require("crypto");
const { WebhookPayload } = require("../models");

const router = express.Router();

const SECRET_KEY = process.env.WEBHOOK_SECRET_KEY;
const TOLERANCE_SECONDS = 300; // 5 minutes

function verifySignature(payload, signature) {
  const signedPayload = Object.values(payload).join("");
  const expectedSignature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(signedPayload)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(signature)
  );
}

router.post("/", async (req, res) => {
  const payload = req.body;
  const signature = req.headers["yaya-signature"];

  if (!signature) {
    return res.status(400).json({ error: "Missing YAYA-SIGNATURE header" });
  }

  if (!verifySignature(payload, signature)) {
    return res.status(400).json({ error: "Invalid signature" });
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const payloadTime = payload.timestamp;

  if (Math.abs(currentTime - payloadTime) > TOLERANCE_SECONDS) {
    return res.status(400).json({ error: "Timestamp out of tolerance" });
  }

  try {
    await WebhookPayload.create({
      ...payload,
      received_at: new Date(),
    });

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
