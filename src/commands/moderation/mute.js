/**
 * Command - !mute
 * Usage: !mute [@member/userID] [time(minutes)] [reason]
 */

const commandHelp = require('../../helpers/commandHelp');
const moderationLogging = require('../../helpers/moderationLogging');
const staffChecks = require('../../helpers/staffChecks');

module.exports.exec = async function (config, message) {
  const splitMessageContent = message.content.split(' ');
  // Command Parameters
  const muteMember = message.mentions.members.first() || message.guild.members.get(splitMessageContent[1]);
  const muteTime = Number(splitMessageContent[2]);
  const muteReason = splitMessageContent.slice(3).join(' ');
  // Message Author Eligibility
  const messageAuthorIsEligible = staffChecks.checkEligibilityUsingAccessLevel(message.member, config.commands.mute.accessLevel);
  // Checks
  if (!messageAuthorIsEligible) { return; }
  if (!splitMessageContent[1]) { commandHelp.sendHelpEmbed(message.channel, 'mute'); return; }
  if (!muteMember) { commandHelp.sendInvalidArgument(message.channel, 'mute', 'member'); return; }
  if (muteMember.user.bot) { commandHelp.sendMemberIsBot(message.channel); return; }
  if (isNaN(muteTime)) { commandHelp.sendInvalidArgument(message.channel, 'mute', 'time'); return; }
  if (!muteReason) { commandHelp.sendMissingArgument(message.channel, 'mute', 'reason'); return; }
  if (staffChecks.isMemberStaff(muteMember)) { commandHelp.sendMemberIsStaff(message.channel); return; }
  // Execute Command
  let muteRole = message.guild.roles.find(role => role.name === 'Muted');

  if (!muteRole) {
    muteRole = await message.guild.createRole({
      name: 'Muted',
      color: 'DEFAULT',
      permissions: []
    });
  }

  message.guild.channels.forEach(async (channel) => {
    if (channel.type === 'text') {
      await channel.overwritePermissions(muteRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      });
    }
  });

  mute(muteRole, muteMember, muteTime, muteReason);
  message.react('✅');
  moderationLogging.logMute(message, muteMember, muteTime, muteReason);
};

async function mute(muteRole, member, time, reason) {
  await member.addRole(muteRole.id);
  member.setMute(true, '[Apollo - Mute]: ' + reason);
  member.setDeaf(true, '[Apollo - Mute]: ' + reason);
  // If the time set !== 0, set timer for unmute.
  if (time) {
    setTimeout(() => {
      member.removeRole(muteRole.id);
      member.setMute(false);
      member.setDeaf(false);
    }, (time * 60000));
  }
}