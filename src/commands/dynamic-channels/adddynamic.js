/**
 * Command - !adddynamic
 * Allows admins to add dynamic channel configurations to the database.
 */

const apollo = require('../../apollo');
const staffChecks = require('../../helpers/staffChecks');
const embeds = require('../../helpers/commandHelp');
const models = require('../../database/models');
const DynamicCategoryModel = models.DynamicCategoryModel;

module.exports.exec = (config, message) => {
  const messageContent = message.content.split(' ');
  const dynamicCategoryID = messageContent[1];
  const channelNameSlice = messageContent.slice(2);
  const channelName = channelNameSlice.join(' ');
  const categoryCollection = message.guild.channels.get(dynamicCategoryID);
  const memberIsAdmin = staffChecks.isMemberAdmin(config, message.member);

  /**
   * @function writeDynamicConfiguration
   * Writes the new dynamic channel configuration to the database.
   * @returns {undefined}
   */
  function writeDynamicConfiguration() {
    // Create a model to create the document with
    const newDynamicConfig = new DynamicCategoryModel({
      categoryID: dynamicCategoryID,
      channelName: channelName
    });

    newDynamicConfig.save()
      .then(doc => {
        console.log(`New dynamic configuration added (Category: ${dynamicCategoryID}) [Document ID: ${doc._id}])`);
        apollo.cacheDynamicInfo();
        message.channel.send(`Category configuration added! [Category: ${categoryCollection.name}, Channel Name: ${channelName}]`);
      })
      .catch(err => console.error(err));
  }
  
  // If they are not an admin, return and stop execution.
  if (!memberIsAdmin) return;
  // If there are no arguments, print a help message and return.
  if (dynamicCategoryID === undefined) {
    message.channel.send({embed: embeds.adddynamic});
    return;
  }

  if (channelName === '') {
    message.channel.send('Argument <voice-channel-name> missing.');
    return;
  }

  if (categoryCollection === undefined) {
    message.channel.send(`${dynamicCategoryID} is not a valid category ID in this server.`);
    return;
  }

  DynamicCategoryModel.findOne({ categoryID: dynamicCategoryID }).exec()
    .then(doc => {
      if (doc === null) {
        writeDynamicConfiguration();
      } else {
        message.channel.send(`Configuration for ${dynamicCategoryID} already exists.`);
        return;
      }
    })
    .catch(err => console.error(err));
};
