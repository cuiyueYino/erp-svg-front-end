<template>
 <!-- 开始&结束面板显示 -->
    <div
        :style="styleObj"
        class="drag-node"
        :class="{'selected-node': selected, 'terminal-node': !selected}"
        @click="$emit('click-node')"
        @mouseover="isHover = true"
        @mouseout="isHover = false"
        v-drag.circle="initial" 
    >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1"> 
            <circle
                :cx="this.width / 2"
                :cy="this.height / 2"
                :r="width / 2"
                :fill="color"
                stroke="#457CB5"
                stroke-width="0"
            >
            </circle>
            <foreignObject x="0" y="0" :width="width" :height="height">
                <body xmlns="http://www.w3.org/1999/xhtml" :style="{'line-height': `${width}px`, 'text-align': 'center'}">
                    <h3 style="margin: 0;color: #fff;font-size:16px">{{nodeText}}</h3>
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
        <!--  -->
        <link-anchor
            v-for="(link, index) in linkAnchor"
            :key="index"
            :class="{'is-hover': isHover, 'is-over': !isHover}"
            @mousedown.native.stop="handleMousedown(link)"
            @mouseenter.native.stop="handleMouseenter(link)"
            @mousemove.native="$emit('mousemove')"
            @mouseup.native="$emit('mouseup')"
            :x="link.x"
            :y="link.y"
        />
    </div>
</template>

<script>
/**
* @description 终点节点
* @create 2019-04-11
* @author liyuanquan
*/
// 导入拖拽指令
import drag from 'directives/draggable';
export default {
    name: 'TerminalNode',
    props: {
        // 节点是否允许连入
        allowIn: {
            type: Boolean,
            default: false
        },
        // 节点是否允许连出
        allowOut: {
            type: Boolean,
            default: false
        },
        // 节点颜色配置
        color: {
            type: String,
            default: '#67C23A'
        },
        // 可拖拽配置
        drag: {
            type: Boolean,
            default: true
        },
        // 节点文本配置
        nodeText: {
            type: String,
            default: 'Start'
        },
        // 节点高度
        height: {
            type: Number,
            default: 55
        },
        // 节点选中标识
        selected: {
            type: Boolean,
            default: false
        },
        // 节点宽度
        width: {
            type: Number,
            default: 55
        },
        // 节点横坐标
        x: {
            type: Number,
            default: 50
        },
        // 节点纵坐标
        y: {
            type: Number,
            default: 50
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
            // 鼠标经过节点标识
            isHover: false,
            // 连接锚点数据配置
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
            }
        };
    },
    computed: {},
    watch: {
        // 节点初始化数据
        initial: {
            handler (obj) {
                this.$emit('dragmove', obj.x, obj.y);
                // console.log(obj.x, obj.y)
            },
            deep: true,
            immediate: true
        },
        // 节点横坐标
        x (val) {
            this.$set(this.initial, 'x', val);
            this.$set(this.styleObj, 'left', `${val}px`);
        },
        // 节点纵坐标
        y (val) {
            this.$set(this.initial, 'y', val);
            this.$set(this.styleObj, 'top', `${val}px`);
        }
    },
    created () {},
    methods: {
        // 若禁止连出 则不向父组件提交鼠标进入事件
        handleMouseenter (link) {
            if (!this.allowIn) return;
            this.$emit('mouseenter', link.point, [link.x, link.y]);
        },
        // 若禁止连入 则不向父组件提交鼠标按下事件
        handleMousedown (link) {
            if (!this.allowOut) return;
            this.$emit('mousedown', link.point, [link.x, link.y]);
        }
    }
};
</script>

<style lang="scss" scoped>
.terminal-node {
    .edit-btn {
        @include btns(10px, 5px, 0, -2);
    }
}
.selected-node {
    .edit-btn {
        @include btns(7px, -6px, 1, 25);
    }
}
</style>
