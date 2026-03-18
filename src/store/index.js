import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    growthLimit: 12,
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
  getters: {
    getGrowthLimit: (state) => state.growthLimit
  },
  mutations: {
    SET_GROWTH_LIMIT(state, payload) {
      // payload가 null이나 undefined일 경우 대비
      state.growthLimit = payload !== null ? Number(payload) : 12;
    }
  },
  actions: {},
});

export default store;
