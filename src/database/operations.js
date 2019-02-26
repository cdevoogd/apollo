require('dotenv').config();
const models = require('./models');
const mongoose = require('mongoose');

module.exports.connect = function () {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .catch(err => console.error(`Database connection failed: ${err.stack}`));
};

module.exports.getCommands = function () {
  models.Command.find().exec()
    .then(commands => {
      const formattedCommandOutput = {};
      commands.forEach(command => formattedCommandOutput[command.command] = command.reply);
      return formattedCommandOutput;
    })
    .catch(err => console.error(err));
};

module.exports.getDynamicConfigs = function () {
  models.DynamicConfiguration.find().exec()
    .then(dynamicConfigs => {
      const formattedConfigOutput = {};
      dynamicConfigs.forEach(config => formattedConfigOutput[config.categoryID] = config.voiceChannelName);
      return formattedConfigOutput;
    })
    .catch(err => console.error(err));
};
