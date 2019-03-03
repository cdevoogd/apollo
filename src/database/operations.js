require('dotenv').config();
const logger = require('../internal/logger');
const models = require('./models');
const mongoose = require('mongoose');

module.exports.connect = function () {
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .catch(err => logger.logError(err));
};

module.exports.getCommands = async function () {
  const commands = await models.Command.find().exec()
    .catch(err => logger.logError(err));
  
  const formattedCommandOutput = {};
  commands.forEach(command => formattedCommandOutput[command.command] = command.reply);
  return formattedCommandOutput;
};

module.exports.getDynamicConfigs = async function () {
  const configs = await models.DynamicConfiguration.find().exec()
    .catch(err => logger.logError(err));
  
  const formattedConfigOutput = {};
  configs.forEach(config => formattedConfigOutput[config.categoryID] = config.voiceChannelName);
  return formattedConfigOutput;  
};
