<template>
	<el-card class="box-card">
		<el-row :gutter="20">
			<el-col :span="10">
				<mainTable :showFig="showFig" ref="mainTable" @getCon="getCon" :roleCon="roleCon"></mainTable>
			</el-col>
			<el-col :span="14">
				<personnelTable :showFig="showFig" ref="personnelTable" @getCon="getCon" :roleCon="roleCon"></personnelTable>
			</el-col>
		</el-row>
	</el-card>
</template>
<script>
	//工作事项主表模板
	import mainTable from '../../../views/collaborative-office/components/encapsulation/main-table';
	import personnelTable from '../../../views/collaborative-office/components/encapsulation/personnel-table';
	export default {
		components: {
			mainTable,
			personnelTable
		},
		props: {
			showFig:String
		},
		data() {
			return {
				roleCon : {},
			}
		},
		created() {},
		methods: {
			refresh(){
				this.$refs.personnelTable.getRoleList()
				this.$refs.personnelTable.clear()
				this.$refs.mainTable.toSelect()
				this.$refs.mainTable.clear()
			},
			getCon(list,id){
				this.roleCon.id = id
				this.roleCon.list = list
				this.$refs.personnelTable.check()
			}
		}
	}
</script>
<style scoped="scoped">
	
	.box-card:first-child {
		margin-bottom: 16px;
	}
</style>