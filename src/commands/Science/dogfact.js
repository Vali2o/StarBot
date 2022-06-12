const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = class CatCommand extends BaseCommand {
    constructor() {
        super('dogfact', 'Fun', ['df']);
    }

    async run(client, message, args) {
        try {
            const res = await fetch('https://dog-api.kinduff.com/api/facts');
            const fact = (await res.json()).facts[0];
            const embed = new MessageEmbed()
              .setTitle('🐶  Dog Fact  🐶')
              .setDescription(fact)
              .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
              .setTimestamp()
              .setColor('9136bf');
            message.channel.send(embed);
          } catch (err) {
            message.client.logger.error(err.stack);
            this.sendErrorMessage(message, 1, 'Please try again in a few seconds', err.message);
          }
    }
}
