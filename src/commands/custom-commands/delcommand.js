/**
 * Command - !delcommand
 * Usage: !delcommand [command]
 */

const apollo = require('../../apollo');
const config = require('../../config');
const commandHelp = require('../../helpers/commandHelp');
const models = require('../../database/models');
const staffChecks = require('../../helpers/staffChecks');
const CommandModel = models.CommandModel;

module.exports.exec = async function(message) {
  const splitMessageContent = message.content.split(' ');
  // Command Parameters
  const commandToDelete = splitMessageContent[1];
  // Message Author Eligibility
  const messageAuthorIsEligible = staffChecks.checkEligibilityUsingAccessLevel(message.member, config.commands.delcommand.accessLevel);
  
  // SECTION Argument Checks
  if (!messageAuthorIsEligible) { 
    return; 
  }

  if (!commandToDelete) { 
    commandHelp.sendHelpEmbed(message.channel, 'delcommand'); 
    return; 
  }

  // SECTION Command Execution
  const document = await CommandModel.findOneAndDelete({ command: commandToDelete });
  if (document === null) {
    message.channel.send('Command not found.');
  } else {
    // Update the cache
    apollo.cacheCommands();
    // Log deletion
    console.log(`Command deleted: [Command: ${commandToDelete}, Document ID: ${document._id}]`);
    message.channel.send(`Command \`${commandToDelete}\` deleted!`);
  }
};