<template>
	<div>
		<el-card class="box-card">
			<el-row :gutter="24">
				<el-col :span="14">
					<el-form label-width="10px" :model="formInline" class="demo-form-inline">
						<el-row>
							<el-col :span="4">
								<el-form-item>
									<el-select clearable v-model="formInline.status" placeholder="状态">
										<el-option v-for="item in statusList" :key="item.id" :label="item.value" :value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item>
									<el-input clearable v-model="formInline.code" placeholder="主表分类编码"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="5">
								<el-form-item>
									<el-input clearable v-model="formInline.name" placeholder="主表分类名称"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item>
									<el-input clearable v-model="formInline.tableName" placeholder="数据库表名"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="3">
								<el-form-item>
									<el-input clearable v-model="formInline.remark" placeholder="描述"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="3">
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
			<el-table height="450" :row-class-name="tableRowClassName" @row-click="clickRow" :data="tableData" border>
				<el-table-column :formatter="statusShow" prop="status" label="状态" width="180" align="center"></el-table-column>
				<el-table-column prop="code" label="主表分类编码" width="180" align="center"></el-table-column>
				<el-table-column prop="name" label="主表分类名称" width="180" align="center"></el-table-column>
				<el-table-column prop="tableName" label="数据库表名" width="180" align="center"></el-table-column>
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
				statusList: [{
					id: "1",
					value: "暂存"
				}, {
					id: "2",
					value: "提交"
				}, {
					id: "3",
					value: "有效"
				}, {
					id: "4",
					value: "回收"
				}, {
					id: "7",
					value: "作废"
				}, {
					id: "8",
					value: "关闭/结清"
				}],
				formInline: {
					code: "",
					name: "",
					remark: "",
					status: "",
					tableName: "",
					page: 1,
					size: 10
				},
				currentTotal: 0,
				tableData: [],
				rowClickId: "",
				rowClick: {},
			}
		},
		created() {
			this.toSelect()
		},
		methods: {
			//查看
			toSee() {
				if(this.getRowClickId()) {
					this.$api.collaborativeOffice.getWorkItemTypeModel({
						id: this.rowClickId
					}).then(data => {
						console.log(data.data.data)
						this.$parent.toAdd('3', data.data.data)
					})
				}

			},
			//修改状态
			updateStatus(status) {
				if(this.getRowClickId()) {
					this.$api.collaborativeOffice.updateStatus({
						id: this.rowClick.id,
						status: status,
						tableName : this.rowClick.tableName
					}).then(data => {
						if(this.dataBack(data, "修改状态成功")) {
							this.toSelect()
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
						return "作废"
						break;
					case 8:
						return "关闭/结清"
						break;
				}
			},
			//修改
			toUpd() {
				if(this.getRowClickId()) {
					this.$api.collaborativeOffice.getWorkItemTypeModel({
						id: this.rowClickId
					}).then(data => {
						console.log(data.data.data)
						this.$parent.toAdd('2', data.data.data)
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
				this.$api.collaborativeOffice.findWorkItemTypePage(this.formInline).then(data => {
					console.log(data)
					this.tableData = data.data.data.rows
					this.currentTotal = data.data.data.total
				})
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
				this.rowClick = row
			},
		}
	}
</script>

<style scoped>
	.el-table>>>.warning-row {
		background-color: #ffe48d;
	}
	
	.box-card:first-child {
		margin-bottom: 16px;
	}
</style>