<!--
 * @Author: 朽木白
 * @Date: 2022-08-26 10:42:43
 * @LastEditors: xxx@xxx.com
 * @LastEditTime: 2022-09-17 11:25:59
 * @Description: 评论列表
-->
<template>
  <view class="container comment">
    <v-comment :list="commentList"></v-comment>
    <!-- 加载更多 -->
    <view class="load_more">
      <uni-load-more :status="status" />
    </view>

    <view class="comment_bar">
      <input
        class="input_box"
        placeholder="请点击输入"
        cursor-spacing="10"
        v-model="content"
        @confirm="handleComment"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
      <uni-icons
        @click="handleComment"
        class="input_icon"
        type="paperplane-filled"
        size="20"
      />
    </view>
  </view>
</template>

<script>
import userService from "@/services/user";
export default {
  data() {
    return {
      commentList: [],
      params: {
        page: 1,
        limit: 10,
      },
      options: {},
      status: "more",
      content: "",
      isInput: false,
    };
  },
  onLoad(option) {
    this.options = option;
    this.getCommentList();
  },
  // 监听滚动事件最外层view不能添加css样式overflow：scroll
  onReachBottom() {
    if (this.status !== "noMore") {
      this.status = "loading";
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
        if (items.length < 10) return (this.status = "noMore");
        if (items.length >= 10) this.status = "more";
        console.log("res", res);
      } catch (e) {
        console.log("e", e);
      }
    },
    /**
     * @description: 发表评论-判断登陆状态
     * @return {*}
     */
    async commentAdd() {
      try {
        const res = await userService.commentAdd({
          data: {
            content: this.content,
            ...this.options,
          },
        });

        if (res.message == "成功") {
          uni.showToast({
            title: "评论发送成功",
          });
          this.content = "";
          this.params.page = 1;
          this.commentList = [];
          this.getCommentList();
        } else {
          uni.showToast({
            title: "评论发送失败",
            icon: "error",
          });
        }
      } catch (e) {
        console.log("e", e);
      }
    },
    handleComment() {
      this.$store.dispatch("goLogin", () => {
        this.commentAdd();
      });
    },
    handleFocus() {
      this.isInput = true;
    },
    handleBlur() {
      this.isInput = false;
    },
    handleInput() {
      this.isInput = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("@/static/styles/_global.scss");
.comment {
  background: white;
  padding: 16px 16px 50px 16px;
  height: 100%;
  .comment_bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      180deg,
      hsla(0, 0%, 86.7%, 0) 0,
      hsla(0, 0%, 86.7%, 0.2) 0.42857rem,
      hsla(0, 0%, 86.7%, 0.2) 0.57143rem,
      #fff 0.64286rem,
      #fff
    );

    .input_box {
      width: 80%;
      height: 30px;
      line-height: 30px;
      background-color: #f2f3f7;
      border-radius: 20px;
      // text-indent: 10px;
      padding-left: 10px;
      font-size: 16px;
    }
    .input_icon {
      margin-left: 8px;
    }
  }
}
</style>
