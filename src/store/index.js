import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    waterTempData: '',
    waterRecordTime: '',
    suonDataSet: [
      {
        name: '그저깨',
        color: '#d2d2d2',
        values: []
      },
      {
        name: '어저깨',
        color: '#f49674',
        values: []
      },
      {
        name: '오늘',
        color: '#334372',
        values: []
      },
    ]
  },
  getters: {},
  mutations: {},
  actions: {},
});

export default store;
