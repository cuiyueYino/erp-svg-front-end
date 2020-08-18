<template>
	<div v-if="isOa">
		<el-submenu v-if="menuItemData.subs" :index="typeof(menuItemData.url) == 'undefined' ? Math.random().toString() : menuItemData.url">
			<template slot="title">
				<i :class="menuItemData.pictureUrl"></i>
				<span>{{ menuItemData.name }}</span>
			</template>
			<el-auto-menu-item v-for="(menuChildrenItem,index) in menuItemData.subs" :key="index" :menuItemData="menuChildrenItem"></el-auto-menu-item>
		</el-submenu>
		<el-menu-item v-else :index="typeof(menuItemData.url) == 'undefined' ? Math.random().toString() : menuItemData.url">
			<i :class="menuItemData.pictureUrl"></i>
			<span slot="title">{{ menuItemData.name }}</span>
		</el-menu-item>
		
	</div>
	<div v-else>
		 <el-menu-item  :index="menuItemData.index">
			<!-- <i :class="menuItemData.icon"></i> -->
			<span slot="title">{{ menuItemData.title }}</span>
		</el-menu-item>
	</div>
</template>
<script>
	import ElAutoMenuItem from './el-auto-menu-item';

	export default {
		name: 'el-auto-menu-item',
		components: {
			ElAutoMenuItem
		},
		data() {
			return {};
		},
		props: {
			menuItemData: Object,
			isOa:Boolean
		}
	};
</script>
<style>
	.el-menu--collapse>div>.el-submenu>.el-submenu__title span {
		height: 0;
		width: 0;
		overflow: hidden;
		visibility: hidden;
		display: inline-block;
	}
	
	.el-menu--collapse>div>.el-submenu>.el-submenu__title .el-submenu__icon-arrow {
		display: none;
	}
</style>