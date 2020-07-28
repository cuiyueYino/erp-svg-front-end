<template>
	<div>
		<el-card class="box-card">
			<el-row>
				<el-col :span="23">工作事项模板主表分类</el-col>
				<el-col :span="1">
					<el-button type="danger" @click="$parent.toSelect()" size="mini" icon="el-icon-close"></el-button>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="22">
					公司：
					<el-select size='mini' v-model="ruleForm.value" placeholder="公司">
						<el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
						</el-option>
					</el-select>
				</el-col>
				<el-col :span="2">
					<el-button v-show="!showFigAll" type="success" size="mini" icon="el-icon-check">提交</el-button>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<el-form size="mini" label-width="120px" :inline="true" :rules="rules" ref="ruleForm" :model="ruleForm" class="demo-form-inline">
				<el-row>
					<el-col :span="8">
						<el-form-item prop="code" label="主表分类编码">
							<el-input clearable :disabled="showFig || showFigAll" v-model="ruleForm.code" maxlength="50" placeholder="主表分类编码"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item prop="name" label="主表分类名称">
							<el-input clearable :disabled="showFig || showFigAll" v-model="ruleForm.name" maxlength="50" placeholder="主表分类名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item prop="tableName" label="数据库表名">
							<el-input clearable :disabled="showFig || showFigAll" v-model="ruleForm.tableName" maxlength="50" placeholder="数据库表名"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-form-item label="描述">
						<el-input clearable :disabled="showFigAll" style="width: 1100px;" type="textarea" maxlength="1500" v-model="ruleForm.remark" placeholder="描述"></el-input>
					</el-form-item>
				</el-row>
			</el-form>
		</el-card>
		<el-card class="box-card">
			<el-row>
				<el-col :span="22">工作事项模板主表分类行</el-col>
				<el-col :span="1">
					<el-button v-show="!showFigAll" @click="ruleFormTable.tableData.push(oneCon)" type="success" size="mini" icon="el-icon-plus">新增</el-button>
				</el-col>
			</el-row>

			<el-form :model="ruleFormTable" :rules="rulesTable" ref="ruleFormTable">
				<el-table height="400" :data="ruleFormTable.tableData" border style="width: 100%">
					<el-table-column prop="date" label="数据库字段名" align="center">
						<template slot-scope="scope">
							<el-form-item :prop="'tableData[' + scope.$index + '].field'" :rules="rulesTable.field">
								<el-input clearable :disabled="scope.row.showFig || showFigAll" v-model="scope.row.field" maxlength="50" placeholder="数据库字段名"></el-input>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column prop="name" label="字段显示名称" align="center">
						<template slot-scope="scope">
							<el-form-item :prop="'tableData[' + scope.$index + '].fieldName'" :rules="rulesTable.fieldName">
								<el-input clearable :disabled="scope.row.showFig || showFigAll" v-model="scope.row.fieldName" maxlength="25" placeholder="字段显示名称"></el-input>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column prop="date" label="字段类型" align="center">
						<template slot-scope="scope">
							<el-form-item :prop="'tableData[' + scope.$index + '].fieldType'" :rules="rulesTable.fieldType">
								<el-select clearable :disabled="scope.row.showFig || showFigAll" style="width: 100%;" v-model="scope.row.fieldType" placeholder="字段类型">
									<el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
									</el-option>
								</el-select>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column prop="date" label="字段内容" align="center">
						<template slot-scope="scope">
							<el-form-item>
								<el-input disabled placeholder="字段显示名称" v-model="scope.row.fieldContent">
									<el-button :disabled="(scope.row.fieldType != '11' && scope.row.fieldType != '19') || scope.row.showFig  || showFigAll" @click="toFieldContent(scope.row)" slot="append" icon="el-icon-search"></el-button>
								</el-input>
							</el-form-item>
						</template>
					</el-table-column>
					<el-table-column prop="date" label="是否禁用" width="120" align="center">
						<template slot-scope="scope">
							<el-form-item>
								<el-checkbox :disabled="showFigAll" v-model="scope.row.checked"></el-checkbox>
							</el-form-item>
						</template>
					</el-table-column>
				</el-table>
			</el-form>
		</el-card>
		<!--弹出框-->
		<el-dialog title="工作事项模板主表分类" center :visible.sync="dialogVisible" width="40%">
			<el-table :row-class-name="tableRowClassName" @row-click="clickRow" :data="options" border>
				<el-table-column prop="id" label="编码"></el-table-column>
				<el-table-column prop="label" label="名称"></el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		props: {
			showFigNum: String
		},
		data() {
			//自定义的校验规则
			var tableNameShow = (rule, value, callback) => {
				if(value.substring(0, 5) != "gzsx_") {
					callback(new Error('数据库表名必须以gzsx_为开头'));
				} else {
					callback();
				}
			};
			return {
				showFig: false,
				showFigAll: false,
				//选中行ID
				rowClickId: "",
				//弹出框
				dialogVisible: false,
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
					tableName: [{
						required: true,
						message: '请输入数据库表名',
						trigger: 'blur'
					}, {
						pattern: /^[a-z_A-Z0-9-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]\/",'<>~\·`\?:;|]+$/,
						message: '请输入正确的数据库表名'
					}, {
						validator: tableNameShow,
						trigger: 'blur'
					}]
				},
				//校验规则-table
				rulesTable: {
					field: [{
						required: true,
						message: "请输入数据库字段名",
						trigger: "blur"
					}, {
						pattern: /^[a-zA-Z]+$/,
						message: '请输入正确的数据库字段名'
					}],
					fieldName: [{
							required: true,
							message: "请输入字段显示名称",
							trigger: "blur"
						},
						{
							pattern: "[\u4e00-\u9fa5]",
							message: '请输入正确的字段显示名称'
						}
					],
					fieldType: [{
						required: true,
						message: "请选择字段类型",
						trigger: "blur"
					}],
				},
				oneCon: {
					field: "",
					fieldName: "",
					fieldType: "",
					fieldContent: "",
					checked: false,
					showFig: false,
				},
				ruleFormTable: {
					tableData: [{
						field: "",
						fieldName: "",
						fieldType: "",
						fieldContent: "",
						checked: false,
						showFig: false,
					}],
				},
				options: [{
					id: '11',
					label: '浏览框'
				}, {
					id: '12',
					label: '字符型'
				}, {
					id: '13',
					label: '文本型'
				}, {
					id: '14',
					label: '整型'
				}, {
					id: '15',
					label: '浮点型'
				}, {
					id: '16',
					label: '富文本'
				}, {
					id: '17',
					label: '日期控件'
				}, {
					id: '18',
					label: '时间控件'
				}, {
					id: '19',
					label: '枚举项'
				}, {
					id: '10',
					label: '复选框'
				}, ],
				ruleForm: {
					value: "1",
					user: ""
				},
			}
		},
		created() {
			if(this.showFigNum == "2") {
				this.showFig = true
				this.ruleFormTable.tableData = [{
					field: "",
					fieldName: "",
					fieldType: "",
					fieldContent: "",
					checked: false,
					showFig: true,
				}]
			} else if(this.showFigNum == "3") {
				this.showFigAll = true
			}
		},
		methods: {
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
				if(row.id == this.rowClickId) {
					color = "warning-row"
				}
				return color;
			},
			//选中行
			clickRow(row) {
				this.rowClickId = row.id
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
</style>