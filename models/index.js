var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/nicoranking' ,function (err) {
  if (err) {
    console.error('connect to %s error:', 'nicoranking', err.message);
    process.exit(1);
  }
});

exports.Vocaloid = require('./Vocaloid');
exports.Singer = require('./Singer');
