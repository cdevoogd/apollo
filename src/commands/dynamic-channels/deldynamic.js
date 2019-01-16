/**
 * Command - !deldynamic
 * Allows admins to delete dynamic channel configurations from the database.
 */

const apollo = require('../../apollo');
const models = require('../../database/models');
const helpEmbeds = require('../helpers/help-embeds');
const DynamicCategoryModel = models.DynamicCategoryModel;

module.exports.exec = (config, message) => {
  const messageContent = message.content.split(' ');
  const dynamicCategoryID = messageContent[1];

  const memberRoleIDs = message.member.roles.keyArray();
  let memberIsAdmin = false;

  // Loop through the member's IDs and check if they have the admin role ID.
  for (let id of memberRoleIDs) {
    if (id === config.adminRoleID) {
      memberIsAdmin = true;
      break;
    }
  }

  // If they are not an admin, return and stop execution.
  if (!memberIsAdmin) return;
  // If there are no arguments, print a help message and return.
  if (dynamicCategoryID === undefined) {
    message.channel.send({ embed: helpEmbeds.deldynamic });
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
