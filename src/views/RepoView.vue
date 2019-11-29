<template>
	<v-container>
		<div style="overflow-y: auto">
			<v-card style="padding: 20px; margin: 20px; " v-for="(repo, index) in repos" :key="index">
				<v-card-title>
					<v-icon x-large :color="index % 2 === 0 ? 'primary' : 'secondary'">{{
						getIcon(index)
					}}</v-icon>
					{{ repo.name }}
				</v-card-title>
			</v-card>
		</div>
	</v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: mapState(['repos', 'error', 'hasFetched']),
	methods: {
		getCommits() {
			if (this.repos && !this.hasFetched) {
				this.$store.dispatch('getRepos')
			}
		},
		getIcon(i) {
			const icons = ['pregnant_woman', 'search', 'warning']
			return icons[i % icons.length]
		}
	},
	mounted() {
		this.getCommits()
	}
}
</script>

<style lang="scss" scoped></style>
