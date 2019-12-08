export default ({ Vue, Vuex, state, mutations, actions }) => {
	Vue.use(Vuex)
	console.info('Store created')
	return new Vuex.Store({
		state,
		mutations,
		actions
	})
}
