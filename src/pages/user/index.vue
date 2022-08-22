<!--
 * @Author: 朽木白
 * @Date: 2022-08-19 11:10:54
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-22 16:09:58
 * @Description: 
-->
<template>
  <view class="container">
    <view class="info dark-mode">
      <h1 class="info_title">
        <image class="info_title_logo" :src="user.avatarUrl" />
        <text class="info_title_name">{{ user.nickName }}</text>
      </h1>
      <view class="info_list">
        <view class="info_item">
          <navigator class="item_a info-link">
            <uni-icons type="shop-filled" size="24" color="#a1a7b2"></uni-icons>
            <text class="item_dsc">订单管理</text>
          </navigator>
        </view>
        <view class="info_item">
          <navigator class="item_a info-link">
            <uni-icons type="vip-filled" size="24" color="#a1a7b2"></uni-icons>
            <text class="item_dsc">我的学习</text>
          </navigator>
        </view>
      </view>
    </view>
    <view class="list"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
      isLogin: false,
      user: {},
    };
  },
  onLoad() {
    this.user = this.$store.state.user;
    console.log(this.$store.state.token);
    if (!this.$store.state.token) {
      uni.redirectTo({
        url: '/pages/login/index',
      });
    }
  },
  methods: {},
};
</script>

<style lang="scss">
@import url('@/static/styles/_global.scss');
.info {
  &_title {
    height: 97px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    &_logo {
      height: 60px;
      width: 60px;
      border-radius: 50%;
    }
    &_name {
      margin-left: 10px;
      color: #c0c4cc;
      font-size: 20px;
    }
  }
  &_list {
    display: flex;
    .info_item {
      width: 50%;
      text-align: center;
      .item_a {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 24px 0;
      }
      .item_dsc {
        font-size: 14px;
        margin-top: 8px;
      }
    }
  }
}
</style>
