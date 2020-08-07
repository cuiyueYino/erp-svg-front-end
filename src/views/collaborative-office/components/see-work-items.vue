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
					<el-select disabled size='mini' value-key="id" v-model="company" placeholder="公司">
						<el-option v-for="item in CompanyData" :key="item.id" :label="item.name" :value="item">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<formAndTable :dis="showSeeOrUpd" showAdd="2" ref="child" :form-data="conData"></formAndTable>
		</el-card>
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
			//值
			context: Object,
			showSeeOrUpd : String
		},
		data() {
			return {
				company: "",
				//主表ID
				tempId: "",
				conData: {
					top: {},
					bottom: []
				},
				//全部服务
				tServiceByParams: JSON.parse(localStorage.getItem('tServiceByParams')),
				//全部公司
				CompanyData: JSON.parse(localStorage.getItem('CompanyData')),
				//全部枚举
				selectList: JSON.parse(localStorage.getItem('selectList')),
				//全部工作事项
				fieldBrowseList: JSON.parse(localStorage.getItem('fieldBrowseList')),
				//公司部门职位的合集
				allOrganizationInfo: JSON.parse(localStorage.getItem('allOrganizationInfo')),
			}
		},
		created() {
			//最上端公司选择
			this.CompanyData.forEach(item => {
				if(item.name == "福佳集团") {
					this.company = item
				}
			})
			this.getDialogVisible()
		},
		methods: { //选择模板
			getDialogVisible() {
				//获取模板详细数据
				this.$api.collaborativeOffice.findById({
					id: this.context.tempId
				}).then(data => {
					//整理传入子组件的数据top 主表  bottom 子表
					this.conData.top = data.data.data.workItemTemp
					this.$set(this.conData.top, "wholeData", this.context)
					this.conData.bottom = data.data.data.workItemTempSub
					this.preview(this.conData.top.lines, "", 1)
					this.conData.bottom.forEach((val, index) => {
						this.$set(val, "wholeData", this.context)
						this.preview(val.lines, index, 2)
					})
					//子表模板排序
					this.conData.bottom.sort((a1, b1) => {
						return a1.orderNum - b1.orderNum
					})
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