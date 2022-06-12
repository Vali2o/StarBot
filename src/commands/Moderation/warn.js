const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js');
const warnSchema = require("../../database/models/warnModel");

module.exports = class WarnCommand extends BaseCommand {
  constructor() {
    super('warn', 'Moderation', []);
  }

  async run(client, message, args) {
    const mentionedUser =
      message.mentions.members.first() || message.guild.members.cache.get(args[0])


    if (!message.member.hasPermission("KICK_MEMBERS", "BAN_MEMBERS")) {
      const warnError = new MessageEmbed()
        .setDescription("You Do Not have Permission to Warn someone")
        .setColor("9136bf");
      return message.channel.send(warnError);
    } else if (!mentionedUser) {
      const warnError2 = new MessageEmbed()
        .setDescription("You Need to mention a Member to warn them! \nExample: `s!warn @user <reason>`")
        .setColor("9136bf");
      return message.channel.send(warnError2);
    }

    const reason = args.slice(1).join(" ") || "Not Specified";

    let warnDoc = await warnSchema
      .findOne({
        guildID: message.guild.id,
        memberID: mentionedUser.id,
      })
      .catch((err) => console.log(err));

    if (!warnDoc) {
      warnDoc = new warnSchema({
        guildID: message.guild.id,
        memberID: mentionedUser.id,
        warnings: [reason],
        moderator: [message.member.id],
        date: [Date.now()],
      });

      await warnDoc.save().catch((err) => console.log(err));
      const warnembed2 = new MessageEmbed()
      .setTitle("Warn Report!")
      .setDescription(`**Successfully Warned ${mentionedUser}** \nWarned By: ${message.author} \nReason: ${reason}`)
      .setColor("9136bf")
      return message.channel.send(warnembed2)
    } else {
      if (warnDoc.warnings.length >= 3) {
        const warns3 = new MessageEmbed()
        .setTitle("Warn Report!")
        .setDescription(`This member has already been warned 3 times.`)
        .setColor("9136bf")
        return message.channel.send(
          warns3
        );
      }

      warnDoc.warnings.push(reason);
      warnDoc.moderator.push(message.member.id);
      warnDoc.date.push(Date.now());

      await warnDoc.save().catch((err) => console.log(err));

      const embed = new MessageEmbed()
      .setTitle("Warn Report!")
      .setDescription(`Warned **${mentionedUser}** \nWarned By: ${message.author} \nReason: ${reason}`)
      .setColor("9136bf")

      return message.channel.send(embed);
    }
  }
}