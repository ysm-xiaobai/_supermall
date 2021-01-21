<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabclick="tabClick"
      class="fixed"
      ref="tabcontrol1"
      v-show="isTabFixed"
      >
      </tab-control>
    <scroll
    class="content"
    ref="scrollobj"
    :probe-type="3"
    @scrollevent="contentScroll"
    :pullup-load="true"
    @pullingUp="Loadmore"
    >
      <home-swiper :banners="banners.list" @swiperimgLoaded="swiperimgLoaded"></home-swiper>
      <recommend-view :recommends="recommends.list"></recommend-view>
      <feature-view></feature-view>
      <tab-control
      :titles="['流行','新款','精选']"
      @tabclick="tabClick"
      ref="tabcontrol2"
      v-show="!isTabFixed"
      >
      </tab-control>
      <goodsList :goods="showGoods"></goodsList>
      <div class="bottom-info" v-text="totaltext"></div>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import { getHomeMultiData, getHomeGoods } from '@/network/home'

  import NavBar from 'components/common/navbar/Navbar'
  
  import Scroll from 'components/common/scroll/Scroll'

  import TabControl from 'components/content/tabControl/TabControl'
  import goodsList from 'components/content/goods/goodsList'
  import backTop from 'components/content/backtop/backTop'

  import HomeSwiper from './childcomps/HomeSwiper'
  import RecommendView from './childcomps/HomeRecommendView'
  import FeatureView from './childcomps/FeatureView'
  export default {
    name: "home",
    components: {
      NavBar,
      HomeSwiper,
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
        isShowBackTop: false,
        totaltext: '加载中...',
        taboffsettop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    mounted () {
      const refreshimg = this.debounce(this.$refs.scrollobj.refresh,30)
      this.$bus.$on('itemImgLoaded', () => {
        // this.$refs.scrollobj && this.$refs.scrollobj.refresh()
        refreshimg()
      })
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
    activated () {
      this.$refs.scrollobj.refresh()
      this.$refs.scrollobj.scrollTo(0, this.saveY, 0)
    },
    deactivated () {
      this.saveY = this.$refs.scrollobj.scroll.y
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
          if (page > 49) {
            this.totaltext = '我也是有底线的~ ~'
          }
        })
      },
      /*事件监听相关方法*/
      tabClick (index) {
        let typearr = ['pop','new','sell']
        this.currType = typearr[index]
        this.$refs.tabcontrol1.currindex = index
        this.$refs.tabcontrol2.currindex = index
      },
      backClick () {
        this.$refs.scrollobj.scrollTo(0, 0)
      },
      contentScroll (position) {
        // 判断backtop是否显示
        this.isShowBackTop = (-position.y) > 800
        // 决定tabcontrol是否吸顶
        this.isTabFixed = (-position.y) > this.taboffsettop
      },
      Loadmore () {
        this.getHomeGoods(this.currType)
        this.$refs.scrollobj.scroll.refresh()
      },
      swiperimgLoaded () {
        // this.$refs.tabcontrol为vue对象，其下边的$el为dom元素
        this.taboffsettop = this.$refs.tabcontrol2.$el.offsetTop
        // console.log(this.$refs.tabcontrol.$el.offsetTop);
      },
      // 防抖函数
      debounce (func, delay) {
        let timer = null;
        return function () {
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this)
          },delay)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .tabbar {
    background-color: #fff;
  }
  .fixed {
    position: relative;
    z-index: 2;
  }
  .bottom-info {
    width: 100%;
    height: 60px;
    margin-bottom: 49px;
    line-height: 60px;
    text-align: center;
  }
  .content {
    height: calc(100vh - 93px);
    overflow: hidden;
  }
</style>