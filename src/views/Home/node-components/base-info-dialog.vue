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
            v-show="type !== '用户'"
            :model="formData"
            label-width="97px"
            label-suffix="："
            label-position="right"
            ref="workflowConfigForm"
            :rules="configRules"
            size="small"
            @submit.native.prevent
        >
         <!-- 搜索框 -->
             <el-row :gutter="24">
                  <el-col :span="8" v-show=" type !=='审核'">
                    <el-form-item label="编码" label-width="43px">
                        <el-input clearable size="small" v-model="formData.formCode" placeholder="请输入条件值"></el-input>
                    </el-form-item>
                  </el-col> 
                  <el-col :span="8"  v-show=" type !=='审核'">
                    <el-form-item label="名称" label-width="43px">
                        <el-input clearable size="small" v-model="formData.formName" placeholder="请输入条件值"></el-input>
                    </el-form-item>
                  </el-col> 
                 
                  <el-col :span="8" v-show="type !=='服务' && type !=='审核'">
                    <el-form-item label="状态" label-width="43px">
                         <el-select v-model="formData.formCtionTypeCon" clearable placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        
                    </el-form-item>
                  </el-col> 
                <el-col :span="6" :offset="2" v-show="type ==='服务'">
                    <el-button type="primary" size="small" plain @click="reWorkSearchTable">重置</el-button>
                    <el-button type="primary" size="small" plain @click="workSearchTable">搜索</el-button>
                </el-col>
             </el-row>
             <el-row :gutter="24" >
                <el-col :span="8" v-show="type !=='服务'  && type !=='审核'">
                    <el-form-item :label="type ==='职务'?'公司':'角色类别'" :label-width="type ==='职务'?'43px':'70px'">
                         <el-select v-model="formData.formCtionTypeCon" clearable placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col> 
                 <el-col :span="10" v-show="type ==='角色'">
                     <el-form-item label="缺省管理员角色" label-width="112px">
                 <el-radio-group v-model="radio">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
                 </el-form-item>
                </el-col> 
                 <el-col :span="10" v-show="type ==='职务'" class="job-class">
                     <el-form-item label="职务类型" label-width="70px">
                     <el-input clearable size="small" v-model="formData.formName" placeholder="请输入条件值"></el-input>
                    <img class="icon-search" src="../../../assets/img/search.svg" >
                 </el-form-item>
                  
                </el-col> 
                 <!-- 审核-业务数据 -->
                  <span v-show="type ==='审核'">
                    <el-col :span="12">
                    <el-form-item label="编码" label-width="56px">
                        <el-input clearable size="small" v-model="formData.formCode" placeholder="请输入条件值"></el-input>
                    </el-form-item>
                  </el-col> 
                  <el-col :span="12">
                    <el-form-item label="名称" label-width="56px">
                        <el-input clearable size="small" v-model="formData.formName" placeholder="请输入条件值"></el-input>
                    </el-form-item>
                  </el-col> 
                  <el-col :span="12">
                    <el-form-item label="超类编码" label-width="84px">
                        <el-input clearable size="small" v-model="formData.formName" placeholder="请输入条件值"></el-input>
                    </el-form-item>
                  </el-col> 
                  </span>
                <el-col :span="6" v-show="type !=='服务'">
                    <el-button type="primary" size="small" plain @click="reWorkSearchTable">重置</el-button>
                    <el-button type="primary" size="small" plain @click="workSearchTable">搜索</el-button>
                </el-col>
             </el-row>
               
         </el-form>
         <el-row class="user-class">
            <el-col  v-show="type === '用户'" :span="12" class="tree-class">
                <!-- 树状图 -->
                <el-tree
                    v-show="type === '用户'"
                    :data="treeData"
                    :props="defaultProps"
                    accordion
                    @node-click="handleNodeClick">
                </el-tree>
            </el-col>
            <el-col :span="type === '用户'?12:24" >
                <el-row :gutter="24" v-show="type === '用户'">
                    <el-col :span="18">
                        <el-form-item label="搜索" >
                            <el-input v-model="searchKeyW" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" plain  size="small" @click="searchKey">查询</el-button>
                    </el-col>
               </el-row>
                 
                 
                <!-- 表格 -->
                <dynamic-table
                    class="workTable"
                    :height="310"
                    :columns="columns3"
                    :table-data="gridData"
                    :total="total"
                    :page-num="pageNum"
                    :page-size="pageSize"
                    @current-change="onCurrentChange"
                    @selection-change="onSelectionChange"
                    v-loading="tableLoading"
                    element-loading-text="加载中"
                ></dynamic-table>
            </el-col>
        </el-row>
        
        
         
          <el-row :gutter="20">
            <el-col :span="13" style="text-align: right;margin-top: 18px;">
                <el-button  size="small" @click="saveConfig">确定</el-button>
            </el-col>
            
        </el-row>
    </el-dialog>
</template>

<script>

import DynamicTable from '../../../components/common/dytable/dytable.vue';


export default {
    name: 'baseInfoDialog',
     components: {
      DynamicTable,
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
            columns3: [
                {
                    type: 'selection'
                },
                {
                    key: 'fcode',
                    title: '编码'
                },
                {
                    key: 'fname',
                    title: '名称'
                },
                {
                    key: 'fname',
                    title: '角色类别'
                },
                {
                    key: 'fremark',
                    title: '描述'
                },
                {
                    key: 'fname',
                    title: '缺省管理员'
                },
            ],
            treeData:[
                {
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                        label: '三级 1-1-1'
                        }]
                    }]
                },{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                        label: '三级 1-1-1'
                        }]
                    }]
                },
            ],
             defaultProps: {
                children: 'children',
                label: 'label'
             },
        };
    },
    computed: {
        // title () {
        //     const typeConfig = {
        //         Start: '端点配置',
        //         End: '端点配置',
        //         Condition: '手工活动配置',
        //         Fork: '自由活动配置',
        //         Join: '审核活动配置',
        //         Task: '路由配置',
        //         Line: '连接线配置'
        //     };
        //     return typeConfig[this.type] || '保存工作流';
        // }
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
        searchKey(){
            
        },
        reWorkSearchTable(){

        },
        workSearchTable(){

        },
        saveConfig(){

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
