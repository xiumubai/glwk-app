<!--
 * @Author: 朽木白
 * @Date: 2022-08-20 18:17:29
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-22 10:33:06
 * @Description: 
-->
<template>
  <view class="container">
    <button class="" @click="handleLogin">点击登陆</button>
  </view>
</template>

<script>
import userService from '@/services/user';
export default {
  onLoad() {
    // 登陆
  },

  methods: {
    async handleLogin() {
      try {
        const res = await userService.login({
          url: '/login',
        });
        // this.from = {};
        console.log(res, 'loginres');
        this.$store.dispatch('setUser', res.data);
        // this.handleMobile()
      } catch (e) {
        //TODO handle the exception
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('@/static/styles/_global.scss');
</style>
