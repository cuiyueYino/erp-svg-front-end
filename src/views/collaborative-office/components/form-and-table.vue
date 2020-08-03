<template>
	<div style="height: 85vh; overflow-y:scroll">
		<el-card>
			<formIcon :form-data="formData.top">
				<slot></slot>
			</formIcon>
		</el-card>
		<el-tabs type="border-card">
			<el-tab-pane :label="item.label" v-for="(item,index) in formData.bottom" :key="index">
				<formIcon v-if="item.type == 1" :form-data="item"></formIcon>
				<tableDynamic v-else :form-data="item"></tableDynamic>
			</el-tab-pane>
			<el-tab-pane label="附件"></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	//预览
	import formIcon from '../../../views/collaborative-office/components/encapsulation/form-dynamic';
	import tableDynamic from '../../../views/collaborative-office/components/encapsulation/table-dynamic';
	export default {
		components: {
			formIcon,
			tableDynamic
		},
		props: {
			//传入的data值
			formData: {
				type: Object,
				required: true
			},
		},
		data() {
			return {
				aa: "",
			};
		},
		created() {
			if(typeof(this.formData.bottom) != "undefined" && this.formData.bottom.length != 0) {
				this.formData.bottom.forEach(item => {
					if(item.type == 2) {
						item.conList = []
						item.rowList.forEach(val1 => {
							val1.colList.forEach(val2 => {
								item.conList.push(val2)
							})
						})
					}
					item.conList.sort((a1, b1) => {
						return a1.orderNum - b1.orderNum
					})
				})
				
			}
		},
		methods: {},

	}
</script>

<style scoped>

</style>