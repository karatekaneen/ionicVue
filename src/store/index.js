import Vue from 'vue'
import Vuex from 'vuex'
import Coordinate from '../models/Coordinate'
import { Plugins } from '@capacitor/core'
const { Geolocation, LocalNotifications } = Plugins

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		currentLocation: null,
		targetLocation: null,
		currentJourney: null
	},
	mutations: {
		setCurrentLocation: (state, coordinate) => (state.currentLocation = coordinate),
		setTargetLocation: (state, coordinate) => (state.targetLocation = coordinate),
		setcurrentJourney: (state, journey) => (state.currentJourney = journey)
	},
	actions: {
		async retrieveCurrentLocation({ commit }) {
			const coordinates = await Geolocation.getCurrentPosition()
			commit('setCurrentLocation', new Coordinate(coordinates))
		}
	},
	modules: {}
})
