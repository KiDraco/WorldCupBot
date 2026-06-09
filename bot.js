const express = require("express");
const { Telegraf } = require("telegraf");

// ─────────────────────────────
// EXPRESS (obligatorio en Render Web Service)
// ─────────────────────────────
const app = express();

app.get("/", (req, res) => {
  res.send("🏆 Bot WorldCup 2026 activo");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("🌐 HTTP server listo");
});

// ─────────────────────────────
// TELEGRAM BOT
// ─────────────────────────────
const bot = new Telegraf(process.env.BOT_TOKEN);

// START
bot.start((ctx) => {
  console.log("START recibido");

  ctx.reply(
    "🏆 Bienvenido al Álbum Panini 2026\n\nUsá el botón para abrir tu álbum 👇",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "📘 Abrir Álbum",
              web_app: {
                url: "https://TU-URL-DE-NETLIFY.com"
              }
            }
          ]
        ]
      }
    }
  );
});

// TEST mensaje
bot.on("message", (ctx) => {
  console.log("MENSAJE:", ctx.message.text);
});

// ─────────────────────────────
// START BOT
// ─────────────────────────────
bot.launch();

console.log("🤖 Bot iniciado");
