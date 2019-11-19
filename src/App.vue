<template>
	<v-app>
		<v-content>
			<HelloWorld />
		</v-content>
		<v-bottom-navigation v-model="bottomNav">
			<v-btn value="recent">
				<span>Recent</span>
				<v-icon>mdi-history</v-icon>
			</v-btn>

			<v-btn value="favorites">
				<span>Favorites</span>
				<v-icon>mdi-heart</v-icon>
			</v-btn>
		</v-bottom-navigation>
	</v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
	name: 'App',

	components: {
		HelloWorld
	},

	data: () => ({
		//
	})
}
</script>
