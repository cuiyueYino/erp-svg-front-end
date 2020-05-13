<template>
    <div
        class="svgBox"
        @click="backgroundClick($event)"
        @dragover.prevent
    >
        <!-- 操作面板 -->
        <div :style="styleObj">
            <el-card
                style="width: 260px;"
                class="work-flow-operate-panel"
                :body-style="{padding: '4px'}"
            >
                <div
                    slot="header"
                    style="text-align: right;"
                    class="work-flow-operate-header"
                    @mousedown="dragPanel($event)"
                >
                    <!-- 操作按钮 -->
                    <el-button
                        type="text"
                        size="mini"
                        icon="el-icon-download"
                        @click="compileXMLToObj(dataObj)"
                    >
                        加载
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        :disabled="saveBtnStatus"
                        icon="el-icon-upload"
                        @click="saveWorkflow(workflowNodes)"
                    >
                        保存
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        :disabled="workflowNodes.filter(item => Object.keys(item).length > 0).length === 2"
                        icon="el-icon-plus-cleanup"
                        @click="cleanUp"
                    >
                        清空
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                       icon="el-icon-zoom-in"
                        @click="bigger"
                    >
                        放大
                    </el-button>
                    <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-zoom-out"
                        @click="smaller"
                    >
                        缩小
                    </el-button>
                </div>
                <!-- 节点面板 -->
                <ul class="select-nodes">
                    <li
                        v-for="(item, index) in nodes"
                        :key="index"
                        class="workflow-nodes"
                        draggable
                        @dragstart="dragStartEvent($event)"
                        @dragend="handlerDragEnd($event, item)"
                    >
                        <a class="workflow-nodes">
                            <i :class="item.icon"></i>
                            <span>{{item.name}}</span>
                        </a>
                    </li>
                </ul>
            </el-card>
        </div>
        <!-- 画图区域 -->
        <template v-for="(node, index) in workflowNodes">
            <!-- 端点节点 -->
            <terminal-node
                :key="index"
                v-if="node.type === 'Start' || node.type === 'End'"
                :allowIn="node.options.allowIn"
                :allowOut="node.options.allowOut"
                :node-text="node.data.displayName"
                :selected="selectedNode === node"
                :x="node.options.x"
                :y="node.options.y"
                :color="node.options.color"
                :drag="node.options.draggable"
                @click-node="clickNode(node)"
                @mousedown="(target, point) => handleMousedown(target, point, node)"
                @mouseenter="(target, point) => handleMouseEnter(target, point, node)"
                @dragmove="(left, top) => {node.options.x = left;node.options.y = top;}"
                @edit="dialogVisible = true;saveFlag = 'node'"
            >
            </terminal-node>
            <!-- 任务节点 -->
            <task-node
                :key="index"
                v-else-if="node.type === 'Task'"
                :width="node.options.width"
                :height="node.options.height"
                :data="node"
                :color="node.options.color"
                :selected="selectedNode === node"
                :x="node.options.x"
                :y="node.options.y"
                :drag="node.options.draggable"
                @click-node="clickNode(node)"
                @edit="dialogVisible = true;saveFlag = 'node'"
                @delete="deleteNode(index)"
                @dragmove="(left, top) => {node.options.x = left;node.options.y = top;}"
                @mousedown="(target, point) => handleMousedown(target, point, node)"
                @mouseenter="(target, point) => handleMouseEnter(target, point, node)"
            >
            </task-node>
            <!-- 条件节点 -->
            <condition-node
                :key="index"
                v-else-if="node.type === 'Condition' || node.type === 'Fork' || node.type === 'Join' "
                 :icon="node.type === 'Condition'?'el-icon-user':node.type === 'Fork'?'el-icon-plus-supply-chain':
                 node.type === 'Join'?'el-icon-plus-param': ''"
                :width="node.options.width"
                :height="node.options.height"
                :color="node.options.color"
                :selected="selectedNode === node"
                :x="node.options.x"
                :y="node.options.y"
                :data="node"
                :drag="node.options.draggable"
                @click-node="clickNode(node)"
                @edit="dialogVisible = true;saveFlag = 'node'"
                @delete="deleteNode(index)"
                @dragmove="(left, top) => {node.options.x = left;node.options.y = top;}"
                @mousedown="(target, point) => handleMousedown(target, point, node)"
                @mouseenter="(target, point) => handleMouseEnter(target, point, node)"
            >
            </condition-node>
        </template>
        <!-- 连线区域 -->
        <svg class="workflow-draw-panel" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <marker
                    id='arrow_end_active'
                    refX='0'
                    refY='0'
                    markerWidth='10'
                    markerHeight='10'
                    orient='auto'
                    viewBox='0, -4, 12, 12'
                >
                    <path d='M0 -4 L0 4 L10 0' style='fill: #409EFF' stroke-width='0'></path>
                </marker>
                <marker
                    id='arrow_end'
                    refX='0'
                    refY='0'
                    markerWidth='10'
                    markerHeight='10'
                    orient='auto'
                    viewBox='0, -4, 12, 12'
                >
                    <path d='M0 -4 L0 4 L10 0' style='fill: #606266' stroke-width='0'></path>
                </marker>
            </defs>
            <!-- 辅助连接线 -->
            <polyline
                :points='assistedLine'
                style='fill: none;stroke: #409EFF;stroke-width: 2'
                marker-end='url(#arrow_end_active)'
            />
            <!-- 节点连接线 -->
            <polyline
                v-for="(line, pos) in lineData"
                :key="pos"
                :points="line.coordinate"
                style='fill: none;stroke: #606266;stroke-width: 2'
                marker-end='url(#arrow_end)'
            />
        </svg>
        <!-- 连接线文字 -->
        <link-text
            :data="lineData"
            :selected.sync="selectedNode"
            @config="linkLineConfig"
            @delete="linkLineDelete"
        >
        </link-text>
        <!-- 配置节点表单 -->
        <config-form
            :visible.sync="dialogVisible"
            :type="nodeType"
            :data="selectedNode.data"
            @save="handleSaveEvent"
            @cancel="selectedNode = {}"
        >
        </config-form>
    </div>
