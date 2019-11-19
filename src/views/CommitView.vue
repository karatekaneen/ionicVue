<template>
	<div class="home">Det här ska vara commit-lista</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'home',
	data() {
		return {
			commits: [],
			componentState: 'init'
		}
	},
	methods: {
		async getCommits(username = 'karatekaneen') {
			// Hard coded for now, easy to extend later
			const resp = await axios.post('https://www.graphqlhub.com/graphql', {
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
			console.log(resp.data.data.github.user.repos)
		}
	},
	mounted() {
		this.getCommits()
	}
}
</script>
