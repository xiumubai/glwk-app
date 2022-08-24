<!--
 * @Author: 朽木白
 * @Date: 2022-08-22 17:06:51
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-24 09:41:30
 * @Description: 
-->
<template>
  <div class="container">
    <v-search-bar @search="search"></v-search-bar>
    <view class="filter"></view>
    <view class="course_list">
      <view class="course_list_item" v-for="item in list" :key="item.id">
        <navigator
          class="course_list_item_a"
          :url="'/pages/course/detail?id=' + item.id"
        >
          <view class="item_cover">
            <image :src="item.cover" />
          </view>
          <view class="item_content">
            <h3 class="content_title">{{ item.title }}</h3>
            <view class="content_price">
              <view class="price">¥{{ item.price }}</view>
              <view class="buy_num">{{ item.buyCount }}人已购买</view>
            </view>
          </view>
        </navigator>
      </view>
      <!-- 加载更多 -->
      <view class="load_more">
        <uni-load-more :status="status" />
      </view>
    </view>

    <v-back-top></v-back-top>
  </div>
</template>

<script>
import courseService from '@/services/course';

export default {
  data() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
      },
      status: 'more',
    };
  },
  onLoad() {
    this.getCourseList();
  },
  // 监听滚动事件最外层view不能添加css样式overflow：scroll
  onReachBottom() {
    if (this.status !== 'noMore') {
      this.status = 'loading';
      this.params.page++;
      this.getCourseList();
    }
  },
  // 监听滚动事件，控制返回顶部按钮
  onPageScroll(res) {
    uni.$emit('onPageScroll', res);
  },
  methods: {
    async getCourseList() {
      try {
        const res = await courseService.courseList({
          ...this.params,
        });
        const items = res.data.items;
        // 数组解构拼接
        this.list = [...this.list, ...items];
        if (items.length < 10) return (this.status = 'noMore');
        if (items.length >= 10) this.status = 'more';
      } catch (e) {
        console.log('e', e);
      }
    },
    search(val) {
      uni.showToast({
        title: '搜索：' + val,
        icon: 'none',
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import url('@/static/styles/_global.scss');

.course_list {
  background: #000;
  padding-bottom: 1px;
}
.course_list_item {
  margin: 15px 15px;
  background: #1f2228;
  &_a {
    display: flex;
    .item_cover {
      width: 113px;
      height: 64px;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .item_content {
      flex: 1;
      padding-left: 12px;
      padding-top: 8px;

      .content_title {
        font-size: 12px;
        color: #a1a7b2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        height: 34px;
      }
      .content_price {
        display: flex;
        align-items: center;
        .price {
          color: #e53935;
          font-size: 16px;
        }
        .buy_num {
          width: 100%;
          font-size: 12px;
          color: #a1a7b2;
          margin-left: 12px;
        }
      }
    }
  }
}
</style>
