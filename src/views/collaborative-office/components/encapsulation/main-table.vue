<template>
	<div>
		<el-card class="box-card">
			<el-form style="margin-bottom: 10px;" ref="formInline" label-width="10px" :model="formInline" class="demo-form-inline">
				<el-row>
					<el-col :span="6">
						<el-form-item prop="name">
							<el-input clearable v-model="formInline.name" placeholder="主表名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item>
							<el-button type="primary" icon='el-icon-search' size="small" @click="toSelect()">搜索</el-button>
							<el-button type="primary" icon='el-icon-refresh' size="small" plain @click="$refs.formInline.resetFields();showFig == 2 ? clear2() : clear();">重置</el-button>
							<el-button v-if="showFig == 2" type="primary" icon='el-icon-menu' size="small" plain @click="getAll('formInline')">全部</el-button>
							<el-button v-if="showFig == 2" type="success" icon='el-icon-circle-check' size="small" plain @click="getConList()">已选中</el-button>
						</el-form-item>
					</el-col>
					<el-col v-if="showFig == 2" :span="8" style="text-align: right;">
						<el-form-item>
							<el-button type="warning" icon="el-icon-sort"  size="small" @click="switchChild()">切换维度</el-button>
							<el-button type="success" icon='el-icon-check' size="small" @click="roleAuthWorkItem()">确定</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<vxe-table border ref="multipleTable" align="center" size="small" :highlight-current-row="showFig != 2" @cell-click="clickRow" height="700" :data="tableData">
				<vxe-table-column v-if="showFig == 2" type="checkbox" width="60"></vxe-table-column>
				<vxe-table-column field="code" title="主表编码"></vxe-table-column>
				<vxe-table-column field="name" title="主表名称"></vxe-table-column>
				<vxe-table-column field="workItemTypeName" title="主表分类"></vxe-table-column>
				<vxe-table-column :formatter="textLength" field="remark" title="描述"></vxe-table-column>
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
				formInline: {
					name: '',
                    status: 3,
				},
				tableData: [],
				selectCon: "",
				toSelectData: {},
				rowClick: {},
				tableList: [],
				conList: []
			}
		},
		created() {
			this.toSelect()
		},
		methods: {
			getAll(formInline) {
				this.$refs[formInline].resetFields();
				this.$api.collaborativeOffice.apiUrl("workItemTemp/findByParams", this.formInline).then(data => {
					this.conList = data.data.data
					this.tableData = JSON.parse(JSON.stringify(this.conList))
				})

				// var list = JSON.parse(JSON.stringify(this.$refs.multipleTable.getCheckboxRecords()))
				// this.tableData = JSON.parse(JSON.stringify(this.conList))
				// this.tableData.forEach((item, index) => {
				// 	list.forEach(val => {
				// 		if(val.id == item.id) {
				// 			this.$refs.multipleTable.toggleCheckboxRow(this.tableData[index]);
				// 		}
				// 	})
				// })
			},
			getConList() {
				this.tableData = []
				this.tableData = this.$refs.multipleTable.getCheckboxRecords()

			},
            //描述显示
            textLength(row){
                if(row.cellValue!=null&&row.cellValue.length>8) {
                    return row.cellValue.substring(0,8)+"...";
                }else {
                    return row.cellValue;
                }
            },
			check() {
				this.$refs.multipleTable.setAllCheckboxRow(false);
				this.tableData = this.roleCon.allData;
				this.tableData.forEach((item, index) => {
					for(var i = 0; i < this.roleCon.list.length; i++) {
						if(this.roleCon.list[i] == item.id) {
							this.$refs.multipleTable.toggleCheckboxRow(this.tableData[index]);
						}
					}
				})
			},
			roleAuthWorkItem() {
				if(typeof(this.roleCon.id) == "undefined" || this.roleCon.id == "") {
					this.goOut("请选择数据")
					return
				}
				this.tableList = []
				this.$refs.multipleTable.getCheckboxRecords().forEach(item => {
					this.tableList.push(item.id)
				})
				if(this.$parent.$parent.$parent.$parent.$parent.tabViews == "PersonnelToMainTable") {
					this.$api.collaborativeOffice.apiUrl("workItemAuthUser/authWorkItemToUser", {
						userId: this.roleCon.id,
						itemIdList: this.tableList
					}).then(data => {
						if(this.dataBack(data, "授权成功")) {
							this.$parent.$parent.$parent.$parent.refresh()
						}
					})
				} else {
					this.$api.collaborativeOffice.apiUrl("workItemAuth/roleAuthWorkItem", {
						roleId: this.roleCon.id,
						workItemIds: this.tableList
					}).then(data => {
						if(this.dataBack(data, "授权成功")) {
							this.$parent.$parent.$parent.$parent.refresh()
						}
					})
				}

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
				this.$api.collaborativeOffice.apiUrl("workItemTemp/findByParams", this.formInline).then(data => {
					this.conList = data.data.data
					this.tableData = JSON.parse(JSON.stringify(this.conList))
				})
			},
			//选中行
			clickRow(row) {
				if(row.row.id != this.rowClick.id) {
					this.rowClick = row.row
					if(this.showFig == 1) {
						if(this.$parent.$parent.$parent.$parent.$parent.tabViews == "mainTableToPersonnel") {
							this.$emit("getCon", row.row.id)
						} else {
							this.$emit("getCon", row.row.id)

						}
					}
				}
			},
			clear() {
				this.rowClick = {}
				this.toSelect()
				this.$emit("getCon", "", "")
			},
			clear2() {
				this.rowClick = {}
				this.toSelect()
//				this.$emit("getCon", "", "")
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
