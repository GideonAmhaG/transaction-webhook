require("dotenv").config();
const crypto = require("crypto");

// Generate a unique ID using timestamp
const uniqueId = `test_${Date.now()}`;
const timestamp = Math.floor(Date.now() / 1000) + 120;

const payload = {
  id: uniqueId, // Use the unique ID instead of static "test123"
  amount: 100.5,
  currency: "USD",
  created_at_time: timestamp,
  timestamp: timestamp,
  cause: "payment",
  full_name: "John Doe",
  account_name: "johndoe",
  invoice_url: "https://example.com/invoice/123",
};

const SECRET_KEY = process.env.WEBHOOK_SECRET_KEY;

const signedPayload = Object.values(payload)
  .map((val) => (typeof val === "number" ? val.toString() : val))
  .join("");

const signature = crypto
  .createHmac("sha256", SECRET_KEY)
  .update(signedPayload)
  .digest("hex");

console.log("=== Copy these exact values to Insomnia ===\n");
console.log("1. Add Header:");
console.log("   Name: yaya-signature");
console.log("   Value:", signature);
console.log("\n2. Request Body (copy the entire object):");
console.log(JSON.stringify(payload, null, 2));
