import Coordinate from '../Coordinate'

it('has a working constructor', () => {
	const testResp = {
		coords: { latitude: 58.12, longitude: 12.12, accuracy: 25 },
		timestamp: Date.now()
	}
	const c = new Coordinate(testResp)

	expect(c instanceof Coordinate).toBe(true)
	expect(c.longitude).toBe(testResp.coords.longitude)
	expect(c.latitude).toBe(testResp.coords.latitude)
})

it('converts degrees to radians', () => {
	const c = new Coordinate()

	expect(c.toRadians(89)).toBe(1.5533430342749532)
	expect(c.toRadians(180)).toBe(3.141592653589793)
})

it('calculates distances between points correctly', () => {
	const testResp = {
		coords: { latitude: 58.12, longitude: 12.12, accuracy: 25 },
		timestamp: Date.now()
	}
	const c = new Coordinate(testResp)

	expect(c.calculateDistance({ latitude: 58, longitude: 12 })).toBe(15096) // Verified by manual calulation
	expect(c.calculateDistance({ latitude: 59, longitude: 13 })).toBe(110361) // Verified by manual calulation
})

it('can be converted to Google maps marker', () => {
	const testResp = {
		coords: { latitude: 58.12, longitude: 12.12, accuracy: 25 },
		timestamp: Date.now()
	}
	const c = new Coordinate(testResp).toMarker()
	expect(c).toEqual({ position: { lat: 58.12, lng: 12.12 } })
})

it('can be serialized to JSON and back', () => {
	const testResp = {
		coords: { latitude: 58.12, longitude: 12.12, accuracy: 25 },
		timestamp: Date.now()
	}
	const c = new Coordinate(testResp)
	expect(c instanceof Coordinate).toBe(true)

	const copy = JSON.parse(JSON.stringify(c))
	expect(copy instanceof Coordinate).toBe(false)

	const coord = new Coordinate(Coordinate.fromJSON(copy))
	expect(coord instanceof Coordinate).toBe(true)
	expect(coord.latitude).toBe(testResp.coords.latitude)
	expect(coord.longitude).toBe(testResp.coords.longitude)
})
