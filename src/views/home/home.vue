<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <swiper class="swiper-container">
      <swiper-item v-for="(item, index) in banners.list" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
    <recommend-view :recommends="recommends.list"></recommend-view>
    <feature-view></feature-view>
    <tab-control
    :titles="['流行','新款','精选']"
    @tabclick="tabClick"
    >
    </tab-control>
    <goodsList :goods="showGoods"></goodsList>
    <div class="bottom-info">~我是有底线的~</div>
  </div>
</template>

<script>
  import { getHomeMultiData, getHomeGoods } from '@/network/home'

  import NavBar from 'components/common/navbar/Navbar'
  import { Swiper, SwiperItem } from 'components/common/swiper'
  import TabControl from 'components/content/tabControl/TabControl'
  import goodsList from 'components/content/goods/goodsList'

  import RecommendView from './childcomps/HomeRecommendView'
  import FeatureView from './childcomps/FeatureView'
  export default {
    name: "home",
    components: {
      NavBar,
      Swiper,
      SwiperItem,
      RecommendView,
      FeatureView,
      TabControl,
      goodsList
    },
    data () {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop':{page: 0, list: []},
          'new':{page: 0, list: []},
          'sell':{page: 0, list: []}
        },
        currType: 'pop'
      }
    },
    created () {
      // 请求首页数据
      this.getHomeMultiData()
      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    computed: {
      showGoods () {
        return this.goods[this.currType].list
      }
    },
    methods: {
      /*网络请求相关方法*/
      getHomeMultiData () {
        getHomeMultiData().then(res => {
          this.banners = res.data.banner
          this.recommends = res.data.recommend
        })
      },
      getHomeGoods (type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      },
      /*事件监听相关方法*/
      tabClick (index) {
        let typearr = ['pop','new','sell']
        this.currType = typearr[index]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .swiper-container {
    padding-top: 44px;
  }
  .bottom-info {
    height: 60px;
    margin-bottom: 49px;
    line-height: 60px;
    text-align: center;
  }
</style>