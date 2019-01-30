/*
 * Event - Message Deleted
 *
 * Logs deleted messages to the channel set in the config if enabled.
 */

const Discord = require('discord.js');
const colors = require('../helpers/colors');

module.exports.run = (config, client, message) => {
  const messageDeletedEmbed = new Discord.RichEmbed()
    .setColor(colors.messageDeleted)
    .setTitle('Message Deleted')
    .addField('Member', message.author)
    .addField('Message', message.cleanContent)
    .addField('Time Sent', message.createdAt);

  // Don't run if disabled
  if (!config.deletedMessageLog.enabled) return;
  // Stop from logging its own deletions
  if (message.author === client.user) return;
  // Stop from logging the bot deleted !report commands (He deleted and continues in DM to create the report.)
  if (message.content === '!report') return;

  message.guild.channels.get(config.deletedMessageLog.channelID).send({embed: { messageDeletedEmbed }})
    .catch(err => console.error(err));
  
};