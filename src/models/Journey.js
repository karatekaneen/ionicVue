import Coordinate from './Coordinate'

/**
 * The class that contains all the information for a particular trip
 */
class Journey {
	/**
	 * Creates an instance of `Journey`
	 * @param {Object} params
	 * @param {Coordinate} params.startLocation The start location. Is also set to `currentLocation`
	 * @param {Coordinate} params.targetLocation The destination
	 * @param {number} params.threshold The distance from the destination in meters when the notification should be triggered.
	 */
	constructor({ startLocation, targetLocation, threshold } = {}) {
		if (
			!startLocation ||
			!(startLocation instanceof Coordinate) ||
			!targetLocation ||
			!(targetLocation instanceof Coordinate) ||
			!threshold ||
			typeof threshold !== 'number'
		) {
			throw new Error('Missing required parameters')
		}
		this.startLocation = startLocation
		this.currentLocation = startLocation
		this.targetLocation = targetLocation
		this.threshold = threshold

		const initialDistance = startLocation.calculateDistance(targetLocation)

		if (initialDistance <= threshold) {
			throw new Error('Distance can not be less than the initial distance')
		} else {
			this.initialDistance = initialDistance
			this.currentDistance = initialDistance
			this.triggerDistance = initialDistance - threshold
		}
	}

	/**
	 * Updates the current location and also updates the distance to the destination.
	 * @param {Coordinate} currentLocation The current location
	 * @returns {Journey} this
	 */
	setCurrentLocation(currentLocation) {
		this.currentLocation = currentLocation
		this.currentDistance = this.targetLocation.calculateDistance(currentLocation)

		return this
	}

	/**
	 * Get how much of the journey that is complete.
	 * @returns {Object} `threshold` is the fraction of the trip where the notification should be sent. `current` is the current percentage of the trip that's completed. `shouldNotify` is a bool that notifies if the current distance is less than the threhsold distance
	 */
	getProgress() {
		const threshold = this.triggerDistance / this.initialDistance
		const current = 1 - this.currentDistance / this.initialDistance

		return { threshold, current, shouldNotify: current >= threshold }
	}
}

export default Journey
