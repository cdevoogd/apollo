const config = require('../config');
const apollo = require('../apollo');
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
const clear = require('../commands/moderation/clear');
const clearuser = require('../commands/moderation/clearuser');
const kick = require('../commands/moderation/kick');
const mute = require('../commands/moderation/mute');
const report = require('../commands/moderation/report');

module.exports.run = function(client, message) {
  const messageContent = message.content.split(' ');
  let msgCommand = messageContent[0].toLowerCase();

  const commandDictionary = {
    'lock': () => lock.exec(message),
    'unlock': () => unlock.exec(message),
    'adddynamic': () => adddynamic.exec(message),
    'deldynamic': () => deldynamic.exec(message),

    'commands': () => commands.exec(commandDictionary, message),
    'addcommand': () => addcommand.exec(message),
    'editcommand': () => editcommand.exec(message),
    'delcommand': () => delcommand.exec(message),

    'ban': () => ban.exec(message),
    'clear': () => clear.exec(message),
    'clearuser': () => clearuser.exec(message),
    'kick': () => kick.exec(message),
    'mute': () => mute.exec(message),
    'report': () => report.exec(message)
    
  };

  function runCommand(command) {
    if (config.commands[command].enabled) commandDictionary[command]();
  }

  async function checkCustomCommands() {
    const commands = await apollo.getCommands();
    for (let word of messageContent) {
      if (commands.hasOwnProperty(word)) {
        message.channel.send(commands[word]);
      }
    }
  }

  if (message.author === client.user) return;
  if (message.channel.type !== 'text') return;
  if (msgCommand.startsWith(config.prefix)) {
    if (commandDictionary.hasOwnProperty(msgCommand.slice(1))) {
      runCommand(msgCommand.slice(1));
      return;
    } 
  }
  checkCustomCommands();  
};

