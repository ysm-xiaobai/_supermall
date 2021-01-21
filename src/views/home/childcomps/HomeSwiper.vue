<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array
    }
  },
  data () {
    return {
      firstLoaded: false
    }
  },
  methods: {
    imgLoad () {
      if (!this.firstLoaded) {
        this.$emit('swiperimgLoaded')
        this.firstLoaded = true
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style lang="scss" scoped>

</style>
