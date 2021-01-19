<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <scroll
    class="wrapper"
    ref="scrollobj"
    :probe-type="3"
    @scrollevent="contentScroll"
    :pullup-load="true"
    @pullingUp="Loadmore"
    >
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
      class="tabbar"
      >
      </tab-control>
      <goodsList :goods="showGoods"></goodsList>
      <div class="bottom-info">~我是有底线的~</div>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import { getHomeMultiData, getHomeGoods } from '@/network/home'

  import NavBar from 'components/common/navbar/Navbar'
  import { Swiper, SwiperItem } from 'components/common/swiper'
  import Scroll from 'components/common/scroll/Scroll'

  import TabControl from 'components/content/tabControl/TabControl'
  import goodsList from 'components/content/goods/goodsList'
  import backTop from 'components/content/backtop/backTop'

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
      goodsList,
      Scroll,
      backTop
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
        currType: 'pop',
        isShowBackTop: false
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
          this.$refs.scrollobj.finishPullUp()
        })
      },
      /*事件监听相关方法*/
      tabClick (index) {
        let typearr = ['pop','new','sell']
        this.currType = typearr[index]
      },
      backClick () {
        this.$refs.scrollobj.scrollTo(0, 0)
      },
      contentScroll (position) {
        this.isShowBackTop = (-position.y) > 800
      },
      Loadmore () {
        this.getHomeGoods(this.currType)
        this.$refs.scrollobj.scroll.refresh()
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
  .tabbar {
    // position: sticky;
    top: 44px;
    background-color: #fff;
  }
  .bottom-info {
    width: 100%;
    height: 60px;
    margin-bottom: 49px;
    line-height: 60px;
    text-align: center;
  }
  .wrapper {
    padding-top: 44px;
    height: calc(100vh - 49px);
  }
</style>