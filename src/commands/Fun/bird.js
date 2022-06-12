const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class CatCommand extends BaseCommand {
    constructor() {
        super('bird', 'Fun', []);
    }

    async run(client, message, args) {
        const res = await fetch('http://shibe.online/api/birds');
        const img = (await res.json())[0];
        const embed = new MessageEmbed()
            .setTitle('🐦  Chirp!  🐦')
            .setImage(img)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('9136bf');
        message.channel.send(embed);
    } catch(err) {
        message.client.logger.error(err.stack);
        this.sendErrorMessage(message, 1, 'Please try again in a few seconds', err.message);
    }
}
