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
						<el-select size='mini' v-model="ruleForm.value" placeholder="公司">
							<el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="6" style="text-align: right;">
						<el-button @click="submitForm('ruleForm','ruleFormTable')" v-show="!showFigAll" type="success" size="mini" icon="el-icon-check">提交</el-button>
						<el-button @click="submitForm('ruleForm','ruleFormTable')" v-show="!showFigAll" type="success" size="mini" icon="el-icon-check">暂存</el-button>
						<el-button @click="preview()" v-show="!showFigAll" type="success" size="mini" icon="el-icon-check">预览</el-button>
					</el-col>
				</el-row>
			</el-card>
			<el-card class="box-card">
				<el-form size="mini" label-width="120px" :inline="true" :rules="rules" ref="ruleForm" :model="ruleForm" class="demo-form-inline">
					<el-row>
						<el-col :span="8">
							<el-form-item prop="code" label="主表编码">
								<el-input clearable :disabled="showFigAll" v-model="ruleForm.code" maxlength="50" placeholder="主表编码"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item prop="name" label="主表名称">
								<el-input clearable :disabled="showFigAll" v-model="ruleForm.name" maxlength="50" placeholder="主表名称"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="8">
							<el-form-item prop="tableName" label="主表分类">
								<el-input disabled placeholder="主表分类" v-model="ruleForm.workItemTypeName">
									<el-button :disabled="showFig || showFigAll" @click="dialogVisible = true" slot="append" icon="el-icon-search"></el-button>
								</el-input>
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
					<el-col>工作事项模板主表行</el-col>
				</el-row>
				<el-form :model="ruleForm" :rules="rulesTable" ref="ruleFormTable">
					<el-table size="mini" height="400" :data="ruleForm.lines" border style="width: 100%">
						<el-table-column prop="field" label="数据库字段名" align="center" width="100">
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
										<el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="lengthType" label="字段长度类型" align="center" width="180">
							<template slot-scope="scope">
								<el-form-item :prop="'lines[' + scope.$index + '].field'" :rules="rulesTable.field">
									<el-input disabled placeholder="字段长度类型" v-model="scope.row.lengthType">
										<el-button @click="getFieldLength(scope.row)" slot="append" icon="el-icon-search"></el-button>
									</el-input>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="show" label="是否显示" align="center">
							<template slot-scope="scope">
								<el-form-item :prop="'lines[' + scope.$index + '].field'" :rules="rulesTable.field">
									<el-checkbox v-model="scope.row.show"></el-checkbox>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="orderNum" label="显示顺序" align="center">
							<template slot-scope="scope">
								<el-form-item :prop="'lines[' + scope.$index + '].field'" :rules="rulesTable.field">
									<el-input v-model="scope.row.orderNum" placeholder="显示顺序"></el-input>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="showNum" label="显示行数" align="center">
							<template slot-scope="scope">
								<el-form-item :prop="'lines[' + scope.$index + '].field'" :rules="rulesTable.field">
									<el-input v-model="scope.row.showNum" placeholder="显示行数"></el-input>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="required" label="是否必填" align="center">
							<template slot-scope="scope">
								<el-form-item :prop="'lines[' + scope.$index + '].field'" :rules="rulesTable.field">
									<el-checkbox v-model="scope.row.required"></el-checkbox>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="choice" label="是否多选" align="center">
							<template slot-scope="scope">
								<el-form-item :prop="'lines[' + scope.$index + '].field'" :rules="rulesTable.field">
									<el-checkbox v-model="scope.row.choice"></el-checkbox>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="edit" label="是否可编辑" align="center">
							<template slot-scope="scope">
								<el-form-item :prop="'lines[' + scope.$index + '].field'" :rules="rulesTable.field">
									<el-checkbox v-model="scope.row.edit"></el-checkbox>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="serviceId" label="服务" align="center" width="180">
							<template slot-scope="scope">
								<el-form-item :prop="'lines[' + scope.$index + '].field'" :rules="rulesTable.field">
									<el-input disabled v-model="scope.row.serviceCon">
										<el-button @click="findTServiceByParams(scope.row)" slot="append" icon="el-icon-search"></el-button>
									</el-input>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="parameter" label="参数" align="center">
							<template slot-scope="scope">
								<el-form-item :prop="'lines[' + scope.$index + '].field'" :rules="rulesTable.field">
									<el-input v-model="scope.row.parameter" placeholder="参数"></el-input>
								</el-form-item>
							</template>
						</el-table-column>
					</el-table>
				</el-form>
			</el-card>
			<!--弹出框-->
			<el-dialog title="工作事项模板主表分类" :destroy-on-close="true" center :visible.sync="dialogVisible" width="80%">
				<selectMainTableClassification show="1" ref="child"></selectMainTableClassification>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="getSelectMainTableClassification">确 定</el-button>
				</div>
			</el-dialog>
			<!--弹出框-->
			<el-dialog title="字段长度类型" :destroy-on-close="true" center :visible.sync="dialogVisible_fieldLength" width="20%">
				<el-tree :data="fieldLengthList" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible_fieldLength = false">取 消</el-button>
					<el-button type="primary" @click="getFieldLengthSuccess">确 定</el-button>
				</div>
			</el-dialog>
			<!--弹出框-->
			<el-dialog title="服务" :destroy-on-close="true" center :visible.sync="dialogVisible_TServiceByParams" width="60%">
				<el-table :row-class-name="tableRowClassName" @row-click="clickRow" :data="tServiceByParams" border>
					<el-table-column prop="fcode" label="服务编码"></el-table-column>
					<el-table-column :formatter="ftypeShow" prop="ftype" label="服务类型"></el-table-column>
					<el-table-column prop="fname" label="服务名称"></el-table-column>
					<el-table-column prop="fdescription" label="描述"></el-table-column>
				</el-table>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible_fieldLength = false">取 消</el-button>
					<el-button type="primary" @click="getTServiceByParams">确 定</el-button>
				</div>
			</el-dialog>
		</div>
		<div v-if="showFigForm">
			<el-row style="text-align: right;">
				<el-button @click="showFigForm = false">返回</el-button>
			</el-row>
			<formIcon :form-data="previewList"></formIcon>
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
			showFigNum: String,
			context: Object
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
				//服务
				tServiceByParams: [],
				showFigForm: false,
				showFig: false,
				showFigAll: false,
				//选中行ID
				rowClickId: "",
				//弹出框
				dialogVisible: false,
				dialogVisible_fieldLength: false,
				dialogVisible_TServiceByParams: false,
				//字段长度类型
				fieldLengthList: [],
				//字段长度类型-定义子类名称
				defaultProps: {
					children: 'types',
					label: 'typeName'
				},
				//字段长度类型 / 服务 中间值
				rowCon: {},
				//字段长度类型选中
				fieldLengthCon: "",
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
				ruleFormTable: {},
				options: [{
					id: '11',
					label: '浏览框'
				}, {
					id: 'text',
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
					id: 'select',
					label: '枚举项'
				}, {
					id: '10',
					label: '复选框'
				}, ],
				ruleForm: {
					code: "",
					name: "",
					tableName: "",
					remark: "",
					lines: [{
						choice: true,
						//是否多选
						edit: true,
						//是否可编辑
						field: "aaaa",
						//数据库字段
						fieldName: "申请人",
						//显示名称
						fieldType: "text",
						//字段类型： 1 浏览框、 2 字符型、 3 文本型、 4 整型、 5 浮点型、 6 富文本、 7 日期控件、 8 时间控件、 9 枚举项、 10 复选框
						lengthType: "1",
						//字段长度类型
						//						oprStatus: "",
						//明细行操作类型： 1 新建、 2 修改、 3 删除、 0 未变
						orderNum: "1",
						//显示顺序
						parameter: "22222",
						//参数
						required: true,
						//是否必填
						serviceId: "11111",
						//服务
						show: true,
						//是否显示
						showNum: "2",
						//显示行数
					}, {
						choice: true,
						edit: true,
						field: "ssss",
						fieldName: "申请部门",
						fieldType: "select",
						lengthType: "1",
						orderNum: "1",
						parameter: "22222",
						required: true,
						serviceId: "11111",
						show: true,
						showNum: "1",
						options: [{
								id: '1',
								label: 'Java',
								isDisabled: false
							},
							{
								id: '2',
								label: 'Python',
								isDisabled: false
							}
						]
					}, {
						choice: true,
						edit: true,
						field: "ssss",
						fieldName: "啊啊啊啊",
						fieldType: "select",
						lengthType: "1",
						orderNum: "1",
						parameter: "22222",
						required: true,
						serviceId: "11111",
						show: true,
						showNum: "2",
						options: [{
								id: '1',
								label: 'Java',
								isDisabled: false
							},
							{
								id: '2',
								label: 'Python',
								isDisabled: false
							}
						]
					}, {
						choice: true,
						edit: true,
						field: "ssss",
						fieldName: "啊啊啊啊",
						fieldType: "select",
						lengthType: "1",
						orderNum: "1",
						parameter: "22222",
						required: true,
						serviceId: "11111",
						show: true,
						showNum: "2",
						options: [{
								id: '1',
								label: 'Java',
								isDisabled: false
							},
							{
								id: '2',
								label: 'Python',
								isDisabled: false
							}
						]
					}, {
						choice: true,
						edit: true,
						field: "ssss",
						fieldName: "啊啊啊啊",
						fieldType: "select",
						lengthType: "1",
						orderNum: "1",
						parameter: "22222",
						required: true,
						serviceId: "11111",
						show: true,
						showNum: "4",
						options: [{
								id: '1',
								label: 'Java',
								isDisabled: false
							},
							{
								id: '2',
								label: 'Python',
								isDisabled: false
							}
						]
					}],
				},
				previewList: {
					rules: {
						userName: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						}],
						password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						}]
					},
					labelWidth: '100px',
					inline: false,
					labelPosition: 'right',
					size: 'small',
					rowList: []
				}
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
				console.log(this.context)
				this.ruleForm = this.context
			}
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
			//预览
			preview() {
				var cur = []
				let obj = {};
				this.ruleForm.lines.forEach(item => {
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
				this.previewList.rowList = cur
				this.showFigForm = true
			},
			//选择主表分类
			getSelectMainTableClassification() {
				if(this.$refs.child.rowClick.id) {

				} else {
					this.$message.error("请选择数据");
				}
			},
			//获取字段长度类型
			getFieldLength(rowCon) {
				this.rowCon = rowCon
				this.dialogVisible_fieldLength = true
				this.$api.collaborativeOffice.getFieldLength().then(data => {
					console.log(data)
					this.fieldLengthList = data.data.data
				})
			},
			//字段长度类型选中
			handleNodeClick(data) {
				if(typeof(data.id) == "undefined") {
					this.fieldLengthCon = data.typeName
				} else {
					this.fieldLengthCon = ""
				}
			},
			//字段长度类型--确定
			getFieldLengthSuccess() {
				if(this.fieldLengthCon) {
					this.rowCon.lengthType = this.fieldLengthCon
					this.dialogVisible_fieldLength = false
				} else {
					this.$message.error("请选择数据");
				}
			},
			//获取服务
			findTServiceByParams(rowCon) {
				this.rowCon = rowCon
				this.dialogVisible_TServiceByParams = true
				this.$api.collaborativeOffice.findTServiceByParams({}).then(data => {
					console.log(data)
					this.tServiceByParams = data.data.data
				})
			},
			//服务--确定
			getTServiceByParams(){
				this.$set(this.rowCon,'serviceCon',this.tServiceByParamsCon.fname) 
				this.rowCon.serviceId = this.tServiceByParamsCon.foid
				this.dialogVisible_TServiceByParams = false
			},
			submitForm(formName) {
				this.$refs.ruleForm.validate((valid) => {
					if(valid) {
						this.$refs.ruleFormTable.validate((valid) => {
							if(valid) {
								alert('submit!');
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
</style>