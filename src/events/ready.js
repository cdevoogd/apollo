function run(client) {
  console.log(`Bot ready and logged in as ${client.user.tag}!`);
  // Set bot status
  client.user
    .setActivity('your every move...', {
      type: 'WATCHING'
    })
    .then((presence) => console.log(`Set current activity to: ${presence.game ? presence.game.name : 'none'}`))
    .catch(console.error);
}

module.exports = {
  run
};
