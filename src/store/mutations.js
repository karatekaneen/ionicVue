export default () => ({
	setCurrentLocation: (state, coordinate) => (state.currentLocation = coordinate),
	setTargetLocation: (state, coordinate) => (state.targetLocation = coordinate),
	setCurrentJourney: (state, journey) => (state.currentJourney = journey),
	setFavoriteLocations: (state, favorites) => (state.favoriteLocations = favorites),
	setWatcherId: (state, id) => (state.watcherId = id),
	setProgress: (state, progress) => (state.progress = progress),
	setNotificationSent: (state, sent) => (state.notificationSent = sent)
})
