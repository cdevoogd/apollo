/**
 * Command - !report
 * Allows users to submit reports on users for staff to view
 */

const Discord = require('discord.js');
const colors = require('../helpers/embed-colors');
const moderationLogs = require('../helpers/log-moderation');

module.exports.exec = async (config, message) => {
  const dm = await message.member.createDM();

  let reportedUser;
  let reportReason;


  // Filter and Options used for awaitMessages()
  const filter = m => m.author.id === message.author.id;
  const options = { 
    user : {
      max: 1,
      time: 60000 // 60 seconds
    },
    reason: {
      max: 1,
      time: 180000 // 180 seconds
    }
  };

  // Delete the message so that others don't know they are being reported.
  message.delete();

  // Continue the report through DM
  // SECTION Get User
  dm.send(`Please send the name and ID of the member you would like to report. (Ex: Wumpus#0001), or type \`cancel\` to cancel the report. [Expires in ${options.user.time / 1000} seconds]`);
  await dm.awaitMessages(filter, options.user)
    .then(collected => {
      const msg = collected.first();
      const content = msg.content;

      if (content.toLowerCase() === 'cancel') {
        msg.channel.send('Report Cancelled.');
        return;
      }
      reportedUser = content;
    })
    .catch(() => {
      dm.send(`Report expired (No response after ${options.time / 1000} seconds).`);
      return;
    });
  // If it still undefined, cancel the command
  if (reportedUser === undefined) return;

  // SECTION Get Response
  dm.send(`Please send the reason for your report, or type \`cancel\` to cancel the report. [Expires in ${options.reason.time / 1000} seconds]`);
  await dm.awaitMessages(filter, options.reason)
    .then(collected => {
      const msg = collected.first();
      const content = msg.content;

      if (content.toLowerCase() === 'cancel') {
        msg.channel.send('Report Cancelled.');
        return;
      }
      reportReason = content;
    })
    .catch(() => {
      dm.send(`Report expired (No response after ${options.time / 1000} seconds).`);
      return;
    });

  if (reportReason === undefined) return;
  // SECTION Logging
  moderationLogs.logReport(message, reportedUser, reportReason);
  sendResponseLog(dm);

  function sendResponseLog(dmChannel) {
    const reportEmbed = new Discord.RichEmbed()
      .setColor(colors.report)
      .setTitle('Report')
      .addField('Member', reportedUser)
      .addField('Reason', reportReason)
      .addField('Reportee', message.author)
      .addField('Time Stamp', message.createdAt);
    
    dmChannel.send({ embed: reportEmbed });
  }
};