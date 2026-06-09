const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

// ─────────────────────────────
// START
// ─────────────────────────────
bot.start((ctx) => {
  console.log("START recibido");

  ctx.reply(
    "🏆 Bienvenido al Álbum Panini 2026",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "📘 Abrir Álbum",
              web_app: {
                url: "https://gestoralbummundial2026.netlify.app/"
              }
            }
          ]
        ]
      }
    }
  );
});

// ─────────────────────────────
// LOG mensajes (debug)
// ─────────────────────────────
bot.on("message", (ctx) => {
  console.log("MENSAJE:", ctx.message.text);
});

// ─────────────────────────────
// ANTI 409 / START SEGURO
// ─────────────────────────────
async function startBot() {
  try {
    console.log("🤖 Iniciando bot...");

    // evita conflictos de polling viejos
    await bot.telegram.deleteWebhook({ drop_pending_updates: true });

    await bot.launch();

    console.log("✅ Bot iniciado correctamente");
  } catch (err) {
    console.error("❌ Error iniciando bot:", err);
  }
}

// ─────────────────────────────
// shutdown seguro (Render)
// ─────────────────────────────
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

// ─────────────────────────────
// START
// ─────────────────────────────
startBot();
