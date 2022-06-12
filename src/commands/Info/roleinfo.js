const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class RoleinfoCommand extends BaseCommand {
  constructor() {
    super('roleinfo', 'Info', ['ri']);
  }

  run(client, message, args) {

    const embedRoleEnter = new MessageEmbed()
      .setTitle('**Please Enter A Role!**')
      .setColor('9136bf')

    if (!args[0]) return message.channel.send(embedRoleEnter)
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

    const embedroleValid = new MessageEmbed()
      .setTitle('**Please Enter A Valid Role!**')
      .setColor('9136bf')

    if (!role) return message.channel.send(embedroleValid);

    const status = {
      false: "No",
      true: "Yes"
    }

    let roleembed = new MessageEmbed()
      .setColor("#2F3136")
      .setTitle(`Role Info: \`${role.name}\``)
      .setThumbnail(message.guild.iconURL())
      .addField("**ID**", `\`${role.id}\``, true)
      .addField("**Name**", role.name, true)
      .addField("**Hex Color**", role.hexColor, true)
      .addField("**Members Having It**", role.members.size, true)
      .addField("**Position**", role.position, true)
      .addField("**Mentionable**", status[role.mentionable], true)
      .setFooter(message.member.displayName, message.author.displayAvatarURL(), true)
      .setTimestamp()

    message.channel.send(roleembed);
  }
}