const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js');
const warnSchema = require("../../database/models/warnModel");

module.exports = class UnwarnCommand extends BaseCommand {
  constructor() {
    super('unwarn', 'Moderation', []);
  }

  async run(client, message, args) {
    const mentionedUser = message.mentions.users.first();

    if (!message.member.hasPermission("KICK_MEMBERS", "BAN_MEMBERS")) {
      const unwarnError = new MessageEmbed()
        .setDescription("You do not have Permission to Unwarn someone")
        .setColor("9136bf");
      return message.channel.send(unwarnError);
    } else if (!mentionedUser) {
      const unwarnError2 = new MessageEmbed()
        .setDescription("You Need to mention a Member in order to Unwarn them \nExample: `s!unwarn <warn_number> @user <reason>`")
        .setColor("9136bf");
      return message.channel.send(unwarnError2);
    }

    const reason = args.slice(2).join(" ") || "Not Specified";

    const warnDoc = await warnSchema
      .findOne({
        guildID: message.guild.id,
        memberID: mentionedUser.id,
      })
      .catch((err) => console.log(err));

    if (!warnDoc || !warnDoc.warnings.length) {
      const unwarnError3 = new MessageEmbed()
        .setDescription(`${mentionedUser} does not have any warnings`)
        .setColor("9136bf");
      return message.channel.send(unwarnError3);
    }

    const warnID = parseInt(args[0]);
    if (!warnID) {
      const noWarnID = new MessageEmbed()
        .setDescription('No WarnID Specified! Please provide a warn ID to clear.\n To check warn ID, use s!warns <@member> \n The correct usage of this command is s!unwarn [warnID] <@member> <reason>')
        .setColor("9136bf")
      return message.channel.send(noWarnID)
    }

    if (warnID <= 0 || warnID > warnDoc.warnings.length) {
      const unwarnError4 = new MessageEmbed()
        .setDescription(
          "This is an invalid warning ID. \n To check warn ID, use s!warns <@member>"
        )
        .setColor("9136bf");
      return message.channel.send(unwarnError4);
    }

    warnDoc.warnings.splice(warnID - 1, warnID !== 1 ? warnID - 1 : 1);

    await warnDoc.save().catch((err) => console.log(err));

    const embed = new MessageEmbed()
      .setDescription(
        `Unwarned ${mentionedUser} \n **Reason:** ${reason ? `**${reason}**` : ""} \nUnwarned By: ${message.author}`)
      .setColor("9136bf");

    message.channel.send(embed);
  }
}