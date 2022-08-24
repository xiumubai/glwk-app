<!--
 * @Author: 朽木白
 * @Date: 2022-08-23 10:19:29
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-24 17:07:28
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
      <view class="intro" id="anchor0">介绍</view>
      <view class="catalogue" id="anchor1">目录</view>
      <view class="comment" id="anchor2">评价</view>
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

  .intro {
    height: 1000px;
    background: #ff7b37;
  }
  .catalogue {
    height: 1000px;
    background: red;
  }
  .comment {
    height: 1000px;
    background: blue;
  }
}
</style>
