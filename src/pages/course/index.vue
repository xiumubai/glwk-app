<!--
 * @Author: 朽木白
 * @Date: 2022-08-22 17:06:51
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-23 09:26:27
 * @Description: 
-->
<template>
  <div class="container">
    <v-search-bar @search="search"></v-search-bar>
    <view class="filter"></view>
    <view class="course_list">
      <view class="course_list_item">
        <navigator>
          <view class="item_cover">
            <image />
            <view class="item_content">
              <h3 class="content_title"></h3>
              <view class="content_price">
                <view class="price"></view>
                <view class="buy_num"></view>
              </view>
            </view>
          </view>
        </navigator>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  onLoad() {},
  methods: {
    search(val) {
      uni.showToast({
        title: '搜索：' + val,
        icon: 'none',
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import url('@/static/styles/_global.scss');
</style>
