/*
 * Event - Message (Runs when a messageContent is sent)
 * 
 * This event checks for:
 * Custom chat commands (Defined in ../config/commands.js)
 * 
 */

module.exports.run = (config, customCommands, dynamicInfo, client, message) => {
  const messageContent = message.content.split(' ');
  
  let msgCommand = messageContent[0].toLowerCase();
  let msgCommandMinusPrefix;
  // Built-In Commands
  // Dynamic Channel Commands
  const lock = require('../commands/dynamic-channels/lock');
  const unlock = require('../commands/dynamic-channels/unlock');
  const adddynamic = require('../commands/dynamic-channels/adddynamic');
  const deldynamic = require('../commands/dynamic-channels/deldynamic');
  // Custom Command Commands
  const commands = require('../commands/custom-commands/commands');
  const addcommand = require('../commands/custom-commands/addcommand');
  const editcommand = require('../commands/custom-commands/editcommand');
  const delcommand = require('../commands/custom-commands/delcommand');
  // Moderation Commands
  const ban = require('../commands/moderation/ban');
  const kick = require('../commands/moderation/kick');
  const mute = require('../commands/moderation/mute');
  const report = require('../commands/moderation/report');

  const commandDictionary = {
    'lock': () => lock.exec(config, dynamicInfo, message),
    'unlock': () => unlock.exec(config, dynamicInfo, message),
    'adddynamic': () => adddynamic.exec(config, message),
    'deldynamic': () => deldynamic.exec(config, message),

    'commands': () => commands.exec(Object.keys(commandDictionary), customCommands, message),
    'addcommand': () => addcommand.exec(config, message),
    'editcommand': () => editcommand.exec(config, message),
    'delcommand': () => delcommand.exec(config, message),

    'ban': () => ban.exec(config, message),
    'kick': () => kick.exec(config, message),
    'mute': () => mute.exec(config, message),
    'report': () => report.exec(config, message)
    
  };

  function runCommand(command) {
    if (config.commands[command].enabled) commandDictionary[command]();
  }

  async function checkCustomCommands() {
    const commands = await customCommands;
    for (let word of messageContent) {
      if (commands.hasOwnProperty(word)) {
        message.channel.send(commands[word]);
      }
    }
  }

  // Stop the bot from replying to itself
  if (message.author === client.user) return;
  // Only run in text channels, not DMs
  if (message.channel.type !== 'text') return;
  // Check for prefix, and set variable if it is there.
  if (msgCommand.startsWith(config.prefix)) msgCommandMinusPrefix = msgCommand.slice(1);
  // If the command is in the dictionary, run it, else, check for custom commands.
  (commandDictionary.hasOwnProperty(msgCommandMinusPrefix)) ? runCommand(msgCommandMinusPrefix) : checkCustomCommands();
   
  
};

