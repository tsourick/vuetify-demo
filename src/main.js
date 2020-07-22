import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

new Vue({
  vuetify,
  render: h => h(App),
  mounted (){
    window.vueapp = this
  }
}).$mount('#app')
