import Vue from 'vue';
import VueRouter from 'vue-router';
import StartView from "../views/StartView.vue";
import BreadView from "../views/StartBreadView.vue";
import SuperBonoView from "../views/SuperBonoView.vue";
import EarlyBonoView from "../views/EarlyBonoView.vue";
import mt from "../views/mtView.vue";
import mtAdmin from "../views/mtAdmin.vue";

import SwimTrainingPlan from "../views/SwimTrainingPlan.vue";
import TrainingView from "../views/TrainingView.vue";
import EventView from "../views/EventView.vue";
import CheeringView from "../views/CheeringView.vue";
import CheeringViewDeagu from "../views/CheeringView_deagu.vue";
import CheeringViewChangwon from "../views/CheeringView_changwon.vue";
import groupBuying from "../views/groupBuying.vue";
import groupBuying2 from "../views/groupBuying2.vue";

import BearView from "../views/BearView.vue";
import OpenWaterView from "../views/OpenWaterView.vue";
import SwimmingCompetition from "../views/SwimmingCompetition.vue";
import SwimmingCompetition2 from "../views/SwimmingCompetition2.vue";
import SwimmingCompetition3 from "../views/SwimmingCompetition3.vue";
import AdminSwimmingCompetition from "../views/AdminSwimmingCompetition.vue";
import AdminSwimmingCompetition2 from "../views/AdminSwimmingCompetition2.vue";
import AdminSwimmingCompetition3 from "../views/AdminSwimmingCompetition3.vue";
import GoodsCapView from "../views/GoodsCapView.vue";
import GoodsSwimWearView from "../views/GoodsSwimWearView.vue";
import GoodsSwimWearView2 from "../views/GoodsSwimWearView2.vue";
import GoodsTeeView from "../views/GoodsTeeView.vue";
import GoodsSocksView from "../views/GoodsSocksView.vue";
import GoodsView from "../views/GoodsView.vue";
import FitDiary from "../views/FitDiary.vue";
import FitDiaryEdit from "../views/FitDiaryEdit.vue";
import FitDiaryZoneFive from "../views/FitDiaryZoneFive.vue";
import FitDiaryZoneFiveEdit from "../views/FitDiaryZoneFiveEdit.vue";

