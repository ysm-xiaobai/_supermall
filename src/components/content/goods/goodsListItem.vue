<template>
  <div class="goods_item" @click="itemClick">
    <img :src="goodsItem.show.img" alt="" @load="imgload">
    <div class="item_info">
      <p class="title">{{goodsItem.title}}</p>
      <span class="price">{{'￥' + goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
// import Waterfall from 'components/common/waterfall/WaterFall'
export default {
  name: 'goodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgload () {
      this.$bus.$emit('itemImgLoaded')
    },
    itemClick () {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style lang="scss" scoped>
  .goods_item {
    width: calc(100%/2 - 12px);
    height: auto;
    // position: absolute;
  }
  img {
    width: 100%;
    border-radius: 8px;
  }
  .item_info {
    font-size: 14px;
    text-align: center;
    padding: 6px 0;
    line-height: 18px;
    .title {
      text-overflow:ellipsis;
      overflow:hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp:2;
    }
    .price {
      margin: 0 2px;
    }
    .collect {
      margin: 0 2px;
      color: var(--color-tint);
    }
    .collect:before {
      background: var(--color-tint);
      content: "";
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url("~assets/img/common/collect.svg") 0 0;
      background-size: cover;
      vertical-align: -1px;
    }
  }
</style>
