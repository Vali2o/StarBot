const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const { token } = require('../../../config.json')
const { ownerId } = require('../../../config.json')

module.exports = class RestartCommand extends BaseCommand {
  constructor() {
    super('restart', 'Owner', []);
  }

  run(client, message, args) {

    const iderrorembed = new Discord.MessageEmbed()
    .setColor('9136bf')
    .setDescription(`**You can't do this. Only the owner of the bot can do this!**`)

    if(message.author.id != ownerId) return message.channel.send(iderrorembed)

    try {

      const restartsuccembed = new Discord.MessageEmbed()
        .setColor('9136bf')
        .setDescription('> ✅ Restart Successful')

      const restartingEmbed = new Discord.MessageEmbed()
        .setColor('9136bf')
        .setDescription('> ⚙ Restarting...')

      const errorEmbed = new Discord.MessageEmbed()
      .setColor('9136bf')
      .setDescription('> ❌ An error occurred, please try again!')

      message.channel.send(restartingEmbed).then(msg => msg.delete({ timeout: 300 }))
        .then(() => client.destroy())
        .then(() => client.login(token))
        .then(() => message.channel.send(restartsuccembed));
    }
    catch (e) {
      return message.channel.send(
        errorEmbed,
      );
    }
  }
}