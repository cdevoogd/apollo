/**
 * Command - !editcommand
 * Usage: !editcommand [command] [newReply]
 */

const apollo = require('../../apollo');
const commandHelp = require('../../helpers/commandHelp');
const models = require('../../database/models');
const staffChecks = require('../../helpers/staffChecks');
const CommandModel = models.CommandModel;

module.exports.exec = async function(config, message) {
  const splitMessageContent = message.content.split(' ');
  // Command Parameters
  const commandToEdit = splitMessageContent[1];
  const editedCommandReply = splitMessageContent.slice(2).join(' ');
  // Message Author Eligibility
  const messageAuthorIsEligible = staffChecks.checkEligibilityUsingAccessLevel(message.member, config.commands.editcommand.accessLevel);
  // Checks
  if (!messageAuthorIsEligible) { return; }
  if (!commandToEdit) { commandHelp.sendHelpEmbed(message.channel, 'editcommand'); return; }
  if (!editedCommandReply) { commandHelp.sendMissingArgument(message.channel, 'editcommand', 'reply'); return; }
  // Execute Command
  const document = await CommandModel.findOne({ command: commandToEdit }).exec();

  if (document === null) {
    message.channel.send('Command not found.');
  } else {
    const editedDocument = await editCommand(document, editedCommandReply);
    console.log(`Command updated: [Command: ${editedDocument.command}, Document ID: ${editedDocument._id}]`);
    message.channel.send(`Command \`${editedDocument.command}\` edited!`);
  }
};

/**
 * Updates the passed document with the passed new reply.
 * @param {Object} document - Command document to update 
 * @param {String} editedReply - The command's new reply
 * @returns {Promise} Promise containing the updated document 
 */
async function editCommand(document, editedReply) {
  document.reply = editedReply;
  const newDocument = await document.save();
  // Update the cache
  apollo.cacheCommands();
  return newDocument;
}