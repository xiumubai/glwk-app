<!--
 * @Author: 朽木白
 * @Date: 2022-08-20 17:04:01
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-23 08:40:09
 * @Description: 
-->
<template>
  <view>
    <uni-search-bar
      radius="20"
      bgColor="#000"
      placeholder="找知识、找培训、找老师"
      v-model="searchValue"
      clearButton="auto"
      cancelButton="none"
      @confirm="search"
      @focus="focus"
    >
    </uni-search-bar>
  </view>
</template>

<script>
export default {
  name: 'v-search-bar',
  data() {
    return {
      searchVal: '',
    };
  },
  methods: {
    search(res) {
      this.$emit('serach', res.value);
    },
    focus() {
      this.$emit('focus');
    },
  },
};
</script>

<style lang="scss" scoped></style>
