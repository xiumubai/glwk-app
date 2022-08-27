/*
 * @Author: 朽木白
 * @Date: 2022-08-22 10:16:54
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-27 16:36:23
 * @Description:
 */
import Service from '@/utils/http';

class Teacher extends Service {
  /**
   * @description: 讲师详情页
   * @param {*} options
   * @return {*}
   */
  teacherDetail(options) {
    options.url = `/api/edu/teacher/${options.id}`;
    return this.get(options);
  }
  /**
   * @description: 讲师列表页
   * @param {*} options
   * @return {*}
   */
  teacher(options) {
    options.url = `/api/edu/teacher/${options.page}/${options.limit}`;
    return this.get(options);
  }
}

const teacherService = new Teacher();
export default teacherService;
