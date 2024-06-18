const { v4: uuidv4 } = require('uuid');

function generateUID() {
  return uuidv4();
}

module.exports = {generateUID};