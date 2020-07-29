<template>
	<div>
		<el-row>
			<el-col style="text-align: right;">
				<el-dropdown>
					<el-button type="success" plain><i class="el-icon-plus"></i>新建</el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>类别</el-dropdown-item>
						<el-dropdown-item>内容</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<el-button type="danger" plain><i class="el-icon-edit"></i>修改</el-button>
			</el-col>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="6">
				<el-card>
					<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
				</el-card>
			</el-col>
			<el-col :span="18">
				<el-card>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				data: [{
					label: '一级 1',
					children: [{
						label: '二级 1-1',
						children: [{
							label: '三级 1-1-1'
						}]
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			};
		},
		computed: {},
		mounted() {},
		methods: {
			handleNodeClick(data) {
				console.log(data);
			}
		}
	}
</script>
<style scoped="scoped">
	.el-card {
		height: 80vh;
	}
	
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>