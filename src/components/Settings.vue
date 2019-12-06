<template>
	<v-card class="info-card secondary-opaque settings-container">
		<v-card-title class="info-card-header font-weight-thin">Settings</v-card-title>
		<v-card-text>
			<!-- using :value & @input because v-model isn't implemented fully yet. -->
			<div class="settings-item-container">
				<span class="overline">Notification distance</span>
				<!-- :value="threshold"
				@input="threshold = $event"-->
				<v-slider
					v-model="threshold"
					thumb-label
					:max="max"
					:min="min"
					hide-details
					class="align-center slider"
				>
					<template v-slot:append>
						<span class="overline">{{ threshold }}km</span>
					</template>
				</v-slider>
			</div>
			<div class="settings-item-container">
				<v-checkbox v-model="saveLocation" label="Save location"></v-checkbox>
			</div>
			<div class="settings-item-container">
				<v-text-field
					label="Location name"
					:disabled="!saveLocation"
					v-model="locationName"
					style="width: 60%;"
					outlined
				></v-text-field>
			</div>
		</v-card-text>
		<div class="button-container">
			<v-btn fab outlined>
				<v-icon>keyboard_arrow_left</v-icon>
			</v-btn>
			<v-btn fab outlined @click="createJourney">
				<v-icon>keyboard_arrow_right</v-icon>
			</v-btn>
		</div>
	</v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
	computed: {
		max() {
			if (this.currentLocation && this.targetLocation) {
				return Math.round(this.currentLocation.calculateDistance(this.targetLocation) / 1000)
			} else return 0
		},
		...mapState(['currentLocation', 'targetLocation'])
	},
	data() {
		return {
			saveLocation: false,
			locationName: '',
			min: 0,
			threshold: 100
		}
	},
	methods: {
		createJourney() {
			this.$store.dispatch('createJourney', {
				currentLocation: this.currentLocation,
				targetLocation: this.targetLocation,
				threshold: this.threshold,
				max: this.max
			})
		}
	}
}
</script>

<style scoped>
.button-container {
	align-items: flex-end;
	justify-content: space-evenly;
	display: flex;
}

.settings-item-container {
	letter-spacing: 0;
	text-align: start;
}

.settings-container {
	height: 70%;
	display: grid;
}
</style>
