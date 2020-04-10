import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/reset.css'
import App from './App.vue';
import router from './router';
import store from './store';
import { createProvider } from './vue-apollo';
import './plugins/element.js';

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app');
