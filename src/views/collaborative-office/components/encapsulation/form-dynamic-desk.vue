<template>
	<div>
		<slot></slot>
		<el-form ref="ruleForm" :disabled="dis == '1'" class="demo-ruleForm" :model="ruleForm" label-width="120px" :rules="rules" :inline="formData.inline" :size="formData.size" :label-position="formData.labelPosition">
			<!--固定部分-->
			<div v-if="show == 1">
				<el-row>
					<el-col :span="8">
						<el-form-item label="单据编号" prop="voucherId">
							<el-input style="width: 100%;" v-model="ruleForm.voucherId" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="标题" prop="title">
							<el-input disabled style="width: 100%;" v-model="ruleForm.title"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="经办人" prop="gestor">
							<el-input style="width: 100%;" v-model="gestorName" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="经办部门" prop="gestorDept">
							<el-input style="width: 100%;" v-model="gestorDeptName" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="经办时间" prop="voucherTime">
							<el-input style="width: 100%;" v-model="ruleForm.voucherTime" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</div>
			<!--动态部分-->
			<el-row v-for="(val, index) in formData.rowList" :key="index">
				<el-col v-for="(item,indexOther) in val.colList" :key="indexOther" :span="item.lengthType * 8">
					<div v-if="item.show">
						<el-form-item v-if="item.fieldTypeName == 'browseBox'" :label="item.fieldName" :prop="item.field+'_NameShow'">
							<!-- 浏览框 -->
							<a @click="toNew(ruleForm[item.field])" v-if="dis == '1' && item.toSelect.id == '7'" href="javascript:void(0)">{{ruleForm[item.field+'_NameShow']}}</a>
							<el-input v-else style="width: 100%;" v-model="ruleForm[item.field+'_NameShow']" disabled>
								<el-button @click="findDialogVisible(item)" v-if="item.edit" slot="append" icon="el-icon-search"></el-button>
							</el-input>
						</el-form-item>
						<el-form-item v-else :label="item.fieldName" :prop="item.field">
							<!-- 字符型 / 文本框 / 整型 / 浮点型 -->
							<el-input @focus="fuwu(item)" v-if="item.fieldTypeName=='character' || item.fieldTypeName=='textType' || item.fieldTypeName=='integers' || item.fieldTypeName=='floatingPoint' && item.show" style="width: 100%;" v-model="ruleForm[item.field]" :disabled="!item.edit" />
							<!--富文本-->
							<quill-editor v-if="item.fieldTypeName == 'richText' && item.show" :value="ruleForm[item.field]" @contentData="change($event,item.field)"></quill-editor>
							<!-- 日期选择器 -->
							<el-date-picker v-if="item.fieldTypeName == 'dateControl' && item.show" @change="getDate(item)" style="width: 100%;" :disabled="!item.edit" v-model="ruleForm[item.field]" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
							<!--时间控件-->
							<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="请选择日期时间" :disabled="!item.edit" v-if="item.fieldTypeName == 'timeControl' && item.show" style="width: 100%;" v-model="ruleForm[item.field]"></el-date-picker>
							<!-- 下拉框 -->
							<el-select v-if="item.fieldTypeName == 'select' && item.show" style="width: 100%;" v-model="ruleForm[item.field]" clearable :disabled="!item.edit" :placeholder="item.placeholder">
								<el-option v-for="itemSelect in item.resList" :key="itemSelect.id" :label="itemSelect.name" :value="itemSelect.id" />
							</el-select>
							<!--复选框-->
							<el-checkbox true-label='1' false-label='0' v-if="item.fieldTypeName == 'checkBox' && item.show" style="width: 100%;" v-model="ruleForm[item.field]" :disabled="!item.edit"></el-checkbox>
						</el-form-item>
					</div>
				</el-col>
			</el-row>
		</el-form>
		<!--弹出框-->
		<div v-if="dialogVisible">
			<erpDialog :title="titleShow" v-if="dialogVisible" erpDialogwidth="false" :dialogShow="dialogVisible">
				<formIconComponents ref="child" :showFig="showCon" :dataCon="dataCon"></formIconComponents>
				<div slot="footer">
					<el-button type="success" icon='el-icon-check' size="small" @click="getDialogVisible">确定</el-button>
					<el-button type="warning" icon='el-icon-close' size="small" @click="dialogVisible = false">取消</el-button>
				</div>
			</erpDialog>
		</div>
		<!--弹出框-工作流-->
		<workflowDialog ref="childWork" :status="status" title="工作事项"></workflowDialog>
	</div>
