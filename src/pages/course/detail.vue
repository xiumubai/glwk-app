<!--
 * @Author: 朽木白
 * @Date: 2022-08-23 10:19:29
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-27 15:11:12
 * @Description: 课程详情
-->
<template>
  <view class="container">
    <view class="course">
      <view class="banner">
        <image :src="courseDetail.cover" />
      </view>

      <view class="info bg_white">
        <view class="price">
          <h3>
            <text>¥</text>
            {{ courseDetail.price }}
          </h3>
          <view class="buy_count">已有{{ courseDetail.buyCount }}人购买</view>
        </view>
        <h3 class="name">
          {{ courseDetail.title }}
        </h3>
        <view class="tag_list">
          <view class="tag_item">{{ courseDetail.subjectLevelTwo }}</view>
        </view>
      </view>

      <view class="tab_wrapper bg_white">
        <v-sticky sid="tab">
          <v-tabs :tabList="tabList" @click-tab="clickTab"></v-tabs>
        </v-sticky>
      </view>
      <view class="intro" id="anchor0">
        <view class="title"> 讲师介绍 </view>
        <navigator
          :url="'/pages/teacher/detail?id=' + courseDetail.teacherId"
          class="teacher_info"
        >
          <view class="avatar">
            <image :src="courseDetail.avatar" />
          </view>
          <view class="teacher_desc">
            <view class="teacher_name"
              >高级讲师-{{ courseDetail.teacherName }}</view
            >
            <view class="teacher_intro">{{ courseDetail.intro }}</view>
          </view>
        </navigator>
        <view class="title"> 课程详情 </view>
        <view class="course_detail" v-html="courseDetail.description"> </view>
      </view>
      <view class="catalogue" id="anchor1">
        <view class="title"> 课程目录 </view>
        <view class="catalogue_list">
          <uni-collapse ref="collapse">
            <uni-collapse-item
              :title="item.title"
              v-for="item in chapterList"
              :key="item.id"
            >
              <view class="task_list">
                <view
                  class="task_items"
                  v-for="child in item.children"
                  :key="child.id"
                  @click="handleLink(child.videoSourceId)"
                >
                  <image
                    class="task_type"
                    src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/f1c59a1527e075f6ebfba3d7ac605f07.png"
                  />
                  <view class="task_title">{{ child.title }}</view>
                  <image
                    class="task_icon"
                    src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/064fdd1eb99fcb8bef80085f2b548e4b.png"
                  />
                </view>
              </view>
            </uni-collapse-item>
          </uni-collapse>
        </view>
      </view>
      <view class="comment" id="anchor2">
        <view class="title">
          <view class="title_left"> 学员评价（{{ comment.total || 0 }}）</view>
          <navigator
            :url="`/pages/course/comment?courseId=${options.id}&teacherId=${courseDetail.teacherId}`"
            class="title_right"
          >
            查看全部<uni-icons
              type="right"
              color="#666c80"
              size="12"
            ></uni-icons>
          </navigator>
        </view>
        <view class="comment_wrapper">
          <v-comment :list="comment.items"></v-comment>
          <navigator
            :url="`/pages/course/comment?courseId=${options.id}&teacherId=${courseDetail.teacherId}`"
          >
            <uni-load-more status="more" :content-text="contentText" />
          </navigator>
        </view>
      </view>
    </view>

    <v-back-top></v-back-top>
    <view class="bottom_tabbar">
      <view class="bottom_wrap">
        <view class="bottom_button">
          <view class="favo_button" @click="handleFavo">
            <view :class="['bg', isCollect ? 'active' : '']"></view>
            收藏
          </view>
        </view>
        <view class="bottom_main">
          <view class="buy_button" @click="hangleBuy"> 点击购买 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import courseService from '@/services/course';
import userService from '@/services/user';

