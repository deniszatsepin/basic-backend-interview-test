const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  reference: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  speed: String,
  isHazardous: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('NearEarthObject', schema);
