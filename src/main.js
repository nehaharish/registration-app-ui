import Vue from 'vue';
import dotenv from 'dotenv';
import axios from 'axios';
import vuetify from '@/plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common.Authorization = token;
}

dotenv.config();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
