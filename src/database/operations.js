require('dotenv').config();
const logger = require('../internal/logger');
const models = require('./models');
const mongoose = require('mongoose');

module.exports.connect = function () {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .catch(err => logger.logError(err));
};

module.exports.getCommands = function () {
  models.Command.find().exec()
    .then(commands => {
      const formattedCommandOutput = {};
      commands.forEach(command => formattedCommandOutput[command.command] = command.reply);
      return formattedCommandOutput;
    })
    .catch(err => logger.logError(err));
};

module.exports.getDynamicConfigs = function () {
  models.DynamicConfiguration.find().exec()
    .then(dynamicConfigs => {
      const formattedConfigOutput = {};
      dynamicConfigs.forEach(config => formattedConfigOutput[config.categoryID] = config.voiceChannelName);
      return formattedConfigOutput;
    })
    .catch(err => logger.logError(err));
};
