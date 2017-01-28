<template>
  <div class="tab">
    <div class="tab__item"><a v-link="{path:'/goods'}">商品</a></div>
    <div class="tab__item"><a v-link="{path:'/ratings'}">评价</a></div>
    <div class="tab__item"><a v-link="{path:'/seller'}">商家</a></div>
    <router-view></router-view>
  </div>
</template>

<script>
import content from '../content/content'

export default {
  name: 'tab',
  components: {
    'v-content':content
  }
}
</script>

<style lang="scss">
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @at-root{
      #{&}__item{
        flex:1;
        text-align: center;
      }
    }
  }
</style>
