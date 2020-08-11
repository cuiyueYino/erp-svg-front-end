<template>
	<div>
		<el-card class="box-card">
			<el-row :gutter="24">
				<el-col :span="14">
					<el-form label-width="10px" :model="formInline" class="demo-form-inline">
						<el-row>
							<el-col :span="8">
								<el-form-item>
									<el-select style="width: 100%;" clearable @change="selectChange" v-model="value" value-key="id">
										<el-option v-for="item in formInlineList" :key="item.id" :label="item.name" :value="item">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item>
									<el-input clearable v-model="selectData"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item>
									<el-button type="primary" @click="$refs.pageNation.toBegin()">搜索</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-col>
				<el-col v-show="show != '1'" style="text-align: right;" :span="10">
					<el-button @click="$parent.toAdd('1')" icon="el-icon-delete" type="success">新增</el-button>
					<el-button @click="toUpd()" icon="el-icon-delete" type="success">修改</el-button>
					<el-button @click="updateStatus(3)" icon="el-icon-delete" type="primary">生效</el-button>
					<el-button @click="updateStatus(7)" icon="el-icon-delete" type="danger">禁用</el-button>
					<el-button @click="toSee()" icon="el-icon-delete" type="primary" plain>查看</el-button>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<el-table size="small" @row-dblclick="rowDblClick" :height="$GLOBAL.tableHeight" highlight-current-row @row-click="clickRow" :data="tableData" border>
				<el-table-column :formatter="statusShow" prop="status" label="状态" align="center"></el-table-column>
				<el-table-column prop="code" label="主表编码" align="center"></el-table-column>
				<el-table-column prop="name" label="主表名称" align="center"></el-table-column>
				<el-table-column prop="workItemTypeName" label="主表分类" align="center"></el-table-column>
				<el-table-column prop="remark" label="描述" align="center"></el-table-column>
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
				selectData: "",
				formInlineList: [{
					id: "status",
					name: "状态"
				}, {
					id: "code",
					name: "主表编码"
				}, {
					id: "name",
					name: "主表名称"
				}, {
					id: "workItemTypeName",
					name: "主表分类"
				}, {
					id: "remark",
					name: "描述"
				}],
				formInline: {
					page: 1,
					size: 10
				},
				currentTotal: 0,
				tableData: [],
				rowClickId: "",
				rowClick: {},
				selectCon: "",
				toSelectData: {
					page: 1,
					size: 10
				},
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
			selectChange(data) {
				this.selectCon = data.id
				this.toSelectData = JSON.parse(JSON.stringify(this.formInline))
				this.toSelectData[data.id] = this.selectData
			},
			//查看
			toSee() {
				if(this.getRowClickId()) {
					this.$api.collaborativeOffice.getWorkItemTempModel({
						id: this.rowClickId
					}).then(data => {
						console.log(data)
						this.$parent.toAdd('3', data.data.data)
					})
				}
			},
			//修改状态
			updateStatus(status) {
				if(this.getRowClickId()) {
					this.$api.collaborativeOffice.updateStatusTemp({
						id: this.rowClickId,
						status: status,
					}).then(data => {
						if(this.dataBack(data, "修改状态成功")) {
							this.toSelect()
						}
					})
				}
			}, //状态展示
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
					this.$api.collaborativeOffice.getWorkItemTempModel({
						id: this.rowClickId
					}).then(data => {
						console.log(data.data.data)
						this.$parent.toUpd(data.data.data)
					})
				}
			},
			//判断是否选中ROW
			getRowClickId() {
				if(this.rowClickId) {
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
				if(typeof(this.toSelectData[this.selectCon]) != "undefined") {
					this.toSelectData[this.selectCon] = this.selectData
				}
				this.$api.collaborativeOffice.findWorkItemTempPage(this.toSelectData).then(data => {
					this.tableData = data.data.data.rows
					this.currentTotal = data.data.data.total
				})
			},
			//选中行
			clickRow(row) {
				this.rowClickId = row.id
				this.rowClick = row
			},
		}
	}
</script>

<style scoped>
	.box-card:first-child {
		margin-bottom: 16px;
	}
</style>