import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from "./store";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  router: router,
}).$mount('#app')
