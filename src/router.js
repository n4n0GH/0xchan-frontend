import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'index',
			component: Index
		},
		{
			path: '/board/:ticker', // grab board identifier
			name: 'board',
			component: () => import(/* webpackChunkName: "board" */ './views/Board.vue'),
			children: [
				{
					path: 'thread/:number', // grab thread identifier
					component: () => import(/* webpackChunkName: "thread" */ './views/Thread.vue')
				}
			]
		}
	],
	scrollBehavior (to, from, savedPosition) {
	if (savedPosition) {
			return savedPosition
		} else {
			return { x: 0, y: 0 }
		}
	}


})
