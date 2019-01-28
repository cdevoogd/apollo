/**
 * Command - !addcommand
 * Allows staff to add custom commands to the database.
 */

const apollo = require('../../apollo');
const staffChecks = require('../helpers/staffChecks');
const embeds = require('../helpers/help-embeds');
const models = require('../../database/models');
const CommandModel = models.CommandModel;

module.exports.exec = (config, message) => {
  const messageContent = message.content.split(' ');
  const commandName = messageContent[1];
  const replySlice = messageContent.slice(2);
  const commandReply = replySlice.join(' ');
  const memberIsStaff = staffChecks.isMemberStaff(config, message.member);

  /**
   * @function writeCommandDocument
   * Writes the custom command configuration to the database.
   * @returns {undefined}
   */
  function writeCommandDocument() {
    // Create a model to create the document with
    const newCommand = new CommandModel({
      command: commandName,
      reply: commandReply
    });

    newCommand.save()
      .then(doc => {
        console.log(`New command (${commandName}) added. [Document ID: ${doc._id}])`);
        // Cache the new command
        apollo.cacheCommands();
        message.channel.send(`Command ${commandName} added!`);
      })
      .catch(err => console.error(err));
  }

  // If they are not staff, return and stop execution.
  if (!memberIsStaff) return;
  // If there are no arguments, print a help message and return.
  if (commandName === undefined) {
    message.channel.send({embed: embeds.addcommand});
    return;
  }

  if (commandReply === '') {
    message.channel.send('Argument <reply> missing.');
    return;
  }

  CommandModel.findOne({ command: commandName }).exec()
    .then(doc => {
      if (doc === null) {
        writeCommandDocument();
        
      } else {
        message.channel.send(`Command ${commandName} already exists.`);
        return;
      }
    })
    .catch(err => console.error(err));  
};