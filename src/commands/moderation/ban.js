/**
 * Command - !ban
 * Usage: !ban [@member/userID] [reason]
 */

const config = require('../../config');
const commandHelp = require('../../helpers/commandHelp');
const moderationLogging = require('../../helpers/moderationLogging');
const staffChecks = require('../../helpers/staffChecks');

module.exports.exec = async function(message) {
  const splitMessageContent = message.content.split(' ').filter(word => word !== '');
  // Command Parameters
  const banMember = message.mentions.members.first() || message.guild.members.get(splitMessageContent[1]);
  const banReason = splitMessageContent.slice(2).join(' ');
  // Message Author Eligibility
  const messageAuthorIsEligible = staffChecks.checkEligibilityUsingAccessLevel(message.member, config.commands.ban.accessLevel);
  
  // SECTION Argument Checks
  if (!messageAuthorIsEligible) { 
    return; 
  }

  if (!splitMessageContent[1]) { 
    commandHelp.sendHelpEmbed(message.channel, 'ban'); 
    return; 
  }

  if (!banMember) { 
    commandHelp.sendInvalidArgument(message.channel, 'ban', 'member'); 
    return; 
  }

  if (banMember.user.bot) { 
    commandHelp.sendMemberIsBot(message.channel); 
    return; 
  }

  if (!banReason) { 
    commandHelp.sendMissingArgument(message.channel, 'ban', 'reason'); 
    return; 
  }

  if (staffChecks.isMemberStaff(banMember)) { 
    commandHelp.sendMemberIsStaff(message.channel); 
    return; 
  }

  if (!banMember.bannable) { 
    commandHelp.sendMemberUnbannable(message.channel); 
    return; 
  }

  // SECTION Command Execution
  await banMember.ban(banReason);
  message.react('🔨');
  moderationLogging.logBan(message, banMember, banReason);
};