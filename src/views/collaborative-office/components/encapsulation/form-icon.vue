<template>
	<div>
		<slot></slot>
		<el-form ref="ruleForm" class="demo-ruleForm" :model="ruleForm" :label-width="formData.labelWidth" :rules="rules" :inline="formData.inline" :size="formData.size" :label-position="formData.labelPosition">
			<!--固定部分-->
			<div>
				<el-row>
					<el-col :span="8">
						<el-form-item label="单据编号" prop="voucherId">
							<el-input style="width: 100%;" v-model="ruleForm.voucherId" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="16">
						<el-form-item label="标题" prop="title">
							<el-input style="width: 100%;" v-model="ruleForm.title"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="8">
						<el-form-item label="经办人" prop="gestor">
							<el-input style="width: 100%;" v-model="ruleForm.gestor" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="经办部门" prop="gestorDept">
							<el-input style="width: 100%;" v-model="ruleForm.gestorDept" disabled></el-input>
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
					<el-form-item v-if="item.fieldTypeName == 'browseBox' && item.show" :label="item.fieldName" :prop="item.field+'Name'">
						<!-- 浏览框 -->
						<el-input style="width: 100%;" v-model="ruleForm[item.field+'Name']" disabled>
							<el-button @click="findDialogVisible(item)" slot="append" icon="el-icon-search"></el-button>
						</el-input>
					</el-form-item>
					<!-- 字符型 -->
					<el-form-item v-if="item.fieldTypeName == 'character' && item.show" :label="item.fieldName" :prop="item.field">
						<el-input style="width: 100%;" v-model="ruleForm[item.field]" :disabled="!item.edit" />
					</el-form-item>
					<!-- 文本框 -->
					<el-form-item v-if="item.fieldTypeName == 'textType' && item.show" :label="item.fieldName" :prop="item.field">
						<el-input style="width: 100%;" v-model="ruleForm[item.field]" :disabled="!item.edit" />
					</el-form-item>
					<!-- 整型 -->
					<el-form-item v-if="item.fieldTypeName == 'integers' && item.show" :label="item.fieldName" :prop="item.field">
						<el-input style="width: 100%;" v-model="ruleForm[item.field]" :disabled="!item.edit" />
					</el-form-item>
					<!-- 浮点型 -->
					<el-form-item v-if="item.fieldTypeName == 'floatingPoint' && item.show" :label="item.fieldName" :prop="item.field">
						<el-input style="width: 100%;" v-model="ruleForm[item.field]" :disabled="!item.edit" />
					</el-form-item>
					<!--富文本-->
					<el-form-item v-if="item.fieldTypeName == 'richText' && item.show" :label="item.fieldName" :prop="item.field">
						<quill-editor style="width: 100%;" v-model="ruleForm[item.field]" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)"></quill-editor>
					</el-form-item>
					<!-- 日期选择器 -->
					<el-form-item v-if="item.fieldTypeName == 'dateControl' && item.show" :label="item.fieldName" :prop="item.field">
						<el-date-picker @change="getDate(item)" style="width: 100%;" :disabled="!item.edit" v-model="ruleForm[item.field]" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
					</el-form-item>
					<!--时间控件-->
					<el-form-item v-if="item.fieldTypeName == 'timeControl' && item.show" :label="item.fieldName" :prop="item.field">
						<el-time-picker style="width: 100%;" v-model="ruleForm[item.field]"></el-time-picker>
					</el-form-item>
					<!-- 下拉框 -->
					<el-form-item v-if="item.fieldTypeName == 'select' && item.show" :label="item.fieldName" :prop="item.field">
						<el-select style="width: 100%;" v-model="ruleForm[item.field]" :multiple="item.choice" clearable :disabled="!item.edit" :placeholder="item.placeholder">
							<el-option v-for="itemSelect in item.resList" :key="itemSelect.id" :label="itemSelect.name" :value="itemSelect.id" />
						</el-select>
					</el-form-item>
					<!--复选框-->
					<el-form-item v-if="item.fieldTypeName == 'checkBox' && item.show" :label="item.fieldName" :prop="item.field">
						<el-checkbox-group style="width: 100%;" v-model="ruleForm[item.field]">
							<el-checkbox label="复选框 A"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('ruleForm')">
					效果展示
				</el-button>
			</el-form-item>
		</el-form>
		<!--弹出框-->
		<el-dialog :title="titleShow" top="1vh" destroy-on-close center :visible.sync="dialogVisible" width="80%">
			<formIconComponents ref="child" :showFig="showCon" :dataCon="dataCon"></formIconComponents>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="getDialogVisible">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	//所有弹出框
	import formIconComponents from '../../../../views/collaborative-office/components/encapsulation/sub-components/form-icon-components';
	//富文本
	import { quillEditor } from 'vue-quill-editor'; //调用编辑器
	import 'quill/dist/quill.snow.css';
	import * as Quill from 'quill';
	export default {
		components: {
			quillEditor,
			formIconComponents
		},
		props: {
			//传入的data值
			formData: {
				type: Object,
				required: true
			},
		},
		data() {
			return {
				rules: {
					title: [{
						required: true,
						message: '请输入子表分类编码',
						trigger: 'blur'
					}]
				}, //表单
				ruleForm: {
					voucherId: "",
					title: "",
					gestor: "",
					gestorDept: "",
					voucherTime: ""
				},
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
				editorOption: this.$GLOBAL.editorOption
			}
		},
		created() {
			this.getOther()
			this.getrulesList()
		},
		methods: {
			getrulesList() {
				this.formData.rowList.forEach(itemOne => {
					itemOne.colList.forEach(item => {
						this.rules[item.field] = []
						this.rules[item.field + "Name"] = []
						if(item.required) {
							if(item.fieldType == 1) {
								this.rules[item.field + "Name"].push({
									required: true,
									message: "请填写" + item.fieldName,
									trigger: 'blur'
								})
							} else if(item.fieldType == 9) {
								this.rules[item.field].push({
									required: true,
									message: "请填写" + item.fieldName,
									trigger: 'blur'
								})
							} else {
								this.rules[item.field].push({
									required: true,
									message: "请填写" + item.fieldName,
									trigger: 'blur'
								})
							}
						}
						switch(item.fieldType) {
							case "4":
								//添加整型校验
								this.rules[item.field].push({
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
								//添加浮点型校验
								this.rules[item.field].push({
									pattern: /^([1-9]\d{0,15}|0)(\.\d{1,4})?$/,
									message: '请输入正确的' + item.fieldName,
									trigger: 'blur'
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
				if(typeof(row.parameterList.child) != "undefined") {
					//同上（太长了，不想写一起，屏幕太小显示不下）noNull是非空的公共方法，详见base.js
					if(!this.noNull(this.ruleForm[row.parameterList.left]) && !this.noNull(this.ruleForm[row.parameterList.right])) {
						var state = false
						this.formData.rowList.forEach((item, index) => {
							item.colList.forEach((val, index2) => {
								//确认当前控件里面有绑定的child数据（就是要接收差值的字段）并且服务code为“计算差值”
								if(val.field == row.parameterList.child && val.serviceNow.fcode == "service05") {
									state = true
								}
								//循环到最后，判断state状态，如果是true，代表满足条件，那么就需要改变child的值
								if(index == this.formData.rowList.length - 1 && index2 == item.colList.length - 1) {
									if(state) {
										//DateDiff 方法在下面，计算日期差值方法
										this.$set(this.ruleForm, row.parameterList.child, this.DateDiff(this.ruleForm[row.parameterList.left], this.ruleForm[row.parameterList.right]))
									}
								}
							})
						})
					}
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
							//							this.$set(this.ruleForm, listChild.colList[i2].field + "Name", conNow.name)
						}
					}
				}
			},
			//弹出框确定
			getDialogVisible() {
				//获取子组件返回的id和name
				this.$set(this.ruleForm, this.dialogVisibleCon.field + 'Name', this.$refs.child.backCon.label)
				this.$set(this.ruleForm, this.dialogVisibleCon.field, this.$refs.child.backCon.value)
				//如果有联动查询的数据
				if(this.dialogVisibleCon.parameterList.length != 0) {
					//调用toGetServiceNow（绑定的联动改变字段，获取的选中id）
					this.toGetServiceNow(this.dialogVisibleCon.parameterList, this.$refs.child.backCon.value)
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
											case "service05":
												resolve({
													id: "",
													name: ""
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
								this.$set(this.ruleForm, listChild.colList[i2].field + "Name", conNow.name)
							}
						}
					}
				}
			},
			//弹出框打开
			findDialogVisible(row) {
				//取到中间值
				this.dialogVisibleCon = row
				this.dialogVisible = true
				/*
				 * 判断浏览框内显示的内容，并放入数据（公司，部门，职位在上层已经查询出来，直接放里面就行，
				 * 其他数据需要接口查询后才能显示
				 */
				switch(row.toSelect.id) {
					case "1":
						this.showCon = "organization"
						this.titleShow = "公司"
						this.$set(this.dataCon, "context", row.browseBoxList)
						break;
					case "2":
						this.showCon = "organization"
						this.titleShow = "部门"
						this.$set(this.dataCon, "context", row.browseBoxList)
						break;
					case "3":
						this.showCon = "organization"
						this.titleShow = "职位"
						this.$set(this.dataCon, "context", row.browseBoxList)
						break;
					case "4":
						this.showCon = "personnel"
						this.titleShow = "人员"
						this.$api.collaborativeOffice.findConList("staffManage/findStaffByPage", {
							page: 1,
							size: 10
						}).then(data => {
							this.$set(this.dataCon, "context", data.data.data.rows)
							this.$set(this.dataCon, "currentTotal", data.data.data.total)
						})
						break;
					case "5":
						this.showCon = "user"
						this.titleShow = "用户"
						this.$api.collaborativeOffice.findConList("userManage/findUserBypage", {
							page: 1,
							size: 10
						}).then(data => {
							console.log(data)
							this.$set(this.dataCon, "context", data.data.data.rows)
							this.$set(this.dataCon, "currentTotal", data.data.data.total)
						})
						break;
					case "6":
						this.showCon = "jobSet"
						this.titleShow = "职务"
						this.$api.collaborativeOffice.findConList("positionmnt/findPositionList", {
							page: 1,
							size: 10
						}).then(data => {
							console.log(data)
							this.$set(this.dataCon, "context", data.data.data.rows)
							this.$set(this.dataCon, "currentTotal", data.data.data.total)
						})
						break;
					case "7":
						return "dateControl"
						break;
				}
			},
			//测试提交
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.goOk("可以提交")
					} else {
						this.goOk("数据填写不全")
					}
				});
			},
			//富文本事件
			onEditorBlur() {}, // 失去焦点事件
			onEditorFocus(event) {
				if(this.formDisabled == true) {
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
</style>