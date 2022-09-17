<!--
 * @Author: 朽木白
 * @Date: 2022-08-26 15:25:11
 * @LastEditors: xxx@xxx.com
 * @LastEditTime: 2022-09-17 12:00:31
 * @Description: 订单列表页面
-->
<template>
  <view class="container">
    <view class="course_list">
      <view class="course_list_item" v-for="item in list" :key="item.id">
        <view class="course_list_item_a" @click="handleJump(item)">
          <view class="item_cover">
            <image :src="item.courseCover" />
          </view>
          <view class="item_content">
            <h3 class="content_title">{{ item.courseTitle }}</h3>
            <view class="content_price">
              <view class="price">¥{{ item.totalFee }}</view>
              <uni-tag
                :text="item.status ? '已支付' : '未支付'"
                :type="item.status ? 'success' : 'warning'"
                :circle="true"
                size="mini"
              />
            </view>
            <view class="buy_num">订单编号{{ item.orderNo }}</view>
          </view>
        </view>
      </view>
      <!-- 加载更多 -->
      <view class="load_more">
        <uni-load-more :status="status" />
      </view>
    </view>
  </view>
</template>

<script>
import orderService from "@/services/order";
export default {
  data() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
      },
      status: "more",
    };
  },
  onShow() {
    this.getOrderList();
  },
  onReachBottom() {
    if (this.status !== "noMore") {
      this.status = "loading";
      this.params.page++;
      this.getOrderList();
    }
  },
  methods: {
    async getOrderList() {
      try {
        const res = await orderService.orderList({
          ...this.params,
        });
        console.log("res", res);

        const items = res.data.items;
        // 数组解构拼接
        this.list = [...this.list, ...items];
        if (items.length < 10) return (this.status = "noMore");
        if (items.length >= 10) this.status = "more";
      } catch (e) {
        console.log("e", e);
      }
    },
    handleJump(item) {
      if (item.status == 0) {
        uni.navigateTo({
          url: `/pages/order/index?courseId=${item.courseId}`,
        });
      } else {
        uni.navigateTo({
          url: `/pages/course/detail?id=${item.courseId}`,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("@/static/styles/_global.scss");
.course_list {
  background: #000;
  padding: 15px 15px 0;
}
.course_list_item {
  // margin: 15px 15px;
  margin-bottom: 15px;
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
      padding: 8px 12px 0 12px;

      .content_title {
        font-size: 12px;
        color: #a1a7b2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }
      .content_price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price {
          color: #e53935;
          font-size: 16px;
        }
      }
      .buy_num {
        width: 100%;
        font-size: 12px;
        color: #a1a7b2;
      }
    }
  }
}
</style>
