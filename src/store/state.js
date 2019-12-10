export default () => ({
	watcherId: null,
	currentJourney: null,
	targetLocation: null,
	currentLocation: null,
	notificationSent: false,
	favoriteLocations: [],

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
