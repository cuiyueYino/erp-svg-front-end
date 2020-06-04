<template>
<!-- 弹出框内容 -->
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :modal="false"
        :close-on-click-modal="closeConfig"
        :close-on-press-escape="closeConfig"
        @closed="closeDialog"
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
         <el-form-item label="业务编码" >
            <el-input clearable size="small" v-model="formData.formCode" placeholder="请输入条件值"></el-input>
        </el-form-item>
        <el-form-item label="业务名称" >
            <el-input clearable size="small" v-model="formData.formName" placeholder="请输入条件值"></el-input>
        </el-form-item>
         <el-form-item label="业务数据" >
            <el-input clearable size="small" v-model="formData.formData" placeholder="请输入条件值"></el-input>
            <img class="icon-search" @click="baseInputTable('审核','业务数据查询 ')" src="../../../assets/img/search.svg">
        </el-form-item>
        <el-form-item >
            <el-checkbox v-model="checked">可查看其他审批意见</el-checkbox>
        </el-form-item>
        <el-form-item label="描述" >
            <el-input maxlength="1000"  autosize show-word-limit type="textarea" v-model="formData.fremark"></el-input>
        </el-form-item>
           
               
         </el-form>
        
        
        
         
          <el-row :gutter="20">
            <el-col :span="13" style="text-align: right;margin-top: 18px;">
                <el-button  size="small" @click="saveConfig">确定</el-button>
            </el-col>
            
        </el-row>
         <!-- 第三层弹窗 -->
            <base-info-dialog class="children-dialog" :visible="baseInputTableF" :type="baseInputType" :title="baseInputTitle" @closeDialog="closeBaseInfo"></base-info-dialog>
    </el-dialog>
</template>

<script>

import baseInfoDialog from './base-info-dialog'

export default {
    name: 'joinDialog',
     components: {
         baseInfoDialog,
    },
    props: {
        type:{
            type: String,
            default: ''
        },
        // 当前配置节点类型
        title: {
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
            baseInputTableF:false,
            baseInputTitle:'',
            baseInputType:'',
            checked:false,
            formLabelWidth: '120px',
            searchKeyW:'',
            options: [],
            radio:'1',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            tableLoading:false,
            // 关闭对话框配置
            closeConfig: false,
            // 对话框显示标识
            dialogVisible: this.visible,
            // 配置表单数据
            formData: {},
            gridData:[],
            multipleSelection: [],
             // 配置表单校验规则
            configRules: {
                name: { required: true, message: '请输入英文名', trigger: 'blur' },
                displayName: { required: true, message: '请输入名称', trigger: 'blur' },
                performType: { required: true, message: '请选择参与类型', trigger: 'change' }
            },
        };
    },
    computed: {
    },
    watch: {
         // 对话框显示 自动聚焦name输入框
        visible (bool) {
            this.dialogVisible = bool;
        }
    },
    methods: {
         handleNodeClick(data) {
        console.log(data);
      },
        closeDialog(){
            this.$emit('closeDialog')
        },
         baseInputTable(str,title){ 
            this.baseInputTableF = true;
            this.baseInputTitle= title
            this.baseInputType = str;
        },
        closeBaseInfo(){
            this.baseInputTableF = false;
        },
        searchKey(){
            
        },
        reWorkSearchTable(){

        },
        workSearchTable(){

        },
        saveConfig(){
            this.$emit('closeDialog')
        },
        onCurrentChange(){

        },
        onSelectionChange(){
            
        },
    }
};
</script>
<style  lang="scss" scoped>
/deep/ .el-dialog__body{
    padding:20px !important;
    max-height: 500px !important;
}
form{
    margin-bottom: 154px;
}
.user-class{
    /deep/ .el-form-item__label{
    width: 50px !important;
    }
    /deep/ .el-form-item__content{
        margin-left: 50px !important;
    }
    .tree-class{
        height: 310px;
        overflow: auto;
    }
}
.icon-search{
     width: 24px;
     height: auto;
     margin-left: 12px;
     cursor: pointer;
 }
 .job-class{
     /deep/ .el-form-item__content{
          width: 64%;
     }
        
 }

</style>
