<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullupLoad: {
      type: Boolean,
      default: false
    },

  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullupLoad
    })
    this.scroll.on('scroll', (position) => {
      this.$emit('scrollevent', position)
    })
    // 上拉加载更多,这里加一个判断节约性能，只有在pullUpLoad有值情况下再执行
    if (this.pullupLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo (x, y, time=300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    // 本次请求完成
    finishPullUp () {
      this.scroll.finishPullUp()
    },
    // 刷新重新计算页面高度
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
