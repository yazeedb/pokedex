const { resolve } = require('path');

module.exports = {
  root: (...args) => resolve(process.cwd(), ...args)
};
