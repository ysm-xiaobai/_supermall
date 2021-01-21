<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <p class="title">{{goods.title}}</p>
    <div class="price">
      <span class="realPrice">{{'￥'+goods.realPrice}}</span>
      <span class="oldPrice">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="columns">
      <span class="sales">{{goods.columns[0]}}</span>
      <span class="collect">{{goods.columns[1]}}</span>
      <span class="addInfo">{{goods.services[0].name}}</span>
    </div>
    <div class="services">
      <span v-for="index in goods.services.length-1" :key="index" class="services-item">
        <!-- <span v-if="(index-1) !== 0"> -->
          <img :src="goods.services[index].icon" alt="">
          <span>{{goods.services[index].name}}</span>
        <!-- </span> -->
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goods: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
  .base-info {
    padding: 12px 8px 0px;
    border-bottom: 5px solid #eee;
    .title {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 6px;
    }
    .price {
      line-height: 40px;
      margin-bottom: 8px;
      .realPrice {
        font-size: 24px;
        color: var(--color-high-text);
      }
      .oldPrice {
        color: #bbb;
        text-decoration:line-through;
        padding: 0 5px;
      }
      .discount {
        border-radius: 8px;
        color: #fff;
        padding: 4px;
        vertical-align: 2px;
        background: var(--color-high-text);
      }
    }
    .columns{
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #ccc;
      line-height: 30px;
      .sales, .collect, .addInfo {
        flex: 1;
        color: #bbb;
      }
      .collect {
        text-align: center;
      }
      .addInfo {
        text-align: right;
      }
    }
    .services {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 14px 0;
      .services-item {
        line-height: 28px;
        img {
          width: 14px;
        }
      }
    }
  }
</style>
