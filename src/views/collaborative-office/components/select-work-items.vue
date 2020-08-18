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
									<el-button type="primary" @click="toSelect">搜索</el-button>
									<el-button type="primary" @click="toClear">重置</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-col>
				<el-col v-show="show != '1'" style="text-align: right;" :span="10">
					<el-button @click="$parent.toAdd('1')" icon="el-icon-plus" type="success">新增</el-button>
					<el-button @click="toUpd()" icon="el-icon-edit" type="warning">修改</el-button>
					<el-button @click="del()" icon="el-icon-delete" type="danger">删除</el-button>
					<el-button @click="toSee()" icon="el-icon-view" type="primary" plain>查看</el-button>
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
				rowClick: {}
			}
		},
		created() {
			this.toSelect()
		},
		methods: {
			rowDblClick(row) {
				if(typeof(this.$parent.$parent.getDialogVisible) == "function") {
					this.$parent.$parent.getDialogVisible()
				}
			},
			//删除
			del() {
				if(this.getRowClickId()) {
					this.$api.collaborativeOffice.apiUrl("workItem/delWorkItem", {
						srcId: this.rowClick.srcId,
						tempId: this.rowClick.tempId,
						tableName: this.rowClick.tableName
					}).then(data => {
						if(this.dataBack(data), "删除成功") {
							this.toSelect()
						}
					})
				}
			},
			//查看
			toSee() {
				if(this.getRowClickId()) {
					this.$api.collaborativeOffice.findDataBySrcId({
						srcId: this.rowClick.srcId,
						tempId: this.rowClick.tempId,
						tableName: this.rowClick.tableName
					}).then(data => {
						if(this.dataBack(data)) {
							this.$api.collaborativeOffice.findlnfosList({
								voucherId: JSON.parse(data.data.data).id,
								userCode: localStorage.getItem('ms_userId'),
								menuCode: "workItem"
							}).then(val => {
								this.$parent.toSee(JSON.parse(data.data.data), this.rowClick.tempId, "1", val.data.data)
							})
						}
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
				if(this.getRowClickId()) {
					this.$api.collaborativeOffice.findDataBySrcId({
						srcId: this.rowClick.srcId,
						tempId: this.rowClick.tempId,
						tableName: this.rowClick.tableName
					}).then(data => {
						this.$api.collaborativeOffice.findlnfosList({
							voucherId: JSON.parse(data.data.data).id,
							userCode: localStorage.getItem('ms_userId'),
							menuCode: "workItem"
						}).then(val => {
							this.$parent.toSee(JSON.parse(data.data.data), this.rowClick.tempId, "3", val.data.data)
						})

					})
				}
			},
			//判断是否选中ROW
			getRowClickId() {
				if(this.rowClick.srcId) {
					return true
				} else {
					this.$message.error("请选择数据");
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
				if(this.value != 'time') {
					if(!this.noNull(this.value)) {
						toGet[this.value] = this.selectData
					}
				} else {
					toGet.beginTime = this.value1[0]
					toGet.endTime = this.value1[1]
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
				this.selectData = ""
				this.value = ""
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