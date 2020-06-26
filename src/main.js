import Vue from 'vue'

import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'

import App from './App.vue'

import VueGtag from "vue-gtag";

//Vue.config.productionTip = false

import VueMobileDetection from "vue-mobile-detection";

Vue.use(VueMobileDetection);

sync(store, router);


Vue.use(VueGtag, {
  config: { id: "UA-170877646-1" }
}, router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

