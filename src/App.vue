<template>
    <div id="app" @contextmenu.prevent>
        <router-view v-if="isRouterAlive" />
    </div>
</template>

<script>
/**
* @description 工作流程设计器根节点
* @create 2019-04-11
* @author liyuanquan
*/
import Vue from 'vue';
export default {
    name: 'App',
    props: {},
    data () {
        return {
            eventBus: new Vue(),
            isRouterAlive: true
        };
    },
    provide: function () {
        return {
            bus: this.eventBus,
            reload: this.reload
        };
    },
    methods: {
        reload () {
            this.isRouterAlive = false;
            this.$nextTick(function () {
                this.isRouterAlive = true;
            });
        }
    },
    computed: {},
    watch: {},
    created () {}
};
</script>
<style>
@import './assets/css/main.scss';
@import './assets/css/color-dark.css';
/* @import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
/*el-table 选中行颜色*/
	.el-table__body tr.current-row>td {
		background-color: #409EFF !important;
	}
</style>
