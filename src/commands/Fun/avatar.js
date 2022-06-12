const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class AvatarCommand extends BaseCommand {
  constructor() {
    super('avatar', 'Fun', ['av']);
  }

  run(client, message, args) {
    let member = message.mentions.users.first() || message.author

    let avatar = member.displayAvatarURL({ size: 1024 })

    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.author.tag}'s Avatar`)
      .setImage(avatar)
      .setColor("9136bf")

    message.channel.send(embed);
  }
}