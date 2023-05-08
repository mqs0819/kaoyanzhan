import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './utils/vant-require'
import axios from './utils/http'
import './assets/scss/style.scss'

Vue.prototype.$http = axios

Vue.config.productionTip = false

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

import Tabbars from './views/components/Tabbar.vue'
Vue.component('m-tabbar', Tabbars)

import Card from './views/components/Card.vue'
Vue.component('m-card', Card)

import VCard from './views/components/VCard.vue'
Vue.component('m-vcard', VCard)

import ListCard from './views/components/ListCard.vue'
Vue.component('m-list-card', ListCard)

const vm = new Vue({
	router,
	render: h => h(App)
}).$mount('#app')

console.log(vm);