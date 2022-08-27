/*
 * @Author: 朽木白
 * @Date: 2022-08-22 10:16:54
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-27 16:35:52
 * @Description:
 */
import Service from '@/utils/http';

class Course extends Service {
  /**
   * @description: 获取首页热门课程和名师大咖
   * @param {*} options
   * @return {*}
   */
  indexCourse(options = {}) {
    options.url = '/api/edu/index';
    return this.get(options);
  }
  /**
   * @description: 获取首页banner图
   * @param {*} options
   * @return {*}
   */
  banner(options = {}) {
    options.url = '/api/cms/banner';
    return this.get(options);
  }
  /**
   * @description: 获取课程列表
   * @param {*} options
   * @return {*}
   */
  courseList(options = {}) {
    options.url = `/api/edu/course/${options.page}/${options.limit}`;
    return this.get(options);
  }
  /**
   * @description: 获取课程详情
   * @param {*} options
   * @return {*}
   */
  courseDetail(options = {}) {
    options.url = `/api/edu/course/${options.id}`;
    return this.get(options);
  }
  /**
   * @description: 收藏课程
   * @param {*} options
   * @return {*}
   */
  courseCollectSave(options = {}) {
    options.url = `/api/edu/courseCollect/auth/save/${options.courseId}`;
    return this.post(options);
  }
  /**
   * @description: 取消收藏课程
   * @param {*} options
   * @return {*}
   */
  courseCollectRemove(options = {}) {
    options.url = `/api/edu/courseCollect/auth/remove/${options.courseId}`;
    return this.delete(options);
  }
  /**
   * @description: 收藏课程列表
   * @param {*} options
   * @return {*}
   */
  courseCollectList(options = {}) {
    options.url = `/api/edu/courseCollect/auth/${options.page}/${options.limit}`;
    return this.get(options);
  }
  /**
   * @description: 获取视频地址
   * @param {*} options
   * @return {*}
   */
  getVideoSource(options = {}) {
    options.url = `/api/vod/video/getPlayAuth/${options.videoSourceId}`;
    return this.get(options);
  }
}

const courseService = new Course();
export default courseService;
