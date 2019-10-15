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
			path: '/board/:ticker',
			name: 'ticker',
			component: () => import(/* webpackChunkName: "ticker" */ './views/Board.vue'),
			children: [
				{
					path: 'catalog',
					name: 'catalog',
					component: () => import(/* webpackChunkName: "catalog" */ './views/Catalog.vue')
				},
				{
					path: ':page?', // grab page identifier
					name: 'page',
					component: () => import(/* webpackChunkName: "page" */ './components/board/Pages.vue')
				},
				{
					path: 'thread/:number', // grab thread identifier
					name: 'thread',
					component: () => import(/* webpackChunkName: "thread" */ './views/Thread.vue')
				}
			]
		},
		{
			path: '/settings',
			name: 'settings',
			component: () => import (/* webpackChunkName: "help" */ './views/Settings.vue')
		},
		{
			path: '/help',
			name: 'help',
			component: () => import (/* webpackChunkName: "help" */ './views/Help.vue')
		},
		{
			path: '/account',
			name: 'account',
			component: () => import(/* webpackChunkName: "account" */ './views/User.vue')
		},
		{
			path: '/votes',
			name: 'votes',
			component: () => import(/* webpackChunkName: "votes" */ './views/Votes.vue')
		},
		{
			path: '/create',
			name: 'newBoard',
			component: () => import(/* webpackChunkName: "newBoard" */ './views/NewBoard.vue')
		},
		{
			path: '/no-bueno/:err',
			name: 'error',
			component: () => import(/* webpackChunkName: "error" */ './views/Error.vue')
		},
		{
			path: '*',
			name: 'catchErr',
			redirect: '/no-bueno/404'
		}
	],
	scrollBehavior (to, from, savedPosition) {
	if (savedPosition) {
		return savedPosition
	}
	else if (to.hash) {
		return {selector: to.hash}
	} else {
			return { x: 0, y: 0 }
		}
	}


})
