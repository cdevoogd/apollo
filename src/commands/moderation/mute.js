/**
 * Command - !mute
 * Allows staff to mute users for a specified amount of time.
 */

const embeds = require('../../helpers/commandHelp');
const moderationLogs = require('../../helpers/moderationLogging');
const staffChecks = require('../../helpers/staffChecks');

module.exports.exec = async (config, message) => {
  const accessLevel = config.commands.kick.accessLevel;
  const memberIsEligible = staffChecks.checkAvailibilityUsingAccessLevel(config, accessLevel, message.member);

  const messageContent = message.content.split(' ');
  const muteUser = message.mentions.users.first();
  const muteMember = message.mentions.members.first() || message.guild.members.get(messageContent[1]);
  const muteTime = parseInt(messageContent[2]);
  const muteReason = messageContent.slice(3).join(' ');
  let muteRole = message.guild.roles.find(role => role.name === 'muted');

  async function mute(member, time, reason) {
    await member.addRole(muteRole.id);
    member.setMute(true, '(Apollo - Mute)' + reason);
    member.setDeaf(true, '(Apollo - Mute)' + reason);

    // If time !== 0
    if (time) {
      setTimeout(() => { 
        muteMember.removeRole(muteRole.id);
        member.setMute(false);
        member.setDeaf(false);
        moderationLogs.logUnmuteExpired(message, member, time);
      }, (time * 1000));
      
    }
  }

  if (!memberIsEligible) return;
  // If there are no arguments, print a help message and return.
  if (messageContent[1] === undefined) {
    message.channel.send({ embed: embeds.mute });
    return;
  }
  // Checks for invalid parameters
  if (muteUser === undefined) {
    message.channel.send(`Invalid user. Type "${config.prefix}mute" for help.`);
    return;
  }
  if (muteUser.bot) {
    message.channel.send('You cannot mute a bot.');
    return;
  }
  if (isNaN(muteTime)) {
    message.channel.send(`Invalid time. Type "${config.prefix}mute" for help.`);
    return;
  }
  if (muteReason === '') {
    message.channel.send(`Missing reason. Type "${config.prefix}mute" for help.`);
    return;
  }

  // Create role if it hasn't been created yet.
  if (!muteRole) {
    muteRole = await message.guild.createRole({
      name: 'muted',
      color: '#ff0000',
      permissions: []
    });
  }

  // Adding an overwrite for the role makes it so that anyone that has it can no longer send chat messages/reacitons.
  // I am only doing this on text channels, as I will server mute and deafen for voice.
  message.guild.channels.forEach(async (channel) => {
    if (channel.type === 'text') {
      await channel.overwritePermissions(muteRole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      });
    }
  });
  
  // Actually mute the user
  mute(muteMember, muteTime, muteReason);
  moderationLogs.logMute(message, muteUser, muteTime, muteReason);
};