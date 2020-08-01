<template>
	<div>
		<div v-if="!showFigForm">
			<el-card class="box-card">
				<el-row>
					<el-col :span="23">工作事项模板主表</el-col>
					<el-col :span="1" style="text-align: right;">
						<el-button type="danger" @click="$parent.toSelect()" size="mini" icon="el-icon-close"></el-button>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="18">
						公司：
						<el-select size='mini' v-model="ruleForm.company" placeholder="公司">
							<el-option v-for="item in CompanyData" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="6" style="text-align: right;">
						<el-button @click="submitForm(2)" type="success" size="mini" icon="el-icon-check">提交</el-button>
						<el-button @click="submitForm(1)" type="success" size="mini" icon="el-icon-check">暂存</el-button>
						<el-button @click="preview()" type="success" size="mini" icon="el-icon-check">预览</el-button>
					</el-col>
				</el-row>
			</el-card>
			<el-card class="box-card">
				<el-form size="mini" label-width="80px" :inline="true" :rules="rules" ref="ruleForm" :model="ruleForm" class="demo-form-inline">
					<el-row>
						<el-col :span="6">
							<el-form-item prop="code" label="主表编码">
								<el-input style="width: 110%;" clearable v-model="ruleForm.code" maxlength="50" placeholder="主表编码"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item prop="name" label="主表名称">
								<el-input style="width: 110%;" clearable v-model="ruleForm.name" maxlength="50" placeholder="主表名称"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item prop="workItemTypeName" label="主表分类">
								<el-input style="width: 110%;" disabled placeholder="主表分类" v-model="ruleForm.workItemTypeName">
									<el-button @click="dialogVisible = true" slot="append" icon="el-icon-search"></el-button>
								</el-input>
							</el-form-item>
						</el-col>
						<el-col :span="6">
							<el-form-item label="描述">
								<el-input clearable style="width: 130%;" type="textarea" :rows="1" maxlength="1500" v-model="ruleForm.remark" placeholder="描述"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-card>
			<el-card class="box-card">
				<el-row>
					<el-col>工作事项模板主表行</el-col>
				</el-row>
				<el-form :model="ruleForm" :rules="rulesTable" ref="ruleFormTable">
					<el-table size="small" height="400" :data="ruleForm.lines" border style="width: 100%">
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
								<el-form-item :prop="'lines[' + scope.$index + '].lengthType'" :rules="rulesTable.lengthType">
									<el-select style="width: 100%;" v-model="scope.row.lengthType" placeholder="字段长度类型">
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
								<el-form-item :prop="'lines[' + scope.$index + '].orderNum'" :rules="rulesTable.orderNum">
									<el-input v-model="scope.row.orderNum" placeholder=""></el-input>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="showNum" label="显示行数" align="center">
							<template slot-scope="scope">
								<el-form-item :prop="'lines[' + scope.$index + '].showNum'" :rules="rulesTable.showNum">
									<el-input v-model="scope.row.showNum" placeholder=""></el-input>
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
						<el-table-column prop="serviceId" label="服务" align="center" width="180">
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
			<el-dialog title="工作事项模板主表分类" top="1vh" :destroy-on-close="true" center :visible.sync="dialogVisible" width="80%">
				<selectMainTableClassification show="1" ref="child"></selectMainTableClassification>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="getSelectMainTableClassification">确 定</el-button>
				</div>
			</el-dialog>
			<!--弹出框-->
			<el-dialog title="服务" top="1vh" :destroy-on-close="true" center :visible.sync="dialogVisible_TServiceByParams" width="60%">
				<el-table :row-class-name="tableRowClassName" @row-click="clickRow" :data="tServiceByParams" border>
					<el-table-column prop="fcode" label="服务编码"></el-table-column>
					<el-table-column :formatter="ftypeShow" prop="ftype" label="服务类型"></el-table-column>
					<el-table-column prop="fname" label="服务名称"></el-table-column>
					<el-table-column prop="fdescription" label="描述"></el-table-column>
				</el-table>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible_TServiceByParams = false">取 消</el-button>
					<el-button type="primary" @click="getTServiceByParams">确 定</el-button>
				</div>
			</el-dialog>
		</div>
		<div v-if="showFigForm">
			<formIcon :rules="rulesChild" :form-data="previewList">
				<el-row style="text-align: right;margin-bottom: 10px;">
					<el-button icon="el-icon-arrow-left" size="mini" type="danger" plain @click="showFigForm = false">返回</el-button>
				</el-row>
			</formIcon>
		</div>
	</div>