</template>

<script>
	//所有弹出框
	import formIconComponents from '../../../../views/collaborative-office/components/encapsulation/sub-components/form-icon-components';
	import workflowDialog from '../../../../views/collaborative-office/components/encapsulation/sub-components/workflow-dialog';
	import editor from './test';
	//富文本
	import { quillEditor } from 'vue-quill-editor'; //调用编辑器
	import 'quill/dist/quill.snow.css';
	import * as Quill from 'quill';
	import { computed } from '../computed.js';
	export default {
		components: {
			quillEditor,
			formIconComponents,
			editor,
			workflowDialog
		},
		props: {
			//传入的data值
			formData: {
				type: Object,
				required: true
			},
			//主表还是子表form  主1子2
			show: {
				type: String,
				required: true
			},
			//新增1 查看/修改2
			showAdd: {
				type: String,
				required: true
			},
			//全屏不可编辑1  可编辑其他
			dis: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				content: "12321321213",
				status: '3',
				//固定栏校验写死
				rules: {
					title: [{
						required: true,
						message: '请输入标题',
						trigger: 'change'
					}, {
						max: 50,
						message: '标题长度不能超过50个汉字',
						trigger: 'change'
					}]
				},
				//表单
				ruleForm: {
					tableName: this.formData.tableName
				},
				//经办人显示
				gestorName: "",
				//经办部门显示
				gestorDeptName: "",
				//弹出框表头
				titleShow: "",
				//传入类型
				showCon: "",
				//传入值
				dataCon: {},
				//弹出框
				dialogVisible: false,
				//中间变量
				dialogVisibleCon: {},
				//富文本基础数据
				editorOption: {},
				timer: "",
				allOrganizationInfo: JSON.parse(localStorage.getItem('allOrganizationInfo')),
				//人员
				staffList: JSON.parse(localStorage.getItem('staffList')),
				//用户
				userList: JSON.parse(localStorage.getItem('userList')),
				//职务
				positionList: JSON.parse(localStorage.getItem('positionList')),
				itemChildOther: {}
			}
		},
		//销毁时间
		beforeDestroy() {
			if(this.timer) {
				clearInterval(this.timer);
			}
		},
		created() {
			//判断是否有模板数据
			if(!this.noObject(this.formData) && typeof(this.formData.rowList) != "undefined") {
				//服务10需要特殊对待，进入页面就查询出来并赋值
				this.getOther()
				//添加完整的校验
				this.getrulesList()
				//显示固定栏(主表)
				if(this.show == 1) {
					//查看1   新增2   修改3
					if(this.dis == 2) {
						//经办人，经办部门的展示数据（并不传走）
						this.gestorName = localStorage.getItem('ms_username')
						this.gestorDeptName = localStorage.getItem('ms_userDepartName')
						//这面写的是固定值，后期需要改
						this.$set(this.ruleForm, "gestor", localStorage.getItem('ms_staffId'))
						this.$set(this.ruleForm, "gestorDept", localStorage.getItem('ms_userDepartId'))
						//this.$set(this.ruleForm, "gestor", "BFPID000000LSN01ZA")
						//this.$set(this.ruleForm, "gestorDept", "BFPID000000LRS001C")

						//置空无需填写的数据
						this.$set(this.ruleForm, "voucherId", "")
						this.$set(this.ruleForm, "title", "")
						//展示当前经办时间（传走后台也不要）
						this.$set(this.ruleForm, "voucherTime", this.getTimeNow())
						this.getTime()
					} else if(this.dis == 1) {
						//整理主表数据
						this.get_NameShow(1)
						//这地方应该是动态的经办人和部门，后期要改
						this.gestorName = this.formData.wholeData.GESTORNAME
						this.gestorDeptName = this.formData.wholeData.GESTORDEPTNAME
						//展示单据编号，标题，经办时间
						if(typeof(this.formData.wholeData) != "undefined") {
							this.$set(this.ruleForm, "voucherId", this.formData.wholeData.voucherId)
							this.$set(this.ruleForm, "title", this.formData.fsubjectName)
							this.$set(this.ruleForm, "voucherTime", this.conversionTime(this.formData.wholeData.voucherTime))
						}
					} else if(this.dis == 3) {
						//整理主表数据
						this.get_NameShow(1)
						//这地方应该是动态的经办人和部门，后期要改
						//展示单据编号，标题，经办时间
						if(typeof(this.formData.wholeData) != "undefined") {
							this.gestorName = this.formData.wholeData.GESTORNAME
							this.gestorDeptName = this.formData.wholeData.GESTORDEPTNAME
							this.$set(this.ruleForm, "voucherId", this.formData.wholeData.voucherId)
							this.$set(this.ruleForm, "title", this.formData.fsubjectName)
							this.$set(this.ruleForm, "voucherTime", this.conversionTime(this.formData.wholeData.voucherTime))

							//要改！！！！
							this.$set(this.ruleForm, "gestor", localStorage.getItem('ms_staffId'))
							this.$set(this.ruleForm, "gestorDept", localStorage.getItem('ms_userDepartId'))
							//this.$set(this.ruleForm, "gestor", "BFPID000000LSN01ZA")
							//this.$set(this.ruleForm, "gestorDept", "BFPID000000LRS001C")
						}else{
							this.gestorName = localStorage.getItem('ms_username')
							this.gestorDeptName = localStorage.getItem('ms_userDepartName')
						}
						this.$set(this.ruleForm, "oprStatus", 2)
						this.$set(this.ruleForm, "id", this.formData.wholeData.id)
					}
					//不显示固定栏（子表）
				} else {
					//整理子表数据
					this.get_NameShow(2)
					if(this.dis == 3) {
						this.$set(this.ruleForm, "oprStatus", 2)
					}
				}
			}
		},
		methods: {
			change(aaa, bbb) {
				this.$set(this.ruleForm, bbb, aaa)
			},
			addQuillTitle() {
				const oToolBar = document.querySelector('.ql-toolbar')
				const aButton = oToolBar.querySelectorAll('button')
				const aSelect = oToolBar.querySelectorAll('select')
				aButton.forEach(function(item) {
					if(item.className === 'ql-script') {
						item.value === 'sub' ? (item.title = '下标') : (item.title = '上标')
					} else if(item.className === 'ql-indent') {
						item.value === '+1' ? (item.title = '向右缩进') : (item.title = '向左缩进')
					} else {
						item.title = titleConfig[item.classList[0]]
					}
				})
				aSelect.forEach(function(item) {
					item.parentNode.title = titleConfig[item.classList[0]]
				})
			},
			//工作流打开新页面
			toNew(id) {
				this.$api.collaborativeOffice.findDataByVoucherId({
					voucherId: this.itemChildOther.voucherId,
					tempId: this.itemChildOther.tempId,
					tableName: this.itemChildOther.tableName
				}).then(data => {
					this.$api.collaborativeOffice.findlnfosList({
						voucherId: this.itemChildOther.voucherId,
						userCode: localStorage.getItem('ms_userId'),
						menuCode: "workItem"
					}).then(val => {
						console.log(val)
						var a = JSON.parse(data.data.data)
						a.files = val.data.data
						let routeData = this.$router.resolve({　　
							path: '/erp/seeWorkItem',
							　　query: {
								context: JSON.stringify(a),
								tempId: this.formData.wholeData.tempId,
								showSeeOrUpd: 1
							}
						});
						window.open(routeData.href, '_blank');
					})

				})
			},
			//计算公式服务
			fuwu(row) {
				if(row.serviceId == 11) {
					//row.parameter 计算公式
					let result = computed(row.parameter, this.ruleForm)
					if(result.successCon) {
						this.formData.rowList.forEach(item => {
							item.colList.forEach(val => {
								if(val.field == row.field) {
									if(val.fieldType == 4) {
										this.ruleForm[row.field] = result.con.toFixed(0)
									} else if(val.fieldType == 5) {
										//this.ruleForm[row.field] = result.con.toFixed(4)
										this.ruleForm[row.field] = result.con
									} else {
										//this.ruleForm[row.field] = result.con.toFixed(4)
										this.ruleForm[row.field] = result.con
									}
								}
							})
						})
					} else {
						this.goOut("数据或者公式不正确, 请重新输入.")
					}
				}
			},
			//查看页面根据ID获取浏览框内容 _NameShow  主表1 子表2
			get_NameShow(state) {
				//获取当前form应该展示的所有数据
				var valObject = {}
				if(state == 1) {
					//主表在外层
					valObject = this.formData.wholeData
					if(this.dis == 3) {
						this.$set(this.ruleForm, "id", valObject.id)
					}
				} else {
					//子表需要循环找到正确的数据
					for(var key in this.formData.wholeData) {
						if(key == this.formData.id) {
							if(this.formData.wholeData[key].length != 0) {
								valObject = this.formData.wholeData[key][0]
								this.$set(this.ruleForm, "id", valObject.id)
							}
						}
					}
				}
				this.get_NameShowChlid(valObject)
			},
			//整理数据 valObject 是当前form显示数据
			async get_NameShowChlid(valObject) {
				for(var i = 0; i < this.formData.rowList.length; i++) {
					for(var k = 0; k < this.formData.rowList[i].colList.length; k++) {
						//懒得写那么长，item就是每条数据
						var item = this.formData.rowList[i].colList[k]
						//遍历显示数据的key
						for(var key in valObject) {
							//找到模板字段和数据key相同的
							if(item.field == key) {
								//存入需要返回的值,如果是整形或者浮点 转化为相应类型
								this.$set(this.ruleForm, key, valObject[key].toString())
								/*
								 * 设置浏览框展示数据 _NameShow(这些数据在新增或者修改返回时需要被删除)
								 */
								if(item.fieldType == 1) {
									//确定浏览框字段内容
									switch(item.toSelect.id) {
										case "1":
											//公司
											var nameList = ""
											var idList = valObject[key].split(',')
											idList.forEach((val, indexVal) => {
												item.browseBoxList.forEach(itemChild => {
													if(itemChild.foid == val) {
														if(indexVal == idList.length - 1) {
															nameList = nameList + itemChild.fname
														} else {
															nameList = nameList + itemChild.fname + ","
														}
													}
												})
											})
											this.$set(this.ruleForm, key + "_NameShow", nameList)
											break;
										case "2":
											//部门
											var nameList = ""
											var idList = valObject[key].split(',')
											idList.forEach((val, indexVal) => {
												item.browseBoxList.forEach(itemChild => {
													if(typeof(itemChild.children) != "undefined") {
														itemChild.children.forEach(itemChild2 => {
															if(itemChild2.foid == val) {
																if(indexVal == idList.length - 1) {
																	nameList = nameList + itemChild2.fname
																} else {
																	nameList = nameList + itemChild2.fname + ","
																}
															}
														})
													}
												})
											})
											this.$set(this.ruleForm, key + "_NameShow", nameList)
											break;
										case "3":
											//职位
											var nameList = ""
											var idList = valObject[key].split(',')
											idList.forEach((val, indexVal) => {
												item.browseBoxList.forEach(itemChild => {
													if(typeof(itemChild.children) != "undefined") {
														itemChild.children.forEach(itemChild2 => {
															if(typeof(itemChild2.children) != "undefined") {
																itemChild2.children.forEach(itemChild3 => {
																	if(itemChild3.foid == val) {
																		if(indexVal == idList.length - 1) {
																			nameList = nameList + itemChild3.fname
																		} else {
																			nameList = nameList + itemChild3.fname + ","
																		}
																	}
																})
															}
														})
													}
												})
											})
											this.$set(this.ruleForm, key + "_NameShow", nameList)
											break;
										case "4":
											//人员
											var nameList = ""
											var idList = valObject[key].split(',')
											idList.forEach((val, indexVal) => {
												this.staffList.forEach(itemChild => {
													if(itemChild.toid == val) {
														if(indexVal == idList.length - 1) {
															nameList = nameList + itemChild.tname
														} else {
															nameList = nameList + itemChild.tname + ","
														}
													}
												})
											})
											this.$set(this.ruleForm, key + "_NameShow", nameList)
											break;
										case "5":
											//用户
											var nameList = ""
											var idList = valObject[key].split(',')
											idList.forEach((val, indexVal) => {
												this.userList.forEach(itemChild => {
													if(itemChild.foid == val) {
														if(indexVal == idList.length - 1) {
															nameList = nameList + itemChild.fname
														} else {
															nameList = nameList + itemChild.fname + ","
														}
													}
												})
											})
											this.$set(this.ruleForm, key + "_NameShow", nameList)
											break;
										case "6":
											//职务
											var nameList = ""
											var idList = valObject[key].split(',')
											idList.forEach((val, indexVal) => {
												this.positionList.forEach(itemChild => {
													if(itemChild.foid == val) {
														if(indexVal == idList.length - 1) {
															nameList = nameList + itemChild.fname
														} else {
															nameList = nameList + itemChild.fname + ","
														}
													}
												})
											})
											this.$set(this.ruleForm, key + "_NameShow", nameList)
											break;
											//工作流
										case "7":
											await this.$api.collaborativeOffice.findPageBySrcId({
												srcId: valObject[key]
											}).then(data => {
												if(data.data.data && data.data.data.length > 0){
													let ReturnData=data.data.data;
													for(let i=0;i<ReturnData.length;i++){
														if(ReturnData[i].srcId == valObject[key]) {
															this.itemChildOther = ReturnData[i]
															return new Promise(resolve => {
																this.$set(this.ruleForm, key + "_NameShow", ReturnData[i].title)
																resolve({})
															});
														}
													}
												}else{
													this.itemChildOther = {}
													return new Promise(resolve => {
														this.$set(this.ruleForm, key + "_NameShow", '')
														resolve({})
													});
												}
											})
											break;
									}
								}
							}
						}
					}
				}
			},
			//这个是给 工作流弹出框子组件调用的，确定时，返回字段
			getWorkDialig(row) {
				this.$set(this.ruleForm, this.dialogVisibleCon.field + '_NameShow', row.title)
				this.$set(this.ruleForm, this.dialogVisibleCon.field, row.srcId)
				this.$refs.childWork.dialogVisible = false
			},
			//让当前时间动起来~
			getTime() {
				var self = this
				self.timer = setInterval(function() {
					self.ruleForm.voucherTime =
						new Date().getFullYear() +
						"-" +
						(new Date().getMonth() + 1) +
						"-" +
						new Date().getDate() +
						" " +
						self.appendZero(new Date().getHours()) +
						":" +
						self.appendZero(new Date().getMinutes()) +
						":" +
						self.appendZero(new Date().getSeconds());
				}, 1000);
			},
			//2020-8-7变成2020-08-07  好看一点（实际无用）
			appendZero(obj) {
				if(obj < 10) {
					return "0" + obj;
				} else {
					return obj;
				}
			},
			//添加完整校验
			getrulesList() {
				this.formData.rowList.forEach(itemOne => {
					itemOne.colList.forEach(item => {
						this.rules[item.field] = []
						this.rules[item.field + "_NameShow"] = []
						if(item.required) {
							//浏览框校验的是显示的 _NameShow,其他正常校验
							if(item.fieldType == 1) {
								this.rules[item.field + "_NameShow"].push({
									required: true,
									message: "请填写" + item.fieldName,
									trigger: 'change'
								})
							} else {
								this.rules[item.field].push({
									required: true,
									message: "请填写" + item.fieldName,
									trigger: 'change'
								})
							}
						}
						//浮点和整型校验 特殊对待一下
						switch(item.fieldType) {
							case "2":
								this.rules[item.field].push({
									max: 1500,
									message: '请输入正确的' + item.fieldName,
									trigger: 'change'
								})
								return "integers"
								break;
							case "3":
								this.rules[item.field].push({
									max: 1500,
									message: '请输入正确的' + item.fieldName,
									trigger: 'blur'
								})
								return "integers"
								break;
							case "4":
								//添加整型校验
								this.rules[item.field].push({
									pattern: /^-?[0-9]\d*$/,
									message: '请输入正确的' + item.fieldName,
									trigger: 'change'
								})
								this.rules[item.field].push({
									max: 20,
									message: '请输入正确的1' + item.fieldName,
									trigger: 'change'
								})
								return "integers"
								break;
							case "5":
								//添加浮点型校验
								this.rules[item.field].push({
									pattern: /^([1-9]\d{0,15}|0)(\.\d{1,4})?$/,
									message: '请输入最多4位小数',
									trigger: 'change'
								})
								this.rules[item.field].push({
									max: 20,
									message: '请输入正确的1' + item.fieldName,
									trigger: 'change'
								})
								return "floatingPoint"
								break;
						}
					})
				})
			},
			//计算时间差值
			getDate(row) {
				//change写在所有的时间控件中，首先判断当前点击控件是否需要计算差值，且双方必须都有值
				if(row.parameterList.length != 0) {
					//同上（太长了，不想写一起，屏幕太小显示不下）noNull是非空的公共方法，详见base.js
					row.parameterList.forEach(item => {
						if(!this.noNull(this.ruleForm[item.left]) && !this.noNull(this.ruleForm[item.right])) {
							var state = false
							this.formData.rowList.forEach((item1, index) => {
								item1.colList.forEach((val, index2) => {
									//确认当前控件里面有绑定的child数据（就是要接收差值的字段）并且服务code为“计算差值”
									if(val.field == item.child && val.serviceNow.fcode == "service05") {
										state = true
									}
									//循环到最后，判断state状态，如果是true，代表满足条件，那么就需要改变child的值
									if(index == this.formData.rowList.length - 1 && index2 == item1.colList.length - 1) {
										if(state) {
											//DateDiff 方法在下面，计算日期差值方法
											this.$set(this.ruleForm, item.child, this.DateDiff(this.ruleForm[item.left], this.ruleForm[item.right]).toString())
										}
									}
								})
							})
						}
					})
				}
			},
			//计算日期差值
			DateDiff(sDate1, sDate2) {
				var aDate, oDate1, oDate2, iDays
				aDate = sDate1.split("-")
				oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
				aDate = sDate2.split("-")
				oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
				iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
				return iDays
			},
			//服务10 为“根据登录用户查询”，进入页面是就要查询出数据并赋值，不需要点击操作
			async getOther() {
				//循环遍历所有的值
				for(var i1 = 0; i1 < this.formData.rowList.length; i1++) {
					var listChild = this.formData.rowList[i1]
					for(var i2 = 0; i2 < listChild.colList.length; i2++) {
						//判断是否为服务10
						if(typeof(listChild.colList[i2].serviceNow) != "undefined" && listChild.colList[i2].serviceNow.fcode == "service10") {
							//获取当前登陆人，变成fid，用来查询服务
							listChild.colList[i2].serviceNow.fid = localStorage.getItem('ms_userId')
							//根据id和code查询服务
							var conNow = await this.$api.collaborativeOffice.findTServiceItemByParams(listChild.colList[i2].serviceNow).then(data => {
								//当循环和调用同时存在时，使用async，await来控制时间，只有满足当前接口调用完成后，才继续循环
								return new Promise(resolve => {
									//返回id和name 用于显示或者存储(服务10不出意外应该是input，无法显示和存储不同，暂时没法解决，只能显示id)
									resolve({
										id: data.data.data.toid,
										name: data.data.data.tname
									})
								});
							})
							//存入值
							this.$set(this.ruleForm, listChild.colList[i2].field, conNow.id)
							this.$set(this.ruleForm, listChild.colList[i2].field + "_NameShow", conNow.name)
						}
					}
				}
			},
			//除了工作流其他弹出框确定
			getDialogVisible() {
				var dataBack = this.$refs.child.getDataBack()
				if(!this.dialogVisibleCon.choice) {
					if(dataBack.length > 1) {
						this.goOut("请单选")
						return
					}
				}
				var label = ""
				var value = ""
				dataBack.forEach((item, index) => {
					if(index == dataBack.length - 1) {
						if(this.showCon == "personnel") {
							label = label + item.tname
							value = value + item.toid
						} else {
							label = label + item.fname
							value = value + item.foid
						}
					} else {
						if(this.showCon == "personnel") {
							label = label + item.tname + ","
							value = value + item.toid + ","
						} else {
							label = label + item.fname + ","
							value = value + item.foid + ","
						}
					}
				})
				//获取子组件返回的id和name
				this.$set(this.ruleForm, this.dialogVisibleCon.field + '_NameShow', label)
				this.$set(this.ruleForm, this.dialogVisibleCon.field, value)
				//如果有联动查询的数据
				if(typeof(this.dialogVisibleCon.parameterList) != "undefined" && this.dialogVisibleCon.parameterList.length != 0) {
					//调用toGetServiceNow（绑定的联动改变字段，获取的选中id）
					this.toGetServiceNow(this.dialogVisibleCon.parameterList, value)
				}
				this.dialogVisible = false
			},
			/*
			 父子联动查询
			 *
			 * 这里是分批分次的查询，！！‘联动的值可能是多个’！！，同样只有查询到值并整理好赋值之后，才会进入下层循环
			 *
			 * */
			async toGetServiceNow(row, id) {
				//通过传入的子查询字段，找到最终的传入值
				for(var i = 0; i < row.length; i++) {
					for(var i1 = 0; i1 < this.formData.rowList.length; i1++) {
						var listChild = this.formData.rowList[i1]
						for(var i2 = 0; i2 < listChild.colList.length; i2++) {
							if(listChild.colList[i2].field == row[i]) {
								//给服务条件赋值，serviceNow.code在之前已经获取到了，只需要传入查询id
								listChild.colList[i2].serviceNow.fid = id
								//循环查询
								var conNow = await this.$api.collaborativeOffice.findTServiceItemByParams(listChild.colList[i2].serviceNow).then(data => {
									console.log(data)
									return new Promise(resolve => {
										//把根据‘不同的服务’获取到的返回值从新赋值，都是id和name的形式，方便调用
										switch(listChild.colList[i2].serviceNow.fcode) {
											case "service09":
											case "service08":
											case "service04":
											case "service01":
												resolve({
													id: data.data.data.foid,
													name: data.data.data.fname
												})
												break;
											case "service07":
											case "service06":
												resolve({
													id: data.data.data.vicePresidentId,
													name: data.data.data.vicePresidentName
												})
												break;
											case "service03":
											case "service02":
												resolve({
													id: data.data.data.departmentLeaderId,
													name: data.data.data.departmentLeaderName
												})
												break;
										}
									});
								})
								//改变需要联动的值的内容和显示内容
								this.$set(this.ruleForm, listChild.colList[i2].field, conNow.id)
								this.$set(this.ruleForm, listChild.colList[i2].field + "_NameShow", conNow.name)
							}
						}
					}
				}
			},
			//弹出框打开
			findDialogVisible(row) {
				//取到中间值
				this.dialogVisibleCon = row
				/*
				 * 判断浏览框内显示的内容，并放入数据（公司，部门，职位在上层已经查询出来，直接放里面就行，
				 * 其他数据需要接口查询后才能显示
				 */
				//单选/多选
				this.$set(this.dataCon, "choice", row.choice)
				switch(row.toSelect.id) {
					case "1":
						this.showCon = "organization"
						this.titleShow = "公司"
						this.$set(this.dataCon, "context", row.browseBoxList)
						//数据回显(保证选中后再次打开数据依旧被选中)下面两条一样
						typeof(this.ruleForm[row.field]) != "undefined" ? this.$set(this.dataCon, "echo", this.ruleForm[row.field].split(',')): this.$set(this.dataCon, "echo", [])
						break;
					case "2":
						this.showCon = "organization"
						this.titleShow = "部门"
						this.$set(this.dataCon, "context", row.browseBoxList)
						typeof(this.ruleForm[row.field]) != "undefined" ? this.$set(this.dataCon, "echo", this.ruleForm[row.field].split(',')): this.$set(this.dataCon, "echo", [])
						break;
					case "3":
						this.showCon = "organization"
						this.titleShow = "职位"
						this.$set(this.dataCon, "context", row.browseBoxList)
						typeof(this.ruleForm[row.field]) != "undefined" ? this.$set(this.dataCon, "echo", this.ruleForm[row.field].split(',')): this.$set(this.dataCon, "echo", [])
						break;
					case "4":
						this.showCon = "personnel"
						this.titleShow = "人员"
						//数据回显(保证选中后再次打开数据依旧被选中)下面两条一样
						typeof(this.ruleForm[row.field]) != "undefined" ? this.$set(this.dataCon, "echo", this.ruleForm[row.field].split(',')): this.$set(this.dataCon, "echo", [])
						break;
					case "5":
						this.showCon = "user"
						this.titleShow = "用户"
						//数据回显(保证选中后再次打开数据依旧被选中)下面两条一样
						typeof(this.ruleForm[row.field]) != "undefined" ? this.$set(this.dataCon, "echo", this.ruleForm[row.field].split(',')): this.$set(this.dataCon, "echo", [])
						break;
					case "6":
						this.showCon = "jobSet"
						this.titleShow = "职务"
						//数据回显(保证选中后再次打开数据依旧被选中)下面两条一样
						typeof(this.ruleForm[row.field]) != "undefined" ? this.$set(this.dataCon, "echo", this.ruleForm[row.field].split(',')): this.$set(this.dataCon, "echo", [])
						break;
				}
				//工作流打开一个特殊的弹框（就数它事多）
				if(row.toSelect.id == 7) {
					this.$refs.childWork.dialogVisible = true
				} else {
					this.dialogVisible = true
				}
			},
			//提交
			onSubmit(formName) {
				var returnData = false
				this.$refs.ruleForm.validate((valid) => {
					if(valid) {
						returnData = true
					}
				});
				return returnData
			},
			//富文本事件
			onEditorBlur() {}, // 失去焦点事件
			onEditorFocus(event, edit) {
				//if(this.formDisabled == true) {
				if(!edit) {
					event.enable(false);
				} else {
					event.enable(true);
				}
			}, // 获得焦点事件
			onEditorChange() {}, // 内容改变事件
		}
	};
</script>

<style scoped>
	.treeDivClass {
		height: 300px;
		overflow: auto;
	}
	
	>>>.el-dialog__body {
		border-bottom: 1px solid #dcdfe6;
		min-height: calc(100vh - 300px);
		overflow-y: auto;
	}
</style>