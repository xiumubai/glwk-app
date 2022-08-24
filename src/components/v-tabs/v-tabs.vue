<!--
 * @Author: 朽木白
 * @Date: 2022-08-24 11:23:58
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-24 12:01:19
 * @Description: 
-->
<template>
  <view class="sticky_holder bg_white" :style="{ background: background }">
    <view class="sticky_bar">
      <view
        v-for="item in tabList"
        :key="item.index"
        class="sticky_item {{current==item.index?'active':''}}"
        :data-current="item.index"
        @click="clickTab"
        >{{ item.name }}</view
      >
    </view>
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
.sticky_holder {
  height: 40px;
  width: 100%;

  .sticky_bar {
    display: flex;
    justify-content: space-around;
    line-height: 34px;
    color: #666c80;
    font-size: 12px;
    .sticky_item {
      position: relative;
    }
    .active {
      color: #3e414d;
      &::after {
        content: '';
        position: absolute;
        display: block;
        width: 1.14286rem;
        height: 0.21429rem;
        bottom: 3px;
        left: 2px;
        background-color: #2080f7;
        border-radius: 6px;
      }
    }
  }
}
</style>
