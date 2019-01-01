/**
 * !ping
 * Replies with the bot's ping to the server.
 */

module.exports.exec = (client, msg) => {
  msg.channel.send(`Current ping: ${client.ping}ms`);
};
