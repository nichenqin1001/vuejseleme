<template>
  <div class="stars">
    <div :class="starSize" class="stars__star" v-for="(star,index) in stars">
      <div v-if="stars[index]==1" :class="starItemSize" class="stars__star_item stars__star_item_1"></div>
      <div v-if="stars[index]==2" :class="starItemSize" class="stars__star_item stars__star_item_2"></div>
      <div v-if="stars[index]==0" :class="starItemSize" class="stars__star_item stars__star_item_0"></div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['score', 'size'],
    computed: {
      comscore() {
        return Math.floor(this.score * 2) / 2
      },
      stars() {
        var stars = []
        var score = Math.floor(this.score * 2) / 2
        var intNum = parseInt(score.toString().split('.')[0])
        var decNum = parseInt(score.toString().split('.')[1])
        for (var i = 1; i <= 5; i++) {
          if (intNum >= i) {
            stars.push(1)
          } else {
            stars.push(0)
          }
        }
        if (decNum === 5) {
          stars[intNum] = 2
        }
        return stars
      },
      starSize() {
        return 'star-' + this.size
      },
      starItemSize() {
        return 'star-item-' + this.size
      }
    }
  }

</script>
<style scoped lang="scss">
  .stars {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    @at-root {
      #{&}__star {
        &.star-48 {
          margin-right: 20px;
        }
        &.star-36 {
          margin-right: 5px;
        }
        &.star-24 {
          margin-right: 5px;
        }
        &:last-child {
          margin-right: 0;
        }
        @at-root {
          #{&}_item {
            background-size: contain;
          }
          #{&}_item_1 {
            &.star-item-48 {
              height: 24px;
              width: 24px;
              background-image: url('./star48_on@2x.png')
            }
            &.star-item-36 {
              width: 18px;
              height: 18px;
              background-image: url('./star36_on@2x.png')
            }
            &.star-item-24 {
              width: 12px;
              height: 12px;
              background-image: url('./star24_on@2x.png')
            }
          }
          #{&}_item_2 {
            &.star-item-48 {
              width: 24px;
              height: 24px;
              background-image: url('./star48_half@2x.png')
            }
            &.star-item-36 {
              width: 18px;
              height: 18px;
              background-image: url('./star36_half@2x.png')
            }
            &.star-item-24 {
              width: 12px;
              height: 12px;
              background-image: url('./star24_half@2x.png')
            }
          }
          #{&}_item_0 {
            &.star-item-48 {
              width: 24px;
              height: 24px;
              background-image: url('./star48_off@2x.png')
            }
            &.star-item-36 {
              width: 18px;
              height: 18px;
              background-image: url('./star36_off@2x.png')
            }
            &.star-item-24 {
              width: 12px;
              height: 12px;
              background-image: url('./star24_off@2x.png')
            }
          }
        }
      }
    }
  }

</style>