</template>
<script>
	import selectMainTableClassification from './select-main-table-classification';
	import formIcon from '../../../views/collaborative-office/components/encapsulation/form-icon';
	export default {
		components: {
			selectMainTableClassification,
			formIcon
		},
		props: {
			context: Object
		},
		data() {
			return {
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
				//服务
				tServiceByParams: [],
				showFigForm: false,
				showFig: false,
				//选中行ID
				rowClickId: "",
				//弹出框
				dialogVisible: false,
				dialogVisible_fieldLength: false,
				dialogVisible_TServiceByParams: false,
				//服务 中间值
				rowCon: {},
				//服务选中
				tServiceByParamsCon: "",
				//校验规则-表单
				rules: {
					code: [{
							required: true,
							message: '请输入主表分类编码',
							trigger: 'blur'
						},
						{
							pattern: /^[a-z_A-Z0-9-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]\/",'<>~\·`\?:;|]+$/,
							message: '请输入正确的主表分类编码'
						}
					],
					name: [{
							required: true,
							message: '请输入主表分类名称',
							trigger: 'blur'
						},
						{
							pattern: "[\u4e00-\u9fa5]",
							message: '请输入正确的主表分类名称'
						}
					],
					workItemTypeName: [{
						required: true,
						message: '请选择主表分类',
						trigger: 'blur'
					}],
				},
				//校验规则-table
				rulesTable: {
					lengthType: [{
						required: true,
						message: "请选择字段长度类型",
						trigger: "blur"
					}],
					orderNum: [{
						required: true,
						message: "请输入显示顺序",
						trigger: "blur"
					}],
					showNum: [{
						required: true,
						message: "请填写显示行数",
						trigger: "blur"
					}],
				},
				ruleFormTable: {},
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
					oprStatus: 2,
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
				ruleForm: {
					code: "",
					name: "",
					tableName: "",
					oprStatus: 1,
					remark: "",
					creator: localStorage.getItem('ms_userId'),
					company: "",
					workItemTypeName: "",
					lines: [],
				},
				previewList: {
					labelWidth: '100px',
					inline: false,
					labelPosition: 'right',
					size: 'small',
					rowList: []
				},
				//公司
				CompanyData: [],
				//预览校验规则
				rulesChild: {},
				//全部枚举
				selectList: [],
				//工作事项
				fieldBrowseList: [],
				//公司部门职位的合集
				allOrganizationInfo: []
			}
		},
		created() {
			this.ruleForm = this.context
			this.$api.collaborativeOffice.getCompanyData().then(data => {
				this.CompanyData = data.data.data.rows
				this.CompanyData.forEach(item => {
					if(item.name == "福佳集团") {
						this.ruleForm.company = item.id
					}
				})
			})
			//全部枚举
			this.$api.collaborativeOffice.findList({}).then(data => {
				this.selectList = data.data.data
			})
			//全部服务
			this.$api.collaborativeOffice.findTServiceByParams({}).then(data => {
				this.tServiceByParams = data.data.data
			})
			//工作事项
			this.$api.collaborativeOffice.getFieldBrowse().then(data => {
				this.fieldBrowseList = data.data.data
			})
			//公司 部门 职位
			this.$api.management.selectAllOrganizationInfo().then(data => {
				this.goOk("最大数据已经返回，可以预览")
				this.allOrganizationInfo = eval('(' + data.data.data + ')')
			})
		},
		methods: {
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
			fieldTypeShow(item) {
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
				this.rulesChild[item.field] = []
				if(item.required) {
					this.rulesChild[item.field].push({
						required: true,
						message: "请填写" + item.fieldName,
						trigger: 'blur'
					})
				}
				switch(item.fieldType) {
					//1浏览框、2字符型、3文本型、4整型、5浮点型、6富文本、7日期控件、8时间控件、9枚举项、10复选框
					case "1":
						//浏览框 : 一共有7种，其中1：公司，2：部门，3：职位可以共同使用同一个接口
						var list = JSON.parse(JSON.stringify(this.allOrganizationInfo))
						//公司
						if(item.toSelect.id == 1) {
							//删除部门和职位信息
							for(var i = list[0].children.length - 1; i >= 0; i--) {
								if(list[0].children[i].ftype == 2) {
									list[0].children.splice(i, 1)
								} else {
									list[0].children[i].children = []
								}
							}
							item.browseBoxList = list
							//部门
						} else if(item.toSelect.id == 2) {
							//删除职位信息
							list[0].children.forEach(val => {
								if(typeof(val.children) != "undefined") {
									val.children.forEach(valChild => {
										valChild.children = []
									})
								}
							})
							item.browseBoxList = list
							//职位（无需删除，保留原数据）
						} else if(item.toSelect.id == 3) {
							item.browseBoxList = list
						} else if(item.toSelect.id == 4) {

						} else if(item.toSelect.id == 5) {

						} else if(item.toSelect.id == 6) {

						} else if(item.toSelect.id == 7) {

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
						this.rulesChild[item.field].push({
							pattern: /^-?[1-9]\d*$/,
							message: '请输入正确的' + item.fieldName,
							trigger: 'blur'
						}, {
							max: 20,
							message: '长度至多20位字符',
							trigger: 'blur'
						})
						return "integers"
						break;
					case "5":
						this.rulesChild[item.field].push({
							pattern: /^([1-9]\d{0,15}|0)(\.\d{1,4})?$/,
							message: '请输入正确的' + item.fieldName,
							trigger: 'blur'
						})
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
						if(this.ruleForm.workItemTypeName) {
							var cur = []
							let obj = {};
							this.rulesChild = {}
							this.ruleForm.lines.forEach(item => {
								item.parameterList = []
								this.ruleForm.lines.forEach(itemChild => {
									if(itemChild.parameter == item.field) {
										item.parameterList.push(itemChild.field)
									}
								})
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
							//按照行序进行排序
							var index = 0
							cur.sort((a, b) => {
								a.colList.sort((a1, b1) => {
									return a1.orderNum - b1.orderNum
								})
								if(index == 0) {
									b.colList.sort((a1, b1) => {
										return a1.orderNum - b1.orderNum
									})
									index++
								}
								return a.showNum - b.showNum
							})
							this.previewList.rowList = cur
							this.showFigForm = true
						} else {
							this.goOut("请选择主表分类")
						}
					}
				});
			},
			//选择主表分类
			getSelectMainTableClassification() {
				this.ruleForm.lines = []
				if(this.$refs.child.rowClick.id) {
					this.$api.collaborativeOffice.getWorkItemTypeModel({
						id: this.$refs.child.rowClick.id
					}).then(data => {
						data.data.data.lines.forEach(item => {
							var con = JSON.parse(JSON.stringify(this.rowConNew))
							if(item.fieldType == 9) {
								this.selectList.forEach(val => {
									if(item.fieldContent == val.id) {
										con.resList = val.resList
									}
								})
							}
							if(item.fieldType == 1) {
								this.fieldBrowseList.forEach(val => {
									if(item.fieldContent == val.id) {
										con.toSelect = val
									}
								})
							}
							con.field = item.field
							con.fieldName = item.fieldName
							con.fieldType = item.fieldType
							this.ruleForm.lines.push(con)
						})
					})
					this.ruleForm.workItemTypeName = this.$refs.child.rowClick.name
					this.ruleForm.workItemType = this.$refs.child.rowClick.id
					this.dialogVisible = false
				} else {
					this.$message.error("请选择数据");
				}
			},
			//获取服务
			findTServiceByParams(rowCon) {
				this.rowCon = rowCon
				this.dialogVisible_TServiceByParams = true
			},
			//服务--确定
			getTServiceByParams() {
				//				this.$api.collaborativeOffice.findTServiceItemByParams({
				//					fcode: "service10",
				//					fid: "BFPID000000LSN02D0"
				//				}).then(data => {
				//					console.log(data)
				//				})
				//				return
				this.$set(this.rowCon, 'serviceCon', this.tServiceByParamsCon.fname)
				this.$set(this.rowCon, 'serviceNow', {
					fid: this.tServiceByParamsCon.foid,
					fcode: this.tServiceByParamsCon.fcode
				})
				this.rowCon.serviceId = this.tServiceByParamsCon.foid
				this.dialogVisible_TServiceByParams = false
			},
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
								this.ruleForm.oprStatus = 2
								this.ruleForm.lines.forEach(item => {
									item.oprStatus = 2
								})
								this.$api.collaborativeOffice.updateWorkItemTempModel(this.ruleForm).then(data => {
									if(this.dataBack(data, msg)) {
										this.$parent.toSelect()
									}
								})
							}
						});
					}
				});
			},
			//新增
			toFieldContent(row) {
				this.dialogVisible = true
			},
			// 选中背景色
			tableRowClassName({
				row,
				rowIndex
			}) {
				var color = ""
				if(row.foid == this.tServiceByParamsCon.foid) {
					color = "warning-row"
				}
				return color;
			},
			//选中行
			clickRow(row) {
				console.log(row)
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
	
	.el-table>>>.warning-row {
		background-color: #ffe48d;
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