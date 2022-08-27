<!--
 * @Author: 朽木白
 * @Date: 2022-08-26 10:42:43
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-27 11:50:02
 * @Description: 评论列表
-->
<template>
  <view class="container comment">
    <v-comment :list="commentList"></v-comment>
    <!-- 加载更多 -->
    <view class="load_more">
      <uni-load-more :status="status" />
    </view>

    <!-- <uni-easyinput
      type="textarea"
      autoHeight
      v-model="content"
      placeholder="请输入内容"
    ></uni-easyinput> -->

    <view class="comment_bar">
      <uni-search-bar
        @confirm="commentAdd"
        placeholder="点击这里可以添加评论"
        v-model="content"
        bgColor="#EEEEEE"
      >
      </uni-search-bar>
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
      options: {},
      status: 'more',
      content: '',
    };
  },
  onLoad(option) {
    this.options = option;
    this.getCommentList();
  },
  // 监听滚动事件最外层view不能添加css样式overflow：scroll
  onReachBottom() {
    if (this.status !== 'noMore') {
      this.status = 'loading';
      this.params.page++;
      this.getCommentList();
    }
  },
  methods: {
    async getCommentList() {
      try {
        const res = await userService.commentList({
          ...this.params,
          ...this.options,
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
    async commentAdd() {
      try {
        const res = await userService.commentAdd({
          content: this.content,
          ...this.options,
        });

        if (res.message == '成功') {
          uni.showToast({
            title: '评论发送成功',
          });
          this.content = '';
        }
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
  padding: 16px 16px 76px 16px;
  height: 100%;
  .comment_bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    height: 76px;
    background: linear-gradient(
      180deg,
      hsla(0, 0%, 86.7%, 0) 0,
      hsla(0, 0%, 86.7%, 0.2) 0.42857rem,
      hsla(0, 0%, 86.7%, 0.2) 0.57143rem,
      #fff 0.64286rem,
      #fff
    );
  }
}
</style>
