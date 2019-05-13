/**
 * Client Event: Ready
 * Runs when the bot is fully initalized, and able to process information.
 *
 * Currently, this event just prints bot information to the console and sets the bot's presence.
 */

const logger = require('../core/logger');

module.exports.process = async function (client) {
  const currentTime = new Date();
  const presence = await client.user.setActivity('your every move...', { type: 'WATCHING' });

  // Newline to help break up sessions in logs.
  logger.log('\nApollo Initialized and Ready:');
  logger.logInit(`Start Time: ${currentTime.toString()}`);
  logger.logInit(`Logged in as: ${client.user.tag}`);
  logger.logInit(`Current Activity: ${presence.game.name || 'None'}`);
};
