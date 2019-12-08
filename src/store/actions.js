export default ({
	Coordinate,
	Journey,
	Geolocation,
	LocalNotifications,
	Notification,
	Storage
}) => ({
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
	createJourney({ commit, dispatch, state }, { currentLocation, targetLocation, threshold, max }) {
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

			if (progress.shouldNotify && !state.notificationSent) {
				console.info('Dispatching notification')
				dispatch('sendNotification')
			}
		})

		console.info(`Watcher ID:`, wait)
		commit('setWatcherId', wait)
	},

	/**
	 * Creates and schedules a notification
	 * @param {Object} context
	 * @returns {void}
	 */
	sendNotification({ state, commit }) {
		if (!state.notificationSent) {
			const notification = new Notification({ journey: state.journey, schedule: 10 })

			LocalNotifications.schedule({
				notifications: [notification]
			})

			commit('setNotificationSent', true)
		}
	},

	/**
	 * Resets the state when the journey is complete or cancelled.
	 * @param {Object} context
	 * @returns {void}
	 */
	async journeyRemoval({ state, commit }) {
		// Stop listening for locations
		await Geolocation.clearWatch(state.watcherId)

		// Reset the watcher id
		commit('setWatcherId', null)

		// Reset the notification flag
		commit('setNotificationSent', false)

		// Reset the target and the current journey
		commit('setTargetLocation', null)
		commit('setCurrentJourney', null)

		// Reset the progress
		commit('setProgress', {
			progressPercent: null,
			distanceLeft: null,
			timeElapsed: null,
			threshold: null,
			current: null,
			shouldNotify: null,
			startedAt: null,
			currentDistance: null
		})
	},

	/**
	 * Fetches the favorites from the native storage and saves them to state.
	 * @param {Object} context
	 * @returns {void}
	 */
	async getFavorites({ commit }) {
		const { value } = await Storage.get({ key: 'awake-favorites' })
		if (value) {
			commit('setFavoriteLocations', JSON.parse(value))
		}
	},

	/**
	 * Saves the favorites to native storage and to state.
	 * @param {Object} context
	 * @param {Array<Object>} favorites The favorites to save to Storage.
	 * @returns {void}
	 */
	async setFavorites({ commit }, favorites) {
		await Storage.set({ key: 'awake-favorites', value: JSON.stringify(favorites) })
		commit('setFavoriteLocations', favorites)
	},

	/**
	 * Adds a new favorite to the list and dispatches a `setFavorites` action.
	 * @param {Object} context
	 * @param {Object} newFavorite Favorite to add.
	 * @returns {void}
	 */
	async addToFavorites({ dispatch, state }, newFavorite) {
		const favorites = state.favoriteLocations
		favorites.push(newFavorite)
		dispatch('setFavorites', favorites)
	},

	/**
	 * Removes a single favorite from the list of favorites and dispatches the `setFavorites` action.
	 * @param {Object} context
	 * @param {Object} favoriteToRemove
	 * @returns {void}
	 */
	async removeFavorite({ dispatch, state }, favoriteToRemove) {
		const favorites = state.favoriteLocations.filter(
			f =>
				f.location.latitude !== favoriteToRemove.location.latitude &&
				f.location.longitude !== favoriteToRemove.location.longitude
		)

		dispatch('setFavorites', favorites)
	}
})
