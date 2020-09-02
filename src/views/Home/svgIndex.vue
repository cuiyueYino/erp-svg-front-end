<template>
    <div class="svgmian">
        <div class="clearfloat"></div>
        <!-- 弹窗 -->
        <el-button type="text" @click="dialogTableVisible = true"></el-button>
        <el-dialog 
        :fullscreen="true"
        :close-on-press-escape="false"
        :visible.sync="dialogTableVisible">
            <div
                class="svgBox"
                @click="backgroundClick($event)"
                @dragover.prevent
            >
                <!-- 操作面板 -->
                <div :style="styleObj">
                    <el-card
                        style="width: 300px;"
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
                            <!-- <el-button
                                type="text"
                                size="mini"
                                icon="el-icon-download"
                                @click="compileXMLToObj(dataObj)"
                            >
                                加载
                            </el-button> -->
                            <el-button
                                type="text"
                                size="mini"
                                icon="el-icon-circle-close"
                                @click="handleClose"
                            >关闭</el-button>
                            <el-button
                                v-show="isEditF"
                                size="mini"
                                type="text"
                                :disabled="saveBtnStatus"
                                icon="el-icon-upload"
                                @click="saveEditWorkflow(workflowNodes)"
                            >
                                保存
                            </el-button>
                            <el-button
                                v-show="isNewF"
                                size="mini"
                                type="text"
                                :disabled="saveBtnStatus"
                                icon="el-icon-upload"
                                @click="saveNewWorkflow(workflowNodes)"
                            >
                                保存
                            </el-button>
                            <!-- <el-button
                                size="mini"
                                type="text"
                                :disabled="workflowNodes.filter(item => Object.keys(item).length > 0).length === 2"
                                icon="el-icon-plus-cleanup"
                                @click="cleanUp"
                            >
                                清空
                            </el-button> -->
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
                                :style="item.name=='子流程'?(isSubProcess?'hiddenSubProcess':'showSubProcess'):'showSubProcess'"
                            >
                                <a class="workflow-nodes" v-if="item.name=='子流程'?(isSubProcess?false:true):true">
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
                        v-else-if="node.type === 'Condition'  || node.type === 'Subprocess' || node.type === 'Fork' || node.type === 'Join' "
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
                    @selected-node-click="selectedNodeClick"
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
        </el-dialog>
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
// import dataJson from './222.json';
// 解析 xml 字符模板
// import xmlStr from 'helpers/compile-xml';
export default {
    name: 'WorkFlow',
    props: {},
    components: { configForm },
    mixins: [workflowMixin],
    inject: ['reload'],
    data () {
        return {
            isEditF:false,
            isNewF:false,
            dialogSaveVisible:false,
              // 关闭对话框配置
            closeConfig: false,
            dataObj:{},
            dialogTableVisible:true,
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
                top: '30px',
                'z-index': '1991'
            },
            // 是否为子流程
            isSubProcess:false,
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
            workflowNodes: [],
            LineDataList:[],
            MMworkflowNodes: [],
        };
    },
    watch: {},
    created () {
        let Foid=sessionStorage.getItem("eidtMsgSelectID");
        this.$api.svg.getSvgSingleData(Foid).then(res=>{
            if(res.data.data.msg = "success"){
                sessionStorage.setItem("eidtMsgcode",  res.data.data.code);
                sessionStorage.setItem("eidtMsgfname",   res.data.data.name);
                sessionStorage.setItem("eidtMsgfoid",   res.data.data.oid);
                sessionStorage.setItem("eidtMsg",   JSON.stringify(res.data.data));
                let Fstatus = res.data.data.status;
                //console.log("dedesssss",JSON.stringify(res.data.data))
                this.dataObj = res.data.data;
                switch (this.dataObj.subProcess) {
                    case '0':
                        this.isSubProcess = false;
                        break;
                    case '1':
                        this.isSubProcess = true;
                        break;
                
                    default:
                        break;
                }
                if(this.dataObj.lines.line.length >0){
                    if(Fstatus == 3 || Fstatus=='3'){
                        this.isEditF = false;
                        this.isNewF = false;
                    }else{
                        this.isEditF = true;
                        this.isNewF = false;
                    }
                    let newObj=[];
                    let newFork=[];
                    let newTask=[];
                    let newJoin=[];
                    let newProcess=[];
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
                                linefrom:this.dataObj.lines.line[i].linefrom,
                                data: {
                                    linefcode:this.dataObj.lines.line[i].linefcode,
                                    decisionType:this.dataObj.lines.line[i].linedecisontype,
                                    lineremark:this.dataObj.lines.line[i].lineremark,
                                    lineexpression:this.dataObj.lines.line[i].lineexpression,
                                    lineotherwise:this.dataObj.lines.line[i].lineotherwise,
                                    service:this.dataObj.lines.line[i].service,
                                    name: 'Line',
                                    oid:this.dataObj.lines.line[i].linefoid,
                                    displayName: this.dataObj.lines.line[i].linefname,
                                },
                                from:{
                                    data:{
                                        name: this.dataObj.lines.line[i].from.type,
                                        oid: this.dataObj.lines.line[i].from.key,
                                        displayName: this.dataObj.lines.line[i].from.name
                                    },
                                    options:this.dataObj.lines.line[i].from.options,
                                    target: this.dataObj.lines.line[i].from.target,
                                    point:this.dataObj.lines.line[i].from.point,
                                },
                                to:{
                                    data:{
                                        name: this.dataObj.lines.line[i].to.type,
                                        oid: this.dataObj.lines.line[i].to.key,
                                        displayName: this.dataObj.lines.line[i].to.name,
                                    },
                                    options:this.dataObj.lines.line[i].to.options,
                                    point:this.dataObj.lines.line[i].to.point,
                                    target: this.dataObj.lines.line[i].to.target,
                                },
                            }
                        )
                    };
                    for(let i in this.dataObj.nodes.wfProcessor){
                        switch (this.dataObj.nodes.wfProcessor[i].type) {
                            case "Join":
                                    newJoin.push(
                                        {
                                            data: {
                                                mactivity : this.dataObj.nodes.wfProcessor[i].mactivity?{
                                                    "code": this.dataObj.nodes.wfProcessor[i].mactivity.code,
                                                    "oid": this.dataObj.nodes.wfProcessor[i].mactivity.oid,
                                                    "name": this.dataObj.nodes.wfProcessor[i].mactivity.name,
                                                }:{},
                                                dataType : this.dataObj.nodes.wfProcessor[i].dataType?{
                                                    "code": this.dataObj.nodes.wfProcessor[i].dataType.code,
                                                    "oid": this.dataObj.nodes.wfProcessor[i].dataType.oid,
                                                    "name": this.dataObj.nodes.wfProcessor[i].dataType.name,
                                                }:{},
                                                decisions :{
                                                    decision:this.dataObj.nodes.wfProcessor[i].decisions.decision
                                                },
                                                srcActivity : this.dataObj.nodes.wfProcessor[i].srcActivity?{
                                                    "code": this.dataObj.nodes.wfProcessor[i].srcActivity.code,
                                                    "oid": this.dataObj.nodes.wfProcessor[i].srcActivity.oid,
                                                    "name": this.dataObj.nodes.wfProcessor[i].srcActivity.name,
                                                }:{},
                                                wfCopyTo :{
                                                    copyTo:this.dataObj.nodes.wfProcessor[i].wfCopyTo.copyTo
                                                },
                                                wfParticipator :{
                                                    participator:this.dataObj.nodes.wfProcessor[i].wfParticipator.participator
                                                },
                                                wfViewOtherComments :{
                                                    wfViewOtherComment:this.dataObj.nodes.wfProcessor[i].wfViewOtherComments.wfViewOtherComment
                                                },
                                                oid:this.dataObj.nodes.wfProcessor[i].oid,
                                                fremark: this.dataObj.nodes.wfProcessor[i].fremark,
                                                hidden: this.dataObj.nodes.wfProcessor[i].hidden,
                                                maxWorkTime: this.dataObj.nodes.wfProcessor[i].maxWorkTime,
                                                mntNextJoin: this.dataObj.nodes.wfProcessor[i].mntNextJoin,
                                                multMail: this.dataObj.nodes.wfProcessor[i].multMail,
                                                nodetype: this.dataObj.nodes.wfProcessor[i].nodetype,
                                                orgUnit: this.dataObj.nodes.wfProcessor[i].orgUnit,
                                                rollbackService: this.dataObj.nodes.wfProcessor[i].rollbackService,
                                                timeUnit: this.dataObj.nodes.wfProcessor[i].timeUnit,
                                                wfAuditType: this.dataObj.nodes.wfProcessor[i].wfAuditType,
                                                autoHurry: this.dataObj.nodes.wfProcessor[i].autoHurry,
                                                autoSubmit: this.dataObj.nodes.wfProcessor[i].autoSubmit,
                                                permission: this.dataObj.nodes.wfProcessor[i].permission,
                                                canSkip: this.dataObj.nodes.wfProcessor[i].canSkip,
                                                code: this.dataObj.nodes.wfProcessor[i].code,
                                                creator: this.dataObj.nodes.wfProcessor[i].creator,
                                                name:'Join',
                                                displayName: this.dataObj.nodes.wfProcessor[i].name,
                                            },
                                            type: 'Join',
                                            name: this.dataObj.nodes.wfProcessor[i].name,
                                            oid:this.dataObj.nodes.wfProcessor[i].oid,
                                            icon: 'el-icon-plus-param',
                                            transition: [],
                                            options: {
                                                width: 120,
                                                height: 76,
                                                visible: false,
                                                color: '#909399',
                                                x: Number(this.dataObj.nodes.wfProcessor[i].x),
                                                y: Number(this.dataObj.nodes.wfProcessor[i].y),
                                                draggable: true
                                            }
                                        }
                                    )
                                break;
                            case "Condition":
                                    newCondition.push(
                                        {
                                            data: {
                                                mactivity : {
                                                    "code": this.dataObj.nodes.wfProcessor[i].mactivity.code,
                                                    "oid": this.dataObj.nodes.wfProcessor[i].mactivity.oid,
                                                    "name": this.dataObj.nodes.wfProcessor[i].mactivity.name,
                                                },
                                                dataType : this.dataObj.nodes.wfProcessor[i].dataType?{
                                                    "code": this.dataObj.nodes.wfProcessor[i].dataType.code,
                                                    "oid": this.dataObj.nodes.wfProcessor[i].dataType.oid,
                                                    "name": this.dataObj.nodes.wfProcessor[i].dataType.name,
                                                }:{},
                                                decisions :this.dataObj.nodes.wfProcessor[i].decisions?{
                                                    decision:this.dataObj.nodes.wfProcessor[i].decisions.decision
                                                }:{},
                                                srcActivity : this.dataObj.nodes.wfProcessor[i].srcActivity?{
                                                    "code": this.dataObj.nodes.wfProcessor[i].srcActivity.code,
                                                    "oid": this.dataObj.nodes.wfProcessor[i].srcActivity.oid,
                                                    "name": this.dataObj.nodes.wfProcessor[i].srcActivity.name,
                                                }:{},
                                                wfCopyTo :{
                                                    copyTo:this.dataObj.nodes.wfProcessor[i].wfCopyTo.copyTo
                                                },
                                                wfParticipator :{
                                                    participator:this.dataObj.nodes.wfProcessor[i].wfParticipator.participator
                                                },
                                                wfViewOtherComments :{
                                                    wfViewOtherComment:this.dataObj.nodes.wfProcessor[i].wfViewOtherComments.wfViewOtherComment
                                                },
                                                oid:this.dataObj.nodes.wfProcessor[i].oid,
                                                autoHurry:this.dataObj.nodes.wfProcessor[i].autoHurry,
                                                autoSubmit: this.dataObj.nodes.wfProcessor[i].autoSubmit,
                                                permission: this.dataObj.nodes.wfProcessor[i].permission,
                                                canSkip: this.dataObj.nodes.wfProcessor[i].canSkip,
                                                code: this.dataObj.nodes.wfProcessor[i].code,
                                                creator: this.dataObj.nodes.wfProcessor[i].creator,
                                                fremark: this.dataObj.nodes.wfProcessor[i].fremark,
                                                hidden: this.dataObj.nodes.wfProcessor[i].hidden,
                                                maxWorkTime: this.dataObj.nodes.wfProcessor[i].maxWorkTime,
                                                mntNextJoin: this.dataObj.nodes.wfProcessor[i].mntNextJoin,
                                                multMail: this.dataObj.nodes.wfProcessor[i].multMail,
                                                nodetype: this.dataObj.nodes.wfProcessor[i].nodetype,
                                                orgUnit: this.dataObj.nodes.wfProcessor[i].orgUnit,
                                                rollbackService: this.dataObj.nodes.wfProcessor[i].rollbackService,
                                                timeUnit: this.dataObj.nodes.wfProcessor[i].timeUnit,
                                                wfAuditType: this.dataObj.nodes.wfProcessor[i].wfAuditType,
                                                name: 'Condition',
                                                displayName: this.dataObj.nodes.wfProcessor[i].name,
                                                
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
                                                x: Number(this.dataObj.nodes.wfProcessor[i].x),
                                                y: Number(this.dataObj.nodes.wfProcessor[i].y),
                                                draggable: true
                                            }
                                        }
                                    )
                                break;
                        
                            default:
                                break;
                        }
                        
                    };
                    for(let i in this.dataObj.nodes.wfRouter){
                        newRouter.push(
                            {
                                data: {
                                    dataType : this.dataObj.nodes.wfRouter[i].dataType?{
                                        "code": this.dataObj.nodes.wfRouter[i].dataType.code,
                                        "oid": this.dataObj.nodes.wfRouter[i].dataType.oid,
                                        "name": this.dataObj.nodes.wfRouter[i].dataType.name,
                                    }:{},
                                    fremark: this.dataObj.nodes.wfRouter[i].fremark,
                                    hidden: this.dataObj.nodes.wfRouter[i].hidden,
                                    join: this.dataObj.nodes.wfRouter[i].join,
                                    code: this.dataObj.nodes.wfRouter[i].code,
                                    name: 'Task',
                                    type: 'Task',
                                    oid:this.dataObj.nodes.wfRouter[i].oid,
                                    displayName: this.dataObj.nodes.wfRouter[i].name,
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
                                    x: Number(this.dataObj.nodes.wfRouter[i].x),
                                    y: Number(this.dataObj.nodes.wfRouter[i].y),
                                    draggable: true
                                }
                            }
                        )
                    };
                    for(let i in this.dataObj.nodes.wfProcessorAuto){
                        newFork.push(
                            {
                                data: {
                                    dataType : this.dataObj.nodes.wfProcessorAuto[i].dataType?{
                                        "code": this.dataObj.nodes.wfProcessorAuto[i].dataType.code,
                                        "oid": this.dataObj.nodes.wfProcessorAuto[i].dataType.oid,
                                        "name": this.dataObj.nodes.wfProcessorAuto[i].dataType.name,
                                    }:{},
                                    mactivity:this.dataObj.nodes.wfProcessorAuto[i].mactivity,
                                    wfAuditType: this.dataObj.nodes.wfProcessorAuto[i].wfAuditType,
                                    fremark: this.dataObj.nodes.wfProcessorAuto[i].fremark,
                                    hidden: this.dataObj.nodes.wfProcessorAuto[i].hidden,
                                    join: this.dataObj.nodes.wfProcessorAuto[i].join,
                                    name: 'Fork',
                                    oid:this.dataObj.nodes.wfProcessorAuto[i].oid,
                                    displayName: this.dataObj.nodes.wfProcessorAuto[i].name,
                                    
                                },
                                type: 'Fork',
                                name: this.dataObj.nodes.wfProcessorAuto[i].name,
                                oid:this.dataObj.nodes.wfProcessorAuto[i].oid,
                                icon: 'el-icon-setting',
                                transition: [],
                                options: {
                                    width: 120,
                                    height: 76,
                                    visible: false,
                                    color: '#25a3fd',
                                    x: Number(this.dataObj.nodes.wfProcessorAuto[i].x),
                                    y: Number(this.dataObj.nodes.wfProcessorAuto[i].y),
                                    draggable: true
                                }
                            }
                        )
                        
                    };
                    for(let i in this.dataObj.nodes.wfSubProces){
                        newProcess.push(
                            {
                                data: {
                                    refWfProcess : this.dataObj.nodes.wfSubProces[i].refWfProcess?{
                                        "code": this.dataObj.nodes.wfSubProces[i].refWfProcess.code,
                                        "oid": this.dataObj.nodes.wfSubProces[i].refWfProcess.oid,
                                        "name": this.dataObj.nodes.wfSubProces[i].refWfProcess.name,
                                    }:{},
                                    fremark: this.dataObj.nodes.wfSubProces[i].fremark,
                                    hidden: this.dataObj.nodes.wfSubProces[i].hidden,
                                    code: this.dataObj.nodes.wfSubProces[i].code,
                                    name: 'Subprocess',
                                    oid:this.dataObj.nodes.wfSubProces[i].oid,
                                    displayName: this.dataObj.nodes.wfSubProces[i].name,
                                },
                                type: 'Subprocess',
                                name: this.dataObj.nodes.wfSubProces[i].name,
                                oid:this.dataObj.nodes.wfSubProces[i].oid,
                                icon: 'el-icon-connection',
                                transition: [],
                                options: {
                                    width: 120,
                                    height: 76,
                                    visible: false,
                                    color: '#9389fb',
                                    x: Number(this.dataObj.nodes.wfSubProces[i].x),
                                    y: Number(this.dataObj.nodes.wfSubProces[i].y),
                                    draggable: true
                                }
                            }
                        )
                    };
            
                    newStart.push(
                        {
                            type: 'Start',
                            oid:this.dataObj.nodes.wfStarter[0].oid,
                            transition: [],
                            options: {
                                draggable: true,
                                x: Number(this.dataObj.nodes.wfStarter[0].x),
                                y: Number(this.dataObj.nodes.wfStarter[0].y),
                                width: 100,
                                height: 100,
                                color: '#67C23A',
                                allowIn: false,
                                allowOut: true
                            },
                            data: {
                                name: 'Start',
                                oid:this.dataObj.nodes.wfStarter[0].oid,
                                displayName: this.dataObj.nodes.wfStarter[0].name,
                            },
                            key: this.dataObj.nodes.wfStarter[0].oid,
                        }
                    );
                    newEnd.push(
                        {
                            type: 'End',
                            oid:this.dataObj.nodes.wfEnder[0].oid,
                            options: {
                                draggable: true,
                                x: Number(this.dataObj.nodes.wfEnder[0].x),
                                y: Number(this.dataObj.nodes.wfEnder[0].y),
                                width: 100,
                                height: 100,
                                color: '#F56C6C',
                                allowIn: true,
                                allowOut: false
                            },
                            data: {
                                name: 'End',
                                oid:this.dataObj.nodes.wfEnder[0].oid,
                                displayName: this.dataObj.nodes.wfEnder[0].name,
                                
                            },
                            key: this.dataObj.nodes.wfEnder[0].oid,
                        }
                    )
                
                    newObj = [
                        ...newStart,
                        ...newRouter,
                        ...newCondition,
                        ...newFork,
                        ...newJoin,
                        ...newProcess,
                    ]
                    newObj.name = this.dataObj.name
                    newObj.displayName = this.dataObj.name;
                    // 更改节点信息 同步更新终点为当前配置节点的to属性
                    newObj.forEach(item=>{
                        for( let i = 0; i < newLine.length; i++ ){
                            if(newLine[i].linefrom){
                                if(item.oid === newLine[i].linefrom ){
                                    item.transition.push(newLine[i]);
                                }
                            }
                        }
                    });
                    this.LineDataList=newLine;
                    newObj.push(...newEnd);
                    this.dataObj = newObj;
                    this.MMworkflowNodes=[];
                    for(let k =0 ; k<this.dataObj.length; k++){
                        //this.workflowNodes.push(this.dataObj[k]);
                        this.MMworkflowNodes.push(this.dataObj[k]);  
                    }
                    this.compileXMLToObj(this.dataObj);
                }else{
                    if(Fstatus == 3 || Fstatus=='3'){
                        this.isEditF = false;
                        this.isNewF = false;
                    }else{
                        this.isEditF = true;
                        this.isNewF = false;
                    }
                    //this.isEditF = false;
                    //this.isNewF = true;
                    this.workflowNodes = [
                        ...TerminalNode()
                    ];
                    this.LineDataList=[];
                    this.MMworkflowNodes = [
                        ...TerminalNode()
                    ];
                    this.dataObj =[];
                    console.log(this.MMworkflowNodes)
                }
            }
        }),error=>{
            console.log(error);
        }
        /*if( JSON.parse( sessionStorage.getItem("eidtMsg") ) ){
            this.dataObj = JSON.parse( sessionStorage.getItem("eidtMsg") );
            switch (this.dataObj.subProcess) {
                case '0':
                    this.isSubProcess = false;
                    break;
                case '1':
                    this.isSubProcess = true;
                    break;
            
                default:
                    break;
            }
        }*/
    },
    mounted () {
        /*this.$nextTick(()=>{
            if(this.dataObj.lines.line.length >0){
                this.isEditF = true;
                this.isNewF = false;
                let newObj=[];
                let newFork=[];
                let newTask=[];
                let newJoin=[];
                let newProcess=[];
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
                            linefrom:this.dataObj.lines.line[i].linefrom,
                            data: {
                                linefcode:this.dataObj.lines.line[i].linefcode,
                                decisionType:this.dataObj.lines.line[i].linedecisontype,
                                lineremark:this.dataObj.lines.line[i].lineremark,
                                lineexpression:this.dataObj.lines.line[i].lineexpression,
                                lineotherwise:this.dataObj.lines.line[i].lineotherwise,
                                service:this.dataObj.lines.line[i].service,
                                name: 'Line',
                                oid:this.dataObj.lines.line[i].linefoid,
                                displayName: this.dataObj.lines.line[i].linefname,
                            },
                            from:{
                                data:{
                                    name: this.dataObj.lines.line[i].from.type,
                                    oid: this.dataObj.lines.line[i].from.key,
                                    displayName: this.dataObj.lines.line[i].from.name
                                },
                                options:this.dataObj.lines.line[i].from.options,
                                target: this.dataObj.lines.line[i].from.target,
                                point:this.dataObj.lines.line[i].from.point,
                            },
                            to:{
                                data:{
                                    name: this.dataObj.lines.line[i].to.type,
                                    oid: this.dataObj.lines.line[i].to.key,
                                    displayName: this.dataObj.lines.line[i].to.name,
                                },
                                options:this.dataObj.lines.line[i].to.options,
                                point:this.dataObj.lines.line[i].to.point,
                                target: this.dataObj.lines.line[i].to.target,
                            },
                        }
                    )
                };
                for(let i in this.dataObj.nodes.wfProcessor){
                    switch (this.dataObj.nodes.wfProcessor[i].type) {
                        case "Join":
                                newJoin.push(
                                    {
                                        data: {
                                            mactivity : this.dataObj.nodes.wfProcessor[i].mactivity?{
                                                "code": this.dataObj.nodes.wfProcessor[i].mactivity.code,
                                                "oid": this.dataObj.nodes.wfProcessor[i].mactivity.oid,
                                                "name": this.dataObj.nodes.wfProcessor[i].mactivity.name,
                                            }:{},
                                            dataType : this.dataObj.nodes.wfProcessor[i].dataType?{
                                                "code": this.dataObj.nodes.wfProcessor[i].dataType.code,
                                                "oid": this.dataObj.nodes.wfProcessor[i].dataType.oid,
                                                "name": this.dataObj.nodes.wfProcessor[i].dataType.name,
                                            }:{},
                                            decisions :{
                                                decision:this.dataObj.nodes.wfProcessor[i].decisions.decision
                                            },
                                            srcActivity : this.dataObj.nodes.wfProcessor[i].srcActivity?{
                                                "code": this.dataObj.nodes.wfProcessor[i].srcActivity.code,
                                                "oid": this.dataObj.nodes.wfProcessor[i].srcActivity.oid,
                                                "name": this.dataObj.nodes.wfProcessor[i].srcActivity.name,
                                            }:{},
                                            wfCopyTo :{
                                                copyTo:this.dataObj.nodes.wfProcessor[i].wfCopyTo.copyTo
                                            },
                                            wfParticipator :{
                                                participator:this.dataObj.nodes.wfProcessor[i].wfParticipator.participator
                                            },
                                            wfViewOtherComments :{
                                                wfViewOtherComment:this.dataObj.nodes.wfProcessor[i].wfViewOtherComments.wfViewOtherComment
                                            },
                                            oid:this.dataObj.nodes.wfProcessor[i].oid,
                                            fremark: this.dataObj.nodes.wfProcessor[i].fremark,
                                            hidden: this.dataObj.nodes.wfProcessor[i].hidden,
                                            maxWorkTime: this.dataObj.nodes.wfProcessor[i].maxWorkTime,
                                            mntNextJoin: this.dataObj.nodes.wfProcessor[i].mntNextJoin,
                                            multMail: this.dataObj.nodes.wfProcessor[i].multMail,
                                            nodetype: this.dataObj.nodes.wfProcessor[i].nodetype,
                                            orgUnit: this.dataObj.nodes.wfProcessor[i].orgUnit,
                                            rollbackService: this.dataObj.nodes.wfProcessor[i].rollbackService,
                                            timeUnit: this.dataObj.nodes.wfProcessor[i].timeUnit,
                                            wfAuditType: this.dataObj.nodes.wfProcessor[i].wfAuditType,
                                            autoHurry: this.dataObj.nodes.wfProcessor[i].autoHurry,
                                            autoSubmit: this.dataObj.nodes.wfProcessor[i].autoSubmit,
                                            permission: this.dataObj.nodes.wfProcessor[i].permission,
                                            canSkip: this.dataObj.nodes.wfProcessor[i].canSkip,
                                            code: this.dataObj.nodes.wfProcessor[i].code,
                                            creator: this.dataObj.nodes.wfProcessor[i].creator,
                                            name:'Join',
                                            displayName: this.dataObj.nodes.wfProcessor[i].name,
                                        },
                                        type: 'Join',
                                        name: this.dataObj.nodes.wfProcessor[i].name,
                                        oid:this.dataObj.nodes.wfProcessor[i].oid,
                                        icon: 'el-icon-plus-param',
                                        transition: [],
                                        options: {
                                            width: 120,
                                            height: 76,
                                            visible: false,
                                            color: '#909399',
                                            x: Number(this.dataObj.nodes.wfProcessor[i].x),
                                            y: Number(this.dataObj.nodes.wfProcessor[i].y),
                                            draggable: true
                                        }
                                    }
                                )
                            break;
                        case "Condition":
                                newCondition.push(
                                    {
                                        data: {
                                            mactivity : {
                                                "code": this.dataObj.nodes.wfProcessor[i].mactivity.code,
                                                "oid": this.dataObj.nodes.wfProcessor[i].mactivity.oid,
                                                "name": this.dataObj.nodes.wfProcessor[i].mactivity.name,
                                            },
                                            dataType : this.dataObj.nodes.wfProcessor[i].dataType?{
                                                "code": this.dataObj.nodes.wfProcessor[i].dataType.code,
                                                "oid": this.dataObj.nodes.wfProcessor[i].dataType.oid,
                                                "name": this.dataObj.nodes.wfProcessor[i].dataType.name,
                                            }:{},
                                            decisions :this.dataObj.nodes.wfProcessor[i].decisions?{
                                                decision:this.dataObj.nodes.wfProcessor[i].decisions.decision
                                            }:{},
                                            srcActivity : this.dataObj.nodes.wfProcessor[i].srcActivity?{
                                                "code": this.dataObj.nodes.wfProcessor[i].srcActivity.code,
                                                "oid": this.dataObj.nodes.wfProcessor[i].srcActivity.oid,
                                                "name": this.dataObj.nodes.wfProcessor[i].srcActivity.name,
                                            }:{},
                                            wfCopyTo :{
                                                copyTo:this.dataObj.nodes.wfProcessor[i].wfCopyTo.copyTo
                                            },
                                            wfParticipator :{
                                                participator:this.dataObj.nodes.wfProcessor[i].wfParticipator.participator
                                            },
                                            wfViewOtherComments :{
                                                wfViewOtherComment:this.dataObj.nodes.wfProcessor[i].wfViewOtherComments.wfViewOtherComment
                                            },
                                            oid:this.dataObj.nodes.wfProcessor[i].oid,
                                            autoHurry:this.dataObj.nodes.wfProcessor[i].autoHurry,
                                            autoSubmit: this.dataObj.nodes.wfProcessor[i].autoSubmit,
                                            permission: this.dataObj.nodes.wfProcessor[i].permission,
                                            canSkip: this.dataObj.nodes.wfProcessor[i].canSkip,
                                            code: this.dataObj.nodes.wfProcessor[i].code,
                                            creator: this.dataObj.nodes.wfProcessor[i].creator,
                                            fremark: this.dataObj.nodes.wfProcessor[i].fremark,
                                            hidden: this.dataObj.nodes.wfProcessor[i].hidden,
                                            maxWorkTime: this.dataObj.nodes.wfProcessor[i].maxWorkTime,
                                            mntNextJoin: this.dataObj.nodes.wfProcessor[i].mntNextJoin,
                                            multMail: this.dataObj.nodes.wfProcessor[i].multMail,
                                            nodetype: this.dataObj.nodes.wfProcessor[i].nodetype,
                                            orgUnit: this.dataObj.nodes.wfProcessor[i].orgUnit,
                                            rollbackService: this.dataObj.nodes.wfProcessor[i].rollbackService,
                                            timeUnit: this.dataObj.nodes.wfProcessor[i].timeUnit,
                                            wfAuditType: this.dataObj.nodes.wfProcessor[i].wfAuditType,
                                            name: 'Condition',
                                            displayName: this.dataObj.nodes.wfProcessor[i].name,
                                            
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
                                            x: Number(this.dataObj.nodes.wfProcessor[i].x),
                                            y: Number(this.dataObj.nodes.wfProcessor[i].y),
                                            draggable: true
                                        }
                                    }
                                )
                            break;
                    
                        default:
                            break;
                    }
                    
                };
                for(let i in this.dataObj.nodes.wfRouter){
                    newRouter.push(
                        {
                            data: {
                                dataType : this.dataObj.nodes.wfRouter[i].dataType?{
                                    "code": this.dataObj.nodes.wfRouter[i].dataType.code,
                                    "oid": this.dataObj.nodes.wfRouter[i].dataType.oid,
                                    "name": this.dataObj.nodes.wfRouter[i].dataType.name,
                                }:{},
                                fremark: this.dataObj.nodes.wfRouter[i].fremark,
                                hidden: this.dataObj.nodes.wfRouter[i].hidden,
                                join: this.dataObj.nodes.wfRouter[i].join,
                                code: this.dataObj.nodes.wfRouter[i].code,
                                name: 'Task',
                                type: 'Task',
                                oid:this.dataObj.nodes.wfRouter[i].oid,
                                displayName: this.dataObj.nodes.wfRouter[i].name,
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
                                x: Number(this.dataObj.nodes.wfRouter[i].x),
                                y: Number(this.dataObj.nodes.wfRouter[i].y),
                                draggable: true
                            }
                        }
                    )
                };
                for(let i in this.dataObj.nodes.wfProcessorAuto){
                    newFork.push(
                        {
                            data: {
                                dataType : this.dataObj.nodes.wfProcessorAuto[i].dataType?{
                                    "code": this.dataObj.nodes.wfProcessorAuto[i].dataType.code,
                                    "oid": this.dataObj.nodes.wfProcessorAuto[i].dataType.oid,
                                    "name": this.dataObj.nodes.wfProcessorAuto[i].dataType.name,
                                }:{},
                                mactivity:this.dataObj.nodes.wfProcessorAuto[i].mactivity,
                                wfAuditType: this.dataObj.nodes.wfProcessorAuto[i].wfAuditType,
                                fremark: this.dataObj.nodes.wfProcessorAuto[i].fremark,
                                hidden: this.dataObj.nodes.wfProcessorAuto[i].hidden,
                                join: this.dataObj.nodes.wfProcessorAuto[i].join,
                                name: 'Fork',
                                oid:this.dataObj.nodes.wfProcessorAuto[i].oid,
                                displayName: this.dataObj.nodes.wfProcessorAuto[i].name,
                                
                            },
                            type: 'Fork',
                            name: this.dataObj.nodes.wfProcessorAuto[i].name,
                            oid:this.dataObj.nodes.wfProcessorAuto[i].oid,
                            icon: 'el-icon-setting',
                            transition: [],
                            options: {
                                width: 120,
                                height: 76,
                                visible: false,
                                color: '#25a3fd',
                                x: Number(this.dataObj.nodes.wfProcessorAuto[i].x),
                                y: Number(this.dataObj.nodes.wfProcessorAuto[i].y),
                                draggable: true
                            }
                        }
                    )
                    
                };
                for(let i in this.dataObj.nodes.wfSubProces){
                    newProcess.push(
                        {
                            data: {
                                refWfProcess : this.dataObj.nodes.wfSubProces[i].refWfProcess?{
                                    "code": this.dataObj.nodes.wfSubProces[i].refWfProcess.code,
                                    "oid": this.dataObj.nodes.wfSubProces[i].refWfProcess.oid,
                                    "name": this.dataObj.nodes.wfSubProces[i].refWfProcess.name,
                                }:{},
                                fremark: this.dataObj.nodes.wfSubProces[i].fremark,
                                hidden: this.dataObj.nodes.wfSubProces[i].hidden,
                                code: this.dataObj.nodes.wfSubProces[i].code,
                                name: 'Subprocess',
                                oid:this.dataObj.nodes.wfSubProces[i].oid,
                                displayName: this.dataObj.nodes.wfSubProces[i].name,
                            },
                            type: 'Subprocess',
                            name: this.dataObj.nodes.wfSubProces[i].name,
                            oid:this.dataObj.nodes.wfSubProces[i].oid,
                            icon: 'el-icon-connection',
                            transition: [],
                            options: {
                                width: 120,
                                height: 76,
                                visible: false,
                                color: '#9389fb',
                                x: Number(this.dataObj.nodes.wfSubProces[i].x),
                                y: Number(this.dataObj.nodes.wfSubProces[i].y),
                                draggable: true
                            }
                        }
                    )
                };
           
                newStart.push(
                    {
                        type: 'Start',
                        oid:this.dataObj.nodes.wfStarter[0].oid,
                        transition: [],
                        options: {
                            draggable: true,
                            x: Number(this.dataObj.nodes.wfStarter[0].x),
                            y: Number(this.dataObj.nodes.wfStarter[0].y),
                            width: 100,
                            height: 100,
                            color: '#67C23A',
                            allowIn: false,
                            allowOut: true
                        },
                        data: {
                            name: 'Start',
                            oid:this.dataObj.nodes.wfStarter[0].oid,
                            displayName: this.dataObj.nodes.wfStarter[0].name,
                        },
                        key: 'Start'
                    }
                );
                newEnd.push(
                    {
                        type: 'End',
                        oid:this.dataObj.nodes.wfEnder[0].oid,
                        options: {
                            draggable: true,
                            x: Number(this.dataObj.nodes.wfEnder[0].x),
                            y: Number(this.dataObj.nodes.wfEnder[0].y),
                            width: 100,
                            height: 100,
                            color: '#F56C6C',
                            allowIn: true,
                            allowOut: false
                        },
                        data: {
                            name: 'End',
                            oid:this.dataObj.nodes.wfEnder[0].oid,
                            displayName: this.dataObj.nodes.wfEnder[0].name,
                            
                        },
                        key: 'End'
                    }
                )
            
                newObj = [
                    ...newStart,
                    ...newRouter,
                    ...newCondition,
                    ...newFork,
                    ...newJoin,
                    ...newProcess,
                ]
                newObj.name = this.dataObj.name
                newObj.displayName = this.dataObj.name;
                // 更改节点信息 同步更新终点为当前配置节点的to属性
                newObj.forEach(item=>{
                    for( let i = 0; i < newLine.length; i++ ){
                        if(newLine[i].linefrom){
                            if(item.oid === newLine[i].linefrom ){
                                item.transition.push(newLine[i]);
                            }
                        }
                    }
                });
                this.LineDataList=newLine;
                newObj.push(...newEnd);
                this.dataObj = newObj;
                this.MMworkflowNodes=[];
                for(let k =0 ; k<this.dataObj.length; k++){
                    //this.workflowNodes.push(this.dataObj[k]);
                    this.MMworkflowNodes.push(this.dataObj[k]);  
                }
                this.compileXMLToObj(this.dataObj);
            }else{
                this.isEditF = false;
                this.isNewF = true;
                this.workflowNodes = [
                    ...TerminalNode()
                ];
                this.LineDataList=[];
                this.MMworkflowNodes = [
                    ...TerminalNode()
                ];
                this.dataObj =[];
                console.log(this.MMworkflowNodes)
            }
        })*/
    },
    updated(){
       ///this.workflowNodes=this.MMworkflowNodes; 
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
            document.getElementsByClassName('svgBox')[0].style.zoom = this.size;
            document.body.style.cssText += '; -moz-transform: scale(' + this.size + ');-moz-transform-origin: 0 0; ';     //
        },
        //关闭当前dialog时给父组件传值
        handleClose(){
            //返回选中的父组件选中的row,并修某些改值
            sessionStorage.setItem("eidtMsg",null);
            sessionStorage.setItem("eidtMsgSelectID",null);
            this.dialogTableVisible = false;
            this.$router.push({name:"workProcess"})//bug BUG #346
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
        // 点击线名字事件
        selectedNodeClick(item){//
            let newData = []
            /*for(let k =0 ; k<this.dataObj.length; k++){
                newData  = this.dataObj[k].transition;//
                if(newData){
                    for(let j =0 ; j<newData.length; j++){
                        if(item.data.displayName == newData[j].data.displayName){
                            item.data = newData[j].data
                            //item.data.oid =newData[j].data.oid
                        }
                    }
                }
            }*/
            //console.log(this.lineData,item)
        },
        // 点击节点事件
        clickNode (node) {
            // 点击节点 保存节点数据 获取节点类型
            this.selectedNode = node;
            /*for(let k =0 ; k<this.dataObj.length; k++){
                if(this.dataObj[k].data.displayName === node.data.displayName){
                    this.selectedNode.data = this.dataObj[k].data;
                    this.selectedNode.data.oid = this.dataObj[k].oid;
                    // console.log(this.selectedNode,this.dataObj[k])
                }
            }*/
            this.nodeType = node.type;
            if(node.type == "Join"){
                //sessionStorage.setItem('allData',JSON.stringify(this.dataObj))
                //sessionStorage.setItem('allData',JSON.stringify(this.workflowNodes))
                let Sdata=this.workflowNodes;
                let AllData=[];
                for(let i=0;i<Sdata.length;i++){
                    let Obj={};
                    Obj.data=Sdata[i].data;
                    Obj.key=Sdata[i].key;
                    Obj.oid=Sdata[i].oid;
                    Obj.type=Sdata[i].type;
                    AllData.push(Obj)
                }
                sessionStorage.setItem('allData',JSON.stringify(AllData))
            }
            // console.log(this.selectedNode,this.workflowNodes)
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
                this.MMworkflowNodes = [];
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
            this.workflowNodes.splice(index, 1);
            this.selectedNode = {};
            // 删除目标节点相关连接线数据
            for (let j = 0, len = this.linkData.length; j < len; j++) {
                if (this.linkData[j].to.key === target.key || this.linkData[j].from.key === target.key) {
                    this.linkData.splice(j, 1);
                    j=j-1;
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
            // this.$set(this.workflowNodes, len, {
            //     ...item,
            //     visible: false,
            //     key: key,
            // });
            // 保存当前生成节点为选中节点
            this.selectedNode = this.workflowNodes[len - 1];
        },
        // 鼠标移入连接锚点事件
        handleMouseEnter (target, point, node) {//console.log(node)
            const cx = node.options.x;
            const cy = node.options.y;
            this.endObj = {
                ...node,
                point,
                target
            };
            this.endPoint = [point[0] + cx, point[1] + cy];
        },
    }
}
</script>
<style lang="scss" scoped>
/deep/ .el-dialog__body{
    padding:0;
    height: 90%;
}
 /deep/ .el-dialog__header{
     display: none;
 }
 showSubProcess{
     display: inline-block;
 }
 hiddenSubProcess{
     display: none;
 }
div
{
    margin: 0;
    padding: 0;
}
.svgmian{
    margin: 0;
    width: 100%;
    height: 100%;
    position: relative;
}
.clearfloat{
    clear:both;
}
.svgBox{
    margin: 0;
    width: 100%;
    height: 99vh;
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
        width: 130px;
        line-height: 26px;
        position: relative;
        float: left;
        left: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 4px 6px 8px 4px;
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