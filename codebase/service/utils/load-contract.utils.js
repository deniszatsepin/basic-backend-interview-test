const fs = require('fs');
const yaml = require('js-yaml');

module.exports = (filename) => {
  try {
    const swaggerFile = fs.readFileSync(filename);
    return yaml.safeLoad(swaggerFile);
  } catch(err) {
    return null;
  }
}

