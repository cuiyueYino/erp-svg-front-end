<template>
	<div>
		<tabViews :context="context" :showFigNum="showFigNum" :is="tabViews"></tabViews>
	</div>
</template>
<script>
	import selectMainTableClassification from '../../views/collaborative-office/components/select-main-table-classification';
	import addMainTableClassification from '../../views/collaborative-office/components/add-main-table-classification';
	export default {
		components: {
			selectMainTableClassification,
			addMainTableClassification
		},
		data() {
			return {
				tabViews: "selectMainTableClassification",
				showFigNum: 1,
				context :{}
			}
		},
		created() {},
		methods: {
			toAdd(showFigNum,context) {
				console.log(context)
				this.tabViews = "addMainTableClassification"
				this.showFigNum = showFigNum
				this.context = context
			},
			toSelect() {
				this.tabViews = "selectMainTableClassification"
			}
		}
	}
</script>
<style scoped="scoped">

</style>