<template>
  <div class="goods">
    <div class="menuWrapper" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods" class="menuItem" :class="{'current':currentIndex === $index}"
            @click="selectMenu($index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foodsWrapper" v-el:foods-wrapper>
      <ul>
        <li v-for="item in goods" class="foodList foodListHook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="food in item.foods" class="foodItem border-1px">
              <div class="icon">
                <img :src="food.icon" class="iconImg">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old"
                                                                v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrolWrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"
              :selected-foods="selectedFoods"></shopcart>
  </div>
  <food :food="selectedFood" v-ref:food></food>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import food from 'components/food/food';
  const ERRNUM = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        classMap: [],
        heightList: [],
        currentHeight: 0,
        selectedFood: {} // 被要求查看详情页的商品，与selectedFoods不同
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERRNUM) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initBetterScroll();
            this._calculateHeightList();
          });
        }
      });
    },
    computed: {
      currentIndex() {
        for (let j = 0; j < this.heightList.length; j++) {
          let heightTop = this.heightList[j];
          let heightBottom = this.heightList[j + 1];
          if (!heightBottom || (this.currentHeight >= heightTop && this.currentHeight < heightBottom)) {
            return j;
          }
        }
        return 0;
      },
      selectedFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      _initBetterScroll() {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
          probeType: 3,
          click: true
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.currentHeight = Math.abs(Math.round(pos.y));
          // console.log(this.currentIndex);
          // console.log(this.currentHeight);
        });
      },
      _calculateHeightList() {
        let height = 0;
        let foodList = this.$els.foodsWrapper.getElementsByClassName('foodListHook');
        this.heightList.push(height);
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight;
          this.heightList.push(height);
        }
        // console.log(this.heightList);
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }// 用于防止在pc端出现两次点击，只有better-scroll派发的点击事件有_constructed属性
        let foodList = this.$els.foodsWrapper.getElementsByClassName('foodListHook');
        let targetEle = foodList[index];
        this.foodsScroll.scrollToElement(targetEle, 300);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/fun.styl"
  @import "../../common/stylus/base.styl"
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
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background-color: #fff
          font-weight: 700
          .text
            border-none()
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
              height: 12px
              color: rgb(147, 153, 159)
            .extra
              font-size: 10px
              line-height: 12px
              height: 10px
              color: rgb(147, 153, 159)
              .count
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
            .cartcontrolWrapper
              position: absolute
              right: 0
              bottom: -4px
</style>
