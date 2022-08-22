/*
 * @Author: 朽木白
 * @Date: 2022-08-22 10:16:54
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-22 10:20:53
 * @Description:
 */
import Service from '@/utils/http';

class User extends Service {
  login(options) {
    options.url = '/login';
    return this.post(options);
  }
}

const userService = new User();
export default userService;
