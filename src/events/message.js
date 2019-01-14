/*
 * Event - Message (Runs when a messageContent is sent)
 * 
 * This event checks for:
 * Custom chat commands (Defined in ../config/commands.js)
 * 
 */

module.exports.run = (config, commands, dynamicInfo, client, message) => {
  const messageContent = message.content.split(' ');
  const pre = config.prefix;
  // Built-In Commands
  const lock = require('../commands/general/lock');
  const unlock = require('../commands/general/unlock');
  const addcommand = require('../commands/staff/addcommand');
  const editcommand = require('../commands/staff/editcommand');
  const delcommand = require('../commands/staff/delcommand');
  // Custom Commands
  const customCommands = require('../commands/custom-commands');
  

  // Stop the bot from replying to itself
  if (message.author === client.user) {
    return;
  }

  // Only run in text channels, not DMs
  if (message.channel.type === 'text') {
    switch (messageContent[0].toLowerCase()) {
      case pre + 'lock':
        lock.exec(config, dynamicInfo, message);
        break;
      case pre + 'unlock':
        unlock.exec(config, dynamicInfo, message);
        break;
      case pre + 'addcommand':
        addcommand.exec(config, message);
        break;
      case pre + 'editcommand':
        editcommand.exec(config, message);
        break;
      case pre + 'delcommand':
        delcommand.exec(config, message);
        break;
      default:
        // Checking for custom commands
        for (let word of messageContent) {
          commands.then((commandList => {
            if (commandList.includes(word)) {
              customCommands.exec(message, word);
            }
          }));
        }
    }
  }

  
};

