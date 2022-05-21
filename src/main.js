import Vue from 'vue'
import App from './App.vue'
import './plugins/cookie.js'    // 挂载cookie
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/axios'    // 挂载axios
import HighchartsVue from 'highcharts-vue'

Vue.use(HighchartsVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
