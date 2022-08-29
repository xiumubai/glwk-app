<!--
 * @Author: 朽木白
 * @Date: 2022-08-20 18:17:29
 * @LastEditors: 1547702880@qq.com
 * @LastEditTime: 2022-08-29 18:59:05
 * @Description: 
-->
<template>
  <view class="container login_container">
    <view class="login_content">
      <view class="login_logo"></view>
      <view class="login_main_type">
        <!-- <button class="login_main_type_item" @click="handleLogin">
          <image
            src="https://7.idqqimg.com/edu/mobilev2/m-core/15ed8902614ba6ac08b25fd9039e532a.png"
          />
          <text>QQ登陆</text>
        </button> -->
        <button class="login_main_type_item" @click="handleLogin('weixin')">
          <image
            src="https://7.idqqimg.com/edu/mobilev2/m-core/a1447893821a2003463b10e7c9b39926.png"
          />
          <text>微信登陆</text>
        </button>
      </view>
      <!-- <view class="login_more" @click="handleLogin('other')">更多登录方式</view> -->
    </view>
    <view class="login_footer">
      <view class="login_protocol">
        <view
          :class="['login_check_icon', checked ? 'checked' : '']"
          @click="handleChecked"
        ></view>
        <view class="login_block">
          我已阅读并同意
          <navigator class="link">用户协议</navigator>
          和
          <navigator class="link">隐私声明</navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import userService from '@/services/user';
export default {
  data() {
    return {
      checked: false,
    };
  },
  onLoad() {
    // 登陆
  },

  methods: {
    handleChecked() {
      this.checked = !this.checked;
    },

    handleLogin(type) {
      // 检测是否已经同意协议
      if (!this.checked) {
        return uni.showToast({
          title: '请已阅读并同意用户协议&隐私声明',
          icon: 'none',
          position: 'bottom',
        });
      }

      // 区分不同的登陆方式
      if (type === 'qq') {
        // qq登陆
        return uni.showToast({
          title: 'QQ 登陆功能暂未开放',
          icon: 'none',
          position: 'top',
        });
      } else if (type == 'weixin') {
        // 微信登陆
        this.mpWeiixnLogin();
      } else {
        // 手机号+验证码登陆
      }
    },

    mpWeiixnLogin() {
      uni.login({
        success(res) {
          // 获取到code
          const code = res.code;
          console.log('code', code);
        },
      });
      // 获取用户信息
      uni.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          console.log('userinfo', res);
          // 登陆成功，保存token，返回个人页面
          this.$store.dispatch('setUser', {
            ...res.userInfo,
            token:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndWxpLXVzZXIiLCJpYXQiOjE2NjE0OTQ5OTQsImV4cCI6MTY2Mjk2NjIyMywiaWQiOiIxIiwibmlja25hbWUiOiLlvKDlsI8ifQ.IVkvP_NJmoDGaTmEbRYZKt80ybOA7g795ku1ZmdwQsI',
          });

          uni.showToast({
            title: '登陆成功',
            icon: 'success',
            success: () => {
              // 跳转到个人页面
              uni.switchTab({
                url: '/pages/user/index',
              });
            },
          });
        },
      });
    },
    async login() {
      try {
        const res = await userService.login({
          url: '/login',
        });
        // this.from = {};
        console.log(res, 'loginres');
        this.$store.dispatch('setUser', res.data);
        // this.handleMobile()
      } catch (e) {
        //TODO handle the exception
        console.log(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url('@/static/styles/_global.scss');

.login_container {
  background: #0099fa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login_content {
    padding: 0 36px;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 48px;
    .login_logo {
      width: 72px;
      height: 72px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('https://8.idqqimg.com/edu/mobilev2/m-core/7cb5b49cd56e19a5eea2015c409fe2ee.png');
    }
    .login_main_type {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 48px;

      .login_main_type_item {
        height: 56px;
        margin-bottom: 24px;
        border-radius: 30px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80%;
        text-align: center;
        image {
          width: 26px;
          height: 26px;
        }
        text {
          margin-left: 8px;
          color: #2196f3;
          font-size: 18px;
        }
      }
    }
    .login_more {
      color: #fff;
      font-size: 14px;
    }
  }
  .login_footer {
    .login_protocol {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      .login_block {
        display: flex;
        color: #4db5fb;
      }
      .login_check_icon {
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-size: 24px 48px;
        background-image: url('https://8.idqqimg.com/edu/mobilev2/m-core/1f3256dafe9eb438879b434bd4105394.png');
        background-position: 0 0;
        &.checked {
          background-position: 0 -24px;
        }
      }
      .link {
        color: #fff;
      }
    }
  }
}
</style>
