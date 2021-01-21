<template>
  <div>
    <swiper class="detailswiper">
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <img :src="item">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'DetailSwiper',
  props: {
    topImages: {
      type: Array
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style lang="scss" scoped>
  .detailswiper {
    height: 300px;
    overflow: hidden;
  }
</style>
