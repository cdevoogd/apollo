/**
 * @module Operations
 * @description Manages the mongo connection and operations.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const models = require('./models');

/**
 * @function connect
 * @description Connects to MongoDB using environment variables.
 * @returns {undefined}
 */
module.exports.connect = () => {
  const dbUser = process.env.MONGO_USER;
  const dbPass = process.env.MONGO_PASS;
  const dbHost = process.env.MONGO_HOST;
  const dbName = process.env.MONGO_DB_NAME;
  const uri = `mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}`;

  mongoose.connect(uri, { useNewUrlParser: true })
    .then(() => {
      console.log('Database connection successful');
    })
    .catch((err) => {
      console.error('Database connection failed', err.stack);
    });
};

/**
 * @function getCommands
 * @description Retrieves all of the commands in the 'commands' database collection and returns them for use later.
 * @returns {Promise} 
 */
module.exports.getCommands = async () => {
  let output = {};
  const result = await models.CommandModel.find().exec();
  for (let obj of result) {
    output[obj.command] = obj.reply;
  }
  return output;
};

/**
 * @function getDynamicInfo
 * @description Queries and sorts the dynamics collection into an object structured (categoryID: channelName) and returns the promise.
 * @returns {Promise}
 */
module.exports.getDynamicInfo = async () => {
  let output = {};
  const result = await models.DynamicConfigurationModel.find().exec();
  for (let obj of result) {
    // Creates an object as {categoryID: channelName} for easy reference
    output[obj.categoryID] = obj.channelName;
  }
  return output;
};
