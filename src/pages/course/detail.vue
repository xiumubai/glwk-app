<!--
 * @Author: 朽木白
 * @Date: 2022-08-23 10:19:29
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-24 11:31:02
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

      <v-tabs :tabList="tabList" @click-tab="clickTab"></v-tabs>
    </view>
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
    };
  },
  onLoad(option) {
    this.options = option;
    this.getCourseDetail();
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
      console.log('index', index);
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
        padding: 2px 6px;
        font-size: 12px;
        border-radius: 16px;
      }
    }
  }
}
</style>
