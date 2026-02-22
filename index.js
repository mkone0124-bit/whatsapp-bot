const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Bot WhatsApp actif ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Serveur lancé sur le port", PORT);
});const express = require("express");
const app = express();

const VERIFY_TOKEN = "test123";

// Route principale (optionnelle)
app.get("/", (req, res) => {
  res.send("Bot WhatsApp actif ✅");
});

// 🔴 ROUTE OBLIGATOIRE POUR META
app.get("/webhook", (req, res) => {
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
