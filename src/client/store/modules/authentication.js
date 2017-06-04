/* eslint no-param-reassign: "off"*/

import Vue from 'vue';
import settings from '../../../settings';
import router from './../../router';

// Initial state
export const state = {
  authenticated: window.localStorage.getItem('token') !== null,
  token: window.localStorage.getItem('token'),
};

export const mutations = {
  LOGIN(store, token) {
    store.authenticated = true;
    store.token = token;
    window.localStorage.setItem('token', token);
  },
  LOGOUT(store) {
    store.authenticated = false;
    store.token = null;
    window.localStorage.removeItem('token');
  },
};

export const actions = {
  login({ dispatch, commit }, token) {
    commit('LOGIN', token);
  },
  logout({ commit }) {
    Vue.http.post(`${settings.api}/logout`).then((response) => {
      if (response.data.success) {
        commit('LOGOUT');
        router.push({ name: 'auth.login' });
      }
    });
  },
};

export const store = {
  state,
  mutations,
  actions,
};
