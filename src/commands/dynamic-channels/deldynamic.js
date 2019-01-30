/**
 * Command - !deldynamic
 * Allows admins to delete dynamic channel configurations from the database.
 */

const apollo = require('../../apollo');
const staffChecks = require('../../helpers/staffChecks');
const embeds = require('../../helpers/commandHelp');
const models = require('../../database/models');
const DynamicCategoryModel = models.DynamicCategoryModel;

module.exports.exec = (config, message) => {
  const messageContent = message.content.split(' ');
  const dynamicCategoryID = messageContent[1];
  const memberIsAdmin = staffChecks.isMemberAdmin(config, message.member);

  // If they are not an admin, return and stop execution.
  if (!memberIsAdmin) return;
  // If there are no arguments, print a help message and return.
  if (dynamicCategoryID === undefined) {
    message.channel.send({ embed: embeds.deldynamic });
    return;
  }

  DynamicCategoryModel.findOneAndDelete({ categoryID: dynamicCategoryID })
    .then(doc => {
      if (doc === null) {
        message.channel.send(`Configuration for ${dynamicCategoryID} not found.`);
        return;
      } else {
        console.log(`Dynamic configuration for ${dynamicCategoryID} deleted.`);
        // Update the cache
        apollo.cacheDynamicInfo();
        message.channel.send(`Configuration for ${dynamicCategoryID} deleted.`);
      }
    })
    .catch(err => console.error(err));
};
