const errorOutputColor = '\x1b[37m\x1b[41m';

function throwConfigError(error) {
  console.log(errorOutputColor, `ERROR: Required config file not found. View the README for information on how to setup configuration files for the bot. (${error.code})`);
  process.exit();
}

module.exports = {
  throwConfigError
};