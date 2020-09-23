<template>
	<div>
		<el-card class="box-card">
			<el-form style="margin-bottom: 10px;" ref="formInline" label-width="10px" :model="formInline" class="demo-form-inline">
				<el-row>
					<el-col :span="6">
						<el-form-item prop="tname">
							<el-input clearable v-model="formInline.tname" placeholder="用户名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item>
							<el-button type="primary" icon='el-icon-search' size="small" @click="selectList()">搜索</el-button>
							<el-button type="primary" icon='el-icon-refresh' size="small"   @click="$refs.formInline.resetFields();showFig == 1 ? clear2() : clear();">重置</el-button>
							<el-button v-if="showFig == 1" type="primary" icon='el-icon-menu' size="small"   @click="getAll('formInline')">全部</el-button>
							<el-button v-if="showFig == 1" type="success" icon='el-icon-circle-check' size="small"   @click="getConList()">已选中</el-button>
						</el-form-item>
					</el-col>
					<el-col v-if="showFig == 1" :span="8" style="text-align: right;">
						<el-form-item>
							<el-button type="warning" icon="el-icon-sort"  size="small" @click="switchChild()">切换维度</el-button>
							<el-button type="success" icon='el-icon-check' size="small" @click="workItemAuthRole()">确定</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<vxe-table border :loading="loading" ref="multipleTable" align="center" size="small" :highlight-current-row="showFig != 1" @cell-click="clickRow" height="700" :data="roleList">
				<vxe-table-column v-if="showFig == 1" width="60">
					<template v-slot:header>
						<vxe-checkbox v-model="checkCon" :indeterminate="getIndeterminate" @change="checkClickAll()"></vxe-checkbox>
					</template>
					<template v-slot="{ row }">
						<vxe-checkbox @change="checkClick(row)" :value="checkValue(row)"></vxe-checkbox>
					</template>
				</vxe-table-column>
				<vxe-table-column field="tcode" title="用户编码"></vxe-table-column>
				<vxe-table-column field="tname" title="用户名称"></vxe-table-column>
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
					workItemId: ""

				},
				roleList: [],
				roleIds: [],
				rowClick: {},
				conList: [],
				checkCon: false
			}
		},
		computed: {
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
			checkClick(row) {
				if(row.exist == 1) {
					row.exist = 0
					if(this.conList.length != 0) {
						this.conList.forEach(item => {
							if(item.toid == row.toid) {
								item.exist = 0
							}
						})
					}
				} else {
					row.exist = 1
					if(this.conList.length != 0) {
						this.conList.forEach(item => {
							if(item.toid == row.toid) {
								item.exist = 1
							}
						})
					}
				}
			},
			checkValue(row) {
				if(row.exist == 1) {
					return true
				}
			},
			getAll(formInline) {
				this.$refs[formInline].resetFields();
				this.roleList = JSON.parse(JSON.stringify(this.conList))
			},
			getConList() {
				this.roleList = this.roleList.filter(item => {
					return item.exist == 1
				})
			},
			selectList() {
				this.roleList = this.conList.filter(item => (~item.tname.indexOf(this.formInline.tname)));
			},
			check() {
				this.loading = true
				var id = ""
				if(typeof(this.roleCon.id) != "undefined") {
					id = this.roleCon.id
				}
				this.$api.collaborativeOffice.findUserAuthByWorkItem({
					workItemId: id,
					tname: ""
				}).then(data => {
					console.log(data)
					this.loading = false
					this.roleList = data.data.data
					this.conList = JSON.parse(JSON.stringify(this.roleList))
				})
			},
			workItemAuthRole() {
				// debugger;
				if(typeof(this.roleCon.id) == "undefined" || this.roleCon.id == "") {
					this.goOut("请选择数据")
					return
				}
				this.roleIds = []
				this.conList.forEach(item => {
					if(item.exist == 1) {
						this.roleIds.push(item.toid)
					}
				})
				const loading = this.$loading({
					lock: true,
					text: '授权中',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.3)'
				});
				this.$api.collaborativeOffice.apiUrl("workItemAuthUser/authUserToWorkItem", {
					userIdList: this.roleIds,
					workItemId: this.roleCon.id
				}).then(data => {
					console.log(data)
					loading.close();
					if(this.dataBack(data, "授权成功")) {
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
					this.roleList = data.data.data
					this.conList = JSON.parse(JSON.stringify(this.roleList))
				})
			},
			//选中行
			clickRow(row) {
				this.rowClick = row.row;
				if(this.showFig == 2) {
					this.$api.collaborativeOffice.apiUrl("workItemTemp/findByParams", {
						"name": "",
						"status": 3
					}).then(data => {
						this.conList = data.data.data
						let tableDataAll = JSON.parse(JSON.stringify(this.conList));
						this.tableAllData = tableDataAll;
					})
					this.$api.collaborativeOffice.findWorkItemByUser({
						userId: row.row.toid
					}).then(data => {
						this.$emit("getCon", data.data.data, row.row.toid, this.tableAllData)
					})
				}
			},
			clear() {
				this.rowClick = {}
				this.getRoleList()
				this.$emit("getCon", "", "")
			},
			clear2() {
				this.rowClick = {}
				this.getRoleList()
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
