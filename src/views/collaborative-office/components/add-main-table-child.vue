<template>
	<el-card class="box-card">
		<div v-if="!showFigForm">
			<el-row>
				<el-col style="text-align: center;" :span="24">工作事项模板子表-新增</el-col>
			</el-row>
			<el-row style="margin-top: 10px;">
				<el-col :span="18">
					公司：
					<el-select size='mini' v-model="ruleForm.company" placeholder="公司" @change="selectChanged">
						<el-option v-for="item in CompanyData" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="6" style="text-align: right;">
					<el-button @click="submitForm(2)" type="success" size="small" icon="el-icon-copy-document">提交</el-button>
					<el-button @click="submitForm(1)" type="success" size="small" icon="el-icon-folder-remove">暂存</el-button>
					<el-button @click="preview()" type="primary" plain size="small" icon="el-icon-view">预览</el-button>
					<el-button type="danger" size="small" icon="el-icon-close" @click="$parent.toSelect()">返回</el-button>
				</el-col>
			</el-row>
			<el-card style="margin-top: 10px;">
				<el-form size="mini" label-width="80px" :inline="true" :rules="rules" ref="ruleForm" :model="ruleForm" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item prop="code" label="子表编码">
								<el-input style="width: 110%;" clearable v-model="ruleForm.code" maxlength="50" placeholder="子表编码"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item prop="name" label="子表名称">
								<el-input style="width: 110%;" clearable v-model="ruleForm.name" maxlength="50" placeholder="子表名称"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item prop="workItemTypeSubName" label="子表分类">
								<el-input style="width: 110%;" disabled placeholder="子表分类" v-model="ruleForm.workItemTypeSubName">
									<el-button @click="dialogVisibleChild = true" slot="append" icon="el-icon-search"></el-button>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item prop="workItemTempName" label="主表">
								<el-input style="width: 110%;" disabled placeholder="主表" v-model="ruleForm.workItemTempName">
									<el-button @click="dialogVisible = true" slot="append" icon="el-icon-search"></el-button>
								</el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="6">
							<el-form-item prop="type" label="子表类型">
								<el-select @change="getType" style="width: 110%;" size='mini' v-model="ruleForm.type" placeholder="子表类型">
									<el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item prop="showName" label="显示名称">
								<el-input style="width: 110%;" clearable v-model="ruleForm.showName" maxlength="50" placeholder="显示名称"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item prop="orderNum" label="显示顺序">
								<el-input style="width: 110%;" clearable v-model="ruleForm.orderNum" maxlength="50" placeholder="显示顺序"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="描述">
								<el-input clearable style="width: 140%;" type="textarea" :rows="1" maxlength="1500" v-model="ruleForm.remark" placeholder="描述"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-card>
			<el-card style="margin-top: 10px;">
				<el-row>
					<el-col style="text-align: center;">工作事项模板子表行</el-col>
				</el-row>
				<el-form style="margin-top: 10px;" :model="ruleForm" :rules="rulesTable" ref="ruleFormTable">
					<el-table size="small" height="600" :data="ruleForm.lines" border style="width: 100%">
						<el-table-column prop="field" label="数据库字段名" align="center" width="120">
							<template slot-scope="scope">
								<el-form-item>
									<el-input disabled v-model="scope.row.field" placeholder="数据库字段名"></el-input>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="fieldName" label="字段显示名称" align="center" width="140">
							<template slot-scope="scope">
								<el-form-item>
									<el-input disabled v-model="scope.row.fieldName" placeholder="字段显示名称"></el-input>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="fieldType" label="字段类型" align="center" width="140">
							<template slot-scope="scope">
								<el-form-item>
									<el-select disabled style="width: 100%;" v-model="scope.row.fieldType" placeholder="字段类型">
										<el-option v-for="item in fieldTypeList" :key="item.id" :label="item.label" :value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="lengthType" label="字段长度类型" align="center" width="180">
							<template slot-scope="scope">
								<el-form-item :prop="'lines[' + scope.$index + '].lengthType'" :rules="rulesShow(scope.row,'lengthType')">
									<el-select :disabled="showType" style="width: 100%;" v-model="scope.row.lengthType" placeholder="字段长度类型">
										<el-option v-for="item in lengthTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
									</el-select>
								</el-form-item>
							</template>
						</el-table-column>
						<!--<el-table-column label="字段内容" align="center" width="140">
							<template slot-scope="scope">
								<el-form-item>
									<el-input disabled v-model="scope.row.fieldContentName"></el-input>
								</el-form-item>
							</template>
						</el-table-column>-->
						<el-table-column prop="show" label="是否显示" align="center">
							<template slot-scope="scope">
								<el-form-item>
									<el-checkbox v-model="scope.row.show"></el-checkbox>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="orderNum" label="显示顺序" align="center">
							<template slot-scope="scope">
								<el-form-item :prop="'lines[' + scope.$index + '].orderNum'" :rules="rulesShow(scope.row,'orderNum')">
									<el-input v-model="scope.row.orderNum" placeholder=""></el-input>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="showNum" label="显示行数" align="center">
							<template slot-scope="scope">
								<el-form-item :prop="'lines[' + scope.$index + '].showNum'" :rules="rulesShow(scope.row,'showNum')">
									<el-input :disabled="showType" v-model="scope.row.showNum" placeholder=""></el-input>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="required" label="是否必填" align="center">
							<template slot-scope="scope">
								<el-form-item>
									<el-checkbox v-model="scope.row.required"></el-checkbox>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="choice" label="是否多选" align="center">
							<template slot-scope="scope">
								<el-form-item>
									<el-checkbox v-model="scope.row.choice"></el-checkbox>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="edit" label="是否可编辑" align="center">
							<template slot-scope="scope">
								<el-form-item>
									<el-checkbox v-model="scope.row.edit"></el-checkbox>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="serviceId" label="服务" align="center" width="280">
							<template slot-scope="scope">
								<el-form-item>
									<el-input disabled v-model="scope.row.serviceCon">
										<el-button @click="findTServiceByParams(scope.row)" slot="append" icon="el-icon-search"></el-button>
									</el-input>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="parameter" label="参数" align="center">
							<template slot-scope="scope">
								<el-form-item>
									<el-input v-model="scope.row.parameter" placeholder="参数"></el-input>
								</el-form-item>
							</template>
						</el-table-column>
					</el-table>
				</el-form>
			</el-card>
			<!--弹出框-->
			<el-dialog title="工作事项模板子表分类" top="1vh" :destroy-on-close="true" center :visible.sync="dialogVisibleChild" width="80%" v-if="dialogVisibleChild">
				<selectMainTableClassificationChild show="1" ref="child" :company="this.ruleForm.company"></selectMainTableClassificationChild>
				<div slot="footer" class="dialog-footer">
					<el-button @click="getSelectMainTableClassification" type="success" icon="el-icon-check" size="small">确定</el-button>
					<el-button @click="dialogVisibleChild = false" type="warning" icon="el-icon-close" size="small">取消</el-button>
				</div>
			</el-dialog>
			<!--弹出框-->
			<el-dialog title="工作事项模板主表" top="1vh" :destroy-on-close="true" center :visible.sync="dialogVisible" width="80%" v-if="dialogVisible">
				<selectMainTable show="1" ref="childMain" :companyId="this.ruleForm.company"></selectMainTable>
				<div slot="footer" class="dialog-footer">
					<el-button type="success" icon="el-icon-check" size="small" @click="getDialogVisible">确定</el-button>
					<el-button @click="dialogVisible = false" type="warning" icon="el-icon-close" size="small">取消</el-button>
				</div>
			</el-dialog>
			<!--弹出框-->
			<el-dialog title="服务" top="1vh" :destroy-on-close="true" center :visible.sync="dialogVisible_TServiceByParams" width="60%">
				<el-table size="small" highlight-current-row @row-click="clickRow" :data="tServiceByParams" border>
					<el-table-column prop="fcode" label="服务编码"></el-table-column>
					<el-table-column :formatter="ftypeShow" prop="ftype" label="服务类型"></el-table-column>
					<el-table-column prop="fname" label="服务名称"></el-table-column>
					<el-table-column prop="fdescription" label="描述"></el-table-column>
				</el-table>
				<div slot="footer" class="dialog-footer">
					<el-button type="success" icon="el-icon-check" size="small" @click="getTServiceByParams">确定</el-button>
					<el-button type="warning" icon="el-icon-close" size="small" @click="dialogVisible_TServiceByParams = false">取消</el-button>
				</div>
			</el-dialog>
		</div>
		<div v-if="showFigForm">
			<formAndTable :files="files" dis="2" showAdd="1" :form-data="conData">
				<el-row style="text-align: right;margin-bottom: 10px;">
					<el-button icon="el-icon-arrow-left" size="small" type="danger" plain @click="showFigForm = false">返回</el-button>
				</el-row>
			</formAndTable>
		</div>
	</el-card>
