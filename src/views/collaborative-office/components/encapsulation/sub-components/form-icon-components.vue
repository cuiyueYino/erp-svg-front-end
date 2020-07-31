<template>
	<div>
		<div v-if="showFig == 'organization' " class="treeDivClass">
			<el-tree @check-change="handleClick" show-checkbox ref="treeDialogVisible" highlight-current :data="dataCon.context" :props="defaultProps" node-key="foid" accordion></el-tree>
		</div>

		<div v-if="showFig == 'personnel'" style="margin-bottom: 40px;">
			<el-form label-width="80px" :inline="true" ref="formInlineTName" :model="formInlineTName" class="demo-form-inline">
				<el-form-item label="名称：" prop="tname">
					<el-input clearable v-model="formInlineTName.tname" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item label="部门：" prop="departmentname">
					<el-input clearable v-model="formInlineTName.departmentname" placeholder="部门"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="toSelect">搜索</el-button>
					<el-button type="primary" plain @click="resetForm('formInlineTName')" class="search-all">重置</el-button>
				</el-form-item>
			</el-form>
			<el-table :row-class-name="tableRowClassName" @row-click="clickRow" :data="dataCon.context" border>
				<el-table-column prop="tname" label="名称" align="center"></el-table-column>
				<el-table-column prop="tcompanyname" label="公司" align="center"></el-table-column>
				<el-table-column prop="tdepartmentname" label="部门" align="center"></el-table-column>
				<el-table-column prop="ffirmpositionname" label="职位" align="center"></el-table-column>
				<el-table-column :formatter="trueFalse" prop="fpositionstate" label="在职状态" align="center"></el-table-column>
				<el-table-column :formatter="trueFalse" prop="tispluralism" label="是否兼职" align="center"></el-table-column>
				<el-table-column prop="tdescription" label="描述" align="center"></el-table-column>
			</el-table>
			<pageNation :total="dataCon.currentTotal" ref="pageNation" @pageChange="pageChange"></pageNation>
		</div>

		<div v-if="showFig == 'user'" style="margin-bottom: 40px;">
			<el-form label-width="80px" :inline="true" ref="formInlineTNameUser" :model="formInlineTNameUser" class="demo-form-inline">
				<el-form-item label="名称：" prop="tname">
					<el-input clearable v-model="formInlineTNameUser.fname" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item label="部门：" prop="departmentname">
					<el-input clearable v-model="formInlineTNameUser.departmentname" placeholder="部门"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="toSelect">搜索</el-button>
					<el-button type="primary" plain @click="resetForm('formInlineTNameUser')" class="search-all">重置</el-button>
				</el-form-item>
			</el-form>
			<el-table :row-class-name="tableRowClassName" @row-click="clickRow" :data="dataCon.context" border>
				<el-table-column prop="fname" label="名称" align="center"></el-table-column>
				<el-table-column prop="fcompanyoid" label="公司" align="center"></el-table-column>
				<el-table-column prop="departmentname" label="部门" align="center"></el-table-column>
				<el-table-column prop="fremark" label="描述" align="center"></el-table-column>
			</el-table>
			<pageNation :total="dataCon.currentTotal" ref="pageNation" @pageChange="pageChange"></pageNation>
		</div>

		<div v-if="showFig == 'jobSet'" style="margin-bottom: 40px;">
			<el-form label-width="80px" :inline="true" ref="formInlineTNameJob" :model="formInlineTNameJob" class="demo-form-inline">
				<el-form-item label="编码：" prop="tname">
					<el-input clearable v-model="formInlineTNameJob.fcode" placeholder="编码"></el-input>
				</el-form-item>
				<el-form-item label="名称：" prop="departmentname">
					<el-input clearable v-model="formInlineTNameJob.fname" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="toSelect">搜索</el-button>
					<el-button type="primary" plain @click="resetForm('formInlineTNameJob')" class="search-all">重置</el-button>
				</el-form-item>
			</el-form>
			<el-table :row-class-name="tableRowClassName" @row-click="clickRow" :data="dataCon.context" border>
				<el-table-column prop="fcode" label="编码" align="center"></el-table-column>
				<el-table-column prop="fname" label="名称" align="center"></el-table-column>
				<el-table-column prop="fremark" label="描述" align="center"></el-table-column>
			</el-table>
			<pageNation :total="dataCon.currentTotal" ref="pageNation" @pageChange="pageChange"></pageNation>
		</div>
	</div>
