/**
 * Command - !clearuser
 * Usage: !clear [@member/userID] [messageCount]
 */

const commandHelp = require('../../helpers/commandHelp');
const moderationLogging = require('../../helpers/moderationLogging');
const staffChecks = require('../../helpers/staffChecks');

module.exports.exec = async function (config, message) {
  const splitMessageContent = message.content.split(' ');
  // Command Parameters
  const clearMember = message.mentions.members.first() || message.guild.members.get(splitMessageContent[1]);
  const clearCount = parseInt(splitMessageContent[2]);
  const maxCount = 100;
  const minCount = 2;
  // Message Author Eligibility
  const messageAuthorIsEligible = staffChecks.checkEligibilityUsingAccessLevel(message.member, config.commands.clearuser.accessLevel);
  // Checks
  if (!messageAuthorIsEligible) { return; }
  if (!splitMessageContent[1]) { commandHelp.sendHelpEmbed(message.channel, 'clearuser'); return; }
  if (!clearMember) { commandHelp.sendInvalidArgument(message.channel, 'clearuser', 'member'); return; }
  if (isNaN(clearCount)) { commandHelp.sendInvalidArgument(message.channel, 'clearuser', 'messageCount'); return; }
  if (clearCount > maxCount) { commandHelp.sendMaxExceeded(message.channel, 'clearuser', 'messageCount'); return; }
  if (clearCount < minCount) { commandHelp.sendMinUnmet(message.channel, 'clearuser', 'messageCount'); return; }
  // Execute Command
  message.delete();
  const messages = await message.channel.fetchMessages();
  const messageCollection = messages.filter(msg => msg.author.id === clearMember.id);
  const messageArray = messageCollection.array();
  let messagesToDelete;

  (clearCount < messageArray.length) ? messagesToDelete = messageArray.slice(0, clearCount + 1) : messagesToDelete = messageArray;
  message.channel.bulkDelete(messagesToDelete);
  moderationLogging.logClearUser(message, clearCount, clearMember);
  message.channel.send(`${clearCount} messages deleted.`)
    .then(message => {
      // Delete after 3 seconds
      setTimeout(() => { message.delete(); }, 3000);
    });
};