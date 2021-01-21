<template>
  <div id="app">
    <!-- 将Detail组件排除在外（exclude="detail"） -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import mainTabBar from 'components/content/maintabbar/maintabbar'

  export default {
    name: 'App',
    components: { 
      mainTabBar 
    }
  }
</script>

<style lang="scss" scoped>

</style>
