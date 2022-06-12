const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require("discord.js");

module.exports = class WikiCommand extends BaseCommand {
  constructor() {
    super('wiki', 'Utility', []);
  }

  run(client, message, args) {
    const search = args.join("_");
    const msg = args.join(" ");
    if (!msg) {
      return message.channel.send("You need to enter some text to search for");
    }
    const link = `https://www.wikipedia.org/w/index.php?search=${search}&ns0=1`;
    const embed = new Discord.MessageEmbed()
      .setTitle("Wikipedia Search")
      .setDescription(`You Searched for: ${msg}`)
      .addField(`Results:`, `[Here's What I found](${link})`)
      .setColor("9136bf");

    message.channel.send(
      embed);
  }
}