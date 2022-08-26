/*
 * @Author: 朽木白
 * @Date: 2022-08-22 10:16:54
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-26 16:35:41
 * @Description:
 */
import Service from '@/utils/http';

class User extends Service {
  login(options) {
    options.url = '/login';
    return this.post(options);
  }
  // 添加评论
  comment(options = {}) {
    options.url = '/api/edu/comment/auth/save';
    return this.post(options);
  }
  // 评论列表
  commentList(options = {}) {
    options.url = `/api/edu/comment/${options.page}/${options.limit}`;
    return this.get(options);
  }
}

const userService = new User();
export default userService;
