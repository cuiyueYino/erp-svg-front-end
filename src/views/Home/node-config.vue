<template>
<div>
<!-- 弹出框内容 -->
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :modal="false"
        :close-on-click-modal="closeConfig"
        :close-on-press-escape="closeConfig"
        width="600px"
        style="z-index:2007"
    >
        <el-form
            :model="formData"
            label-width="97px"
            label-suffix="："
            label-position="right"
            ref="workflowConfigForm"
            :rules="configRules"
            size="small"
            @submit.native.prevent
        >
        <node-condition :visible = visibleF?(ConditionF?true:false):false :data="editConData?editConData:null" @saveFormData="saveFormData" > </node-condition>
        <node-fork :visible = visibleF?(ForkF?true:false):false @saveFormData="saveForkData" ></node-fork>
        <node-join :visible = visibleF?(JoinF?true:false):false @saveFormData="saveJoinData" ></node-join>
        <node-router-task :visible = visibleF?(TaskF?true:false):false @saveFormData="saveRouteData"  ></node-router-task>
         <node-process :visible = visibleF?(ProcessF?true:false):false @saveFormData="saveRouteData"  ></node-process>
        <node-line :visible = visibleF?(LineF?true:false):false :data="editLineData?editLineData:null" @saveLineData="saveLineData" ></node-line>
         </el-form>
          <el-row :gutter="20">
            <el-col :span="12" style="text-align: right;">
                <el-button  size="small" @click="saveConfig">保存</el-button>
            </el-col>
            <el-col :span="12">
                <el-button size="small" @click="cancelConfig">取消</el-button>
            </el-col>
        </el-row>
    </el-dialog>
    </div>
</template>

<script>
/**
* @description 节点配置组件
* @create 2019-04-11
* @author liyuanquan
*/
// 手工活动
import NodeCondition from './node-components/Condition';
// 审核活动
import NodeJoin from './node-components/Join';
// 自由活动
import NodeFork from './node-components/Fork';
// 路由
import NodeRouterTask from './node-components/RouterTask';
// 子流程
import NodeProcess from './node-components/Process';
// 线
import NodeLine from './node-components/Line';

