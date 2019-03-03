const models = require('./models');
const operations = require('./operations');

module.exports = {
  connect: operations.connect,
  getCommands: operations.getCommands,
  getDynamicConfigs: operations.getDynamicConfigs,

  Command: models.Command,
  DynamicConfiguration: models.DynamicConfiguration
};
