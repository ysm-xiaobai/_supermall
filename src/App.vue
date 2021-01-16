<template>
  <div id="app">
    <router-view></router-view>
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
