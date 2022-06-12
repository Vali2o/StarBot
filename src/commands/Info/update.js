const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UpdateCommand extends BaseCommand {
  constructor() {
    super('update', 'Info', ['new', 'commands']); 
  }

  run(client, message, args) {

    const testEmbed = new Discord.MessageEmbed() 
      .setColor('9136bf')
      .setAuthor(`✨StarBot - Be the star!✨`)
      .setTimestamp()
      .setDescription(`What's new?`) 
      .addField(`> 📡 A Ticket System!`, "Now you can use tickets in your server with StarBot! Just use the command `s!ticket-setup`. \n**Please** note that if the bot will be restarted you will need to setup the ticket system again.") 
      .addField(`> 🌙 Updated Commands?`, "Yes! You heard that right! We updated some commands! You need to discover them :wink:") 
      .addField(`> ⚠️ A better warn system!`, "Yes! We made a much better warn system for you!") 
      .addField(`> 🛠️ Utility Commands?`, "Yep, we added some utility commands. Just use `s!help` and you will see them.") 
      .addField(`> 💯 Server Managemnt Commands?`, "Yes! Check them out now! `s!help`")
      .addField(`> 💫 Site Redesign?`, "Yes! Check it out now! https://star-bot.gq/") 
      .addField(
        'Important Links:',
        '[Official Site](https://star-bot.gq/)'
      )
      .setFooter(message.author.tag, message.author.displayAvatarURL());
    try {
      message.channel.send(testEmbed);
    } catch {
      message.reply(`Sorry <@${message.author.username}> you cant't use the command right now.`);
    }
  }
}