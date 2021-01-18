<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
    :key="index" class="tab-control-item"
    @click="changeItem(index)"
    >
      <span :class="{active: currindex === index}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array
    }
  },
  data () {
    return {
      currindex: 0
    }
  },
  methods: {
    changeItem (index) {
      this.currindex = index
      this.$emit('tabclick', index);
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-control {
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
  }
  .tab-control-item span.active {
    border-bottom: 3px solid var(--color-tint);
  }
</style>