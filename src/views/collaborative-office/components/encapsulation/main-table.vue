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
							<el-button type="primary" @click="toSelect()">搜索</el-button>
						</el-form-item>
					</el-col>
					<el-col v-if="showFig == 2" :span="8" style="text-align: right;">
						<el-form-item>
							<el-button type="primary" @click="switchChild()">切换维度</el-button>
							<el-button type="primary" @click="roleAuthWorkItem()">确定</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<el-table size="small" highlight-current-row ref="multipleTable" height="700"  @row-click="clickRow" :data="tableData" border @selection-change="handleSelectionChange">
				<el-table-column v-if="showFig == 2" type="selection" width="40" align="center"></el-table-column>
				<el-table-column prop="code" label="主表编码" align="center"></el-table-column>
				<el-table-column prop="name" label="主表名称" align="center"></el-table-column>
				<el-table-column prop="workItemTypeName" label="主表分类" align="center"></el-table-column>
				<el-table-column prop="remark" label="描述" align="center"></el-table-column>
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
				value: "",
				selectData: "",
				formInlineList: [{
					id: "status",
					name: "状态"
				}, {
					id: "code",
					name: "主表编码"
				}, {
					id: "name",
					name: "主表名称"
				}, {
					id: "workItemTypeName",
					name: "主表分类"
				}, {
					id: "remark",
					name: "描述"
				}],
				formInline: {},
				tableData: [],
				selectCon: "",
				toSelectData: {},
				rowClick: {},
				tableList:[]
			}
		},
		created() {
			this.toSelect()
		},
		methods: {
			check() {
				this.$refs.multipleTable.clearSelection();
				this.tableData.filter(item => {
					for(var i = 0; i < this.roleCon.list.length; i++) {
						if(this.roleCon.list[i] == item.id) {
							this.$refs.multipleTable.toggleRowSelection(item);
						}
					}
				})
			},
			roleAuthWorkItem() {
				this.$api.collaborativeOffice.apiUrl("workItemAuth/roleAuthWorkItem", {
					roleId: this.roleCon.id,
					workItemIds: this.tableList
				}).then(data => {
					if(this.dataBack(data, "授权成功")) {
						this.$parent.$parent.$parent.$parent.refresh()
					}
				})
			},
			handleSelectionChange(val) {
				this.tableList = []
				val.forEach(item => {
					this.tableList.push(item.id)
				})
			},
			switchChild() {
				this.$parent.$parent.$parent.$parent.$parent.mainTable()
			},
			selectChange(data) {
				this.selectCon = data.id
				this.toSelectData = {}
				this.toSelectData[data.id] = this.selectData
			},
			//搜索
			toSelect() {
				if(typeof(this.toSelectData[this.selectCon]) != "undefined") {
					this.toSelectData[this.selectCon] = this.selectData
				}
				this.$api.collaborativeOffice.apiUrl("workItemTemp/findByParams", this.toSelectData).then(data => {
					console.log(data)
					this.tableData = data.data.data
				})
			},
			//选中行
			clickRow(row) {
				this.rowClick = row
				if(this.showFig == 1) {
					this.$api.collaborativeOffice.findRoleByWorkItem({
						workItemId: row.id
					}).then(data => {
						console.log(data)
						this.$emit("getCon", data.data.data, row.id)
					})
				}
			},
			clear(){
				this.rowClick = {}
			}
		}
	}
</script>

<style scoped>
	
	.box-card:first-child {
		margin-bottom: 16px;
	}
</style>