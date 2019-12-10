import Notification from '../Notification'

it('has a working constructor', () => {
	const n = new Notification()
	expect(n instanceof Notification).toBe(true)
})

it('uses default values', () => {
	const n = new Notification({})

	expect(n.body).toBe('You are about to arrive at your destination')
	expect(n.sound).toBe(null)
	expect(n.actionTypeId).toBe('DEFAULT')
	expect(n.extra).toBe(null)
	expect(n.schedule.at instanceof Date).toBe(true)
	expect(typeof n.id).toBe('number')
})

it('Can mix both default and provided values', () => {
	const n = new Notification({ title: 'pooop' })

	expect(n.title).toBe('pooop')

	expect(n.body).toBe('You are about to arrive at your destination')
	expect(n.sound).toBe(null)
	expect(n.actionTypeId).toBe('DEFAULT')
	expect(n.extra).toBe(null)
	expect(n.schedule.at instanceof Date).toBe(true)
	expect(typeof n.id).toBe('number')
})

it('generates random title if none is provided', () => {
	const titles = [
		`Rise and shine!`,
		`Wakey wakey!`,
		`Time to wake up`,
		`Ready up!`,
		`Adventures ahead`,
		`You're here!`
	]

	const allCorrectTitles = new Array(10)
		.fill(new Notification())
		.every(notification => titles.includes(notification.title))

	expect(allCorrectTitles).toBe(true)
})

it('Generates Schedule object from number', () => {
	const n = new Notification()
	const d = new Date()

	const resp = n.generateScheduleObj(10).at
	expect(resp instanceof Date).toBe(true)
	expect(Math.round((resp - d) / 1000)).toBe(10) // Divides and rounds to make sure that it won't be flaky on slower machines
})

it('Generates Schedule object from string', () => {
	const n = new Notification()

	expect(n.generateScheduleObj('now').at instanceof Date).toBe(true)
})

it('throws when trying to generate Schedule object from invalid string', () => {
	const n = new Notification()

	try {
		n.generateScheduleObj('invalidstring')
	} catch (err) {
		expect(err.message).toBe('Invalid schedule')
	}
})

it('Generates Schedule object from object', () => {
	const n = new Notification()

	const scheduleOnMinute = {
		//* To schedule every minute. Guess hour and seconds should be valid too.
		on: {
			minute: new Date().getUTCMinutes() + 1
		}
	}

	//* To notify in intervals
	const scheduleEvery = {
		every: 'minute'
	}

	expect(n.generateScheduleObj(scheduleOnMinute).on.minute).toBe(new Date().getUTCMinutes() + 1)
	expect(n.generateScheduleObj(scheduleEvery)).toEqual({ every: 'minute' })
})

it('has static method to generate the notification types', () => {
	const types = Notification.getNotificationTypes()
	expect(Array.isArray(types)).toBe(true)
	expect(types.length > 0).toBe(true)
	expect(types.some(type => type.id === 'DEFAULT'))
	expect(types.every(type => Array.isArray(type.actions)))
	expect(types.every(type => type.actions.every(({ id, title }) => id && title)))
})
