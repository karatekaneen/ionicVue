<template>
	<v-app>
		<v-content class="app">
			<ion-vue-router />
		</v-content>
		<BottomNavBar />
	</v-app>
</template>

<script>
import { Plugins } from '@capacitor/core'
import BottomNavBar from './components/BottomNavBar'

export default {
	name: 'App',
	components: {
		BottomNavBar
	},
	mounted() {
		this.$store.dispatch('retrieveCurrentLocation')

		// Register listener for notification actions
		Plugins.LocalNotifications.addListener('localNotificationActionPerformed', ({ actionId }) => {
			if (actionId === 'view') {
				this.$router.push({ name: 'inTransit' })
			} else if (actionId === 'remove') {
				this.$store.dispatch('journeyRemoval')
				this.$router.push({ name: 'destination' })
			}
			console.log('Notification action performed', notification)
		})
	},
	created() {
		this.$store.dispatch('getFavorites')
	}
}
</script>

<style>
/* Basic card to be used in the whole application, put it in the root to enable cascading */
.info-card {
	margin: auto;

	padding: 25px 25px;
	border-radius: 30px !important; /* Must use important to override vuetify's settings */
	width: 70%;
	text-align: center;
}

.info-card-header {
	text-align: center;
}

.secondary-opaque {
	background-color: rgba(247, 248, 247, 1) !important;
}

.secondary-translucent {
	background-color: rgba(247, 248, 247, 0.3) !important;
}

.app {
	background: rgb(43, 66, 78);
	background: linear-gradient(180deg, rgba(43, 66, 78, 1) 45%, rgba(28, 42, 50, 1) 100%);
}

.view {
	height: 92vh;
	justify-items: center;
	align-items: center;
}
</style>