</template>
<script>
	//工作事项模板子表分类
	import selectMainTableClassificationChild from './select-main-table-classification-child';
	//工作事项主表模板
	import selectMainTable from './select-main-table';
	//预览
	import formAndTable from './form-and-table';
	export default {
		components: {
			selectMainTableClassificationChild,
			selectMainTable,
			formAndTable
		},
		props: {
			//查看
			showFigNum: Number,
			//值
			context: Object
		},
		data() {
			return {
				files: [],
				//子表类型
				showType: false,
				//子表类型
				typeList: [{
					id: "1",
					name: "子表"
				}, {
					id: "2",
					name: "明细表"
				}],
				//字段长度类型
				lengthTypeList: [{
					id: "1",
					name: "长度- 1"
				}, {
					id: "2",
					name: "长度- 2"
				}, {
					id: "3",
					name: "长度- 3"
				}],
				//切换子组件
				showFigForm: false,
				//弹出框-工作事项模板子表分类
				dialogVisibleChild: false,
				//弹出框-工作事项主表模板
				dialogVisible: false,
				//弹出框-服务
				dialogVisible_TServiceByParams: false,
				//服务 中间值
				rowCon: {},
				//服务选中
				tServiceByParamsCon: "",
				//校验规则-表单
				rules: {
					code: [{
							required: true,
							message: '请输入子表分类编码',
							trigger: 'change'
						},
						{
							pattern: /^[a-z_A-Z0-9-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]\/",'<>~\·`\?:;|]+$/,
							message: '请输入英文、数字、英文符号的子表分类编码'
						}
					],
					name: [{
							required: true,
							message: '请输入子表分类名称',
							trigger: 'change'
						},
						{
							pattern: "[\u4e00-\u9fa5]",
							message: '请输入中文的子表分类名称'
						}
					],
					workItemTypeSubName: [{
						required: true,
						message: '请选择子表分类',
						trigger: 'change'
					}],
					workItemTempName: [{
						required: true,
						message: '请选择主表',
						trigger: 'change'
					}],
					showName: [{
						required: true,
						message: '请输入显示名称',
						trigger: 'change'
					}, {
						pattern: /^[a-z_A-Z0-9-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]\/",'<>~\·`\?:;|]+$/,
						message: '可输入英文、数字、英文符号，限制长度50字节'
					}],
					type: [{
						required: true,
						message: '请选择子表类型',
						trigger: 'change'
					}],
					orderNum: [{
						required: true,
						message: '请选择子表分类',
						trigger: 'change'
					}, {
						pattern: /^\+?[1-9][0-9]*$/,
						message: '可输入非零正整数'
					}]
				},
				//校验规则-table
				rulesTable: {
					lengthType: [{
						required: true,
						message: "请选择字段长度类型",
						trigger: "change"
					}],
					orderNum: [{
						required: true,
						message: "请输入显示顺序",
						trigger: "change"
					}, {
						pattern: /^\+?[1-9][0-9]*$/,
						message: '可输入非零正整数'
					}],
					showNum: [{
						required: true,
						message: "请填写显示行数",
						trigger: "change"
					}, {
						pattern: /^\+?[1-9][0-9]*$/,
						message: '可输入非零正整数'
					}],
				},
				//字段类型
				fieldTypeList: this.$GLOBAL.fieldTypeList,
				rowConNew: {
					choice: false,
					//是否多选
					edit: true,
					//是否可编辑
					field: "",
					//数据库字段
					fieldName: "",
					//显示名称
					fieldType: "",
					//字段类型： 1 浏览框、 2 字符型、 3 文本型、 4 整型、 5 浮点型、 6 富文本、 7 日期控件、 8 时间控件、 9 枚举项、 10 复选框
					lengthType: "",
					//字段长度类型
					oprStatus: 1,
					//明细行操作类型： 1 新建、 2 修改、 3 删除、 0 未变
					orderNum: "",
					//显示顺序
					parameter: "",
					//参数
					required: false,
					//是否必填
					serviceId: "",
					//服务
					show: true,
					//是否显示
					showNum: "",
					//显示行数
				},
				//输入框整体内容
				ruleForm: {
					code: "",
					name: "",
					workItemTypeSubName: "",
					workItemTypeSub: "",
					workItemTempName: "",
					workItemTemp: "",
					showName: "",
					type: "",
					orderNum: "",
					remark: "",
					creator: localStorage.getItem('ms_userId'),
					company: "",
					lines: [],
				},
				//传入子组件的值
				conData: {
					top: {
						//form的label宽度
						labelWidth: '100px',
						//横向显示
						inline: false,
						//label位置
						labelPosition: 'right',
						//form大小
						size: 'small',
						//值
						rowList: []
					},
					bottom: [{
						//form的label宽度
						labelWidth: '100px',
						//横向显示
						inline: false,
						//label位置
						labelPosition: 'right',
						//form大小
						size: 'small',
						//值
						rowList: [],
						label: ""
					}]
				},
				//全部服务
				tServiceByParams: JSON.parse(localStorage.getItem('tServiceByParams')),
				//全部公司
				CompanyData: JSON.parse(localStorage.getItem('CompanyData')),
				//全部枚举
				selectList: "",
				//全部工作事项
				fieldBrowseList: JSON.parse(localStorage.getItem('fieldBrowseList')),
				//公司部门职位的合集
				allOrganizationInfo: JSON.parse(localStorage.getItem('allOrganizationInfo')),
			}
		},
		created() {
			//最上端公司选择
			/*this.CompanyData.forEach(item => {
				if(item.name == "福佳集团") {
					this.ruleForm.company = item.id
				}
			})*/
			this.ruleForm.company = this.CompanyData[0].id
			this.$api.collaborativeOffice.findList({}).then(data => {
				this.selectList = data.data.data
			})
		},
		methods: {
			//不是显示状态时,不加check
			rulesShow(row, con) {
				if(row.show) {
					return this.rulesTable[con];
				} else {
					return;
				}
			},
			//公司select选择的时候
			selectChanged(val) {
				this.ruleForm.workItemTypeSubName = '';
				this.ruleForm.workItemTempName = '';
			},
			//子表类型（校验不同）
			getType(type) {
				this.$nextTick(() => {
					this.$refs.ruleFormTable.resetFields();
				})
				if(type == 2) {
					this.showType = true
					this.rulesTable = {
						lengthType: [],
						orderNum: [{
							required: true,
							message: "请输入显示顺序",
							trigger: "change"
						}],
						showNum: []
					}
				} else {
					this.showType = false
					this.rulesTable = {
						lengthType: [{
							required: true,
							message: "请选择字段长度类型",
							trigger: "change"
						}],
						orderNum: [{
							required: true,
							message: "请输入显示顺序",
							trigger: "change"
						}],
						showNum: [{
							required: true,
							message: "请填写显示行数",
							trigger: "change"
						}]
					}
				}
			},
			//选择主表模板-确认
			getDialogVisible() {
				if(this.$refs.childMain.rowClick.status != 3) {
					this.goOut("只能选择状态为 '有效' 的主表模板")
					return
				}
				//主表模板名称
				this.ruleForm.workItemTempName = this.$refs.childMain.rowClick.name
				//主表模板名称ID
				this.ruleForm.workItemTemp = this.$refs.childMain.rowClick.id
				this.dialogVisible = false
				this.$api.collaborativeOffice.getWorkItemTempModel({
					id: this.ruleForm.workItemTemp
				}).then(data => {
					this.preview2(data.data.data.lines)
				})
			},
			fieldTypeShow2(item) {
				if(item.fieldType == 9) {
					this.selectList.forEach(val => {
						if(item.fieldContent == val.id) {
							item.resList = val.resList
						}
					})
				}
				if(item.fieldType == 1) {
					this.fieldBrowseList.forEach(val => {
						if(item.fieldContent == val.id) {
							item.toSelect = val
						}
					})
				}
				switch(item.fieldType) {
					//1浏览框、2字符型、3文本型、4整型、5浮点型、6富文本、7日期控件、8时间控件、9枚举项、10复选框
					case "1":
						//浏览框 : 一共有7种，其中1：公司，2：部门，3：职位可以共同使用同一个接口
						var list = JSON.parse(JSON.stringify(this.allOrganizationInfo))
						//公司
						if(item.toSelect.id == 1) {
							let ComData = this.maketree(list, '公司');
							//删除部门和职位信息
							/*for(var i = list[0].children.length - 1; i >= 0; i--) {
								if(list[0].children[i].ftype == 2) {
									list[0].children.splice(i, 1)
								} else {
									list[0].children[i].children = []
								}
							}
							item.browseBoxList = list
							*/
							item.browseBoxList = ComData;
							//部门
						} else if(item.toSelect.id == 2) {
							//删除职位信息
							/*list[0].children.forEach(val => {
								if(typeof(val.children) != "undefined") {
									val.children.forEach(valChild => {
										valChild.children = []
									})
								}
							})
							item.browseBoxList = list
							*/
							let ZhiwuData = this.maketree(list, '职位');
							item.browseBoxList = ZhiwuData
							//职位（无需删除，保留原数据）
						} else if(item.toSelect.id == 3) {
							item.browseBoxList = list
						}
						return "browseBox"
						break;
					case "2":
						return "character"
						break;
					case "3":
						return "textType"
						break;
					case "4":
						return "integers"
						break;
					case "5":
						return "floatingPoint"
						break;
					case "6":
						return "richText"
						break;
					case "7":
						return "dateControl"
						break;
					case "8":
						return "timeControl"
						break;
					case "9":
						return "select"
						break;
					case "10":
						return "checkBox"
						break;
				}
			},
			//整理主表数据
			preview2(rowConList) { //确认主表分类选定
				var cur = []
				let obj = {};
				//循环判断是否有添加服务的字段名
				rowConList.forEach((item, index1) => {
					this.tServiceByParams.forEach(val => {
						if(item.serviceId != null && item.serviceId == val.foid) {
							//服务显示名称
							this.$set(item, 'serviceCon', val.fname)
							//查询服务的参数：fid是根据条件查询的“条件” fcode是具体查询哪条服务的内容
							this.$set(item, 'serviceNow', {
								fid: "",
								fcode: val.fcode
							})
						}
					})
					item.parameterList = []
					//时间控件计算差值
					rowConList.forEach(itemChild => {
						//通过‘-’符号确定需要计算的两边
						if(item.serviceId == 5 && !this.noNull(item.parameter) && item.parameter.indexOf('-') != -1) {
							//left right 分别是需要计算的两个值的字段名称
							var index = item.parameter.indexOf('-')
							var left = item.parameter.substring(0, index)
							var right = item.parameter.substring(index + 1)
							//两个字段都要添加属性parameterList，里面存储需要计算的字段名和需要显示的字段名child
							if(left == itemChild.field || right == itemChild.field) {
								var a = {
									left: left,
									right: right,
									child: item.field
								}
								itemChild.parameterList.push(a)
							}
						}
						//发现被添加服务的字段后，绑定双方
						if(itemChild.parameter == item.field) {
							item.parameterList.push(itemChild.field)
						}

					})
					//行序按照填写排序
					item.fieldTypeName = this.fieldTypeShow2(item)
					if(obj[item.showNum]) {
						cur.forEach(val => {
							if(val.showNum == item.showNum) {
								val.colList.push(item)
							}
						})
					} else {
						obj[item.showNum] = true
						cur.push({
							showNum: item.showNum,
							colList: [item]
						});
					}
				})
				//列序按照填写排序
				var index = 0
				if(cur.length > 1) {
					cur.sort((a, b) => {
						a.colList.sort((a1, b1) => {
							//return a1.orderNum - b1.orderNum
							return Number(a1.orderNum) - Number(b1.orderNum)
						})
						if(index == 0) {
							b.colList.sort((a1, b1) => {
								//return a1.orderNum - b1.orderNum
								return Number(a1.orderNum) - Number(b1.orderNum)
							})
							index++
						}
						//return a.showNum - b.showNum
						return Number(a.showNum) - Number(b.showNum)
					})
				} else {
					cur[0].colList.sort((a1, b1) => {
						//return a1.orderNum - b1.orderNum
						return Number(a1.orderNum) - Number(b1.orderNum)
					})
				}
				this.conData.top.rowList = cur
			},
			//服务类型
			ftypeShow(row) {
				switch(row.ftype) {
					case "0":
						return "前台"
						break;
					case "1":
						return "后台"
						break;
				}
			},
			maketree(data, type) {
				let parent = [];
				for(var i = data[0].children.length - 1; i >= 0; i--) {
					if(type == "公司") {
						if(data[0].children[i].ftype == 1) {
							parent.push(data[0].children[i]);
						}
					} else {
						if(data[0].children[i].ftype == 1 || data[0].children[i].ftype == 2) {
							parent.push(data[0].children[i]);
						}
					}
				}
				children(parent, type);

				function children(parent, type) {
					if(parent) {
						for(var i = parent.length - 1; i >= 0; i--) {
							if(parent[i].children) {
								let obj = parent[i];
								obj.childrenList = [];
								for(var j = parent[i].children.length - 1; j >= 0; j--) {
									if(type == "公司") {
										if(parent[i].children[j].ftype == 1) {
											obj.childrenList.push(parent[i].children[j]);
										}
									} else {
										if(parent[i].children[j].ftype == 1 || parent[i].children[j].ftype == 2) {
											obj.childrenList.push(parent[i].children[j]);
										}
									}
								}
								obj.children = [];
								obj.children = obj.childrenList;
								delete obj.childrenList;
								parent[i] = obj;
								children(parent[i].children, type);
							} else {
								parent[i].children = [];
							}
						}
					}
				}
				let Fdata = data[0];
				Fdata.children = parent;
				let RetrunData = [];
				RetrunData.push(Fdata);
				return RetrunData;
			},
			//添加校验（显示的值的校验)
			fieldTypeShow(item) {
				//添加form动态表单的比对值fieldTypeName
				switch(item.fieldType) {
					//1浏览框、2字符型、3文本型、4整型、5浮点型、6富文本、7日期控件、8时间控件、9枚举项、10复选框
					//重组浏览框内的显示数据
					case "1":
						//浏览框 : 一共有7种，其中1：公司，2：部门，3：职位可以共同使用同一个接口
						var list = JSON.parse(JSON.stringify(this.allOrganizationInfo))
						//公司
						if(item.toSelect.id == 1) {
							//删除部门和职位信息
							/*for(var i = list[0].children.length - 1; i >= 0; i--) {
								if(list[0].children[i].ftype == 2) {
									list[0].children.splice(i, 1)
								} else {
									list[0].children[i].children = []
								}
							}
							item.browseBoxList = list
							*/
							let ComData = this.maketree(list, '公司');
							item.browseBoxList = ComData;
							//部门
						} else if(item.toSelect.id == 2) {
							//删除职位信息
							/*list[0].children.forEach(val => {
								if(typeof(val.children) != "undefined") {
									val.children.forEach(valChild => {
										valChild.children = []
									})
								}
							})
							item.browseBoxList = list
							*/
							let ZhiwuData = this.maketree(list, '职位');
							item.browseBoxList = ZhiwuData
							//职位（无需删除，保留原数据）
						} else if(item.toSelect.id == 3) {
							item.browseBoxList = list
						}
						return "browseBox"
						break;
					case "2":
						return "character"
						break;
					case "3":
						return "textType"
						break;
					case "4":
						return "integers"
						break;
					case "5":
						return "floatingPoint"
						break;
					case "6":
						return "richText"
						break;
					case "7":
						return "dateControl"
						break;
					case "8":
						return "timeControl"
						break;
					case "9":
						return "select"
						break;
					case "10":
						return "checkBox"
						break;
				}
			},
			//预览
			preview() {
				this.$refs.ruleFormTable.validate((valid) => {
					if(valid) {
						this.conData.bottom[0].showName = this.ruleForm.showName
						this.conData.bottom[0].type = this.ruleForm.type
						//确认子表分类选定
						if(this.ruleForm.workItemTypeSubName) {
							var cur = []
							let obj = {};
							//循环判断是否有添加服务的字段名
							this.ruleForm.lines.forEach((item, index1) => {
								item.parameterList = []
								//时间控件计算差值
								this.ruleForm.lines.forEach(itemChild => {
									//通过‘-’符号确定需要计算的两边
									if(item.serviceId == 5 && !this.noNull(itemChild.parameter) && itemChild.parameter.indexOf('-') != -1) {
										//left right 分别是需要计算的两个值的字段名称
										var index = itemChild.parameter.indexOf('-')
										var left = itemChild.parameter.substring(0, index)
										var right = itemChild.parameter.substring(index + 1)
										//两个字段都要添加属性parameterList，里面存储需要计算的字段名和需要显示的字段名child
										if(left == item.field || right == item.field) {
											var a = {
												left: left,
												right: right,
												child: item.field
											}
											itemChild.parameterList.push(a)
										}
									} else {
										//发现被添加服务的字段后，绑定双方
										if(itemChild.parameter == item.field) {
											item.parameterList.push(itemChild.field)
										}
									}

								})
								//行序按照填写排序
								item.fieldTypeName = this.fieldTypeShow(item)
								if(obj[item.showNum]) {
									cur.forEach(val => {
										if(val.showNum == item.showNum) {
											val.colList.push(item)
										}
									})
								} else {
									obj[item.showNum] = true
									cur.push({
										showNum: item.showNum,
										colList: [item]
									});
								}

							})
							//列序按照填写排序
							var index = 0
							cur.sort((a, b) => {
								a.colList.sort((a1, b1) => {
									//return a1.orderNum - b1.orderNum
									return Number(a1.orderNum) - Number(b1.orderNum)
								})
								if(index == 0) {
									b.colList.sort((a1, b1) => {
										//return a1.orderNum - b1.orderNum
										return Number(a1.orderNum) - Number(b1.orderNum)
									})
									index++
								}
								//return a.showNum - b.showNum
								return Number(a.showNum) - Number(b.showNum)
							})
							if(this.conData.bottom[0].type == 2) {
								this.$set(this.conData.bottom[0], "conList", [])
								cur.forEach(val1 => {
									val1.colList.forEach(val2 => {
										this.conData.bottom[0].conList.push(val2)
									})
								})
								this.conData.bottom[0].conList.sort((a1, b1) => {
									//return a1.orderNum - b1.orderNum
									return Number(a1.orderNum) - Number(b1.orderNum)
								})
							}
							this.conData.bottom[0].rowList = cur
							//打开预览页面
							this.showFigForm = true
						} else {
							this.goOut("请选择子表分类")
						}
					}
				});
			},
			//选择子表分类
			getSelectMainTableClassification() {
				if(this.$refs.child.rowClick.status != 3) {
					this.goOut("只能选择状态为 '有效' 的子表模板分类")
					return
				}
				this.ruleForm.lines = []
				//判断是否选中
				if(this.$refs.child.rowClick.id) {
					//调用查看详情接口
					this.$api.collaborativeOffice.getWorkItemTypeSubModel({
						id: this.$refs.child.rowClick.id
					}).then(data => {
						data.data.data.lines.forEach(item => {
							if(!item.forbid) {

								//为每一条数据定义好字段
								var con = JSON.parse(JSON.stringify(this.rowConNew))
								//枚举
								if(item.fieldType == 9) {
									//前台显示用，查看字段内容
									con.fieldContentName = item.fieldContentName
									//获取枚举LIST里面和字段相同的内容，并放入数据中，为了在后面显示用
									this.selectList.forEach(val => {
										if(item.fieldContent == val.id) {
											//resList 枚举的list
											con.resList = val.resList
											//枚举的ID
											con.fieldContent = val.id
										}
									})
								}
								//浏览框，同上面枚举
								if(item.fieldType == 1) {
									con.fieldContentName = item.fieldContentName
									this.fieldBrowseList.forEach(val => {
										if(item.fieldContent == val.id) {
											con.toSelect = val
											con.fieldContent = val.id
										}
									})
								}
								//获取其他字段，放入要传走的数据中
								con.field = item.field
								con.fieldName = item.fieldName
								con.fieldType = item.fieldType
								this.ruleForm.lines.push(con)
							}
						})
					})
					//子表分类名称显示
					this.ruleForm.workItemTypeSubName = this.$refs.child.rowClick.name
					//子表分类名称ID
					this.ruleForm.workItemTypeSub = this.$refs.child.rowClick.id
					this.dialogVisibleChild = false
				} else {
					this.$message.error("请选择数据");
				}
			},
			//获取服务
			findTServiceByParams(rowCon) {
				//服务中间值关联每一次打开的服务弹出框，修改this.rowCon 同时会修改行内容
				this.rowCon = rowCon
				this.dialogVisible_TServiceByParams = true
			},
			//服务--确定
			getTServiceByParams() {
				//服务显示名称
				this.$set(this.rowCon, 'serviceCon', this.tServiceByParamsCon.fname)
				//查询服务的参数：fid是根据条件查询的“条件” fcode是具体查询哪条服务的内容
				this.$set(this.rowCon, 'serviceNow', {
					fid: "",
					fcode: this.tServiceByParamsCon.fcode
				})
				//行内添加服务ID，需要后台存储
				this.rowCon.serviceId = this.tServiceByParamsCon.foid
				this.dialogVisible_TServiceByParams = false
			},
			//提交/暂存（1：提交，2：暂存）
			submitForm(formName) {
				var msg = ""
				if(formName == 1) {
					this.ruleForm.status = 1
					msg = "暂存成功"
				} else {
					this.ruleForm.status = 7
					msg = "新增成功"
				}
				this.$refs.ruleForm.validate((valid) => {
					if(valid) {
						this.$refs.ruleFormTable.validate((valid) => {
							if(valid) {
								this.ruleForm.oprStatus = 1
								this.ruleForm.lines.forEach(item => {
									item.oprStatus = 1
								})
								this.$api.collaborativeOffice.apiUrl("workItemTempSub/insertWorkItemTempSubModel", this.ruleForm).then(data => {
									if(this.dataBack(data, msg)) {
										this.$parent.toSelect()
									}
								})
							}
						});
					}
				});
			},
			//选中行
			clickRow(row) {
				//绑定中间值
				this.tServiceByParamsCon = row
			},
		}
	}
</script>
<style scoped="scoped">
	.el-icon-star-on:before {
		color: red;
		font-size: 20px;
	}
	
	>>>.el-card {
		margin-bottom: 10px;
	}
	
	>>>.el-card__body {
		padding: 10px;
	}
	
	>>>.el-input.is-disabled .el-input__inner {
		color: #000000 !important;
	}
	
	>>>.el-textarea.is-disabled .el-textarea__inner {
		color: #000000 !important;
	}
	
	>>>.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
		border-color: #000000!important;
	}
</style>