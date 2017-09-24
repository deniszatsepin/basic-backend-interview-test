const mongoose = require('mongoose');

module.exports = function setup({ host, port, name }) {
  mongoose.Promise = global.Promise;

  return mongoose.connect(`mongodb://${host}:${port}/${name}`, {
    useMongoClient: true
  }).then((db) => {
    if (process.env.NODE_ENV === 'test') {
      db.dropDatabase();
    }

    return db;
  });
}
