<template>
  <div id='rating' class='rating'>
    <div class="rating__type">
      <span class="rating__type-text rating__type-text_i_1" :class="{active:rateType===2}" @click="toggleRateType(2,fatherScroll)">
        全部
        <span v-if="ratings" class="rating__type-text_count">{{ratings.length}}</span>
      </span>
      <span class="rating__type-text rating__type-text_i_2" :class="{active:rateType===0}" @click="toggleRateType(0,fatherScroll)">
        满意
        <span v-if="ratings" class="rating__type-text_count">{{positiveRatings.length}}</span>
      </span>
      <span class="rating__type-text rating__type-text_i_3" :class="{active:rateType===1}" @click="toggleRateType(1,fatherScroll)">
        不满意
        <span v-if="ratings" class="rating__type-text_count">{{negtiveRatings.length}}</span>
      </span>
    </div>
    <div @click.stop.prevent='toggleFilter' :class="{'rating__filter_status_all':!textOnly}" class="rating__filter">
      <i class="icon-check_circle"></i>
      <span class="rating__filter__text">只看有内容的评价</span>
      <span v-if="ratings" class="rating__filter__text_count">{{textOnlyRatings.length}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'rating',
    props: ['ratings'],
    computed: {
      textOnly() {
        return this.$store.getters.getTextOnly
      },
      rateType() {
        return this.$store.getters.getRateType
      },
      positiveRatings() {
        return this.ratings.filter((rating) => {
          return rating.rateType === 0
        })
      },
      negtiveRatings() {
        return this.ratings.filter((rating) => {
          return rating.rateType === 1
        })
      },
      textOnlyRatings() {
        return this.ratings.filter((rating) => {
          return rating.text
        })
      },
      fatherScroll() {
        return this.$store.getters.getFatherScroll
      }
    },
    methods: {
      toggleFilter(fatherScroll) {
        this.$store.dispatch('toggleTextOnly')
        this._freshDetailScroll(fatherScroll)
      },
      toggleRateType(rateType, fatherScroll) {
        this.$store.dispatch('updateRatetype', rateType)
        this._freshDetailScroll(fatherScroll)
      },
      _freshDetailScroll(fatherScroll) {
        fatherScroll.refresh()
      }
    }
  }

</script>
<style scoped lang="scss">
  @import './rating-type.scss';

</style>