const tabList = [
  { index: 0, name: '介绍' },
  { index: 1, name: '目录' },
  { index: 2, name: '评价' },
];
export default {
  data() {
    return {
      options: {},
      /** 章节列表 */
      chapterList: [],
      /** 课程详情 */
      course: {},
      courseDetail: {},
      tabList: Object.freeze(tabList),
      isCollect: false,
      // 锚点元素top值
      enchorParams: {
        enchorTop1: 0,
        enchorTop2: 0,
        enchorTop3: 0,
      },
      comment: {},
      contentText: {
        contentdown: '点击查看更多评论',
      },
    };
  },
  onLoad(option) {
    this.options = option;
    /** 获取tab元素属性 */
    const query = uni.createSelectorQuery();

    // 提前保存锚点元素的top值
    this.$nextTick(() => {
      query
        .select('#anchor0')
        .boundingClientRect((e) => {
          this.enchorParams.enchorTop1 = e.top;
        })
        .exec();
      this.getCourseDetail();
      query
        .select('#anchor1')
        .boundingClientRect((e) => {
          this.enchorParams.enchorTop2 = e.top;
        })
        .exec();
      this.getCourseDetail();
      query
        .select('#anchor2')
        .boundingClientRect((e) => {
          this.enchorParams.enchorTop3 = e.top;
        })
        .exec();
    });
    this.getCourseDetail();
    this.getCommentList();
  },
  onPageScroll(e) {
    uni.$emit('onPageScroll', e);
  },
  methods: {
    async getCommentList() {
      try {
        const res = await userService.commentList({
          page: 1,
          limit: 10,
          courseId: this.options.id,
        });
        this.comment = res.data;
        console.log('res', res);
      } catch (e) {
        console.log('e', e);
      }
    },
    async getCourseDetail() {
      try {
        const res = await courseService.courseDetail({
          id: this.options.id,
          // id: '1192252213659774977',
        });
        this.chapterList = res.data.chapterList;
        this.course = res.data;
        this.courseDetail = res.data.course;
        this.isCollect = res.data.isCollect;
      } catch (e) {
        console.log('e', e);
      }
    },
    async collectSave() {
      try {
        const res = await courseService.courseCollectSave({
          courseId: String(this.options.id),
        });
        if (res.code === 200) {
          uni.showToast({
            title: '添加收藏成功',
            duration: 2000,
          });
          this.isCollect = true;
        }
      } catch (e) {
        console.log('e', e);
      }
    },
    async collectRemove() {
      try {
        const res = await courseService.courseCollectRemove({
          courseId: String(this.options.id),
        });
        if (res.code === 200) {
          uni.showToast({
            title: '取消收藏成功',
            duration: 2000,
          });
          this.isCollect = false;
        }
      } catch (e) {
        console.log('e', e);
      }
    },
    handleLink(videoSourceId) {
      this.$store.dispatch('goLogin');
      // 跳转之前判断该课程是否已经购买，是否已经登陆账户
      uni.navigateTo({
        url: `/pages/video/index?id=${this.options.id}&videoSourceId=${videoSourceId}`,
      });
    },
    handleBuy() {
      this.$store.dispatch('goLogin');
      // 点击购买
      // 判断是否登陆，是否已经购买，已经购买了，按钮显示去学习
    },
    handleFavo() {
      this.$store.dispatch('goLogin');
      if (!this.isCollect) {
        this.collectSave();
      } else {
        this.collectRemove();
      }
    },
    clickTab(index) {
      // 点击tab的时候触发
      const _this = this;
      let top = 0;
      if (index == 0) {
        top = this.enchorParams.enchorTop1;
      } else if (index == 1) {
        top = this.enchorParams.enchorTop2;
      } else {
        top = this.enchorParams.enchorTop3;
      }

      // 锚点定位，滚动到对应的位置
      uni.pageScrollTo({
        duration: 500,
        scrollTop: top,
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import url('@/static/styles/_global.scss');

.course {
  background: #f2f3f8;
  padding-bottom: 56px;
  .banner {
    height: 210px;
    width: 100%;
    image {
      width: 100%;
      height: 100%;
    }
  }

  .info {
    border-radius: 0 0 12px 12px;
    padding: 16px;
    margin-bottom: 12px;
    .price {
      display: flex;
      justify-content: space-between;
      h3 {
        color: #ff7b37;
        font-size: 20px;
        text {
          font-size: 12px;
        }
      }
      .buy_count {
        font-size: 12px;
        color: #666c80;
      }
    }

    .name {
      font-size: 18px;
      margin: 8px;
    }

    .tag_list {
      display: flex;
      .tag_item {
        border: 1px solid #666c80;
        color: #666c80;
        display: inline-block;
        padding: 0px 10px;
        font-size: 12px;
        height: 18px;
        border-radius: 16px;
        line-height: 18px;
        margin-right: 8px;
      }
    }
  }

  .tab_wrapper {
    border-radius: 0 0 12px 12px;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #3c464f;
    padding: 16px 0;
    .title_left {
      &::before {
        content: '';
        width: 4px;
        height: 12px;
        border-radius: 10px;
        margin-right: 6px;
        background-color: #2979ff;
      }
    }
    .title_right {
      color: #666c80;
      font-size: 12px;
    }
  }
  .intro {
    padding: 0 16px;
    background: #fff;
    margin-bottom: 12px;
    height: 1000px;
    .teacher_info {
      display: flex;
      align-items: center;
      border-radius: 12px;
      background: #f5f6fa;
      padding: 12px;
      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .teacher_desc {
        flex: 1;
        overflow: hidden;
        margin-left: 10px;
        .teacher_name {
          font-size: 12px;
          color: #3e414d;
        }
        .teacher_intro {
          word-break: break-all;
          font-size: 12px;
          color: #666c80;
          text-align: left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-wrap: normal;
        }
      }
    }
    .course_detail {
      padding-bottom: 16px;
    }
  }

  .catalogue {
    height: 1000px;
    padding: 0 16px;
    background: #fff;
    margin-bottom: 12px;
    .catalogue_list {
      .task_list {
        .task_items {
          display: flex;
          padding: 12px;
          .task_type {
            width: 16px;
            height: 16px;
          }

          .task_title {
            flex: 1;
            font-size: 12px;
            color: #3e414d;
            margin-left: 10px;
            &::after {
              content: '';
              position: absolute;
              bottom: -12px;
              left: 0;
              width: 100%;
              height: 0.07143rem;
              background-color: #c9d0d6;
              transform: scaleY(0.5);
              opacity: 0.5;
            }
          }

          .task_icon {
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }
  .comment {
    height: 1000px;
    padding: 0 16px;
    background: #fff;
  }
}
.bottom_tabbar {
  // background: #fff;
  background: linear-gradient(
    180deg,
    hsla(0, 0%, 86.7%, 0) 0,
    hsla(0, 0%, 86.7%, 0.2) 0.42857rem,
    hsla(0, 0%, 86.7%, 0.2) 0.57143rem,
    #fff 0.64286rem,
    #fff
  );
  padding: 8px 16px 0 16px;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  .bottom_wrap {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .bottom_button {
    flex: 1;
    padding: 6px 0;
    .favo_button {
      display: flex;
      align-items: center;
      flex-direction: column;
      font-size: 12px;
      color: #8797a1;
      .bg {
        width: 24px;
        height: 24px;
        background-image: url('https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/0cfab2184a7ac26a164fdc334d40d382.png');
        background-size: 100% 100%;
        &.active {
          background-image: url('https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/88b416217e2eca5e9e9f1f3fac1e7f24.png');
        }
      }
    }
  }
  .bottom_main {
    flex: 1;
    padding: 6px 0;
    .buy_button {
      width: 90%;
      height: 2.85714rem;
      line-height: 2.85714rem;
      text-align: center;
      color: #fff;
      border: none;
      font-size: 1.14286rem;
      border-radius: 7.14286rem;
      background-color: #ff7a38;
    }
  }
}
</style>
