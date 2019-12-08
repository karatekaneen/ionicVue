export default ({ Vue, Vuex, Coordinate, Journey, Geolocation }) => {
	Vue.use(Vuex)

	return new Vuex.Store({
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
			setTargetLocation: (state, coordinate) => (state.targetLocation = coordinate),
			setCurrentJourney: (state, journey) => (state.currentJourney = journey),
			setFavoriteLocations: (state, favorites) => (state.favoriteLocations = favorites),
			setWatcherId: (state, id) => (state.watcherId = id),
			setProgress: (state, progress) => (state.progress = progress)
		},
		actions: {
			/**
			 * Saves the target location to the store and if there is a
			 * journey active it will be updated as well.
			 *
			 * @param {Object} context
			 * @param {Coordinate} coordinate The target location
			 */
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
			 * Creates instance of `Journey` and saves it to the store if there
			 * is no active journey. If there is a `currentJourney` assigned it is updated.
			 * The `threshold` variable is converted back to meters and subtracted
			 * from the `max` value to get the distance to notify at.
			 * @param {Object} context The store
			 * @param {Object} journey The Journey settings deconstructed
			 * @param {Coordinate} journey.currentLocation
			 * @param {Coordinate} journey.targetLocation
			 * @param {number} journey.threshold
			 * @param {number} journey.max
			 * @returns {Journey} the Journey instance.
			 */
			createJourney(
				{ commit, dispatch, state },
				{ currentLocation, targetLocation, threshold, max }
			) {
				if (!state.currentJourney) {
					const journey = new Journey({
						startLocation: currentLocation,
						targetLocation: targetLocation,
						threshold: (max - threshold) * 1000 // Distance left converted to meters
					})

					console.info('Journey created', journey)

					commit('setCurrentJourney', journey)
					dispatch('createLocationListener')
					return journey
				} else {
					const journey = state.currentJourney

					journey
						.setCurrentLocation(currentLocation)
						.setThreshold((max - threshold) * 1000)
						.setTargetLocation(targetLocation)

					console.info('Journey updated', journey)
					return journey
				}
			},

			/**
			 * Creates a location listener that checks the position every ~5 seconds.
			 *
			 * It then updates the state props `currentLocation`, `currentJourney` and `progress`
			 *
			 * @param {Object} context
			 * @returns {void}
			 */
			createLocationListener({ commit, state, dispatch }) {
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
					const progress = journey.getProgress()
					commit('setProgress', progress)

					if (progress.shouldNotify) {
						console.info('Dispatching notification')
						dispatch('sendNotification')
					}
				})

				console.info(`Watcher ID:`, wait)
				commit('setWatcherId', wait)
			},

			sendNotification({ state }) {}
		}
	})
}
