<template>
	<div>
		<el-form ref="ruleForm" class="demo-ruleForm" :model="form" :label-width="formData.labelWidth" :inline="formData.inline" :rules="formData.rules" :size="formData.size" :label-position="formData.labelPosition">
			<el-row v-for="(val, index) in formData.rowList" :key="index">
				<el-col v-for="(item,indexOther) in val.colList" :key="indexOther" :span="item.lengthType * 8">
					<el-form-item :label="item.fieldName" :prop="item.field" v-if="item.show">
						<!-- 文本框 -->
						<el-input v-if="item.fieldType == 'text'" v-model="form[item.field]" :disabled="!item.edit" />
						<!-- 下拉框 -->
						<el-select style="width: 100%;" v-if="item.fieldType =='select'" v-model="form[item.field]" :multiple="item.choice" clearable :disabled="!item.edit" :placeholder="item.placeholder">
							<el-option v-for="itemSelect in item.options" :key="itemSelect.id" :label="itemSelect.label" :value="itemSelect.id" :disabled="itemSelect.isDisabled" />
						</el-select>
						<!-- 日期选择器 -->
						<!--<el-date-picker v-if="item.fieldType =='date'" :disabled="!item.edit" v-model="form[item.field]" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />-->
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('ruleForm')">
					保存
				</el-button>
				<el-button @click="resetForm('ruleForm')">
					重置
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		props: {
			formData: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				form: {}
			};
		},
		created() {
			this.bindValue();
		},
		methods: {
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						console.log(this.form);
						alert('发送请求去');
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			bindValue() {
				const obj = {};
				this.formData.rowList.forEach((item, index) => {
					item.colList.forEach(val => {
						obj[val.field] = val.value;
					})
					// 这里不能写成this.form = obj  因为传递的不是值，而是引用，他们指向了同一个空间！
				});
				this.form = { ...obj
				};
			}
		}
	};
</script>

<style scoped>

</style>