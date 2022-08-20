<!--
 * @Author: 朽木白
 * @Date: 2022-08-19 10:33:44
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-20 11:52:23
 * @Description: 
-->
<template>
  <view class="container">
    <uni-search-bar
      radius="20"
      bgColor="#000"
      placeholder="找知识、找培训、找老师"
      v-model="searchValue"
      clearButton="auto"
      cancelButton="none"
      @confirm="search"
    >
    </uni-search-bar>

    <view class="swiper_box">
      <swiper
        class="swiper"
        circular
        indicator-dots
        autoplay
        :interval="2000"
        indicator-color="#fff"
        indicator-active-color="#26B7FF"
        :duration="500"
      >
        <swiper-item>
          <view class="swiper_item uni_bg_red">
            <image src="" />
          </view>
        </swiper-item>
        <swiper-item>
          <view class="swiper_item uni_bg_green"></view>
        </swiper-item>
        <swiper-item>
          <view class="swiper_item uni_bg_blue"></view>
        </swiper-item>
      </swiper>
    </view>

    <view>
      <view class="hot_cate">
        <view class="hot_cate_item" v-for="item in hostList" :key="item.src">
          <navigator class="hot_cate_item_a">
            <image class="hot_cate_item_img" alt="img" :src="item.src" />
            <text class="hot_cate_item_name">{{ item.name }}</text>
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
const hotCateList = [
  {
    src: 'https://p.qpic.cn/qqconadmin/0/f310ebac024349818a459aa1f5413042/0',
    name: '后台开发',
  },
  {
    src: 'https://p.qpic.cn/qqconadmin/0/38e56d79465841839852e652661d507a/0',
    name: '前端开发',
  },
  {
    src: 'https://p.qpic.cn/qqconadmin/0/c5f85eeb180149f7b2f1a1e6894f8df9/0',
    name: '云计算',
  },
  {
    src: '	https://p.qpic.cn/qqconadmin/0/e7c8a2649635424ab82faad7fa9b2c3a/0',
    name: '大数据',
  },
  {
    src: 'https://p.qpic.cn/qqconadmin/0/9b248c95c0c44301b4155d9ac173c9a1/0',
    name: '全部分类',
  },
];
export default {
  data() {
    return {
      title: 'Hello',
      searchValue: '',
      hostList: hotCateList,
    };
  },
  onLoad() {},
  methods: {
    search(res) {
      uni.showToast({
        title: '搜索：' + res.value,
        icon: 'none',
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import url('@/static/styles/_global.scss');

.swiper_box {
  width: 100%;

  .swiper_item {
    width: 100%;
    height: 100%;
  }
  .uni_bg_red {
    background: red;
  }
  .uni_bg_green {
    background: green;
  }
  .uni_bg_blue {
    background: blue;
  }
}

.hot_cate {
  padding: $uni-spacing-row-sm;
  background: $uni-gradient-bg-color;
  display: flex;
  flex-wrap: wrap;
  &_item {
    width: 20%;
    &_a {
      display: flex;
      // @include flex-display;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    &_img {
      width: 36px;
      height: 36px;
      margin-bottom: 8px;
    }
    &_name {
      font-size: 12px;
      color: #737780;
    }
  }
}
.artical > .section {
  color: red;
}

.artical + .p {
  color: blue;
}

.artical ~ .div {
  color: green;
}
</style>
