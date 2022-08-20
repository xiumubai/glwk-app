<!--
 * @Author: 朽木白
 * @Date: 2022-08-19 11:10:54
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-20 17:47:16
 * @Description: 
-->
<template>
  <view class="container">
    <view class="info dark-mode">
      <h1 class="info_title">
        <image
          class="info_title_logo"
          src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJCzAG0lh2uzKeiad4V3Sj8dCIAeC1coAaGQoqQGZVD2clAubcEJIgUhu7uAogjHib4FsPZCl6IpsLA/132"
        />
        <text class="info_title_name">朽木白</text>
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
    };
  },
  onLoad() {},
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
