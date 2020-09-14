<template>
	<div>
		<!-- 搜索框 -->
		<el-card class="box-card">
			<el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
				<el-row :gutter="24">
					<el-col :span="24">
						<el-form-item label="登录账号：" label-width="94px" prop="fcode">
							<el-input clearable size="small" v-model="searchForm.fcode" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item label="名称：" label-width="80px" prop="fname">
							<el-input clearable size="small" v-model="searchForm.fname" placeholder="请输入"></el-input>
						</el-form-item>

						<el-form-item label="用户部门：" label-width="90px" prop="departmentname">
							<el-input clearable size="small" v-model="searchForm.departmentname" placeholder="请输入"></el-input>

						</el-form-item>
						<el-form-item label="禁用：" label-width="100px" prop="fforbid">
							<el-radio-group v-model="searchForm.fforbid">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="状态：" label-width="100px" prop="fstatus">
							<el-radio-group v-model="searchForm.fstatus">
								<el-radio :label="3">有效</el-radio>
								<el-radio :label="7">禁用</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item style="margin-left:0px;float:right;">
							<el-button type="primary" plain @click="onSubmit">搜索</el-button>
							<el-button type="primary" plain @click="resetForm('searchForm')">重置</el-button>
							<el-button type="success" plain @click="add"> 新 增</el-button>
							<el-button type="warning" plain @click="toEdit('编辑')"> 编 辑</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
		<!-- 表格 -->
		<el-card class="box-card">
			<dynamic-table :columns="columns" :table-data="tableData" :total="total" :page-num="pageNum" :page-size="pageSize" @current-change="onCurrentChange" @selection-change="onSelectionChange" v-loading="false" element-loading-text="加载中"></dynamic-table>
		</el-card>
		<!-- 弹出框 -->
		<el-dialog :title="isEdit?'编辑用户':'新建用户'" class="add-user" center top="20px" v-if="dialogFormVisible" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
			<el-form :model="form" :rules="rules" ref="form">
				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item label="公司：" :label-width="formLabelWidth" class="pop-select" prop="fcompanyoid">
							<el-select disabled v-model="form.fcompanyoid" size="small" clearable placeholder="请选择">
								<el-option label="福佳集团" value="_DefaultCompanyOId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="登录账号：" :label-width="formLabelWidth" prop="fcodeStr">
							<el-input v-model="form.fcodeStr" @input="change($event)" size="small" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="密码：" :label-width="formLabelWidth" prop="fpasswordStr">
							<el-input v-model="form.fpasswordStr" @input="change($event)" type="password" size="small"></el-input>
						</el-form-item>
						<el-form-item label="使用者：" :label-width="formLabelWidth" prop="fstaff">
							<el-input v-model="form.fstaff" :disabled="isEdit && !isReset" size="small" autocomplete="off"></el-input>
							<el-button type="primary" v-show="!isEdit || isReset" size="mini" icon="el-icon-search" @click="addDepart();loading = true"></el-button>
							<!--<img class="icon-search" v-show="!isEdit || isReset" src="../../assets/img/search.svg" @click="addDepart();loading = true" />-->
						</el-form-item>
						<el-form-item v-show="isEdit" label="重置密码：" :label-width="formLabelWidth">
							<el-checkbox v-model="resetCheck" size="small"></el-checkbox>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="名称：" :label-width="formLabelWidth" prop="fname">
							<el-input v-model="form.fname" size="small" autocomplete="off"></el-input>
						</el-form-item>

						<el-form-item label="确认密码：" :label-width="formLabelWidth" prop="fpasswordSure">
							<el-input v-model="form.fpasswordSure" @input="change($event)" type="password" size="small"></el-input>
						</el-form-item>
						<el-form-item label="所在部门：" :label-width="formLabelWidth" prop="departmentname">
							<el-input v-model="form.departmentname" disabled size="small" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="禁用：" prop="fforbid" :label-width="formLabelWidth">
							<el-checkbox v-model="checked" size="small" @change="checkFun"></el-checkbox>
						</el-form-item>

					</el-col>
				</el-row>
				<el-row :span="21">
					<el-form-item label="描述：" :label-width="formLabelWidth" prop="fremark">
						<el-input maxlength="1000" size="small" show-word-limit autosize type="textarea" v-model="form.fremark"></el-input>
					</el-form-item>
				</el-row>

			</el-form>
			<h3>操作记录</h3>
			<el-divider></el-divider>
			<dynamic-table :columns="columns2" :table-data="tableData2" :isShowPager="false" :total="total" :height="200" :page-num="pageNum" :page-size="pageSize" @current-change="onCurrentChange" @selection-change="onSelectionChange" v-loading="false" element-loading-text="加载中"></dynamic-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeDialog('form')">取 消</el-button>
				<el-button @click="addSubmit('form')">保 存</el-button>
			</div>
		</el-dialog>
		<!-- 使用者弹窗 -->
		<el-dialog title="使用者查询"  @close="closUserVisible" top="20px" :visible.sync="userVisible" :close-on-click-modal="false">
			<el-row :gutter="24">
				<el-col :span="12">
					<el-input placeholder="输入用户名" size="mini" v-model="filterText"></el-input>
				</el-col>
				<el-col :span="6" :offset="6">
					<el-button type="primary" size="mini" @click="searchDepart">查询</el-button>
					<el-button size="mini" @click="ALLUsertree">重置</el-button>
				</el-col>
			</el-row>
			<!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>-->
			<!-- 树状图 -->
			<el-tree class="filter-tree" :data="treeData" v-loading="loading" element-loading-text="拼命加载中" :props="defaultProps" :default-expand-all="false" accordion :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick">
			</el-tree>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closUserVisible">取 消</el-button>
				<el-button type="primary" @click="sureDepart">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 禁用操作弹窗 -->
		<el-dialog title="操作编辑" top="20px" center class="user-forbiden" :visible.sync="userForbidenVisible" :close-on-click-modal="false">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item label="操作内容：" :span="10" :label-width="formLabelWidth" class="pop-select">
					<el-select v-model="formCtionTypeCon" @change="aaa" placeholder="请选择">
						<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="操作原因：" :span="10" :label-width="formLabelWidth" class="pop-select">
					<el-input :disabled=true size="small" v-model="formForbidenRes"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="userForbidenVisible = false">取 消</el-button>
				<el-button type="primary" @click="addTableData">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import DynamicTable from "../../components/common/dytable/dytable.vue";
	export default {
		name: "userSet",
		data() {
			const {
				contantSelect
			} = this;
			return {
				loading: false,
				dialogFormVisible: false,
				userForbidenVisible: false,
				userVisible: false,
				isEdit: false,
				resetCheck: false,
				formCtionTypeCon: '',
				formForbidenRes: '',
				searchName: '',
				formCode: "",
				filterText: '',
				treeData: [],
				defaultProps: {
					children: 'children',
					label: 'name'
				},
				pageNum: 1,
				pageSize: 10,
				total: 20,
				columns: [{
						type: "selection"
					},
					{
						key: "fcode",
						title: "登录账号"
					},
					{
						key: "fname",
						title: "名称"
					},
					{
						key: "departmentname",
						title: "用户部门"
					},
					{
						key: "fremark",
						title: "描述"
					},
					{
						key: "fforbid",
						title: "禁用"
					},
					{
						key: "fstatus",
						title: "状态"
					}
				],

				columns2: [{
						type: "selection"
					},
					{
						key: "foperationtime",
						title: "操作时间"
					},
					{
						key: "foperationcontent",
						title: "操作内容",
					},
					{
						key: "foperationcause",
						title: "操作原因",
					},
					{
						key: "f3",
						title: "操作",
						render: contantSelect,
					},
				],
				tableData: [],
				tableData2: [],
				getTreeData: [],
				newIndex: null,
				radio: "1",
				multipleSelection: [],
				checked: false,
				isReset: false,
				form: {
					fcompanyoid: "_DefaultCompanyOId",
					departmentname: "",
					fforbid: "",
					fname: '',
					fcode: '',
					fcodeStr: '',
					fpassword: "",
					fpasswordStr: "",
					fpasswordSure: '',
					fstaff: "",
					fremark: ""
				},
				searchForm: {
					fcode: "",
					fname: "",
					departmentname: "",
					fforbid: "",
					fstatus: "",
				},
				userForm: {},
				options2: [{
						value: '1',
						label: '禁用'
					},
					{
						value: '2',
						label: '启用'
					}
				],
				formLabelWidth: "120px",
				rules: {
					fcodeStr: [{
							required: true,
							message: "请输入帐号",
							trigger: "blur"
						},
						{
							min: 1,
							max: 100,
							message: "长度在 1 到 50 个字符",
							trigger: "blur"
						}
					],
					fpasswordStr: [{
							required: true,
							message: "请输入密码",
							trigger: "blur"
						},
						{
							min: 1,
							max: 100,
							message: "长度在 1 到 50 个字符",
							trigger: "blur"
						}
					],
					fpasswordSure: [{
							required: true,
							message: "请输入密码",
							trigger: "blur"
						},
						{
							min: 1,
							max: 100,
							message: "长度在 1 到 50 个字符",
							trigger: "blur"
						}
					],
					fname: [{
							required: true,
							message: "请输入名称",
							trigger: "blur"
						},
						{
							min: 1,
							max: 100,
							message: "长度在 1 到 100 个字符",
							trigger: "blur"
						}
					]
				}
			};
		},
		components: {
			DynamicTable
		},
		created() {
			this.$nextTick(() => {
				this.getTableData();
			});
			// console.log("oooooooooooooooyyyyyyyyyyy");
			// var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
			// console.log(time);
			
			
		},
		computed: {},
		watch: {
			dialogFormVisible(val) {
				this.newIndex = null;
				if(!val) {
					this.$refs['form'].resetFields();
				}
			},
			filterText(val) {
				//this.$refs.tree.filter(val);
			},
			resetCheck(val) {
				switch(val) {
					case true:
						this.isReset = val;
						this.form.fpasswordStr = '111111';
						this.form.fpasswordSure = '111111';
						break;
					case false:
						this.isReset = val;
						this.form.fpasswordStr = '';
						this.form.fpasswordSure = '';
						break;

					default:
						break;
				}
			},
		},

		methods: {
			closUserVisible(){
				this.filterText='';
				this.userVisible=false;
			},
			checkFun(val){
				let data = {};
				let newData = this.timeFormat(); //debugger
				switch(val) {
					case true:
						let getTrueIndex = this.newIndex == 0 ? 0 : this.newIndex - 1;
						if(this.tableData2[getTrueIndex] !== undefined) {
							this.tableData2[getTrueIndex].foperationtime = newData;
							this.tableData2[getTrueIndex].foperationcontent = '禁用';
							this.tableData2[getTrueIndex].foperationcause = 'OA封号';
							return
						}
						this.newIndex = 0;
						data = {
							foperationtime: newData,
							foperationcontent: '禁用',
							foperationcause: 'OA封号',
							index:this.newIndex,
						}
						this.tableData2.unshift(data); 
						break;
					case false:
						let getTrueIndex2 = this.newIndex == 0 ? 0 : this.newIndex - 1;
						if(this.tableData2[getTrueIndex2] !== undefined) {
							this.tableData2[getTrueIndex2].foperationtime = newData;
							this.tableData2[getTrueIndex2].foperationcontent = '启用';
							this.tableData2[getTrueIndex2].foperationcause = 'OA解封';
							return
						}
						this.newIndex = this.tableData2.length == 0 ? 0 : (this.tableData2.length + 1);
						this.newIndex = 0;
						data = {
							foperationtime: newData,
							foperationcontent: '启用',
							foperationcause: 'OA解封',
							index:this.newIndex,
						}
						this.tableData2.unshift(data); 
						
						break;

					default:
						break;
				}
			},
			closeDialog(formName) {
				this.dialogFormVisible = false;
				this.$refs[formName].resetFields();

			},
			filterNode(value, data) {
				if(!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			baseInputTable() {
				this.userVisible = true;
			},
			ALLUsertree(){
				this.filterText='';
				this.loading = true;
				this.$api.jobUserManagement.getStaffTree({}).then(res => {
					this.treeData = eval('('  + res.data.data +  ')')
					this.treeData.forEach(item => {
						item.name = item.fname
						if(typeof(item.children) != "undefined") {
							this.toUpd(item.children)
						}
					})
					this.loading = false
				}), error => {
					console.log(error);
				};
			},
			searchDepart() {
				if(this.filterText && this.filterText!=''){
					this.loading = true;
					this.userVisible = true;
					let data = {
						"name": this.filterText
					}
					this.$api.jobUserManagement.getStaffTree(data).then(res => {
						this.treeData = eval('('  + res.data.data +  ')')
						this.treeData.forEach(item => {
							item.name = item.fname
							if(typeof(item.children) != "undefined") {
								this.toUpd(item.children)
							}
						})
						this.loading = false
					}), error => {
						console.log(error);
					};
				}else{
					this.$message.error('请输入查询条件!');
				}
			},
			handleNodeClick(data) {
				this.form.fstaff = data.fname;
				this.form.fname = data.fname;
				this.form.departmentname = data.fdepartmentName;
				this.form.fstaffId = data.foid;
			},
			//多选
			onSelectionChange(val) {
				this.multipleSelection = val;
				if(this.multipleSelection.length > 1) {
					this.$message.error("只能选择一个");
					return;
				}
			},
			//分页、下一页
			onCurrentChange(val) {
				this.pageNum = val;
				this.getTableData();
			},
			// 搜索
			onSubmit() {
				this.pageNum = 1;
				this.getTableData(this.formCode);
			},
			// 获取表格数据
			getTableData() {
				this.searchForm.page = this.pageNum;
				this.searchForm.size = this.pageSize;
				this.$api.jobUserManagement.getUserTableData(this.searchForm).then(
					res => {
						this.tableData = res.data.data.rows;
						this.total = res.data.data.total;
						for(let i in this.tableData) {
							switch(this.tableData[i].fstatus) {
								case 7:
									this.tableData[i].fstatus = "禁用";
									break;
								case 3:
									this.tableData[i].fstatus = "有效";
									break;
								default:
									break;
							}
							switch(this.tableData[i].fforbid) {
								case 1:
									this.tableData[i].fforbid = "是";
									break;
								case 0:
									this.tableData[i].fforbid = "否";
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
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.pageNum = 1;
				this.getTableData();
			},
			//新增
			add() {
				this.dialogFormVisible = true;
				this.isEdit = false;
				this.tableData2 = [];
			},
			sureDepart() {
				this.userVisible = false
			},
			addPeopleData(data) {
				this.$api.jobUserManagement.addPeopleData(data).then(res => {
					if(res.data.code == 0) {
						if(res.data.data != null) {
							this.form.staffId = res.data.data.toid;
							this.form.fstaff = res.data.data.tname;
							this.form.departmentname = res.data.data.tdepartmentname;
						}

					} else {
							this.$message.error(res.data.msg);
						}
				}), error => {
					console.log(error);
				};
			},
			getChildData(data) {
				let childData = [];
				data.forEach(itemStaff => {
					childData.push({
						// departmentname:getData[j].name,
						staffOid: itemStaff.staffOid,
						name: itemStaff.staffName,
						label: itemStaff.staffName + ' [ ' + itemStaff.firmpositiName + ' ]',
					})
				})
				this.loading = false;
				return childData;
			},
			getChildrenList(data) {
				let childrenList = [];
				data.forEach(items => {
					childrenList.push({
						label: items.name,
						children: this.getChildData(items.staff)
					})
				})
				return childrenList;
			},
			toUpd(row) {
				row.forEach(item => {
					if(typeof(item.children) != "undefined" && typeof(item.fstruid) != "undefined") {
						item.name = item.fname
						this.toUpd(item.children)
					} else {
						if(typeof(item.firmpositiName) != "undefined") {
							item.name = item.fname + " [ " + item.firmpositiName + " ] "
						} else {
							item.name = item.fname
						}
					}
				})
			},
			// 人员-树状图
			addDepart() {
				this.loading = true;
				this.userVisible = true;
				let data = {
					"id": this.form.fcompanyoid
				}
				this.$api.jobUserManagement.getStaffTree({}).then(res => {
					this.treeData = eval('('  + res.data.data +  ')')
					this.treeData.forEach(item => {
						item.name = item.fname
						if(typeof(item.children) != "undefined") {
							this.toUpd(item.children)
						}
					})
					this.loading = false
				}), error => {
					console.log(error);
				};
			},
			// 人员列表-新增
			addSubmit(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {
						let newTableRow;
						//this.form.fcreator = 'BFPID000000LQW0007';
						this.form.fcreator =localStorage.getItem("ms_userId");
						this.form.fforbid = this.checked ? '1' : '0';
						this.form.fstatus = this.checked ? '7' : '3';
						this.form.fstaff = this.isEdit ? this.form.fstaff : this.form.fstaffId;
						//修改操作表格
						if(this.newIndex - 1 !== null) {
							this.tableData2.forEach((item, i) => {
								if(i == this.newIndex - 1) {
									newTableRow = this.tableData2[i]
								}
							});
							if(newTableRow) {
								switch(newTableRow.foperationcontent) {
									case '其他':
										newTableRow.content = 3
										newTableRow.cause = 3
										break;
									case '封号':
										newTableRow.content = 1
										newTableRow.cause = 1
										break;
									case '启用':
										newTableRow.content = 2
										newTableRow.cause = 2
										break;

									default:
										break;
								}
								this.form.tuseroperationrecordReqVo = {
									fcompanyoid: this.form.fcompanyoid,
									//fcreator: 'BFPID000000LQW0007',
									fcreator:localStorage.getItem("ms_userId"),
									foperationtime: newTableRow.foperationtime,
									foperationcontent: newTableRow.content,
									foperationcause: newTableRow.cause,

								}
							}

						} else {
							//不修改表格
							this.form.tuseroperationrecordReqVo = {}
						}
						if(this.isEdit) {
							this.newIndex = null;
							if(this.tableData2[0] != undefined) {
								if(this.tableData2[0].foperationcontent == '禁用' || this.tableData2[0].foperationcause == 'OA封号') {
								this.form.tuseroperationrecordReqVo = {
									'foperationcontent':1,
									'foperationcause':1,
									'fcreator':localStorage.getItem('ms_userId'),
									'fcompanyoid':localStorage.getItem('ms_companyId'),
									'foperationtime':this.tableData2[0].foperationtime,
								}
							}
							}
							
							this.form.fcode=this.form.fcodeStr;
							this.form.fpassword=this.form.fpasswordStr;
							this.form.fstaff = this.form.fstaffId;
							this.$api.jobUserManagement.updateUserTableData(this.form).then(res => {
									if(res.data.code == 0) {
										this.dialogFormVisible = false;
										this.$message.success("修改成功");
										this.$refs[formName].resetFields();
										//刷新表格
										this.getTableData();
									} else {
										this.$message.error(res.data.msg);
									}
								}),
								error => {
									console.log(error);
								}
						} else {
							console.log(this.form);
							this.form.fcode=this.form.fcodeStr;
							this.form.fpassword=this.form.fpasswordStr;
							this.$api.jobUserManagement.addUserTableData(this.form).then(res => {
									this.newIndex = null
									if(res.data.code == 0) {
										this.dialogFormVisible = false;
										this.$message.success("新增成功");
										this.$refs[formName].resetFields();
										//刷新表格
										this.getTableData();
									} else {
										this.$message.error(res.data.msg);
									}
								}),
								error => {
									console.log(error);
								};
						}
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			//删除
			deleteMsg() {
				if(this.multipleSelection.length > 1) {
					this.$message.error("只能选择一个删除");
					return;
				}
				this.$api.processSet
					.deleteMsg(this.multipleSelection[0].foid)
					.then(res => {
						if((res.data.data.msg = "success")) {
							this.$message.success("删除成功");
							//刷新表格
							this.getTableData();
						}
					}),
					error => {
						console.log(error);
					};
			},
			addTableData() {
				switch(this.formCtionTypeCon) {
					case "1":
						// this.tableData2[this.newIndex - 1].foperationcontent = 1;
						// this.tableData2[this.newIndex - 1].foperationcause = 1;
						this.tableData2[0].foperationcause = 'OA封号';
						this.tableData2[0].foperationcontent = '禁用';
						break;
					case "2":
						// this.tableData2[this.newIndex - 1].foperationcontent = 2;
						// this.tableData2[this.newIndex - 1].foperationcause = 2;
						this.tableData2[0].foperationcause = 'OA解封';
						this.tableData2[0].foperationcontent = '启用';
						break;

					default:
						break;
				}
				this.userForbidenVisible = false;
			},
			aaa(e) {
				switch(e) {
					case '1':
						this.formForbidenRes = 'OA封号'
						break;
					case '2':
						this.formForbidenRes = 'OA解封'
						break;

					default:
						break;
				}
			},
			onRowProjectnameClick(row) {
				this.userForbidenVisible = true;

			},
			// 封装表格
			contantSelect(V) {//debugger
				const {
					onRowProjectnameClick
				} = this;
				const ret = [];
				let nowIndexF = false;
				const nowIndex = this.newIndex == 0 ? 0 : this.newIndex - 1; //console.log(nowIndex)
				switch(this.isEdit) {
					case true:
						if(nowIndex == V.$index) {
							nowIndexF = true;
						}
						break;
					case false: //debugger
						nowIndexF = true;
						if(nowIndex !== V.row.index) {
							nowIndexF = false;
						}
						break;

					default:
						break;
				}
				ret.push(
					<div>
         <el-button  disabled={nowIndexF?false:true}  type="text" onClick={() => onRowProjectnameClick(V.row)}  >编辑</el-button>
             
         </div>
				);
				return <div>{ret}</div>;
			},
			toEdit(Str) {
				
				if(Str == '编辑') {
					 if (this.multipleSelection.length != 1) {
						this.$message.error("请选择一条数据查看详情");
						return;
					} else {
					this.dialogFormVisible = true;
					this.resetCheck = false;
					this.isEdit = true;
					let data = {
						foid: this.multipleSelection[0].foid
					}
					this.$api.jobUserManagement.addUserData(data).then(res => {
							if(res.data.code == 0) {
								
								this.tableData2 = []
								this.form = res.data.data;
								this.form.fcodeStr=this.form.fcode;
								this.form.fpasswordStr=this.form.fpassword;
								this.form.fpasswordSure = this.form.fpassword
								this.tableData2 = res.data.data.tuseroperationrecordList; //console.log(this.tableData2)
								if(res.data.data.fforbid == 1) {
									this.checked = true;
								} else {
									this.checked = false;
								}
								this.tableData2.forEach((item, index) => {
									switch(item.foperationcause) {
										case 2:
											item.foperationcontent = "启用";
											item.foperationcause = "OA解封";
											break;
										case 1:
											item.foperationcontent = "封号";
											item.foperationcause = "OA封号";
											break;
										case 3:
											item.foperationcontent = "其他";
											item.foperationcause = "其他";
											break;

										default:
											break;
									}
								});
								this.addPeopleData(this.form.fstaff);
							} else {
									this.$message.error(res.data.msg);
								}
						}),
						error => {
							console.log(error);
						}
				}
				}
			},
			change(e){
            	this.$forceUpdate()
        	},
			timeFormat() {
				var date = new Date();
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				var second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + " " + h + ":" + minute + ":" + second;
			},
		}
	};
</script>
<style lang="scss" scoped>
	/deep/ .el-textarea .el-input__count {
		background: #fff0;
	}
	
	/deep/ .el-select {
		width: 100%;
	}
	
	.add-user {
		/deep/ .el-input {
			width: 70%;
		}
		/deep/ .el-textarea {
			width: 70%;
		}
		/deep/ .el-textarea {
			width: 100%;
		}
		h3 {
			width: 100px;
			margin-top: 26px;
		}
	}
	
	.ret-text {
		color: #409EFF;
		cursor: pointer;
	}
	
	.user-forbiden {
		/deep/ .el-select {
			width: 100% !important;
		}
	}
	
	.pop-select {
		/deep/ .el-select {
			width: 70%;
		}
		/deep/ .el-input {
			width: 100%;
		}
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
		left: 230px;
		cursor: pointer;
	}

</style>