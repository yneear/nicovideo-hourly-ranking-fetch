var app = require('koa')();
var staticCache = require('koa-static-cache');
var logger = require('koa-logger');
var errorhandler = require('koa-errorhandler');

var router = require('./routes');
var fetch = require('./lib/fetch');
fetch.boom();

var config = {};
var port = config.port || 2333;

app.use(errorhandler());
app.use(logger());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(staticCache('./public'));

app.listen(port, function () {
  console.log('Server listening on port ->', port);
});
