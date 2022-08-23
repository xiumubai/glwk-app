<!--
 * @Author: 朽木白
 * @Date: 2022-08-20 17:04:01
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-23 15:23:34
 * @Description: 
-->
<template>
  <view class="preferences">
    <h2 class="preferences_title">
      {{ title }}
      <navigator
        class="link"
        :url="link"
        :open-type="type === 'course' ? 'switchTab' : 'navigate'"
      >
        {{ linkTitle }}
        <uni-icons type="right" size="12"></uni-icons>
      </navigator>
    </h2>
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'v-card',
  props: {
    title: {
      type: String,
      default: '热门',
    },
    linkTitle: {
      type: String,
      default: '全部',
    },
    type: {
      type: String,
      default: 'course',
    },
    link: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.preferences {
  padding: 0 16px 24px 16px;
  &_title {
    color: $uni-text-color-white;
    font-size: 14px;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    display: flex;
    .link {
      font-size: $uni-font-size-12;
      color: $uni-text-color;
    }
  }
}
</style>
