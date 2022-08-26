<!--
 * @Author: 朽木白
 * @Date: 2022-08-26 10:42:43
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-26 10:57:47
 * @Description: 
-->
<template>
  <view class="container comment">
    <v-comment :list="commentList"></v-comment>
    <!-- 加载更多 -->
    <view class="load_more">
      <uni-load-more :status="status" />
    </view>
  </view>
</template>

<script>
import userService from '@/services/user';
export default {
  data() {
    return {
      commentList: [],
      params: {
        page: 1,
        limit: 10,
      },
      status: 'more',
    };
  },
  onLoad() {
    this.getCommeentList();
  },
  // 监听滚动事件最外层view不能添加css样式overflow：scroll
  onReachBottom() {
    if (this.status !== 'noMore') {
      this.status = 'loading';
      this.params.page++;
      this.getCommeentList();
    }
  },
  methods: {
    async getCommeentList() {
      try {
        const res = await userService.commentList({
          ...this.params,
        });
        const items = res.data.items;
        // 数组解构拼接
        this.commentList = [...this.commentList, ...items];
        if (items.length < 10) return (this.status = 'noMore');
        if (items.length >= 10) this.status = 'more';
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
