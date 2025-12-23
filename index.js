const { createCover, consoleConfigs } = require('./src/generator');

module.exports = {
  createCover,
  consoleConfigs,
  supportedConsoles: Object.keys(consoleConfigs)
};
