import Journey from '../Journey'
import Coordinate from '../Coordinate'

const point1 = new Coordinate({
	coords: {
		latitude: 59,
		longitude: 12
	}
})
const point2 = new Coordinate({
	coords: {
		latitude: 60,
		longitude: 13
	}
})
const point3 = new Coordinate({
	coords: {
		latitude: 61,
		longitude: 14
	}
})

it('Constructor throws when not passing the correct arguments', () => {
	expect.assertions(2)

	try {
		const j = new Journey()
	} catch (err) {
		expect(err.message).toBe('Missing required parameters')
	}
	try {
		const j = new Journey({ startLocation: point1, targetLocation: point3 })
	} catch (err) {
		expect(err.message).toBe('Missing required parameters')
	}
})

it('has a working constructor', () => {
	const j = new Journey({ startLocation: point1, targetLocation: point3, threshold: 1000 })

	expect(j instanceof Journey).toBe(true)
	expect(j.threshold).toBe(1000)
	expect(j.startLocation).toEqual(point1)
	expect(j.currentLocation).toEqual(point1)
	expect(j.targetLocation).toBe(point3)
	expect(j.initialDistance).toBe(248612)
	expect(j.currentDistance).toBe(248612)
	expect(j.triggerDistance).toBe(248612 - 1000)
})

it('can update current location', () => {
	const j = new Journey({ startLocation: point1, targetLocation: point3, threshold: 1000 })

	expect(j.currentDistance).toBe(248612)
	const returnValue = j.setCurrentLocation(point2)
	expect(j.currentDistance).toBe(123942)
	expect(j.currentLocation).toEqual(point2)
	expect(returnValue instanceof Journey).toBe(true)
})

it('returns the correct progress', () => {
	const j = new Journey({ startLocation: point1, targetLocation: point3, threshold: 10000 })

	const { timeElapsed, startedAt, ...returnValue } = j.setCurrentLocation(point2).getProgress()
	expect(returnValue).toEqual({
		current: 0.5014641288433381,
		currentDistance: 123942,
		distanceLeft: 124,
		progressPercent: 50,
		shouldNotify: false,
		threshold: 0.959776680128071
	})

	// Override the current distance
	j.currentDistance = 9999
	const newResponse = j.getProgress()
	delete newResponse.timeElapsed
	delete newResponse.startedAt

	expect(newResponse).toEqual({
		current: 0.9597807024600582,
		currentDistance: 9999,
		distanceLeft: 10,
		progressPercent: 96,
		shouldNotify: true,
		threshold: 0.959776680128071
	})
})

it('can change destination', () => {
	const j = new Journey({ startLocation: point1, targetLocation: point2, threshold: 1000 })

	expect(j.initialDistance).toBe(124693)
	expect(j.targetLocation).toBe(point2)
	expect(j.currentDistance).toBe(124693)

	j.setTargetLocation(point3)
	expect(j.targetLocation).toBe(point3)
	expect(j.initialDistance).toBe(248612)
	expect(j.currentDistance).toBe(248612)
})
