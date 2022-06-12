const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UptimeCommand extends BaseCommand {
    constructor() {
        super('uptime', 'Info', ['up']);
    }

    run(client, message, args) {
        let seconds = Math.floor(message.client.uptime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;


        const embedUptime = new Discord.MessageEmbed()
            .setTitle(`⏱️ My uptime is \`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\``)
            .setColor('9136bf')

        return message
            .reply(embedUptime)
            .catch(console.error);

    }
}