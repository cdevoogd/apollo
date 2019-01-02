const mongoose = require('mongoose');

// SECTION Mongoose Models
module.exports.CommandModel = mongoose.model('command', {
  command: String, 
  properties: {
    requiresPrefix: Boolean,
    mentionUser: Boolean,
    reply: String
  }
});

module.exports.StaffIDModel = mongoose.model('role', {
  staffIDs: []
});

module.exports.DynamicCategoryModel = mongoose.model('dynamicChannel', {
  categoryName: String,
  categoryID: String,
  channelName: String
});
