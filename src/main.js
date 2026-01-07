import Vue from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from "axios";


router.afterEach(() => {
	setTimeout(() => {
		try {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
		} catch (e) {
			console.warn('AdSense rerender error:', e);
		}
	}, 1000);
});

Vue.prototype.$axios = axios;

Vue.config.productionTip = false
export const eventBus = new Vue();



new Vue({
	router,
	store,
	render:h => h(App)
}).$mount('#app')
