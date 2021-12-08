// /common/http.api.js

// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let indexUrl = '/api/index';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
  // 此处使用了传入的params参数，一切自定义即可
  // 首页
  const index = params => vm.$u.get('/api/index', params);

  // 认证相关
  // 登录
  const authLogin = params => vm.$u.post('/api/auth/login', params);
  // 注册
  const authRegister = params => vm.$u.post('/api/auth/register', params);
  // 退出登录
  const authLogout = params => vm.$u.post('/api/auth/logout', params)
  // 获取ossToken
  const authOssToken = params => vm.$u.get('/api/auth/oss/token', params);


  //用户相关
  // 用户详情
  const userInfo = params => vm.$u.get('/api/user', params);
  const userInfoUpdate = params => vm.$u.put('/api/user', params)
  const userAvatar = params => vm.$u.patch('/api/user/avatar', params)

  // 商品相关
  const getGoodsDetail = id => vm.$u.get(`/api/goods/${id}`)
  const isCollect = id => vm.$u.post(`/api/collects/goods/${id}`)
  // const addCart = params => vm.$u.post(`/api/carts`, params)
  // const cartGoods = params => vm.$u.get(`/api/carts`, params)
  const getGoodsList = params => vm.$u.get('/api/goods', params);

  //购物车相关
  // 购物车相关
  const addCart = params => vm.$u.post(`/api/carts`, params); //添加购物车
  const cartGoods = () => vm.$u.get(`/api/carts?include=goods`); //购物车列表
  const numChange = (cart, num) => vm.$u.put(`/api/carts/${cart}`, {
    num
  }); //购物车商品数量改变
  const delCartGoods = cart => vm.$u.delete(`/api/carts/${cart}`); //将商品移出购物车
  const isCheck = cart_ids => vm.$u.patch(`/api/carts/checked`, {
    cart_ids
  }); //将商品选中与否

  // 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
  vm.$u.api = {
    index,
    authLogin,
    authRegister,
    authLogout,
    authOssToken,
    userInfo,
    userInfoUpdate,
    userAvatar,
    getGoodsDetail,
    isCollect,
    addCart,
    cartGoods,
    numChange,
    delCartGoods,
    isCheck,
    getGoodsList
  };
}

export default {
  install
}