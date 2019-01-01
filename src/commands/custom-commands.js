// Runs custom chat commands set in the commands config.
module.exports.exec = (db, commands, msg, word) => {
  const prefix = db.prefix;
  let prefixPresent = false;


  // Check for required parameters to run the command.
  function checkCustomParameters() {
    if (prefixPresent === commands[word].reqPrefix || commands[word].requiresPrefix === false) {
      return true;
    } 
    return false;
  }

  function replyToCommand() {
    if (commands[word].mentionUser) {
      msg.reply(commands[word].reply);
    } else {
      msg.channel.send(commands[word].reply);
    }
  }


  if (word.startsWith(prefix)) {
    // Remove the prefix for use in referencing the command's parameters
    word = word.slice(1);
    prefixPresent = true;
  }
  if (checkCustomParameters()) {
    replyToCommand();
  }
};
