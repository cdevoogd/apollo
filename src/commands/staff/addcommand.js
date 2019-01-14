/**
 * Command - !addcommand
 * Allows staff to add custom commands to the database.
 */

const apollo = require('../../apollo');
const models = require('../../database/models');
const helpEmbeds = require('../helpers/help-embeds');
const CommandModel = models.CommandModel;

module.exports.exec = (config, message) => {
  const messageContent = message.content.split(' ');
  const commandName = messageContent[1];
  
  const replySlice = messageContent.slice(2);
  const commandReply = replySlice.join(' ');

  const memberRoleIDs = message.member.roles.keyArray();
  const staffRoleIDs = config.staffRoleIDs;
  let memberIsStaff = false;

  // Loop through the member's IDs and check if they have a staff role.
  for (let id of memberRoleIDs) {
    if (staffRoleIDs.includes(id)) {
      memberIsStaff = true;
      break;
    }
  }

  // If they are not staff, return and stop execution.
  if (!memberIsStaff) return;
  // If there are no arguments, print a help message and return.
  if (commandName === undefined) {
    message.channel.send({embed: helpEmbeds.addcommand});
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
        apollo.cacheCommands();
      } else {
        message.channel.send(`Command ${commandName} already exists.`);
        return;
      }
    })
    .catch(err => console.error(err));
    
    
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
        message.channel.send(`Command ${commandName} added!`);
      })
      .catch(err => console.error(err));
  }
};