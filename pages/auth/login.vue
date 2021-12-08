<template>
  <view class="wrap">
    <view class="top"></view>
    <view class="content">
      <view class="title">欢迎登录图书商城</view>
      <input class="u-border-bottom" v-model="email" placeholder="请输入邮箱" />
      <input class="u-border-bottom" v-model="password" placeholder="请输入密码" />
      <button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
      <view class="alternative">
        <view class="password">找回密码</view>
        <navigator url="/pages/register/register">
          <view class="issue">注册</view>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    inputStyle () {
      let style = {};
      if (this.$u.test.email(this.email) && this.password) {
        style.color = "#fff";
        style.backgroundColor = this.$u.color['warning'];
      }
      return style;
    }
  },
  methods: {
    async submit () {
      if (!this.$u.test.email(this.email) || !this.password) {
        return false
      }
      const params = {
        email: this.email,
        password: this.password
      }
      const loginRes = await this.$u.api.authLogin(params)
      console.log(loginRes);
      // 缓存token
      this.$u.vuex('vuex_token', loginRes.access_token)
      this.$u.toast('登录成功')
      // 请求用户信息
      const userInfo = await this.$u.api.userInfo()

      console.log(userInfo);
      // 缓存用户信息
      this.$u.vuex('vuex_user', userInfo)
      // 取来源页
      const backUrl = uni.getStorageSync('back_url') || 'page/home/home'
      setTimeout(() => {
        this.$u.route({
          type: 'reLaunch',
          url: backUrl
        })
      }, 2000)
    }
  }
};
</script>

<style lang="scss" scoped>
.u-border-bottom {
	margin-bottom: 40rpx !important;
}
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;

			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
}
</style>
