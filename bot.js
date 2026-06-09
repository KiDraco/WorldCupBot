const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

async function startBot() {
  try {
    console.log("Iniciando bot...");

    await bot.launch();

    console.log("Bot iniciado correctamente");
  } catch (err) {
    console.error("ERROR EN LAUNCH:", err);
  }
}

// cerrar bien procesos en Render
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

startBot();
