/*
 * @Author: 朽木白
 * @Date: 2022-08-22 10:16:54
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-27 11:59:31
 * @Description:
 */
import Service from '@/utils/http';

class Course extends Service {
  // 获取首页热门课程和名师大咖
  indexCourse(options = {}) {
    options.url = '/api/edu/index';
    return this.get(options);
  }
  // 获取首页banner图
  banner(options = {}) {
    options.url = '/api/cms/banner';
    return this.get(options);
  }
  // 获取课程列表
  courseList(options = {}) {
    options.url = `/api/edu/course/${options.page}/${options.limit}`;
    return this.get(options);
  }
  // 获取课程详情
  courseDetail(options = {}) {
    options.url = `/api/edu/course/${options.id}`;
    return this.get(options);
  }
  // 收藏课程
  courseCollectSave(options = {}) {
    options.url = `/api/edu/courseCollect/auth/save/${options.courseId}`;
    return this.post(options);
  }
  // 取消收藏课程
  courseCollectRemove(options = {}) {
    options.url = `/api/edu/courseCollect/auth/remove/${options.courseId}`;
    return this.delete(options);
  }
  // 收藏课程列表
  courseCollectList(options = {}) {
    options.url = `/api/edu/courseCollect/auth/${options.page}/${options.limit}`;
    return this.get(options);
  }
}

const courseService = new Course();
export default courseService;
