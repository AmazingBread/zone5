import Vue from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from "axios";


Vue.prototype.$axios = axios;

Vue.config.productionTip = false
export const eventBus = new Vue();



new Vue({
	router,
	store,
	render:h => h(App)
}).$mount('#app')
