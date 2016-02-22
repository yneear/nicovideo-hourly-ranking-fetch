import Vue from 'vue';
import App from './App.vue';

Vue.config.debug = true;

require('./css/base.css');

Vue.use(require('vue-resource'));
let hostname = window.location.hostname;
let devHostnameBool = hostname === 'localhost' || hostname === '127.0.0.1';
let root = devHostnameBool ? 'http://' + hostname + ':2333' : window.location.origin;
Vue.http.options.root = root;

new Vue({
  el: 'body',
  components: { App }
});
