<!--
 * @Author: 朽木白
 * @Date: 2022-08-20 18:17:29
 * @LastEditors: xxx@xxx.com
 * @LastEditTime: 2022-09-16 16:40:15
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
import userService from "@/services/user";

/**
 * 登陆流程说明：
 * 1.请求uni.login()获取code
 * 2.请求getLoginInfo()获取用户信息
 * 3.如果nickname为空，需要请求一次updateMember()更新用户信息
 * 4.否则显示登陆成功，直接跳转到我的页面
 */
export default {
  data() {
    return {
      checked: false,
      userInfo: {},
    };
  },

  methods: {
    handleChecked() {
      this.checked = !this.checked;
    },
    /**
     * @description: 根据登陆类型判断，暂时只支持微信登陆
     * @param {*} type
     * @returns {*}
     */
    handleLogin(type) {
      // 检测是否已经同意协议
      if (!this.checked) {
        return uni.showToast({
          title: "请已阅读并同意用户协议&隐私声明",
          icon: "none",
          position: "bottom",
        });
      }

      // 区分不同的登陆方式
      if (type === "qq") {
        // qq登陆
        return uni.showToast({
          title: "QQ 登陆功能暂未开放",
          icon: "none",
          position: "top",
        });
      } else if (type == "weixin") {
        // 微信登陆
        this.mpWeixinLogin();
      } else {
        // 手机号+验证码登陆
      }
    },

    /**
     * @description: 调用微信登陆
     * @returns {*}
     */
    mpWeixinLogin() {
      const _this = this;
      try {
        // 先调用授权
        uni.getUserProfile({
          lang: "zh_CN",
          desc: "用于完善会员资料",
          success: async (res) => {
            console.log("userprofile", res);
            // 保存userinifo信息
            _this.userInfo = res.userInfo;
            // 授权成功
            uni.login({
              success(data) {
                // 获取到code
                const code = data.code;
                console.log("code", code);
                if (code) _this.login(code);
              },
            });
          },
          file: (err) => {
            console.log(err);
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * @description: 请求登陆
     * @param {*} code
     * @returns {*}
     */
    async login(code) {
      try {
        const res = await userService.login({
          code,
        });
        console.log("token", res.data.token);
        this.$store.dispatch("setToken", res.data.token);
        this.getUserInfo();
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * @description: 获取用户信息
     * @param {*} token
     * @returns {*}
     */
    async getUserInfo() {
      try {
        const res = await userService.getLoginInfo();
        console.log("userLogininfo", res);
        if (res.data.item) {
          this.$store.dispatch("setUser", {
            ...res.data.item,
          });
          // 需要更新用户信息
          if (!res.data.item.nickname) {
            this.updateUserInfo();
          } else {
            this.jump();
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * @description: 更新用户信息
     * @param {*} info
     * @returns {*}
     */
    async updateUserInfo() {
      try {
        const res = await userService.updateMember({
          data: {
            avatar: this.userInfo.avatarUrl,
            nickname: this.userInfo.nickName,
          },
        });

        console.log("updateres", res);
        if (res.code == 200) {
          // 登陆成功，保存个人信息，返回个人页面
          this.$store.dispatch("setUser", {
            avatar: this.userInfo.avatarUrl,
            nickname: this.userInfo.nickName,
          });
          this.jump();
        }
      } catch (e) {
        console.log(e);
      }
    },
    jump() {
      uni.showToast({
        title: "登陆成功",
        icon: "success",
        success: () => {
          // 跳转到个人页面
          // uni.switchTab({
          //   url: "/pages/user/index",
          // });
          uni.navigateBack();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("@/static/styles/_global.scss");

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
      background-image: url("https://8.idqqimg.com/edu/mobilev2/m-core/7cb5b49cd56e19a5eea2015c409fe2ee.png");
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
        background-image: url("https://8.idqqimg.com/edu/mobilev2/m-core/1f3256dafe9eb438879b434bd4105394.png");
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
