/**
 * Command - !commands
 * Usage: !commands
 * DMs the user a list of commands in the server.
 */
module.exports.exec = async function(standardCommands, customCommands, message) {
  // Format: Titles are bold, commands are in italics.
  const customCommandsObject = await customCommands;
  const customCommandsList = Object.keys(customCommandsObject);
  
  let commands = [];

  commands.push('**Custom Chat Commands**');
  for (let command of customCommandsList) {
    commands.push('*' + command + '*');
  }

  commands.push('\n' + '**Built-In Commands**');
  for (let command of standardCommands) {
    commands.push('*' + command + '*');
  }

  const dmChannel = await message.member.createDM();
  dmChannel.send(commands);
};