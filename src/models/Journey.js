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

		const initialDistance = startLocation.calculateDistance(targetLocation)

		if (initialDistance <= threshold) {
			throw new Error('Distance can not be less than the initial distance')
		} else {
			this.startLocation = startLocation
			this.currentLocation = startLocation

			// Assign threshold
			this.setThreshold(threshold)

			// Assign target location distances etc
			this.setTargetLocation(targetLocation)
			// Add timestamp to measure elapsed time
			this.startedAt = Date.now()
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
	 * Sets the instances threshold
	 * @param {number} threshold The distance from the destination where the notification should be sent
	 * @returns {Journey} this
	 */
	setThreshold(threshold) {
		this.threshold = threshold

		if (this.initialDistance) {
			this.triggerDistance = this.initialDistance - this.threshold
		}
		return this
	}

	/**
	 * Sets the instance's target location and calculates `initialDistance` and `currentDistance`.
	 * @param {Coordinate} target The target location
	 * @returns {Journey} this
	 */
	setTargetLocation(target) {
		this.targetLocation = target
		this.initialDistance = this.startLocation.calculateDistance(target)
		this.currentDistance = this.currentLocation.calculateDistance(target)
		this.triggerDistance = this.initialDistance - this.threshold

		return this
	}

	/**
	 * Get how much of the journey that is complete.
	 * @returns {Object} `threshold` is the fraction of the trip where the notification should be sent. `current` is the current percentage of the trip that's completed. `shouldNotify` is a bool that notifies if the current distance is less than the threhsold distance
	 */
	getProgress() {
		const threshold = this.triggerDistance / this.initialDistance
		const current = 1 - this.currentDistance / this.initialDistance

		const progressPercent = Math.round(Math.min(Math.max(current, 0), 1) * 100)
		const distanceLeft = Math.round(this.currentDistance / 1000)

		const timeDiff = new Date(Date.now() - this.startedAt)
		const hours = timeDiff.getUTCHours()
		const minutes = timeDiff.getUTCMinutes()
		const seconds = timeDiff.getUTCSeconds() // TODO Remove seconds before production

		const readableTime = i => (i < 10 ? '0' + i : i) // Helper methods to make time look nice

		return {
			progressPercent,
			distanceLeft,
			timeElapsed: `${readableTime(hours)}:${readableTime(minutes)}:${readableTime(seconds)}`,
			threshold,
			current,
			shouldNotify: current >= threshold,
			startedAt: this.startedAt,
			currentDistance: this.currentDistance
		}
	}
}

export default Journey
