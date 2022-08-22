<!--
 * @Author: 朽木白
 * @Date: 2022-08-22 15:13:58
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-22 15:30:42
 * @Description: 
-->
<template>
  <view class="container phone">
    <button
      class="login_list"
      open-type="getPhoneNumber"
      @getphonenumber="getphonenumber"
    >
      <image
        src="https://8.idqqimg.com/edu/mobilev2/m-core/c7d89f89754041d514fc894e93af70f4.png"
        class="login_icon"
      />
      <viewc class="text">手机号</viewc>
    </button>
  </view>
</template>

<script>
export default {
  methods: {
    getphonenumber(e) {
      console.log('e', e);
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('@/static/styles/_global.scss');

.phone {
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_list {
    border: 0;
    padding: 0;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .login_icon {
      width: 72px;
      height: 72px;
      margin-bottom: 12px;
    }
    .text {
      color: rgba(0, 0, 0, 0.5);
      font-size: 12px;
    }
  }
}
</style>
