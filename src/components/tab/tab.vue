<template>
  <div class="tab">
    <div class="tab__item">商品</div>
    <div class="tab__item">评论</div>
    <div class="tab__item">商家</div>
  </div>
</template>

<script>
export default {
  name: 'tab'
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
