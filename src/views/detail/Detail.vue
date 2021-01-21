<template>
  <div>
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
// 解构必写
import { getDetail, Goods } from '@/network/detail'
import DetailNavBar from './childcomponents/DetailNavBar'
import DetailSwiper from './childcomponents/DetailSwiper'
import DetailBaseInfo from './childcomponents/DetailBaseInfo'
export default {
  name: 'Detail',
  data () {
    return {
      id: null,
      topImages: [],
      goods: {}
    }
  },
  created () {
    // 保存传入的id
    this.id = this.$route.params.id
    // 根据iid请求数据
    getDetail(this.id).then((res) => {
      console.log(res);
      const data = res.result
      this.topImages = data.itemInfo.topImages
      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    })
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  }
}
</script>

<style lang="scss" scoped>

</style>
