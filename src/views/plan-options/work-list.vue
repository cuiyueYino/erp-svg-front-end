<template>
	<div>
		<WorkItemPage ref="childOtherChild" @getSrcId="getSrcId" v-for="(item,key) in context" :key="key" style="display: block;" @changeShow="saveSWIDData" :showChild="key == 0 ? '1' : '2'" :context="item" :showSeeOrUpd="showSeeOrUpd1(item)" :todoFlag="todoFlag">
			<table class="aaa" v-if="tableList.length > 0" style="margin-top: 10px;margin-bottom: 10px;width: 100%;">
				<tr v-for="(val,key) in tableList" :key="key" style="min-height: 100px;">
					<td style="width: 100px;text-align: center;">
						{{val.fname}}
					</td>
					<td>
						<el-row v-for="(valChild,keyC) in val.list" :key="keyC">
							<el-col v-for='(item,keyiT) in valChild' :key="keyiT" style="border: 1px dashed #000;margin: 10px;padding: 10px;" :span="7">
								<el-row style="margin-bottom: 10px;">
									{{item.approvalComment}}
								</el-row>
								<el-row>
									{{item.auditDeptMent}}/{{item.staffName}} {{item.fcreatetime}}
								</el-row>
							</el-col>
						</el-row>
					</td>
				</tr>
			</table>
		</WorkItemPage>
	</div>
</template>

<script>
	import WorkItemPage from '../../views/collaborative-office/components/see-work-items-desk.vue'; // 工作事项的详情
	export default {
		props: {
			rowWAADataObj: Object,
			formdata: Object,
			showSeeOrUpd: String,
			todoFlag: Boolean,
			showLookOrUpdate: Object,
			currentDatd: String,

		},
		components: {
			WorkItemPage
		},
		data() {
			return {
				context: [],
				tableList: []
			};
		},
		created() {
			this.$api.collaborativeOffice.findIds({
				srcId: this.currentDatd,
			}).then((res) => {
				this.getContext(res)
				this.$api.collaborativeOffice.getShowApprovalCommentsMsg({
					foid: this.rowWAADataObj.selectData[0].foid,
					tempid: res.data.data[0].tempId,
//					tempid: "74150feb301a4862ae1ebdd8f10a30f2",
					module: "1",
					loadUser: localStorage.getItem("ms_userId")
				}).then((data) => {
					console.log(data)
					if(data.data.data != null && data.data.data != "null") {
						this.tableList = data.data.data
						this.tableList.forEach(item => {
							this.$set(item, 'list', [])
							if(item.commentsVoList == null || item.commentsVoList == "null") {
								this.$set(item, 'list', [])
							} else {
								if(item.commentsVoList.length > 3) {
									for(var i = 0; i < item.commentsVoList.length; i += 3) {
										item.list.push(item.commentsVoList.slice(i, i + 3));
									}
								} else {
									item.list.push(item.commentsVoList)
								}
							}
						})
					}
				})
			})
		},
		methods: {
			getSrcId() {
				return this.rowWAADataObj.fsrcoId
			},
			showSeeOrUpd1(row) {
				if((row.gestor == localStorage.getItem('ms_staffId') || typeof(row.gestor) == 'undefined') && this.showSeeOrUpd == 3) {
					return '3'
				} else {
					return '1'
				}
			},
			saveSWIDData(data) {
				this.$emit('changeShow', false);
			},
			async getContext(res) {
				for(var i = 0; i < res.data.data.length; i++) {
					await this.$api.collaborativeOffice.findDataBySrcId({
						srcId: res.data.data[i].idInProcess,
						tempId: res.data.data[i].tempId,
						tableName: res.data.data[i].tableName
					}).then(data => {
						return new Promise(resolve => {
							this.$api.collaborativeOffice.findlnfosList({
								voucherId: JSON.parse(data.data.data).id,
								userCode: localStorage.getItem('ms_userId'),
								//voucherId: this.rowWAADataObj.fsrcoId,
								//userCode: JSON.parse(data.data.data).id,
								menuCode: "workItem"
							}).then(val => {
								var a = JSON.parse(data.data.data)
								a.tempId = res.data.data[i].tempId;
								a.tableName = res.data.data[i].tableName;
								a.files = val.data.data;
								a.fsrcoId = this.rowWAADataObj.fsrcoId;
								this.context.push(a)
								resolve({})
							})
						});

					})
				}
			}
		},
	};
</script>

<style scoped="scoped">
	table,
	th,
	td {
		border: 1px solid skyblue
	}
	
	table {
		border-collapse: collapse;
	}
	.aaa tr {
		min-height: 500px;
	}
</style>