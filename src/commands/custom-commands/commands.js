/**
 * Command - !commands
 * DMs the user a list of commands in the server.
 */
module.exports.exec = async (commands, message) => {
  const commandsObj = await commands;
  const commandArray = Object.keys(commandsObj);
  
  let output = commandArray.join('\n');

  message.member.createDM()
    .then(dmChannel => {
      dmChannel.send('```\n' + output + '\n```');
    })
    .catch(err => console.error(err));
};