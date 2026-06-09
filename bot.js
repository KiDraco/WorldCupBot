console.log("PROBANDO TOKEN...");

fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getMe`)
  .then(r => r.json())
  .then(res => console.log("RESULTADO GETME:", res))
  .catch(err => console.log("ERROR:", err));
