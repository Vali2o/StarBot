const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run(client) {

    const serverIn = await client.guilds.cache.size;
    console.log('[INFO] ' + client.user.tag + ' has logged in.');
    console.log(`[INFO] The bot is in ${serverIn} servers.`)

    function pickStatus() {
      let status = ["How I'm updating!", "star-bot.gq"];
      let Status = Math.floor(Math.random() * status.length);
      client.user.setActivity(status[Status], {
        type: "WATCHING"
      })
    };
    setInterval(pickStatus, 5000);
  } catch (err) {
    console.log(err);

  }
}

//       let status = ['s!help - star-bot.gq', 's!update',
//`${serverIn} servers`
//];