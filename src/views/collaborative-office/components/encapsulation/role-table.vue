<template>
	<div>
		<el-card class="box-card">
			<el-form style="margin-bottom: 10px;" ref="formInline" label-width="10px" :model="formInline" class="demo-form-inline">
				<el-row>
					<el-col :span="6">
						<el-form-item prop="name">
							<el-input clearable v-model="formInline.name" placeholder="角色名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item>
							<el-button type="primary" @click="selectList()">搜索</el-button>
							<el-button type="primary" plain @click="$refs.formInline.resetFields();showFig == 1 ? '' : clear();">重置</el-button>
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
			<vxe-table border align="center" :loading="loading" ref="multipleTable"  size="small" :highlight-current-row="showFig != 1" @cell-click="clickRow" height="700" :data="roleList">
				<vxe-table-column v-if="showFig == 1" width="50">
					<template v-slot:header>
						<vxe-checkbox v-model="checkCon" :indeterminate="getIndeterminate" @change="checkClickAll()"></vxe-checkbox>
					</template>
					<template v-slot="{ row }">
						<vxe-checkbox @change="checkClick(row)" :value="checkValue(row)"></vxe-checkbox>
					</template>
				</vxe-table-column>
				<vxe-table-column field="code" title="角色编码"></vxe-table-column>
				<vxe-table-column field="name" title="角色名称"></vxe-table-column>
				<vxe-table-column field="companyName" title="公司名称"></vxe-table-column>
			</vxe-table>
		</el-card>
	</div>
</template>
<script>
	export default {
		props: {
			roleCon: Object,
			showFig: String
		},
		data() {
			return {
				loading: true,
				formInline: {
					name: "",
					workItemId: ""
				},
				roleList: [],
				roleIds: [],
				rowClick: {},
				conList: [],
				checkCon:false
			}
		},
		computed: {
			//全选 是否不确定状态
			getIndeterminate: function() {
				var con = this.roleList.filter(item => {
					return item.exist == 1
				})
				if(con.length == 0) {
					this.checkCon = false
					return false
				} else {
					if(con.length == this.roleList.length) {
						this.checkCon = true
					} else {
						this.checkCon = false
					}
					return true
				}
			}
		},
		created() {
			this.getRoleList()
		},
		methods: {
			//全选触发
			checkClickAll(checked, $event) {
				if(this.checkCon) {
					this.roleList.forEach(item => {
						item.exist = 1
					})
					if(this.conList.length != 0) {
						this.conList.forEach(item => {
							item.exist = 1
						})
					}
				} else {
					this.roleList.forEach(item => {
						item.exist = 0
					})
					if(this.conList.length != 0) {
						this.conList.forEach(item => {
							item.exist = 0
						})
					}
				}
			},
			//复选框值变化
			checkClick(row) {
				if(row.exist == 1) {
					row.exist = 0
					if(this.conList.length != 0) {
						this.conList.forEach(item => {
							if(item.id == row.id) {
								item.exist = 0
							}
						})
					}
				} else {
					row.exist = 1
					if(this.conList.length != 0) {
						this.conList.forEach(item => {
							if(item.id == row.id) {
								item.exist = 1
							}
						})
					}
				}
			},
			//复选框是否选中
			checkValue(row) {
				if(row.exist == 1) {
					return true
				}
			},
			//全部
			getAll() {
				this.roleList = JSON.parse(JSON.stringify(this.conList))
			},
			//已选中
			getConList() {
				this.roleList = this.roleList.filter(item => {
					return item.exist == 1
				})
			},
			//搜索
			selectList() {
				this.roleList = this.conList.filter(item => (~item.name.indexOf(this.formInline.name)));
			},
			//父组件调用,默认选中项
			check() {
				this.loading = true
				var id = ""
				if(typeof(this.roleCon.id) != "undefined") {
					id = this.roleCon.id
				}
				this.$api.collaborativeOffice.findRoleAuthByWorkItem({
					workItemId: id
				}).then(data => {
					this.loading = false
					this.roleList = data.data.data
					this.conList = JSON.parse(JSON.stringify(this.roleList))
				})
			},
			//确定
			workItemAuthRole() {
				if(typeof(this.roleCon.id) == "undefined" || this.roleCon.id == "") {
					this.goOut("请选择数据")
					return
				}
				this.roleIds = []
				this.conList.forEach(item => {
					if(item.exist == 1) {
						this.roleIds.push(item.id)
					}
				})
				this.$api.collaborativeOffice.apiUrl("workItemAuth/workItemAuthRole", {
					roleIds: this.roleIds,
					workItemId: this.roleCon.id
				}).then(data => {
					if(this.dataBack(data, "授权成功")) {
						this.$parent.$parent.$parent.$parent.refresh()
					}
				})
			},
			//切换维度
			switchChild() {
				this.$parent.$parent.$parent.$parent.$parent.role()
			},
			//首屏加载
			getRoleList() {
				this.$api.collaborativeOffice.findRoleAuthByWorkItem(this.formInline).then(data => {
					this.loading = false
					this.roleList = data.data.data
					this.conList = JSON.parse(JSON.stringify(this.roleList))
				})
			},
			//选中行
			clickRow(row) {
				this.rowClick = row.row
				if(this.showFig == 2) {
					this.$api.collaborativeOffice.findWorkItemByRoleId({
						roleId: row.row.id
					}).then(data => {
						this.$emit("getCon", data.data.data, row.row.id)
					})
				}
			},
			//重置
			clear() {
				this.rowClick = {}
				this.getRoleList()
				this.$emit("getCon", "", "")
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