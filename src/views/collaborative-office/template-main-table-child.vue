<template>
	<div>
		<tabViews :context="context" :showFigNum="showFigNum" :is="tabViews"></tabViews>
	</div>
</template>
<script>
	import selectMainTableChild from '../../views/collaborative-office/components/select-main-table-child';
	import addMainTableChild from '../../views/collaborative-office/components/add-main-table-child';
	import updMainTableChild from '../../views/collaborative-office/components/upd-main-table-child';
	export default {
		components: {
			selectMainTableChild,
			addMainTableChild,
			updMainTableChild
		},
		data() {
			return {
				tabViews: "selectMainTableChild",
				showFigNum: 1,
				context :{}
			}
		},
		created() {},
		methods: {
			toAdd(showFigNum,context) {
				this.tabViews = "addMainTableChild"
				this.showFigNum = showFigNum
				this.context = context
			},
			toUpd(context) {
				this.tabViews = "updMainTableChild"
				this.context = context
			},
			toSelect() {
				this.tabViews = "selectMainTableChild"
			}
		}
	}
</script>
<style scoped="scoped">

</style>