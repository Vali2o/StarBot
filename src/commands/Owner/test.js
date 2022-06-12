const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { ownerId } = require('../../../config.json')

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'Owner', []);
  }

  run(client, message, args) {

    const iderrorembed = new MessageEmbed()
    .setColor('9136bf')
    .setDescription(`**You can't do this. Only the owner of the bot can do this!**`)

    if(message.author.id != ownerId) return message.channel.send(iderrorembed)

    const embed = new MessageEmbed()
    .setTitle('I am working!')
    .setColor('9136bf')
    .setImage('https://media.giphy.com/media/gw3IWyGkC0rsazTi/200.gif');
  message.channel.send(embed);
  }
}