<template>
	<el-card>
		<el-row>
			<el-col style="text-align: center;" :span="24">工作事项模板主表分类</el-col>
		</el-row>
		<el-row style="margin-top: 10px;">
			<el-col :span="18">
				公司：
				<el-select :disabled="showFigAll" size='mini' v-model="ruleForm.company" placeholder="公司">
					<el-option v-for="item in CompanyData" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-col>
			<el-col style="text-align: right;" :span="6">
				<el-button @click="submitForm('ruleForm','ruleFormTable')" v-show="!showFigAll" type="success" size="mini" icon="el-icon-check">提交</el-button>
				<el-button type="danger" @click="$parent.toSelect()" size="mini" icon="el-icon-close">返回</el-button>
			</el-col>
		</el-row>
		<el-card style="margin-top: 10px;">
			<el-form size="mini" label-width="120px" :inline="true" :rules="rules" ref="ruleForm" :model="ruleForm" class="demo-form-inline">
				<el-row>
					<el-col :span="6">
						<el-form-item prop="code" label="主表分类编码">
							<el-input style="width: 150%;" clearable :disabled="showFigAll" v-model="ruleForm.code" maxlength="50" placeholder="主表分类编码"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="name" label="主表分类名称">
							<el-input style="width: 150%;" clearable :disabled="showFigAll" v-model="ruleForm.name" maxlength="100" placeholder="主表分类名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="tableName" label="数据库表名">
							<el-input style="width: 150%;" clearable :disabled="showFig || showFigAll" v-model="ruleForm.tableName" maxlength="25" placeholder="数据库表名"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="描述">
							<el-input clearable style="width: 150%;" :rows="1" :disabled="showFigAll" type="textarea" maxlength="3000" v-model="ruleForm.remark" placeholder="描述"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
		<el-card style="margin-top: 10px;">
			<el-row>
				<el-col style="text-align: center;" :span="24">工作事项模板主表分类行</el-col>
			</el-row>
			<el-form style="margin-top: 10px;" :model="ruleForm" :rules="rulesTable" ref="ruleFormTable">
				<el-table size="small" height="550" :data="ruleForm.lines" border style="width: 100%">
					<el-table-column prop="date" label="数据库字段名" align="center">
						<template slot-scope="scope">
							<el-form-item :prop="'lines[' + scope.$index + '].field'" :rules="rulesTable.field">
								<el-input clearable :disabled="scope.row.showFig || showFigAll" v-model="scope.row.field" maxlength="30" placeholder="数据库字段名"></el-input>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="字段显示名称" align="center">
						<template slot-scope="scope">
							<el-form-item :prop="'lines[' + scope.$index + '].fieldName'" :rules="rulesTable.fieldName">
								<el-input clearable :disabled="scope.row.showFig || showFigAll" v-model="scope.row.fieldName" maxlength="50" placeholder="字段显示名称"></el-input>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column prop="date" label="字段类型" align="center">
						<template slot-scope="scope">
							<el-form-item :prop="'lines[' + scope.$index + '].fieldType'" :rules="rulesTable.fieldType">
								<el-select clearable :disabled="scope.row.showFig || showFigAll" style="width: 100%;" v-model="scope.row.fieldType" placeholder="字段类型" @change="fieldChange(scope.row)">
									<el-option v-for="item in fieldTypeList" :key="item.id" :label="item.label" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column prop="date" label="字段内容" align="center">
						<template slot-scope="scope">
							<el-form-item :prop="'lines[' + scope.$index + '].fieldContentName'" :rules="rulesTable.fieldContentName">
								<el-input disabled placeholder="字段内容" v-model="scope.row.fieldContentName">
									<el-button :disabled="(scope.row.fieldType != '1' && scope.row.fieldType != '9') || scope.row.showFig  || showFigAll" @click="toFieldContent(scope.row)" slot="append" icon="el-icon-search"></el-button>
								</el-input>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column prop="date" label="是否禁用" width="120" align="center">
						<template slot-scope="scope">
							<el-form-item>
								<el-checkbox @change="forbidChange(scope.row)" :disabled="showFigAll" v-model="scope.row.forbid"></el-checkbox>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column v-if="!showFigAll" prop="date" label="操作" width="120" align="center">
						<template slot="header" slot-scope="scope">
							<el-button @click="toAddTable" type="success" icon="el-icon-plus">新增</el-button>
						</template>
						<template slot-scope="scope">
							<el-form-item v-if="!scope.row.showFig">
								<el-button @click="toDelTable(scope.$index)" type="danger">删除</el-button>
							</el-form-item>
						</template>
					</el-table-column>
				</el-table>
			</el-form>
		</el-card>
		<!--弹出框-->
		<el-dialog title="工作事项模板主表分类" center :visible.sync="dialogVisible" width="40%">
			<el-table size="small" highlight-current-row @row-click="clickRow" :data="fieldBrowseList" border>
				<el-table-column prop="code" label="编码"></el-table-column>
				<el-table-column prop="name" label="名称"></el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="fieldContentSave">确 定</el-button>
			</div>
		</el-dialog>
	</el-card>
