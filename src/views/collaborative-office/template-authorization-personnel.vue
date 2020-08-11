<template>
	<div>
		<tabViews :showFig="showFig" :is="tabViews"></tabViews>
	</div>
</template>
<script>
	import mainTableToPersonnel from '../../views/collaborative-office/components/main-table-to-personnel';
	import PersonnelToMainTable from '../../views/collaborative-office/components/personnel-to-main-table';
	export default {
		components: {
			mainTableToPersonnel,
			PersonnelToMainTable
		},
		data() {
			return {
				tabViews: "mainTableToPersonnel",
				showFig: "1"
			}
		},
		methods: {
			mainTable() {
				this.tabViews = "mainTableToPersonnel"
				this.showFig = "1"
			},
			role() {
				this.tabViews = "PersonnelToMainTable"
				this.showFig = "2"
			}
		}
	}
</script>
<style scoped="scoped">

</style>