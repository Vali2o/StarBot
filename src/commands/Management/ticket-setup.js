const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, MessageCollector } = require('discord.js');
const TicketData = require('../../database/models/ticketModel');  //the ticket schema


module.exports = class TicketCommand extends BaseCommand {
  constructor() {
    super('ticket-setup', 'Ticket', ['ts']);
  }

  async run(client, message, args) {
    let ticketData = await TicketData.findOne({ GuildID: message.guild.id });
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      return message.channel.send(`You don't have permission to use this command!`);
    }

    if (!ticketData) {
      const firstEmbed = new MessageEmbed()
        .setTitle('Ticket System Setup')
        .setDescription('What description do you want to be?')
        .setColor('9136bf');
      let firstMsg = await message.channel.send(firstEmbed);

      const firstFilter = m => m.author.id === message.author.id;
      const firstCollector = new MessageCollector(message.channel, firstFilter, { max: 2 });

      let embedDescription;

      firstCollector.on('collect', async msg => {
        embedDescription = msg.content;
        const secondEmbed = new MessageEmbed()
          .setTitle('Ticket System Setup')
          .setDescription('Where do you want the message to be? Mention a channel.')
          .setColor('9136bf');
        msg.channel.send(secondEmbed);
        firstCollector.stop();

        const secondFilter = m => m.author.id === message.author.id;
        const secondCollector = new MessageCollector(message.channel, secondFilter, { max: 2 });

        secondCollector.on('collect', async msg => {
          let embedChannel = msg.mentions.channels.first();
          if (!embedChannel) {
            msg.channel.send('That is not a valid channel.');
            secondCollector.stop();
            return;
          }

          const thirdEmbed = new MessageEmbed()
            .setTitle('Ticket System Setup')
            .setDescription('What roles do you want to acces the tickets? Mention a role or an ID.')
            .setColor('9136bf');
          msg.channel.send(thirdEmbed);
          secondCollector.stop();

          const thirdFilter = m => m.author.id === message.author.id;
          const thirdCollector = new MessageCollector(message.channel, thirdFilter, { max: 2 });

          thirdCollector.on('collect', async message => {
            let savedRole = message.mentions.roles.first() || message.guild.roles.cache.get(message.content) || message.guild.roles.cache.find(role => role.name.toLowerCase() === message.content.toLowerCase());

            if (!savedRole) {
              msg.channel.send('That role is not valid.');
              thirdCollector.stop();
              return;
            }

            const fourthEmbed = new MessageEmbed()
              .setTitle('Ticket System Setup')
              .setDescription('The setup is now finished!')
              .setColor('9136bf');
            await msg.channel.send(fourthEmbed);
            thirdCollector.stop();

            await createTicketSystem(ticketData, embedDescription, embedChannel, message, savedRole)
          });
        });
      });
    } else {
      await TicketData.findOneAndRemove({
        GuildID: message.guild.id
      });
      message.channel.send(`**Successfuly Reset the Ticket System on your Server!**\nPlease use this command again to re-setup!`);
    }
  }
}

async function createTicketSystem(ticketData, embedDescription, embedChannel, message, savedRole) {
    const sendEmbed = new MessageEmbed()
        .setTitle('Ticket')
        .setDescription(embedDescription)
        .setColor('9136bf');

    let msg = await embedChannel.send(sendEmbed);
    await msg.react('🎟');

    const newData = new TicketData({
        GuildID: message.guild.id,
        MessageID: msg.id,
        TicketNumber: 0,
        WhitelistedRole: savedRole.id
    });
    newData.save();
}