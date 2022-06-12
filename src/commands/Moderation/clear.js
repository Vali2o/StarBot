const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class ClearCommand extends BaseCommand {
  constructor() {
    super('clear', 'Moderation', ['purge', 'delete']);
  }

  async run(client, message, args) {
    const embedNotPerms = new Discord.MessageEmbed()
      .setTitle(`:x: NO PERMISSION :x: \nYou don't have the permission to use the command!`)
      .setColor('9136bf')

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embedNotPerms)

    const embedNotPermsBpt = new Discord.MessageEmbed()
      .setTitle('I DONT HAVE PERMS')
      .setColor('9136bf')

    if (!message.guild.me.hasPermission("MANGAE_MESSAGES")) return message.channel.send(embedNotPermsBpt)

    const embedNumber = new Discord.MessageEmbed()
      .setTitle(`Wrongly used command. \nYou need to mention a number of messages to clear! \n\`Example: s!clear 10\``)
      .setColor('9136bf')

    if (!args[0]) return message.channel.send(embedNumber)
    const amountToDelete = Number(args[0], 10);

    const embedNevalid = new Discord.MessageEmbed()
      .setTitle("That number is invalid!")
      .setColor('9136bf');

    if (isNaN(amountToDelete)) return message.channel.send(embedNevalid)

    const embedIncorectNr = new Discord.MessageEmbed()
      .setTitle("The number must be a full one!")
      .setColor('9136bf');

    if (!Number.isInteger(amountToDelete)) return message.channel.send(embedIncorectNr)

    const embedNr = new Discord.MessageEmbed()
      .setTitle('You need to state a number between 0 and 100!')
      .setColor('9136bf');

    if (!amountToDelete || amountToDelete < 0 || amountToDelete > 100) return message.channel.send(embedNr)
    const fetched = await message.channel.messages.fetch({
      limit: amountToDelete
    });

    try {

      const embedDeleteMessage = new Discord.MessageEmbed()
        .setTitle(`I've just deleted **${amountToDelete}** messages! \nMessages deleted by: ${message.author.tag}`)
        .setColor('9136bf');

      await message.channel.bulkDelete(fetched)
        .then(messages => message.channel.send(embedDeleteMessage));
    } catch (err) {
      console.log(err);

      const embedZIle = new Discord.MessageEmbed()
        .setTitle(`I can't delete messages older than 2 weeks!`)
        .setColor('9136bf');

      message.channel.send(embedZIle);
    }
  }
}