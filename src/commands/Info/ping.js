const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports = class PingCommand extends BaseCommand {
    constructor() {
        super('ping', 'Info', []);
    }

    async run(client, message, args) {

        const embedPingTest = new Discord.MessageEmbed()
            .setTitle('My ping is calculating...')
            .setColor('9136bf')
        message.channel.send(embedPingTest).then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            const embedPing = new Discord.MessageEmbed()
                .setTitle('🏓 Pong!')
                .setDescription(`> **⌛ My Ping is ${ping} ms** \n> **⏲️ API Ping is ${message.client.ws.ping} ms** \n> **Requested by: ${message.author}**`)
                .setColor('9136bf')
            msg.edit(embedPing)
        })
    }
}