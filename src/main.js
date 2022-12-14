import Vue from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/tailwind.css'
import 'animate.css';

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
