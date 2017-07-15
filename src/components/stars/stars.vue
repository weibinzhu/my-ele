<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="starItem" track-by="$index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const ON = 'on';
  const HALF = 'half';
  const OFF = 'off';

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        for (var i = 0; i < score; i++) {
          result.push(ON);
        }
        if (hasDecimal) {
          result.push(HALF);
        }
        while (result.length < LENGTH) {
          result.push(OFF);
        }
        return result;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/fun.styl"
  .star
    font-size: 0
    .starItem
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .starItem
        width: 20px
        height: 20px
        margin-right: 22px
        &:last-child
          margin-right: 0
        &.on
          bg-img("star48_on")
          background-size: 20px 20px
        &.half
          bg-img("star48_half")
          background-size: 20px 20px
        &.off
          bg-img("star48_off")
          background-size: 20px 20px
    &.star-36
      .starItem
        width: 15px
        height: 15px
        margin-right: 6px
        &:last-child
          margin-right: 0
        &.on
          bg-img("star36_on")
          background-size: 15px 15px
        &.half
          bg-img("star36_half")
          background-size: 15px 15px
        &.off
          bg-img("star36_off")
          background-size: 15px 15px
    &.star-24
      .starItem
        width: 10px
        height: 10px
        margin-right: 3px
        &:last-child
          margin-right: 0
        &.on
          bg-img("star24_on")
          background-size: 10px 10px
        &.half
          bg-img("star24_half")
          background-size: 10px 10px
        &.off
          bg-img("star24_off")
          background-size: 10px 10px

</style>
