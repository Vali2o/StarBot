const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'Fun', []);
  }

  run(client, message, args) {
    const sayMessage = args.join(" ");

    const embedmsgsay = new Discord.MessageEmbed()
    .setTitle('You need to say a message \n`\Example: s!say Hi!\`')
    .setColor('9136bf')

    if(!args[0]) return message.channel.send(embedmsgsay)

    const embedSay = new Discord.MessageEmbed()
      .setTitle(sayMessage)
      .setColor('9136bf')
      .setTimestamp()

    message.delete().catch(err => console.log(err));
    message.channel.send(embedSay);
  }
}