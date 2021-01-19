<template>
  <div class="goods">
    <goods-list-item
    v-for="(item, index) of goods"
    :goods-item="item"
    :key="index"
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
  components: {
    goodsListItem
  }
}
</script>

<style lang="scss" scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 2px;
  }
</style>
