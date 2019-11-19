<template>
	<v-app>
		<v-content>
			<ion-vue-router />
		</v-content>
		<v-bottom-navigation v-model="bottomNav" color="primary">
			<v-btn to="/" value="repos">
				<span>Recent</span>
				<v-icon>mdi-history</v-icon>
			</v-btn>

			<v-btn to="/commits" value="commits">
				<span>Favorites</span>
				<v-icon>mdi-heart</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</v-app>
</template>

<script>
export default {
	name: 'App',

	data: () => ({
		bottomNav: 'repos'
	})
}
</script>
