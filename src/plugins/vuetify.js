import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
	icons: {
		iconfont: 'md'
	},
	theme: {
		themes: {
			light: {
				primary: '#DD9F36',
				secondary: '#F7F8F7',
				accent: '#A85845',
				error: '#f44336',
				info: '#2b424e',
				success: '#78aa48',
				warning: '#FFC107'
			},
			dark: {
				primary: '#DD9F36',
				secondary: '#F7F8F7',
				accent: '#A85845',
				error: '#f44336',
				info: '#2b424e',
				success: '#78aa48',
				warning: '#FFC107'
			}
		}
	}
})
