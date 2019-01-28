const Discord = require('discord.js');
const config = require('../../config');
const colors = require('./embed-colors');
const prefix = config.prefix;

// SECTION Custom Command Commands
const addcommand = new Discord.RichEmbed()
  .setColor(colors.customCommands)
  .setTitle(`${prefix}addcommand`)
  .setDescription('Allows staff to add chat commands with custom replies.')
  .addField('Usage', `${prefix}addcommand <command> <reply>`)
  .addField('Permissions', 'Available to staff');

const delcommand = new Discord.RichEmbed()
  .setColor(colors.customCommands)
  .setTitle(`${prefix}delcommand`)
  .setDescription('Allows staff to delete custom commands from the server.')
  .addField('Usage', `${prefix}delcommand <command>`)
  .addField('Permissions', 'Available to staff');

const editcommand = new Discord.RichEmbed()
  .setColor(colors.customCommands)
  .setTitle(`${prefix}editcommand`)
  .setDescription('Allows staff to edit the replies of previously created commands.')
  .addField('Usage', `${prefix}editcommand <command> <new-reply>`)
  .addField('Permissions', 'Available to staff');

// SECTION Dynamic Channel Commands
const adddynamic = new Discord.RichEmbed()
  .setColor(colors.dynamic)
  .setTitle(`${prefix}adddynamic`)
  .setDescription('Allows admins to add dynamic channel configurations directly to the database.')
  .addField('Usage', `${prefix}adddynamic <categoryID> <voice-channel-name>`)
  .addField('Permissions', 'Available to admins');

const deldynamic = new Discord.RichEmbed()
  .setColor(colors.dynamic)
  .setTitle(`${prefix}deldynamic`)
  .setDescription('Allows admins to delete dynamic channel configurations from the database.')
  .addField('Usage', `${prefix}deldynamic <categoryID>`)
  .addField('Permissions', 'Available to admins');

// SECTION Moderation Commands
const ban = new Discord.RichEmbed()
  .setColor(colors.moderation)
  .setTitle(`${prefix}ban`)
  .setDescription('Allows staff members to ban users from the server.')
  .addField('Usage', `${prefix}ban <@user/userID> <reason>`)
  .addField('Permissions', `Available to ${config.commands.ban.accessLevel}`);

const kick = new Discord.RichEmbed()
  .setColor(colors.moderation)
  .setTitle(`${prefix}kick`)
  .setDescription('Allows staff members to kick users from the server.')
  .addField('Usage', `${prefix}kick <@user/userID> <reason>`)
  .addField('Permissions', `Available to ${config.commands.ban.accessLevel}`);

const mute = new Discord.RichEmbed()
  .setColor(colors.moderation)
  .setTitle(`${prefix}mute`)
  .setDescription('Allows staff members to mute users in the server.')
  .addField('Usage', `${prefix}mute <@user/userID> <time[minutes][0=perm]> <reason>`)
  .addField('Permissions', `Available to ${config.commands.ban.accessLevel}`);

module.exports = {
  // Custom Cmds
  addcommand, 
  delcommand,
  editcommand,
  // Dynamics
  adddynamic,
  deldynamic,
  // Moderation
  ban,
  kick,
  mute
};