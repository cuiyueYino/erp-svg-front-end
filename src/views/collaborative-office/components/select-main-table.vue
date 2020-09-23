<template>
	<div>
		<el-card class="box-card">
			<el-row :gutter="24">
				<el-col :span="14">
					<el-form label-width="10px" :model="formInline">
						<el-row>
							<el-col :span="6">
								<el-form-item>
									<el-select style="width: 100%;" clearable @change="selectChange" v-model="value" value-key="id" >
										<el-option v-for="item in formInlineList" :key="item.id" :label="item.name" :value="item" >
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6" v-if="value.id != 'status'">
								<el-form-item>
									<el-input clearable v-model="selectData"></el-input>
								</el-form-item>
							</el-col>
                            <el-col :span="6" v-else>
                                <el-select style="width: 100%;" clearable v-model="selectData" value-key="id" >
                                    <el-option v-for="item in formStatusList" :key="item.id" :label="item.name" :value="item.id" >
                                    </el-option>
                                </el-select>
                            </el-col>
							<el-col :span="6">
								<el-form-item>
									<el-button icon='el-icon-search' type="primary" size="small" @click="$refs.pageNation.toBegin()">搜索</el-button>
									<el-button icon='el-icon-refresh' type="primary" size="small" @click="toClear()">重置</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-col>
				<el-col v-show="show != '1'" style="text-align: right;" :span="10">
					<el-button @click="$parent.toAdd()" icon="el-icon-folder-add" type="success" size="small">新增</el-button>
					<el-button @click="toUpd()" icon="el-icon-edit-outline" type="warning" size="small">修改</el-button>
					<el-button @click="updateStatus(3)" icon="el-icon-magic-stick" type="success" size="small">生效</el-button>
					<el-button @click="updateStatus(7)" icon="el-icon-circle-close" type="danger" size="small">禁用</el-button>
					<el-button @click="toSee()" icon="el-icon-view" type="info" plain size="small">查看</el-button>
				</el-col>
			</el-row>
		</el-card>
		<el-card class="box-card">
			<el-table size="small" @row-dblclick="rowDblClick" :height="$GLOBAL.tableHeight" highlight-current-row @row-click="clickRow" :data="tableData" border>
				<el-table-column :formatter="statusShow" prop="status" label="状态" align="center"></el-table-column>
				<el-table-column prop="code" label="主表编码" align="center"></el-table-column>
				<el-table-column prop="name" label="主表名称" align="center"></el-table-column>
				<el-table-column prop="workItemTypeName" label="主表分类" align="center"></el-table-column>
				<el-table-column :formatter="textLength" prop="remark" label="描述" align="center"></el-table-column>
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
			userId: String,
			status: String,
			company:Object,
			companyId:'',
		},
		data() {
			return {
				value: "",
				selectData: "",
				formInlineList: [{
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
				},{
                    id: "status",
                    name: "状态"
                }],
                formStatusList:[
                    {
                        id: "3",
                        name: "有效"
                    },{
                        id: "7",
                        name: "禁用"
                    },
                ],
				formInline: {
					page: 1,
					size: 10
				},
				companyName:{},
				CompanyData: JSON.parse(localStorage.getItem('CompanyData')),
				currentTotal: 0,
				tableData: [],
				rowClickId: "",
				rowClick: {},
				selectCon: "",
				toSelectData: {
					page: 1,
					size: 10,
					company:''
				},
			}
		},
		created() {
		    if(this.show==1){
                this.formInlineList = [{
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
                }]
            }
			if(this.company){
				this.companyName=this.company;
			}
			this.toSelect()
		},
		methods: {
			rowDblClick(row) {
				if(row.status == 3) {
					if(typeof(this.$parent.$parent.getDialogVisible) == "function") {
						this.$parent.$parent.getDialogVisible(true)
					}
					if(typeof(this.$parent.$parent.$parent.getDialogVisible) == "function") {
						this.$parent.$parent.$parent.getDialogVisible(true)
					}
				} else {
					this.goOut("只能选择状态为 '有效' 的主表模板")
				}
			},
			selectChange(data) {
				this.selectCon = data.id
				this.toSelectData = JSON.parse(JSON.stringify(this.formInline))
				this.toSelectData[data.id] = this.selectData
                this.selectData='';

			},
			//查看
			toSee() {
				if(this.getRowClickId()) {
					this.$api.collaborativeOffice.getWorkItemTempModel({
						id: this.rowClickId
					}).then(data => {
						this.$parent.toUpd(data.data.data, '1')
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
					if(status == 7) {
						this.$api.collaborativeOffice.updateStatusTemp({
						id: this.rowClickId,
						status: status,
						tableName:this.rowClick.tableName
						}).then(data => {
							if(this.dataBack(data, "修改状态成功")) {
								this.toSelect()
							}
						})
					} else {
					this.$api.collaborativeOffice.updateStatusTemp({
						id: this.rowClickId,
						status: status,
					}).then(data => {
						if(this.dataBack(data, "修改状态成功")) {
							this.toSelect()
						}
					})
					}

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
            //描述显示
            textLength(row){
                if(row.remark!=null&&row.remark.length>20) {
                    return row.remark.substring(0,20)+"...";
                }else {
                    return row.remark;
                }
            },
			//修改
			toUpd() {
				if(this.getRowClickId()) {
                    if(this.rowClick.status==3||this.rowClick.status==2){
                        this.$message.error("有效状态的数据不可修改");
                        return;
                    }
					this.$api.collaborativeOffice.getWorkItemTempModel({
						id: this.rowClickId
					}).then(data => {
						this.$parent.toUpd(data.data.data, "2")
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
				this.toSelectData.page = pageIndex;
				this.toSelect()
			},
			//搜索
			toSelect() {
			    if(this.show==1){
                    this.toSelectData.status = 3
                }
				if(typeof(this.toSelectData[this.selectCon]) != "undefined") {
					this.toSelectData[this.selectCon] = this.selectData
				}
				if(this.company){
					if(this.company.id){
						this.toSelectData.company = this.company.id;
					}
				}
				if(this.status){
					this.toSelectData.status=this.status;
				}
				if(this.userId){
					this.toSelectData.userId=this.userId;
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
