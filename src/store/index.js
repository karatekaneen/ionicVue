import Vue from 'vue'
import Vuex from 'vuex'

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
	actions: {},
	modules: {}
})
