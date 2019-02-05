/**
 * Command - !commands
 * Usage: !commands
 * DMs the user a list of commands in the server.
 */
const apollo = require('../../apollo');
const config = require('../../config');
const staffChecks = require('../../helpers/staffChecks');

module.exports.exec = async function(standardCommands, message) {
  // Format: Titles are bold, commands are in italics.
  const customCommandsObject = await apollo.getCommands();
  const customCommandsArray = Object.keys(customCommandsObject);
  const standardCommandsArray = Object.keys(standardCommands);
  const accessLevels = ['admin', 'staff', undefined];
  let commandsResponse = [];
  let staffLevel = 2;

  function bold(string) {
    return '**' + string + '**';
  }

  function italicize(string) {
    return '*' + string + '*';
  }

  if (staffChecks.isMemberAdmin(message.member)) {
    staffLevel = 0;
  } else if (staffChecks.isMemberStaff(message.member)) {
    staffLevel = 1;
  } 

  commandsResponse.push(bold('Custom Chat Commands:'));
  for (let command of customCommandsArray) {
    commandsResponse.push(italicize(command));
  }

  commandsResponse.push('\n' + bold('Built-In Commands:'));
  for (let command of standardCommandsArray) {
    if (accessLevels.slice(staffLevel).includes(config.commands[command].accessLevel) && config.commands[command].enabled) {
      commandsResponse.push(italicize(command));
    }
  }

  const dmChannel = await message.member.createDM();
  dmChannel.send(commandsResponse);
};