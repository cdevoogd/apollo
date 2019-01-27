/**
 * Command - !commands
 * DMs the user a list of commands in the server.
 */
module.exports.exec = async (standardCommands, customCommands, message) => {
  const customCommandsObj = await customCommands;
  const commandArray = Object.keys(customCommandsObj);
  
  let standardCmdOutput = 'Built-In Commands:\n' + standardCommands.join('\n');
  let customCmdOutput = '\n\nCustom Commands:\n' + commandArray.join('\n');

  message.member.createDM()
    .then(dmChannel => dmChannel.send('```\n' + standardCmdOutput + customCmdOutput + '\n```') )
    .catch(err => console.error(err));
};