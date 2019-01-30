/**
 * Command - !delcommand
 * Allows staff to delete custom commands from the database.
 */

const apollo = require('../../apollo');
const staffChecks = require('../../helpers/staffChecks');
const embeds = require('../../helpers/commandHelp');
const models = require('../../database/models');
const CommandModel = models.CommandModel;

module.exports.exec = (config, message) => {
  const messageContent = message.content.split(' ');
  const commandName = messageContent[1];
  const memberIsStaff = staffChecks.isMemberStaff(config, message.member);

  // If they are not staff, return and stop execution.
  if (!memberIsStaff) return;
  // If there are no arguments, print a help message and return.
  if (commandName === undefined) {
    message.channel.send({ embed: embeds.delcommand });
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