<template>
	<div style="height: 85vh; overflow-y:scroll">
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
					<el-select :disabled="showFigSee" size='mini' value-key="id" v-model="company" placeholder="公司">
						<el-option v-for="item in CompanyData" :key="item.id" :label="item.name" :value="item">
						</el-option>
					</el-select>
				</el-col>
				<el-col v-if="!showFigSee" :span="6" style="text-align: right;">
					<el-button v-if="showFig" @click="submitForm(2)" type="success" size="mini" icon="el-icon-check">提交</el-button>
					<el-button v-if="showFig" @click="submitForm(1)" type="success" size="mini" icon="el-icon-check">暂存</el-button>
					<el-button @click="dialogVisible =  true" type="success" size="mini" icon="el-icon-check">选择模板</el-button>
				</el-col>
			</el-row>
			<formAndTable showAdd="1" ref="child" :form-data="conData"></formAndTable>
		</el-card>
		<!--弹出框-->
		<el-dialog title="工作事项主板模板" top="1vh" :destroy-on-close="true" center :visible.sync="dialogVisible" width="80%">
			<selectMainTable show="1" ref="childMain"></selectMainTable>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="getDialogVisible">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	//工作事项主表模板
	import selectMainTable from './select-main-table';
	//预览
	import formAndTable from './form-and-table';
	export default {
		components: {
			selectMainTable,
			formAndTable
		},
		props: {
			//查看
			showFigNum: String,
			//值
			context: Object
		},
		data() {
			return {
				//提交/暂存按钮显示
				showFig: false,
				//主表弹出框
				dialogVisible: false,
				//新增/查看
				showFigSee: false,
				//公司名称
				CompanyData: [],
				company:"",
				//全部服务
				tServiceByParams: [],
				//全部公司
				CompanyData: [],
				//全部枚举
				selectList: [],
				//全部工作事项
				fieldBrowseList: [],
				//公司部门职位的合集
				allOrganizationInfo: [],
				//主表tableName
				tableName : "",
				//主表ID
				tempId : "",
				conData: {
					top: {},
					bottom: []
				}
			}
		},
		created() {
			//showFigNum 等于 “3” 为查看
			if(this.showFigNum == "3") {
				this.showFigSee = true
				//				this.ruleForm = this.context
			}
			//最上端公司选择
			this.$api.collaborativeOffice.getCompanyData().then(data => {
				this.CompanyData = data.data.data.rows
				this.CompanyData.forEach(item => {
					if(item.name == "福佳集团") {
						this.company = item
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
				this.allOrganizationInfo = eval('(' + data.data.data + ')')
				console.log(this.allOrganizationInfo)
			})
		},
		methods: {
			//提交/暂存
			submitForm(status) {
				//校验所有必填字段
				if(this.$refs.child.onSubmit()) {
					//获取返回字段的合集
					var backData = {
						jsonStr: this.$refs.child.conData
					}
					//存入外层信息
					backData.voucherId = backData.jsonStr.voucherId
					backData.title = backData.jsonStr.title
					backData.gestor = backData.jsonStr.gestor
					backData.gestorDept = backData.jsonStr.gestorDept
					backData.voucherTime = backData.jsonStr.voucherTime
					backData.companyCode = this.company.code
					backData.creator = localStorage.getItem('ms_userId')
					backData.status = status
					backData.tableName = this.tableName
					backData.tempId = this.tempId
					//存入里层信息
					//状态
					backData.jsonStr.status = status
					//公司ID
					backData.jsonStr.company = this.company.id
					//新增
					backData.jsonStr.oprStatus = 1
					for(var key in backData.jsonStr) {
						if(typeof(backData.jsonStr[key]) == "object") {
							backData.jsonStr[key].forEach(item => {
								item.oprStatus = 1
							})
						}
					}
					backData.jsonStr = JSON.stringify(backData.jsonStr)
					console.log(backData)
					this.$api.collaborativeOffice.apiUrl("workItem/insertWorkItem", backData).then(data => {
						if(this.dataBack(data, "新增成功")) {

						}
					})
				} else {
					this.goOut("请填写必填的数据")
				}
			},
			//选择模板
			getDialogVisible() {
				//获取模板详细数据
				this.tempId = this.$refs.childMain.rowClick.id
				this.$api.collaborativeOffice.findById({
					id: this.$refs.childMain.rowClick.id
				}).then(data => {
					console.log(data)
					this.tableName = data.data.data.workItemTemp.tableName
					//整理传入子组件的数据top 主表  bottom 子表
					this.conData.top = data.data.data.workItemTemp
					this.conData.bottom = data.data.data.workItemTempSub
					this.preview(this.conData.top.lines, "", 1)
					this.conData.bottom.forEach((val, index) => {
						this.preview(val.lines, index, 2)
					})
					this.dialogVisible = false
					this.showFig = true
					console.log(this.conData)
				})
			},
			//子表数据整理
			preview(rowConList, rowIndex, state) {
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
						if(!this.noNull(itemChild.parameter) && itemChild.parameter.indexOf('-') != -1) {
							//left right 分别是需要计算的两个值的字段名称
							var index = itemChild.parameter.indexOf('-')
							var left = itemChild.parameter.substring(0, index)
							var right = itemChild.parameter.substring(index + 1)
							//两个字段都要添加属性parameterList，里面存储需要计算的字段名和需要显示的字段名child
							if(left == item.field || right == item.field) {
								item.parameterList = {}
								item.parameterList.left = left
								item.parameterList.right = right
								item.parameterList.child = itemChild.field
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
				//如果是主表，直接存入数据，如果是子表，输入全部存入conList里，并且排序
				if(state == 1) {
					this.$set(this.conData.top, "rowList", cur)
				} else {
					if(this.conData.bottom[rowIndex].type == 2) {
						this.$set(this.conData.bottom[rowIndex], "conList", [])
						cur.forEach(val1 => {
							val1.colList.forEach(val2 => {
								this.conData.bottom[rowIndex].conList.push(val2)
							})
						})
						this.conData.bottom[rowIndex].conList.sort((a1, b1) => {
							return a1.orderNum - b1.orderNum
						})
					}
					this.conData.bottom[rowIndex].rowList = cur
				}
			},
			//添加校验（显示的值的校验)
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