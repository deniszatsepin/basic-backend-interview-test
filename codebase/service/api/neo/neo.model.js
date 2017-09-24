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

schema.statics = {
  findHazardous: function() {
    return this.find({
      isHazardous: true
    });
  },

  findFastest: function(isHazardous) {
    return this
      .findOne({
        isHazardous
      }).sort({
        speed: -1
      });
  },
  findBestYear: function(isHazardous) {
    const aggregators = [
      {
        $match: {
          isHazardous
        },
      },
      {
        $group: {
          _id: { $year: '$date' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 1
      }
    ];

    return this.aggregate(aggregators).then(res => res[0]);
  }
};

module.exports = mongoose.model('NearEarthObject', schema);
