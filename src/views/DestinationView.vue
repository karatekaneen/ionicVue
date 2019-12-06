<template>
	<div class="d-flex view" style="padding: 10px;">
		<v-card class="info-card map-container secondary-opaque">
			<!-- map-type-id="terrain" -->
			<GmapMap
				:center="center"
				:zoom="7"
				:options="{
					zoomControl: true,
					mapTypeControl: false,
					scaleControl: false,
					streetViewControl: false,
					rotateControl: false,
					fullscreenControl: false,
					disableDefaultUi: false,
					styles
				}"
				class="map"
				ref="mapRef"
				@center_changed="moveMarker"
			>
				<GmapMarker :key="index" v-for="(m, index) in markers" :position="m.position" />
			</GmapMap>

			<div class="d-flex" style="justify-content: center;">
				<v-select disabled :items="favoritePlaces" class="favorite-selector" label="Favorites"></v-select>
			</div>

			<v-card-actions>
				<v-btn fab outlined>
					<v-icon>close</v-icon>
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn fab outlined @click="createTargetCoordinates">
					<v-icon>keyboard_arrow_right</v-icon>
				</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
import Coordinate from '../models/Coordinate'
export default {
	data() {
		return {
			styles: [
				{
					featureType: 'water',
					stylers: [{ color: '#2b424e' }]
				},
				{
					featureType: 'road.arterial',
					elementType: 'geometry',
					stylers: [{ color: '#DD9F36' }]
				},
				{
					featureType: 'road.local',
					elementType: 'geometry',
					stylers: [{ color: '#99a3a2' }]
				},
				{
					featureType: 'road.highway',
					elementType: 'geometry',
					stylers: [{ color: '#A85845' }]
				},
				{
					featureType: 'landscape',
					elementType: 'geometry',
					stylers: [{ color: '#F7F8F7' }]
				}
			],
			markers: [{ position: { lat: 58, lng: 12 } }],
			favoritePlaces: ['göteborg', 'stockholm'],
			center: { lat: 58, lng: 12 }
		}
	},
	methods: {
		/**
		 * Method to move the marker on the map and update the local variable.
		 *
		 * This version currently only supports one marker but in following
		 * versions favorites and current positions will be shown on the map as well.
		 *
		 * @todo add support for more markers
		 * @param {Object} MapCenter The object of the center of the map
		 * @param {Function} MapCenter.lat Returns the latitude of the map center
		 * @param {Function} MapCenter.lng Returns the longitude of the map center
		 * @returns {void}
		 */
		moveMarker({ lat, lng }) {
			this.markers[0].position = { lat: lat(), lng: lng() }
		},

		/**
		 * Creates a `Coordinate` instance from the marker and saves it as the
		 * destination (targetLocation) to the store.
		 *
		 * @todo remove hardcoded values
		 * @returns {Coordinate} The Coordinate instance
		 */
		createTargetCoordinates() {
			const coordinate = new Coordinate({
				coords: {
					latitude: this.markers[0].position.lat,
					longitude: this.markers[0].position.lng
				},
				timestamp: Date.now()
			})

			this.$store.commit('setTargetLocation', coordinate)
			return coordinate
		},

		/**
		 * This method is used to load the initial marker on the map.
		 * If we open the component fresh the current position is used as
		 * the first marker but if we come back and already have a targetLocation
		 * set that will be used.
		 * @returns {void}
		 */
		loadCurrentTarget() {
			const targetLocation = this.$store.state.targetLocation
			const currentLocation = this.$store.state.currentLocation
			if (targetLocation) {
				this.markers = [targetLocation.toMarker()]
				this.center = this.markers[0].position
			} else if (currentLocation) {
				this.markers = [currentLocation.toMarker()]
				this.center = this.markers[0].position
			}
		}
	},
	mounted() {
		this.loadCurrentTarget()
	}
}
</script>

<style scoped>
.favorite-selector {
	margin: 10px;
	padding: 5px;
	max-width: 300px;
	display: flex;
	align-self: center;
}

.map {
	width: 100%;
	height: 50vh;
}
</style>
