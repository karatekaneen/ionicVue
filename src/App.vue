<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<v-spacer></v-spacer>

			<v-btn
				href="https://github.com/vuetifyjs/vuetify/releases/latest"
				color="secondary"
				target="_blank"
				text
			>
				<span color="accent" class="mr-2">Latest Release</span>
				<v-icon>twitter</v-icon>
			</v-btn>
		</v-app-bar>

		<v-content>
			test
			<HelloWorld />
		</v-content>
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
