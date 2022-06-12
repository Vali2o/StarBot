const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageEmbed, MessageCollector } = require('discord.js');
const Discord = require('discord.js');
const cooldown = new Set();
const TicketData = require('../../database/models/ticketModel'); //the ticket schema
const bot = new Discord.Client();


module.exports = class MessageReactionAddEvent extends BaseEvent {
    constructor() {
        super('messageReactionAdd');
    }

    async run(client, reaction, user) {
        if (user.bot) return;

        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();

        if (!reaction.message.guild) return;

        const data = await TicketData.findOne({
            GuildID: reaction.message.guild.id
        });
        if (!data) return;
        if (reaction.message.partial) await reaction.message.fetch();

        if (reaction.emoji.name === '🎟' && reaction.message.id === data.MessageID) {
            if (cooldown.has(user.id)) {
                reaction.users.remove(user.id);
                return;
            }
            data.TicketNumber += 1;
            await data.save();
            const channel = await reaction.message.guild.channels.create(`ticket-${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`, {
                type: 'text',
                permissionOverwrites: [{
                    id: reaction.message.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },],
            });
            await channel.createOverwrite(user, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                SEND_TTS_MESSAGES: false
            });
            await channel.createOverwrite(data.WhitelistedRole, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                SEND_TTS_MESSAGES: false
            });
            reaction.users.remove(user.id);
            const successEmbed = new MessageEmbed()
                .setTitle(`Ticket #${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`)
                .setDescription(`This ticket was created by ${user.toString()}. Please say \`done\` when you're finished.`)
                .setColor('9136bf');
            let successMsg = await channel.send(`${user.toString()}`, successEmbed);
            await cooldown.add(user.id);
            await checkIfClose(bot, reaction, user, successMsg, channel);
            setTimeout(function () {
                cooldown.delete(user.id);
            }, 30000);
        }
    }
}

async function checkIfClose(bot, reaction, user, successMsg, channel) {
    const filter = m => m.content.toLowerCase() === 'done'
    const collector = new MessageCollector(channel, filter);

    collector.on('collect', async msg => {
        channel.send(`This channel will be deleted in **5** seconds.`);
        await collector.stop();
        setTimeout(function () {
            channel.delete();
        }, 5000);
    });
}