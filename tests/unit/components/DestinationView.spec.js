import DestinationView from '../../../src/views/DestinationView.vue'
import Coordinate from '../../../src/models/Coordinate'
import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(Vuex)
document.body.setAttribute('data-app', true)

describe('Destination View', () => {
	let mutations
	let store
	let state

	beforeEach(() => {
		state = {
			targetLocation: { toMarker: () => ({ position: { lat: 59, lng: 13 } }) }
		}

		mutations = {
			setTargetLocation: jest.fn()
		}

		store = new Vuex.Store({
			mutations,
			state
		})
	})

	describe('Logic', () => {
		it('modifies marker object when calling moveMarker', () => {
			const wrapper = shallowMount(DestinationView, {
				Vue,
				store,
				propsData: {
					markers: [{ position: { lat: 58, lng: 12 } }]
				}
			})
			wrapper.vm.moveMarker({ lat: () => 42, lng: () => 92 })

			expect(wrapper.vm.markers[0]).toEqual({ position: { lat: 42, lng: 92 } })
		})

		it('creates a coordinate instance', () => {
			const wrapper = shallowMount(DestinationView, {
				Vue,
				store,
				propsData: {
					markers: [{ position: { lat: 59, lng: 13 } }]
				}
			})

			const resp = wrapper.vm.createTargetCoordinates()

			expect(resp.latitude).toBe(59)
			expect(resp.longitude).toBe(13)
			expect(resp instanceof Coordinate).toBe(true)
		})

		it('Adds the coordinate instance to the store', () => {
			const wrapper = shallowMount(DestinationView, {
				Vue,
				store,
				propsData: {
					markers: [{ position: { lat: 58, lng: 12 } }]
				}
			})

			const resp = wrapper.vm.createTargetCoordinates()

			expect(mutations.setTargetLocation).toHaveBeenCalledTimes(1)

			const { timestamp, ...call } = mutations.setTargetLocation.mock.calls[0][1]

			expect(call).toEqual({
				accuracy: null,
				altitude: null,
				heading: null,
				latitude: 59,
				longitude: 13,
				speed: null
			})
		})
	})
})
