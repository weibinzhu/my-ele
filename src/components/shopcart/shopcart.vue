<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="contentLeft" >
        <div class="logoWrapper">
          <div class="logo" :class="{highlight:totalCount>0}">
            <i class="icon-shopping_cart" :class="{highlight:totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">
            {{totalCount}}
          </div>
        </div>
        <div class="price" :class="{highlight:totalPrice>0}">￥{{totalPrice}}元</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="contentRight" @click.stop.prevent="pay">
        <div class="pay" :class="{enough:this.totalPrice >= this.minPrice}">
          {{payDesc}}
        </div>
      </div>
      <div class="shopcartList" v-show="listShow" transition="fold">
        <div class="listHeader">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="listContent" v-el:list-content>
          <ul>
            <li class="food" v-for="food in selectedFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrolWrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="listMask" v-show="listShow" transition="fade" @click="hideList"></div>
</template>

<script type="text/ecmascript-6">
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import BScroll from 'better-scroll';
  export default{
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectedFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 2
            }
          ];
        }
      }
    },
    data() {
      return {
        fold: true
      };
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectedFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectedFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
        }
        let show = !this.fold;
        if (show) {
          // 数据变了，DOM的变化不会立刻生效，而Better-Scroll是依赖DOM的，所以要用$nextTick
          this.$nextTick(() => {
            if (!this.shopcartScroll) {
              this.shopcartScroll = new BScroll(this.$els.listContent, {
                click: true
              });
            } else {
              this.shopcartScroll.refresh();
            }
          });
        }
        // console.log(show);
        return show;
      }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      empty() {
        this.selectedFoods.forEach((food) => {
          food.count = 0;
        });
      },
      hideList() {
        this.fold = true;
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`支付￥${this.totalPrice}元`);
      }
    },
    components: {
      cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/fun.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    font-size: 0
    height: 48px
    background-color #7e8c8d
    .content
      display: flex
      background: #141d27
      .contentLeft
        flex: 1
        .logoWrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 48px
          height: 48px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.highlight
              background-color: rgb(0, 160, 220)
            .icon-shopping_cart
              font-size: 24px
              line-height: 36px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: -2px
            right: -6px
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background-color: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgb(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px // 用这种方法实现垂直居中是为了防止border撑满整个区块，这样不符合设计图要求
          line-height: 24px // 而不是设置line-height等于高度
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          color: rgba(255, 255, 255, 0.4)
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          color: rgba(255, 255, 255, 0.4)
          font-size: 12px
      .contentRight
        flex: 0 0 105px
        width: 105px
        .pay
          text-align: center
          font-size: 12px
          color: rgba(255, 255, 255, 0.4)
          font-weight: 700
          height: 48px
          line-height: 48px
          background-color: #2b333b
          &.enough
            background-color: #00b43c
            color: #fff
      .shopcartList
        position: absolute
        top: 0
        left: 0
        z-index: -1
        width: 100%
        &.fold-transition
          transition: all 0.4s
          transform: translate3d(0, -100%, 0)
        // -100%的话，偏移距离就能根据高度改变而改变
        &.fold-enter, &.fold-leave
          transform: translate3d(0, 0, 0)
        .listHeader
          height: 40px
          line-height: 40px
          padding: 0 18px
          background-color: #f3f5f7
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          .title
            float: left
            font-size: 14px
            color: rgb(7, 17, 27)
          .empty
            float: right
            font-size: 12px
            color: rgb(0, 160, 220)

        .listContent
          padding: 0 18px
          max-height: 217px // 限制最大高度
          background-color: #FFF
          overflow: hidden
          .food
            position: relative
            padding: 12px 0
            box-sizing: border-box
            border-1px(rgba(7, 17, 27, 0.1))
            .name
              line-height: 24px
              font-size: 14px
              color: rgb(7, 17, 27)
            .price
              font-size: 14px
              line-height: 24px
              font-weight: 700
              color: rgb(240, 20, 20)
              position: absolute
              right: 90px
              bottom: 12px
            .cartcontrolWrapper
              position: absolute
              right: -10px
              bottom: 6px

  .listMask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    &.fade-transition
      transition: all 0.5s
      opacity: 1
      background-color: rgba(7, 17, 27, 0.6)
    &.fade-enter, &.fade-leave
      opacity: 0
      background-color: rgba(7, 17, 27, 0)
</style>
