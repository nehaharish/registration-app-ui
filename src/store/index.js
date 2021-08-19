import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import API_URL from '../../config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    loginSuccess: null,
    registerSuccess: null,
    loginError: null,
    registerError: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.token || !!localStorage.getItem('token'),
  },
  mutations: {
    login(state, payload) {
      state.token = payload.token;
      state.loginError = payload.error ? payload.error : '';
      state.loginSuccess = !!payload.success;
    },
    register(state, payload) {
      state.registerError = payload.error ? payload.error : '';
      state.registerSuccess = !!payload.success;
    },
    logout(state) {
      state.loginError = '';
      state.registerError = '';
      state.loginSuccess = '';
      state.registerSuccess = '';
      state.token = '';
    },
  },
  actions: {
    async login({ commit, state }, { email, password }) {
      let data = '';
      try {
        data = await axios.post(`${API_URL}/login`, {
          email,
          password,
        });
        commit('login', data.data);
        localStorage.setItem('token', data.data.token);
        axios.defaults.headers.common.Authorization = data.data.token;
        state.loginError = '';
        state.registerError = '';
      } catch (err) {
        commit('login', { error: err.response.data });
      }
    },
    logout({ commit }) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common.Authorization;
      commit('logout');
    },
    async register({ commit, state }, payload) {
      const {
        firstName, lastName, email, password,
      } = payload;
      let data = '';
      try {
        data = await axios.post(`${API_URL}/register`, {
          firstName,
          lastName,
          email,
          password,
        });
        state.loginError = '';
        state.registerError = '';
        commit('register', data.data);
      } catch (err) {
        commit('register', { error: err.response.data });
      }
    },
  },
});
