const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'Moderation', []);
  }

  async run(client, message, args) {

    const embedNoPermss = new Discord.MessageEmbed()
      .setTitle(`:x: NO PERMISSION :x: \nYou don't have the permission to use the command!`)
      .setColor('9136bf')

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(embedNoPermss)

    const embedNoPermsBot1 = new Discord.MessageEmbed()
      .setTitle(`:x: I don't have permission to ban members!`)
      .setColor('9136bf')

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(embedNoPermsBot1)

    let reason = args.slice(1).join(" ");
    let userID = args[0];

    if (!reason) reason = 'No reason given.'

    const embedUnbandId = new Discord.MessageEmbed()
      .setTitle('You need to state the user ID to unban him.')
      .setColor('9136bf')

    if (!args[0]) return message.channel.send(embedUnbandId)

    const embedUnbandNoId = new Discord.MessageEmbed()
      .setTitle('That ID is not a corect ID')
      .setColor('9136bf')

    if (isNaN(args[0])) return message.channel.send(embedUnbandNoId)

    message.guild.fetchBans().then(async bans => {

      const embedNoBans = new Discord.MessageEmbed()
        .setTitle('This server does not have bans')
        .setColor('9136bf')

      if (bans.size == 0) return message.channel.send(embedNoBans)
      let bUser = bans.find(b => b.user.id == userID);

      const embedUnbandNoIdBanned = new Discord.MessageEmbed()
        .setTitle('That ID is not banned!')
        .setColor('9136bf')

      if (!bUser) return message.channel.send(embedUnbandNoIdBanned)
      await message.guild.members.unban(bUser.user, reason).catch(err => {
        console.log(err);

        const embedwrong = new Discord.MessageEmbed()
          .setTitle('Something went wrong unbanning the ID')
          .setColor('9136bf')

        return message.channel.send(embedwrong);
      }).then(() => {

        const embedsucces = new Discord.MessageEmbed()
          .setTitle(`Successfully Unbanned ${args[0]}`)
          .setColor('9136bf')

        message.channel.send(embedsucces);
      });
    });
  }
}