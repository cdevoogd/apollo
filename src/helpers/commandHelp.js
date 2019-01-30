const Discord = require('discord.js');
const config = require('../config');
const colors = require('./colors');
const prefix = config.prefix;

const embeds = {
  // Custom Command Commands
  addcommand: new Discord.RichEmbed()
    .setColor(colors.customCommands)
    .setTitle(`${prefix}addcommand`)
    .setDescription('Allows staff to add chat commands with custom replies.')
    .addField('Usage', `${prefix}addcommand <command> <reply>`)
    .addField('Permissions', 'Available to staff'),
  
  delcommand: new Discord.RichEmbed()
    .setColor(colors.customCommands)
    .setTitle(`${prefix}addcommand`)
    .setDescription('Allows staff to add chat commands with custom replies.')
    .addField('Usage', `${prefix}addcommand <command> <reply>`)
    .addField('Permissions', 'Available to staff'),

  editcommand: new Discord.RichEmbed()
    .setColor(colors.customCommands)
    .setTitle(`${prefix}editcommand`)
    .setDescription('Allows staff to edit the replies of previously created commands.')
    .addField('Usage', `${prefix}editcommand <command> <new-reply>`)
    .addField('Permissions', 'Available to staff'),

  // Dynamic Channel Commands
  adddynamic: new Discord.RichEmbed()
    .setColor(colors.dynamic)
    .setTitle(`${prefix}adddynamic`)
    .setDescription('Allows admins to add dynamic channel configurations directly to the database.')
    .addField('Usage', `${prefix}adddynamic <categoryID> <voice-channel-name>`)
    .addField('Permissions', 'Available to admins'),

  deldynamic: new Discord.RichEmbed()
    .setColor(colors.dynamic)
    .setTitle(`${prefix}deldynamic`)
    .setDescription('Allows admins to delete dynamic channel configurations from the database.')
    .addField('Usage', `${prefix}deldynamic <categoryID>`)
    .addField('Permissions', 'Available to admins'),

  // Moderation Commands
  ban: new Discord.RichEmbed()
    .setColor(colors.moderation)
    .setTitle(`${prefix}ban`)
    .setDescription('Allows staff members to ban users from the server.')
    .addField('Usage', `${prefix}ban <@user/userID> <reason>`)
    .addField('Permissions', `Available to ${config.commands.ban.accessLevel}`),

  kick: new Discord.RichEmbed()
    .setColor(colors.moderation)
    .setTitle(`${prefix}kick`)
    .setDescription('Allows staff members to kick users from the server.')
    .addField('Usage', `${prefix}kick <@user/userID> <reason>`)
    .addField('Permissions', `Available to ${config.commands.kick.accessLevel}`),

  mute: new Discord.RichEmbed()
    .setColor(colors.moderation)
    .setTitle(`${prefix}mute`)
    .setDescription('Allows staff members to mute users in the server.')
    .addField('Usage', `${prefix}mute <@user/userID> <time[minutes][0=perm]> <reason>`)
    .addField('Permissions', `Available to ${config.commands.mute.accessLevel}`)
};

/**
 * Sends out a help message(embed) for the specified command to the channel given.
 * @param {TextChannel} channel - The channel to send the help embed to.
 * @param {String} command - The command whose embed to send.
 */
module.exports.sendHelpEmbed = function(channel, command) {
  channel.send({ embed: embeds[command] });
};


module.exports.sendMissingArgument = function(channel, command, argument) {
  channel.send(`Command argument **[${argument}]** missing. Type \`${config.prefix}${command}\` for help. `);
};