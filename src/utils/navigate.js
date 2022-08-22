/*
 * @Author: 朽木白
 * @Date: 2022-08-22 09:47:40
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-22 09:47:44
 * @Description:
 */
// 保留当前页面跳转到应用内页面
const to = (url, options = {}) => {
  uni.navigateTo({
    url: url,
    ...options,
  });
};
// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
const tab = (url, options = {}) => {
  uni.switchTab({
    url: url,
    ...options,
  });
};

export default {
  to,
  tab,
};
