const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SuggestCommand extends BaseCommand {
  constructor() {
    super('suggest', 'Fun', []);
  }

  run(client, message, args) {
    const suggestMessage = args.join(" ");
    const embedSUggest = new Discord.MessageEmbed()
      .setThumbnail(message.author.displayAvatarURL)
      .setTitle('New Suggestion!')
      .addField('Suggestion:', suggestMessage)
      .addField('Suggested By:', `<@${message.author.id}>`)
      .addField('React with :thumbsup: if you agree with the suggestion. \nReact with :thumbsdown: if you not agree with the suggestion.', '‎‎')
      .setColor('9136bf')
      .setTimestamp()
      .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)

    message.delete().catch(err => console.log(err));
    message.channel.send(embedSUggest).then(embedSUggest => {
      embedSUggest.react('👍');
      embedSUggest.react('👎');
    })
  }
}