<template>
	<div>
		<el-card>
			<formIcon :dis="dis" :showAdd="showAdd" :key="count" ref="mainTableChild" show="1" :form-data="formData.top">
				<slot></slot>
			</formIcon>
		</el-card>
		<el-tabs v-model="activeName" type="border-card">
			<el-tab-pane :label="item.showName" v-for="(item,index) in formData.bottom" :name="item.id" :key="index">
				<formIcon :dis="dis" :showAdd="showAdd" :key="count" ref="refCon" show="2" v-if="item.type == 1" :form-data="item"></formIcon>
				<tableDynamic :dis="dis" :key="count" ref="refCon" v-else :form-data="item"></tableDynamic>
			</el-tab-pane>
			<el-tab-pane name="wobuxinnengchongfu" label="附件">1</el-tab-pane>
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
			showAdd: {
				type: String,
				required: true
			},
			dis: {
				type: String,
				required: true
			}
		},
		data() {
			return {
				count: 0,
				conData: {}
			};
		},
		computed: {
			activeName: {
				get() {
					this.count++
						if(typeof(this.formData.bottom) != "undefined") {
							if(typeof(this.formData.bottom[0]) != "undefined") {
								return this.formData.bottom[0].id
							} else {
								return "wobuxinnengchongfu"
							}
						} else {
							return "wobuxinnengchongfu"
						}
				},
				set() {}
			}
		},
		created() {
		},
		methods: {
			onSubmit() {
				var state = true
				if(!this.$refs.mainTableChild.onSubmit()) {
					state = false
				}
				if(typeof(this.$refs.refCon) != "undefined") {
					this.$refs.refCon.forEach(item => {
						if(!item.onSubmit()) {
							state = false
						}
					})
				}
				if(state) {
					this.conData = this.$refs.mainTableChild.ruleForm
					if(typeof(this.$refs.refCon) != "undefined") {
						this.$refs.refCon.forEach(item => {
							if(item.formData.type == 1) {
								this.$set(this.conData, item.formData.id, [])
								this.conData[item.formData.id].push(item.ruleForm)
							} else {
								this.$set(this.conData, item.formData.id, item.ruleForm.lines)
							}
						})
					}
					return true
				}
			}
		},

	}
</script>

<style scoped>

</style>