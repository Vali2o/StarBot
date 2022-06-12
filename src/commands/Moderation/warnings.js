const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js');
const warnSchema = require("../../database/models/warnModel");

module.exports = class WarningsCommand extends BaseCommand {
  constructor() {
    super('warnings', 'Moderation', ['warns']);
  }

  async run(client, message, args) {
    const mentionedUser = message.mentions.users.first() || message.member;

    const warnDoc = await warnSchema
      .findOne({
        guildID: message.guild.id,
        memberID: mentionedUser.id,
      })
      .catch((err) => console.log(err));

    if (!warnDoc || !warnDoc.warnings.length) {
      const nowarns1 = new MessageEmbed()
      .setTitle(`Warns`)
      .setDescription(`${mentionedUser} has no warnings.`)
      .setColor("9136bf")
      return message.channel.send(nowarns1);
    }

    const data = [];

    for (let i = 0; warnDoc.warnings.length > i; i++) {
      data.push(`**ID:** ${i + 1}`);
      data.push(`**Reason:** ${warnDoc.warnings[i]}`);
      data.push(
        `**Warned By:** ${await message.client.users
          .fetch(warnDoc.moderator[i])
          .catch(() => "Deleted User")}`
      );
      data.push(
        `**Date:** ${new Date(warnDoc.date[i]).toLocaleDateString()}\n`
      );
    }

    const embed = new MessageEmbed()
      .setThumbnail()
      .setColor("9136bf")
      .setDescription(data.join("\n"));

    message.channel.send(embed);
  }
}