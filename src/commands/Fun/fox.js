const BaseCommand = require('../../utils/structures/BaseCommand');
const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');

module.exports = class DogCommand extends BaseCommand {
  constructor() {
    super('fox', 'Fun', []);
  }

  async run(client, message, args) {
    try {
        const res = await fetch('https://randomfox.ca/floof/');
        const img = (await res.json()).image;
        const embed = new MessageEmbed()
          .setTitle('🦊  Fox!  🦊')
          .setImage(img)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor('9136bf');
        message.channel.send(embed);
      } catch (err) {
        message.client.logger.error(err.stack);
        this.sendErrorMessage(message, 1, 'Please try again in a few seconds', err.message);
      }
  }
}
