/**
 * Command - !deldynamic
 * Usage: !deldynamic [categoryID]
 */

const apollo = require('../../apollo');
const config = require('../../config');
const commandHelp = require('../../helpers/commandHelp');
const models = require('../../database/models');
const staffChecks = require('../../helpers/staffChecks');
const DynamicConfigurationModel = models.DynamicConfigurationModel;

module.exports.exec = async function(message) {
  const splitMessageContent = message.content.split(' ');
  // Command Parameters
  const dynamicCategoryID = splitMessageContent[1];
  // Message Author Eligibility
  const messageAuthorIsEligible = staffChecks.checkEligibilityUsingAccessLevel(message.member, config.commands.deldynamic.accessLevel);
  
  // SECTION Argument Checks
  if (!messageAuthorIsEligible) { 
    return; 
  }
  if (!dynamicCategoryID) { 
    commandHelp.sendHelpEmbed(message.channel, 'deldynamic'); 
    return; 
  }

  // SECTION Command Execution
  const document = await DynamicConfigurationModel.findOneAndDelete({ categoryID: dynamicCategoryID });

  if (document === null) {
    message.channel.send(`Configuration for \`${dynamicCategoryID}\` not found.`);
  } else {
    // Update Cache
    apollo.cacheDynamicInfo();
    // Log deletion
    console.log(`Dynamic configuration deleted: [Category: ${dynamicCategoryID}, Document ID: ${document._id}]`);
    message.channel.send('Dynamic configuration deleted!');
  }
};