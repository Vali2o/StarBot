const BaseCommand = require('../../utils/structures/BaseCommand');
const weather = require('weather-js');
const {
  MessageEmbed
} = require('discord.js');

module.exports = class TranslateCommand extends BaseCommand {
  constructor() {
    super('weather', 'Utility', []);
  }

  async run(client, message, args) {
    const ErrorEmbed = new MessageEmbed()
      .setDescription("You Need To Specify A Location")
      .setColor("9136bf")

    weather.find({
      search: args.join(" "),
      degreeType: 'C'
    }, function (error, result) {
      if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('Please specify a location')

        if(result === undefined || result.length === 0) return message.channel.send('**Invalid** location');

        var current = result[0].current;
        var location = result[0].location;

      const weatherInfo = new MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Weather Report For ${current.observationpoint}`)
        .setImage(current.imageUrl)
        .setColor("9136bf")
        .addField("Timezone", `UTC${location.timezone}`, true)
        .addField("Degree Type", "Celcius", true)
        .addField("Temperature", `${current.temperature}`, true)
        .addField('Wind', `${current.winddisplay}`, true)
        .addField('Feels Like', `${current.feelslike}`, true)
        .addField('Humidity', `${current.humidity}`, true)


      message.channel.send(weatherInfo)
    })
  }
}