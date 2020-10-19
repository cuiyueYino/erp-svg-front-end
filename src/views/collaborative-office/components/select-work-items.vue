<template>
	<div>
		<el-card class="box-card">
			<el-row :gutter="24">
				<el-col :span="14">
					<el-form label-width="10px" :model="formInline" class="demo-form-inline">
						<el-row>
							<el-col :span="4">
								<el-form-item>
									<el-select clearable v-model="value" value-key="id">
										<el-option v-for="item in formInlineList" :key="item.id" :label="item.name" :value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="4" v-if="value != 'time'">
								<el-form-item>
									<el-input clearable v-model="selectData"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10" v-else>
								<el-form-item>
									<el-date-picker value-format="yyyy-MM-dd" v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item>
									<el-button type="primary" icon='el-icon-search' size="small" @click="formInTypeChange('YES');toSelect()">搜索</el-button>
									<el-button type="primary" icon='el-icon-refresh' size="small" @click="toClear">重置</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-col>
				<el-col v-show="show != '1'" style="text-align: right;" :span="10">
					<el-button @click="$parent.toAdd('1')" icon="el-icon-folder-add" type="success" size="small">新增</el-button>
					<el-button @click="toUpd()" icon="el-icon-edit-outline" type="warning" size="small">修改</el-button>
					<el-button @click="del()" icon="el-icon-delete" type="danger" size="small">删除</el-button>
					<el-button @click="toSee()" icon="el-icon-view" type="info" size="small">查看</el-button>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<el-table size="small" @row-dblclick="rowDblClick" :height="$GLOBAL.tableHeight" highlight-current-row @row-click="clickRow" :data="tableData" border>
				<el-table-column :formatter="statusShow" prop="status" label="状态" width="100" align="center"></el-table-column>
				<el-table-column prop="voucherId" label="单据编号" align="center"></el-table-column>
				<el-table-column prop="title" label="标题" align="center"></el-table-column>
				<el-table-column prop="gestorName" label="经办人" align="center"></el-table-column>
				<el-table-column prop="gestorDeptName" label="经办部门" align="center"></el-table-column>
				<el-table-column prop="voucherTime" label="经办时间" align="center"></el-table-column>
				<el-table-column prop="tempName" label="工作事项模板" align="center"></el-table-column>
			</el-table>
			<pageNation :total="currentTotal" ref="pageNation" @pageChange="pageChange"></pageNation>
		</el-card>
	</div>
