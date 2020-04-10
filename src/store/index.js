import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    user: JSON.parse(localStorage.getItem('user') || '{}')
  },
  getters: {
    isLoggedIn: state => !!state.accessToken
  },
  mutations: {
    login(state, payload) {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.user = payload.user;
    },
    logout(state) {
      state.accessToken = '';
      state.refreshToken = '';
      state.user = {};
    }
  },
  actions: {
    login({ commit }, { user, accessToken, refreshToken }) {
      console.log('Login');
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      commit('login', { user, accessToken, refreshToken });
    },
    logout({ commit }) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      commit('logout');
      console.log('Logout');
    }
  },
  modules: {}
});
