/*
 * Event - Message (Runs when a messageContent is sent)
 * 
 * This event checks for:
 * Custom chat commands (Defined in ../config/commands.js)
 * 
 */

module.exports.run = (config, cmds, dynamicInfo, client, message) => {
  const messageContent = message.content.split(' ');
  const pre = config.prefix;
  // Built-In Commands
  const lock = require('../commands/dynamic-channels/lock');
  const unlock = require('../commands/dynamic-channels/unlock');
  const commands = require('../commands/custom-commands/commands');
  const addcommand = require('../commands/custom-commands/addcommand');
  const editcommand = require('../commands/custom-commands/editcommand');
  const delcommand = require('../commands/custom-commands/delcommand');
  
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
      case pre + 'commands':
        commands.exec(cmds, message);
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
        checkCustomCommands();
    }
  }

  async function checkCustomCommands() {
    const commandObj = await cmds;
    const commandList = Object.keys(commandObj);
    for (let word of messageContent) {
      if (commandList.includes(word)) {
        message.channel.send(commandObj[word]);
      }
    }
  }

  
};

