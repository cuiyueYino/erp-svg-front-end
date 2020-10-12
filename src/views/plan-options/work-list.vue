<template>
	<div>
		<WorkItemPage ref="childOtherChild" @getSrcId="getSrcId" v-for="(item,key) in context" :key="key" style="display: block;" @changeShow="saveSWIDData" :showChild="key == 0 ? '1' : '2'" :context="item" :showSeeOrUpd="showSeeOrUpd1(item)" :todoFlag="todoFlag"></WorkItemPage>
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
				context : []
			};
		},
		created() {
			this.$api.collaborativeOffice.findIds({
				srcId: this.currentDatd,
			}).then((res) => {
				this.getContext(res)
			})
		},
		methods: {
			getSrcId(){
				return this.rowWAADataObj.fsrcoId
			},
			showSeeOrUpd1(row){
				if((row.gestor == localStorage.getItem('ms_staffId') || typeof(row.gestor) == 'undefined') && this.showSeeOrUpd == 3){
					return '3'
				}else{
					return '1'
				}
			},
			saveSWIDData(data){
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
								a.fsrcoId=this.rowWAADataObj.fsrcoId;
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

<style>

</style>