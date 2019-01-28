/**
 * Command - !ban
 * Allows staff to ban users from the server.
 */

const embeds = require('../helpers/help-embeds');
const moderationLogs = require('../helpers/log-moderation');
const staffChecks = require('../helpers/staffChecks');

module.exports.exec = (config, message) => {
  const messageContent = message.content.split(' ');
  const banUser = message.mentions.users.first() || message.guild.members.get(messageContent[1]);
  const banReason = messageContent.slice(2).join(' ');

  const accessLevel = config.commands.ban.accessLevel;
  const memberIsEligible = staffChecks.checkAvailibilityUsingAccessLevel(config, accessLevel, message.member);

  if (!memberIsEligible) return;
  // If there are no arguments, print a help message and return.
  if (messageContent[1] === undefined) {
    message.channel.send({ embed: embeds.ban });
    return;
  }
  // Checks for invalid parameters
  if (banUser === undefined) {
    message.channel.send(`Invalid user. Type "${config.prefix}ban" for help.`);
    return;
  }
  if (banUser.bot) {
    message.channel.send('Mentioned user is a bot. Please check with the server owner to kick/ban bots from the server.');
    return;
  }
  if (banReason === '') {
    message.channel.send(`Missing reason. Type "${config.prefix}ban" for help.`);
    return;
  }

  // Rather than banning them directly through the server, I thought it would be better to fetch them as a GuildMember so that I can check that they are bannable first.
  message.guild.fetchMember(banUser)
    .then(guildMember => {
      if (staffChecks.isMemberStaff(config, guildMember)) {
        message.channel.send('You cannot ban another staff member using commands.');
        return;
      }
      if (guildMember.bannable) {
        guildMember.ban(banReason)
          .then(() => {
            message.react('✅');
            moderationLogs.logBan(message, banUser, banReason);
          })
          .catch(err => console.error(err));
      } else {
        message.channel.send('User is not bannable. They may have higher permissions than the bot, or the bot\'s permissions may be broken.');
      }
    });
};