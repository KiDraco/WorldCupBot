const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

// ─────────────────────────────
// START
// ─────────────────────────────
bot.start((ctx) => {
  ctx.reply("🏆 Bienvenido al álbum");
});

// ─────────────────────────────
// REPETIDAS
// ─────────────────────────────
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

// ─────────────────────────────
// INICIAR BOT
// ─────────────────────────────
bot.launch();
