const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class BallCommand extends BaseCommand {
  constructor() {
    super('8ball', 'Fun', []);
  }

  run(client, message, args) {

    const embedAsk = new MessageEmbed()
      .setTitle('Please ask a full question. \n`\Example: s!8ball (question)\`')
      .setColor('9136bf')

    if (!args[2]) return message.channel.send(embedAsk);

    let replies = ["Yes.", "No.", "I don't know.", "Ask again later!", "I refuse to answer this!", "no u boi", "tHaTs wHaT sHe SaId", "Ok BOOMER!", "Like u.", "I :heart: u", "Ok", `${message.author.username}, you're a bot`];
    let result = Math.floor((Math.random() * replies.length));

    const embedreplies = new MessageEmbed()
      .setTitle(replies[result])
      .setColor('9136bf')

    return message.channel.send(embedreplies);
  }
}