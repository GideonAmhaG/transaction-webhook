const express = require("express");
const bodyParser = require("body-parser");
const webhookRoutes = require("./routes/webhook");

const app = express();

app.use(bodyParser.json());

app.use("/webhook", webhookRoutes);

app.get("/", (req, res) => {
  res.json({ message: "YaYa Wallet Webhook Service" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
