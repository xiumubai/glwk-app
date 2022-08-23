/*
 * @Author: 朽木白
 * @Date: 2022-08-22 10:16:54
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-23 09:33:03
 * @Description:
 */
import Service from '@/utils/http';

class Course extends Service {
  indexCourse(options = {}) {
    options.url = '/api/edu/index';
    return this.post(options);
  }
  banner(options = {}) {
    options.url = '/api/cms/banner';
    return this.get(options);
  }
  courseList(options = {}) {
    options.url = `/api/edu/course/${options.page}/${options.limit}`;
    return this.get(options);
  }
}

const courseService = new Course();
export default courseService;
