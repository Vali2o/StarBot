const BaseCommand = require('../../utils/structures/BaseCommand');
const {MessageEmbed} = require('discord.js');

module.exports = class InviteCommand extends BaseCommand {
  constructor() {
    super('invite', 'Info', ['inv', 'in']);
  }

  run(client, message, args) {
    var permissions = 37080128;

    let invite = new MessageEmbed()
      .setTitle(`Invite ${client.user.username}`)
      .setDescription(`Want me in your server? Invite me today! \n[Invite Link](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=${permissions}&scope=bot)`)
      .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=${permissions}&scope=bot`)
      .setColor("9136bf")
    return message.channel.send(invite);
  }
}