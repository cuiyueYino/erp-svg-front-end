<template>
	<div>
		<!-- 搜索框 -->
		<el-card class="box-card">
			<el-row :gutter="24">
				<el-col :span="18">
					<el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
						<el-col :span="3">
							<el-form-item prop="select">
								<el-select v-model="form.select" placeholder="请选择">
									<el-option label="名称" value="tname"></el-option>
									<el-option label="编码" value="tcode"></el-option>
									<el-option label="职位" value="ffirmpositionname"></el-option>
									<el-option label="描述" value="tdescription"></el-option>
									<el-option label="公司" value="tcompanyname"></el-option>
									<el-option label="部门" value="tdepartmentname"></el-option>
									<el-option label="在职状态" value="fpositionstate"></el-option>
									<el-option label="是否兼职" value="tispluralism"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-form-item prop="selectFormVal">
							<el-input clearable v-model="form.selectFormVal" placeholder="请输入任意查询内容"></el-input>
						</el-form-item>

						<el-form-item>
							<el-button type="primary" icon='el-icon-search' size="small" plain @click="showFig = false;onSubmit()">搜索</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" icon="el-icon-tickets" size="small" plain @click="showFig = false;resetForm('form')" class="search-all">显示全部信息</el-button>
						</el-form-item>
					</el-form>
				</el-col>
				<el-col :span="6" style="text-align: right;">
					<el-button type="success" icon="el-icon-folder-add" size="small" plain @click="add()">新增</el-button>
					<el-button type="danger" plain icon="el-icon-delete" size="small" @click="deleteMsg">删除</el-button>
					<el-button type="warning" plain icon="el-icon-document-copy" size="small" @click="toEdit('编辑')">编辑</el-button>
				</el-col>
			</el-row>
		</el-card>
		<!-- 表格 -->
		<el-card class="box-card">
			<dynamic-table :columns="columns" :table-data="tableData" :total="total" :page-num="pageNum" :page-size="pageSize" @current-change="onCurrentChange" @selection-change="onSelectionChange" v-loading="false" element-loading-text="加载中"></dynamic-table>
		</el-card>
		<!-- 弹出框 -->
		<erpDialog erpDialogwidth="false" :title="isEdit?'编辑人员':'新建人员'" :dialogShow="dialogFormVisible">
			<el-form :model="peopleForm" :rules="rules" ref="peopleForm">
				<el-row :gutter="22">
					<el-col :span="11">
						<el-form-item label="公司：" :label-width="formLabelWidth" class="pop-select" prop="tcompanyoid">
							<el-select v-model="peopleForm.tcompanyoid" @change="getTcompanyo" size="small" clearable placeholder="请选择">
								<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="在职状态：" :label-width="formLabelWidth" class="pop-select" prop="fpositionstate">
							<el-select v-model="peopleForm.fpositionstate" size="small" clearable placeholder="请选择">
								<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="部门：" :label-width="formLabelWidth" prop="tdepartmentname">
							<el-row>
								<el-col :span="21">
									<el-input v-model="peopleForm.tdepartmentname" size="small" autocomplete="off"></el-input>
								</el-col>
								<el-col :span="3">
									<el-button type="primary" size="mini" icon="el-icon-search" @click="baseInputData('选择部门')"></el-button>
								</el-col>
							</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="11">
						<el-form-item label="编码：" :label-width="formLabelWidth" prop="tcode">
							<el-input v-model="peopleForm.tcode" size="small" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="名称：" :label-width="formLabelWidth" prop="tname">
							<el-input v-model="peopleForm.tname" size="small" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="职位：" :label-width="formLabelWidth" prop="ffirmpositionname">
							<el-row>
								<el-col :span="21">
									<el-input v-model="peopleForm.ffirmpositionname" size="small" autocomplete="off"></el-input>
								</el-col>
								<el-col :span="3">
									<el-button type="primary" size="mini" icon="el-icon-search" @click="baseInputData('选择职位')"></el-button>
								</el-col>
							</el-row>
						</el-form-item>
					</el-col>
					<el-col :span="22">
						<el-form-item label="描述：" :label-width="formLabelWidth">
							<el-input type="textarea" v-model="peopleForm.tdescription"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<h4>兼职记录</h4>
			<el-divider></el-divider>
			<el-form style="margin-top: 10px;" :model="peopleForm" :rules="rulesTable" ref="peopleFormOther">
				<el-table size="small" height="300" :data="peopleForm.tableData3" border style="width: 100%">
					<el-table-column prop="fcompanyoid" label="公司" align="center">
						<template slot-scope="scope">
							<el-form-item :prop="'tableData3[' + scope.$index + '].fcompanyoid'" :rules="rulesTable.fcompanyoid">
								<el-select style="width: 100%;" v-model="scope.row.fcompanyoid" @change="getTcompanyo2(scope.row)" size="small" clearable placeholder="请选择">
									<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column prop="fdepartmentname" label="部门" align="center">
						<template slot-scope="scope">
							<el-form-item :prop="'tableData3[' + scope.$index + '].fdepartmentname'" :rules="rulesTable.fdepartmentname">
								<el-input disabled v-model="scope.row.fdepartmentname">
									<el-button @click="baseInputData2('选择部门',scope.row)" slot="append" icon="el-icon-search"></el-button>
								</el-input>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column prop="ffirmpositionname" label="职位" align="center">
						<template slot-scope="scope">
							<el-form-item :prop="'tableData3[' + scope.$index + '].ffirmpositionname'" :rules="rulesTable.ffirmpositionname">
								<el-input disabled v-model="scope.row.ffirmpositionname">
									<el-button @click="baseInputData2('选择职位',scope.row)" slot="append" icon="el-icon-search"></el-button>
								</el-input>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column prop="orderNum" label="生效" align="center" width="70">
						<template slot-scope="scope">
							<el-form-item :prop="'tableData3[' + scope.$index + '].fiseffective'">
								<el-checkbox true-label="1" false-label="0" v-model="scope.row.fiseffective" size="small"></el-checkbox>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column align="right" width="100">
						<template slot="header" slot-scope="scope">
							<el-button type="success" icon="el-icon-folder-add" size="small" plain @click="addRow()">新增</el-button>
						</template>
						<template slot-scope="scope">
							<el-button type="danger" plain icon="el-icon-delete" size="small" @click="peopleForm.tableData3.splice(scope.$index, 1)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-form>
			<div slot="footer">
				<el-button type="success" icon='el-icon-copy-document' size="small" @click="addSubmit('peopleForm')">保存</el-button>
				<el-button type='warning' icon='el-icon-close' size="small" @click="dialogFormVisible = false">取消</el-button>
				
			</div>
		</erpDialog>
		<!-- 部门/职位弹窗 -->
		<erpDialog erpDialogwidth="false" :title="choseDepart" :dialogShow="userVisible">
			<!-- 树状图 -->
			<el-tree class="filter-tree" :data="treeData" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick"></el-tree>
			<div slot="footer">
				<el-button type='success' size="small" icon='el-icon-check' @click="addDepart()">确定</el-button>
				<el-button type='warning' icon='el-icon-close' size="small" @click="userVisible = false">取消</el-button>
			</div>
		</erpDialog>
	</div>
