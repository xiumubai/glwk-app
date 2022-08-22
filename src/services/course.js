/*
 * @Author: 朽木白
 * @Date: 2022-08-22 10:16:54
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-22 16:53:21
 * @Description:
 */
import Service from '@/utils/http';
import { options } from '@dcloudio/uni-cli-shared/lib/url-loader';

class Course extends Service {
  login(options) {
    options['url'] = '/login';
    return this.post(options);
  }
  banner(options = {}) {
    options['url'] = '/api/cms/banner';
    return this.get(options);
  }
}

const courseService = new Course();
export default courseService;
