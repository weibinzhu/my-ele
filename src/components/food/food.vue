<template>
  <div class="food" v-show="showFlag" transition="move" v-el:food>
    <div class="foodContent">
      <div class="imgHeader">
        <img :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sellCount">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
      </div>
      <div class="cartcontrolWrapper">
        <cartcontrol :food="food"></cartcontrol>
      </div>
      <div class="buy" v-show="!food.count || food.count===0" @click.stop="addFirst" transition="fade">
        加入购物车
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  export default{
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      show() {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$els.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }// 有可能多次被点击，所以需要判断一下，避免不必要的初始化
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1); // 我觉得这种从子组件传数据到父组件的方法不好
      }
    },
    components: {
      cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed // 覆盖整个屏幕，相对于屏幕固定定位
    top: 0
    left: 0
    bottom: 0 // 给底部购物车预留位置
    z-index: 30 // 让购物车能覆盖住他
    width: 100%
    background-color: #fff
    &.move-transition
      transition: all 0.4s
      opacity: 1
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave
      opacity: 0
      transform: translate3d(100%, 0, 0)
    .foodContent
      position: relative
      .imgHeader
        position: relative
        width: 100%
        height: 0
        // 疑问：padding-top为100%，为什么里面的内容不会被顶下去
        padding-top: 100%
        // 这个黑魔法可以方便地用来设置宽度自适应，同时高宽保持一致的容器
        // 根据W3C标准，当我们给padding设置100%时，他的计算是根据盒子的宽来计算的。所以在这里相当于设置了一个宽高相等的容器
        img
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        .back
          position: absolute
          top: 10px
          left: 0
          .icon-arrow_lift
            display: block
            padding: 10px
            font-size: 20px
            color: #FFF
      .content
        padding: 18px
        .title
          line-height: 14px
          margin-bottom: 8px
          font-size: 14px
          font-weight: 700
          color: rgb(7, 17, 27)
        .detail
          font-size: 0px
          line-height: 10px
          height: 10px
          margin-bottom: 18px
          .sellCount, .rating
            font-size: 10px
            color: rgb(147, 153, 159)
          .sellCount
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          font-size: 0
          .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through // 『删除横线』样式
            font-size: 10px
            color: rgb(147, 153, 159)
      .cartcontrolWrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #ffffff
        background-color: rgb(0, 160, 220)
        &.fade-transition
          transition: all 0.3s
          opacity: 1
        &.fade-enter, &.fade-leave
          opacity: 0
</style>
