<!--
	el-dialog 弹出框组件
	孟鹏飞-2020-08-31
	
	传值:
	title          标题                     String 
	dialogShow     是否显示              boolean
	erpDialogwidth 宽度                     String         'true' = 80%     其他 = 50%
	
	使用例子(直接在父组件内使用,无需引用):
	<erpDialog erpDialogwidth="true" :title="choseDepart" :dialogShow="userVisible">
		这是内容
		<el-tree class="filter-tree" :data="treeData" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick"></el-tree>
		这是按钮 按钮外层Div固定
		<div slot="footer">
			按钮内容自定义
			<el-button @click="userVisible = false">取 消</el-button>
			<el-button type="primary" @click="addDepart()">确 定</el-button>
		</div>
	</erpDialog>
-->

<template>
	<el-dialog :title="title" :show-close="showClose" destroy-on-close center :visible.sync="show" :width="erpDialogwidth == 'true' ? '80%' : '50%'">
		<slot></slot>
		<div slot="footer" style="text-align: center;">
			<slot name="footer"></slot>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				showClose: false
			};
		},
		props: {
			title: String,
			dialogShow: Boolean,
			erpDialogwidth: String
		},
		computed: {
			show: {
				get() {
					return this.dialogShow
				},
				set() {}
			}
		},
		methods: {}
	};
</script>

<style>
	.el-dialog {
		position: relative;
		margin: 0 auto 0px;
		background: #FFFFFF;
		border-radius: 2px;
		-webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 50%;
		height: 70%;
	}
	
	.el-dialog__body {
		border-top: 1px solid #dcdfe6;
		border-bottom: 1px solid #dcdfe6;
		max-height: 70% !important;
		overflow-y: auto!important;
		min-height: calc(100vh - 475px)!important;
		padding: 10px 20px!important;
	}
	
	.el-dialog__footer {
		padding: 20px!important
	}
</style>