const mongoose = require('mongoose');

module.exports.CommandModel = mongoose.model('command', {
  command: String, 
  reply: String
});

module.exports.StaffIDModel = mongoose.model('config', {
  staffIDs: []
});

module.exports.DynamicConfigurationModel = mongoose.model('dynamic', {
  categoryID: String,
  channelName: String
});
