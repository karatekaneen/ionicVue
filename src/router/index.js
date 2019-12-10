import Vue from 'vue'
import DestinationView from '../views/DestinationView.vue'
import InTransit from '../views/InTransit.vue'
import StartView from '../views/StartView.vue'
import SettingsView from '../views/SettingsView.vue'
import { IonicVueRouter } from '@ionic/vue'

Vue.use(IonicVueRouter)

const routes = [
	{
		path: '/',
		name: 'start',
		component: StartView
	},
	{
		path: '/destination',
		name: 'destination',
		component: DestinationView
	},
	{
		path: '/intransit',
		name: 'inTransit',
		component: InTransit
	},
	{
		path: '/settings',
		name: 'settings',
		component: SettingsView
	}
]

const router = new IonicVueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
