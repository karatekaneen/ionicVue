/**
 * Class for coordinate points with some helper methods to do some calculations such as distance.
 */
class Coordinate {
	/**
	 * Create an instance of a coordinate point.
	 * @param {Object} locationResponse The response from the native GPS. If coordinates originates from different source they need to be converted to fit the input
	 * @param {Object} locationResponse.coords The coordinates, mainly with the `latitude` and `longitude` props.
	 */
	constructor(locationResponse) {
		this.setCoordinates(locationResponse)
	}

	/**
	 * When storing Coordinates they will be converted to JSON.
	 * This method helps to build new Coordinate instances like:
	 *
	 * ```javascript
	 * const jsonObject = { latitude: 58, longitude: 12, timestamp: 1234567 }
	 * const coordinate = new Coordinate(Coordinate.fromJSON(jsonObject))
	 * ```
	 * @param {Object} coordinate A Coordinate instance that has been serialized to JSON.
	 * @returns {Coordinate}
	 */
	static fromJSON({ timestamp, ...coords }) {
		return { timestamp, coords }
	}

	/**
	 * Sets the instance's location properties. Used both for creating a new instance and updating data on an existing instance
	 * @param {Object} location
	 * @param {Object} location.coords The coordinate object , mainly with the `latitude` and `longitude` props.
	 * @returns {Coordinate} this
	 */
	setCoordinates(location) {
		if (location) {
			const { coords, timestamp } = location

			/*
			Using fallback to avoid to having pass all the arguments every
			 time and still keep some old data if it's not overwritten
			*/
			this.latitude = coords.latitude || this.latitude || null
			this.longitude = coords.longitude || this.longitude || null
			this.accuracy = coords.accuracy || this.accuracy || null
			this.altitude = coords.altitude || this.altitude || null
			this.speed = coords.speed || this.speed || null
			this.heading = coords.heading || this.heading || null
			this.timestamp = timestamp || this.timestamp || null
		}

		return this
	}

	/**
	 * Calculates the distance between two coordinate points.
	 * Calculation and code found at [this link](https://www.movable-type.co.uk/scripts/latlong.html)
	 *
	 * @param {Coordinate} coordinate1 The target coordinates
	 * @param {Coordinate} coordinate2 The current coordinates, defaults to this.
	 * @returns {number} Distance in meters?
	 */
	calculateDistance(coordinate1, coordinate2 = this) {
		const R = 6371e3 // The earths circumference in meters
		const φ1 = this.toRadians(coordinate1.latitude)
		const φ2 = this.toRadians(coordinate2.latitude)
		const Δφ = this.toRadians(coordinate2.latitude - coordinate1.latitude)
		const Δλ = this.toRadians(coordinate2.longitude - coordinate1.longitude)

		const a =
			Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
			Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

		const distance = Math.round(R * c) // Distance in whole meters. No need for decimals
		return distance
	}

	/**
	 * Helper method to convert degrees to radians, which is a different kind of degrees.
	 * formula found at [this link](https://www.w3resource.com/javascript-exercises/javascript-math-exercise-33.php)
	 *
	 * @param {number} degrees Degrees that should be converted to radians
	 * @returns {number} degrees converted to radians
	 */
	toRadians(degrees) {
		return degrees * (Math.PI / 180)
	}

	/**
	 * Helper method to create object to add markers to the Google map component
	 * @returns {Object} In the correct form for Google maps
	 */
	toMarker() {
		return { position: { lat: this.latitude, lng: this.longitude } }
	}
}

export default Coordinate
