const models = require('../database/models');

module.exports.exec = (msg, word) => {
  // Find the document for this command
  models.CommandModel.findOne({command: word})
    .exec()
    .then((doc) => msg.channel.send(doc.reply))
    .catch(err => console.error(err));
};