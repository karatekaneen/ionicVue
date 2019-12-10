<template>
	<v-bottom-navigation class="bottom-nav" dark shift grow color="primary" v-model="bottomNav">
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
</template>

<script>
export default {
	data() {
		return {
			bottomNav: 'repos'
		}
	}
}
</script>

<style  scoped>
.bottom-nav {
	background-color: #202020 !important;
}

.bottom-nav-button {
	height: 100% !important;
}
</style>
