import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    waterTempData: '',
    waterRecordTime: '',
  },
  getters: {},
  mutations: {},
  actions: {},
});

export default store;
