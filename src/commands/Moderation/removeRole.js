const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class RemoveroleCommand extends BaseCommand {
  constructor() {
    super('removerole', 'Moderation', ['rr']);
  }

  async run(client, message, args) {

    const embedNoPerms = new MessageEmbed()
      .setTitle(`:x: NO PERMISSION :x: \nYou don't have the permission to use the command!`)
      .setColor('9136bf')

    if (!message.member.hasPermission(["MANAGE_ROLES"])) return message.channel.send(embedNoPerms)

    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    const embednomentions = new MessageEmbed()
      .setTitle(`Please provide a user to remove a role from`)
      .setColor('9136bf')

    if (!rMember) return message.channel.send(embednomentions)

    let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()

    const embedrole = new MessageEmbed()
      .setTitle(`Please provide a role to remove from said user`)
      .setColor('9136bf')

    if (!role) return message.channel.send(embedrole)

    const embedbotnoperms = new MessageEmbed()
      .setTitle(`I don't have permission to perform this command. Please give me Manage Roles Permission!`)
      .setColor('9136bf')

    if (!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send(embedbotnoperms)

    if (!rMember.roles.cache.has(role.id)) {
      let rolDEL_err = new MessageEmbed()
        .setColor(`9136bf`)
        .setDescription(`Error ❌ | ${rMember}, does not have this role!`);

      return message.channel.send(rolDEL_err)

    } else {

      await rMember.roles.remove(role.id).catch(e => console.log(e.message))

      let rolDEL = new MessageEmbed()
        .setColor(`9136bf`)
        .setDescription(`Success ✅ | **${role.name}** has been removed from ${rMember}`)

      message.channel.send(rolDEL)

    }

  }
}