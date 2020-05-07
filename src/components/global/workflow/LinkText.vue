<template>
 <!-- 连接线编辑&删除 -->
    <div>
        <div
            v-for="item in data"
            :key="item.key"
            :class="{'link-line-text': selectedNode !== item, 'link-line-selected': selectedNode === item}"
            @click="selectedNode = item"
            :style="{'left': `${item.left}px`, 'top': `${item.top}px`}"
        >
            {{item.data.displayName}}
            <el-button
                :class="{'edit-btn': true}"
                size="mini"
                circle
                @click="$emit('config', item)"
                icon="el-icon-edit"
            >
            </el-button>
            <el-popover
                placement="top"
                v-model="item.visible"
            >
                <p>您确定删除[{{item.data.displayName}}]吗？</p>
                <div style="text-align: center;">
                    <el-button size="mini" type="primary" @click="$emit('delete', item);item.visible = false">确定</el-button>
                    <el-button size="mini" type="danger" @click="item.visible = false">取消</el-button>
                </div>
                <el-button
                    :class="{'delete-btn': true}"
                    type="danger"
                    size="mini"
                    circle
                    slot="reference"
                    icon="el-icon-delete"
                >
                </el-button>
            </el-popover>
        </div>
    </div>
</template>

<script>
/**
* @description 连接线文本组件
* @create 2019-04-11
* @author liyuanquan
*/
export default {
    name: 'LinkText',
    props: {
        // 连接线数据
        data: {
            type: Array,
            default: () => {
                return [];
            }
        },
        // 选中连接对象
        selected: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    components: {},
    data () {
        return {
            // 当前选中连接线文本
            selectedNode: this.selected
        };
    },
    computed: {},
    watch: {
        // 监听选中连接线数据变化
        selected: {
            handler (obj) {
                this.selectedNode = obj;
            },
            deep: true,
            immediate: true
        },
        // 监听选中连接线数据变化 提交父组件变化数据及方法
        selectedNode: {
            handler (obj) {
                this.$emit('update:selected', obj);
            },
            deep: true,
            immediate: true
        }
    },
    created () {},
    methods: {}
};
</script>

<style lang="scss" scoped>
.link-line-text {
    .edit-btn {
        @include btns(20px, -10px, 0, -2);
    }
    .delete-btn {
        @include btns(20px, -10px, 0, -2);
    }
}
.link-line-selected {
    .edit-btn {
        @include btns(45px, -25px, 1, 25);
    }
    .delete-btn {
        @include btns(10px, -25px, 1, 25);
    }
}
</style>