</template>

<script>
/**
* @description: 工作流程设计器首页
* @create: 2019-04-11
* @author: liyuanquan
*/
// 混入实例对象
import workflowMixin from './workflow-mixin';
// 工作流数据配置
import { NodesData, TerminalNode } from './flow-config';
// 配置工作流组件
import configForm from './node-config';
//json假数据
import dataJson from './111.json';
// 解析 xml 字符模板
import xmlStr from 'helpers/compile-xml';
export default {
    name: 'WorkFlow',
    props: {},
    components: { configForm },
    mixins: [workflowMixin],
    data () {
        return {
            dataObj:dataJson.WfProcess,
            // dataObj:xmlStr,
            size : 1,
            // 辅助线数据
            assistedLineStart: '',
            assistedLineEnd: '',
            endPoint: [],
            // 终点对象
            endObj: {},
            // 配置对话框显示标识
            dialogVisible: false,
            // 连接线数据对象
            linkData: [],
            // 可绘制节点数据
            nodes: NodesData(),
            // 选中节点类型
            nodeType: '',
            // 操作面板样式对象
            styleObj: {
                position: 'absolute',
                left: '20px',
                top: '50px',
                'z-index': '1991'
            },
            // 开始节点对象
            startObj: {},
            // 保存操作标识
            saveFlag: '',
            // 当前选中节点对象
            selectedNode: {},
            // 工作流配置数据
            workflowData: {
                name: '',
                displayName: ''
            },
            // 绘制工作流节点数组
            workflowNodes: [
                ...TerminalNode()
            ]
        };
    },
    watch: {},
    created () {},
    mounted () {
       
       this.$nextTick(()=>{
            console.log(this.dataObj)
            if(this.dataObj){
            let newObj=[];
            let newCondition=[];
            let newRouter=[];
            let newStart=[];
            let newEnd=[];
            let newLine=[];
            // 查看/编辑 载入数据
             for(let i in this.dataObj.lines.line){
                newLine.push(
                    {
                        type: 'Line',
                        oid:this.dataObj.lines.line[i].linefoid,
                        data: {
                            name: this.dataObj.lines.line[i].linefname,
                            displayName: this.dataObj.lines.line[i].linefname
                        },
                        from:{
                            data:{
                                 name: this.dataObj.lines.line[i].linefrom,
                                 displayName: this.dataObj.lines.line[i].linefrom
                            },
                            target:'B',
                            // type:
                        },
                        to:{
                             data:{
                                 name: this.dataObj.lines.line[i].lineto,
                                 displayName: this.dataObj.lines.line[i].lineto
                             },
                            target:'T',
                            // type:
                        },
                    }
                )
             };
            for(let i in this.dataObj.nodes.wfProcessor){
                newCondition.push(
                     {
                         data: {
                            name: this.dataObj.nodes.wfProcessor[i].name,
                            displayName: this.dataObj.nodes.wfProcessor[i].name
                         },
                        type: 'Condition',
                        name: this.dataObj.nodes.wfProcessor[i].name,
                        oid:this.dataObj.nodes.wfProcessor[i].oid,
                        icon: 'el-icon-user',
                        transition: [],
                        options: {
                            width: 120,
                            height: 76,
                            visible: false,
                            color: '#f39c43',
                            x: this.dataObj.nodes.wfProcessor[i].x,
                            y: this.dataObj.nodes.wfProcessor[i].y,
                            draggable: true
                        }
                    }
                )
                
            };
             for(let i in this.dataObj.nodes.wfRouter){
                newRouter.push(
                     {
                        data: {
                            name: this.dataObj.nodes.wfRouter[i].name,
                            displayName: this.dataObj.nodes.wfRouter[i].name
                        },
                        type: 'Task',
                        name: this.dataObj.nodes.wfRouter[i].name,
                        oid:this.dataObj.nodes.wfRouter[i].oid,
                        icon: 'el-icon-setting',
                        transition: [],
                        options: {
                            width: 40,
                            height: 40,
                            visible: false,
                            color: '#25a3fd',
                            x: this.dataObj.nodes.wfRouter[i].x,
                            y: this.dataObj.nodes.wfRouter[i].y,
                            draggable: true
                        }
                    }
                )
                
            };
            newStart.push(
                {
                    type: 'Start',
                    oid:this.dataObj.nodes.wfStarter.oid,
                    transition: [],
                    options: {
                        draggable: true,
                        x: this.dataObj.nodes.wfStarter.x,
                        y: this.dataObj.nodes.wfStarter.y,
                        width: 100,
                        height: 100,
                        color: '#67C23A',
                        allowIn: false,
                        allowOut: true
                    },
                    data: {
                        name: this.dataObj.nodes.wfStarter.name,
                        displayName: this.dataObj.nodes.wfStarter.name
                    },
                    key: 'Start'
                }
            );
             newEnd.push(
                {
                    type: 'End',
                    oid:this.dataObj.nodes.wfEnder.oid,
                    options: {
                        draggable: true,
                        x: this.dataObj.nodes.wfEnder.x,
                        y: this.dataObj.nodes.wfEnder.y,
                         width: 100,
                         height: 100,
                         color: '#F56C6C',
                         allowIn: true,
                         allowOut: false
                    },
                    data: {
                        name: this.dataObj.nodes.wfEnder.name,
                        displayName: this.dataObj.nodes.wfEnder.name
                    },
                    key: 'End'
                }
            )
            
            
            newObj.name = this.dataObj.name
            newObj.displayName = this.dataObj.name
            
            newObj = [
                ...newStart,
                ...newRouter,
                ...newCondition,
                ...newEnd
                 
               
            ]
            // 更改节点信息 同步更新终点为当前配置节点的to属性
            newObj.map(node => {
                    if (node.type !== 'End') {
                        newLine.map(item => {
                            if (item.from.data.name === node.data.name) {
                                node.transition.push(item);
                            }
                        });
                    }
                
            })
            this.dataObj = newObj
            console.log(this.dataObj)
        }

        
       })

        // // 监听键盘事件
        // document.addEventListener('keyup', (event) => {
        //     const evt = window.event || event;
        //     const keyCode = evt.keyCode;
        //     if (Object.keys(this.selectedNode).length === 0 || this.workflowNodes.length === 0) return;
        //     //
        //     if (keyCode === 46) {
        //         const index = this.workflowNodes.indexOf(this.selectedNode);
        //         this.workflowNodes.splice(index, 1);
        //     } else if (keyCode === 90 && evt.ctrlKey) {
        //         // this.workflowNodes.splice(this.workflowNodes.length - 1, 1);
        //     }
        // });
    },
    destroyed () {
        // document.removeEventListener('keyup');
    },
    methods: {
        // getJson () {
        //        this.$api.svg.getjson().then(res=>{
        //            this.dataObj = res
        //            console.log(res)
        //        },error=>{
        //            console.log(error)
        //        })
        //     },
        // 缩小页面
        smaller(){
            this.size = this.size - 0.1;  
            this.set(); 
        },
        // 放大页面
         bigger(){
            this.size = this.size + 0.1;  
            this.set(); 
        },
        // 设置页面大小
         set() {  
            document.body.style.zoom = this.size;
            document.body.style.cssText += '; -moz-transform: scale(' + this.size + ');-moz-transform-origin: 0 0; ';     //
        }, 
        // 点击背景面板执行事件
        backgroundClick (event) {//console.log(event)
            const evt = window.event || event;
            const target = evt.target;
            if (target.className.animVal &&
                target.className.animVal === 'workflow-draw-panel'
            ) {
                // 点击背景执行方法
                this.selectedNode = {};
            }
        },
        // 点击节点事件
        clickNode (node) {
            // 点击节点 保存节点数据 获取节点类型
            this.selectedNode = node;
            this.nodeType = node.type;
        },
        // 清空面板事件
        async cleanUp () {
            try {
                await this.$confirm('是否清空当前工作流?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                //
                const terminalNode = TerminalNode();
                // 初始化端点坐标
                terminalNode.map(node => {
                    node.options.y = 50;
                    node.options.x = node.type === 'Start' ? 300 : 450;
                });
                this.workflowNodes = [];
                this.linkData = [];
                this.$nextTick(() => {
                    this.workflowNodes = [
                        ...terminalNode
                    ];
                });
                this.$message({
                    type: 'success',
                    message: '清空完毕!'
                });
            } catch (error) {
                if (error === 'cancel') {}
            }
        },
        // 拖拽操作面板事件
        dragPanel (event) {
            const evt = window.event || event;
            const { left, top } = this.styleObj;
            const $L = Number(left.split('px')[0]);
            const $T = Number(top.split('px')[0]);
            const disX = evt.clientX - $L;
            const disY = evt.clientY - $T;

            document.onmousemove = event => {
                const moveEvent = window.event || event;
                const L = moveEvent.clientX - disX < 0 ? 0 : moveEvent.clientX - disX;
                const T = moveEvent.clientY - disY < 0 ? 0 : moveEvent.clientY - disY;

                this.styleObj.left = `${L}px`;
                this.styleObj.top = `${T}px`;
            };

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        // 删除节点事件
        deleteNode (index) {
            // 获取目标节点
            const target = this.workflowNodes[index];
            this.workflowNodes.splice(index, 1, {});
            this.selectedNode = {};
            // 删除目标节点相关连接线数据
            for (let j = 0, len = this.linkData.length; j < len; j++) {
                if (this.linkData[j].to.key === target.key || this.linkData[j].from.key === target.key) {
                    this.linkData.splice(j, 1, {});
                }
            }
        },
        // 绘制节点拖拽结束事件
        handlerDragEnd (event, obj) {
            const evt = window.event || event;
            const posX = evt.clientX;
            const posY = evt.clientY;
            const len = this.workflowNodes.length;
            // 设置节点唯一键
            const key = `${Date.parse(new Date())}_${Math.ceil(Math.random() * 99999)}`;
            // 设置拖拽坐标
            const item = JSON.parse(JSON.stringify(obj));
            item.options.x = posX - item.options.width / 2;
            item.options.y = posY - item.options.height / 2;
            // 设置生成节点数据
            this.workflowNodes.splice(len - 1, 0, {
                ...item,
                visible: false,
                key: key
            });
            console.log(this.workflowNodes)
            // this.$set(this.workflowNodes, len, {
            //     ...item,
            //     visible: false,
            //     key: key,
            // });
            // 保存当前生成节点为选中节点
            this.selectedNode = this.workflowNodes[len - 1];
        },
        // 鼠标移入连接锚点事件
        handleMouseEnter (target, point, node) {
            const cx = node.options.x;
            const cy = node.options.y;
            this.endObj = {
                ...node,
                point,
                target
            };
            this.endPoint = [point[0] + cx, point[1] + cy];
        }
    }
};
</script>

<style lang="scss" scoped>
div
{
    margin: 0;
    padding: 0;
}
.svgBox{
    margin: 0;
    width: 100%;
    height: 100%;
}
.select-nodes {
    position: relative;
    overflow: hidden;
    padding: 0 4px 4px;
    margin: 0;
    li {
        list-style: none;
        font-size: 12px;
        display: block;
        width: 110px;
        line-height: 26px;
        position: relative;
        float: left;
        left: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0 8px 8px 0;
        color: #333;
        border: 1px solid #F4F6FC;

        &:hover{
            color: $primary-color;
            border: 1px dashed $primary-color;
        }

        &>a{
            display: block;
            cursor: move;
            background: #F4F6FC;
            border: 1px solid #F4F6FC;

            i {
                margin-right: 6px;
                margin-left: 8px;
                font-size: 14px;
                display: inline-block;
                vertical-align: middle;
            }

            span {
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
}
</style>
