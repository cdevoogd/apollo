const Discord = require('discord.js');
const config = require('../config');
const colors = require('./colors');
const prefix = config.prefix;

const embeds = {
  // Custom Command Commands
  addcommand: new Discord.RichEmbed()
    .setColor(colors.customCommands)
    .setTitle(`${prefix}addcommand`)
    .setDescription('Creates a custom chat command with a custom reply.')
    .addField('Usage', `${prefix}addcommand [*command*] [*reply*]`),
  
  delcommand: new Discord.RichEmbed()
    .setColor(colors.customCommands)
    .setTitle(`${prefix}addcommand`)
    .setDescription('Deletes a custom command from the server')
    .addField('Usage', `${prefix}delcommand [*command*] [*reply*]`),

  editcommand: new Discord.RichEmbed()
    .setColor(colors.customCommands)
    .setTitle(`${prefix}editcommand`)
    .setDescription('Updates a previously created chat command with a new reply.')
    .addField('Usage', `${prefix}editcommand [*command*] [*newReply*]`),

  // Dynamic Channel Commands
  adddynamic: new Discord.RichEmbed()
    .setColor(colors.dynamic)
    .setTitle(`${prefix}adddynamic`)
    .setDescription('Adds a dynamic channel configuration for the specified category.')
    .addField('Usage', `${prefix}adddynamic [*categoryID*] [*voiceChannelName*]`),

  deldynamic: new Discord.RichEmbed()
    .setColor(colors.dynamic)
    .setTitle(`${prefix}deldynamic`)
    .setDescription('Deletes the dynamic channel configuration for the specified category.')
    .addField('Usage', `${prefix}deldynamic [*categoryID*]`),

  // Moderation Commands
  ban: new Discord.RichEmbed()
    .setColor(colors.moderation)
    .setTitle(`${prefix}ban`)
    .setDescription('Bans the mentioned member from the server.')
    .addField('Usage', `${prefix}ban [*@member/userID*] [*reason*]`),

  kick: new Discord.RichEmbed()
    .setColor(colors.moderation)
    .setTitle(`${prefix}kick`)
    .setDescription('Kicks the mentioned member from the server.')
    .addField('Usage', `${prefix}kick [*@member/userID*] [*reason*]`),

  mute: new Discord.RichEmbed()
    .setColor(colors.moderation)
    .setTitle(`${prefix}mute`)
    .setDescription('Mutes the mentioned member for a specified amount of time. The user will be unable to speak, hear, send messages, or add reactions.')
    .addField('Usage', `${prefix}mute [*@member/userID*] [*time(minutes)*] [*reason*]`)
    .addField('Note', 'The *time* parameter can be set to 0 for a mute without a timer (permanent).'),
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