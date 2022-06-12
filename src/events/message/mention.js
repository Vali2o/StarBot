const BaseEvent = require('../../utils/structures/BaseEvent');
const prefixModel = require('../../database/models/prefixModel');
const { MessageEmbed } = require('discord.js');

module.exports = class MessageEvent extends BaseEvent {
        constructor() {
            super('message');
        }

        async run(client, message) {
            if (message.author.bot) return;
            if (!message.guild) return;
            if (!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES"))
                return;

            const { DEFAULT_PREFIX } = require("../../../config.json")

            const prefixData = await prefixModel.findOne({ GuildID: message.guild.id, }).catch(err => console.log(err))

            if (prefixData) {
                var PREFIX = prefixData.Prefix
            } else if (!prefixData) {
                PREFIX = DEFAULT_PREFIX
            }
            client.prefix = PREFIX;

            if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
                
                const mentionEmbed = new MessageEmbed()
                .setTitle("SERVER MANAGEMENT")
                .setColor("9136bf")
                .setDescription(`My prefix in this server is \`${PREFIX}\`\nTo get change the prefix use \`s!prefix <new_prefix>\`\nTo get a list of commands, type \`${PREFIX}help\``)

                return message.channel.send(mentionEmbed);
            }
        }
    }