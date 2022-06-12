const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'Info', ['halp', 'commands']); 
  }

  run(client, message, args) {

    const testEmbed = new Discord.MessageEmbed() 
      .setColor('9136bf')
      .setAuthor(`${message.author.tag}, do you need help?`)
      .setTimestamp()
      .setDescription(`My prefix is **s!** \n**Note**: Most of these commands will only work in a server.\nThe official StarBot site: https://star-bot.gq/ \nThese are the bot's commands:`) 
      .addField(`> 📡 Info Commands`, "`help` `ping` `uptime` `avatar` `botinfo` `userinfo` `roleinfo` `serverinfo` `server joined` `server boosts` `server members`") 
      .addField(`> 💥 Moderation Commands`, "`ban` `kick` `unban` `warn` `warns` `unwarn` `nick` `addrole` `removerole` `clear` `slowmode`") 
      .addField(`> 🎉 Fun Commands`, "`8ball` `cat` `dog` `bird` `fox` `duck` `meme` `say` `suggest` `coinflip`") 
      .addField(`> 📰 Science Commands`, "`catfact` `dogfact`")
      .addField(`> 🔗 Management Commands`, "`prefix` `ticket-setup`")
      .addField(`> 🛠️ Utility Commands`, "`weather`")
      .addField(`> 👑 Owner Commands:`, "`restart` `test` `shutdown`")
      .addField(
        'Important Links:',
        '[Official Site](https://star-bot.gq/) | '+
        '[Invite Me](https://discord.com/oauth2/authorize?client_id=787385392567025696&scope=bot&permissions=2147483647)'
      )
      .setFooter(message.author.tag, message.author.displayAvatarURL());
    try {
      message.delete().catch(err => console.log(err));
      message.channel.send(testEmbed);
    } catch {
      message.reply(`Sorry <@${message.author.username}> you cant't use the command right now.`);
    }
  }
}