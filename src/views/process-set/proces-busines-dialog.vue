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
        :width="type == '用户'?'70%':'50%'"
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
     <!-- 新建用户&角色 -->
     <el-row :gutter="20">
        <el-col  v-show="type === '用户'" :span="8" class="tree-class">
            <h3>用户</h3>
                    <el-col :span="16">
                        <el-form-item label="搜索"  label-width="60px">
                            <el-input v-model="searchKeyW" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="primary" plain  size="small" @click="searchKey">查询</el-button>
                    </el-col>
            <el-col :span="24" class="user-tree">
            <!-- 树状图 -->
            <el-tree
                v-show="type === '用户'"
                :data="treeData"
                :props="defaultProps"
                accordion
                @node-click="handleNodeClick">
            </el-tree>
            </el-col>
        </el-col>
        <el-col  :span="1"  v-show="type == '用户'"  class="tree-class">
            <el-divider direction="vertical"></el-divider>
         </el-col>
        <el-col  :span="type == '用户'?15:24" class="tree-class">
             <h3  v-show="type == '用户'">角色</h3>
            <!-- 搜索框 -->
             <el-row :gutter="12">
                  <el-col :span="8" >
                    <el-form-item label="编码" label-width="70px">
                        <el-input clearable size="small" v-model="formData.formCode" placeholder="请输入条件值"></el-input>
                    </el-form-item>
                  </el-col> 
                  <el-col :span="8"  >
                    <el-form-item label="名称" label-width="70px">
                        <el-input clearable size="small" v-model="formData.formName" placeholder="请输入条件值"></el-input>
                    </el-form-item>
                  </el-col> 
                  <el-col :span="8" v-show="type !== '用户'">
                     <el-form-item label="虚拟组织" label-width="84px">
                 <el-radio-group v-model="radio">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
                 </el-form-item>
                </el-col> 
                <el-col :span="8"  v-show="type === '用户'">
                     <el-form-item label="缺省管理员角色" label-width="124px">
                 <el-radio-group v-model="radio">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                </el-radio-group>
                 </el-form-item>
                </el-col> 
                
              
             </el-row>
             <el-row :gutter="24" >
                  <el-col :span="8">
                    <el-form-item label="组织类型" v-show="type !== '用户'" label-width="84px">
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
                 <el-col :span="8">
                    <el-form-item label="状态"  v-show="type === '用户'" label-width="70px">
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
                 <el-col :span="8">
                    <el-form-item label="角色类别"  v-show="type === '用户'" label-width="84px">
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
                 <el-col :span="8">
                    <el-form-item label="公司" v-show="type !== '用户'" label-width="70px">
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
               
               
                <el-col :span="6" >
                    <el-button type="primary" size="small" plain @click="reWorkSearchTable">重置</el-button>
                    <el-button type="primary" size="small" plain @click="workSearchTable">搜索</el-button>
                </el-col>
             </el-row>
              <!-- 表格-->
                <dynamic-table
                 v-show=" type !== '用户'"
                    class="workTable"
                    :height="340"
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
                 <dynamic-table
                    v-show=" type == '用户'"
                    class="workTable"
                    :height="340"
                    :columns="columns"
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
         </el-form>
    </el-dialog>
</template>

<script>

import DynamicTable from '../../components/common/dytable/dytable.vue';


export default {
    name: 'procesBusinesDialog',
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
            columns: [
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
                    key: 'fremark',
                    title: '描述'
                },
                {
                    key: 'fname',
                    title: '角色类别'
                },
            ],
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
                    key: 'fremark',
                    title: '描述'
                },
                {
                    key: 'fname',
                    title: '虚拟组织'
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
    max-height: 600px !important;
}
/deep/ .el-input{
         width: 100% !important;

 }
 /deep/ .el-divider--vertical{
     height: 480px;
 }
 /deep/ h3{
     margin-top: 0;
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
.user-tree{
    height: 410px;
    overflow:auto;
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
