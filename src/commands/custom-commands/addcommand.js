/**
 * Command - !addcommand
 * Usage: !addcommand [command] [reply]
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
  const newCommandName = splitMessageContent[1];
  const newCommandReply = splitMessageContent.slice(2).join(' ');
  // Message Author Eligibility
  const messageAuthorIsEligible = staffChecks.checkEligibilityUsingAccessLevel(message.member, config.commands.addcommand.accessLevel);
  
  // SECTION Argument Checks
  if (!messageAuthorIsEligible) { 
    return; 
  }

  if (!newCommandName) { 
    commandHelp.sendHelpEmbed(message.channel, 'addcommand'); 
    return; 
  }

  if (!newCommandReply) { 
    commandHelp.sendMissingArgument(message.channel, 'addcommand', 'reply'); 
    return; 
  }

  // SECTION Command Execution
  const document = await CommandModel.findOne({ command: newCommandName }).exec();
  
  if (document === null) {
    const commandDoc = await createCommand(newCommandName, newCommandReply);
    console.log(`New command added: [Command: ${commandDoc.command}, Document ID: ${commandDoc._id}]`);
    message.channel.send(`Command \`${commandDoc.command}\` added!`);
  } else {
    message.channel.send('Command already exists.');
  }
};

/**
 * Saves the command and reply to a document in the database.
 * @param {String} commandName 
 * @param {String} commandReply 
 * @returns {Promise} Promise containing the saved document.
 */
async function createCommand(commandName, commandReply) {
  const newCommand = new CommandModel({
    command: commandName,
    reply: commandReply
  });
  const commandDocument = await newCommand.save();

  // Update the command cache with the new command.
  apollo.cacheCommands();
  return commandDocument;
}