<template>
  <div class="goods_item">
    <img :src="goodsItem.show.img" alt="">
    <div class="item_info">
      <p class="title">{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .goods_item {
    width: 46%;
  }
  img {
    width: 100%;
    border-radius: 8px;
  }
  .item_info {
    
    .title {

    }
    .price {

    }
    .collect {

    }
  }
</style>
