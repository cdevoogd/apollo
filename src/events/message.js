/*
 * Event - Message (Runs when a messageContent is sent)
 * 
 * This event checks for:
 * Custom chat commands (Defined in ../config/commands.js)
 * 
 */

module.exports.run = (config, commands, client, message) => {
  const messageContent = message.content.split(' ');
  const pre = config.prefix;
  // Commands
  const addStaffID = require('../commands/staff/addstaffid');
  const customCommands = require('../commands/custom-commands');
  

  // Stop the bot from replying to itself
  if (message.author === client.user) {
    return;
  }

  switch(messageContent[0].toLowerCase()) {
    case pre + 'addstaffid':
      addStaffID.exec(message);
      break;
    default:
      // Check for custom commands. Put in default so they dont run if they happen to overlap with another command.
      for (let word of messageContent) {
        // Check for custom chat commands, prefix or not.
        commands.then((commandList => {
          if (commandList.includes(word)) {
            customCommands.exec(message, word);
          }
        }));
      }
  }
};

