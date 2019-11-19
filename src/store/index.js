import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		repos: [],
		error: null,
		hasFetched: false
	},
	mutations: {
		setRepos(state, repos) {
			if (repos) state.repos = repos
			else state.repos = []
		}
	},
	actions: {
		/**
		 * Fetches repos for a specific user.
		 * @async
		 * @param {String} username The user whose repos we should fetch
		 * @returns {Array<Object>|null} Returns null if user is not found, or array of repos if user has any.
		 */
		async getRepos({ commit, state }, username = 'karatekaneen') {
			try {
				// Hard coded for now, easy to extend later
				const { data } = await axios.post('https://www.graphqlhub.com/graphql', {
					// GraphQL Query:
					query: `{
						github {
							user(username: "${username}") {
								avatar_url
								repos{
									name
									commits(limit: 5){
										date
										message
									}
								}
							}
						}
					}`
				})
				const user = data.data.github.user // This is null if user is not found but that case is handled in the mutation.
				commit('setRepos', user.repos)
			} catch (err) {
				state.error = err
				console.error(err)
			}
		}
	},
	modules: {}
})
