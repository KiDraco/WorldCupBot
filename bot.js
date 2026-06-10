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

  const text = ctx.message.text
    .replace(/\/rep(@\w+)?/, "")
    .trim();

  if (!text) {
    return ctx.reply(
`Ejemplo:

/rep
ARG: 1,2,2,5
BRA: 10,10,20`
    );
  }

  const counts = {};

  text.split("\n").forEach(line => {

    const parts = line.split(":");

    if (parts.length < 2) return;

    const code = parts[0]
      .trim()
      .split(" ")[0];

    const nums = parts[1]
      .split(",")
      .map(x => x.trim())
      .filter(Boolean);

    nums.forEach(n => {

      const sticker = `${code}${n}`;

      counts[sticker] =
        (counts[sticker] || 0) + 1;

    });

  });

  const rep = Object.entries(counts)
    .filter(([_, c]) => c > 1)
    .map(([id, c]) => `${id} ×${c}`);

  ctx.reply(
    rep.length
      ? rep.join("\n")
      : "No hay repetidas"
  );

});

bot.on("message", (ctx) => {
  console.log("MENSAJE:", ctx.message.text);
});

bot.launch();

console.log("🤖 Bot iniciado");
