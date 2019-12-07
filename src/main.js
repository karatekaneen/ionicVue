import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'

import Ionic from '@ionic/vue'
import '@ionic/core/css/ionic.bundle.css'
import vuetify from './plugins/vuetify'

Vue.config.ignoredElements = [/^ion-/, /^jeep-/] // added line

Vue.use(Ionic)
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
	load: {
		key: process.env.VUE_APP_GOOGLE_API_KEY,
		libraries: 'places'
	}
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
