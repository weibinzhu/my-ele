<template>
  <div class="header">
    <div class="contentWrapper">
      <div class="avatar">
        <img :src="seller.avatar">
        <!--如果不用v-bind则会报错-->
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟到达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supportContent" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletinWrapper" @click="showDetail">
      <span class="bulletinTitle"></span><span class="bulletinText">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail" transition="fade">
      <div class="detailWrapper clearfix">
        <div class="detailContent">
          <h1 class="name">{{seller.name}}</h1>
          <div class="starWrapper">
            <stars :size="48" :score="seller.score"></stars>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports" v-if="seller.supports">
            <li class="supportItem" v-for="item in seller.supports">
              <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
              <span class="text">{{seller.supports[$index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="bulletinContent">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detailClose" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import stars from 'components/stars/stars';
  export default {
//    props: ['seller'],
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        classMap: [],
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    components: {
      stars
    }

  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/fun.styl"
  @import "../../common/stylus/base.styl"
  .header
    color: #FFF
    position: relative
    background: rgba(7, 17, 27, 0.5)
    overflow: hidden
    .contentWrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar > img
        width: 64px;
        height: 64px;
        border-radius: 2px
      .avatar
        display: inline-block
      /*vertical-align :top*/
      .content
        vertical-align: top
        display: inline-block
        font-size: 12px
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-img('brand')
            background-repeat: no-repeat
            background-size: 30px 18px
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .decrease
            bg-img('decrease_1')
          .discount
            bg-img('discount_1')
          .guarantee
            bg-img('guarantee_1')
          .invoice
            bg-img('invoice_1')
          .special
            bg-img('special_1')
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
          .text
            font-size: 12px
            line-height: 10px
      .supportContent
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          font-size: 10px
          vertical-align: top
        .icon-keyboard_arrow_right
          font-size: 10px
          line-height: 24px
          margin-left: 2px
    .bulletinWrapper
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      position: relative
      background: rgba(7, 17, 27, 0.2)
      // 文字过长自动隐藏多余文字并加上省略号
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      .bulletinTitle
        display: inline-block
        width: 22px
        height: 12px
        bg-img('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
        vertical-align: top
        margin-top: 8px
      .bulletinText
        vertical-align: middle
        font-size: 10px
        line-height: 10px
        margin: 0 4px
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        top: 10px
        font-size: 10px
    .background
      position: absolute
      top: 0
      left: 0
      z-index: -1
      width: 100%
      height: 100%
      filter: blur(10px)
    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      backdrop-filter: blur(10px) // iPhone手机专用
      &.fade-transition
        transition: all .3s
        background: rgba(7, 17, 27, 0.8)
        opacity: 1
      &.fade-enter, &.fade-leave
        background: rgba(7, 17, 27, 0)
        opacity: 0
      .detailWrapper
        // 这就是wrapper层的作用，设置一个最小高度
        min-height: 100%
        width: 100%
        .detailContent
          margin-top: 64px
          /*必须用padding bottom*/
          padding-bottom: 64px
          .name
            line-height: 16px
            font-size: 16px
            font-weight: 700
            text-align: center
          .starWrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 28px auto 24px
            .line
              flex: 1
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
              // 为了垂直居中
              position: relative
              top: -6px
            .text
              padding: 0 12px
              font-size: 14px
              font-weight: 700
          .supports
            width: 80%
            margin: 48px auto 56px
            padding: 0 24px
            .supportItem
              margin-bottom: 24px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: 16px
                height: 16px
                margin-right: 6px
                &.decrease
                  bg-img('decrease_2')
                  background-size: 16px 16px
                  background-repeat: no-repeat
                &.discount
                  bg-img('discount_2')
                  background-size: 16px 16px
                  background-repeat: no-repeat
                &.guarantee
                  bg-img('guarantee_2')
                  background-size: 16px 16px
                  background-repeat: no-repeat
                &.invoice
                  bg-img('invoice_2')
                  background-size: 16px 16px
                  background-repeat: no-repeat
                &.special
                  bg-img('special_2')
                  background-size: 16px 16px
                  background-repeat: no-repeat
              .text
                font-size: 16px
                line-height: 16px
                font-weight: 200
                vertical-align: top
          .bulletin
            margin: 0 auto
            padding: 0 12px
            width: 80%
            .bulletinContent
              font-size: 12px
              font-weight: 200
              line-height: 24px
      .detailClose
        position: relative
        width: 32px
        height: 32px
        // 这个close跟上面的内容区域是平级的，而当内容区域没有突出屏幕高度的时候我们不希望close按钮突出
        // 所以我们要设置一个负的margin-top，也是因为这个原因，detailContent必须用padding-bottom
        margin: -64px auto 0 auto
        clear: both //固定套路
        font-size: 32px
</style>
