<template>
	<div>
		<el-card>
			<formIcon :form-data="formData.top">
				<slot></slot>
			</formIcon>
		</el-card>
		<el-tabs type="border-card">
			<el-tab-pane :label="item.label" v-for="(item,index) in formData.bottom" :key="index">
				<formIcon :form-data="item">
				</formIcon>
			</el-tab-pane>
			<el-tab-pane label="附件"></el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	//预览
	import formIcon from '../../../views/collaborative-office/components/encapsulation/form-icon';

	export default {
		components: {
			formIcon
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
			console.log(this.formData.bottom)
		},
		methods: {},

	}
</script>

<style scoped>

</style>