<template>
	<div class="d-flex view">
		<JourneyInfo />
		<particles-bg type="custom" :config="config" :bg="true" />
	</div>
</template>

<script>
import icon from '../assets/snowflake'
import { ParticlesBg } from 'particles-bg-vue'
import JourneyInfo from '../components/JourneyInfo'

export default {
	components: {
		ParticlesBg,
		JourneyInfo
	},

	data() {
		return {
			config: {
				// TODO Gör om till vita snöflingor
				num: [2, 5],
				rps: 0.99,
				radius: [5, 40],
				life: [1.5, 4],
				v: [0.5, 1.5],
				tha: [180, 180],
				body: icon,
				alpha: [0.5, 0],
				scale: [0.02, 0.04],
				position: 'all',
				cross: 'dead',
				random: 10
			}
		}
	}
}
</script>

<style scoped></style>