</template>

<script>
	import pageNation from '../../pageNation';
	export default {
		components: {
			pageNation
		},
		props: {
			showFig: {
				type: String,
				required: true
			},
			dataCon: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				//公司部门职位 tree 默认显示值
				defaultProps: {
					children: 'children',
					label: 'fname'
				},
				//人员搜索
				formInlineTName: {
					tname: "",
					departmentname: "",
					page: 1,
					size: 10
				},
				//用户搜索
				formInlineTNameUser: {
					fname: "",
					departmentname: "",
					page: 1,
					size: 10
				},
				//职务搜索
				formInlineTNameJob: {
					fcode: "",
					fname: "",
					page: 1,
					size: 10
				},
				//返回变量
				backCon: {
					label: "",
					value: ""
				}
			};
		},
		mounted() {},
		methods: {
			trueFalse(row, column, cellValue, index) {
				if(cellValue == 0) {
					return "否"
				} else {
					return "是"
				}
			},
			//查询
			toSelect() {
				var url = ""
				var con = {}
				switch(this.showFig) {
					case "personnel":
						url = "staffManage/findStaffByPage"
						con = this.formInlineTName
						break;
				}
				switch(this.showFig) {
					case "user":
						url = "userManage/findUserBypage"
						con = this.formInlineTNameUser
						break;
				}
				switch(this.showFig) {
					case "jobSet":
						url = "positionmnt/findPositionList"
						con = this.formInlineTNameJob
						break;
				}
				this.$api.collaborativeOffice.findConList(url, con).then(data => {
					this.dataCon.context = data.data.data.rows
					this.currentTotal = data.data.data.total
				})
			},
			//分页
			pageChange(pageIndex) {
				this.formInlineTName.page = pageIndex;
				this.formInlineTNameUser.page = pageIndex;
				this.formInlineTNameJob.page = pageIndex;
				this.toSelect()
			},
			//清空
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.toSelect()
			},
			//公司部门职位 tree选中
			handleClick(data, checked, node) {
				if(checked) {
					this.$refs.treeDialogVisible.setCheckedNodes([data]);
					if(this.$refs.treeDialogVisible.getCheckedNodes(true).length > 1) {
						this.goOut("清单选")
					} else {
						this.backCon.value = this.$refs.treeDialogVisible.getCheckedNodes(true)[0].foid
						this.backCon.label = this.$refs.treeDialogVisible.getCheckedNodes(true)[0].fname
					}
				}
			},
			// 选中背景色
			tableRowClassName({
				row,
				rowIndex
			}) {
				var color = ""
				if(this.showFig == "user" || this.showFig == "jobSet") {
					if(row.foid == this.backCon.value) {
						color = "warning-row"
					}
				} else if(this.showFig == "personnel") {
					if(row.toid == this.backCon.value) {
						color = "warning-row"
					}
				}
				return color;
			},
			//选中行
			clickRow(row) {
				if(this.showFig == "user" || this.showFig == "jobSet") {
					this.backCon.label = row.fname
					this.backCon.value = row.foid
				} else if(this.showFig == "personnel") {
					this.backCon.label = row.tname
					this.backCon.value = row.toid
				}
			},
		}
	};
</script>

<style scoped>
	.treeDivClass {
		height: 600px;
		overflow: auto;
	}
	
	.el-table>>>.warning-row {
		background-color: #ffe48d;
	}
</style>