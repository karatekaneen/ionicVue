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

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
