<template>
	<div>
		<tabViews :context="context" :showFigNum="showFigNum" :is="tabViews"></tabViews>
	</div>
</template>
<script>
	import selectMainTable from '../../views/collaborative-office/components/select-main-table';
	import addMainTable from '../../views/collaborative-office/components/add-main-table';
	import updMainTable from '../../views/collaborative-office/components/upd-main-table';
	export default {
		components: {
			selectMainTable,
			addMainTable,
			updMainTable
		},
		data() {
			return {
				tabViews: "selectMainTable",
				showFigNum: 1,
				context :{}
			}
		},
		created() {},
		methods: {
			toAdd(showFigNum,context) {
				this.tabViews = "addMainTable"
				this.showFigNum = showFigNum
				this.context = context
			},
			toUpd(context) {
				this.tabViews = "updMainTable"
				this.context = context
			},
			toSelect() {
				this.tabViews = "selectMainTable"
			}
		}
	}
</script>
<style scoped="scoped">

</style>