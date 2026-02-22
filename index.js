const express = require("express");
const app = express();

// IMPORTANT
app.use(express.json());

// Page de test
app.get("/", (req, res) => {
  res.send("Bot WhatsApp actif ✅");
});

// ✅ VALIDATION WEBHOOK (OBLIGATOIRE)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "monbot123"; // EXACTEMENT le même que dans Meta

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook validé ✅");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ✅ RÉCEPTION DES MESSAGES
app.post("/webhook", (req, res) => {
  console.log("Message reçu :", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Serveur lancé sur le port", PORT);
});
