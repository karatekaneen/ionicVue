<template>
	<v-card class="info-card secondary-translucent">
		<div class="progress-info">
			<v-progress-circular
				:rotate="270"
				:size="200"
				:value="progress.progressPercent"
				:width="40"
				:color="progress.shouldNotify ? 'accent' : 'primary'"
			>
				<div class="display-1 font-weight-black">{{ progress.progressPercent }}%</div>
			</v-progress-circular>
		</div>
		<div>
			<span class="primary--text title">{{ progress.distanceLeft }}km</span>
		</div>
		<div>
			<span class="primary--text title">{{ progress.timeElapsed }}</span>
		</div>
		<v-btn outlined fab x-large @click="cancelJourney" class="cancel-button">
			<v-icon>mdi-close</v-icon>
		</v-btn>
	</v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
	computed: { ...mapState(['progress']) },
	methods: {
		cancelJourney() {}
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
</style>
