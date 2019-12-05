<template>
	<v-card class="info-card secondary-opaque settings-container">
		<v-card-title class="info-card-header font-weight-thin">Settings</v-card-title>
		<v-card-text>
			<!-- using :value & @input because v-model isn't implemented fully yet. -->
			<div class="settings-item-container">
				<span class="overline">Notification distance</span>
				<!-- :value="threshold"
					@input="threshold = $event" -->
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
		</v-card-text>
		<div class="button-container">
			<v-btn fab outlined>
				<v-icon>keyboard_arrow_left</v-icon>
			</v-btn>
			<v-btn fab outlined>
				<v-icon>keyboard_arrow_right</v-icon>
			</v-btn>
		</div>
	</v-card>
</template>

<script>
export default {
	data() {
		return {
			min: -100,
			max: 250,
			threshold: 100
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
