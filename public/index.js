import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';
import registerRouters from './routers.js';

Vue.config.debug = true;

require('./css/base.css');

let hostname = window.location.hostname;
let devHostnameBool = hostname === 'localhost' || hostname === '127.0.0.1';
let root = devHostnameBool ? 'http://' + hostname + ':2333' : window.location.origin;
Vue.use(require('vue-resource'));
Vue.http.options.root = root;

Vue.use(Router);

var router = new Router();

registerRouters(router);

router.start(App, '#app');
