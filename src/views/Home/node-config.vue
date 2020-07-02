<template>
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
        <node-condition :visible = visible?(ConditionF?true:false):false  > </node-condition>
        <node-fork :visible = visible?(ForkF?true:false):false></node-fork>
        <node-join :visible = visible?(JoinF?true:false):false></node-join>
        <node-router-task :visible = visible?(TaskF?true:false):false></node-router-task>
        <node-line :visible = visible?(LineF?true:false):false></node-line>
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
            LineF:false,
            // 关闭对话框配置
            closeConfig: false,
            // 对话框显示标识
            dialogVisible: this.visible,
            // 配置表单数据
            formData: this.data,
             // 配置表单校验规则
            configRules: {
                name: { required: true, message: '请输入英文名', trigger: 'blur' },
                displayName: { required: true, message: '请输入名称', trigger: 'blur' },
                performType: { required: true, message: '请选择参与类型', trigger: 'change' }
            },
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
                Line: '连接线配置'
            };
            return typeConfig[this.type] || '保存工作流';
        }
    },
    watch: {
        // 监听配置数据源
        data: {
            handler (obj) {
                this.formData = JSON.parse(JSON.stringify(obj));//console.log(this.formData,11)
                switch (this.formData.name) {
                    case "Task":
                        this.ConditionF =false
                        this.JoinF =false
                        this.ForkF =false
                        this.TaskF = true
                        this.LineF =false
                        break;
                    case "Fork":
                        this.ConditionF =false
                        this.JoinF =false
                        this.ForkF =true
                        this.TaskF = false
                        this.LineF =false
                        break;
                    case "Join":
                        this.ConditionF =false
                        this.JoinF =true
                        this.ForkF =false
                        this.TaskF = false
                        this.LineF =false
                        break;
                    case "Condition":
                        this.ConditionF =true
                        this.JoinF =false
                        this.ForkF =false
                        this.TaskF = false
                        this.LineF =false
                        break;
                    case "Line":
                        this.LineF =true
                        this.JoinF =false
                        this.ForkF =false
                        this.TaskF = false
                        this.ConditionF =false
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
                this.$emit('save', this.formData);
                this.dialogVisible = false;
            });
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
