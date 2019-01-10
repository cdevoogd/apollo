const models = require('../database/models');

module.exports.exec = (msg, word) => {
  // Find the document for this command
  models.CommandModel.findOne({command: word})
    .exec()
    .then((doc) => {
      const props = doc.properties;
      if (props.mentionUser) {
        // If mentionUser = true, reply with a mention
        msg.reply(props.reply);
      } else {
        // Else, send a regular message back
        msg.channel.send(props.reply);
      }
    })
    .catch(err => console.error(err));
};