import Vue from 'vue'
import Vuex from 'vuex'
import Coordinate from '../models/Coordinate'
import Journey from '../models/Journey'
import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentLocation: null,
		targetLocation: null,
		currentJourney: null,
		favoriteLocations: [], // TODO Implement fully
		watcherId: null,
		progress: {
			progressPercent: null,
			distanceLeft: null,
			timeElapsed: null,
			threshold: null,
			current: null,
			shouldNotify: null,
			startedAt: null,
			currentDistance: null
		}
	},

	mutations: {
		setCurrentLocation: (state, coordinate) => (state.currentLocation = coordinate),
		// TODO Check if there is a journey and update the destination in that as well.
		// TODO Move to action as well
		setTargetLocation: (state, coordinate) => (state.targetLocation = coordinate),
		setCurrentJourney: (state, journey) => (state.currentJourney = journey),
		setFavoriteLocations: (state, favorites) => (state.favoriteLocations = favorites),
		setWatcherId: (state, id) => (state.watcherId = id),
		setProgress: (state, progress) => (state.progress = progress)
	},
	actions: {
		assignTargetLocation({ commit, state }, coordinate) {
			commit('setTargetLocation', coordinate)

			if (state.currentJourney) {
				const journey = state.currentJourney

				// Change destination and update state
				journey.setTargetLocation(coordinate)
				commit('setCurrentJourney', journey)

				// Set the new progress
				commit('setProgress', journey.getProgress())
			}
		},

		/**
		 * Retrieves the initial position when the application is started
		 * and assigns the `currentLocation` prop.
		 * @param {Object} context
		 */
		async retrieveCurrentLocation({ commit }) {
			const coordinates = await Geolocation.getCurrentPosition()
			console.info(`Set current position`, coordinates)
			commit('setCurrentLocation', new Coordinate(coordinates))
		},

		/**
		 * Creates instance of `Journey` and saves it to the store.
		 * The `threshold` variable is converted back to meters and subtracted
		 * from the `max` value to get the distance to notify at.
		 * @returns {Journey} the Journey instance.
		 */
		createJourney({ commit, dispatch }, { currentLocation, targetLocation, threshold, max }) {
			const journey = new Journey({
				startLocation: currentLocation,
				targetLocation: targetLocation,
				threshold: (max - threshold) * 1000 // Distance left converted to meters
			})

			console.info('Journey created', journey)

			commit('setCurrentJourney', journey)
			dispatch('createLocationListener')
			return journey
		},

		/**
		 * Creates a location listener that checks the position every ~5 seconds.
		 *
		 * It then updates the state props `currentLocation`, `currentJourney` and `progress`
		 *
		 * @param {Object} context
		 * @returns {void}
		 */
		createLocationListener({ commit, state }) {
			const wait = Geolocation.watchPosition({}, (position, err) => {
				if (err) {
					console.error(err)
					throw err
				}
				console.info('Current position', position)

				// Update current location in state
				const newCurrentLocation = state.currentLocation.setCoordinates(position)
				commit('setCurrentLocation', newCurrentLocation)

				// Update the journeys current location
				const journey = state.currentJourney
				journey.setCurrentLocation(newCurrentLocation)
				commit('setCurrentJourney', journey)

				// Update the progress state
				commit('setProgress', journey.getProgress())
			})

			console.info(`Watcher ID:`, wait)
			commit('setWatcherId', wait)
		}
	},
	modules: {}
})
