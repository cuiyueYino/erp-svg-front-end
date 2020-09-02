<!--
	预览页面弹出框显示内容 -- 孟鹏飞
	2020-07-31
	
	传入参数：
	showFig  展示内容（ 1. organization 公司，部门，职位树状图   2. personnel 人员table   3. user 用户table  4.职务table
	dataCon  展示数据
-->

<template>
	<div>
		<div v-if="showFig == 'organization' " class="treeDivClass">
			<el-tree :default-checked-keys="dataCon.echo" :default-expanded-keys="dataCon.echo" show-checkbox ref="treeDialogVisible" highlight-current :data="dataCon.context" :props="defaultProps" node-key="foid" accordion></el-tree>
		</div>
		<div v-if="showFig == 'personnel'" style="margin-bottom: 40px;">
			<el-form label-width="80px" :inline="true" ref="formInlineTName" :model="formInlineTName" class="demo-form-inline">
				<el-form-item label="名称：" prop="tname">
					<el-input clearable v-model="formInlineTName.tname" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="toSelect">搜索</el-button>
					<el-button type="primary" plain @click="resetForm('formInlineTName')" class="search-all">重置</el-button>
				</el-form-item>
			</el-form>
			<vxe-table border :loading="loading" ref="multipleTable" align="center" size="small" highlight-current-row  height="380" :data="dataCon.context">
				<vxe-table-column type="checkbox" width="60"></vxe-table-column>
				<vxe-table-column field="tcode" title="人员编码"></vxe-table-column>
				<vxe-table-column field="tname" title="人员名称"></vxe-table-column>
				<vxe-table-column field="tcompanyname" title="公司名称"></vxe-table-column>
			</vxe-table>
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
			<vxe-table border :loading="loading" ref="multipleTable" align="center" size="small" highlight-current-row height="600" :data="dataCon.context">
				<vxe-table-column type="checkbox" width="60"></vxe-table-column>
				<vxe-table-column field="fname" title="名称"></vxe-table-column>
				<vxe-table-column field="fcompanyname" title="公司"></vxe-table-column>
				<vxe-table-column field="departmentname" title="部门"></vxe-table-column>
				<vxe-table-column field="fremark" title="描述"></vxe-table-column>
			</vxe-table>
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
			<vxe-table border :loading="loading" ref="multipleTable" align="center" size="small" highlight-current-row height="600" :data="dataCon.context">
				<vxe-table-column type="checkbox" width="60"></vxe-table-column>
				<vxe-table-column field="fcode" title="编码"></vxe-table-column>
				<vxe-table-column field="fname" title="名称"></vxe-table-column>
				<vxe-table-column field="fremark" title="描述"></vxe-table-column>
			</vxe-table>
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
				loading: true,
				//公司部门职位 tree 默认显示值
				defaultProps: {
					children: 'children',
					label: 'fname'
				},
				//人员搜索
				formInlineTName: {
					tname: ""
				},
				//用户搜索
				formInlineTNameUser: {
					fname: "",
					departmentname: "",
					page: 1,
					size: 100000
				},
				//职务搜索
				formInlineTNameJob: {
					fcode: "",
					fname: "",
					page: 1,
					size: 100000
				},
				//返回变量
				backCon: {
					label: "",
					value: ""
				}
			};
		},
		created() {
			if(this.showFig == "personnel") {
				this.loading = true
				this.dataCon.context = []
				this.$api.collaborativeOffice.findConList("staffManage/findStaffsNoPage", {}).then(data => {
					this.$set(this.dataCon, "context", data.data.data)
					this.loading = false
				})
			} else if(this.showFig == "user") {
				this.dataCon.context = []
				this.loading = true
				this.$api.collaborativeOffice.findConList("userManage/findUserBypage", {
					page: 1,
					size: 100000
				}).then(data => {
					this.$set(this.dataCon, "context", data.data.data.rows)
					this.loading = false
				})
			} else if(this.showFig == "jobSet") {
				this.dataCon.context = []
				this.loading = true
				this.$api.collaborativeOffice.findConList("positionmnt/findPositionList", {
					page: 1,
					size: 100000
				}).then(data => {
					this.$set(this.dataCon, "context", data.data.data.rows)
					this.loading = false
				})
			}
		},
		methods: {
			//查询
			toSelect() {
				var url = ""
				var con = {}
				switch(this.showFig) {
					//人员
					case "personnel":
						url = "staffManage/findStaffsNoPage"
						con = this.formInlineTName
						this.$api.collaborativeOffice.findConList(url, con).then(data => {
							this.dataCon.context = data.data.data
						})
						break;
						//用户
					case "user":
						url = "userManage/findUserBypage"
						con = this.formInlineTNameUser
						this.$api.collaborativeOffice.findConList(url, con).then(data => {
							this.dataCon.context = data.data.data.rows
						})
						break;
						//职务
					case "jobSet":
						url = "positionmnt/findPositionList"
						con = this.formInlineTNameJob
						this.$api.collaborativeOffice.findConList(url, con).then(data => {
							this.dataCon.context = data.data.data.rows
						})
						break;
				}
			},
			//清空
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.toSelect()
			},
			getDataBack() {
				//公司/部门/职位
				if(this.showFig == 'organization') {
					return this.$refs.treeDialogVisible.getCheckedNodes().filter(item =>{
						return typeof(item.children) == "undefined" || item.children.length == 0
					})
					//人员
				} else if(this.showFig == "personnel" || this.showFig == "user" || this.showFig == "jobSet") {
					return this.$refs.multipleTable.getCheckboxRecords()
				}
			},
		}
	}
</script>

<style scoped>
	
	.treeDivClass {
		overflow: auto;
	}
	
	>>>.el-dialog__body {
		border-bottom: 1px solid #dcdfe6;
		min-height: calc(100vh - 300px);
		overflow-y: auto;
	}
</style>