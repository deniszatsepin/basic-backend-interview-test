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
  speed: Number,
  isHazardous: {
    type: Boolean,
    default: false
  }
});

schema.statics.findHazardous = function() {
  return this.find({
    isHazardous: true
  });
};

schema.statics.findFastest = function(isHazardous) {
  return this
    .findOne({
      isHazardous
    }).sort({
      speed: -1
    });
};

module.exports = mongoose.model('NearEarthObject', schema);
