<!--
 * @Author: 朽木白
 * @Date: 2022-08-19 10:33:44
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-22 09:41:44
 * @Description: 
-->
<template>
  <view class="container">
    <!-- 搜索框 -->
    <uni-search-bar
      radius="20"
      bgColor="#000"
      placeholder="找知识、找培训、找老师"
      v-model="searchValue"
      clearButton="auto"
      cancelButton="none"
      @confirm="search"
    >
    </uni-search-bar>

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
            <image mode="heightFix" :src="item.src" />
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
    <!-- 热门课程 -->
    <view class="preferences_wrapper">
      <view class="preferences" v-for="item in courseList" :key="item.type">
        <h2 class="preferences_title">
          {{ item.name }}
          <navigator class="link">
            查看更多
            <uni-icons type="right" size="12"></uni-icons>
          </navigator>
        </h2>
        <view class="preferences_list">
          <view
            class="preferences_list_item"
            v-for="(course, index) in item.list"
            :key="index"
          >
            <navigator class="list_item_card">
              <view class="list_item_card_img">
                <image alt="课程封面" mode="widthFix" :src="course.src" />
              </view>
              <view class="list_item_card_content">
                <h3 class="item_content_name">
                  {{ course.title }}
                </h3>
                <view class="item_content__labal">
                  <uni-icons type="fire" size="18" color="#fa3f4e"></uni-icons>
                  <text class="study_num">{{ course.studyNum }}人已学习</text>
                </view>
                <view class="item-content_footer">
                  <view class="footer_price">¥{{ course.price }}</view>
                  <view class="footer_buy_num">{{ course.buyNum }}人购买</view>
                </view>
              </view>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { hotCateList, bannerList, courseList } from '@/common/constant.js';
export default {
  data() {
    return {
      title: 'Hello',
      searchValue: '',
      hostList: Object.freeze(hotCateList),
      bannerList: Object.freeze(bannerList),
      courseList: Object.freeze(courseList),
    };
  },
  onLoad() {
    console.log('token', this.$store.state.token);

    uni.request({
      url: 'https://atguigu.com/api/cms/banner',
      success: (res) => {
        console.log(res.data);
      },
    });
  },
  methods: {
    search(res) {
      uni.showToast({
        title: '搜索：' + res.value,
        icon: 'none',
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import url('@/static/styles/_global.scss');

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
.preferences {
  padding: 0 16px 24px 16px;
  &_title {
    color: $uni-text-color-white;
    font-size: 14px;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    display: flex;
    .link {
      font-size: $uni-font-size-12;
      color: $uni-text-color;
    }
  }
  &_list {
    &_item {
      padding-bottom: 8px;
      display: inline-block;
      width: 50%;
      box-sizing: border-box;
      &:nth-child(2n-1) {
        padding-right: 4px;
      }
      &:nth-child(2n) {
        padding-left: 4px;
      }
      .list_item_card {
        display: block;
        width: 100%;
        &_img {
          width: 100%;
          height: 95px;
          background-image: url('https://8.idqqimg.com/edu/mobilev2/m-core/3d1dd248376a6da4a15e0000184f44c6.png');
          background-repeat: no-repeat;
          background-size: contain;
          border-radius: 8px 8px 0 0;
          image {
            height: 100%;
            width: 100%;
            border-radius: 8px 8px 0 0;
          }
        }
        &_content {
          background: $uni-bg-wrapper-color;
          border-radius: 0 0 8px 8px;
          .item_content_name {
            padding: 4px 4px;
            color: $uni-text-color-name;
            font-size: $uni-font-size-14;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .item_content__labal {
            display: flex;
            align-items: center;
            padding: 0 4px;
            .study_num {
              font-size: $uni-font-size-12;
              color: $uni-text-color-name;
              margin-left: 4px;
            }
          }
          .item-content_footer {
            display: flex;
            align-items: center;
            padding: 4px;
            .footer_price {
              font-size: $uni-font-size-16;
              color: $price-font-color;
              margin-right: $uni-spacing-4;
            }
            .footer_buy_num {
              font-size: $uni-font-size-12;
              color: $uni-text-color-name;
            }
          }
        }
      }
    }
  }
}
</style>