</template>
<script>
	import pageNation from './pageNation';
	export default {
		components: {
			pageNation
		},
		props: {
			show: String,
			status: String,
			company: String,
		},
		data() {
			return {
				value: "",
				value1: [],
				selectData: "",
				formInlineList: [{
					id: "voucherId",
					name: "单据编号"
				}, {
					id: "title",
					name: "标题"
				}, {
					id: "gestor",
					name: "经办人"
				}, {
					id: "gestorDept",
					name: "经办部门"
				}, {
					id: "time",
					name: "经办时间"
				}, {
					id: "tempName",
					name: "工作事项模板"
				}],
				formInline: {
					voucherId: "",
					title: "",
					gestor: "",
					gestorDept: "",
					beginTime: "",
					endTime: "",
					creator: localStorage.getItem('ms_userId'),
					page: 1,
					size: 10
				},
				currentTotal: 0,
				tableData: [],
				rowClick: {},
				formInType:false,
				context: []
			}
		},
		created() {
			this.toSelect()
		},
		methods: {
			formInTypeChange(data){
				if(data=='YES'){
					this.formInType=true;
				}else{
					this.formInType=false;
				}
			},
			rowDblClick(row) {
				if(typeof(this.$parent.$parent.getDialogVisible) == "function") {
					this.$parent.$parent.getDialogVisible()
				}
			},
			//删除
			del() {
				if(this.getRowClickId('del')) {
					this.$confirm('此操作将永久删除该单据, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$api.collaborativeOffice.apiUrl("workItem/delWorkItem", {
							srcId: this.rowClick.srcId,
							tempId: this.rowClick.tempId,
							tableName: this.rowClick.tableName
						}).then(data => {
							if(this.dataBack(data, "删除成功")) {
								this.toSelect()
							}
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
			},
			//查看
			toSee() {
				if(this.getRowClickId('other')) {
					if(this.rowClick.status == 1) {
						this.$message.error("未提交数据请修改");
						return;
					}
					this.$api.collaborativeOffice.findIds({
						srcId: this.rowClick.srcId,
					}).then((res) => {
						console.log(res)
						this.getContext(res.data.data, '1')
					})
				}
			},
			async getContext(res, state) {
				for(var i = 0; i < res.length; i++) {
					await this.$api.collaborativeOffice.findDataBySrcId({
						srcId: res[i].idInProcess,
						tempId: res[i].tempId,
						tableName: res[i].tableName
					}).then(data => {
						return new Promise(resolve => {
							this.$api.collaborativeOffice.findlnfosList({
								voucherId: JSON.parse(data.data.data).id,
								userCode: localStorage.getItem('ms_userId'),
								menuCode: "workItem"
							}).then(val => {
								var a = JSON.parse(data.data.data)
								a.tempId = res[i].tempId;
								a.tableName = res[i].tableName;
								a.files = val.data.data;
								a.aaaId = res[i].idInProcess;
								this.context.push(a)
								if(i == res.length - 1) {
									this.$parent.toSee(this.context, this.rowClick.tempId, state, val.data.data)
								}
								resolve({})
							})
						});
					})
				}
			},
			//状态展示
			statusShow(row) {
				switch(row.status) {
					case 1:
						return "暂存"
						break;
					case 2:
						return "提交"
						break;
					case 3:
						return "有效"
						break;
					case 4:
						return "回收"
						break;
					case 7:
						return "禁用"
						break;
					case 8:
						return "关闭/结清"
						break;
				}
			},
			//修改
			toUpd() {
				if(this.getRowClickId('other')) {
					if(this.rowClick.status == 3 || this.rowClick.status == 2) {
						this.$message.error("已提交的数据不可修改");
						return;
					}
					var a = [{
						idInProcess: this.rowClick.srcId,
						tempId: this.rowClick.tempId,
						tableName: this.rowClick.tableName
					}]
					this.getContext(a, '3')
				}
			},
			//判断是否选中ROW
			getRowClickId(flag) {
				if(flag == 'del') {
					if(this.rowClick.srcId) {
						if(this.rowClick.status == 2) {
							this.$message.error("已经提交的数据不可以被删除");
						} else {
							return true
						}
					} else {
						this.$message.error("请选择数据");
					}
				} else {
					if(this.rowClick.srcId) {
						return true
					} else {
						this.$message.error("请选择数据");
					}
				}
			},
			//分页改变
			pageChange(pageIndex) {
				this.formInline.page = pageIndex;
				this.toSelect()
			},
			//搜索
			toSelect() {
				var toGet = JSON.parse(JSON.stringify(this.formInline))
				if(this.formInType){
					if(this.value != 'time') {
						if(!this.noNull(this.value)) {
							toGet[this.value] = this.selectData
						}
					} else {
						toGet.beginTime = this.value1[0]
						toGet.endTime = this.value1[1]
					}
				}else{
					if(this.value != 'time') {
						if(!this.noNull(this.value)) {
							toGet[this.value] = '';
						}
					} else {
						toGet.beginTime = '';
						toGet.endTime = '';
					}
				}
				if(this.status) {
					toGet.status = this.status;
				}
				this.$api.collaborativeOffice.findPage(toGet).then(data => {
					this.tableData = data.data.data.rows
					this.currentTotal = data.data.data.total
				})
			},
			//选中行
			clickRow(row) {
				this.rowClick = row
			},
			toClear() {
				this.selectData = "";
				this.value = "";
				this.formInline.page =1;
				this.formInType=false;
				this.toSelect()
			}
		}
	}
</script>

<style scoped>
	.box-card:first-child {
		margin-bottom: 16px;
	}
</style>