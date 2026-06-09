const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('process.env.BOT_TOKEN)');

bot.start((ctx) => {
  ctx.reply(
    '🏆 Manager Album WorldCup 2026',
    Markup.inlineKeyboard([
      Markup.button.webApp(
        '📘 Abrir Álbum',
        'https://gestoralbummundial2026.netlify.app/'
      )
    ])
  );
});

bot.launch();