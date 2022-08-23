<!--
 * @Author: 朽木白
 * @Date: 2022-08-23 10:19:29
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-23 14:23:04
 * @Description: 
-->
<template>
  <view class="container teacher">
    <view class="teacher_list">
      <view class="teacher_item" v-for="item in list" :key="item.id">
        <navigator :url="'/pages/teacher/detail?id=' + item.id" class="item_a">
          <view class="teacher_logo">
            <image :src="item.avatar" />
          </view>
          <view class="teacher_name">{{ item.name }}</view>
          <view class="teacher_intro">{{ item.intro }}</view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
import teacherService from '@/services/teacher';
export default {
  data() {
    return {
      list: [],
    };
  },
  onLoad() {
    this.getTeacherList();
  },
  methods: {
    async getTeacherList() {
      try {
        const res = await teacherService.teacher({
          page: 1,
          limit: 10,
        });
        this.list = res.data.items;
      } catch (e) {
        console.log('e', e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import url('@/static/styles/_global.scss');
.teacher {
  overflow: scroll;
}
.teacher_list {
  // display: flex;
  padding: 24px 16px;
  .teacher_item {
    width: 50%;

    padding-bottom: 8px;
    display: inline-block;
    box-sizing: border-box;
    &:nth-child(2n-1) {
      padding-right: 4px;
    }
    &:nth-child(2n) {
      padding-left: 4px;
    }

    .item_a {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      // padding: 10px;
      text-align: center;
      background: #1f2228;
      .teacher_logo {
        width: 93px;
        height: 93px;
        border-radius: 50%;
        margin-top: 16px;
        image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .teacher_name {
        font-size: 14px;
        color: #737780;
        margin: 10px 0;
      }

      .teacher_intro {
        padding-top: 5px;
        margin: 10px;
        // height: 40px;
        font-size: 12px;
        color: #a1a7b2;
        border-top: 1px dotted #e2e2e2;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
