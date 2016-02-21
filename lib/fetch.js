var cheerio = require('cheerio');
var superagent = require('superagent');
var async = require('async');
var NV = require('node-nicovideo');
var Vocaloid = require('../models').Vocaloid;

var NICO_RANKING_URL = 'http://www.nicovideo.jp/ranking/fav/hourly/vocaloid'
  , NICO_USER_URL = 'http://www.nicovideo.jp/user/';

function fetch() {
  superagent.get(NICO_RANKING_URL)
    .end(function (err, res) {
      if (err) return console.error(err);

      var $ = cheerio.load(res.text);
      var smList = $('.contentBody .videoRanking').map(function (index, element) {
        var $element = $(element);
        var smId = $element.attr('data-id'),
            rankingId = +$element.attr('id').replace('rank_', '');

        var smItem = {
          smId: smId,
          rankingId: rankingId
        };

        if (++index <= 30) return smItem;
      }).get();

      getDetail(smList);

    });

}

function getDetail(smList) {
  if (!smList || !(smList instanceof Array)) return false;
  nv = new NV();

  var smFuncList = smList.map(function (item) {
    return function(cb) {
      nv.getthumbinfo(item.smId, 'json', function (err, res) {
        var itemData = {
          rankingId: item.rankingId,
          data: res ? res.nicovideo_thumb_response.thumb[0] : null
        };
        cb(err, itemData);
      });
    };
  });

  async.series(smFuncList, function (err, results) {
    if (results.length < 30 || !(results[results.length - 1].data)) {
      fetch();
    } else {
      save(results);
    }
    if (err) return false;
  });

}

function save(smList) {
  if (!Array.isArray(smList)) return false;

  Vocaloid.remove({}, function (err) {
    if (err) return false;
    console.log('remove success');
  });

  smList.forEach(function (item) {
    var smData = item.data;

    var saveData = {
      title: smData.title,
      userUrl: smData.user_id ? NICO_USER_URL + smData.user_id : undefined,
      userNickname: smData.user_nickname,
      userIconUrl: smData.user_icon_url,
      watchUrl: smData.watch_url,
      thumbnailUrl: smData.thumbnail_url,
      rankingId: item.rankingId
    };

    Vocaloid.create(saveData);

  });

}

function boom() {
  fetch();
  setTimeout(function() {
    boom();
  }, 3.6e+6);
}

exports.boom = boom;
