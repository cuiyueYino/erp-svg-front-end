<template>
	<el-menu :default-active="nowUrl" :default-openeds="urlShow" class="sidebar-el-menu" :collapse="collapse" background-color="#fff" text-color="#000" active-text-color="#2d72c9" unique-opened router>
		<el-auto-menu-item v-for="(menuItem,index) in innerData" :key="index" :menu-item-data="menuItem" :isOa="isOa"></el-auto-menu-item>
	</el-menu>
</template>
<script>
	import ElAutoMenuItem from './el-auto-menu-item';
	import ITEM from './sidebar';
	export default {
		components: {
			ElAutoMenuItem,
		},
		props: {
			collapse: Boolean,
			navselected: String
		},
		data() {
			return {
				isOa: false,
				innerData: [],
				nowUrl: "",
				urlShow: ['A_Menu']
			};
		},
		created() {
			if(sessionStorage.getItem("oaMenu") == "true") {
				this.isOa = true
				this.innerData = new ITEM().ITEMoa;
			} else {
				this.innerData = JSON.parse(sessionStorage.getItem("menuList"));
			}
		},
		watch: {
			navselected(newVal, oldVal) {
				this.$nextTick(() => {
					this.nowUrl = newVal
				})
			}
		}
	}
</script>