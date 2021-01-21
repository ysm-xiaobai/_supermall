<template>
  <div class="goods">
    <goods-list-item
    v-for="(item, index) of goods"
    :goods-item="item"
    :key="index"
    ref="goodsitem"
    >
    </goods-list-item>
  </div>
</template>

<script>
import goodsListItem from './goodsListItem'

export default {
  name: 'goodsList',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  // watch: {
  //   goods () {
  //     this.$nextTick(() => {
  //       this.$refs.goodsitem[0].loadImg('.goods',8)
  //     })
  //   }
  // },
  components: {
    goodsListItem
  }
}
</script>

<style lang="scss" scoped>
  .goods {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
  }
  button {
    width: 150px;
    height: 50px;
  }
</style>
