import Vue from 'vue';
import VueRouter from 'vue-router';
import StartView from "../views/StartView.vue";
import AdminView from "../views/AdminView.vue";
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
    path: "/0330",
    name: "AdminView",
    component: AdminView,
    meta: { title: '보노보노 관리자' }, // 타이틀 설정
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
