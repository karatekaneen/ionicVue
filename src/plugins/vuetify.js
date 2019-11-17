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
				primary: '#9b1d20',
				secondary: '#3d2b3d',
				accent: '#d0ffce',
				error: '#cfd2b2',
				info: '#635d5c',
				success: '#cbefb6',
				warning: '#e0a458'
			},
			dark: {
				primary: '#9b1d20',
				secondary: '#3d2b3d',
				accent: '#d0ffce',
				error: '#cfd2b2',
				info: '#635d5c',
				success: '#cbefb6',
				warning: '#e0a458'
			}
		}
	}
})
