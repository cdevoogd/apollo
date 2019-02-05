/**
 * Command - !report
 * Usage: !report
 */

const moderationLogging = require('../../helpers/moderationLogging');

module.exports.exec = async function(message) {
  const dmChannel = await message.member.createDM();
  // Filter & Options for awaitMessages()
  const filter = msg => msg.author.id === message.author.id;
  const options = {
    member: {
      max: 1,
      time: 60000 // 60sec
    },
    reason: {
      max: 1,
      time: 180000 // 180sec
    }
  };

  let reportMember;
  let reportReason;

  // Delete the command call and continue in DMs.
  message.delete();

  // SECTION Get Member
  dmChannel.send(`Please send the name and ID of the member you would like to report (Ex. Wumpus#1063), or type \`cancel\` to cancel the report. [Expires in ${options.member.time / 1000} seconds]`);
  const memberCollected = await dmChannel.awaitMessages(filter, options.member);
  if (memberCollected.size === 0) { dmChannel.send(`Report expired (No response after ${options.member.time / 1000} seconds).`); return; }
  const memberContent = memberCollected.first().content;
  if (memberContent.toLowerCase() === 'cancel') { dmChannel.send('Report Cancelled.'); return; }

  reportMember = memberContent;

  // SECTION Get Reason
  dmChannel.send(`Please send the reason for your report, or type \`cancel\` to cancel the report. [Expires in ${options.reason.time / 1000} seconds]`);
  const reasonCollected = await dmChannel.awaitMessages(filter, options.reason);
  if (reasonCollected.size === 0) { dmChannel.send(`Report expired (No response after ${options.reason.time / 1000} seconds).`); return; }
  const reasonContent = reasonCollected.first().content;
  if (reasonContent.toLowerCase() === 'cancel') { dmChannel.send('Report Cancelled.'); return; }

  reportReason = reasonContent;

  // SECTION Logging
  moderationLogging.logReport(message, reportMember, reportReason);
  dmChannel.send('Thank you! Your report has been recorded and sent to the staff of the server.');
};