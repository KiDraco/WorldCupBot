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

bot.command("rep", (ctx) => {
  const input = ctx.message.text.replace("/rep", "").trim();

  if (!input) {
    return ctx.reply("Ejemplo:\n/rep ARG1 ARG2 ARG2 BRA5 BRA5");
  }

  const items = input.split(/\s+/);
  const counts = {};

  items.forEach(id => {
    counts[id] = (counts[id] || 0) + 1;
  });

  const repetidas = Object.entries(counts)
    .filter(([id, count]) => count > 1)
    .map(([id, count]) => `${id} ×${count}`);

  if (repetidas.length === 0) {
    return ctx.reply("No tenés repetidas");
  }

  ctx.reply("🔄 Repetidas:\n" + repetidas.join("\n"));
});

bot.launch();

console.log("🤖 Bot iniciado");
