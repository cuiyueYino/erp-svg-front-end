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
				</el-form-item>
			</el-form>
		</el-card>
		<!--弹出框-->
		<el-dialog :title="titleShow" top="1vh" destroy-on-close center :visible.sync="dialogVisible" width="80%">
			<formIconComponents ref="child" :showFig="showCon" :dataCon="dataCon"></formIconComponents>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="getDialogVisible">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import formIconComponents from '../../../../views/collaborative-office/components/encapsulation/sub-components/form-icon-components';
	import { quillEditor } from 'vue-quill-editor'; //调用编辑器
	import 'quill/dist/quill.snow.css';
	import * as Quill from 'quill';
	export default {
		components: {
			quillEditor,
			formIconComponents
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
				//弹出框表头
				titleShow: "",
				//传入类型
				showCon: "",
				//传入值
				dataCon: {},
				//弹出框
				dialogVisible: false,
				//中间变量
				dialogVisibleCon: {},
				//富文本基础数据
				editorOption: this.$GLOBAL.editorOption,
			};
		},
		created() {},
		methods: {
			//弹出框确定
			getDialogVisible() {
				this.dialogVisibleCon[this.dialogVisibleCon.field] = this.$refs.child.backCon.value
				this.dialogVisibleCon[this.dialogVisibleCon.field + 'Name'] = this.$refs.child.backCon.label
				this.dialogVisible = false
			},
			//弹出框打开
			findDialogVisible(row) {
				this.dialogVisibleCon = row
				this.dialogVisible = true
				switch(row.toSelect.id) {
					case "1":
						this.showCon = "organization"
						this.titleShow = "公司"
						this.$set(this.dataCon, "context", row.browseBoxList)
						break;
					case "2":
						this.showCon = "organization"
						this.titleShow = "部门"
						this.$set(this.dataCon, "context", row.browseBoxList)
						break;
					case "3":
						this.showCon = "organization"
						this.titleShow = "职位"
						this.$set(this.dataCon, "context", row.browseBoxList)
						break;
					case "4":
						this.showCon = "personnel"
						this.titleShow = "人员"
						this.$api.collaborativeOffice.findConList("staffManage/findStaffByPage", {
							page: 1,
							size: 10
						}).then(data => {
							this.$set(this.dataCon, "context", data.data.data.rows)
							this.$set(this.dataCon, "currentTotal", data.data.data.total)
						})
						break;
					case "5":
						this.showCon = "user"
						this.titleShow = "用户"
						this.$api.collaborativeOffice.findConList("userManage/findUserBypage", {
							page: 1,
							size: 10
						}).then(data => {
							console.log(data)
							this.$set(this.dataCon, "context", data.data.data.rows)
							this.$set(this.dataCon, "currentTotal", data.data.data.total)
						})
						break;
					case "6":
						this.showCon = "jobSet"
						this.titleShow = "职务"
						this.$api.collaborativeOffice.findConList("positionmnt/findPositionList", {
							page: 1,
							size: 10
						}).then(data => {
							console.log(data)
							this.$set(this.dataCon, "context", data.data.data.rows)
							this.$set(this.dataCon, "currentTotal", data.data.data.total)
						})
						break;
					case "7":
						return "dateControl"
						break;

				}

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