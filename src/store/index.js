/*
 * @Author: 朽木白
 * @Date: 2022-08-22 09:34:58
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-27 15:13:01
 * @Description:
 */
import Vue from 'vue';
import Vuex from 'vuex';
import { TOKEN_KEY, USER_KEY } from '@/config/storage-key';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token:
      uni.getStorageSync(TOKEN_KEY) ||
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndWxpLXVzZXIiLCJpYXQiOjE2NjE0OTQ5OTQsImV4cCI6MTY2Mjk2NjIyMywiaWQiOiIxIiwibmlja25hbWUiOiLlvKDlsI8ifQ.IVkvP_NJmoDGaTmEbRYZKt80ybOA7g795ku1ZmdwQsI',
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
    goLogin() {
      if (!this.state.token) {
        uni.showModal({
          title: '提示',
          content: '请登录',
          success: function (res) {
            if (res.confirm) {
              uni.navigateTo({
                url: '/pages/login/index',
              });
              uni.clearStorageSync();
            } else if (res.cancel) {
              console.log('用户不想登陆');
            }
          },
        });
      }
    },
  },
  modules: {},
});
export default store;
