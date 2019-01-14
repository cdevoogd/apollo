/**
 * Command - !delcommand
 * Allows staff to delete custom commands from the database.
 */

const apollo = require('../../apollo');
const models = require('../../database/models');
const helpEmbeds = require('../helpers/help-embeds');
const CommandModel = models.CommandModel;

module.exports.exec = (config, message) => {
  const messageContent = message.content.split(' ');
  const commandName = messageContent[1];

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
    message.channel.send({ embed: helpEmbeds.delcommand });
    return;
  }

  CommandModel.findOneAndDelete({ command: commandName })
    .then(doc => {
      if (doc === null) {
        message.channel.send(`Command ${commandName} not found.`);
        return;
      } else {
        console.log(`Command ${commandName} deleted.`);
        // Update the cache
        apollo.cacheCommands();
        message.channel.send(`Command ${commandName} deleted.`);
      }})
    .catch(err => console.error(err));
};