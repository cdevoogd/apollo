/**
 * Command - !kick
 * Allows staff to kick users from the server.
 */

const embeds = require('../../helpers/commandHelp');
const moderationLogs = require('../../helpers/moderationLogging');
const staffChecks = require('../../helpers/staffChecks');

module.exports.exec = (config, message) => {
  const messageContent = message.content.split(' ');
  const kickUser = message.mentions.users.first() || message.guild.members.get(messageContent[1]);
  const kickReason = messageContent.slice(2).join(' ');
  const accessLevel = config.commands.kick.accessLevel;
  const memberIsEligible = staffChecks.checkAvailibilityUsingAccessLevel(config, accessLevel, message.member);

  if (!memberIsEligible) return;
  // If there are no arguments, print a help message and return.
  if (messageContent[1] === undefined) {
    message.channel.send({ embed: embeds.kick });
    return;
  }
  // Checks for invalid parameters
  if (kickUser === undefined) {
    message.channel.send(`Invalid user. Type "${config.prefix}kick" for help.`);
    return;
  }
  if (kickUser.bot) {
    message.channel.send('Mentioned user is a bot. Please check with the server owner to kick/ban bots from the server.');
    return;
  }
  if (kickReason === '') {
    message.channel.send(`Missing reason. Type "${config.prefix}kick" for help.`);
    return;
  }

  // Rather than kicking them directly through the server, I thought it would be better to fetch them as a GuildMember so that I can check that they are kickable first.
  message.guild.fetchMember(kickUser)
    .then(guildMember => {
      if (staffChecks.isMemberStaff(config, guildMember)) {
        message.channel.send('You cannot kick another staff member using commands.');
        return;
      }
      if (guildMember.kickable) {
        guildMember.kick(kickReason)
          .then(() => {
            message.react('✅');
            moderationLogs.logKick(message, kickUser, kickReason);
          })
          .catch(err => console.error(err));
      } else {
        message.channel.send('User is not kickable. They may have higher permissions than the bot, or the bot\'s permissions may be broken.');
      }
    });
};