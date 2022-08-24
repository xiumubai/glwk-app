<!--
 * @Author: 朽木白
 * @Date: 2022-08-23 10:19:29
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-24 18:41:51
 * @Description: 
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
        <view class="teacher_info">
          <view class="avatar">
            <image :src="courseDetail.avatar" />
          </view>
          <view class="teacher_desc">
            <view class="teacher_name"
              >高级讲师-{{ courseDetail.teacherName }}</view
            >
            <view class="teacher_intro">{{ courseDetail.intro }}</view>
          </view>
        </view>
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
            <uni-collapse-item title="默认开启">
              <view class="content"></view>
            </uni-collapse-item>
          </uni-collapse>
        </view>
      </view>
      <view class="comment" id="anchor2">
        <view class="title"> 学员评价 </view>
      </view>
    </view>
    <v-back-top></v-back-top>
  </view>
</template>

<script>
import courseService from '@/services/course';
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

      enchorParams: {
        enchorTop1: 0,
        enchorTop2: 0,
        enchorTop3: 0,
      },
      query: {},
    };
  },
  onLoad(option) {
    this.options = option;
    /** 获取tab元素属性 */
    const query = uni.createSelectorQuery();

    // 提前保存锚点元素的高度
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
    this.getCourseDetail();
  },
  onPageScroll(e) {
    uni.$emit('onPageScroll', e);
  },
  methods: {
    async getCourseDetail() {
      try {
        const res = await courseService.courseDetail({
          // id: this.options.id
          id: '1192252213659774977',
        });
        this.chapterList = res.data.chapterList;
        this.course = res.data;
        this.courseDetail = res.data.course;
      } catch (e) {
        console.log('e', e);
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
    font-size: 16px;
    color: #3c464f;
    padding: 16px 0;
  }
  .intro {
    padding: 0 16px;
    background: #fff;
    margin-bottom: 12px;
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
    padding: 0 16px;
    background: #fff;
  }
}
</style>
