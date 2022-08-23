/*
 * @Author: 朽木白
 * @Date: 2022-08-22 10:16:54
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-23 14:26:59
 * @Description:
 */
import Service from '@/utils/http';

class Teacher extends Service {
  // 讲师详情页
  teacherDetail(options) {
    options.url = `/api/edu/teacher/${options.id}`;
    return this.get(options);
  }
  // 讲师列表页
  teacher(options) {
    options.url = `/api/edu/teacher/${options.page}/${options.limit}`;
    return this.get(options);
  }
}

const teacherService = new Teacher();
export default teacherService;
