/*
 * @Author: 朽木白
 * @Date: 2022-08-22 10:16:54
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-26 17:04:26
 * @Description:
 */
import Service from '@/utils/http';

class Order extends Service {
  orderList(options = {}) {
    options.url = `/admin/order/${options.page}/${options.limit}`;
    return this.get(options);
  }
}

const orderService = new Order();
export default orderService;
