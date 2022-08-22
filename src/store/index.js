/*
 * @Author: 朽木白
 * @Date: 2022-08-22 09:34:58
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-22 09:35:35
 * @Description:
 */
import Vue from 'vue';
import Vuex from 'vuex';
import { TOKEN_KEY, USER_KEY } from '@/config/storage-key';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: uni.getStorageSync(TOKEN_KEY) || '12313',
    user: JSON.parse(uni.getStorageSync(USER_KEY) || '{}'),
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.token = user.token;
      state.user = user;
      uni.setStorageSync(TOKEN_KEY, user.token);
      uni.setStorageSync(USER_KEY, JSON.stringify(user));
    },
  },
  actions: {
    setUser({ commit }, payload) {
      commit('setUser', payload);
    },
  },
  modules: {},
});
export default store;
