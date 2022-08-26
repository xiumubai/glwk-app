<!--
 * @Author: 朽木白
 * @Date: 2022-08-26 10:42:43
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-26 10:53:11
 * @Description: 
-->
<template>
  <view class="container comment">
    <v-comment :list="commentList"></v-comment>
  </view>
</template>

<script>
import userService from '@/services/user';
export default {
  data() {
    return {
      commentList: [],
    };
  },
  onLoad() {
    this.getCommeentList();
  },
  methods: {
    async getCommeentList() {
      try {
        const res = await userService.commentList({
          page: 1,
          limit: 10,
        });
        this.commentList = res.data.items;
        console.log('res', res);
      } catch (e) {
        console.log('e', e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('@/static/styles/_global.scss');
.comment {
  background: white;
  padding: 16px 16px;
}
</style>
