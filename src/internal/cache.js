const database = require('../database');

let commands = database.getCommands();
let dynamicConfigs = database.getDynamicConfigs();

module.exports.getCommands = () => commands;
module.exports.getDynamicConfigs = () => dynamicConfigs;
module.exports.cacheCommands = () => commands = database.getCommands();
module.exports.cacheDynamicConfigs = () => dynamicConfigs = database.getDynamicConfigs();
