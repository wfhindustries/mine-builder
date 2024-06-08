const mineflayer = require('mineflayer')
const { Authflow, Titles } = require('prismarine-auth')

// const bot = mineflayer.createBot({
//   host: 'localhost', // minecraft server ip
//   username: 'daddyfatsweater', // username to join as if auth is `offline`, else a unique identifier for this account. Switch if you want to change accounts
//   auth: 'microsoft', // for offline mode servers, you can set this to 'offline'
//   port: 25565,              // set if you need a port that isn't 25565
//   version: false,           // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
//   password: '12345678'      // set if you want to use password-based auth (may be unreliable). If specified, the `username` must be an email
// })

async function doAuth (username, cacheDir) {
    const flow = new Authflow(username, cacheDir, { authTitle: Titles.MinecraftNintendoSwitch, deviceType: 'Nintendo', flow: 'live' })
    const response = await flow.getMinecraftJavaToken({ fetchEntitlements: true, fetchProfile: true, fetchCertificates: true })
    return response
  }

const username = 'daddyfatsweater';
const cacheDir = './cache';

doAuth(username, cacheDir).then((response) => {
    console.log(response)
    const bot = mineflayer.createBot({
        host: 'mc', // minecraft server ip
        username: username, // username to join as if auth is `offline`, else a unique identifier for this account. Switch if you want to change accounts
        auth: response, // for offline mode servers, you can set this to 'offline'
        port: 25565,              // set if you need a port that isn't 25565
        //version: false,           // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
        // password: '12345678'      // set if you want to use password-based auth (may be unreliable). If specified, the `username` must be an email
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return
        bot.chat(message)
      });
      
      // Log errors and kick reasons:
      bot.on('kicked', console.log);
      bot.on('error', console.log);
}).catch((error) => {
    console.log(error)
});
  

