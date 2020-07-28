<!--      
分页组件--孟鹏飞       

传入参数:
total -- 总页数

 使用方式:
	 
	<pageNation :total="currentTotal" @pageChange="pageChangeLeft"></pageNation>
	JS:
	currentPage: 1,
	currentTotal: 10,
	
	pageChangeLeft(pageIndex) {
		this.currentPage = pageIndex;
	},
-->

<template>
	<div style="float: right;">
		<el-pagination class="pagination" background @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" layout="prev, pager, next, jumper,total" :total="total">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		props: {
			total: {
				type: Number
			}
		},
		data() {
			return {
				pageIndex: 1,
				pageSize: 10
			};
		},
		methods: {
			// 当前页码变化
			handleCurrentChange(val) {
				this.pageIndex = val;
				this.$emit('pageChange', this.pageIndex);
			},
			//从新搜索 刷新至第一页
			toBegin() {
				this.pageIndex = 1;
				this.$emit('pageChange', this.pageIndex);
			}
		},

	}
</script>

<style scoped>

</style>