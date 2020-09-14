<template>
        <!-- 条件面板显示 -->
    <div
        :style="styleObj"
        class="drag-node"
        :class="{'selected-node': selected, 'condition-node': !selected}"
        @click="clickNode"
        @dblclick="$emit('dblclick')"
        v-drag="initial"
        @mouseover="isHover = true"
        @mouseout="isHover = false"
    >
        <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polygon
                :points="pointStr"
                :style="{fill: color, 'stroke-width': 0, 'stroke': '#457CB5'}"
            />

            <foreignObject :x="localX" :y="localY" :width="width" :height="height">
                <body xmlns="http://www.w3.org/1999/xhtml" :style="{'text-align': 'center'}">
                    <ul class="condition-node__wrapper">
                        <!-- <li class="condition-node__text">
                            <span class="info-label condition-info__label">英文名：</span>
                            <span class="info-item condition-info__item">{{conditionData.data.name}}</span>
                        </li> -->
                        <li class="condition-node__text">
                            <!-- <span class="info-label condition-info__label">显示名：</span> -->
                            <span  class="info-item condition-info__item"><i :class="icon"></i>{{conditionData.data.displayName}}</span>
                        </li>
                    </ul>
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
            v-model="conditionData.visible"
        >
            <p>您确定删除[{{conditionData.data.displayName.substring(0,10)}}]吗？</p>
            <div style="text-align: center;">
                <el-button size="medium" type="success" @click="$emit('delete');conditionData.visible = false" icon="el-icon-check">确定</el-button>
                <el-button size="medium" type="warning" @click="conditionData.visible = false" icon='el-icon-close'>取消</el-button>
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
* @description 条件节点组件
* @create 2019-04-11
* @author liyuanquan
*/
// 拖拽指令
import drag from 'directives/draggable';
export default {
    name: 'ConditionNode',
    props: {
        // 节点配置颜色
        color: {
            type: String,
            default: '#409EFF'
        },
        // 节点配置数据据
        data: {
            type: Object,
            default: () => {
                return {
                    name: 'Condition',
                    displayName: '新建条件'
                };
            }
        },
        // 节点是否可拖拽配置
        drag: {
            type: Boolean,
            default: true
        },
         // 图标icon
        icon: {
            type: String,
            default: ''
        },
        // 节点高度配置
        height: {
            type: Number,
            default: 66
        },
        // 节点选中标识
        selected: {
            type: Boolean,
            default: false
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
        },
        // 节点宽度
        width: {
            type: Number,
            default: 66
        }
    },
    components: {},
    directives: { drag },
    data () {
        return {
            // 节点配置数据
            conditionData: this.data,
            // 节点拖拽标识
            dragFlag: false,
            // 节点初始化数据
            initial: {
                x: this.x,
                y: this.y,
                draggable: this.drag
            },
            // 鼠标经过节点标识
            isHover: false,
            // 连接锚点数据对象
            linkAnchor: [
                { x: this.width / 2, y: 0, point: 'T' },
                { x: this.width, y: this.height / 2, point: 'R' },
                // { x: this.width / 2, y: this.height, point: 'B' },
                { x: 0, y: this.height / 2, point: 'L' }
            ],
            // svg外接元素相对横坐标
            localX: 0,
            // svg外接元素相对纵坐标
            localY: 0,
            // 节点样式对象
            styleObj: {
                width: `${this.width}px`,
                height: `${this.height}px`,
                position: 'absolute',
                left: `${this.x}px`,
                top: `${this.y}px`,
                cursor: 'move'
            }
        };
    },
    computed: {
        // 计算连接锚点坐标
        pointStr () {
            const L = `${this.localX},${this.localY + this.height / 2}`;
            const T = `${this.localX + this.width / 2},${this.localY}`;
            const R = `${this.localX + this.width},${this.localY + this.height / 2}`;
            const B = `${this.localX + this.width / 2},${this.localY + this.height}`;
            return `${L} ${T} ${R} ${B}`;
        }
    },
    watch: {
        // 监听配置数据变化
        data: {
            handler (obj) {
                this.conditionData = obj;
            },
            deep: true,
            immediate: true
        },
        // 监听初始数据变化
        initial: {
            handler (obj) {
                this.$emit('dragmove', obj.x, obj.y);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 点击节点 提交点击事件
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
i{
        font-size: 20px;
}
.condition-style {
    display: inline-block;
    width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.condition-node__wrapper {
    list-style: none;
    padding-left: 0;
    text-align: center;
    padding-top: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    .condition-info__item {
        display: flex;
        justify-content: center;
        align-items: center;
        @extend .condition-style
    }
    .condition-node__text {
        height: 22;
        line-height: 23px;
    }
    .condition-info__label {
        @extend .condition-style
    }
}
.condition-node {
    .edit-btn {
        @include btns(37px, 32px, 0, -2);
    }
    .delete-btn {
        @include btns(37px, 32px, 0, -2);
    }
}
.selected-node {
    .edit-btn {
        @include btns(37px, 3px, 1, 25);
    }
    .delete-btn {
        @include btns(5px, 23px, 1, 25);
    }
}
</style>
