const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('process.env.BOT_TOKEN)');

bot.start((ctx) => {
  console.log("START recibido");

  ctx.reply("🏆 Funciona");
});

bot.launch();
console.log("Bot iniciado");
