<template>
	<div>
		<el-card class="box-card">
			<el-row :gutter="24">
				<el-col :span="14">
					<el-form label-width="10px" ref="formInline" :model="formInline" class="demo-form-inline">
						<el-row>
							<el-col :span="3">
								<el-form-item prop="status">
									<el-select clearable v-model="formInline.status" placeholder="状态">
										<el-option v-for="item in statusList" :key="item.id" :label="item.value" :value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item prop="code">
									<el-input clearable v-model="formInline.code" placeholder="子表分类编码"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item prop="name">
									<el-input clearable v-model="formInline.name" placeholder="子表分类名称"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item prop="tableName">
									<el-input clearable v-model="formInline.tableName" placeholder="数据库表名"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="3">
								<el-form-item prop="remark">
									<el-input clearable v-model="formInline.remark" placeholder="描述"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item>
									<el-button type="primary" @click="$refs.pageNation.toBegin()">搜索</el-button>
									<el-button type="primary" @click="$refs.formInline.resetFields();toSelect()">重置</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-col>
				<el-col v-show="show != '1'" style="text-align: right;" :span="10">
					<el-button @click="$parent.toAdd('1')" icon="el-icon-plus" type="success">新增</el-button>
					<el-button @click="toUpd()" icon="el-icon-edit" type="warning">修改</el-button>
					<el-button @click="updateStatus(3)" icon="el-icon-check" type="primary">生效</el-button>
					<el-button @click="updateStatus(7)" icon="el-icon-delete" type="danger">禁用</el-button>
					<el-button @click="toSee()" icon="el-icon-view" type="primary" plain>查看</el-button>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<el-table size="small" @row-dblclick="rowDblClick" :height="$GLOBAL.tableHeight" highlight-current-row @row-click="clickRow" :data="tableData" border>
				<el-table-column :formatter="statusShow" prop="status" label="状态" width="180" align="center"></el-table-column>
				<el-table-column prop="code" label="子表分类编码" width="180" align="center"></el-table-column>
				<el-table-column prop="name" label="子表分类名称" width="180" align="center"></el-table-column>
				<el-table-column prop="tableName" label="数据库表名" width="180" align="center"></el-table-column>
				<el-table-column prop="remark" label="描述" align="center"></el-table-column>
			</el-table>
			<pageNation :total="currentTotal" v-if="currentTotal != 0" ref="pageNation" @pageChange="pageChange"></pageNation>
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
			company:String,
		},
		data() {
			return {
				// company:'',
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
					value: "禁用"
				}, {
					id: "8",
					value: "关闭/结清"
				}],
				formInline: {
					company:'',
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
				parent: this.$parent.$parent.$parent
			}
		},
		created() {
			this.toSelect()
		},
		methods: {
			//双击选中
			rowDblClick(row) {
				if(row.status == 3) {
					if(typeof(this.parent.getSelectMainTableClassification) == "function") {
						this.parent.getSelectMainTableClassification()
					}
				} else {
					this.goOut("只能选择状态为 '有效' 的子表模板分类")
				}
			},
			//查看
			toSee() {
				if(this.getRowClickId()) {
					this.$api.collaborativeOffice.getWorkItemTypeSubModel({
						id: this.rowClickId
					}).then(data => {
						this.$parent.toAdd('3', data.data.data)
					})
				}
			},
			//修改状态
			updateStatus(status) {
				if(this.getRowClickId()) {
                    if(this.rowClick.status==1){
                        this.$message.error("状态不可修改");
                        return;
                    }
					this.$api.collaborativeOffice.apiUrl("workItemTypeSub/updateStatus", {
						id: this.rowClick.id,
						status: status,
						tableName: this.rowClick.tableName
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
                    if(this.rowClick.status==3||this.rowClick.status==2){
                        this.$message.error("该状态的数据不可修改");
                        return;
                    }
					this.$api.collaborativeOffice.getWorkItemTypeSubModel({
						id: this.rowClickId
					}).then(data => {
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
			    if(this.show==1){
                    this.formInline.status = 3;
                }
				this.formInline.company = this.company;
				this.$api.collaborativeOffice.apiUrl("workItemTypeSub/findWorkItemTypeSubPage", this.formInline).then(data => {
					this.tableData = data.data.data.rows
					this.currentTotal = data.data.data.total
				})
			},
			//选中行
			clickRow(row) {
				this.rowClickId = row.id
				this.rowClick = row
			},
		},
	}
</script>

<style scoped>
	.box-card:first-child {
		margin-bottom: 16px;
	}
</style>
