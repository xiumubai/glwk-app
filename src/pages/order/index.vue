<!--
 * @Author: 朽木白
 * @Date: 2022-08-26 15:25:11
 * @LastEditors: xxx@xxx.com
 * @LastEditTime: 2022-09-16 16:16:06
 * @Description: 订单支付页
-->
<template>
  <view class="container">
    <view class="item">
      <view class="title">订单信息</view>
      <view class="msg"
        >课程名称：<text>{{ orderDetail.courseTitle }}</text></view
      >
      <view class="msg"
        >授课老师：<text>{{ orderDetail.teacherName }}</text></view
      >
      <view class="msg"
        >订单编号：<text>{{ orderDetail.orderNo }}</text></view
      >
    </view>
    <view class="item">
      <view class="title">购买账户</view>
      <view class="msg"
        >账户名：<text>{{ orderDetail.nickname }}</text></view
      >
      <view class="msg"
        >联系电话：<text>{{ orderDetail.mobile }}</text></view
      >
    </view>
    <view class="item">
      <view class="title">结算</view>
      <view class="msg msg_price"
        >订单原价：<text class="price">¥{{ orderDetail.totalFee }}</text></view
      >
      <view class="msg msg_price">已优惠：<text class="price">¥0</text></view>
      <view class="msg msg_price"
        >需支付金额：<text class="price"
          >¥{{ orderDetail.totalFee }}</text
        ></view
      >
      <view class="check">
        <checkbox :value="isChecked" style="transform: scale(0.7)" />
        同意
        <navigator class="'link" url=""> 《谷粒微课购买协议》 </navigator>
      </view>
    </view>
    <view class="pay">
      <view class="price">
        实际支付
        <text>¥{{ orderDetail.totalFee }}</text>
      </view>
      <view class="pay_btn" @click="handleOrderPay">去付款</view>
    </view>
  </view>
</template>

<script>
import orderService from "@/services/order";
export default {
  data() {
    return {
      options: {},
      orderId: "",
      orderDetail: {},
      isChecked: false,
    };
  },
  onLoad(option) {
    this.options = option;
    this.addOrder();
  },
  methods: {
    /**
     * @description: 创建订单
     * @returns {*}
     */
    async addOrder() {
      try {
        const res = await orderService.addOrder({
          courseId: this.options.courseId,
        });
        console.log("res", res);
        this.orderId = res.data.orderId;
        this.getOrderInfo();
      } catch (e) {
        console.log("e", e);
      }
    },
    /**
     * @description: 获取订单信息
     * @returns {*}
     */
    async getOrderInfo() {
      try {
        const res = await orderService.getOrderInfo({
          orderId: this.orderId,
        });
        this.orderDetail = res.data.item;
        console.log("res", res);
      } catch (e) {
        console.log("e", e);
      }
    },
    /**
     * @description: 订单支付
     * @returns {*}
     */
    async handleOrderPay() {
      const _this = this;
      try {
        const res = await orderService.orderPay({
          orderNo: this.orderDetail.orderNo,
        });
        console.log("order", res);
        if (res.code === 200) {
          const data = res.data;
          uni.requestPayment({
            timeStamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success(data) {
              console.log("pay-success", data);
              _this.getPayStatus();
            },
            fail(e) {
              console.log("pay-fail", e.errMsg);
            },
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * @description: 获取支付状态
     * @returns {*}
     */
    async getPayStatus() {
      const res = await orderService.payStatus({
        orderNo: this.orderDetail.orderNo,
      });
      console.log("status-res", res);
      if (res.code == 200) {
        uni.showToast({
          title: "支付成功",
        });

        uni.navigateBack();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background: rgba(130, 145, 158, 0.1);
  .item {
    background: #fff;
    margin-bottom: 8px;
    padding: 12px 16px;
    .title {
      color: #7b8998;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
    }
    .msg {
      font-size: 12px;
      color: #7b8998;
      height: 20px;
      line-height: 20px;
      &.msg_price {
        display: flex;
        width: 100%;
        justify-content: space-between;
      }
      text {
        color: #072943;
        &.price {
          color: #ff0042;
        }
      }
    }
  }

  .check {
    color: #7b8998;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding-top: 16px;
    .link {
      color: rgb(33, 150, 243);
    }
  }

  .pay {
    background: linear-gradient(
      180deg,
      hsla(0, 0%, 86.7%, 0) 0,
      hsla(0, 0%, 86.7%, 0.2) 0.42857rem,
      hsla(0, 0%, 86.7%, 0.2) 0.57143rem,
      #fff 0.64286rem,
      #fff
    );
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .price {
      font-size: 12px;
      color: #7b8998;
      text {
        color: #ff0042;
        font-size: 18px;
      }
    }

    .pay_btn {
      width: 35%;
      height: 40px;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
      background: #ff0042;
      border-radius: 40px;
      text-align: center;
    }
  }
}
</style>
