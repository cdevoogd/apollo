/*
 * Event - Message (Runs when a content is sent)
 * 
 * This event checks for:
 * Custom chat commands (Defined in ../config/commands.js)
 * 
 */

module.exports.run = (db, commands, client, message) => {
  const content = message.content.split(' ');
  // Commands
  const customCommands = require('../commands/custom-commands');
  const ping = require('../commands/ping');

  // Stop the bot from replying to itself
  if (message.author === client.user) {
    return;
  }


  // SECTION Check for built in commands
  switch(message) {
    case '!ping':
      ping.exec(client, message);
  }
  
  // SECTION Check for custom chat commands.
  for (let word of content) {
    // Check for custom chat commands, prefix or not.
    if (Object.keys(commands).includes(word) || Object.keys(commands).includes(word.slice(1))) {
      customCommands.exec(db, commands, message, word);
    }
  }
};

