module.exports.log = function (string) {
  console.log(string);
};

module.exports.logInfo = function (string) {
  console.log(`  [INFO] ${string}`);
};

module.exports.logInit = function (string) {
  console.log(`  [INIT] ${string}`);
};

module.exports.logError = function (error) {
  console.error(colorText('fgRed', `  [ERROR] ${error.stack}`));
};

module.exports.logErrorCustom = function (string) {
  console.error(colorText('fgRed', `  [ERROR] ${string}`));
};


const colorText = function (color, text) {
  const colors = {
    reset: '\x1b[0m',

    fgBlack: '\x1b[30m',
    fgRed: '\x1b[31m',
    fgGreen: '\x1b[32m',
    fgYellow: '\x1b[33m',
    fgBlue: '\x1b[34m',
    fgMagenta: '\x1b[35m',
    fgCyan: '\x1b[36m',
    fgWhite: '\x1b[37m',

    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m'
  };

  return colors[color] + text + colors.reset;
};
