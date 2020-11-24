import Vue from 'vue';
import Vuex from 'vuex';
import user from './user.js';
import board from './board.js';
import comment from './comment.js';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { user, board, comment },
  plugins: [createPersistedState()],
});