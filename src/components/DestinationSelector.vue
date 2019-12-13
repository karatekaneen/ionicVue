<template>
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
			<v-menu offset-y :close-on-content-click="false">
				<template v-slot:activator="{ on }">
					<v-btn color="primary" dark v-on="on">Favorites</v-btn>
				</template>
				<v-list>
					<v-list-item
						@click="selectedFavorite = favorite.name; setMarkerToFavorite()"
						v-for="(favorite) in favoriteLocations"
						:key="favorite.name"
					>
						<v-list-item-title>{{favorite.name}}</v-list-item-title>
					</v-list-item>
					<v-list-group>
						<template v-slot:activator>
							<v-list-item-icon>
								<v-icon>delete</v-icon>
							</v-list-item-icon>
							<v-list-item-title>Remove</v-list-item-title>
						</template>

						<v-list-item
							@click="testMetod('delete')"
							v-for="(favorite) in favoriteLocations"
							:key="favorite.name"
						>
							<v-list-item-icon>
								<v-icon>close</v-icon>
							</v-list-item-icon>
							<v-list-item-title>{{favorite.name}}</v-list-item-title>
						</v-list-item>
					</v-list-group>
				</v-list>
			</v-menu>
		</div>

		<div class="d-flex">
			<v-btn to="/" fab outlined>
				<v-icon>close</v-icon>
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn fab outlined @click="nextStep">
				<v-icon>keyboard_arrow_right</v-icon>
			</v-btn>
		</div>
	</v-card>
</template>

<script>
import Coordinate from '../models/Coordinate'
import { mapState } from 'vuex'
export default {
	computed: mapState(['favoriteLocations']),
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

			selectedFavorite: null,
			markers: [{ position: { lat: 58, lng: 12 } }],
			center: { lat: 58, lng: 12 }
		}
	},
	methods: {
		/**
		 * Method to perform the actions needed to proceed to the next step.
		 */
		nextStep() {
			this.createTargetCoordinates()

			if (this.$store.state.currentJourney) {
				/*
				if there's a journey in store we can assume that the destination has been changed
				and therefore probably won't need to go to the settings view again.
				*/
				this.$router.push({ name: 'inTransit' })
			} else {
				this.$router.push({ name: 'settings' })
			}
		},

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
		 * Moves the map marker to the favorite selected.
		 * @returns {void}
		 */
		setMarkerToFavorite() {
			const { location } = this.favoriteLocations.find(f => f.name === this.selectedFavorite)
			const markerObj = { lat: () => location.latitude, lng: () => location.longitude }

			this.moveMarker(markerObj)
		},

		removeFavorite() {
			const favoriteToRemove = this.favoriteLocations.find(f => f.name === this.selectedFavorite)

			if (favoriteToRemove) {
				this.$store.dispatch('removeFavorite', favoriteToRemove)
			}
		},

		/**
		 * Creates a `Coordinate` instance from the marker and saves it as the
		 * destination (targetLocation) to the store.
		 *
		 * @todo remove hardcoded values
		 * @returns {Coordinate} The Coordinate instance
		 */
		createTargetCoordinates() {
			// TODO Check if there is a journey and update the destination in that as well.
			const coordinate = new Coordinate({
				coords: {
					latitude: this.markers[0].position.lat,
					longitude: this.markers[0].position.lng
				},
				timestamp: Date.now()
			})

			this.$store.dispatch('assignTargetLocation', coordinate)
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
