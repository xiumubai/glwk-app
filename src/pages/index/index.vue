<!--
 * @Author: 朽木白
 * @Date: 2022-08-19 10:33:44
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-27 10:30:29
 * @Description: 
-->
<template>
  <view class="container home">
    <!-- 搜索框 -->
    <v-search-bar @focus="focus" class="header"></v-search-bar>
    <!-- 轮播图 -->
    <view class="swiper_box">
      <swiper
        class="swiper"
        circular
        indicator-dots
        autoplay
        :interval="2000"
        indicator-color="#fff"
        indicator-active-color="#26B7FF"
        :duration="500"
      >
        <swiper-item v-for="item in bannerList" :key="item.src">
          <view class="swiper_item uni_bg_red">
            <image mode="heightFix" :src="item.imageUrl" />
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- card导航 -->
    <view>
      <view class="hot_cate">
        <view class="hot_cate_item" v-for="item in hostList" :key="item.src">
          <navigator class="hot_cate_item_a">
            <image class="hot_cate_item_img" alt="img" :src="item.src" />
            <text class="hot_cate_item_name">{{ item.name }}</text>
          </navigator>
        </view>
      </view>
    </view>
    <!-- 热门 -->
    <view class="preferences_wrapper">
      <v-card
        title="热门课程"
        linkTitle="全部课程"
        type="course"
        link="/pages/course/index"
      >
        <v-card-list type="course" :list="courseList"></v-card-list>
      </v-card>
      <v-card
        title="名师大咖"
        linkTitle="全部名师"
        type="teacher"
        link="/pages/teacher/index"
      >
        <v-card-list type="teacher" :list="teacherList"></v-card-list>
      </v-card>
    </view>

    <v-back-top></v-back-top>
  </view>
</template>

<script>
// 默认模拟数据，可删除
import { hotCateList, bannerList, courseList } from '@/common/constant.js';
import courseService from '@/services/course';
export default {
  data() {
    return {
      // Object.freeze,静态渲染数据，不可修改
      hostList: Object.freeze(hotCateList),
      bannerList: Object.freeze(bannerList),
      courseList: Object.freeze(courseList),
      teacherList: Object.freeze([]),
    };
  },
  onLoad() {
    this.getBannerList();
    this.getCourseList();
  },
  // 监听滚动事件，控制返回顶部按钮
  onPageScroll(res) {
    uni.$emit('onPageScroll', res);
  },
  methods: {
    // 获取banner
    async getBannerList() {
      try {
        const res = await courseService.banner();
        this.bannerList = res.data.bannerList;
      } catch (e) {
        console.log('e', e);
      }
    },

    // 获取热门课程和名师列表
    async getCourseList() {
      try {
        const res = await courseService.indexCourse();
        this.teacherList = res.data.teacherList;
        this.courseList = res.data.courseList;
        console.log('res', res);
      } catch (e) {
        console.log('e', e);
      }
    },
    focus() {
      // 点击首页搜索框，跳转到课程页面
      uni.switchTab({
        url: '/pages/course/index',
      });
    },
    navigateTo(link, type) {
      if (type === 'course') {
        uni.switchTab({ url: link });
      } else if (type === 'teacher') {
        uni.navigateTo({ url: link });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import url('@/static/styles/_global.scss');
.home {
  padding-top: 56px;
}
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}
.swiper_box {
  width: 100%;

  .swiper_item {
    width: 100%;
    height: 100%;
    background: #000;
  }
}

.hot_cate {
  padding: $uni-spacing-row-sm;
  background: $uni-gradient-bg-color;
  display: flex;
  flex-wrap: wrap;
  &_item {
    width: 20%;
    &_a {
      display: flex;
      // @include flex-display;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    &_img {
      width: 36px;
      height: 36px;
      margin-bottom: 8px;
    }
    &_name {
      font-size: 12px;
      color: #737780;
    }
  }
}

.preferences_wrapper {
  background: $uni-bg-color;
}
</style>
