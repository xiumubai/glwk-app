<!--
 * @Author: 朽木白
 * @Date: 2022-08-23 10:19:29
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-23 11:26:29
 * @Description: 
-->
<template>
  <view class="container"> detail; </view>
</template>

<script>
import teacherService from '@/services/teacher';
export default {
  data() {
    return {
      list: [],
    };
  },
  onLoad() {
    this.getTeacherList();
  },
  methods: {
    async getTeacherList() {
      try {
        const res = await teacherService.teacher({
          page: 1,
          limit: 10,
        });
        this.list = res.data.items;
      } catch (e) {
        console.log('e', e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import url('@/static/styles/_global.scss');
</style>
