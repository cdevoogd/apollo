/**
 * Command - !kick
 * Usage: !kick [@member/userID] [reason]
 */

const config = require('../../config');
const commandHelp = require('../../helpers/commandHelp');
const moderationLogging = require('../../helpers/moderationLogging');
const staffChecks = require('../../helpers/staffChecks');

module.exports.exec = async function (message) {
  const splitMessageContent = message.content.split(' ').filter(word => word !== '');
  // Command Parameters
  const kickMember = message.mentions.members.first() || message.guild.members.get(splitMessageContent[1]);
  const kickReason = splitMessageContent.slice(2).join(' ');
  // Message Author Eligibility
  const messageAuthorIsEligible = staffChecks.checkEligibilityUsingAccessLevel(message.member, config.commands.kick.accessLevel);
  
  // SECTION Argument Checks
  if (!messageAuthorIsEligible) { 
    return; 
  }

  if (!splitMessageContent[1]) { 
    commandHelp.sendHelpEmbed(message.channel, 'kick'); 
    return; 
  }

  if (!kickMember) { 
    commandHelp.sendInvalidArgument(message.channel, 'kick', 'member'); 
    return; 
  }

  if (kickMember.user.bot) { 
    commandHelp.sendMemberIsBot(message.channel); 
    return; 
  }

  if (!kickReason) { 
    commandHelp.sendMissingArgument(message.channel, 'kick', 'reason'); 
    return; 
  }

  if (staffChecks.isMemberStaff(kickMember)) { 
    commandHelp.sendMemberIsStaff(message.channel); 
    return; 
  }

  if (!kickMember.kickable) { 
    commandHelp.sendMemberUnkickable(message.channel); 
    return; 
  }
  
  // SECTION Command Execution
  await kickMember.kick(kickReason);
  message.react('✅');
  moderationLogging.logKick(message, kickMember, kickReason);
};