/*
 * Event - Message (Runs when a messageContent is sent)
 * 
 * This event checks for:
 * Custom chat commands (Defined in ../config/commands.js)
 * 
 */

module.exports.run = (config, customCommands, dynamicInfo, client, message) => {
  const messageContent = message.content.split(' ');
  const msgCommand = messageContent[0].toLowerCase();
  const msgCommandMinusPrefix = msgCommand.slice(1);
  // Built-In Commands
  const lock = require('../commands/dynamic-channels/lock');
  const unlock = require('../commands/dynamic-channels/unlock');
  const commands = require('../commands/custom-commands/commands');
  const addcommand = require('../commands/custom-commands/addcommand');
  const editcommand = require('../commands/custom-commands/editcommand');
  const delcommand = require('../commands/custom-commands/delcommand');

  const commandDictionary = {
    'lock': () => lock.exec(config, dynamicInfo, message),
    'unlock': () => unlock.exec(config, dynamicInfo, message),
    'commands': () => commands.exec(Object.keys(commandDictionary), customCommands, message),
    'addcommand': () => addcommand.exec(config, message),
    'editcommand': () => editcommand.exec(config, message),
    'delcommand': () => delcommand.exec(config, message)
  };

  async function checkCustomCommands() {
    const commandObj = await customCommands;
    const commandList = Object.keys(commandObj);
    for (let word of messageContent) {
      if (commandList.includes(word)) {
        message.channel.send(commandObj[word]);
      }
    }
  }

  // Stop the bot from replying to itself
  if (message.author === client.user) return;
  // Only run in text channels, not DMs
  if (message.channel.type !== 'text') return;
  // If the command is in the dictionary, run it, else, check for custom commands.
  commandDictionary.hasOwnProperty(msgCommandMinusPrefix) ? 
    commandDictionary[msgCommandMinusPrefix]() : checkCustomCommands();
};

