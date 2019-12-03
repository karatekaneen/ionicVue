<template>
	<ion-content>
		<v-container>
			<div>{{ keys }}</div>
			<div>
				{{ loc }}
			</div>

			<v-btn @click="getCurrentPosition">test</v-btn>
		</v-container>
	</ion-content>
</template>

<script>
import { Plugins } from '@capacitor/core'
import Coordinate from '../models/Coordinate'
const { Geolocation } = Plugins
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
			console.log(Geolocation)
			const result = await Geolocation.getCurrentPosition()
			this.keys = Object.keys(result)
			const c = new Coordinate(result)
			const d = c.calculateDistance({ latitude: 58.28261, longitude: 12.293189 })

			this.loc = { c, d }
		}
	},
	mounted() {}
}
</script>
