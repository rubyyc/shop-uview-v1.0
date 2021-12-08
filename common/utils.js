const install = (Vue, vm) => {
  const isLogin = () => {
    // 如果没有token,跳转到登录页面
    const token = vm.vuex_token
    if (!token) {
      vm.$u.toast('请登录')
      const currentPage = getCurrentPages().pop()
      console.log(currentPage);

      const {
        options,
        route
      } = currentPage
      // 1.自己写object转params
      // const optionsKeys = Object.keys(options)
      // let params = ''
      // if (optionsKeys.length) {
      //   params = optionsKeys.reduce((pre, current) => {
      //     return pre + current + '=' + options[current] + '&'
      //   }, '?').slice(0, -1)
      //   console.log(params);
      // }

      // uni.setStorageSync('back_url', route + params)

      // 2.用uview提供的写
      uni.setStorageSync('back_url', route + vm.$u.queryParams(options))
      setTimeout(() => {
        vm.$u.route({
          type: 'redirect',
          url: 'pages/auth/login'
        })
      }, 2000)
      return false
    }
    return true
  }

  const updateUser = async () => {
    // 重新请求用户信息
    const userInfo = await vm.$u.api.userInfo()
    vm.$u.vuex('vuex_user', userInfo)
  }
  vm.$u.utils = {
    isLogin,
    updateUser
  }
}

export default {
  install
}