</template>

<script>
	import DynamicTable from "../../components/common/dytable/dytable.vue";
	export default {
		name: "peopleSet",
		data() {
			return {
				//校验规则-table
				rulesTable: {
					fcompanyoid: [{
						required: true,
						message: "请选择公司",
						trigger: "change"
					}],
					fdepartmentname: [{
						required: true,
						message: "请选择部门",
						trigger: "change"
					}],
					ffirmpositionname: [{
						required: true,
						message: "请选择职位",
						trigger: "change"
					}],
				},
				show: false,
				showFig: true,
				dialogFormVisible: false,
				userVisible: false,
				isEdit: false,
				searchflag: false,
				treeData: [],
				defaultProps: {
					children: "children",
					label: "label"
				},
				pageNum: 1,
				pageSize: 10,
				total: 20,
				columns: [{
						type: "selection"
					},
					{
						key: "tcode",
						title: "编码"
					},
					{
						key: "tname",
						title: "名称"
					},
					{
						key: "tdepartmentname",
						title: "部门"
					},
					{
						key: "ffirmpositionname",
						title: "职位"
					},
					{
						key: "fpositionstate",
						title: "在职状态"
					},
					{
						key: "tispluralism",
						title: "是否兼职"
					},
					{
						key: "tdescription",
						title: "描述"
					}
				],
				editFormData: [],
				tableData: [],
				tableData3: [],
				getTreeData: [],
				multipleSelection: [],
				form: {
					select: [],
					selectVal: "",
					selectFormVal: '',
				},
                reqSelect:[],
				peopleForm: {
					ffirmpositionname: '',
					tcompanyoid: "",
					fpositionstate: "",
					tdepartmentname: "",
					tname: "",
					tcode: "",
					ffirmposition: "",
					tdescription: "",
					tableData3: []
				},
				options: [],
				options2: [{
						label: '在职',
						value: '1'
					},
					{
						label: '离职',
						value: '0'
					},
				],
				choseDepart: "",
				formLabelWidth: "120px",
				rules: {
					tcompanyoid: [{
						required: true,
						message: "请选择公司",
						trigger: "change"
					}],
					fpositionstate: [{
						required: true,
						message: "请选择在职状态",
						trigger: "change"
					}],
					tcode: [{
							required: true,
							message: "请输入编码",
							trigger: "blur"
						},
						{
							min: 1,
							max: 100,
							message: "长度在 1 到 50 个字符",
							trigger: "blur"
						}
					],
					tname: [{
							required: true,
							message: "请输入名称",
							trigger: "blur"
						},
						{
							min: 1,
							max: 100,
							message: "长度在 1 到 50 个字符",
							trigger: "blur"
						}
					],
					tdepartmentname: [{
						required: true,
						message: "请选择部门",
						trigger: "change"
					}],
					ffirmpositionname: [{
						required: true,
						message: "请选择职位",
						trigger: "change"
					}]
				}
			};
		},
		components: {
			DynamicTable
		},
		created() {
			this.$nextTick(() => {
				this.getTableData("页面初期化");
				this.getCompany()
			});
		},
		watch: {
			dialogFormVisible(val) {
				switch(val) {
					case false:
						this.$refs['peopleForm'].resetFields();
						break;

					default:
						break;
				}
			},
			"peopleForm.tdepartmentname": {
				handler(val, oldval) {
					if(val == "") {
						this.peopleForm.tdepartmentoid = ""
					}
					if(!(this.noNull(oldval) && !this.noNull(val))) {
						this.peopleForm.ffirmpositionname = ""
					}
				},
				deep: true
			},
		},
		methods: {
			addRow() {
				this.peopleForm.tableData3.push({
					fdepartmentoid: "",
					fcompanyoid: "",
					ffirmposition: "",
					fiseffective: '',
					fcompanyname: '',
					fdepartmentname: '',
					ffirmpositionname: ''
				})
			},
			getTcompanyo(a) {
				if(a == "") {
					this.peopleForm.tcompanyoid = ""
					this.peopleForm.tdepartmentoid = ""
				}
				this.peopleForm.ffirmpositionname = ""
				this.peopleForm.tdepartmentname = ""
			},
			getTcompanyo2(row) {
				row.fdepartmentname = ""
				row.ffirmpositionname = ""
				this.options.forEach(item => {
					if(item.id == row.fcompanyoid) {
						row.fcompanyname = item.name
					}
				})
			},
			filterNode(value, data) {
				if(!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			baseInputData(Str) {
				this.userVisible = true;
				this.choseDepart = Str;
				this.show = false
				switch(Str) {
					case '选择部门':
						this.searchDepart()
						break;
					case '选择职位':
						this.searchPosition()
						break;

					default:
						break;
				}
			},
			baseInputData2(Str, row) {
				this.rowNow = row
				this.userVisible = true;
				this.choseDepart = Str;
				this.show = true
				switch(Str) {
					case '选择部门':
						this.searchDepart(1, row.fcompanyoid)
						break;
					case '选择职位':
						this.searchPosition(1, row.fdepartmentoid)
						break;

					default:
						break;
				}
			},
			//部门
			searchDepart(a, id) {
				// debugger;
				var data = {};
				if(a) {
					data = id
				} else {
					data = this.peopleForm.tcompanyoid
				}
				this.$api.jobUserManagement.getDepartData(data).then(res => {
					if(res.status == '200') {
						this.treeData = []
						this.getTreeData = res.data.data.rows; //console.log( this.getTreeData)
						this.getTreeData.forEach((item, index) => {
							this.treeData.push({
								label: item.fname,
								foid: item.foid,
							})
						})
					}
				}), error => {}
			},
			//职位
			searchPosition(a, id) {
				var data
				if(a) {
					data = id
				} else {
					data = this.peopleForm.tdepartmentoid
				}
				this.$api.jobUserManagement.getPositonData(data).then(res => {
					if(res.status == '200') {
						this.treeData = [];
						this.getTreeData = res.data.data.rows; //console.log( this.getTreeData)
						this.getTreeData.forEach((item, index) => {
							this.treeData.push({
								label: item.fname,
								foid: item.foid,
							})
						})
					}
				}), error => {
					console.log(error);
				}

			},
			addDepart() {
				this.userVisible = false;
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.searchflag=false;
				this.pageNum = 1;
				this.getTableData("");
			},
			handleNodeClick(data) {
				if(this.show) {
					switch(this.choseDepart) {
						case '选择部门':
							this.rowNow.fdepartmentname = data.label
							this.rowNow.fdepartmentoid = data.foid
							this.rowNow.ffirmpositionoid = ""
							this.rowNow.ffirmpositionname = ""
							break;
						case '选择职位':
							this.rowNow.ffirmpositionname = data.label
							this.rowNow.ffirmposition = data.foid
							break;

						default:
							break;
					}
				} else {
					switch(this.choseDepart) {
						case '选择部门':
							this.peopleForm.tdepartmentname = data.label
							this.peopleForm.tdepartmentoid = data.foid
							break;
						case '选择职位':
							this.peopleForm.ffirmpositionname = data.label
							this.peopleForm.ffirmposition = data.foid
							break;

						default:
							break;
					}
				}
			},
			//多选
			onSelectionChange(val) {
				console.log(val, this.multipleSelection)
				this.multipleSelection = val;
				if(this.multipleSelection.length > 1) {
					this.$message.error("只能选择一个");
					return;
				}
			},
			//分页、下一页
			onCurrentChange(val) {
				this.pageNum = val;
				this.reqSelect = this.form.select
				if(this.searchflag){
					this.getTableData(this.reqSelect);
				}else{
					this.getTableData("");
				}
			},
			getCompany() {
				this.$api.jobUserManagement.getCompanyData().then(res => {
					if(res.status == '200') {
						this.options = res.data.data.rows
					}
				}), error => {
					console.log(error);
				}
			},
			// 搜索
			onSubmit() {
				this.searchflag=true;
				this.pageNum = 1;
				this.reqSelect = this.form.select
				this.getTableData(this.reqSelect);

			},
			// 获取表格数据
			getTableData(params) {
				let data;
				switch(this.isEdit) {
					case true:
						data = {
							[params]: this.form.selectFormVal,
							page: this.pageNum,
							size: this.pageSize
						};
						break;
					case false:
						if(params == "fpositionstate") {
							if(this.form.selectFormVal == '' || (((this.form.selectFormVal).indexOf('在职') != -1 || (this.form.selectFormVal).indexOf('在') != -1) && ((this.form.selectFormVal).indexOf('离职') != -1 || (this.form.selectFormVal).indexOf('离') != -1))) {
								this.form.selectVal = "";
							} else if((this.form.selectFormVal).indexOf('在职') != -1 || (this.form.selectFormVal).indexOf('在') != -1) {
								this.form.selectVal = "1";
							} else if((this.form.selectFormVal).indexOf('离职') != -1 || (this.form.selectFormVal).indexOf('离') != -1) {
								this.form.selectVal = "0";
							} else {
								this.form.selectVal = "2";
							}
						}
						if(params == "tispluralism") {
							switch(this.form.selectVal) {
								case "是":
									this.form.selectVal = "1";
									break;
								case "否":
									this.form.selectVal = "0";
									break;

								default:
									break;
							}
						}
						data = {
							[params]: this.form.selectFormVal,
							page: this.pageNum,
							size: this.pageSize
						};
						if(params == '页面初期化') {
							data['fpositionstate'] = 1;
						}
						break;

					default:
						break;
				}

				if(typeof(data.fpositionstate) != "undefined") {
					if(!this.noNull(data.fpositionstate)) {
						data.fpositionstate == "在职" ? data.fpositionstate = "1" : ""
						data.fpositionstate == "离职" ? data.fpositionstate = "0" : ""
					}
				}
				if(typeof(data.tispluralism) != "undefined") {
					if(!this.noNull(data.tispluralism)) {
						data.tispluralism == "是" ? data.tispluralism = "1" : ""
						data.tispluralism == "否" ? data.tispluralism = "0" : ""
					}
				}
				if(this.showFig) {
					data['fpositionstate'] = 1;
				}
				this.$api.jobUserManagement.getPeopleTableData(data).then(
					res => {
						this.tableData = res.data.data.rows;
						this.total = res.data.data.total;
						for(let i in this.tableData) {
							switch(this.tableData[i].fpositionstate) {
								case '1':
									this.tableData[i].fpositionstate = "在职";
									break;
								case '0':
									this.tableData[i].fpositionstate = "离职";
									break;
								default:
									break;
							}
							switch(this.tableData[i].tispluralism) {
								case '1':
									this.tableData[i].tispluralism = "是";
									break;
								case '0':
									this.tableData[i].tispluralism = "否";
									break;
								default:
									break;
							}
						}
					},
					error => {
						console.log(error);
					}
				);
			},
			//新增
			add() {
				this.dialogFormVisible = true;
				this.isEdit = false;
				this.getCompany()
				this.peopleForm = {
					ffirmposition: "",
					ffirmpositionname: "",
					fpositionstate: "",
					tableData3: [],
					tcode: "",
					tcompanyoid: "",
					tdepartmentname: "",
					tdescription: "",
					tname: ""
				}
			},
			addSubmit(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {
						this.$refs.peopleFormOther.validate(valid1 => {
							if(valid1) {
								this.peopleForm.pluralismModels = this.peopleForm.tableData3
								if(this.isEdit) {
									this.peopleForm.ffirmposition = this.editFormData.ffirmposition
									this.peopleForm.tcompanyoid = this.editFormData.tcompanyoid
									this.$api.jobUserManagement.updatePeopleData(this.peopleForm).then(res => {
										if(res.data.code == 0) {
											this.dialogFormVisible = false;
											this.$message.success("修改成功");
											//刷新表格
											this.getTableData("");
										} else {
												this.$message.error(res.data.msg);
											}
									})
								} else {
									this.$api.jobUserManagement.addPeopleMsg(this.peopleForm).then(res => {
											if(res.data.code == 0) {
												this.dialogFormVisible = false;
												this.$message.success("新增成功");
												//刷新表格
												this.getTableData("");
											} else {
												this.$message.error(res.data.msg);
											}
										}),
										error => {
											console.log(error);
										};
								}
							}
						})
					}
				});
			},
			//删除
			deleteMsg() {
				if(this.multipleSelection.length == 0) {
					this.$message.error("请选择数据");
					return;
				}
				if(this.multipleSelection.length > 1) {
					this.$message.error("只能选择一个删除");
					return;
				}
                this.$confirm('此操作将永久删除该人员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.jobUserManagement.deletePeopleMsg(this.multipleSelection[0].toid).then(res => {
                        if((res.data.data.msg = "success")) {
                            this.$message.success("删除成功");
                            //刷新表格
                            this.getTableData("");
                        }
                    }),
                    error => {
                        console.log(error);
                    };
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

			},

			//编辑
			toEdit() {
				if(this.multipleSelection) {
					if(this.multipleSelection.length == 0) {
						this.$message.error('请选择一项');
					} else {
						this.dialogFormVisible = true;
						this.isEdit = true;
						this.$api.jobUserManagement.addPeopleData(this.multipleSelection[0].toid).then(res => {
								console.log(res)
								if(res.status == '200') {
									let newData;
									newData = JSON.parse(JSON.stringify(res.data.data));
									this.editFormData = res.data.data;
									this.peopleForm = newData;
									this.peopleForm.ffirmposition = res.data.data.ffirmpositionname;
									this.peopleForm.tcompanyoid = res.data.data.tcompanyoid;
									this.peopleForm.tableData3 = res.data.data.pluralismModels == null ? [] : res.data.data.pluralismModels;
									// console.log(this.editFormData,res.data.data,newData )
								}
							}),
							error => {
								console.log(error);
							};
					}
				} else {
					this.$message.error('请选择一项');
				}

			}
		}
	};
</script>
<style lang="scss">
	.el-tree-node.is-current>.el-tree-node__content {
		background-color: #409EFF !important;
		color: white;
	}

	.el-input.is-disabled .el-input__inner {
		color: #000000 !important;
	}

	.el-textarea.is-disabled .el-textarea__inner {
		color: #000000 !important;
	}

	.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
		border-color: #000000!important;
	}

	/deep/ .el-textarea .el-input__count {
		background: #fff0;
	}

	/deep/ .el-select {
		width: 100%;
	}

	.box-card:first-child {
		margin-bottom: 16px;
	}

	.search-all {
		margin: 0 50px;
	}

	.icon-search {
		width: 24px;
		height: auto;
		position: absolute;
		top: 8px;
		left: 292px;
		cursor: pointer;
	}
</style>
