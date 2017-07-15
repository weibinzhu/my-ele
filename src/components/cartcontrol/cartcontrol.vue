<template>
  <div class="cartControl">
    <div class="cartDecrease" v-show="food.count>0" @click.stop="decreaseCart" transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="cartCount" v-show="food.count>0">{{food.count}}</div>
    <div class="cartIncrease icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'; // 引入Vue实例
  export default{
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        } // 防止在pc一次点击触发两次点击事件
        if (!this.food.count) {
          // this.food.count = 1;
          // 当一个参数本不存在时，直接赋值的话Vue不会检测到变化
          // 这就是老师回答我为什么有时候不需要预先声明时表达的意思
          Vue.set(this.food, 'count', 1); // this vue method can initial a new parameter
        } else {
          this.food.count++;
        }
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        } // 防止在pc一次点击触发两次点击事件
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartControl
    font-size: 0
    .cartDecrease
      display: inline-block
      padding: 6px
      transition: all 0.4s linear
      &.move-transition
        opacity: 1
        transform: translate3D(0, 0, 0)
        .inner
          display: inline-block
          font-size: 24px
          font-size: 24px
          color: rgb(0, 160, 220)
          transition: all 0.4s linear
          transform: rotate(0)
      &.move-enter, &.move-leave
        opacity: 0
        transform: translate3D(24px, 0, 0)
        .inner
          transform: rotate(90deg)
    .cartCount
      display: inline-block
      vertical-align: top
      font-size: 12px
      text-align: center
      color: rgb(147, 153, 159)
      line-height: 24px
      padding-top: 6px
      width: 12px
    .cartIncrease
      display: inline-block
      padding: 6px
      font-size: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

</style>
