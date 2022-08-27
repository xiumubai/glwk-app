<!--
 * @Author: 朽木白
 * @Date: 2022-08-27 13:56:46
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-27 15:02:03
 * @Description: 
-->
<template>
  <view class="container">
    <view>
      <video
        class="video"
        src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4"
        @error="videoErrorCallback"
        :poster="course.course.cover"
        object-fit="fill"
        controls
        page-gesture
        enable-play-gesture
      ></video>
    </view>
    <view class="catalogue">
      <view class="title"> 课程目录 </view>
      <view class="catalogue_list">
        <uni-collapse ref="collapse">
          <uni-collapse-item
            :title="item.title"
            v-for="item in chapterList"
            :key="item.id"
          >
            <view class="task_list">
              <view
                class="task_items"
                v-for="child in item.children"
                :key="child.id"
                @click="getVideoUrl(child.videoSourceId)"
              >
                <image
                  class="task_type"
                  src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/f1c59a1527e075f6ebfba3d7ac605f07.png"
                />
                <view class="task_title">{{ child.title }}</view>
                <image
                  class="task_icon"
                  src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/064fdd1eb99fcb8bef80085f2b548e4b.png"
                />
              </view>
            </view>
          </uni-collapse-item>
        </uni-collapse>
      </view>
    </view>
  </view>
</template>

<script>
import courseService from '@/services/course';
export default {
  data() {
    return {
      options: {},
      /** 章节列表 */
      chapterList: [],
      /** 课程信息 */
      course: {},
      /** 视频信息 */
      video: {},
    };
  },
  onLoad(option) {
    console.log('options', option);

    this.options = option;
    this.getCourseDetail();
    this.getVideoUrl(option.videoSourceId);
  },
  methods: {
    async getCourseDetail() {
      try {
        const res = await courseService.courseDetail({
          id: this.options.id,
          // id: '1192252213659774977',
        });
        this.chapterList = res.data.chapterList;
        this.course = res.data;
      } catch (e) {
        console.log('e', e);
      }
    },
    async getVideoUrl(videoSourceId) {
      try {
        const res = await courseService.getVideoSource({
          videoSourceId,
        });
        console.log('res', res);

        if (res.code == 200) {
          this.viedeo = res.data;
        } else {
          uni.showToast({
            title: res.message,
            icon: 'error',
          });
        }
      } catch (e) {
        console.log('e', e);
      }
    },
    videoErrorCallback(e) {
      uni.showModal({
        content: e.target.errMsg,
        showCancel: false,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.video {
  width: 100%;
}
.catalogue {
  padding: 0 16px;
  background: #fff;
  margin-bottom: 12px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    color: #3c464f;
    padding: 16px 0;
    .title_left {
      &::before {
        content: '';
        width: 4px;
        height: 12px;
        border-radius: 10px;
        margin-right: 6px;
        background-color: #2979ff;
      }
    }
    .title_right {
      color: #666c80;
      font-size: 12px;
    }
  }

  .catalogue_list {
    .task_list {
      .task_items {
        display: flex;
        padding: 12px;
        .task_type {
          width: 16px;
          height: 16px;
        }

        .task_title {
          flex: 1;
          font-size: 12px;
          color: #3e414d;
          margin-left: 10px;
          &::after {
            content: '';
            position: absolute;
            bottom: -12px;
            left: 0;
            width: 100%;
            height: 0.07143rem;
            background-color: #c9d0d6;
            transform: scaleY(0.5);
            opacity: 0.5;
          }
        }

        .task_icon {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}
</style>
