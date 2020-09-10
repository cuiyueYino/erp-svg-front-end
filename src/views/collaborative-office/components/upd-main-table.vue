<template>
	<div>
		<div v-if="!showFigForm">
			<el-card class="box-card">
				<el-row>
					<el-col style="text-align: center;" :span="24">{{getTitle()}}</el-col>
				</el-row>
				<el-row>
					<el-col :span="18">
						公司：
						<el-select  size='mini' disabled v-model="ruleForm.company" placeholder="公司">
							<el-option v-for="item in CompanyData" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
					<el-col v-if="showFigNum == 2" :span="6" style="text-align: right;">
						<el-button @click="submitForm(2)" type="success" size="mini" icon="el-icon-check">提交</el-button>
						<el-button @click="submitForm(1)" type="success" size="mini" icon="el-icon-finished">暂存</el-button>
						<el-button @click="preview()" type="primary" plain size="mini" icon="el-icon-view">预览</el-button>
						<el-button type="danger" @click="$parent.toSelect()" size="mini" icon="el-icon-close">返回</el-button>
					</el-col>
					<el-col v-else :span="6" style="text-align: right;">
						<el-button type="danger" @click="$parent.toSelect()" size="mini" icon="el-icon-close">返回</el-button>
					</el-col>
				</el-row>
			</el-card>
			<el-card class="box-card">
				<el-form size="mini" :disabled=" showFigNum == 1" label-width="80px" :inline="true" :rules="rules" ref="ruleForm" :model="ruleForm" class="demo-form-inline">
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
									<el-button disabled @click="dialogVisible = true" slot="append" icon="el-icon-search"></el-button>
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
					<el-col style="text-align: center;">工作事项模板主表行</el-col>
				</el-row>
				<el-form :disabled=" showFigNum == 1" style="margin-top: 10px;" :model="ruleForm" :rules="rulesTable" ref="ruleFormTable">
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
								<el-form-item :prop="'lines[' + scope.$index + '].orderNum'" :rules="rulesShow(scope.row,'orderNum')">
									<el-input v-model="scope.row.orderNum" placeholder=""></el-input>
								</el-form-item>
							</template>
						</el-table-column>
						<el-table-column prop="showNum" label="显示行数" align="center">
							<template slot-scope="scope">
								<el-form-item :prop="'lines[' + scope.$index + '].showNum'" :rules="rulesShow(scope.row,'showNum')">
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
				<el-table size="small" highlight-current-row @row-click="clickRow" :data="tServiceByParams" border>
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
			<formAndTable :files="files" dis="2" showAdd="2" :form-data="conData">
				<el-card class="box-card">
				<el-row>
					<el-col :span="18">
						公司：
						<el-select size='mini' v-model="ruleForm.company" placeholder="公司">
							<el-option v-for="item in CompanyData" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span="6" style="text-align: right;">
						<el-button icon="el-icon-arrow-left" size="mini" type="danger" plain @click="showFigForm = false">返回</el-button>
					</el-col>
				</el-row>
				</el-card>
			</formAndTable>
		</div>
	</div>
