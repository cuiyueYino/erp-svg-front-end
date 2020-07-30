<template>
	<div>
		<el-card>
			<slot></slot>
			<el-form ref="ruleForm" class="demo-ruleForm" :model="formData" :label-width="formData.labelWidth" :rules="rules" :inline="formData.inline" :size="formData.size" :label-position="formData.labelPosition">
				<el-row v-for="(val, index) in formData.rowList" :key="index">
					<el-col v-for="(item,indexOther) in val.colList" :key="indexOther" :span="item.lengthType * 8">
						<el-form-item v-if="item.fieldTypeName == 'browseBox' && item.show" :label="item.fieldName" :prop="item.field">
							<!-- 浏览框 -->
							<el-input style="width: 100%;" v-model="item[item.field+'Name']" disabled>
								<el-button @click="findDialogVisible(item)" slot="append" icon="el-icon-search"></el-button>
							</el-input>
						</el-form-item>
						<!-- 字符型 -->
						<el-form-item v-if="item.fieldTypeName == 'character' && item.show" :label="item.fieldName" :prop="item.field">
							<el-input style="width: 100%;" v-model="formData[item.field]" :disabled="!item.edit" />
						</el-form-item>
						<!-- 文本框 -->
						<el-form-item v-if="item.fieldTypeName == 'textType' && item.show" :label="item.fieldName" :prop="item.field">
							<el-input style="width: 100%;" v-model="formData[item.field]" :disabled="!item.edit" />
						</el-form-item>
						<!-- 整型 -->
						<el-form-item v-if="item.fieldTypeName == 'integers' && item.show" :label="item.fieldName" :prop="item.field">
							<el-input style="width: 100%;" v-model="formData[item.field]" :disabled="!item.edit" />
						</el-form-item>
						<!-- 浮点型 -->
						<el-form-item v-if="item.fieldTypeName == 'floatingPoint' && item.show" :label="item.fieldName" :prop="item.field">
							<el-input style="width: 100%;" v-model="formData[item.field]" :disabled="!item.edit" />
						</el-form-item>
						<!--富文本-->
						<el-form-item v-if="item.fieldTypeName == 'richText' && item.show" :label="item.fieldName" :prop="item.field">
							<quill-editor style="width: 100%;" v-model="formData[item.field]" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)"></quill-editor>
						</el-form-item>
						<!-- 日期选择器 -->
						<el-form-item v-if="item.fieldTypeName == 'dateControl' && item.show" :label="item.fieldName" :prop="item.field">
							<el-date-picker style="width: 100%;" :disabled="!item.edit" v-model="formData[item.field]" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
						</el-form-item>
						<!--时间控件-->
						<el-form-item v-if="item.fieldTypeName == 'timeControl' && item.show" :label="item.fieldName" :prop="item.field">
							<el-time-picker style="width: 100%;" v-model="formData[item.field]"></el-time-picker>
						</el-form-item>
						<!-- 下拉框 -->
						<el-form-item v-if="item.fieldTypeName == 'select' && item.show" :label="item.fieldName" :prop="item.field">
							<el-select style="width: 100%;" v-model="formData[item.field]" :multiple="item.choice" clearable :disabled="!item.edit" :placeholder="item.placeholder">
								<el-option v-for="itemSelect in item.resList" :key="itemSelect.id" :label="itemSelect.name" :value="itemSelect.id" />
							</el-select>
						</el-form-item>
						<!--复选框-->
						<el-form-item v-if="item.fieldTypeName == 'checkBox' && item.show" :label="item.fieldName" :prop="item.field">
							<el-checkbox-group style="width: 100%;" v-model="formData[item.field]">
								<el-checkbox label="复选框 A"></el-checkbox>
							</el-checkbox-group>
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
		</el-card>
		<!--弹出框-->
		<el-dialog title="公司/部门/职位信息" :destroy-on-close="true" center :visible.sync="dialogVisible" width="60%">
			<div class="treeDivClass">
				<el-tree @check-change="handleClick" show-checkbox ref="treeDialogVisible" highlight-current :data="treeData" :props="defaultProps" node-key="foid" accordion></el-tree>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="getDialogVisible">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { quillEditor } from 'vue-quill-editor'; //调用编辑器
	import 'quill/dist/quill.snow.css';
	import * as Quill from 'quill';
	export default {
		components: {
			quillEditor
		},
		props: {
			formData: {
				type: Object,
				required: true
			},
			rules: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				//				form: {},
				dialogVisible: false,
				dialogVisibleCon: {},
				treeData: [],
				defaultProps: {
					children: 'children',
					label: 'fname'
				},
				dataList: [],
				editorOption: this.$GLOBAL.editorOption,
				checkedId: "",
				count: 0
			};
		},
		created() {
			//			this.bindValue();
			console.log(this.formData)
		},
		methods: {
			//单选
			handleClick(data, checked, node) {
				if(checked) {
					this.$refs.treeDialogVisible.setCheckedNodes([data]);
				}
			},
			getDialogVisible() {
				var con = this.$refs.treeDialogVisible.getCheckedNodes(true)
				if(con.length > 1) {
					this.goOut("请单选")
				} else {
					this.dialogVisibleCon[this.dialogVisibleCon.field] = con[0].foid
					this.dialogVisibleCon[this.dialogVisibleCon.field + 'Name'] = con[0].fname
					this.dialogVisible = false
				}
			},
			findDialogVisible(row) {
				this.dialogVisibleCon = row
				this.treeData = row.browseBoxList
				this.dialogVisible = true
				this.count = 0
			},
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						console.log(this.form);
						alert('发送请求去 ');
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			bindValue() {
				//				const obj = {};
				//				this.formData.rowList.forEach((item, index) => {
				//					item.colList.forEach(val => {
				//						obj[val.field] = val.value;
				//					})
				//					// 这里不能写成this.form = obj  因为传递的不是值，而是引用，他们指向了同一个空间！
				//				});
				//				this.form = { ...obj
				//				};
			},
			// 选中背景色
			tableRowClassName({
				row,
				rowIndex
			}) {
				var color = ""
				if(row.foid == this.tServiceByParamsCon.foid) {
					color = "warning-row"
				}
				return color;
			},
			//选中行
			clickRow(row) {
				console.log(row)
				this.tServiceByParamsCon = row
			},
			onEditorBlur() {}, // 失去焦点事件
			onEditorFocus(event) {
				if(this.formDisabled == true) {
					event.enable(false);
				} else {
					event.enable(true);
				}
			}, // 获得焦点事件
			onEditorChange() {}, // 内容改变事件
		}
	};
</script>

<style scoped>
	.treeDivClass {
		height: 300px;
		overflow: auto;
	}
</style>