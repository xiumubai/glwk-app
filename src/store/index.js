/*
 * @Author: 朽木白
 * @Date: 2022-08-22 09:34:58
 * @LastEditors: xxx@xxx.com
 * @LastEditTime: 2022-09-17 11:42:54
 * @Description:
 */
import Vue from 'vue';
import Vuex from 'vuex';
import { TOKEN_KEY, USER_KEY } from '@/config/storage-key';
Vue.use(Vuex);
// 可测试token：eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndWxpLXVzZXIiLCJpYXQiOjE2NjE0OTQ5OTQsImV4cCI6MTY2Mjk2NjIyMywiaWQiOiIxIiwibmlja25hbWUiOiLlvKDlsI8ifQ.IVkvP_NJmoDGaTmEbRYZKt80ybOA7g795ku1ZmdwQsI
const store = new Vuex.Store({
  state: {
    token: uni.getStorageSync(TOKEN_KEY) || '',
    user: JSON.parse(uni.getStorageSync(USER_KEY) || '{}'),
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
      uni.setStorageSync(USER_KEY, JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      uni.setStorageSync(TOKEN_KEY, token);
    }
  },
  actions: {
    /**
     * @description: 设置用户信息参数
     * @param {*} commit
     * @param {*} payload
     * @return {*}
     */
    setUser({ commit }, payload) {
      commit('setUser', payload);
    },
    /**
     * @description: 设置token
     * @param {*} commit
     * @param {*} payload
     * @return {*}
     */
    setToken({ commit }, payload) {
      commit('setToken', payload);
    },
    /**
     * @description: 判断是否需要跳转登陆
     * @param {*} context
     * @param {*} callBack 不需要登陆的回掉函数
     * @return {*}
     */
    goLogin(context, callBack) {
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
      } else {
        callBack();
      }
    },

  },
  modules: {},
});
export default store;
