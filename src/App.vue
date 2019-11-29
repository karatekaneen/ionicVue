<template>
	<v-app>
		<v-content>
			<ion-vue-router />
		</v-content>
		<v-bottom-navigation dark color="primary" style="padding-top: 10px;" v-model="bottomNav">
			<v-btn to="/" value="repos">
				<span>Repos</span>
				<v-icon>mdi-heart</v-icon>
			</v-btn>

			<v-btn to="/commits" value="commits">
				<span>Commits</span>
				<v-icon>mdi-history</v-icon>
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
