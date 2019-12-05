import Vue from 'vue'
import RepoView from '../views/RepoView.vue'
import { IonicVueRouter } from '@ionic/vue'

Vue.use(IonicVueRouter)

const routes = [
	{
		path: '/',
		name: 'repos',
		component: RepoView
	},
	{
		path: '/destination',
		name: 'destination',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/DestinationView.vue')
	},
	{
		path: '/intransit',
		name: 'inTransit',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/InTransit.vue')
	},
	{
		path: '/settings',
		name: 'settings',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/SettingsView.vue')
	}
]

const router = new IonicVueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
