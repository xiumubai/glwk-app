<!--
 * @Author: 朽木白
 * @Date: 2022-08-19 11:10:54
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-19 11:36:03
 * @Description: 
-->
<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view>
      <text class="title">{{ title }} </text>
    </view>
    <uni-list>
      <uni-list-item title="第一行"></uni-list-item>
      <uni-list-item title="第二行"></uni-list-item>
    </uni-list>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
