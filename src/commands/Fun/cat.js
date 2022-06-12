const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent')

module.exports = class CatCommand extends BaseCommand {
    constructor() {
        super('cat', 'Fun', []);
    }

    async run(client, message, args) {
        let msg = await message.channel.send('Generating!')

        let {body} = await superagent
        .get('http://aws.random.cat/meow')

        if(!{body}) return message.channel.send('I broke! Try again!')

        let cembed = new MessageEmbed()
        .setColor('9136bf')
        .setAuthor('🐱 Meow! 🐱')
        .setImage(body.file)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL());

        message.channel.send(cembed)

        msg.delete();
    }
}