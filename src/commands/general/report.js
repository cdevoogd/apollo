const CommandBase = require('../CommandBase');
const logger = require('../../internal/logger');
const moderationLogging = require('../../internal/moderation-logging');

module.exports.info = {
  name: 'report',
  description: 'Allows users to submit reports through DM for staff to review.',
  usage: 'report'
};

module.exports.exec = function (message) {
  const command = new ReportCommand(message, exports.info);
  command.process();
};

class ReportCommand extends CommandBase {
  constructor (message, info) {
    super(message, info);

    this.filter = msg => msg.author.id === message.author.id;
    this.memberOptions = {
      max: 1,
      time: 60000
    };

    this.reasonOptions = {
      max: 1,
      time: 180000
    };

    this.channel;
    this.member;
    this.reason;
  }

  async process () {
    // Delete the command call and continue in DMs
    this.message.delete();

    this.channel = await this.message.member.createDM()
      .catch(err => logger.logError(err));

    if (await this.getMember()) {
      if (await this.getReason()) {
        moderationLogging.logReport(this.message, this.member, this.reason);
        this.channel.send('Thank you! Your report has been recorded and send to the staff of the server.');
      }
    }
    
  }

  async getMember () {
    this.channel.send(`Please send the name and ID of the member you would like to report (Ex. Wumpus#1063), or type \`cancel\` to cancel the report. [Expires in ${this.memberOptions.time / 1000} seconds]`);
    
    const collectedMessage = await this.channel.awaitMessages(this.filter, this.memberOptions);
    if (collectedMessage.size === 0) {
      this.channel.send(`Report expired (No response after ${this.memberOptions.time / 1000} seconds).`);
      return false; 
    }

    const messageContent = collectedMessage.first().content;
    if (messageContent.toLowerCase() === 'cancel') {
      this.channel.send('Report Cancelled.');
      return false; 
    }

    this.member = messageContent;
    return true;
  }

  async getReason () {
    this.channel.send(`Please send the reason for your report, or type \`cancel\` to cancel the report. [Expires in ${this.reasonOptions.time / 1000} seconds]`);

    const collectedMessage = await this.channel.awaitMessages(this.filter, this.reasonOptions);
    if (collectedMessage.size === 0) {
      this.channel.send(`Report expired (No response after ${this.reasonOptions.time / 1000} seconds).`);
      return false;
    }

    const messageContent = collectedMessage.first().content;
    if (messageContent.toLowerCase() === 'cancel') {
      this.channel.send('Report Cancelled.');
      return false;
    }

    this.reason = messageContent;
    return true;
  }
}