</template>
<script>
	export default {
		props: {
			showFigNum: String,
			context: Object
		},
		data() {
			//			自定义的校验规则
			var fieldContentShow = (rule, value, callback) => {
				if(this.ruleForm.lines[rule.field.substring(rule.field.indexOf("[") + 1, rule.field.indexOf("]"))].fieldType == 1 ||
					this.ruleForm.lines[rule.field.substring(rule.field.indexOf("[") + 1, rule.field.indexOf("]"))].fieldType == 9) {
					if(this.noNull(value)) {
						callback(new Error('请填写字段内容'));
					} else {
						callback();
					}
				} else {
					callback();
				}
			};
			return {
				showFig: false,
				showFigAll: false,
				//选中行ID
				rowClick: {},
				//弹出框
				dialogVisible: false,
				//字段内容弹框
				fieldBrowseList: [],
				//校验规则-表单
				rules: {
					code: [{
							required: true,
							message: '请输入主表分类编码',
							trigger: 'change'
						},
						{
							pattern: /^[a-z_A-Z0-9-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]\/",'<>~\·`\?:;|]+$/,
							message: '请输入主表分类编码为英文、数字、英文符号'
						}
					],
					name: [{
							required: true,
							message: '请输入主表分类名称',
							trigger: 'change'
						},
						{
							pattern: "[\u4e00-\u9fa5]",
							message: '请输入主表分类名称为中文'
						}
					],
					tableName: [{
						required: true,
						message: '请输入数据库表名',
						trigger: 'change'
					}, {
						pattern: /^[a-z_A-Z0-9-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]\/",'<>~\·`\?:;|]+$/,
						message: '请输入正确的数据库表名'
					}
          ]
				},
				//校验规则-table
				rulesTable: {
					fieldContentName: [{
						validator: fieldContentShow,
						trigger: 'change'
					}],
					field: [{
						required: true,
						message: "请输入数据库字段名",
						trigger: "change"
					}, {
						pattern: /^[a-zA-Z]+$/,
						message: '请输入数据库字段名为英文'
					}],
					fieldName: [{
							required: true,
							message: "请输入字段显示名称",
							trigger: "change"
						},
						{
							pattern: "[\u4e00-\u9fa5]",
							message: '请输入字段显示名称为中文'
						}
					],
					fieldType: [{
						required: true,
						message: "请选择字段类型",
						trigger: "change"
					}]
				},
				//字段内容中间变量
				fieldContent: {},
				oneCon: {
					field: "",
					fieldName: "",
					fieldType: "",
					fieldContent: "",
					fieldContentName: "",
					oprStatus: 1,
					checked: false,
					showFig: false,
				},
				ruleFormTable: {},
				CompanyData: [],
				fieldTypeList: this.$GLOBAL.fieldTypeList,
				ruleForm: {
					code: "",
					name: "",
					tableName: "",
					remark: "",
					creator: localStorage.getItem('ms_userId'),
					company: "",
					lines: [{
						field: "",
						fieldName: "",
						fieldType: "",
						fieldContent: "",
						fieldContentName: "",
						oprStatus: 1,
						forbid: false,
						showFig: false,
					}],
				},
				//全部公司
				CompanyData: JSON.parse(localStorage.getItem('CompanyData')),
			}
		},
		created() {
			if(this.showFigNum == "2") {
				this.showFig = true
				this.context.lines.forEach(item => {
					item.showFig = true
				})
				this.ruleForm = this.context
			} else if(this.showFigNum == "3") {
				this.showFigAll = true
				this.ruleForm = this.context
			}
			this.CompanyData.forEach(item => {
				if(item.name == "福佳集团") {
					this.ruleForm.company = item.id
				}
			})
		},
		methods: {
		  //字段类型改变
      fieldChange(row){
        if(row.fieldType != 9){
          this.fieldContent.fieldContent = null;
          this.fieldContent.fieldContentName = null;
        }
      },
			//状态改变
			forbidChange(row) {
				if(this.showFig) {
					row.oprStatus = 2
				}
			},
			//新增table数据
			toAddTable() {
				this.ruleForm.lines.push(JSON.parse(JSON.stringify(this.oneCon)))
			},
			//删除table数据
			toDelTable(index) {
				this.ruleForm.lines.splice(index, 1)
			},
			//提交
			submitForm(formName) {
				this.$refs.ruleForm.validate((valid) => {
					if(valid) {
						this.$refs.ruleFormTable.validate((valid) => {
							if(valid) {
								if(this.showFig) {
									this.$api.collaborativeOffice.updateWorkItemTypeModel(this.ruleForm).then(data => {
										if(this.dataBack(data, "修改成功")) {
											this.$parent.toSelect()
										}
									})
								} else {
									this.$api.collaborativeOffice.insertWorkItemTypeModel(this.ruleForm).then(data => {
										if(this.dataBack(data, "新增成功")) {
											this.$parent.toSelect()
										}
									})
								}
							}
						});
					}
				});
			},
			//字段类型改变
			fieldTypeSave(row) {
				row.fieldContent = ""
			},
			//打开字段内容
			toFieldContent(row) {
				this.fieldContent = row
				if(row.fieldType == "1") {
					this.$api.collaborativeOffice.getFieldBrowse().then(data => {
						this.fieldBrowseList = data.data.data
					})
				} else {
					this.$api.collaborativeOffice.findList().then(data => {
						this.fieldBrowseList = data.data.data
					})
				}
				this.dialogVisible = true
			},
			//选择字段内容
			fieldContentSave() {
				this.fieldContent.fieldContent = this.rowClick.id
				this.fieldContent.fieldContentName = this.rowClick.name
				this.dialogVisible = false
			},
			//选中行
			clickRow(row) {
				this.rowClick = row
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
		/*margin-bottom: 10px;*/
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
</style>
