/*
 * Event - Ready (Runs when the bot is completely initialized)
 * 
 * Currently, this event is used to set the activity of the bot and print 
 * initialization info to the console.
 */

module.exports.run = function(client) {
  const currentTime = new Date();
  console.log('Start Time: ' + currentTime.toUTCString());
  console.log(`Bot ready and logged in as ${client.user.tag}!`);
  // Set bot status
  client.user
    .setActivity('your every move...', {
      type: 'WATCHING'
    })
    .then((presence) => console.log(`Set current activity to: ${presence.game ? presence.game.name : 'none'}`))
    .catch(console.error);
};

