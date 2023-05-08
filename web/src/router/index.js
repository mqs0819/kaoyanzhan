import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { Toast } from 'vant'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/community',
		name: 'community',
		component: () => import('../views/Community.vue')
	},
	{
		path: '/news/:id',
		component: () => import('../views/New.vue')
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/Login.vue'),
	},
	{
		path: '/school',
		name: 'school',
		component: () => import('../views/School.vue'),
	},
	{
		path: '/school-list',
		name: 'school-list',
		meta: { isAuth: true },
		component: () => import(/* webpackChunkName: "product-list" */ '../views/SchoolList.vue'),
	},
	{
		path: '/school-details',
		name: 'school-details',
		component: () => import('../views/SchoolDetails.vue'),
	},
	{
		path: '/mine',
		component: () => import('../views/Mine.vue'),
		meta: { isPublic: true },
		children: [
			{
				path: 'person',
				component: () => import('../views/PersonInfo.vue')
			}
		]
	},
	{
		path: '/setting',
		component: () => import('../views/Setting.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	if (to.meta.isAuth && !localStorage.token) {
		Toast.fail('无权限，请先登录')
		return next('/school-list')
	}
	if (to.meta.isPublic && !localStorage.token) {
		return next('/login')
	}
	next()
})

export default router