import AdminView from "../views/AdminView.vue";
import BreadAdminView from "../views/AdminBreadView.vue";
import SuperBonoAdminView from "../views/AdminSuperBonoView.vue";
import EarlyBonoAdminView from "../views/AdminEarlyBonoView.vue";
import TrainingAdminView from "../views/TrainingAdminView.vue";
import EventAdminView from "../views/EventAdminView.vue";
import BearAdminView from "../views/BearAdminView.vue";
import OpenWaterAdminView from "../views/OpenWaterAdminView.vue";
import GoodsCapAdminView from "../views/GoodsCapAdminView.vue";
import GoodsSwimWearAdminView from "../views/GoodsSwimWearAdminView.vue";
import GoodsSwimWearAdminView2 from "../views/GoodsSwimWearAdminView2.vue";
import GoodsTeeAdminView from "../views/GoodsTeeAdminView.vue";
import GoodsSocksAdminView from "../views/GoodsSocksAdminView.vue";
import groupBuyingAdminView from "../views/groupBuyingAdminView.vue";
import groupBuyingAdminView2 from "../views/groupBuyingAdminView2.vue";
import MainView from "../views/MainView.vue";
import DietView from "../views/diet.vue";
import BasuView from "../views/BasuView.vue";
import { logEvent } from 'firebase/analytics';
import { analytics } from '../firebase';
import SwimVirus from "../views/swimVirus.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MainView",
    component: MainView,
    meta: { title: '보노보노 물보노' }, // 타이틀 설정
  },
  {
    path: "/swimvirus",
    name: "SwimVirus",
    component: SwimVirus,
    meta: { title: '스윔바이러스 swimvirus' }, // 타이틀 설정
  },
  {
    path: "/diet",
    name: "DietTracker",
    component: DietView,
    meta: { title: '보노보노 살빼자' }, // 타이틀 설정
  },
  {
    path: "/basu",
    name: "BasuWeather",
    component: BasuView,
    meta: { title: '보노보노 바수날씨' }, // 타이틀 설정
  },
  {
    path: "/start",
    name: "StartView",
    component: StartView,
    meta: { title: '보노보노 START' }, // 타이틀 설정
  },
  {
    path: "/bread",
    name: "breadView",
    component: BreadView,
    meta: { title: '보노보노 빵쌤 훈련' }, // 타이틀 설정
  },
  {
    path: "/super_bono",
    name: "superBonoView",
    component: SuperBonoView,
    meta: { title: '보노보노 슈퍼보노' }, // 타이틀 설정
  },
  {
    path: "/early_bono",
    name: "EarlyBonoView",
    component: EarlyBonoView,
    meta: { title: '보노보노 새벽보노' }, // 타이틀 설정
  },
  {
    path: "/mt",
    name: "mt",
    component: mt,
    meta: { title: '보노보노 MT' }, // 타이틀 설정
  },
  {
    path: "/mt0330",
    name: "mtAdmin",
    component: mtAdmin,
    meta: { title: '보노보노 MT 관리자' }, // 타이틀 설정
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
    path: "/swim_training_plan",
    name: "SwimTrainingPlan",
    component: SwimTrainingPlan,
    meta: { title: '보노보노 수영훈련계획표' }, // 타이틀 설정
  },
  {
    path: "/swimming_competition",
    name: "SwimmingCompetition",
    component: SwimmingCompetition,
    meta: { title: '보노보노 대회' }, // 타이틀 설정
  },
  {
    path: "/swimming_competition2",
    name: "SwimmingCompetition2",
    component: SwimmingCompetition2,
    meta: { title: '보노보노 경주 대회' }, // 타이틀 설정
  },
  {
    path: "/swimming_competition3",
    name: "SwimmingCompetition3",
    component: SwimmingCompetition3,
    meta: { title: '보노보노 대구 대회' }, // 타이틀 설정
  },
  {
    path: "/swimming_competition0330",
    name: "AdminSwimmingCompetition",
    component: AdminSwimmingCompetition,
    meta: { title: '보노보노 진주 대회 관리자' }, // 타이틀 설정
  },
  {
    path: "/swimming_competition20330",
    name: "AdminSwimmingCompetition2",
    component: AdminSwimmingCompetition2,
    meta: { title: '보노보노 경주 대회 관리자' }, // 타이틀 설정
  },
  {
    path: "/swimming_competition30330",
    name: "AdminSwimmingCompetition3",
    component: AdminSwimmingCompetition3,
    meta: { title: '보노보노 대구 대회 관리자' }, // 타이틀 설정
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
    path: "/goods_swimwear2",
    name: "GoodsSwimWearView2",
    component: GoodsSwimWearView2,
    meta: { title: '보노보노 굿즈-수영복2' }, // 타이틀 설정
  },
  {
    path: "/goods_tee",
    name: "GoodsTeeView",
    component: GoodsTeeView,
    meta: { title: '보노보노 굿즈-티셔츠' }, // 타이틀 설정
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
    meta: { title: '보노보노 cheering 대구장거리 대회' }, // 타이틀 설정
  },
  {
    path: "/cheering_deagu",
    name: "CheeringViewDeagu",
    component: CheeringViewDeagu,
    meta: { title: '보노보노 cheering 대구대회' }, // 타이틀 설정
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
    path: "/group_buying2",
    name: "groupBuying2",
    component: groupBuying2,
    meta: { title: '보노보노 요해미티 공동구매' }, // 타이틀 설정
  },
  {
    path: "/0330",
    name: "AdminView",
    component: AdminView,
    meta: { title: '보노보노 start 관리자' }, // 타이틀 설정
  },
  {
    path: "/bread0330",
    name: "BreadAdminView",
    component: BreadAdminView,
    meta: { title: '보노보노 빵쌤 관리자' }, // 타이틀 설정
  },
  {
    path: "/super_bono0330",
    name: "SuperBonoAdminView",
    component: SuperBonoAdminView,
    meta: { title: '보노보노 슈퍼보노 관리자' }, // 타이틀 설정
  },
  {
    path: "/early_bono0330",
    name: "EarlyBonoAdminView",
    component: EarlyBonoAdminView,
    meta: { title: '보노보노 슈퍼보노 관리자' }, // 타이틀 설정
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
    path: "/goods_swimwear20330",
    name: "GoodsSwimWearAdminView2",
    component: GoodsSwimWearAdminView2,
    meta: { title: '보노보노 굿즈-수영복 관리자' }, // 타이틀 설정
  },
  {
    path: "/goods_tee0330",
    name: "GoodsTeeAdminView",
    component: GoodsTeeAdminView,
    meta: { title: '보노보노 굿즈-티셔츠 관리자' }, // 타이틀 설정
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
  {
    path: "/group_buying20330",
    name: "groupBuyingAdminView2",
    component: groupBuyingAdminView2,
    meta: { title: '보노보노 요해미티 공동구매 - 관리자' }, // 타이틀 설정
  },
  {
    path: "/fit_diary",
    name: "FitDiary",
    component: FitDiary,
    meta: { title: '보노보노 운동인증' }, // 타이틀 설정
  },
  {
    path: "/fit_diary_edit/:userName",
    name: "FitDiaryEdit",
    component: FitDiaryEdit,
    meta: { title: '보노보노 운동인증-인증추가' }, // 타이틀 설정
  },
  {
    path: "/fit_diary_zone_five",
    name: "FitDiaryZoneFive",
    component: FitDiaryZoneFive,
    meta: { title: '존파이브 운동인증' }, // 타이틀 설정
  },
  {
    path: "/fit_diary_zone_five_edit/:userName",
    name: "FitDiaryZoneFiveEdit",
    component: FitDiaryZoneFiveEdit,
    meta: { title: '존파이브 운동인증-인증추가' }, // 타이틀 설정
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
  mode: "hash",
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 항상 페이지 맨 위로 스크롤 이동
    return { x: 0, y: 0 };
  }
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
