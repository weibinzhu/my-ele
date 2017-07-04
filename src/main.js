import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import goods from 'components/goods/goods.vue';// './component'有别名
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';
import './common/stylus/index.styl';

Vue.use(VueRouter);

// 配置vue router
let app = Vue.extend(App);

let router = new VueRouter({
  linkActiveClass: 'active'
});

router.map({
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  },
  'seller': {
    component: seller
  }
});

router.start(app, '#app'); // 启动router
router.go('/goods'); // 一进入页面就跳到goods