</template>
<script>
	import selectMainTableClassification from './select-main-table-classification';
	//预览
	import formAndTable from './form-and-table';
	export default {
		components: {
			selectMainTableClassification,
			formAndTable
		},
		props: {
			context: Object,
			showFigNum: String
		},
		data() {
			return {
				files: [],
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
					}
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
				clickFlg:0
			}
		},
		created() {			
			this.ruleForm = this.context
			this.CompanyData.forEach(item => {
				if(item.name == "福佳集团") {
					this.ruleForm.company = item.id
				}
			})
			this.$api.collaborativeOffice.findList({}).then(data => {
				this.selectList = data.data.data
			})
			//全部服务
			this.ruleForm.lines.forEach(item => {
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
			})
		},
		methods: {
			//不是显示状态时,不加check
			rulesShow(row,con) {
				if(row.show) {
					return this.rulesTable[con];
				} else {
					return "";
				}
			},
			getTitle() {
				if(this.showFigNum == 1) {
					return "工作事项模板主表-查看"
				} else {
					return "工作事项模板主表-修改"					
				}
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
			maketree(data,type){
				let parent=[];
				for(var i = data[0].children.length - 1; i >= 0; i--) {
					if(type =="公司"){
						if(data[0].children[i].ftype == 1){
							parent.push(data[0].children[i]);
						}
					}else{
						if(data[0].children[i].ftype == 1 || data[0].children[i].ftype == 2){
							parent.push(data[0].children[i]);
						}
					}
				}
				children(parent,type);
				function children(parent,type) {
					if(parent){
						for(var i = parent.length - 1; i >= 0; i--) {
							if(parent[i].children){
								let obj = parent[i];
								obj.childrenList=[];
								for(var j = parent[i].children.length - 1; j >= 0; j--) {
									if(type =="公司"){
										if(parent[i].children[j].ftype == 1){
											obj.childrenList.push(parent[i].children[j]);
										}
									}else{
										if(parent[i].children[j].ftype == 1 || parent[i].children[j].ftype == 2){
											obj.childrenList.push(parent[i].children[j]);
										}
									}
								}
								obj.children=[];
								obj.children=obj.childrenList;
								delete obj.childrenList;
								parent[i]=obj;
								children(parent[i].children,type);	
							}else{
								parent[i].children=[];
							}
						}
					}
				}
				let Fdata= data[0];
				Fdata.children=parent;
				let RetrunData=[];
				RetrunData.push(Fdata);
				return RetrunData;
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
				switch(item.fieldType) {
					//1浏览框、2字符型、3文本型、4整型、5浮点型、6富文本、7日期控件、8时间控件、9枚举项、10复选框
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
							let ComData=this.maketree(list,'公司');
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
							let ZhiwuData=this.maketree(list,'职位');
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
						//确认主表分类选定
						if(this.ruleForm.workItemTypeName) {
							var cur = []
							let obj = {};
							//循环判断是否有添加服务的字段名
							this.ruleForm.lines.forEach((item, index1) => {
								item.parameterList = []
								//时间控件计算差值
								this.ruleForm.lines.forEach(itemChild => {
									//通过‘-’符号确定需要计算的两边
									if(item.serviceId == 5 && !this.noNull(item.parameter) && item.parameter.indexOf('-') != -1) {
										//left right 分别是需要计算的两个值的字段名称
										var index = item.parameter.indexOf('-')
										var left = item.parameter.substring(0, index)
										var right = item.parameter.substring(index + 1)
										//两个字段都要添加属性parameterList，里面存储需要计算的字段名和需要显示的字段名child
										if(left == itemChild.field || right == itemChild.field) {
											itemChild.parameterList = {}
											itemChild.parameterList.left = left
											itemChild.parameterList.right = right
											itemChild.parameterList.child = item.field
										}
									}
									//发现被添加服务的字段后，绑定双方
									if(itemChild.parameter == item.field) {
										item.parameterList.push(itemChild.field)
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
							if(cur.length > 1){
								cur.sort((a, b) => {
									a.colList.sort((a1, b1) => {
										return Number(a1.orderNum) - Number(b1.orderNum)
									})
									if(index == 0) {
										b.colList.sort((a1, b1) => {
											return Number(a1.orderNum) - Number(b1.orderNum)
											//return a1.orderNum - b1.orderNum
										})
										index++
									}
									//return a.showNum - b.showNum
									return Number(a.showNum) - Number(b.showNum)
								})
							}else{
								cur[0].colList.sort((a1, b1) => {
									//return a1.orderNum - b1.orderNum
									return Number(a1.orderNum) - Number(b1.orderNum)
								})
							}
							this.conData.top.rowList = cur
							//打开预览页面
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
				//判断是否选中
				if(this.$refs.child.rowClick.id) {
					//调用查看详情接口
					this.$api.collaborativeOffice.getWorkItemTypeModel({
						id: this.$refs.child.rowClick.id
					}).then(data => {
						data.data.data.lines.forEach(item => {
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
						})
					})
					//主表分类名称显示
					this.ruleForm.workItemTypeName = this.$refs.child.rowClick.name
					//主表分类名称ID
					this.ruleForm.workItemType = this.$refs.child.rowClick.id
					this.dialogVisible = false
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
				if (this.clickFlg == 0){
					this.tServiceByParamsCon = "";
				}
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
				this.clickFlg = 0;
			},
			submitForm(formName) {
				var msg = ""
				if(formName == 1) {
					this.ruleForm.status = 1
					msg = "暂存成功"
				} else {
					this.ruleForm.status = 7
					msg = "修改成功"
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
			//选中行
			clickRow(row) {
				this.clickFlg = 1;
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