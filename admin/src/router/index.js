import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{ path: '/login', name: 'login', component: () => import('../views/Login.vue'), meta: { isPublic: true } },
	{
		path: '/',
		name: 'home',
		component: HomeView,
		children: [
			{ path: 'schools/create', component: () => import('../views/SchoolEdit.vue') },
			{ path: 'schools/edit/:id', component: () => import('../views/SchoolEdit.vue'), props: true },
			{ path: 'schools/list', component: () => import('../views/SchoolList.vue') },

			{ path: 'users/create', component: () => import('../views/UserEdit.vue') },
			{ path: 'users/edit/:id', component: () => import('../views/UserEdit.vue'), props: true },
			{ path: 'users/list', component: () => import('../views/UserList.vue') },

			{ path: 'categories/create', component: () => import('../views/CategoryEdit.vue') },
			{ path: 'categories/edit/:id', component: () => import('../views/CategoryEdit.vue'), props: true },
			{ path: 'categories/list', component: () => import('../views/CategoryList.vue') },

			{ path: 'articles/create', component: () => import('../views/ArticleEdit.vue') },
			{ path: 'articles/edit/:id', component: () => import('../views/ArticleEdit.vue'), props: true },
			{ path: 'articles/list', component: () => import('../views/ArticleList.vue') },

			{ path: 'ads/create', component: () => import('../views/AdEdit.vue') },
			{ path: 'ads/edit/:id', component: () => import('../views/AdEdit.vue'), props: true },
			{ path: 'ads/list', component: () => import('../views/AdList.vue') }
		]
	},
]

const router = new VueRouter({
	routes
})

export default router
