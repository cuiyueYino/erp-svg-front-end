<template>
	<div>
		<el-card class="box-card">
			<el-form style="margin-bottom: 10px;" ref="formInline" label-width="10px" :model="formInline" class="demo-form-inline">
				<el-row>
					<el-col :span="6">
						<el-form-item prop="tname">
							<el-input clearable v-model="formInline.tname" placeholder="人员名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item>
							<el-button type="primary" @click="getRoleList();loading=true">搜索</el-button>
							<el-button type="primary" plain @click="$refs.formInline.resetFields();getRoleList();loading=true">重置</el-button>
							<el-button v-if="showFig == 1" type="primary" plain @click="getAll()">全部</el-button>
							<el-button v-if="showFig == 1" type="primary" plain @click="getConList()">已选中</el-button>
						</el-form-item>
					</el-col>
					<el-col v-if="showFig == 1" :span="8" style="text-align: right;">
						<el-form-item>
							<el-button type="warning" icon="el-icon-refresh" @click="switchChild()">切换维度</el-button>
							<el-button type="success" icon="el-icon-check" @click="workItemAuthRole()">确定</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<vxe-table border :loading="loading" ref="multipleTable" align="center" size="small" highlight-current-row @cell-click="clickRow" height="700" :data="roleList">
				<vxe-table-column v-if="showFig == 1" type="checkbox" width="60"></vxe-table-column>
				<vxe-table-column field="tcode" title="人员编码"></vxe-table-column>
				<vxe-table-column field="tname" title="人员名称"></vxe-table-column>
				<vxe-table-column field="tcompanyName" title="公司名称"></vxe-table-column>
			</vxe-table>
		</el-card>
	</div>
</template>
<script>
	import pageNation from '../pageNation';
	export default {
		components: {
			pageNation
		},
		props: {
			roleCon: Object,
			showFig: String
		},
		data() {
			return {
				loading: true,
				formInline: {
					tname: "",
					workItemId:""
					
				},
				roleList: [],
				roleIds: [],
				rowClick: {},
				conList: []
			}
		},
		created() {
			this.getRoleList()
		},
		methods: {
			getAll() {
				this.check()
			},
			getConList() {
				this.roleList = []
				this.roleList = this.$refs.multipleTable.getCheckboxRecords()
			},
			check() {
				this.loading = true
				this.$api.collaborativeOffice.findUserAuthByWorkItem({
					workItemId: this.roleCon.id
				}).then(data => {
					console.log(data)
					this.loading = false
					this.roleList = data.data.data
					this.roleList.forEach((item, index) => {
						if(item.exist == 1) {
							this.$refs.multipleTable.toggleCheckboxRow(this.roleList[index]);
						}
					})
				})
			},
			workItemAuthRole() {
				if(typeof(this.roleCon.id) == "undefined") {
					this.goOut("请选择数据")
					return
				}
				this.roleIds = []
				this.$refs.multipleTable.getCheckboxRecords().forEach(item => {
					this.roleIds.push(item.toid)
				})
				this.$api.collaborativeOffice.apiUrl("workItemAuthUser/authUserToWorkItem", {
					userIdList: this.roleIds,
					workItemId: this.roleCon.id
				}).then(data => {
					if(this.dataBack(data, "授权成功")) {
						this.$refs.multipleTable.clearCheckboxRow();
						this.$parent.$parent.$parent.$parent.refresh()
					}
				})
			},
			switchChild() {
				this.$parent.$parent.$parent.$parent.$parent.role()
			},
			getRoleList() {
				this.$api.collaborativeOffice.findUserAuthByWorkItem(this.formInline).then(data => {
					console.log(data)
					this.loading = false
					this.conList = data.data.data
					this.roleList = JSON.parse(JSON.stringify(this.conList))
				})
			},
			//选中行
			clickRow(row) {
				this.rowClick = row.row
				if(this.showFig == 2) {
					this.$api.collaborativeOffice.findWorkItemByUser({
						userId: row.row.toid
					}).then(data => {
						this.$emit("getCon", data.data.data, row.row.toid)
					})
				}
			},
			clear() {
				this.rowClick = {}
			}
		}
	}
</script>

<style scoped>
	>>>.vxe-table--header {
		background-color: rgb(148, 185, 205);
		color: white;
	}
	
	.box-card:first-child {
		margin-bottom: 16px;
	}
</style>