<template>
  <view>
    <u-swiper :list="slides" name="img_url" height="320"></u-swiper>
    <view class="u-text-center u-m-t-30">
      <u-tabs :list="sortList" item-width="160" bar-width="100" :current="current" @change="changeSort"></u-tabs>
    </view>

    <u-row gutter="16">
        <u-col span="6" v-for="(item, index) in goods" :key="index">
          <goods-card :item="item"></goods-card>
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
      this.slides = res.slides
      this.goods = [...this.goods, ...res.goods.data]
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

</style>
