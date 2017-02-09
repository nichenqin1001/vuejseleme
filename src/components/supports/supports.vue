<template>
  <ul class="supports">
    <li class="supports_support" v-for="(support,index) in supports">
      <img :class="'icon-'+clsMap[support.type]" alt="" class="supports_support_icon">
      <span class="supports_support_text">{{support.description}}</span>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'supports',
    props: ['supports'],
    computed: {
      clsMap() {
        return this.$store.state.clsMap
      }
    }
  }

</script>
<style scoped lang="scss">
  @import './supports.scss';

</style>
