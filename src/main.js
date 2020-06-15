import Vue from 'vue'
import App from './App.vue'
import router from './router'
import panZoom from 'vue-panzoom'

Vue.config.productionTip = false

Vue.use(panZoom)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

