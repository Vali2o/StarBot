const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class ServerCommand extends BaseCommand {
  constructor() {
    super('server', 'Info', ['sv']);
  }

  run(client, message, args) {

    if (args[0] === 'members') {
      const serverMembers = message.guild.memberCount;
      const memberEmbed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name} has ${serverMembers} members.`)
        .setColor('9136bf');

      message.channel.send(memberEmbed).catch(err => console.log(err));
    }

    if (args[0] === 'boosts') {
      const serverBoosts = message.guild.premiumSubscriptionCount;
      const boostEmbed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name} has ${serverBoosts} boosts!`)
        .setColor('9136bf');

      message.channel.send(boostEmbed).catch(err => console.log(err));
    }
    if (args[0] === 'joined') {
      const joinedEmbed = new Discord.MessageEmbed()
        .setTitle(`You joined on the server on ${message.member.joinedAt}`)
        .setColor('9136bf');

      message.channel.send(joinedEmbed).catch(err => console.log(err));
    }
  }
}