<template>
	<div>
		<tabViews :context="context" :showFigNum="showFigNum" :is="tabViews"></tabViews>
	</div>
</template>
<script>
	import selectWorkItems from '../../views/collaborative-office/components/select-work-items';
	import addWorkItem from '../../views/collaborative-office/components/add-work-items';
	import seeWorkItem from '../../views/collaborative-office/components/see-work-items';
//	import updMainTable from '../../views/collaborative-office/components/upd-main-table';
	export default {
		components: {
			selectWorkItems,
			addWorkItem,
			seeWorkItem
//			updMainTable
		},
		data() {
			return {
				tabViews: "selectWorkItems",
				showFigNum: 1,
				context :{}
			}
		},
		created() {},
		methods: {
			toAdd(showFigNum,context) {
				this.tabViews = "addWorkItem"
				this.showFigNum = showFigNum
				this.context = context
			},
			toUpd(context) {
				this.tabViews = "updMainTable"
				this.context = context
			},
			toSelect() {
				this.tabViews = "selectWorkItems"
			},
			toSee(context,tempId){
				this.context = context
				this.context.tempId = tempId
				this.tabViews = "seeWorkItem"
			}
		}
	}
</script>
<style scoped="scoped">

</style>