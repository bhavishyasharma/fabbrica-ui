import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/reset.css';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import App from './App.vue';
import router from './router';
import store from './store';
import { createProvider } from './vue-apollo';
import './plugins/element.js';
import './assets/style.scss';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueLodash, { lodash: lodash });

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app');
