import Vue from 'vue';
import VueRouter from 'vue-router';
import StartView from "../views/StartView.vue";
import TrainingView from "../views/TrainingView.vue";
import EventView from "../views/EventView.vue";
import CheeringView from "../views/CheeringView.vue";
import CheeringViewChangwon from "../views/CheeringView_changwon.vue";
import groupBuying from "../views/groupBuying.vue";

import BearView from "../views/BearView.vue";
import OpenWaterView from "../views/OpenWaterView.vue";
import GoodsCapView from "../views/GoodsCapView.vue";
import GoodsSwimWearView from "../views/GoodsSwimWearView.vue";
import GoodsSocksView from "../views/GoodsSocksView.vue";
import GoodsView from "../views/GoodsView.vue";

import AdminView from "../views/AdminView.vue";
import TrainingAdminView from "../views/TrainingAdminView.vue";
import EventAdminView from "../views/EventAdminView.vue";
import BearAdminView from "../views/BearAdminView.vue";
import OpenWaterAdminView from "../views/OpenWaterAdminView.vue";
import GoodsCapAdminView from "../views/GoodsCapAdminView.vue";
import GoodsSwimWearAdminView from "../views/GoodsSwimWearAdminView.vue";
import GoodsSocksAdminView from "../views/GoodsSocksAdminView.vue";
import groupBuyingAdminView from "../views/groupBuyingAdminView.vue";
import MainView from "../views/MainView.vue";
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase'; // firebase.js 경로

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainView",
    component: MainView,
    meta: { title: '보노보노 물보노' }, // 타이틀 설정
  },
  {
    path: "/start",
    name: "StartView",
    component: StartView,
    meta: { title: '보노보노 START' }, // 타이틀 설정
  },
  {
    path: "/training",
    name: "TrainingView",
    component: TrainingView,
    meta: { title: '보노보노 훈련' }, // 타이틀 설정
  },
  {
    path: "/event",
    name: "EventView",
    component: EventView,
    meta: { title: '보노보노 이벤트' }, // 타이틀 설정
  },
  {
    path: "/bear",
    name: "BearView",
    component: BearView,
    meta: { title: '보노보노 북극곰축제' }, // 타이틀 설정
  },
  {
    path: "/open_water",
    name: "OpenWaterView",
    component: OpenWaterView,
    meta: { title: '보노보노 바다수영' }, // 타이틀 설정
  },
  {
    path: "/goods",
    name: "GoodsView",
    component: GoodsView,
    meta: { title: '보노보노 굿즈' }, // 타이틀 설정
  },
  {
    path: "/goods_cap",
    name: "GoodsCapView",
    component: GoodsCapView,
    meta: { title: '보노보노 굿즈-수모' }, // 타이틀 설정
  },
  {
    path: "/goods_swimwear",
    name: "GoodsSwimWearView",
    component: GoodsSwimWearView,
    meta: { title: '보노보노 굿즈-수영복' }, // 타이틀 설정
  },
  {
    path: "/goods_socks",
    name: "GoodsSocksView",
    component: GoodsSocksView,
    meta: { title: '보노보노 굿즈-양말' }, // 타이틀 설정
  },
  {
    path: "/cheering",
    name: "CheeringView",
    component: CheeringView,
    meta: { title: '보노보노 cheering 통영 트라이에슬론' }, // 타이틀 설정
  },
  {
    path: "/cheering_changwon",
    name: "CheeringViewChangwon",
    component: CheeringViewChangwon,
    meta: { title: '보노보노 cheering 창원대회' }, // 타이틀 설정
  },
  {
    path: "/group_buying",
    name: "groupBuying",
    component: groupBuying,
    meta: { title: '보노보노 요해미티 공동구매' }, // 타이틀 설정
  },
  {
    path: "/0330",
    name: "AdminView",
    component: AdminView,
    meta: { title: '보노보노 start 관리자' }, // 타이틀 설정
  },
  {
    path: "/training0330",
    name: "TrainingAdminView",
    component: TrainingAdminView,
    meta: { title: '보노보노 훈련 관리자' }, // 타이틀 설정
  },
  {
    path: "/event0330",
    name: "EventAdminView",
    component: EventAdminView,
    meta: { title: '보노보노 이벤트 관리자' }, // 타이틀 설정
  },
  {
    path: "/bear0330",
    name: "BearAdminView",
    component: BearAdminView,
    meta: { title: '보노보노 bear 관리자' }, // 타이틀 설정
  },
  {
    path: "/open_water0330",
    name: "OpenWaterAdminView",
    component: OpenWaterAdminView,
    meta: { title: '보노보노 바다수영 관리자' }, // 타이틀 설정
  },
  {
    path: "/goods_cap0330",
    name: "GoodsCapAdminView",
    component: GoodsCapAdminView,
    meta: { title: '보노보노 굿즈-수모 관리자' }, // 타이틀 설정
  },
  {
    path: "/goods_swimwear0330",
    name: "GoodsSwimWearAdminView",
    component: GoodsSwimWearAdminView,
    meta: { title: '보노보노 굿즈-수영복 관리자' }, // 타이틀 설정
  },
  {
    path: "/goods_socks0330",
    name: "GoodsSocksAdminView",
    component: GoodsSocksAdminView,
    meta: { title: '보노보노 굿즈-양말 관리자' }, // 타이틀 설정
  },
  {
    path: "/group_buying0330",
    name: "groupBuyingAdminView",
    component: groupBuyingAdminView,
    meta: { title: '보노보노 요해미티 공동구매 - 관리자' }, // 타이틀 설정
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   component: () =>
  //       import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  //   meta: { title: '소개 - 보노보노' }, // 타이틀 설정
  // },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// 전역 가드 설정
router.beforeEach((to, from, next) => {
  // 타이틀 변경
  document.title = to.meta.title || '보노보노 물보노'; // 기본 타이틀 설정

  // 페이지 뷰 이벤트 기록
  logEvent(analytics, 'page_view', { page_title: document.title });

  next();
});

export default router;
