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
            <el-form-item label="业务编码" prop="fcode">
                <el-input clearable size="small" v-model="formData.fcode" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="业务名称" prop="fname">
                <el-input clearable size="small" v-model="formData.fname" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="业务数据" prop="prosessData">
                <el-input clearable size="small" v-model="formData.prosessData" placeholder="请输入"></el-input>
                <el-button type="primary" size="mini" icon="el-icon-search" @click="baseInputTable('审核','业务数据查询 ')"></el-button>
                <!-- <img class="icon-search" @click="baseInputTable('审核','业务数据查询 ')" src="../../../assets/img/search.svg">-->
            </el-form-item>
            <el-form-item label="描述"  prop="fremark">
                <el-input maxlength="1000"  autosize show-word-limit type="textarea" v-model="formData.fremark"></el-input>
            </el-form-item>   
        </el-form>
        <el-row :gutter="20">
            <el-col :span="13" style="text-align: right;margin-top: 18px;">
                <el-button  type='success' icon='el-icon-check' size="small" @click="saveConfig('workflowConfigForm')">确定</el-button>
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
            fmclass:'',
            baseInputTableF:false,
            baseInputTitle:'',
            baseInputType:'',
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
            formData: {
                fcode:'',
                fname:'',
                prosessData:'',
                fremark:'',
                fmfunctiontypecon:3,
                fmclass:'',
            },
            gridData:[],
            multipleSelection: [],
             // 配置表单校验规则
            configRules: {
                fname: { required: true, message: '请输入名称', trigger: 'blur' },
                fcode: { required: true, message: '请输入编码', trigger: 'blur' },
                prosessData: { required: true, message: '请选择业务数据', trigger: 'change' }
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
            this.$refs['workflowConfigForm'].resetFields();
            this.$emit('closeDialog')
        },
        baseInputTable(str,title){ 
            this.baseInputTableF = true;
            this.baseInputTitle= title
            this.baseInputType = str;
        },
        closeBaseInfo(tableData){
            this.baseInputTableF = false;
            if(tableData.length > 0){
                this.formData.prosessData = tableData[0].fname;
                this.formData.fmclass = tableData[0].foid;
            }else{
                this.formData.prosessData = '';
                this.formData.fmclass = '';
            }
        },
        searchKey(){
            
        },
        reWorkSearchTable(){

        },
        workSearchTable(){

        },
        saveConfig(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$api.svg.addProcessActivity(this.formData).then(res=>{
                        if(res.data.code != 999){
                            if(res.data.data.msg == 'success'){
                                this.$emit('closeDialog')
                            }
                        }else {
                            this.$message.error(res.data.msg+'!');
                        }
                    },error=>{
                        console.log(error)
                    })
                } else {
                    return false;
                }
            }); 
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
    max-height: 580px !important;
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
