<template>
	<div>
		<el-card class="box-card">
			<el-form label-width="10px" :model="formInline" class="demo-form-inline">
				<el-row>
					<el-col :span="7">
						<el-form-item>
							<el-select style="width: 100%;" clearable @change="selectChange" v-model="value" value-key="id">
								<el-option v-for="item in formInlineList" :key="item.id" :label="item.name" :value="item">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item>
							<el-input clearable v-model="selectData"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="2">
						<el-form-item>
							<el-button type="primary" @click="getRoleList()">搜索</el-button>
						</el-form-item>
					</el-col>
					<el-col v-if="showFig == 1" :span="8" style="text-align: right;">
						<el-form-item>
							<el-button type="primary" @click="switchChild()">切换维度</el-button>
							<el-button type="primary" @click="workItemAuthRole()">确定</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
		<el-card class="box-card">
			<el-table ref="multipleTable" :row-class-name="tableRowClassName" @row-click="clickRow" :data="roleList" border @selection-change="handleSelectionChange">
				<el-table-column v-if="showFig == 1" type="selection" width="40" align="center"></el-table-column>
				<el-table-column prop="code" label="角色编码" align="center"></el-table-column>
				<el-table-column prop="name" label="角色名称" align="center"></el-table-column>
				<el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
			</el-table>
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
				formInline: {},
				tableData: [],
				currentTotal: 0,
				roleList: [],
				medianValue: {},
				value: "",
				selectData: "",
				formInlineList: [{
					id: "code",
					name: "角色编码"
				}, {
					id: "name",
					name: "角色名称"
				}, {
					id: "companyName",
					name: "公司名称"
				}],
				selectCon: "",
				toSelectData: {},
				roleIds: [],
				rowClick: {},
			}
		},
		created() {
			this.getRoleList()
		},
		methods: {
			check() {
				this.$refs.multipleTable.clearSelection();
				this.roleList.filter(item => {
					for(var i = 0; i < this.roleCon.list.length; i++) {
						if(this.roleCon.list[i] == item.id) {
							this.$refs.multipleTable.toggleRowSelection(item);
						}
					}
				})
			},
			workItemAuthRole() {
				this.$api.collaborativeOffice.apiUrl("workItemAuth/workItemAuthRole", {
					roleIds: this.roleIds,
					workItemId: this.roleCon.id
				}).then(data => {
					if(this.dataBack(data, "授权成功")) {
						this.$parent.$parent.$parent.$parent.refresh()
					}
				})
			},
			switchChild() {
				this.$parent.$parent.$parent.$parent.$parent.role()
			},
			handleSelectionChange(val) {
				this.roleIds = []
				val.forEach(item => {
					this.roleIds.push(item.id)
				})
			},
			selectChange(data) {
				this.selectCon = data.id
				this.toSelectData = {}
				this.toSelectData[data.id] = this.selectData
			},
			getRoleList() {
				this.$api.collaborativeOffice.apiUrl("role/findByParams", this.toSelectData).then(data => {
					console.log(data)
					this.roleList = data.data.data
				})
			},
			// 选中背景色
			tableRowClassName({
				row,
				rowIndex
			}) {
				var color = ""
				if(row.id == this.rowClick.id) {
					color = "warning-row"
				}
				if(this.showFig == 2) {
					return color;
				}
			},
			//选中行
			clickRow(row) {
				this.rowClick = row
				if(this.showFig == 2) {
					this.$api.collaborativeOffice.findWorkItemByRoleId({
						roleId: row.id
					}).then(data => {
						this.$emit("getCon", data.data.data, row.id)
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
	.el-table>>>.warning-row {
		background-color: #ffe48d;
	}
	
	.box-card:first-child {
		margin-bottom: 16px;
	}
</style>