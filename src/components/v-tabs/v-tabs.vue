<!--
 * @Author: 朽木白
 * @Date: 2022-08-24 11:23:58
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-30 16:24:07
 * @Description: 
-->
<template>
  <view class="tabs_bar" :style="{ background: background }">
    <view
      v-for="item in tabList"
      :key="item.index"
      :class="['tabs_item', current == item.index ? 'active' : '']"
      :data-current="item.index"
      @click="clickTab"
      >{{ item.name }}</view
    >
  </view>
</template>

<script>
export default {
  name: 'v-tabs',
  props: {
    currentTab: {
      type: [String, Number],
      default: 0,
    },
    tabList: {
      type: Array,
      default: [],
    },
    background: {
      type: String,
      default: '#fff',
    },
  },
  data() {
    return {
      current: 0,
    };
  },
  mounted() {
    this.current = this.currentTab;
  },
  methods: {
    clickTab(e) {
      // console.log('e', e);
      if (this.current == e.target.dataset.current) {
        return false;
      } else {
        this.current = e.target.dataset.current;
        this.$emit('clickTab', this.current);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.tabs_bar {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  .tabs_item {
    position: relative;
    // width: 100%;
    text-align: center;
    color: #666c80;
    font-size: 12px;
    line-height: 34px;
    z-index: 1001;
  }
  .active {
    color: #3e414d;
    &::after {
      content: '';
      position: absolute;
      display: block;
      width: 20px;
      height: 3px;
      bottom: 3px;
      left: 50%;
      margin-left: -10px;
      background-color: #2080f7;
      border-radius: 6px;
    }
  }
}
</style>
