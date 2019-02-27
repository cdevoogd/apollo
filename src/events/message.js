/**
 * Client Event: Message
 * Fires when a message is sent that is visible to the bot.
 *
 * This module checks messages for commands, and redirects them to be processed if found.
 */

const commands = require('../commands');
const config = require('../config');

module.exports.process = function (client, message) {
  const messageContent = message.content.split(' ');
  const keyword = messageContent[0];

  if (message.author === client.user) { return; }
  if (message.channel.type !== 'text') { return; }

  if (keyword.startsWith(config.prefix)) {
    const command = keyword.slice(1).toLowerCase();
    if (commands[command] && config.commands[command].enabled) {
      commands[command].exec(message);
    }
  }

};
