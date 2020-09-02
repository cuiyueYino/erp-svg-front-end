<template>
<div>
<!-- 弹出框内容 -->
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :modal="false"
        :show-close="false"
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
        <node-condition :visible = visibleF?(ConditionF?true:false):false :data="editConData?editConData:null" @saveFormData="saveConFormData" > </node-condition>
        <node-fork :visible = visibleF?(ForkF?true:false):false :data="editForkData?editForkData:null" @saveFormData="saveForkData" ></node-fork>
        <node-join :visible = visibleF?(JoinF?true:false):false :data="editJoinData?editJoinData:null"  @saveFormData="saveJoinData" ></node-join>
        <node-router-task :visible = visibleF?(TaskF?true:false):false :data="editRouterData?editRouterData:null" @saveFormData="saveRouteData"  ></node-router-task>
        <node-process :visible = visibleF?(ProcessF?true:false):false :data="sditProcessData?sditProcessData:null"  @saveFormData="saveProcessData"  ></node-process>
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
            cancelORSave:'',
            // 配置表单数据
            formData: {},
             // 配置表单校验规则
            configRules: {
                displayName: { required: true, message: '请输入名称', trigger: 'blur' }
            },
            editLineData:{},
            editConData:{},
            editRouterData:{},
            editForkData:{},
            editJoinData:{},
            sditProcessData:{},
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
                Subprocess: '子流程配置',
            };
            return typeConfig[this.type] || '保存工作流';
        }
    },
    watch: {
        // 监听配置数据源
        // 因为配置取消功能，注释掉关于data的监听
        // 监听对话框显示标识
        dialogVisible (bool) {
            this.$emit('update:visible', bool);
            if(bool){
                //监听配置数据源
                this.formData = JSON.parse(JSON.stringify(this.data));
                switch (this.formData.name) {
                    case "Task":
                        this.TaskF = true
                        this.ConditionF =false
                        this.JoinF =false
                        this.ForkF =false
                        this.LineF =false
                        this.ProcessF =false
                        this.editRouterData = this.formData
                        break;
                    case "Fork":
                        this.ConditionF =false
                        this.JoinF =false
                        this.ForkF =true
                        this.TaskF = false
                        this.LineF =false
                        this.ProcessF =false
                        this.editForkData = this.formData
                        break;
                    case "Join":
                        this.ConditionF =false
                        this.JoinF =true
                        this.ForkF =false
                        this.TaskF = false
                        this.LineF =false
                        this.ProcessF =false
                        this.editJoinData = this.formData
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
                    case "Subprocess":
                        this.ProcessF =true;
                        this.JoinF =false
                        this.ForkF =false
                        this.TaskF = false
                        this.ConditionF =false
                        this.LineF =false
                        this.sditProcessData = this.formData
                        break;
                    default:
                        break;
                }
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
            //this.dialogVisible = false;
            // this.$refs.workflowConfigForm.resetFields();
            //this.$emit('cancel');
            this.visibleF = false;
            this.dialogVisible = false;
            this.cancelORSave="CANCEL";
        },
        // 执行保存配置操作
        saveConfig () {
            this.visibleF = false;
            this.dialogVisible = false;
            this.cancelORSave="SAVE";
        },
        //手工活动保存
        saveConFormData(e,e2,e3){ 
            console.log(e,e2,e3)
            if(this.cancelORSave ==='CANCEL'){
                return;
            }
            if( e.displayName =='' || e.work =='' || e.checkedCities.length ==0 || e2.length==0 ){
                this.$message.error("保存失败,请填写必填信息");
                return;
            }
            this.formData = e;
            this.data.oid = e.oid;
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
            this.data.permission=null;
            this.data.mntNextJoin=null;
            this.data.canSkip=null;
            this.data.multMail=null;
             e.checkedCities.forEach(item => {
                  switch (item) {
                    case '由权限控制':
                        this.data.permission = 1;
                        break;
                    case '手工指定下一节点参与者':
                        this.data.mntNextJoin = 1;
                        break;
                    case '可略过':
                        this.data.canSkip = 1;
                        break;
                    case '多封邮件':
                        this.data.multMail = 1;
                        break;
                    default:
                        break;
                };
              })
            //参与-表格
            let wfParticipatorObj;
            if(this.data.wfParticipator){
                this.data.wfParticipator.participator=[];    
            }else{
                this.data.wfParticipator={
                    participator:[]
                }
            }
            e2.forEach(item => {
                    wfParticipatorObj = 
                        {
                            "oid":item.oid?item.oid:'',
                            //6:表示 选择的是职务
                            "type": item.type,
                            //表达式的值 
                            [item.typeName]:{
                                "oid": item.fUseroid?item.fUseroid:'',
                                "code":item.fUsercode,
                                "name":item.fUsername
                            },
                            "expression":item.typeName=="expression"?item.fUsername:item.fUserRemake
                        }
                this.data.wfParticipator.participator.push(wfParticipatorObj)
            });
            //抄送-表格
            let  copyToObj;
            if(this.data.wfCopyTo){
                this.data.wfCopyTo.copyTo=[];    
            }else{
                this.data.wfCopyTo={
                    copyTo:[]
                }
            }
            e3.forEach(item => {
                copyToObj =
                        {
                           "oid":item.oid?item.oid:'',
                            "type": item.type,
                            //表达式的值 
                            [item.typeName]:{
                                "oid": item.fUseroid?item.fUseroid:item.oid,
                                "code":item.fUsercode,
                                "name":item.fUsername
                            },
                            "expression":item.typeName=="expression"?item.fUsername:item.fUserRemake
                        }
                this.data.wfCopyTo.copyTo.push(copyToObj)
            });
            this.data.isSaveFlag=true;
            this.dialogVisible = false;
            
        },
        //连接线保存
        saveLineData(e){
            console.log(e);
            if(this.cancelORSave ==='CANCEL'){
                return;
            }
             if( e.displayName =='' || e.code ==''){
                this.$message.error("保存失败,请填写必填信息");
                return;
            }
            this.data.oid = e.oid;
            this.data.otherwise =e.otherwise;
            this.data.expression =e.conditional;
            this.data.lineexpression=e.conditional;
            this.data.lineotherwise=e.otherwise;
            this.data.code =e.code;
            this.data.linefcode =e.code;
            this.data.displayName = e.name;
            this.data.fremark = e.fremark;
            this.data.lineremark= e.fremark;
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
            this.data.service={
                "oid": e.serviceOid?e.serviceOid:e.oid,
                "code":e.serviceCode,
                "name":e.baseInputServe,
                "expression":e.baseTextarea
            }
            this.data.isSaveFlag=true;
        },
         //审核活动保存
        saveJoinData(e,e1,e2,e3,e4,e5){
            console.log(e,e1,e2,e3,e4,e5);
            if(this.cancelORSave ==='CANCEL'){
                return;
            }
             if( e.name =='' || e.work =='' || e.checkedCities.length ==0  || e4.length==0 ){
                this.$message.error("保存失败,请填写必填信息");
                return;
            }
            if(e.wfAuditType=='并行会签' || e.wfAuditType=='串行会签'){
                if(!e1 || e1.length < 2){
                    this.$message.error("保存失败,并行会签和串行会签参与者必须多人!");
                    return;
                }
            }
            this.data.oid = e.oid;
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
            this.data.autoSubmit = e.autoSubmit?1:0;
            this.data.autoHurry = e.autoHurry?1:0;
            this.data.fremark = e.fremark;
            this.data.maxWorkTime = e.maxWorkTime;
            this.data.timeUnit = 1;
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
            this.data.permission=null;
            this.data.mntNextJoin=null;
            this.data.canSkip=null;
            this.data.multMail=null;
              e.checkedCities.forEach(item => {
                  switch (item) {
                    case '由权限控制':
                        this.data.permission = 1;
                        break;
                    case '手工指定下一节点参与者':
                        this.data.mntNextJoin = 1;
                        break;
                    case '可略过':
                        this.data.canSkip = 1;
                        break;
                    case '多封邮件':
                        this.data.multMail = 1;
                        break;
                
                    default:
                        break;
                };
              })
             
            //参与-表格
            let  participatorObj;
            if(this.data.wfParticipator){
                this.data.wfParticipator.participator=[];   
            }else{
                this.data.wfParticipator={
                    participator:[]
                }
            }
            e1.forEach(item => {
              participatorObj=
                        {
                            "oid":item.oid?item.oid:'',
                            //6:表示 选择的是职务
                            "type": item.type,
                            //表达式的值 
                             [item.typeName]:{
                                "oid": item.fUseroid?item.fUseroid:item.oid,
                                "code":item.fUsercode,
                                "name":item.fUsername
                            },
                            "expression":item.typeName=="expression"?item.fUsername:item.fUserRemake
                        }
                this.data.wfParticipator.participator.push(participatorObj)
            });
            
            //抄送-表格
            let  copyToObj;
            if(this.data.wfCopyTo){
                this.data.wfCopyTo.copyTo=[];    
            }else{
                this.data.wfCopyTo={
                    copyTo:[]
                }
            }
            e2.forEach(item => {
                    copyToObj =
                        {
                           "oid":item.oid?item.oid:'',
                            "type": item.type,
                            //表达式的值 
                            [item.typeName]:{
                                "oid": item.fUseroid?item.fUseroid:item.oid,
                                "code":item.fUsercode,
                                "name":item.fUsername
                            },
                            "expression":item.typeName=="expression"?item.fUsername:item.fUserRemake
                        }
                this.data.wfCopyTo.copyTo.push(copyToObj)
            });
            //审核单范围
            let  wfViewOtherCommentObj;
            if(this.data.wfViewOtherComments){
                this.data.wfViewOtherComments.wfViewOtherComment=[];    
            }else{
                this.data.wfViewOtherComments={
                    wfViewOtherComment:[]
                }
            }
             e3.forEach(item => {
                    wfViewOtherCommentObj=
                        {
                            "oid":'',
                            "wfProcessor": item.wfProcessor //-- 选中哪个的审批结点的id
                        }
                this.data.wfViewOtherComments.wfViewOtherComment.push(wfViewOtherCommentObj)
             })
            
           
            //决策类型
            let decisionsObj;
            if(this.data.decisions){
                this.data.decisions.decision=[];    
            }else{
                this.data.decisions={
                    decision:[]
                }
            }
            e4.forEach(item => {
                decisionsObj = 
                    {
                        "decisionType": item.decisionType,
                        "decisionText": item.decisionText,
                    }
                this.data.decisions.decision.push(decisionsObj)
            })
            this.data.isSaveFlag=true;
        },
        //自由活动
        saveForkData(e){
            if(this.cancelORSave ==='CANCEL'){
                return;
            }
            if( e.name =='' || e.work ==''){
                this.$message.error("保存失败,请填写必填信息");
                return;
            }
            this.data.oid = e.oid;
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
            this.data.isSaveFlag=true;
        },
         //路由
        saveRouteData(e){console.log(e)
            if(this.cancelORSave ==='CANCEL'){
                return;
            }
            if( e.name =='' || e.code ==''){
                this.$message.error("保存失败,请填写必填信息");
                return;
            }
            this.data.oid = e.oid;
            this.data.hidden = e.checked?1:0;
            this.data.join = e.join?1:0;
            this.data.fremark = e.fremark;
            this.data.displayName = e.name;
            this.data.code = e.code;
            this.data.isSaveFlag=true;
        },
        //子流程
        saveProcessData(e){
            if(this.cancelORSave ==='CANCEL'){
                return;
            }
            console.log(e)
            if( e.name =='' || !e.refWfProcess || e.code ==''  ){
                this.$message.error("保存失败,请填写必填信息");
                return;
            }
            this.data.oid = e.oid;
            this.data.refWfProcess = e.refWfProcess;
            this.data.fremark = e.fremark;
            this.data.displayName = e.name;
            this.data.code = e.code;
            this.data.isSaveFlag=true;
        },
    }
};
</script>
<style  lang="scss" scoped>
/deep/ .el-dialog__body{
    padding:20px !important;
    max-height: 580px !important;
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
