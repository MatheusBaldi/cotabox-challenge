const Logger = {
  error(message) {
    console.log(`ERROR[${message}]`);
  },
  warn(message) {
    console.log(`WARN[${message}]`);
  },
  info(message) {
    console.log(`INFO[${message}]`);
  },
};

module.exports = Logger;
