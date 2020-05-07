<template>
 <!-- 任务面板显示 -->
    <div
        :style="styleObj"
        v-drag="initial"
        class="drag-node"
        :class="{'selected-node': selected, 'task-node': !selected}"
        @click="clickNode"
        @dblclick="$emit('dblclick')"
        @mouseover="isHover = true"
        @mouseout="isHover = false"
    >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <rect
                x="0"
                y="0"
                rx="10"
                ry="10"
                width="100%"
                height="100%"
                :style="{'fill': '#409EFF', 'stroke-width': 0, 'stroke': '#457CB5'}"
            >
            </rect>
            <foreignObject x="0" y="0" :width="width" :height="height">
                <body xmlns="http://www.w3.org/1999/xhtml">
                    <el-form
                        class="node-form__item"
                        :model="data"
                        label-width="90px"
                        label-suffix="："
                        label-position="right"
                        size="small"
                    >
                        <el-form-item label="英文名">
                            <span class="info-item">{{taskData.data.name}}</span>
                        </el-form-item>
                        <el-form-item label="显示名称">
                            <span class="info-item">{{taskData.data.displayName}}</span>
                        </el-form-item>
                        <el-form-item label="参与类型">
                            <span class="info-item">{{taskData.data.performType === 'ALL' ? '会签参与' : '普通参与'}}</span>
                        </el-form-item>
                    </el-form>
                </body>
            </foreignObject>
        </svg>
        <el-button
            :class="{'edit-btn': true}"
            size="mini"
            circle
            @click="$emit('edit')"
            icon="el-icon-edit"
        >
        </el-button>
        <el-popover
            placement="top"
            v-model="taskData.visible"
        >
            <h4>您确定删除[{{taskData.data.displayName}}]吗？</h4>
            <div style="text-align: center;">
                <el-button size="mini" type="primary" @click="$emit('delete');taskData.visible = false">确定</el-button>
                <el-button size="mini" type="danger" @click="taskData.visible = false">取消</el-button>
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
        <!--  -->
        <link-anchor
            v-for="(link, index) in linkAnchor"
            :key="index"
            :class="{'is-hover': isHover, 'is-over': !isHover}"
            @mousedown.native.stop="$emit('mousedown', link.point, [link.x, link.y])"
            @mouseenter.native.stop="$emit('mouseenter', link.point, [link.x, link.y])"
            @mousemove.native="$emit('mousemove', link.x, link.y)"
            @mouseup.native="$emit('mouseup', link.x, link.y)"
            :x="link.x"
            :y="link.y"
        />
    </div>
</template>

<script>
/**
* @description 任务节点
* @create 2019-04-11
* @author liyuanquan
*/
// 导入拖拽指令
import drag from 'directives/draggable';
export default {
    name: 'TaskNode',
    props: {
        // 节点配置数据
        data: {
            type: Object,
            default: () => {
                return {};
            }
        },
        // 节点可拖拽配置
        drag: {
            type: Boolean,
            default: true
        },
        // 节点高度配置
        height: {
            type: Number,
            default: 110
        },
        // 节点选中标识
        selected: {
            type: Boolean,
            default: false
        },
        // 节点宽度
        width: {
            type: Number,
            default: 220
        },
        // 节点横坐标
        x: {
            type: Number,
            default: 0
        },
        // 节点纵坐标
        y: {
            type: Number,
            default: 0
        }
    },
    components: {},
    directives: { drag },
    data () {
        return {
            // 节点初始化数据
            initial: {
                x: this.x,
                y: this.y,
                draggable: this.drag
            },
            // 鼠标经过标识
            isHover: false,
            // 连接线锚点配置对象
            linkAnchor: [
                { x: this.width / 2, y: 0, point: 'T' },
                { x: this.width, y: this.height / 2, point: 'R' },
                { x: this.width / 2, y: this.height, point: 'B' },
                { x: 0, y: this.height / 2, point: 'L' }
            ],
            // 节点样式对象
            styleObj: {
                width: `${this.width}px`,
                height: `${this.height}px`,
                position: 'absolute',
                left: `${this.x}px`,
                top: `${this.y}px`,
                cursor: 'move'
            },
            // 节点配置数据
            taskData: this.data
        };
    },
    computed: {},
    watch: {
        // 监听task节点配置数据变化
        data: {
            handler (obj) {
                this.taskData = obj;
            },
            deep: true,
            immediate: true
        },
        // 监听task节点初始化数据变化
        initial: {
            handler (obj) {
                this.$emit('dragmove', obj.x, obj.y);
            },
            deep: true,
            immediate: true
        }
    },
    created () {},
    methods: {
        // 提交点击节点方法
        clickNode () {
            /* eslint-disable no-unused-vars */
            const params = {
                data: this.data
            };
            this.$emit('click-node');
        }
    }
};
</script>

<style lang="scss" scoped>
.task-node {
    .edit-btn {
        @include btns(10px, 5px, 0, -2);
    }
    .delete-btn {
        @include btns(10px, 10px, 0, -2);
    }
}
.selected-node {
    .edit-btn {
        @include btns(10px, -15px, 1, 25);
    }
    .delete-btn {
        @include btns(-15px, 10px, 1, 25);
    }
}
</style>
