<template>
    <div class="sidebar">
        <ElAutoMenu :onRoutes="onRoutes" :collapse="collapse" />
    </div>
</template>
<script>
import ElAutoMenu from './el-auto-menu';
export default {
    inject: ['bus'],
    data() {
        return {
            collapse: false
        };
    },
    components: {
        ElAutoMenu
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        this.bus.$on('collapse', msg => {
            this.collapse = msg;
            this.bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
