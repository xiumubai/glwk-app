<!--
 * @Author: 朽木白
 * @Date: 2022-08-19 10:33:44
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-20 14:44:22
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

    <view class="swiper_box">
      <swiper
        class="swiper"
        circular
        indicator-dots
        autoplay
        :interval="2000"
        indicator-color="#fff"
        indicator-active-color="#26B7FF"
        :duration="500"
      >
        <swiper-item v-for="item in bannerList" :key="item.src">
          <view class="swiper_item uni_bg_red">
            <image mode="heightFix" :src="item.src" />
          </view>
        </swiper-item>
      </swiper>
    </view>

    <view>
      <view class="hot_cate">
        <view class="hot_cate_item" v-for="item in hostList" :key="item.src">
          <navigator class="hot_cate_item_a">
            <image class="hot_cate_item_img" alt="img" :src="item.src" />
            <text class="hot_cate_item_name">{{ item.name }}</text>
          </navigator>
        </view>
      </view>
    </view>
    <!-- 偏好推荐 -->
    <view class="preferences">
      <h2 class="preferences_title">
        精选推荐
        <navigator class="link">
          查看更多
          <uni-icons type="right" size="12"></uni-icons>
        </navigator>
      </h2>
      <view class="preferences_list">
        <view class="preferences_list_item">list</view>
        <view class="preferences_list_item">list</view>
        <view class="preferences_list_item">list</view>
        <view class="preferences_list_item">list</view>
      </view>
    </view>
  </view>
</template>

<script>
import { hotCateList, bannerList } from '@/common/constant.js';
export default {
  data() {
    return {
      title: 'Hello',
      searchValue: '',
      hostList: Object.freeze(hotCateList),
      bannerList: Object.freeze(bannerList),
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
@import url('@/static/styles/_global.scss');

.swiper_box {
  width: 100%;

  .swiper_item {
    width: 100%;
    height: 100%;
    background: #000;
  }
}

.hot_cate {
  padding: $uni-spacing-row-sm;
  background: $uni-gradient-bg-color;
  display: flex;
  flex-wrap: wrap;
  &_item {
    width: 20%;
    &_a {
      display: flex;
      // @include flex-display;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    &_img {
      width: 36px;
      height: 36px;
      margin-bottom: 8px;
    }
    &_name {
      font-size: 12px;
      color: #737780;
    }
  }
}
.preferences {
  padding: 24px 16px;
  &_title {
    color: #fff;
    font-size: 14px;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    display: flex;
    .link {
      font-size: 12px;
      color: #737780;
    }
  }
  &_list {
    &_item {
      padding-bottom: 8px;
      display: inline-block;
      width: 50%;
      box-sizing: border-box;
      &:nth-child(2n-1) {
        padding-right: 4px;
      }
      &:nth-child(2n) {
        padding-left: 4px;
      }
    }
  }
}
</style>
