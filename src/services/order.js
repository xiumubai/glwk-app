/*
 * @Author: 朽木白
 * @Date: 2022-08-22 10:16:54
 * @LastEditors: xxx@xxx.com
 * @LastEditTime: 2022-09-16 15:43:14
 * @Description:
 */
import Service from '@/utils/http';

class Order extends Service {
  /**
   * @description: 获取订单列表
   * @param {*} options
   * @return {*}
   */
  orderList(options = {}) {
    options.url = `/api/order/auth/${options.page}/${options.limit}`;
    return this.get(options);
  }
  /**
   * @description: 创建订单
   * @param {*} options
   * @return {*}
   */
  addOrder(options) {
    options.url = `/api/order/auth/save/${options.courseId}`;
    return this.post(options);
  }
  /**
   * @description: 获取订单详细信息
   * @param {*} options
   * @return {*}
   */
  getOrderInfo(options) {
    options.url = `/api/order/auth/get/${options.orderId}`;
    return this.get(options);
  }
  /**
    * @description: 支付订单
    * @param {*} options
    * @return {*}
    */
  orderPay(options) {
    options.url = `/api/order/webChat/createJsapi/${options.orderNo}`;
    return this.get(options);
  }
  /**
    * @description: 支付订单
    * @param {*} options
    * @return {*}
    */
  payStatus(options) {
    options.url = `/api/order/webChat/queryPayStatus/${options.orderNo}`;
    return this.get(options);
  }
}

const orderService = new Order();
export default orderService;
