/**
 * Class to be used for local notifications natively.
 */
class Notification {
	/**
	 * Creates instance of a Notification.
	 * @param {Object} params
	 * @param {number} params.id Id of the notification
	 * @param {string} params.title Title to be desplayed in the notification
	 * @param {string} params.body Body for the notification
	 * @param {string|number|Object} params.schedule Configuration for when the notification should be triggered. See `generateScheduleObj` for more detials
	 * @param {string} params.sound What sound that should be played. **Not implemented yet**
	 * @param {string} params.journey The Journey instance linked to this notification. To be used for when opening the ap from the notification
	 * @param {string} params.smallIcon URI to the icon. **Not implemented yet**
	 * @param {string} params.actionTypeId **Not implemented yet.**
	 * @param {string} params.extra **Not implemented yet.**
	 */
	constructor({
		title,
		body = 'You are about to arrive at your destination',
		schedule = 'now',
		id = Math.floor(Math.random() * 100),
		sound = null,
		journey = null,
		actionTypeId = 'DEFAULT',
		smallIcon = null, // TODO Add default icon
		extra = null
	} = {}) {
		// TODO Make implementation to throw if journey is undefined
		// if (!journey || !(journey instanceof Journey)) {
		// 	throw new Error('Journey is required')
		// }

		this.id = id
		this.title = title || this.getRandomTitle()
		this.body = body
		this.schedule = this.generateScheduleObj(schedule)
		this.smallIcon = smallIcon
		this.sound = sound
		this.attachments = [journey]
		this.actionTypeId = actionTypeId
		this.extra = extra
	}

	/**
	 * Get all the types of notifications that will be used in the application.
	 * @returns {Array<Object>} Array of notification types
	 */
	static getNotificationTypes() {
		return [
			{
				id: 'DEFAULT',
				actions: [
					{
						id: 'view',
						title: 'View'
					},
					{
						id: 'remove',
						title: 'Remove',
						destructive: true
					}
				]
			}
		]
	}

	/**
	 * Returns random title if none is provided to the constructor
	 * @returns {String} Random title
	 */
	getRandomTitle() {
		const titles = [
			`Rise and shine!`,
			`Wakey wakey!`,
			`Time to wake up`,
			`Ready up!`,
			`Adventures ahead`,
			`You're here!`
		]

		const index = Math.round((Math.random() / 2) * 10) // Random int between 0 and 5
		return titles[index]
	}

	/**
	 * Generates the object that triggers the notification.
	 * @param {String|number|Object} schedule When to send the notification. If it is a string with `now` it starts in 5 seconds, if it is a number it starts in the number of seconds. If it is an object it is considered to know what is required and is return as it is.
	 * @returns {Object} Schedule object for the notification
	 */
	generateScheduleObj(schedule = 'now') {
		if (schedule === 'now') return { at: new Date(Date.now() + 1000 * 5) }
		else if (typeof schedule === 'number') return { at: new Date(Date.now() + 1000 * schedule) }
		else if (typeof schedule === 'object' && schedule !== null) return schedule
		else throw new Error('Invalid schedule')
	}
}

export default Notification
