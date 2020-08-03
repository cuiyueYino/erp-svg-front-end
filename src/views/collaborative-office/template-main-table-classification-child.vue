<template>
	<div>
		<tabViews :context="context" :showFigNum="showFigNum" :is="tabViews"></tabViews>
	</div>
</template>
<script>
	import selectMainTableClassificationChild from '../../views/collaborative-office/components/select-main-table-classification-child';
	import addMainTableClassificationChild from '../../views/collaborative-office/components/add-main-table-classification-child';
	export default {
		components: {
			selectMainTableClassificationChild,
			addMainTableClassificationChild
		},
		data() {
			return {
				tabViews: "selectMainTableClassificationChild",
				showFigNum: 1,
				context :{}
			}
		},
		created() {},
		methods: {
			toAdd(showFigNum,context) {
				console.log(context)
				this.tabViews = "addMainTableClassificationChild"
				this.showFigNum = showFigNum
				this.context = context
			},
			toSelect() {
				this.tabViews = "selectMainTableClassificationChild"
			}
		}
	}
</script>
<style scoped="scoped">

</style>