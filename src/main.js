import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import { defineCustomElements as ionic } from '@ionic/core/loader' // added line
// import { defineCustomElements as svgmorphing } from 'stencil-svgpaths-morphing'

import Ionic from '@ionic/vue'
// import { addIcons } from 'ionicons' // added line
// import { ICON_PATHS } from 'ionicons/icons' // added line
import '@ionic/core/css/ionic.bundle.css'
import vuetify from './plugins/vuetify'

Vue.config.ignoredElements = [/^ion-/, /^jeep-/] // added line

Vue.use(Ionic)
// ionic(window) // added line
// svgmorphing(window)
// addIcons(ICON_PATHS) // added line
Vue.config.productionTip = false

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
