<template>
	<v-card class="info-card secondary-translucent">
		<div class="progress-info">
			<v-progress-circular
				:rotate="270"
				:size="200"
				:value="progressPercent"
				:width="40"
				color="primary"
			>
				<div class="display-1 font-weight-black">{{ progressPercent }}%</div>
			</v-progress-circular>
		</div>
		<div>
			<span class="primary--text title">{{ distanceLeft }}km</span>
		</div>
		<div>
			<span class="primary--text title">{{ timeElapsed }}</span>
		</div>
		<v-btn outlined fab x-large @click="cancelJourney" class="cancel-button">
			<v-icon>mdi-close</v-icon>
		</v-btn>
	</v-card>
</template>

<script>
export default {
	data() {
		return {
			progressPercent: 27,
			distanceLeft: 302,
			timeElapsed: '01:23'
		}
	},
	methods: {
		cancelJourney() {
			this.progressPercent++
			this.distanceLeft--
		}
	}
}
</script>

<style scoped>
.progress-info {
	padding-top: 1em;
	padding-bottom: 1em;
}
.cancel-button {
	margin-top: 3em;
	margin-bottom: 2em;
}

.info-card-content {
	/* color: rgba(0, 0, 0, 1); */
	/* opacity: 1; */
}
</style>
