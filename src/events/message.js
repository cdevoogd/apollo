function run(db, commands, client, msg) {
  const customCommands = require('../commands/customCommands');
  const content = msg.content.split(' ');

  // Stop the bot from replying to itself
  if (msg.author === client.user) {
    return;
  }
  
  // Checks through every word for a custom command.
  for (let word of content) {
    // Check if a word matches with a command, even if it has a prefix.
    if (Object.keys(commands).includes(word) || Object.keys(commands).includes(word.slice(1))) {
      customCommands.run(db, commands, msg, word);
    }
  }
}

module.exports = {
  run
};
