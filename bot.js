const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

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

bot.on("message", (ctx) => {
  console.log("MENSAJE:", ctx.message.text);
});

bot.launch();

console.log("🤖 Bot iniciado");
