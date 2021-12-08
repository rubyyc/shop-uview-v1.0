<template>
  <view>
    <u-swiper :list="slides" name="img_url" height="320"></u-swiper>
    <view class="u-text-center u-m-t-30">
      <u-tabs :list="sortList" item-width="160" bar-width="100" :current="current" @change="changeSort"></u-tabs>
    </view>

    <u-row gutter="16">
        <u-col span="6" v-for="(item, index) in goods" :key="index">
          <navigator class="goods-item">
            <u-image width="100%" height="300rpx" :src="item.cover_url"></u-image>
            <view class="title u-line-1 u-skeleton-rect">{{item.title}}</view>
            <view class="u-flex u-row-between">
              <view class="price u-skeleton-rect">￥{{item.price * 1000 | hotNumber}}</view>
              <view class="sales u-skeleton-rect">销量: {{item.sales}}</view>
            </view>
          </navigator>
        </u-col>
    </u-row>
  </view>
</template>

<script>
export default {
  data () {
    return {
      sortList: [
        {
          name: '默认'
        },
        {
          name: '销量'
        },
        {
          name: '推荐'
        },
        {
          name: '最新'
        }
      ],
      current: 0,
      slides: [],
      goods: [],
      page: 1,
      loading: false
    }
  },
  onLoad () {
    console.log(this.vuex_user);
    this.$u.utils.isLogin()
    this.getData()
  },
  methods: {
    changeSort (index) {
      console.log(index);
      this.current = index
      this.page = 1
      // 重置商品数据与分页
      this.goods = []
      this.getData()
    },
    // 获取数据
    async getData () {
      // 显示骨架屏
      this.loading = true
      const params = {
        page: this.page
      }
      if (this.current == 1) {
        params.sales = 1
      }
      if (this.current == 2) {
        params.recommend = 1
      }
      if (this.current == 3) {
        params.new = 1
      }
      const res = await this.$u.api.index(params)
      // 隐藏骨架屏
      this.loading = false
      this.slides = res.slides
      this.goods = [...this.goods, ...res.goods.data]
      console.log(res);
      console.log(111);
    }
  },
  onReachBottom () {
    // 重新请求数据,带上分页的参数
    this.page++
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.goods-item {
	padding: 40rpx;
	margin-top: 30rpx;
	box-shadow: 0 12rpx 20rpx 0 rgba(0, 0, 0, 0.1);
	.title {
		margin: 10rpx 0;
		font-weight: 500;
		font-size: 32rpx;
		width: 100%;
	}
	.price {
		color: red;
		width: 50%;
	}
	.sales {
		color: #888;
		width: 50%;
	}
}
</style>
