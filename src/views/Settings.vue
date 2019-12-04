<template>
	<div class="d-flex view">
		<v-card class="info-card secondary-opaque settings-container">
			<v-card-title>Settings</v-card-title>
			<v-card-text>
				{{threshold}}
				Här ska det var inställningar
				<!-- using :value & @input because v-model isn't implemented fully yet. -->
				<v-slider
					:value="threshold"
					@input="threshold = $event"
					thumb-label
					:max="max"
					:min="min"
					hide-details
					class="align-center"
				></v-slider>
			</v-card-text>
			<div>
				<v-btn fab outlined>abort</v-btn>
				<v-btn fab outlined>Start</v-btn>
			</div>
		</v-card>
	</div>
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
.settings-container {
	height: 70%;
}
</style>
