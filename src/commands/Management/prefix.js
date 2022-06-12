const BaseCommand = require('../../utils/structures/BaseCommand');
const prefixModel = require("../../database/models/prefixModel");
const { MessageEmbed } = require("discord.js");

module.exports = class PrefixCommand extends BaseCommand {
  constructor() {
    super('prefix', 'Management', []);
  }

  async run(client, message, args) {

    const embedNoPerms = new MessageEmbed()
    .setTitle(`:x: NO PERMISSION :x: \nYou don't have the permission to use the command!`)
    .setColor('9136bf')

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embedNoPerms)

    const data = await prefixModel.findOne({
      GuildID: message.guild.id,
    });

    if (!args[0])
      return message.channel.send("You must provide a **new prefix**!");

    if (args[0].length > 5)
      return message.channel.send(
        "Your new prefix must be under `5` characters!"
      );

    if (data) {
      await prefixModel.findOneAndRemove({
        GuildID: message.guild.id,
      });

      message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

      let newData = new prefixModel({
        Prefix: args[0],
        GuildID: message.guild.id,
      });
      newData.save();
    } else if (!data) {
      message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

      let newData = new prefixModel({
        Prefix: args[0],
        GuildID: message.guild.id,
      });
      newData.save();
    };
  };
};