export default {
    name: 'NodeConfig',
     components: {
      NodeCondition,
      NodeFork,
      NodeJoin,
      NodeRouterTask,
      NodeLine,
      NodeProcess,
    },
    props: {
        // 配置数据源
        data: {
            type: Object,
            default: () => {
                return {};
            }
        },
        // 当前配置节点类型
        type: {
            type: String,
            default: ''
        },
        // 配置对话框显示标识
        visible: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            ConditionF:false,
            JoinF:false,
            ForkF:false,
            TaskF:false,
            ProcessF:false,
            LineF:false,
            visibleF:false,
            // 关闭对话框配置
            closeConfig: false,
            // 对话框显示标识
            dialogVisible: false,
            // 配置表单数据
            formData: this.data,
             // 配置表单校验规则
            configRules: {
                displayName: { required: true, message: '请输入名称', trigger: 'blur' }
            },
            editLineData:{},
            editConData:{},
        };
    },
    computed: {
        title () {
            const typeConfig = {
                Start: '端点配置',
                End: '端点配置',
                Condition: '手工活动配置',
                Fork: '自由活动配置',
                Join: '审核活动配置',
                Task: '路由配置',
                Line: '连接线配置',
                Process: '子流程配置',
            };
            return typeConfig[this.type] || '保存工作流';
        }
    },
    watch: {
        // 监听配置数据源
        data: {
            handler (obj) {
                this.formData = JSON.parse(JSON.stringify(obj));//console.log(this.formData,obj)
                switch (this.formData.name) {
                    case "Task":
                        this.ConditionF =false
                        this.JoinF =false
                        this.ForkF =false
                        this.TaskF = true
                        this.LineF =false
                        this.ProcessF =false
                        break;
                    case "Fork":
                        this.ConditionF =false
                        this.JoinF =false
                        this.ForkF =true
                        this.TaskF = false
                        this.LineF =false
                        this.ProcessF =false
                        break;
                    case "Join":
                        this.ConditionF =false
                        this.JoinF =true
                        this.ForkF =false
                        this.TaskF = false
                        this.LineF =false
                        this.ProcessF =false
                        break;
                    case "Condition":
                        this.ConditionF =true
                        this.JoinF =false
                        this.ForkF =false
                        this.TaskF = false
                        this.LineF =false
                        this.ProcessF =false
                        this.editConData = this.formData
                        break;
                    case "Line":
                        this.LineF =true;
                        this.JoinF =false
                        this.ForkF =false
                        this.TaskF = false
                        this.ConditionF =false
                        this.ProcessF =false
                        this.editLineData = this.formData
                        
                        break;
                    case "Process":
                        this.ProcessF =true;
                        this.JoinF =false
                        this.ForkF =false
                        this.TaskF = false
                        this.ConditionF =false
                        this.LineF =false
                        
                        break;
                
                    default:
                        break;
                }
                // console.log( this.formData.name)
            },
            deep: true,
            immediate: true
        },
        // 监听对话框显示标识
        dialogVisible (bool) {
            this.$emit('update:visible', bool);
            if(bool){
                 this.visibleF = true;
            }
        },
        // 对话框显示 自动聚焦name输入框
        visible (bool) {
            this.dialogVisible = bool;
           
        }
    },
    methods: {
        // 取消配置操作
        cancelConfig () {
            this.dialogVisible = false;
            this.$refs.workflowConfigForm.resetFields();
            this.$emit('cancel');
        },
        // 执行保存配置操作
        saveConfig () {
            this.$refs.workflowConfigForm.validate(valid => {
                if (!valid) return; 
                this.visibleF = false;
                this.dialogVisible = false;
                // this.$emit('save', this.formData);
            });
        },
        //手工活动保存
        saveFormData(e,e2,e3){console.log(e,e2,e3)
            this.formData = e;
            this.data.mactivity = {
                "code": e.workCode,
                "oid": e.workId,
                "name": e.work,
            };
            this.data.dataType = {
                "code": e.workDataCode,
                "oid": e.workDataId,
                "name": e.workData,
            };
            this.data.hidden = e.checked?1:0;
            this.data.fremark = e.fremark;
            this.data.displayName = e.displayName;
            this.data.orgUnit = {
                "id": e.structureId,
            };  
            //参与者
             switch (e.joinCheckBox) {
                case 1:
                    this.data.permission = 1;
                    this.data.mntNextJoin = 0;
                    this.data.canSkip = 0;
                    this.data.multMail = 0;
                   
                    break;
                case 2:
                    this.data.mntNextJoin = 1;
                    this.data.permission = 0;
                    this.data.canSkip = 0;
                    this.data.multMail = 0;
                    break;
                case 3:
                    this.data.canSkip = 1;
                    this.data.permission = 0;
                    this.data.mntNextJoin = 0;
                    this.data.multMail = 0;
                    break;
                case 4:
                    this.data.multMail = 1;
                    this.data.permission = 0;
                    this.data.mntNextJoin = 0;
                    this.data.canSkip = 0;
                    break;
            
                default:
                    break;
            };
            //参与-表格
            e2.forEach(item => {
                this.data.wfParticipator = {
                    participator:[
                        {
                            "oid":item.oid,
                            //6:表示 选择的是职务
                            "type": item.type,
                            //表达式的值 
                             [item.typeName]:{
                                "oid": item.oid,
                                "code":item.fUsercode,
                                "name":item.fUsername
                            },
                            "expression":item.fUserRemake
                        }
                    ]
                };
            });
            //抄送-表格
            e3.forEach(item => {
                this.data.wfCopyTo = {
                    copyTo:[
                        {
                            "oid":item.oid,
                            "type": item.type,
                            //表达式的值 
                            [item.typeName]:{
                                "oid": item.foid,
                                "code":item.fUsercode,
                                "name":item.fUsername
                            },
                            "expression":item.fUserRemake
                        }
                    ]
                };
            });
            this.dialogVisible = false;
        },
        //连接线保存
        saveLineData(e){
            console.log(e);
            this.data.displayName = e.name;
            switch (e.name ) {
                case '同意':
                        this.data.decisionType = 1
                    break;
                case '不同意':
                        this.data.decisionType = 2
                    break;
                case '待处理':
                        this.data.decisionType = 3
                    break;
                case '其他':
                        this.data.decisionType = 4
                    break;
            
                default:
                    break;
            }
           
        },
         //审核活动保存
        saveJoinData(e,e1,e2,e3,e4,e5){
            console.log(e,e1,e2,e3,e4,e5);
            this.data.displayName = e.name;
            //业务工作
            this.data.mactivity = {
                "code": e.workCode,
                "oid": e.workId,
                "name": e.work,
            };
            //源单据业务
            this.data.srcActivity = {
                "code": e.workDataCode,
                "oid": e.workDataId,
                "name": e.workData,
                'formCtionTypeCon':1
            };
            //业务数据
            this.data.dataType = {
                "code": e.fmclassCode,
                "oid": e.fmclassOid,
                "name": e.fmclassName,
            };
            //组织结构
            this.data.orgUnit = {
                "id": e.structureId,
            };
            this.data.hidden = e.checked?1:0;
            this.data.autoSubmit = e.autoSubmit?1:0;
            this.data.autoHurry = e.autoHurry?1:0;
            this.data.fremark = e.fremark;
            this.data.maxWorkTime = e.maxWorkTime;
            switch (e.timeUnit) {
                case '小时':
                     this.data.timeUnit = 1
                    break;
                case '天':
                     this.data.timeUnit = 2
                    break;
                default:
                    break;
            };
            //审批类型:1:普通,2:并行,3:串行
             switch (e.wfAuditType) {
                case '普通审批':
                     this.data.wfAuditType = 1
                    break;
                case '并行会签':
                     this.data.wfAuditType = 2
                    break;
                case '串行会签':
                     this.data.wfAuditType = 3
                    break;
                default:
                    break;
            }
             //参与者
             switch (e.joinCheckBox) {
                case 1:
                    this.data.permission = 1;
                    this.data.mntNextJoin = 0;
                    this.data.canSkip = 0;
                    this.data.multMail = 0;
                   
                    break;
                case 2:
                    this.data.mntNextJoin = 1;
                    this.data.permission = 0;
                    this.data.canSkip = 0;
                    this.data.multMail = 0;
                    break;
                case 3:
                    this.data.canSkip = 1;
                    this.data.permission = 0;
                    this.data.mntNextJoin = 0;
                    this.data.multMail = 0;
                    break;
                case 4:
                    this.data.multMail = 1;
                    this.data.permission = 0;
                    this.data.mntNextJoin = 0;
                    this.data.canSkip = 0;
                    break;
            
                default:
                    break;
            };
            //参与-表格
            e1.forEach(item => {
                this.data.wfParticipator = {
                    participator:[
                        {
                            "oid":item.oid,
                            //6:表示 选择的是职务
                            "type": item.type,
                            //表达式的值 
                             [item.typeName]:{
                                "oid": item.oid,
                                "code":item.fUsercode,
                                "name":item.fUsername
                            },
                            "expression":item.fUserRemake
                        }
                    ]
                };
            });
            //抄送-表格
            e2.forEach(item => {
                this.data.wfCopyTo = {
                    copyTo:[
                        {
                            "oid":item.oid,
                            "type": item.type,
                            //表达式的值 
                            [item.typeName]:{
                                "oid": item.oid,
                                "code":item.fUsercode,
                                "name":item.fUsername
                            },
                            "expression":item.fUserRemake
                        }
                    ]
                };
            });
            //审核单范围
            this.data.wfViewOtherComments = {
                wfViewOtherComment:[
                    {
                        // "oid":12312,
						// "wfProcessor":"BFPID000000P4F001" -- 选中哪个的审批结点的id
                    }
                ]
            },
           
         //决策类型
         this.data.decisions = {
             decision:[
                 {
                    "decisionType": e4[0].decisionType,
                    "decisionText": e4[0].decisionText,
				}
             ]
         }
        },
        //自由活动
        saveForkData(e){
              this.data.mactivity = {
                "code": e.workCode,
                "oid": e.workId,
                "name": e.work,
            };
            this.data.dataType = {
                "code": e.workDataCode,
                "oid": e.workDataId,
                "name": e.workData,
            };
            this.data.hidden = e.checked?1:0;
            this.data.fremark = e.fremark;
            this.data.displayName = e.name;
        },
         //路由
        saveRouteData(e){
            this.data.hidden = e.checked?1:0;
            this.data.join = e.join?1:0;
            this.data.fremark = e.fremark;
            this.data.displayName = e.name;
            this.data.code = e.code;
        },
    }
};
</script>
<style  lang="scss" scoped>
/deep/ .el-dialog__body{
    padding:20px !important;
    max-height: 500px !important;
}
 /deep/ .el-dialog__header{
     display: block !important;
 }
 /deep/ .el-dialog{
         box-shadow: 5px 4px 50px rgba(0,0,0,.3);
 }
 /deep/ .el-input{
         width: 70%;
 }
 /deep/ .el-textarea .el-input__count{
     background: #fff0;
 }
 /deep/ .el-textarea{
      width: 70%;
 }
 /deep/ .el-form-item__content{
         display: flex;
 }
 /deep/ .el-radio-group{
         line-height: 44px;
    height: 32px;
 }
</style>
