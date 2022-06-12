const BaseCommand = require('../../utils/structures/BaseCommand');
const fetch = require('node-fetch');
const Discord = require('discord.js');


module.exports = class CatCommand extends BaseCommand {
  constructor() {
    super('meme', 'Fun', []);
  }

  async run(client, message, args) {
    fetch('https://meme-api.herokuapp.com/gimme')
      .then(res => res.json())
      .then(async json => {
        const memeEmbed = new Discord.MessageEmbed()
          .setTitle(json.title)
          .setImage(json.url)
          .setColor('9136bf')
          .setFooter(`Link: ${json.postLink} | Subreddit: ${json.subreddit}`);

        let msg = await message.channel.send('Meme!');
        msg.edit(memeEmbed);
      })
  }
}