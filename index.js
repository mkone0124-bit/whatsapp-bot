const express = require("express");
const app = express();

const VERIFY_TOKEN = "test123";

// 🔹 Route de vérification Meta (OBLIGATOIRE)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// 🔹 Route simple pour test
app.get("/", (req, res) => {
  res.send("Serveur actif ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Serveur lancé sur le port", PORT);
});
