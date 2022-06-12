const BaseCommand = require('../../utils/structures/BaseCommand');
const { ownerId } = require('../../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = class ShutdownCommand extends BaseCommand {
  constructor() {
    super('shutdown', 'Owner', ['exit', 'stop']);
  }

  async run(client, message, args) {
    const iderrorembed = new MessageEmbed()
    .setColor('9136bf')
    .setDescription(`**You can't do this. Only the owner of the bot can do this!**`)

    if (message.author.id != ownerId) return message.channel.send(iderrorembed)

    try {

      const shutdownEmbed = new MessageEmbed()
      .setColor('9136bf')
      .setDescription('> 😢 Shutting down...')

      await message.channel.send(shutdownEmbed);
      process.exit();
    } catch (e) {
      return message.channel.send(`ERROR: ${e.message}`);
    }
  }
}