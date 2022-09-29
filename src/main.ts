import Vue from 'vue';
import App from './App.vue';
// import store from './store';
import ability from './plugins/ability';
import vuetify from './plugins/vuetify';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  // store,
  ability,
  render: h => h(App),
}).$mount('#app');
