export default () => ({
	currentLocation: null,
	targetLocation: null,
	currentJourney: null,
	favoriteLocations: [],
	watcherId: null,
	notificationSent: false,
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
})
