const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SlowmodeCommand extends BaseCommand {
  constructor() {
    super('slowmode', 'Moderation', ['sl']);
  }

  async run(client, message, args) {
    let slPermErr = new Discord.MessageEmbed()
      .setTitle(`:x: NO PERMISSION :x: \nYou don't have the permission to use the command!`)
      .setColor('9136bf')

    if (!message.channel.permissionsFor(message.member).has("MANAGE_CHANNELS")) return message.reply(slPermErr);

    const embednotmention = new Discord.MessageEmbed()
      .setTitle("You didn't mention any time! \n`\Example: s!slowmode time\`")
      .setColor('9136bf')

    if (!args[0]) return message.channel.send(embednotmention);
    if (args[0] === 'none') {

      const embedNoneSlowmode = new Discord.MessageEmbed()
        .setTitle('I deleted the slowmode!')
        .setColor('9136bf')

      await message.channel.setRateLimitPerUser(0);
      return message.channel.send(embedNoneSlowmode);
    };

    const embedInvalid = new Discord.MessageEmbed()
      .setTitle('That number is not a valid one.')
      .setColor('9136bf');

    if (isNaN(args[0])) return message.channel.send(embedInvalid);
    const setTimeTo = Number(args[0]);
    const embedSlowmode = new Discord.MessageEmbed()
      .setTitle(`I set the slowmode at ${setTimeTo} seconds.`)
      .setColor('9136bf');

    if (setTimeTo === 5) {
      await message.channel.setRateLimitPerUser(setTimeTo);
      return message.channel.send(embedSlowmode);
    };

    if (setTimeTo === 10) {
      await message.channel.setRateLimitPerUser(setTimeTo);
      return message.channel.send(embedSlowmode);
    };

    if (setTimeTo === 15) {
      await message.channel.setRateLimitPerUser(setTimeTo);
      return message.channel.send(embedSlowmode);
    };

    if (setTimeTo === 30) {
      await message.channel.setRateLimitPerUser(setTimeTo);
      return message.channel.send(embedSlowmode);
    };

    if (setTimeTo === 60) {
      await message.channel.setRateLimitPerUser(setTimeTo);
      return message.channel.send(embedSlowmode);
    };

    if (setTimeTo === 120) {
      await message.channel.setRateLimitPerUser(setTimeTo);
      return message.channel.send(embedSlowmode);
    };

    if (setTimeTo === 300) {
      await message.channel.setRateLimitPerUser(setTimeTo);
      return message.channel.send(embedSlowmode);
    };

    if (setTimeTo === 600) {
      await message.channel.setRateLimitPerUser(setTimeTo);
      return message.channel.send(embedSlowmode);
    };

    if (setTimeTo === 900) {
      await message.channel.setRateLimitPerUser(setTimeTo);
      return message.channel.send(embedSlowmode);
    };

    if (setTimeTo === 1800) {
      await message.channel.setRateLimitPerUser(setTimeTo);
      return message.channel.send(embedSlowmode);
    };

    if (setTimeTo === 3600) {
      await message.channel.setRateLimitPerUser(setTimeTo);
      return message.channel.send(embedSlowmode);
    };

    if (setTimeTo === 7200) {
      await message.channel.setRateLimitPerUser(setTimeTo);
      return message.channel.send(embedSlowmode);
    };

    if (setTimeTo === 21600) {
      await message.channel.setRateLimitPerUser(setTimeTo);
      return message.channel.send(embedSlowmode);
    };

    const embedGresit = new Discord.MessageEmbed()
      .setTitle('That time is incorrect. \n``Options: none, 5, 10, 15, 30, 60, 120, 300, 600, 900, 1800, 3600, 7200 si 21600 seconds.`` \n`\Example: s!slowmode 5\`')
      .setColor('9136bf');

    message.channel.send(embedGresit);
  }
}