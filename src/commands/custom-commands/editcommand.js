/**
 * Command - !delcommand
 * Allows staff to edit the replies of already created commands.
 */

const apollo = require('../../apollo');
const staffChecks = require('../../helpers/staffChecks');
const embeds = require('../../helpers/commandHelp');
const models = require('../../database/models');
const CommandModel = models.CommandModel;

module.exports.exec = (config, message) => {
  const messageContent = message.content.split(' ');
  const commandName = messageContent[1];
  const replySlice = messageContent.slice(2);
  const commandEditedReply = replySlice.join(' ');
  const memberIsStaff = staffChecks.isMemberStaff(config, message.member);


  /**
   * @function updateCommandDocument
   * Updates the custom command configuration in the database.
   * @returns {undefined}
   */
  function updateCommandDocument(commandDoc) {
    // Replace the old reply with the new version.
    commandDoc.reply = commandEditedReply;
    // Update the document.
    commandDoc.save()
      .then(doc => {
        console.log(`Command (${commandName}) edited. [Document ID: ${doc._id}])`);
        // Cache the updated command
        apollo.cacheCommands();
        message.channel.send(`Command ${commandName} edited!`);
      })
      .catch(err => console.error(err));
  }


  // If they are not staff, return and stop execution.
  if (!memberIsStaff) return;
  // If there are no arguments, print a help message and return.
  if (commandName === undefined) {
    message.channel.send({ embed: embeds.editcommand });
    return;
  }

  if (commandEditedReply === '') {
    message.channel.send('Argument <reply> missing.');
    return;
  }

  CommandModel.findOne({ command: commandName }).exec()
    .then(doc => {
      if (doc === null) {
        message.channel.send(`Could not find command ${commandName}.`);
        return;
      } else {
        updateCommandDocument(doc);
      }
    })
    .catch(err => console.error(err));



};