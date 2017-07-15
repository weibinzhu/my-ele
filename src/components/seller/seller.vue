<template>
  <div class="seller" v-el:seller-wrapper>
    <div class="sellerContent">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <i class="icon-favorite" :class="{active:isFavorite}"></i>
          <div class="text">{{favoriteText}}</div>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="contentWrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li class="supportItem border-1px" v-for="item in seller.supports">
            <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
            <span class="text">{{seller.supports[$index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="sellerView">
        <h1 class="title">商家实景</h1>
        <div class="picsWrapper" v-el:pic-wrapper>
          <ul class="picList" v-el:pic-list>
            <li v-for="pic in seller.pics" class="pic">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="sellerInfo">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li v-for="info in seller.infos" class="info border-1px">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/stars/stars';
  import split from 'components/split/split';
  import BScroll from 'better-scroll';
  import {saveToLocal, loadFromLocal} from '../../common/js/store';
  export default {
    props: {
      // seller 是routerview传过来的
      seller: {
        type: Object
      }
    },
    data() {
      return {
        isFavorite: (() => {
          return loadFromLocal(this.seller.id, 'isFavorite', false);// 优雅地从本地提取数据
        })()
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    watch: {
      'seller'() {
        this._initScroll();
        this._initPics();
      }
    },
    ready() {
      this._initScroll();
      this._initPics();
    },
    methods: {
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.isFavorite = !this.isFavorite;
        saveToLocal(this.seller.id, 'isFavorite', this.isFavorite);// 优雅地存入数据
      },
      _initScroll() {
        if (!this.sellerScroll) {
          this.$nextTick(() => {
            // console.log(this.$els.sellerWrapper);
            this.sellerScroll = new BScroll(this.$els.sellerWrapper, {
              click: true
            });
          });
        } else {
          this.sellerScroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$els.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              // console.log(this.$els.picWrapper);
              this.picScroll = new BScroll(this.$els.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    computed: {
      favoriteText() {
        return this.isFavorite ? '已收藏' : '收藏';
      }
    },
    components: {
      star,
      split
    }

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/fun.styl"
  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      position: relative
      padding: 18px
      .favorite
        position: absolute
        width: 50px // 给外层定一个宽度，这样在『收藏』文字变动时，图标位置不会变
        top: 20px
        right 36px
        text-align: center
        .icon-favorite
          font-size: 24px
          line-height: 24px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
        .text
          font-size: 12px
          line-height: 12px
          margin-top: 4px
          color: rgb(77, 85, 93)
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .desc
        padding-bottom: 18px
        font-size: 0
        border-1px(rgba(7, 17, 27, 0.1))
        .star
          display: inline-block
          vertical-align: top // 用于与周围组件（包含图片、文字等）居中
          margin-right: 8px
        .text
          display: inline-block
          vertical-align: top // 用于与周围组件（包含图片、文字等）居中
          line-height: 18px
          margin-right: 12px
          font-size: 10px
          color: rgb(77, 85, 93)
      .remark
        display: flex
        padding-top: 18px
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border: none
          h2
            font-size: 10px
            line-height: 10px
            margin-bottom: 4px
            color: rgb(147, 153, 159)
          .content
            line-height: 24px
            font-weight: 200
            font-size: 10px
            color: rgb(7, 17, 27)
            .stress
              font-size: 24px
    .bulletin
      padding: 18px 18px 0 18px
      .title
        margin-bottom: 12px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .contentWrapper
        padding: 0 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .content
          line-height: 24px
          font-size: 12px
          color: rgb(240, 20, 20)
      .supports
        .supportItem
          padding: 16px 12px
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
          // fun.styl 设置的border要用border-none()去掉，不能用border:none
          .decrease
            bg-img('decrease_3')
          .discount
            bg-img('discount_3')
          .guarantee
            bg-img('guarantee_3')
          .invoice
            bg-img('invoice_3')
          .special
            bg-img('special_3')
          .icon
            display: inline-block
            vertical-align: top
            width: 16px
            height: 16px
            margin-right: 6px
            background-size: 12px 12px
            background-repeat: no-repeat
          .text
            font-size: 12px
            font-weight: 200
            color: rgb(7, 17, 27)
            line-height: 16px
            display: inline-block
            vertical-align: top
    .sellerView
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      .picsWrapper
        width: 100%
        overflow: hidden
        white-space: nowrap // 不会折行
        .picList
          font-size: 0
          .pic
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
    .sellerInfo
      padding: 18px
      color: rgb(7, 17, 27)
      .title
        padding-bottom: 12px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
        border-1px(rgba(7, 17, 27, 0.1))
      .info
        line-height: 16px
        font-size: 12px
        padding: 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
</style>
