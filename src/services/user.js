/*
 * @Author: 朽木白
 * @Date: 2022-08-22 10:16:54
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-27 16:37:11
 * @Description:
 */
import Service from '@/utils/http';

class User extends Service {
  /**
   * @description: 小程序登陆接口
   * @param {*} options
   * @return {*}
   */
  login(options) {
    options.url = '/login';
    return this.post(options);
  }
  /**
   * @description: 添加评论
   * @param {*} options
   * @return {*}
   */
  commentAdd(options = {}) {
    options.url = '/api/edu/comment/auth/save';
    return this.post(options);
  }
  /**
   * @description: 评论列表
   * @param {*} options
   * @return {*}
   */
  commentList(options = {}) {
    options.url = `/api/edu/comment/${options.page}/${options.limit}`;
    return this.get(options);
  }
}

const userService = new User();
export default userService;
