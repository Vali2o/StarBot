const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class NickCommand extends BaseCommand {
  constructor() {
    super('nick', 'Moderation', []);
  }

  async run(client, message, args) {

    const embedNoPermsSS = new MessageEmbed()
    .setTitle(`:x: NO PERMISSION :x: \nYou don't have the permission to use the command!`)
    .setColor('9136bf')

    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(embedNoPermsSS);

    const embedNoPermsBot22 = new MessageEmbed()
      .setTitle('**I Dont Have Permissions To Change Nickname! - [CHANGE_NICKNAME]**')
      .setColor('9136bf')


    if (!message.guild.me.hasPermission("CHANGE_NICKNAME")) return message.channel.send(embedNoPermsBot22);

    const embednoname = new MessageEmbed()
      .setTitle('**Please Enter A User!** \n`\Example: s!nick @StarBot cool\`')
      .setColor('9136bf')

    if (!args[0]) return message.channel.send(embednoname)

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
    if (!member) return message.channel.send("**Please Enter A Username!**");

    const embednonickchange = new MessageEmbed()
      .setTitle('**Cannot Set or Change Nickname Of This User!**')
      .setColor('9136bf')

    if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send(embednonickchange)

    const embednonick = new MessageEmbed()
      .setTitle('**Please Enter A Nickname**')
      .setColor('9136bf')

    if (!args[1]) return message.channel.send(embednonick);

    let nick = args.slice(1).join(' ');

    try {
      member.setNickname(nick)
      let nUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      const embed = new MessageEmbed()
        .setColor("9136bf")
        .setDescription(`**Changed Nickname of ${nUser.displayName} to ${nick}**`)
      message.channel.send(embed)
    } catch {

      const embedNP = new MessageEmbed()
        .setTitle('**Missing Permissions - [CHANGE_NICKNAME]')
        .setColor('9136bf')

      return message.channel.send(embedNP)
    }
  }
}