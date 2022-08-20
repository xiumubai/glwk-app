<!--
 * @Author: 朽木白
 * @Date: 2022-08-19 11:10:52
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-20 09:46:29
 * @Description: 
-->
<template>
  <view class="container">
    <image class="logo" src="/static/logo.png" />
    <view>
      <text class="title">{{ title }} </text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello2',
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="scss">
@import url('@/static/styles/_global.scss');
</style>
