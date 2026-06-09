const { Telegraf } = require("telegraf");
const http = require("http");

// ────────────────
// PORT (OBLIGATORIO EN RENDER WEB SERVICE)
// ────────────────
http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Bot running");
}).listen(process.env.PORT || 3000);

// ────────────────
// BOT
// ────────────────
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("🏆 Álbum Panini 2026", {
    reply_markup: {
      inline_keyboard: [[
        {
          text: "📘 Abrir Álbum",
          web_app: { url: "https://gestoralbummundial2026.netlify.app/" }
        }
      ]]
    }
  });
});

bot.on("message", (ctx) => {
  console.log("MENSAJE:", ctx.message.text);
});

bot.launch();

console.log("🤖 Bot iniciado");
