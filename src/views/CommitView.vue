<template>
	<ion-content>
		<v-container>
			<div>{{ keys }}</div>
			<div>{{ loc }}</div>

			<v-btn @click="getCurrentPosition">test</v-btn>
		</v-container>
	</ion-content>
</template>

<script>
import { Plugins } from '@capacitor/core'
import Coordinate from '../models/Coordinate'
const { Geolocation, LocalNotifications } = Plugins
export default {
	name: 'home',
	computed: {},
	data() {
		return {
			keys: null,
			geo: null,
			loc: 'init',
			wait: null
		}
	},
	methods: {
		async getCurrentPosition() {
			LocalNotifications.addListener('localNotificationReceived', notification => {
				console.log('Notification: ', notification)
			})

			LocalNotifications.addListener('localNotificationActionPerformed', notification => {
				console.log('Notification action performed', notification)
			})

			// const c = new Coordinate()

			// this.wait = Geolocation.watchPosition({}, (position, err) => {
			// 	console.log(position)
			// 	c.setCoordinates(position)
			// 	const d = c.calculateDistance({ latitude: 58.28261, longitude: 12.293189 })
			// 	this.loc = { c, d }
			// })
		}
	},
	mounted() {}
}
</script>
