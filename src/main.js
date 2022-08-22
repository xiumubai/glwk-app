/*
 * @Author: 朽木白
 * @Date: 2022-08-19 10:33:44
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-22 09:37:06
 * @Description:
 */
import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

import store from '@/store/index';

App.mpType = 'app';

const app = new Vue({
  ...App,
  store,
});
app.$mount();
