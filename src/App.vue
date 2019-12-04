<template>
	<v-app>
		<v-content class="app">
			<ion-vue-router />
		</v-content>
		<v-bottom-navigation
			class="bottom-nav"
			dark
			color="primary"
			style="padding-top: 10px;"
			v-model="bottomNav"
		>
			<v-btn to="/" value="repos">
				<span>Repos</span>
				<v-icon>mdi-heart</v-icon>
			</v-btn>

			<v-btn to="/commits" value="commits">
				<span>Commits</span>
				<v-icon>mdi-history</v-icon>
			</v-btn>

			<v-btn to="/intransit" value="inTransit">
				<span>Commits</span>
				<v-icon>mdi-commute</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</v-app>
</template>

<script>
import { Plugins } from '@capacitor/core'
const { SplashScreen, LocalNotifications } = Plugins
export default {
	name: 'App',

	data: () => ({
		bottomNav: 'repos'
	}),
	mounted() {
		SplashScreen.hide() // Hide the splashscreen as soon as component is mounted
		LocalNotifications.registerActionTypes({
			types: [
				{
					id: 'OPEN_PRODUCT',
					actions: [
						{
							id: 'view',
							title: 'Product'
						},
						{
							id: 'remove',
							title: 'Remove',
							destructive: true
						},
						{
							id: 'response',
							title: 'Response',
							input: true
						}
					]
				}
			]
		})
	}
}
</script>

<style>
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
</style>
