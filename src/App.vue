<template>
  <div id="app">
    <v-header></v-header>
    <p class="tabs">
      <router-link class="tabs__tab-item" to="/goods">商品</router-link>
      <router-link class="tabs__tab-item" to="/ratings">评价</router-link>
      <router-link class="tabs__tab-item" to="/seller">商家</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>
<script>
  import header from './components/header/header'

  export default {
    name: 'app',
    components: {
      'v-header': header
    }
  }

</script>
<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .tabs {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @at-root {
      #{&}__tab-item {
        flex: 1;
        text-align: center;
      }
    }
  }

  .tab-active {
    color: red;
  }

</style>
