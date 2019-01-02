/*
 * Event - Message (Runs when a messageContent is sent)
 * 
 * This event checks for:
 * Custom chat commands (Defined in ../config/commands.js)
 * 
 */

module.exports.run = (db, commands, client, message) => {
  const messageContent = message.content.split(' ');
  // Commands
  const ping = require('../commands/ping');
  const addCommand = require('../commands/add-command');
  const addStaffID = require('../commands/add-staff-id');
  const customCommands = require('../commands/custom-commands');
  

  // Stop the bot from replying to itself
  if (message.author === client.user) {
    return;
  }


  // SECTION Check for built in commands
  switch(messageContent[0].toLowerCase()) {
    case '!addcommand':
      addCommand.exec(message);
      break;
    case '!addstaffid':
      addStaffID.exec(message);
      break;
  }
  
  // SECTION Check for custom chat commands.
  for (let word of messageContent) {
    // Check for custom chat commands, prefix or not.
    if (Object.keys(commands).includes(word) || Object.keys(commands).includes(word.slice(1))) {
      customCommands.exec(db, commands, message, word);
    }
  }
};

