const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class AddroleCommand extends BaseCommand {
  constructor() {
    super('addrole', 'Moderation', ['ar']);
  }

  async run(client, message, args) {

    const embedNoPerm = new MessageEmbed()
      .setTitle(`:x: NO PERMISSION :x: \nYou don't have the permission to use the command!`)
      .setColor('9136bf')

    if (!message.member.hasPermission(["MANAGE_ROLES"]) && !ownerID.includes(message.author.id)) return message.channel.send(embedNoPerm)

    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    const embedNoMention = new MessageEmbed()
      .setTitle(`Please provide a user to add a role too \n \`Example: s!addrole @StarBot cool\``)
      .setColor('9136bf')

    if (!rMember) return message.channel.send(embedNoMention)

    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()

    const embedRole = new MessageEmbed()
      .setTitle(`Please provide a role to add to said user`)
      .setColor('9136bf')

    if (!role) return message.channel.send(embedRole)

    const embednpbot = new MessageEmbed()
      .setTitle(`I don't have permission to perform this command. Please give me Manage Roles Permission!`)
      .setColor('9136bf')

    if (!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send(embednpbot)

    if (rMember.roles.cache.has(role.id)) {

      const embedalready = new MessageEmbed()
        .setTitle(`${rMember.displayName}, already has the role!`)
        .setColor('9136bf')

      return message.channel.send(embedalready)

    } else {

      await rMember.roles.add(role.id).catch(e => console.log(e.message))

      const embedroleadd = new MessageEmbed()
        .setTitle(`${rMember.displayName} has been added to **${role.name}`)
        .setColor('9136bf')

      message.channel.send(embedroleadd)

    }
  }
}