import Coordinate from '../../../src/models/Coordinate'

describe('Coordinate', () => {
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
	})
})
