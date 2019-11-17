import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Ionic from '@ionic/vue'
import '@ionic/core/css/ionic.bundle.css'
import vuetify from './plugins/vuetify'

Vue.config.ignoredElements = [/^ion-/, /^jeep-/] // added line

Vue.use(Ionic)
Vue.config.productionTip = false

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
