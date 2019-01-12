const mongoose = require('mongoose');

module.exports.CommandModel = mongoose.model('command', {
  command: String, 
  properties: {
    mentionUser: Boolean,
    reply: String
  }
});

module.exports.StaffIDModel = mongoose.model('config', {
  staffIDs: []
});

module.exports.DynamicCategoryModel = mongoose.model('dynamic', {
  categoryID: String,
  channelName: String
});