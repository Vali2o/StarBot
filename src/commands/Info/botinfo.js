const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const moment = require('moment');
const os = require('os');
const { formatBytes, parseDur } = require("../../function")
const { BOT_OWNER } = process.env;

const formatOS = {
  aix: 'IBM AIX',
  darwin: 'Darwin',
  freebsd: 'FreeBSD',
  linux: 'Linux',
  openbsd: 'OpenBSD',
  sunos: 'SunOS',
  win32: 'Windows',
};

module.exports = class BotinfoCommand extends BaseCommand {
  constructor() {
    super('botinfo', 'Info', ['bi']);
  }

  run(client, message, args) {
    let botembed = new Discord.MessageEmbed()
    
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
      .setColor('9136bf')
      .setFooter(`Requested by ${message.author.tag} - 🌠StarBot, be the star!🌠`, message.author.displayAvatarURL())
      .addField('📰 General Info\n', [
        `> **🤖 Bot Name: \`${client.user.tag}\`**`,
        `> **\\📇 Bot ID: \`${client.user.id}\`**`,
        `> **\\👑 Bot Owner: \`★Vali_2o\`**`,
        `> **\\🌐 Servers: \`${client.guilds.cache.size.toLocaleString()}\` Servers**`,
        `> **\\👥 Users: \`${client.users.cache.size.toLocaleString()}\` Users**`,
        `> **\\📺 Channels: \`${client.channels.cache.size.toLocaleString()}\` Channels**`,
        `> **\\💬 Commands: \`${client.commands.size}\` Commands**`,
        `> **\\📅 Created On: \`${moment(client.user.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')}\``,
        `> **\\📆 **Days since it was created: \`${Math.floor((Date.now() - client.user.createdTimestamp) / 86400000)}\` day(s) ago**`,
'\u200b',
      ])
      .addField('📰 System ❯', [
        `> **⌚ Uptime: ${parseDur(client.uptime)}**`,
        `> **⏲️ API Ping: ${message.client.ws.ping} ms**`,
        `> **🔗 Node.js: \`${process.version}\`**`,
        `> **🔥 Discord.js: \`v12.1.1\`**`,
        `> **\\🖥 Platform: \`${formatOS[os.platform]}\`**`,
        `> **\\📊 Memory: \`${formatBytes(process.memoryUsage().heapUsed)} / ${formatBytes(process.memoryUsage().heapTotal)}\`**`,
      ]);
    message.channel.send(botembed);
  }
}