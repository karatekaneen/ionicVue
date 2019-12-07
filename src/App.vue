<template>
	<v-app>
		<v-content class="app">
			<ion-vue-router />
		</v-content>
		<v-bottom-navigation class="bottom-nav" dark grow color="primary" v-model="bottomNav">
			<v-btn
				:retain-focus-on-click="true"
				icon
				class="bottom-nav-button"
				to="/destination"
				value="destination"
			>
				<span>Destination</span>
				<v-icon>map</v-icon>
			</v-btn>

			<v-btn
				:retain-focus-on-click="true"
				icon
				class="bottom-nav-button"
				to="/settings"
				value="settings"
				:disabled="!$store.state.targetLocation"
			>
				<span>Settings</span>
				<v-icon>settings</v-icon>
			</v-btn>

			<v-btn
				:retain-focus-on-click="true"
				icon
				class="bottom-nav-button"
				to="/intransit"
				value="inTransit"
				:disabled="!$store.state.currentJourney"
			>
				<span>Journey</span>
				<v-icon>commute</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</v-app>
</template>

<script>
export default {
	name: 'App',

	data: () => ({
		bottomNav: 'repos'
	}),
	mounted() {
		this.$store.dispatch('retrieveCurrentLocation')
		// LocalNotifications.registerActionTypes({
		// 	types: [
		// 		{
		// 			id: 'OPEN_PRODUCT',
		// 			actions: [
		// 				{
		// 					id: 'view',
		// 					title: 'Product'
		// 				},
		// 				{
		// 					id: 'remove',
		// 					title: 'Remove',
		// 					destructive: true
		// 				},
		// 				{
		// 					id: 'response',
		// 					title: 'Response',
		// 					input: true
		// 				}
		// 			]
		// 		}
		// 	]
		// })
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

.bottom-nav {
	background-color: #202020 !important;
}

.bottom-nav-button {
	height: 100% !important;
}
</style>
