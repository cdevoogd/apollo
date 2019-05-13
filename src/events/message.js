/**
 * Client Event: Message
 * Fires when a message is sent that is visible to the bot.
 *
 * This module checks messages for commands, and redirects them to be processed if found.
 */

const cache = require('../core/cache');
const commands = require('../commands');
const config = require('../config');

module.exports.process = function (client, message) {
  const messageContent = message.content.split(' ');
  const keyword = messageContent[0];

  if (message.author === client.user) { return; }
  if (message.channel.type !== 'text') { return; }

  // Check for built-in command & run if valid
  if (keyword.startsWith(config.prefix)) {
    const command = keyword.slice(1).toLowerCase();
    if (commands[command] && config.commands[command].enabled) {
      commands[command].exec(message);
      return;
    }
  }

  checkForCustomCommands(message);
};

const checkForCustomCommands = async function (message) {
  const customCommands = await cache.getCommands();
  for (const word of message.content.split(' ')) {
    if (customCommands[word]) {
      message.channel.send(customCommands[word]);
      break;
    }
  }
};
