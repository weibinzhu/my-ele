<template>
  <div class="goods">
    <div class="menuWrapper">
      <ul>
        <li v-for="item in goods" class="menuItem ">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="foodItem border-1px">
              <div class="icon">
                <img :src="food.icon" class="iconImg">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERRNUM = 0;
  export default {
    porps: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        classMap: []
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERRNUM) {
          this.goods = response.data;
          console.log(this.goods);
        }
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/fun.styl"
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    overflow: hidden
    width: 100%
    .menuWrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menuItem
        width: 56px
        height: 54px
        padding: 0 12px
        display: table
        .icon
          display: inline-block
          width: 12px
          height: 12px
          margin-right: 2px
          &.decrease
            bg-img('decrease_3')
            background-size: 12px 12px
            background-repeat: no-repeat
          &.discount
            bg-img('discount_3')
            background-size: 12px 12px
            background-repeat: no-repeat
          &.guarantee
            bg-img('guarantee_3')
            background-size: 12px 12px
            background-repeat: no-repeat
          &.invoice
            bg-img('invoice_3')
            background-size: 12px 12px
            background-repeat: no-repeat
          &.special
            bg-img('special_3')
            background-size: 12px 12px
            background-repeat: no-repeat
        .text
          font-size: 12px
          line-height: 14px
          font-weight: 200
          display: table-cell
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
    .foodsWrapper
      flex: 1
      .foodList
        .title
          font-size: 12px
          line-height: 26px
          height: 26px
          color: rgb(147, 153, 159)
          background-color: #f3f5f7
          padding-left: 14px
          border-left: 2px solid #d9dde1
        .foodItem
          margin: 18px
          // padding-bottom: 18px
          display: flex
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
            margin-right: 10px
            .iconImg
              height: 57px
          .content
            flex: 1
            .name
              font-size: 14px
              line-height: 14px
              height: 14px
              color: rgb(7, 17, 27)
              margin-top: 2px
              margin-bottom: 8px
            .desc
              margin-bottom: 8px
              font-size: 10px
              line-height: 10px
              height: 10px
              color: rgb(147, 153, 159)
            .extra
              font-size: 10px
              line-height: 10px
              height: 10px
              color: rgb(147, 153, 159)
              &.count
                margin-right: 12px
            .price
              font-weight: 700
              line-height: 24px
              .now
                margin-right: 8px
                font-size: 14px
                color: rgb(240, 20, 20)
              .old
                text-decoration: line-through // 『删除横线』样式
                font-size: 10px
                color: rgb(147, 153, 159)
</style>
