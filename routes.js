var router = require('koa-router')();
var views = require('co-views');
var Vocaloid = require('./models').Vocaloid;
var Singer = require('./models').Singer;
var Player = require('./models').Player;

var render = views('./', {
  map: { html: 'ejs' }
});

router.get('/', function *() {
  this.body = yield render('index');
});

router.get('/getVocaloid', function *() {
  if (process.env.NODE_ENV === 'default') {
    this.set('Access-Control-Allow-Origin', '*');
    this.set('Access-Control-Allow-Headers', 'Content-type');
  }
  this.body = yield Vocaloid.find().exec();
});

router.get('/getSinger', function *() {
  if (process.env.NODE_ENV === 'default') {
    this.set('Access-Control-Allow-Origin', '*');
    this.set('Access-Control-Allow-Headers', 'Content-type');
  }
  this.body = yield Singer.find().exec();
});

router.get('/getPlayer', function *() {
  if (process.env.NODE_ENV === 'default') {
    this.set('Access-Control-Allow-Origin', '*');
    this.set('Access-Control-Allow-Headers', 'Content-type');
  }
  this.body = yield Player.find().exec();
});

module.exports = router;
