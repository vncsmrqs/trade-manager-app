import Vue from 'vue';
import App from './index.vue';
// import store from './store';
import ability from './plugins/ability';
import vuetify from './plugins/vuetify';
import router from './router';
import './plugins';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  // store,
  ability,
  render: h => h(App),
}).$mount('#app');
