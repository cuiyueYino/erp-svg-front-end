<template>
	<el-card class="box-card">
		<el-row :gutter="20">
			<el-col :span="10">
				<mainTable :showFig="showFig" ref="mainTable" @getCon="getCon" :roleCon="roleCon"></mainTable>
			</el-col>
			<el-col :span="14">
				<roleTable :showFig="showFig" ref="roleTable" @getCon="getCon" :roleCon="roleCon"></roleTable>
			</el-col>
		</el-row>
	</el-card>
</template>
<script>
	//工作事项主表模板
	import mainTable from '../../../views/collaborative-office/components/encapsulation/main-table';
	import roleTable from '../../../views/collaborative-office/components/encapsulation/role-table';
	export default {
		components: {
			mainTable,
			roleTable
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
				this.$refs.roleTable.getRoleList()
				this.$refs.roleTable.clear()
				this.$refs.mainTable.toSelect()
				this.$refs.mainTable.clear()
			},
			getCon(list,id){
				this.roleCon.id = id
				this.roleCon.list = list
				this.$refs.roleTable.check()
			}
		}
	}
</script>
<style scoped="scoped">
	
	.box-card:first-child {
		margin-bottom: 16px;
	}
</style>