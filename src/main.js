import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

// Use Utils as plugin
// import Utils  from './plugins/utils.js';
// Vue.use(Utils)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
