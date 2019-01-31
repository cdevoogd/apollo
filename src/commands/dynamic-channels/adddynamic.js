/**
 * Command - !adddynamic
 * Usage: !adddynamic [categoryID] [voiceChannelname]
 */

const apollo = require('../../apollo');
const commandHelp = require('../../helpers/commandHelp');
const models = require('../../database/models');
const staffChecks = require('../../helpers/staffChecks');
const DynamicConfigurationModel = models.DynamicConfigurationModel;

module.exports.exec = async function(config, message) {
  const splitMessageContent = message.content.split(' ');
  // Command Parameters
  const dynamicCategoryID = splitMessageContent[1];
  const dynamicChannelName = splitMessageContent.slice(2).join(' ');
  const guildCategory = message.guild.channels.get(dynamicCategoryID);
  // Message Author Eligibility
  const messageAuthorIsEligible = staffChecks.checkEligibilityUsingAccessLevel(message.member, config.commands.adddynamic.accessLevel);
  // Checks
  if (!messageAuthorIsEligible) { return; }
  if (!dynamicCategoryID) { commandHelp.sendHelpEmbed(message.channel, 'adddynamic'); return; }
  if (!dynamicChannelName) { commandHelp.sendMissingArgument(message.channel, 'adddynamic', 'voiceChannelName'); return;}
  if (!guildCategory) { message.channel.send(`${dynamicCategoryID} is not a valid category in this server.`); return; }
  // Execute Command
  const document = await DynamicConfigurationModel.findOne({ categoryID: dynamicCategoryID }).exec();

  if (document === null) {
    const createdDocument = await createDynamicConfiguration(dynamicCategoryID, dynamicChannelName);
    console.log(`Dynamic configuration added: \`[Category: ${createdDocument.categoryID}/${guildCategory.name}, Document ID: ${createdDocument._id}]\``);
    message.channel.send(`Dynamic configuration added! [${createdDocument.categoryID}/${guildCategory.name}]`);
  } else {
    message.channel.send(`Configuration for \`${dynamicCategoryID}/${guildCategory.name}\` already exists.`);
  }
};

async function createDynamicConfiguration(dynamicCategoryID, dynamicVoiceChannelName) {
  const newConfiguration = new DynamicConfigurationModel({
    categoryID: dynamicCategoryID,
    channelName: dynamicVoiceChannelName
  });

  const configDocument = await newConfiguration.save();
  // Update Cache
  apollo.cacheDynamicInfo();
  return configDocument;
}