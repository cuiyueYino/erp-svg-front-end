<template>
	<WorkItemPage :context="context" :showSeeOrUpd="showSeeOrUpd" :todoFlag="todoFlag" />
</template>

<script>
	import WorkItemPage from '../../views/collaborative-office/components/see-work-items.vue'; // 工作事项的详情

	export default {
		props: {
			context: Object,
			showSeeOrUpd: String,
			todoFlag: Boolean,
			showLookOrUpdate: Object,

		},
		components: {
			WorkItemPage
		},
		data() {
			return {};
		},
		created() {
			console.log(this.context)
		},
		watch: {
			"context": {
				handler(val, oldval) {
					console.log(val)
				},
				deep: true
			},
		}

	};
</script>

<style>

</style>