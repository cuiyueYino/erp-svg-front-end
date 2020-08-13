<template>
	<div>
		<tabViews :showSeeOrUpd="dis" :context="context" :is="tabViews"></tabViews>
	</div>
</template>
<script>
	import selectWorkItems from '../../views/collaborative-office/components/select-work-items';
	import addWorkItem from '../../views/collaborative-office/components/add-work-items';
	import seeWorkItem from '../../views/collaborative-office/components/see-work-items';
	export default {
		components: {
			selectWorkItems,
			addWorkItem,
			seeWorkItem
		},
		data() {
			return {
				tabViews: "selectWorkItems",
				//查看1  新增2   修改3
				dis:"1",
				//传值
				context :{}
			}
		},
		methods: {
			//新增
			toAdd() {
				this.tabViews = "addWorkItem"
			},
			//查询
			toSelect() {
				this.tabViews = "selectWorkItems"
			},
			//查看/修改
			toSee(context,tempId,state){
				this.context = context
				this.dis = state
				this.context.tempId = tempId
				this.tabViews = "seeWorkItem"
			}
		}
	}
</script>
<style scoped="scoped">

</style>