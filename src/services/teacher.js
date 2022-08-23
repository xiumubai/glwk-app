/*
 * @Author: 朽木白
 * @Date: 2022-08-22 10:16:54
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-23 11:15:41
 * @Description:
 */
import Service from '@/utils/http';

class Teacher extends Service {
  login(options) {
    options.url = '/login';
    return this.post(options);
  }
  // 讲师详情页
  teacherDetail(options) {
    options.url = `/api/edu/teacher/${options.id}`;
  }
  // 讲师列表页
  teacher(options) {
    options.url = `/api/edu/teacher/${options.page}/${options.limit}`;
    return this.get(options);
  }
}

const teacherService = new Teacher();
export default teacherService;
