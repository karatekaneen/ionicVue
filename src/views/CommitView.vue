<template>
	<v-container style="overflow: scroll !important;">
		<v-card style="padding: 20px; margin: 20px; " v-for="(commit, index) in commits" :key="index">
			<v-card-title>
				<v-icon x-large :color="index % 2 === 0 ? 'primary' : 'secondary'">{{getIcon(index)}}</v-icon>
				{{commit.repoName}}
			</v-card-title>
			<v-card-subtitle>{{commit.date.toLocaleDateString()}} - {{commit.date.toLocaleTimeString() }}</v-card-subtitle>
			<v-card-text>{{commit.message}}</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'home',
	computed: {
		commits() {
			return this.repos
				.map(repo =>
					repo.commits.map(({ date, ...commit }) => ({
						...commit,
						date: new Date(date),
						repoName: repo.name
					}))
				) // Get all commits
				.flat() // Flatten structure
				.sort((a, b) => {
					// Sort by date descending
					const aDate = new Date(a.date)
					const bDate = new Date(b.date)
					return aDate < bDate ? 1 : 0
				})
		},
		...mapState(['repos', 'error', 'hasFetched'])
	},
	data() {
		return {}
	},
	methods: {
		getIcon(i) {
			const icons = ['pregnant_woman', 'search', 'warning']
			return icons[i % icons.length]
		},
		getCommits() {
			if (this.repos && !this.hasFetched) {
				this.$store.dispatch('getRepos')
			}
		}
	},
	mounted() {
		this.getCommits()
	}
}
</script>
