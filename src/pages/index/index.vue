<!--
 * @Author: 朽木白
 * @Date: 2022-08-19 10:33:44
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-19 18:35:28
 * @Description: 
-->
<template>
  <view class="container">
    <uni-search-bar
      radius="20"
      bgColor="#000"
      placeholder="找知识、找培训、找老师"
      v-model="searchValue"
      clearButton="auto"
      cancelButton="none"
      @confirm="search"
    >
    </uni-search-bar>

    <view class="uni-margin-wrap">
      <swiper
        class="swiper"
        circular
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
      >
        <swiper-item>
          <view class="swiper-item uni-bg-red">A</view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-green">B</view>
        </swiper-item>
        <swiper-item>
          <view class="swiper-item uni-bg-blue">C</view>
        </swiper-item>
      </swiper>
    </view>

    <view class="text">123</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
      searchValue: '',
    };
  },
  onLoad() {},
  methods: {
    search(res) {
      uni.showToast({
        title: '搜索：' + res.value,
        icon: 'none',
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import url('@/static/styles/global.scss');
</style>
