<!--
 * @Author: 朽木白
 * @Date: 2022-08-24 16:15:18
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-30 15:34:56
 * @Description: 吸顶
-->
<template>
  <view
    :class="{ sticky: fixedParams.isFixed }"
    :id="sid"
    :style="{ top: top, zIndex: zIndex }"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {
  name: 'v-sticky',
  props: {
    /** 距离顶部的距离 */
    top: {
      type: [String, Number],
      default: 0,
    },
    zIndex: {
      type: [String, Number],
      default: 999,
    },
    /** 默认id，不带# */
    sid: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      /** 吸顶元素属性 */
      fixedParams: {
        fixedH: 0, // 元素高度
        fixedTop: 0, // 元素距离顶部的距离
        isFixed: false, // 是否吸顶
      },
    };
  },
  mounted() {
    // 获取吸顶元素距离顶部的距离
    const _this = this;
    // console.log('id', this.sid);
    // 在组件中查找元素需要添加.in(this)
    this.$nextTick(() => {
      const query = uni.createSelectorQuery().in(this);
      query
        .select(`#${_this.sid}`)
        .boundingClientRect((e) => {
          _this.fixedParams.fixedTop = e.top;
          _this.fixedParams.fixedH = e.height;
        })
        .exec();
    });

    /** 监听滚动事件 */
    uni.$on('onPageScroll', (e) => {
      if (this.fixedParams.fixedTop > e.scrollTop) {
        this.fixedParams.isFixed = false;
      } else {
        this.fixedParams.isFixed = true;
      }
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.sticky {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 999;
}
</style>
