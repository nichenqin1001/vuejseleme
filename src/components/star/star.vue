<template>
  <div class="stars">
    <div class="stars__star" v-for="(star,index) in stars">
      <span v-if="stars[index]==1" class="stars__star_item"><img src="./star48_on@2x.png" alt=""></span>
      <span v-if="stars[index]==2" class="stars__star_item"><img src="./star48_half@2x.png" alt=""></span>
      <span v-if="stars[index]==0" class="stars__star_item"><img src="./star48_off@2x.png" alt=""></span>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['score'],
    computed: {
      stars() {
        var stars = []
        var score = Math.floor(this.score * 2) / 2
        var intNum = parseInt(score.toString().split('.')[0])
        var decNum = parseInt(score.toString().split('.')[1])
        for (var i = 1; i <= 5; i++) {
          if (intNum >= i) {
            stars.push('1')
          } else {
            stars.push('0')
          }
        }
        if (decNum === 5) {
          stars[intNum - 1] = '2'
        }

        return stars
      }
    }
  }

</script>
<style lang="scss">
  .stars {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
    @at-root {
      #{&}__star {
        margin-right: 20px;
        &:last-child{
          margin-right: 0;
        }
      }
    }
  }

</style>
