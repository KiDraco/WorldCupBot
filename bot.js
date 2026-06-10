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

bot.command("rep", (ctx) => {
  console.log("REP RECIBIDO");
  ctx.reply("OK");
});

bot.on("message", (ctx) => {
  console.log("MENSAJE:", ctx.message.text);
});

bot.command("rep", (ctx) => {
  console.log("REP RECIBIDO");

  const text = ctx.message.text || "";
  const input = text.replace(/\/rep(@\w+)?/, "").trim();

  if (!input) {
    return ctx.reply("Ej: /rep ARG1 ARG2 ARG2");
  }

  const items = input.split(/\s+/);
  const counts = {};

  items.forEach(id => {
    counts[id] = (counts[id] || 0) + 1;
  });

  const rep = Object.entries(counts)
    .filter(([id, c]) => c > 1)
    .map(([id, c]) => `${id} ×${c}`);

  ctx.reply(rep.length ? rep.join("\n") : "No hay repetidas");
});

bot.launch();

console.log("🤖 Bot iniciado");
