const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'Moderation', []);
    description: "Kick someone if they're misbehaving, not permanent unlike a ban however"
    permissions: "kick members"
  }

  async run(client, message, args) {
    const embedNoPerms = new Discord.MessageEmbed()
      .setTitle(`:x: NO PERMISSION :x: \nYou don't have the permission to use the command!`)
      .setColor('9136bf')

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(embedNoPerms)

    const embedNoPermsBot = new Discord.MessageEmbed()
      .setTitle(`:x: I don't have permission to kick members!`)
      .setColor('9136bf')

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(embedNoPermsBot)

    let reason = args.slice(1).join(" ");
    const mentionedMember = message.mentions.members.first();
    const userKick = message.mentions.users.first();

    if (!reason) reason = "No reason given"

    const embedNotMentioned1 = new Discord.MessageEmbed()
      .setTitle(`Wrongly used command. \nYou need to mention a member to kick. \n\`Example: s!kick @StarBot reason\``)
      .setColor('9136bf')

    if (!args[0]) return message.channel.send(embedNotMentioned1)

    const embedPersoana1 = new Discord.MessageEmbed()
      .setTitle('That member is not on the server.')
      .setColor('9136bf')

    if (!mentionedMember) return message.channel.send(embedPersoana1)

    const embedNoBan = new Discord.MessageEmbed()
      .setTitle(`I can't kick ${userKick.tag}`)
      .setColor('9136bf')

    if (!mentionedMember.bannable) return message.channel.send(embedNoBan)
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    const BanEmbedV2 = new Discord.MessageEmbed()
      .setTitle(`${userKick.tag} just got banned!`)
      .addField('Kicked User', `${bUser}`)
      .addField("Kicked By", `<@${message.author.id}>`)
      .addField('Reason', reason)
      .addField("Kicked In", message.channel)
      .setColor('9136bf')
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL());

    await message.channel.send(BanEmbedV2)

    const banEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been kicked on ${message.guild.name}`)
      .addField('You have been kicked by', `<@${message.author.id}>`)
      .addField('Reason', reason)
      .addField("Kicked In", "#" + message.channel.name)
      .setColor('9136bf')
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL());


    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    await mentionedMember.kick({
      reason: reason
    })
  }
}