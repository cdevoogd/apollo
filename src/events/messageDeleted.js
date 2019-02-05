/*
 * Event - Message Deleted
 *
 * Logs deleted messages to the channel set in the config if enabled.
 */

const Discord = require('discord.js');
const colors = require('../helpers/colors');
const config = require('../config');

module.exports.run = function(client, message) {
  if (!config.deletedMessageLog.enabled) return;
  // Stop logging when the bot deletes certain command messages.
  if (message.content.startsWith(config.prefix)) { 
    if (['report', 'clear', 'clearuser'].includes(message.content.slice(1).split(' ')[0]));
    return;
  }
  
  (message.embeds.length === 1) ? logEmbedDeletion(config, message) : logMessageDeletion(config, client, message);  
};

async function logEmbedDeletion(config, message) {
  const channel = message.guild.channels.get(config.deletedMessageLog.channelID);
  const deletedEmbed = message.embeds[0];
  const messageDeletedEmbed = new Discord.RichEmbed()
    .setColor(colors.messageDeleted)
    .setTitle('Embed Deleted')
    .addField('Time Sent', message.createdAt);

  await channel.send({ embed: messageDeletedEmbed });
  channel.send({ embed: deletedEmbed });
}

function logMessageDeletion(config, client, message) {
  // Don't log misc bot messages that are deleted
  if (message.author.id === client.user.id) { return; }

  const channel = message.guild.channels.get(config.deletedMessageLog.channelID);
  const messageDeletedEmbed = new Discord.RichEmbed()
    .setColor(colors.messageDeleted)
    .setTitle('Message Deleted')
    .addField('Member', message.author)
    .addField('Message', message.cleanContent)
    .addField('Message Versions/Edits (Includes original)', message.edits)
    .addField('Time Sent', message.createdAt);

  channel.send({ embed: messageDeletedEmbed });
}