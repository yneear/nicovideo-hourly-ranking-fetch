var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SingerSchema = new Schema({
  title: String,
  userUrl: String,
  userNickname: String,
  userIconUrl: String,
  watchUrl: String,
  thumbnailUrl: String,
  created_at: { type: Date, default: Date.now  },
  rankingId: Number
});

SingerSchema.index({rankingId: 1});

module.exports = mongoose.model('Singer', SingerSchema);
