const express = require("express");
const app = express();

app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.send("Bot WhatsApp actif ✅");
});

// 🔑 Webhook Meta (obligatoire)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "test123";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook vérifié ✅");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Serveur lancé sur le port", PORT);
});
