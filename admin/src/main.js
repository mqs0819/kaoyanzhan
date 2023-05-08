import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'


Vue.use(ElementUI);

import http from './utils/http'
Vue.prototype.$http = http

Vue.mixin({
	computed: {
		uploadUrl() {
			return this.$http.defaults.baseURL + '/upload'
		}
	},
	methods: {
		getAuthHeaders() {
			return {
				Authorization: `Bearer ${localStorage.token || ''}`
			}
		}
	}
})

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
