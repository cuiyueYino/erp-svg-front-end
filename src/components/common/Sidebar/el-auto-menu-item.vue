<template>
	<div v-if="!isOa">
		<el-submenu v-if="menuItemData.subs" :index="showUrl()">
			<template slot="title">
				<i :class="menuItemData.pictureUrl"></i>
				<span>{{ menuItemData.name }}</span>
			</template>
			<el-auto-menu-item v-for="(menuChildrenItem,index) in menuItemData.subs" :key="index" :menuItemData="menuChildrenItem"></el-auto-menu-item>
		</el-submenu>
		<el-menu-item @click="aaa(menuItemData)" v-else :index="showUrl()">
			<i :class="menuItemData.pictureUrl"></i>
			<span slot="title">{{ menuItemData.name }}</span>
		</el-menu-item>
	</div>
	<div v-else>
		<!--<el-menu-item @click="getContext(menuItemData.index)" :index="menuItemData.index">
			<span slot="title">{{ menuItemData.name }}</span>
		</el-menu-item>-->
		<el-submenu v-if="menuItemData.subs" :index="showUrl()">
			<template slot="title">
				<i :class="menuItemData.pictureUrl"></i>
				<span>{{ menuItemData.name }}</span>
			</template>
			<el-auto-menu-item v-for="(menuChildrenItem,index) in menuItemData.subs" :key="index" :menuItemData="menuChildrenItem" :isOa="a"></el-auto-menu-item>
		</el-submenu>
		<el-menu-item @click="getContext(menuItemData.index)" v-else :index="showUrl()">
			<i :class="menuItemData.pictureUrl"></i>
			<span slot="title">{{ menuItemData.name }}</span>
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
			return {
				a : true
			};
		},
		props: {
			menuItemData: Object,
			isOa: Boolean
		},
		methods: {
			getContext(aaa) {
				console.log(aaa)
				this.$router.push({
					name: aaa
				})
				//公司 部门 职位
				this.$api.management.selectAllOrganizationInfo().then(data => {
					localStorage.setItem('allOrganizationInfo', JSON.stringify(eval('(' + data.data.data + ')')));
				})
				//人员
				this.$api.collaborativeOffice.findConList("staffManage/findStaffByPage", {
					page: 1,
					size: 100000
				}).then(data => {
					localStorage.setItem('staffList', JSON.stringify(data.data.data.rows));
				})
			},
			aaa(aaa) {
				console.log(aaa)
				this.$router.push({
					name: aaa.url
				})
			},
			showUrl() {
				if(typeof(this.menuItemData.url) == 'undefined' || this.menuItemData.url == '') {
					return 'none' + Math.random().toString()
				} else {
					return this.menuItemData.url
				}
			}
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