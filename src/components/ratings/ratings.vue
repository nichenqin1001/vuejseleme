<template>
  <div id="ratings" class="ratings">
    <div class="ratings__overview">
      <div class="ratings__overview-left">
        <div class="ratings__overview-left_score">{{seller.score}}</div>
        <div class="ratings__overview-left_title">综合评分</div>
        <div class="ratings__overview-left_rank">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="ratings__overview-right">
        <div class="ratings__overview-right_service">
          服务态度
          <star :score="seller.score"></star>
          <div class="ratings__overview-right_service_score">
            {{seller.score}}
          </div>
        </div>
        <div class="ratings__overview-right_food">
          食物评分
          <star :score="seller.foodScore"></star>
          <div class="ratings__overview-right_food_score">
            {{seller.foodScore}}
          </div>
        </div>
        <div class="ratings__overview-right_delivertime"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import star from 'components/star/star'
  export default {
    name: 'ratings',
    props: ['seller'],
    components: {
      star
    }
  }

</script>
<style scoped lang="scss">
  @import './ratings.scss'

</style>
