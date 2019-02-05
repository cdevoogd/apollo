/**
 * Command - !clear
 * Usage: !clear [messageCount]
 */

const config = require('../../config');
const commandHelp = require('../../helpers/commandHelp');
const moderationLogging = require('../../helpers/moderationLogging');
const staffChecks = require('../../helpers/staffChecks');

module.exports.exec = async function (message) {
  const splitMessageContent = message.content.split(' ').filter(word => word !== '');
  // Command Parameters
  const clearCount = parseInt(splitMessageContent[1]);
  const maxCount = 100;
  const minCount = 2;
  // Message Author Eligibility
  const messageAuthorIsEligible = staffChecks.checkEligibilityUsingAccessLevel(message.member, config.commands.clear.accessLevel);
  
  // SECTION Argument Checks
  if (!messageAuthorIsEligible) {
    return; 
  }

  if (!splitMessageContent[1]) { 
    commandHelp.sendHelpEmbed(message.channel, 'clear'); 
    return; 
  }

  if (isNaN(clearCount)) { 
    commandHelp.sendInvalidArgument(message.channel, 'clear', 'messageCount'); 
    return; 
  }

  if (clearCount > maxCount) { 
    commandHelp.sendMaxExceeded(message.channel, 'clear', 'messageCount'); 
    return; 
  }

  if (clearCount < minCount) { 
    commandHelp.sendMinUnmet(message.channel, 'clear', 'messageCount'); 
    return; 
  }
  
  // SECTION Command Execution
  message.delete();
  message.channel.bulkDelete(clearCount);
  moderationLogging.logClear(message, clearCount);
  message.channel.send(`${clearCount} messages deleted.`)
    .then(message => {
      // Delete after 3 seconds
      setTimeout(() => { message.delete(); }, 3000);
    });
};