import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import createStore from './store'
import actions from './store/actions'
import state from './store/state'
import mutations from './store/mutations'
import * as VueGoogleMaps from 'vue2-google-maps'

import Ionic from '@ionic/vue'
import '@ionic/core/css/ionic.bundle.css'
import vuetify from './plugins/vuetify'

import Coordinate from './models/Coordinate'
import Journey from './models/Journey'
import Notification from './models/Notification'
import { Plugins } from '@capacitor/core'
const { Geolocation, LocalNotifications, Storage } = Plugins

Vue.config.ignoredElements = [/^ion-/, /^jeep-/] // added line

Vue.use(Ionic)
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
	load: {
		key: process.env.VUE_APP_GOOGLE_API_KEY,
		libraries: 'places'
	}
})

// Register notification types:
try {
	LocalNotifications.registerActionTypes({
		types: Notification.getNotificationTypes()
	})
	console.info('Notification types registered')
} catch (err) {
	console.info('Notifications is not supported on web', err)
}

// Inject dependencies into the store.
const store = createStore({
	state: state(),
	mutations: mutations(),
	actions: actions({
		Coordinate,
		Journey,
		Geolocation,
		Notification,
		LocalNotifications,
		Storage
	}),
	Vue,
	Vuex
})

/**
 * # Introduction
 *
 * This is my cool introduction
 *
 * ## User stories
 *
 * It wakes people up so they don't wake up in Flen.
 *
 * ## Design
 *
 * Material design via vuetify
 *
 * ### Wireframe of views:
 *
 * ![wireframe](https://github.com/karatekaneen/ionicVue/blob/master/docs/AwakerViews.jpg "Wireframe views")
 *
 * ### Color schema
 *
 * #### Primary
 * ![primary](https://github.com/karatekaneen/ionicVue/blob/master/docs/primary.png "primary color")
 *
 * #### Secondary
 * ![secondary](https://github.com/karatekaneen/ionicVue/blob/master/docs/secondary.png "secondary color")
 *
 * #### Background
 * ![Background](https://github.com/karatekaneen/ionicVue/blob/master/docs/background.png "Background color")
 *
 * #### Accent
 * ![Accent](https://github.com/karatekaneen/ionicVue/blob/master/docs/accent.png "Accent color")
 *
 * #### Info
 * ![info](https://github.com/karatekaneen/ionicVue/blob/master/docs/info.png "info color")
 *
 * #### Warning
 * ![Warning](https://github.com/karatekaneen/ionicVue/blob/master/docs/warning.png "Warning color")
 *
 * #### Success
 * ![Success](https://github.com/karatekaneen/ionicVue/blob/master/docs/success.png "Success color")
 *
 * #### Error
 * ![Error](https://github.com/karatekaneen/ionicVue/blob/master/docs/error.png "Error color")
 *
 *
 * # Usage
 * ## Installation for android
 *
 * ```bash
 * npm install # Install dependencies
 * npm run and # Run vue build and copy it to capacitor
 * npm run capacitor-open # Open the capacitor project in Android studio
 * ```
 *
 * ## Installation for web
 * ```bash
 * npm install # Install dependencies
 * npm run serve # Run development server
 * ```
 *
 * ## Tests
 *
 * Only have unit tests in this project because the native modules was pretty much impossible to do integration testing on.
 *
 * ```bash
 * npm run test:unit
 * ```
 *
 * ## Generate documentation:
 * ```bash
 * npm run docs:md # for Readme.md
 * npm run docs:html # for docs/index.html
 * npm run docs:full # for both of the above.
 * ```
 *
 *
 */
const Awake = new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
