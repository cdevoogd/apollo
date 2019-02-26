const mongoose = require('mongoose');

module.exports.Command = mongoose.model('command', {
  command: String,
  reply: String
});

module.exports.DynamicConfiguration = mongoose.model('dynamic-config', {
  categoryID: String,
  categoryName: String,
  voiceChannelName: String
});
