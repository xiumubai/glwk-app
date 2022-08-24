<!--
 * @Author: 朽木白
 * @Date: 2022-08-23 10:19:29
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-24 09:42:23
 * @Description: 
-->
<template>
  <view class="container"> </view>
</template>

<script>
import courseService from '@/services/course';
export default {
  data() {
    return {
      options: {},
      /** 章节列表 */
      chapterList: [],
      /** 课程详情 */
      course: {},
    };
  },
  onLoad(option) {
    this.options = option;
    this.getCourseDetail();
  },
  methods: {
    async getCourseDetail() {
      try {
        const res = await courseService.courseDetail({ id: this.options.id });
        this.course = res.data;
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
