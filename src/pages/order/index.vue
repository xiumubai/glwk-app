<!--
 * @Author: 朽木白
 * @Date: 2022-08-26 15:25:11
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-26 17:08:14
 * @Description: 订单支付页
-->
<template>
  <view class="container"> </view>
</template>

<script>
import orderService from '@/services/order';
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
    this.getOrderList();
  },
  onReachBottom() {
    if (this.status !== 'noMore') {
      this.status = 'loading';
      this.params.page++;
      this.getOrderList();
    }
  },
  methods: {
    async getOrderList() {
      try {
        const res = await courseService.orderList({
          ...this.params,
        });
        console.log('res', res);

        const items = res.data.items;
        // 数组解构拼接
        this.list = [...this.list, ...items];
        if (items.length < 10) return (this.status = 'noMore');
        if (items.length >= 10) this.status = 'more';
      } catch (e) {
        console.log('e', e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('@/static/styles/_global.scss');
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
