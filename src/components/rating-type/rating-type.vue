<template>
  <div id='rating' class='rating'>
    <div class="rating__type">
      <span class="rating__type-text rating__type-text_i_1"></span>
      <span class="rating__type-text rating__type-text_i_2"></span>
      <span class="rating__type-text rating__type-text_i_3"></span>
    </div>
    <div :class="{'rating__filter_status_all':!this.$store.getters.getTextOnly}" class="rating__filter">
      <i class="icon-check_circle"></i>
      <span class="rating__filter__text">只看有内容的评价</span>
    </div>
    <ul class="rating__comments">
      <li class="rating__comments-comment" v-for="(rating,index) in ratings">
        <div class="rating__comments-comment_left">
          <div class="rating__comments-comment_left__date">{{ratingTime[index]}}</div>
          <div class="rating__comments-comment_left__comment">{{rating.text}}</div>
        </div>
        <div class="rating__comments-comment_right">{{rating.username}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'rating',
    props: ['ratings'],
    computed: {
      ratingTime() {
        let ratingTime = []
        this.ratings.forEach((rating) => {
          var time = new Date(rating.rateTime)
          var newTime = time.getFullYear(time).toString() + time.getMonth(time).toString() + time.getDay(time).toString()
          ratingTime.push(newTime)
        })
        return ratingTime
      }
    }
  }

</script>
<style scoped lang="scss">
  @import './rating-type.scss';

</style>
