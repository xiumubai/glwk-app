<!--
 * @Author: 朽木白
 * @Date: 2022-08-20 17:04:01
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-26 11:37:46
 * @Description: 返回顶部按钮
-->
<template>
  <view
    class="back_top"
    v-show="show"
    @click="backTop"
    :style="{ bottom: bottom, right: right }"
  >
    <image
      src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/03de0936a7aafee76646b8b2d5fa5b4f.png"
    />
  </view>
</template>

<script>
export default {
  name: 'v-back-top',
  props: {
    bottom: {
      type: [String, Number],
      default: 20,
    },
    right: {
      type: [String, Number],
      default: 10,
    },
  },
  data() {
    return {
      show: false,
      scrollHeight: 0,
    };
  },
  mounted() {
    // 必须在page层级页面触发onPageScroll方法，才能接受到事件
    uni.$on('onPageScroll', (e) => {
      uni.getSystemInfo({
        success: (res) => {
          this.scrollHeight = e.scrollTop - res.windowHeight;
          this.show = this.scrollHeight > 0 ? true : false;
        },
      });
    });
  },
  methods: {
    backTop() {
      if (this.scrollHeight > 0) {
        uni.pageScrollTo({
          duration: 500,
          scrollTop: 0,
          success: () => {
            this.show = false;
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.back_top {
  position: fixed;
  right: 10px;
  bottom: 30px;
  z-index: 10000;
  width: 52px;
  height: 52px;
  image {
    width: 100%;
    height: 100%;
  }
}
</style>
