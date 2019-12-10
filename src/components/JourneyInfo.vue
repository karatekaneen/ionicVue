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

		<!-- Dialog to remove the journey -->
		<v-dialog v-model="dialog" width="300">
			<template v-slot:activator="{ on }">
				<v-btn outlined dark fab x-large v-on="on" class="cancel-button">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</template>
			<v-card>
				<v-card-title class="headline grey lighten-2" primary-title>Cancel Journey</v-card-title>
				<v-card-text>Do you want to cancel the journey?</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" rounded @click="dialog = false">No</v-btn>
					<v-btn color="error" rounded @click="cancelJourney">Yes</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
	computed: { ...mapState(['progress']) },
	data() {
		return {
			dialog: false
		}
	},
	methods: {
		/**
		 * Cancels the current journey and resets the state.
		 * Pushes the user back to the destination view.
		 * @TODO Change destination to splash-page instead
		 * @returns {void}
		 */
		async cancelJourney() {
			await this.$store.dispatch('journeyRemoval')
			this.dialog = false
			this.$router.push({ name: 'destination' })
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
</style>
