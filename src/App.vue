<template>
  <div id="app">
    <v-header v-bind:seller="seller"></v-header>
    <p class="tabs">
      <router-link class="tabs__tab-item" to="/goods">商品</router-link>
      <router-link class="tabs__tab-item" to="/ratings">评价</router-link>
      <router-link class="tabs__tab-item" to="/seller">商家</router-link>
    </p>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import header from 'components/header/header'

  const ERR_OK = 0

  export default {
    name: 'app',
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.seller = response.data
        }
      })
    },
    components: {
      'v-header': header
    }
  }

</script>
<style lang="scss">
  @import './common/scss/mixin.scss';
  #app {
    font-family: 'Microsoft Yahei', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .tabs {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin: 0;
    @include border-1px(rgba(7, 17, 27, 0.1));
    @at-root {
      #{&}__tab-item {
        display: block;
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: rgb(77, 85, 93);
      }
    }
  }

  .tab-active {
    color: red;
  }

</style>
