import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import './registerServiceWorker'
import store from "./store";


Vue.config.productionTip = false
export const bus = new Vue();


new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
