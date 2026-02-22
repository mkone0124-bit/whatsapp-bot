const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// ==============================
// CONFIG (Render → Environment)
// ==============================
const VERIFY_TOKEN = process.env.VERIFY_TOKEN; // ex: mon_token_123
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN; // Token Meta
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID; // ID numéro WhatsApp

// ==============================
// ROUTE TEST (optionnelle)
// ==============================
app.get("/", (req, res) => {
  res.send("Bot WhatsApp actif ✅");
});

// ==============================
// VERIFICATION WEBHOOK (OBLIGATOIRE)
// ==============================
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook vérifié");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ==============================
// RECEPTION DES MESSAGES
// ==============================
app.post("/webhook", async (req, res) => {
  try {
    const entry = req.body.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const message = value?.messages?.[0];

    if (message) {
      const from = message.from;

      console.log("📩 Message reçu de :", from);

      // REPONSE AUTOMATIQUE
      await axios.post(
        `https://graph.facebook.com/v25.0/${PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: "whatsapp",
          to: from,
          text: { body: "Bonjour 👋" }
        },
        {
          headers: {
            Authorization: `Bearer ${WHATSAPP_TOKEN}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("✅ Réponse envoyée");
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Erreur webhook :", err.response?.data || err.message);
    res.sendStatus(200);
  }
});

// ==============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Serveur lancé sur le port", PORT);
});
