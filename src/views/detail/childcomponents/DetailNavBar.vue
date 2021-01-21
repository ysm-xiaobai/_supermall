<template>
  <nav-bar>
    <template v-slot:left>
      <div class="backbtn" @click="clickBack">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
    </template>
    <template v-slot:center>
      <div class="titlebar">
        <div
        v-for="(item,index) in title"
        :key="index" 
        class="title-item"
        :class="{active: currindex === index}"
        @click="changeIndex(index)">{{item}}</div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/Navbar'
export default {
  name: 'DetailNavBar',
  data () {
    return {
      title: ['商品','参数','评论','推荐'],
      currindex: 0
    }
  },
  methods: {
    changeIndex (index) {
      this.currindex = index
    },
    clickBack () {
      this.$router.back()
    }
  },
  components: { NavBar }
}
</script>

<style lang="scss" scoped>
  .backbtn img{
    margin-top: 11px;
  }
  .titlebar {
    display: flex;
    font-size: 14px;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
</style>
