import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import createStore from '../../../src/store/index'
import mutations from '../../../src/store/mutations'
import actions from '../../../src/store/actions'
import _state from '../../../src/store/state'
import { Plugins } from '@capacitor/core'
import Coordinate from '../../../src/models/Coordinate'
import Journey from '../../../src/models/Journey'
import Notification from '../../../src/models/Notification'
const localVue = createLocalVue()

// Mocks:
const validJourney = {
	startLocation: new Coordinate(
		Coordinate.fromJSON({
			latitude: 58,
			longitude: 12,
			accuracy: 1838,
			altitude: null,
			speed: null,
			heading: null,
			timestamp: 1575816681379
		})
	),
	targetLocation: new Coordinate(
		Coordinate.fromJSON({
			latitude: 57,
			longitude: 12,
			accuracy: null,
			altitude: null,
			speed: null,
			heading: null,
			timestamp: 1575816687720
		})
	),
	threshold: 62.1,
	max: 69
}

describe('Store actions', () => {
	let store
	let actionsObj
	let commit = jest.fn()
	let dispatch = jest.fn()
	let state = _state()
	let LocalNotifications
	let Geolocation

	beforeEach(() => {
		jest.clearAllMocks()

		commit = jest.fn()
		state = _state()
		dispatch = jest.fn()

		LocalNotifications = { schedule: jest.fn() }
		Geolocation = {
			clearWatch: jest.fn(),
			getCurrentPosition: jest.fn(() => ({ coords: { latitude: 57, longitude: 12 } }))
		}

		actionsObj = actions({
			Coordinate,
			Journey,
			Notification,
			Geolocation,
			Storage: Plugins.Storage,
			LocalNotifications
		})
	})

	it('can create instance of store', () => {
		store = createStore({
			Vue: localVue,
			Vuex,
			mutations: mutations(),
			state,
			actions: actions({
				Coordinate,
				Journey,
				Notification,
				Geolocation: Plugins.Geolocation,
				Storage: Plugins.Storage,
				LocalNotifications: Plugins.LocalNotifications
			})
		})
		expect(store instanceof Vuex.Store).toBe(true)
	})

	describe('Create Journey', () => {
		it('can create a basic journey', () => {
			validJourney.currentLocation = validJourney.startLocation
			actionsObj.createJourney({ commit, dispatch, state }, validJourney)
			expect(commit).toHaveBeenCalledTimes(1)
			expect(commit.mock.calls[0][0]).toEqual('setCurrentJourney')
			expect(commit.mock.calls[0][1] instanceof Journey).toBe(true)
			expect(dispatch).toHaveBeenCalledTimes(1)
			expect(dispatch).toHaveBeenCalledWith('createLocationListener')
		})

		it('updates if journey already exist', () => {
			const journey = new Journey({
				startLocation: validJourney.startLocation,
				targetLocation: validJourney.targetLocation,
				threshold: (validJourney.max - validJourney.threshold) * 1000
			})

			state.currentJourney = journey
			expect(journey.targetLocation).toEqual(validJourney.targetLocation)

			const test2 = {
				currentLocation: new Coordinate(
					Coordinate.fromJSON({
						latitude: 59,
						longitude: 13,
						accuracy: 1838,
						altitude: null,
						speed: null,
						heading: null,
						timestamp: 1575816681379
					})
				),
				targetLocation: new Coordinate(
					Coordinate.fromJSON({
						latitude: 77,
						longitude: 22,
						accuracy: null,
						altitude: null,
						speed: null,
						heading: null,
						timestamp: 1575816687720
					})
				),
				threshold: 22.1,
				max: 69
			}

			actionsObj.createJourney({ commit, dispatch, state }, test2)
			expect(commit).not.toHaveBeenCalled()
			expect(dispatch).not.toHaveBeenCalled()
			expect(journey.targetLocation).toEqual(test2.targetLocation)
		})
	})

	describe('assignTargetLocation', () => {
		it('sets target location if there is a journey and commits the progress', () => {
			state.currentJourney = new Journey(validJourney)

			const c = new Coordinate(
				Coordinate.fromJSON({
					latitude: 12,
					longitude: 10,
					accuracy: null,
					altitude: null,
					speed: null,
					heading: null,
					timestamp: 1575816687720
				})
			)

			actionsObj.assignTargetLocation({ commit, state }, c)

			expect(commit).toHaveBeenCalledTimes(3)
			const calls = commit.mock.calls
			expect(calls[0][0]).toBe('setTargetLocation')
			expect(calls[0][1]).toEqual(c)

			expect(calls[1][0]).toBe('setCurrentJourney')
			expect(calls[1][1]).toEqual(state.currentJourney)

			expect(calls[2][0]).toBe('setProgress')
			expect(calls[2][1]).toEqual(state.currentJourney.getProgress())
		})

		it('sets target location', () => {
			const c = new Coordinate(
				Coordinate.fromJSON({
					latitude: 12,
					longitude: 10,
					accuracy: null,
					altitude: null,
					speed: null,
					heading: null,
					timestamp: 1575816687720
				})
			)

			actionsObj.assignTargetLocation({ commit, state }, c)

			expect(commit).toHaveBeenCalledTimes(1)
			const calls = commit.mock.calls
			expect(calls[0][0]).toBe('setTargetLocation')
			expect(calls[0][1]).toEqual(c)
		})
	})

	describe('sendNotification', () => {
		it('does not send notification if notificationSent == true', () => {
			state.notificationSent = true

			actionsObj.sendNotification({ state, commit })
			expect(commit).not.toHaveBeenCalled()
		})

		it('does send notification if notificationSent == false', () => {
			state.notificationSent = false

			actionsObj.sendNotification({ state, commit })
			expect(commit).toHaveBeenCalledWith('setNotificationSent', true)
			expect(
				LocalNotifications.schedule.mock.calls[0][0].notifications[0] instanceof Notification
			).toBe(true)
			expect(LocalNotifications.schedule).toHaveBeenCalledTimes(1)
		})
	})

	describe('retrieveCurrentLocation', () => {
		it('commits the current location', async () => {
			await actionsObj.retrieveCurrentLocation({ commit })
			expect(Geolocation.getCurrentPosition).toHaveBeenCalledTimes(1)
			expect(commit).toHaveBeenCalledTimes(1)
			expect(commit).toHaveBeenCalledWith('setCurrentLocation', {
				accuracy: null,
				altitude: null,
				heading: null,
				latitude: 57,
				longitude: 12,
				speed: null,
				timestamp: null
			})
		})
	})

	describe('journeyRemoval', () => {
		it('clears the state', async () => {
			await actionsObj.journeyRemoval({ state: { watcherId: 25 }, commit })
			expect(commit).toHaveBeenCalledTimes(5)

			expect(commit.mock.calls[0][0]).toBe('setWatcherId')
			expect(commit.mock.calls[0][1]).toBe(null)

			expect(commit.mock.calls[1][0]).toBe('setNotificationSent')
			expect(commit.mock.calls[1][1]).toBe(false)

			expect(commit.mock.calls[2][0]).toBe('setTargetLocation')
			expect(commit.mock.calls[2][1]).toBe(null)

			expect(commit.mock.calls[3][0]).toBe('setCurrentJourney')
			expect(commit.mock.calls[3][1]).toBe(null)

			expect(commit.mock.calls[4][0]).toBe('setProgress')
			expect(commit.mock.calls[4][1]).toEqual({
				current: null,
				currentDistance: null,
				distanceLeft: null,
				progressPercent: null,
				shouldNotify: null,
				startedAt: null,
				threshold: null,
				timeElapsed: null
			})
		})
	})

	test.todo('need to test the storage actions')
})
