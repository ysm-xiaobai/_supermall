<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>蘑菇街</template>
    </nav-bar>
    <swiper>
      <swiper-item v-for="(item, index) in banners.list" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import { getMultiData } from '@/network/home'
  import NavBar from 'components/common/navbar/Navbar'
  import { Swiper, SwiperItem } from 'components/common/swiper'
  export default {
      name: "home",
      components: {
        NavBar,
        Swiper,
        SwiperItem
      },
      data () {
        return {
          banners: [],
          recommends: []
        }
      },
      created () {
        getMultiData().then(res => {
          this.banners = res.data.banner
          this.recommends = res.data.recommend
        })
      }
  }
</script>

<style lang="scss" scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>