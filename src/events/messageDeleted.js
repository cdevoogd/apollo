/*
 * Event - Message Deleted
 *
 * Logs deleted messages to the channel set in the config if enabled.
 */

const embedColors = require('../commands/helpers/embed-colors');
module.exports.run = (config, client, message) => {
  // Don't run if disabled
  if (!config.deletedMessageLog.enabled) return;
  // Stop from logging its own deletions
  if (message.author === client.user) return;
  // Stop from logging the bot deleted !report commands (He deleted and continues in DM to create the report.)
  if (message.content === '!report') return;

  message.guild.channels.get(config.deletedMessageLog.channelID).send({embed: {
    color: embedColors.navy,
    title: 'Message Deleted',
    fields: [{
      name: 'Member',
      value: `${message.author}`
    },
    {
      name: 'Message',
      value: `${message.cleanContent}`
    },
    {
      name: 'Time Sent',
      value: `${message.createdAt}`
    }]
  }})
    .catch(err => console.error(err));
  
};