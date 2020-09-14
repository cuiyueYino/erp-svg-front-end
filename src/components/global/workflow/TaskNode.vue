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
            <!-- <rect
                x="0"
                y="0"
                rx="10"
                ry="10"
                width="100%"
                height="100%"
                :style="{'fill': '#409EFF', 'stroke-width': 0, 'stroke': '#457CB5'}"
            >
            </rect> -->
            <svg t="1589009074209" class="icon" viewBox="0 0 1024 1024" 
            version="1.1" xmlns="http://www.w3.org/2000/svg" 
            p-id="4125" :fill="color" width="100%" height="100%">
            <path d="M512 0c-282.304 0-512 229.696-512 512 0 282.368 229.696 512 512 512s512-229.696 512-512c0-282.304-229.632-512-512-512zM218.752 220.032c6.848-6.848 16-10.688 25.728-10.688s18.88 3.776 25.792 10.688l90.112 90.176 1.728-1.728c8.896-9.024 22.848-12.8 35.264-9.408 12.48 3.264 22.336 13.184 25.664 25.792l20.096 75.008c3.392 12.608-0.256 26.112-9.408 35.264-9.024 9.024-22.848 12.8-35.264 9.408l-68.032-18.24c-9.536-0.64-17.728-4.288-24-10.56-14.272-14.272-14.272-37.376 0-51.648l2.432-2.368-90.112-90.048c-14.272-14.208-14.272-37.44 0-51.648zM436.16 642.944l-90.048 90.112 1.6 1.6c9.152 9.152 12.8 22.592 9.472 35.136-3.52 12.736-13.376 22.656-25.856 25.856l-75.136 20.096c-3.008 0.896-6.208 1.28-9.408 1.28-9.664 0-18.816-3.84-25.728-10.752-9.216-9.024-12.864-22.528-9.408-35.2l18.176-67.776c0.384-9.152 4.16-17.856 10.688-24.384 13.824-13.76 37.888-13.696 51.648 0.064l2.304 2.368 90.176-89.984c13.76-13.824 37.824-13.76 51.584 0 14.208 14.208 14.208 37.376-0.064 51.584zM805.312 807.104c-13.568 13.696-37.568 13.952-51.584-0.128l-89.984-89.92-1.664 1.664c-15.232 15.104-38.528 14.592-52.288 0.768-6.528-6.592-10.24-15.296-10.688-24.32l-18.24-67.904c-3.392-12.544 0.256-26.048 9.472-35.264 6.848-6.848 16-10.688 25.728-10.688 3.264 0 6.528 0.448 9.6 1.344l74.944 20.096c12.608 3.328 22.528 13.184 25.792 25.728 3.456 12.352-0.192 25.856-9.344 35.2l-1.728 1.664 90.048 90.048c6.912 6.848 10.752 16.064 10.752 25.856-0.064 9.856-3.904 19.008-10.816 25.856zM817.536 255.36l-20.032 75.008c-3.456 12.672-13.312 22.528-25.792 25.792-12.096 3.2-26.176-0.384-35.264-9.472l-1.6-1.664-90.112 90.112c-6.976 6.848-16.128 10.624-25.856 10.624-9.664 0-18.816-3.776-25.728-10.624-14.208-14.272-14.208-37.376-0.128-51.584l90.176-90.112-1.664-1.664c-7.68-7.616-11.456-16.768-11.456-26.496 0-9.792 3.84-18.944 10.816-25.856 6.656-6.72 16.128-10.688 25.792-10.688l66.24-18.176c12.352-3.328 26.112 0.32 35.264 9.472 9.216 9.152 12.8 22.72 9.344 35.328z" p-id="4126" ></path></svg>
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
                        <!-- <el-form-item label="英文名">
                            <span class="info-item">{{taskData.data.name}}</span>
                        </el-form-item> -->
                        <!-- <el-form-item label="显示名称"> -->
                            <!-- <span class="info-item"><i class="el-icon-setting"></i>{{taskData.data.displayName}}</span> -->
                        <!-- </el-form-item> -->
                        <!-- <el-form-item label="参与类型">
                            <span class="info-item">{{taskData.data.performType === 'ALL' ? '会签参与' : '普通参与'}}</span>
                        </el-form-item> -->
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
            <h4>您确定删除[{{taskData.data.displayName.substring(0,10)}}]吗？</h4>
            <div style="text-align: center;">
                <el-button size="medium" type="success" @click="$emit('delete');taskData.visible = false" icon="el-icon-check">确定</el-button>
                <el-button size="medium" type="warning" @click="taskData.visible = false" icon="el-icon-close">取消</el-button>
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
          // 节点颜色配置
        color: {
            type: String,
            default: '#67C23A'
        },
        // 节点可拖拽配置
        drag: {
            type: Boolean,
            default: true
        },
        // 节点高度配置
        height: {
            type: Number,
            default: 100
        },
        // 节点选中标识
        selected: {
            type: Boolean,
            default: false
        },
        // 节点宽度
        width: {
            type: Number,
            default: 100
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
                // { x: this.width / 2, y: this.height, point: 'B' },
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
            handler (obj) {console.log(obj)
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
.node-form__item{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
        background-color: #42a1f9;
    }
}
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
