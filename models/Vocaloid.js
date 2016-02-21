var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VocaloidSchema = new Schema({
  title: String,
  userUrl: String,
  userNickname: String,
  userIconUrl: String,
  watchUrl: String,
  thumbnailUrl: String,
  created_at: { type: Date, default: Date.now  },
  rankingId: Number
});

VocaloidSchema.index({rankingId: 1});

module.exports = mongoose.model('Vocaloid', VocaloidSchema);
