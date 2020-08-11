<template>
	<div>
		<tabViews :showFig="showFig" :is="tabViews"></tabViews>
	</div>
</template>
<script>
	import mainTableToRole from '../../views/collaborative-office/components/main-table-to-role';
	import roleToMainTable from '../../views/collaborative-office/components/role-to-main-table';
	export default {
		components: {
			mainTableToRole,
			roleToMainTable
		},
		data() {
			return {
				tabViews: "mainTableToRole",
				showFig: "1"
			}
		},
		methods: {
			mainTable() {
				this.tabViews = "mainTableToRole"
				this.showFig = "1"
			},
			role() {
				this.tabViews = "roleToMainTable"
				this.showFig = "2"
			}
		}
	}
</script>
<style scoped="scoped">

</style>