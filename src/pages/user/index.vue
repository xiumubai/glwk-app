<!--
 * @Author: 朽木白
 * @Date: 2022-08-19 11:10:54
 * @LastEditors: xxx@xxx.com
 * @LastEditTime: 2022-09-16 16:43:25
 * @Description: 
-->
<template>
  <view class="container">
    <view class="info dark-mode">
      <h1 class="info_title">
        <image class="info_title_logo" :src="user.avatar" />
        <text class="info_title_name" @click="handleLogin">{{
          user.nickname || "去登陆"
        }}</text>
      </h1>
      <view class="info_list">
        <view class="info_item">
          <navigator class="item_a info-link" url="/pages/order/list">
            <uni-icons type="shop-filled" size="24" color="#a1a7b2"></uni-icons>
            <text class="item_dsc">我的订单</text>
          </navigator>
        </view>
        <view class="info_item">
          <navigator class="item_a info-link" url="/pages/course/collect">
            <uni-icons type="vip-filled" size="24" color="#a1a7b2"></uni-icons>
            <text class="item_dsc">我的收藏</text>
          </navigator>
        </view>
      </view>
    </view>
    <view class="list"></view>
    <view class="logout dark-mode info-link" @click="handleLogout"
      >退出登陆</view
    >
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
      isLogin: false,
      user: {},
      show: false,
    };
  },
  onLoad() {
    this.user = this.$store.state.user;
    if (!this.$store.state.token) {
      uni.navigateTo({
        url: "/pages/login/index",
      });
    }
  },
  methods: {
    handleLogin() {
      this.$store.dispatch("goLogin", () => {
        console.log("点击去登陆");
      });
    },
    handleLogout() {
      uni.showModal({
        title: "退出登陆",
        content: "点击确定退出登陆",
        success: function (res) {
          if (res.confirm) {
            // 退出登陆
            console.log("用户点击确定");
            uni.navigateTo({
              url: "/pages/login/index",
            });
            uni.clearStorageSync();
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    change(e) {
      this.show = e.show;
    },
  },
};
</script>

<style lang="scss">
@import url("@/static/styles/_global.scss");
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
      background: #fff;
    }
    &_name {
      margin-left: 10px;
      color: #c0c4cc;
      font-size: 20px;
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-wrap: normal;
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

.logout {
  height: 52px;
  line-height: 52px;
  text-align: center;
  margin-top: 10px;
}

.popup_height {
  height: 100px;
  width: 100%;
  background: #fff;
}
</style>
