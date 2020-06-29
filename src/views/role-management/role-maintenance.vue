<template>
    <div>
        <!-- 搜索框 -->
        <el-card class="box-card">
           <el-row :gutter="24">
                <el-col :span="12">
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-col :span="5">
                            <el-form-item >
                                <el-select v-model="region" placeholder="请选择">
                                <el-option label="名称" value="shanghai"></el-option>
                                <el-option label="编码" value="beijing"></el-option>
                                <el-option label="缺省管理角色" value="miaoshu"></el-option>
                                <el-option label="状态" value="gongsi"></el-option>
                                <el-option label="角色类别" value="type"></el-option>
                                </el-select>
                            </el-form-item>
                       </el-col>
                        <el-form-item >
                            <el-input clearable v-model="formCode" placeholder="请输入任意查询内容"></el-input>
                        </el-form-item>
                    
                        <el-form-item>
                            <el-button type="primary" plain @click="onSubmit">搜索</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" plain @click="getAll" class="search-all">显示全部信息</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                 <el-col :span="10" :offset="2">
                    <el-button type="success" icon="el-icon-refresh" plain @click="createRoleMainte">新建</el-button> 
                    <el-button type="success" icon="el-icon-refresh" plain @click="remove">修改</el-button>
                    <el-button type="success" icon="el-icon-search" plain @click="remove">复制</el-button>
                    <el-button type="danger" icon="el-icon-notebook-2" plain @click="remove">删除</el-button>
                 </el-col>
            </el-row>
        </el-card>
        <el-card>
            <el-row>
                <el-col :span="6">
                    <el-tree
                        :data="treeData"
                        :props="defaultProps"
                        node-key="id"
                        :render-content="renderContent"
                        accordion
                        @node-click="handleNodeClick">
                    </el-tree>
                </el-col>
                <el-col :span="12" :offset="3">
                    <dynamic-table
                        :columns="columns"
                        :table-data="tableData"
                        :total="total"
                        :page-num="pageNum"
                        :page-size="pageSize"
                        @current-change="onCurrentChange"
                        @selection-change="onSelectionChange"
                        :tableRowClassName="tableRowClassName"
                        v-loading="false"
                        element-loading-text="加载中"
                    ></dynamic-table>
                </el-col>
            </el-row>
        </el-card>
        <Nrmaintenpage  :rowNRMtype="rowNRMtype" :rowNRMDataObj="rowNRMDataObj" @changeShow="showAddUserFinace"/>
    </div>
</template>
<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import Nrmaintenpage from './new-role-maintenance.vue'
export default {
    name:'workProcess',
    components: {
      DynamicTable,
      Nrmaintenpage
    },
    data() {
        return {
            rowNRMDataObj:{},
            rowNRMtype:false,
            region:'',
            formCode:'',
            pageNum: 1,
            pageSize: 10,
            total: 2,
            columns: [
                {
                    type: 'selection'
                },
                {
                    key: 'fcode',
                    title: '编码'
                },
                {
                    key: 'name',
                    title: '名称'
                },
                {
                    key: 'roletype',
                    title: '角色类型'
                },
                {
                    key: 'remake',
                    title: '描述'
                },
            ],
            tableData:[
                {
                    fcode:'0001',
                    name:'wqwqw',
                    roletype:'3qqw',
                    remake:'qww'
                }
            ],
            treeData:[
                {
                    label: '角色类别',
                    id:'company01',
                    type:'company',
                    children: [
                        {
                            label: '个人事务角色',
                            id:'duties03',
                            type:'duties',  
                        },
                        {
                            label: '公司架构角色-财务',
                            id:'department01',
                            type:'department',
                            children: [
                                {
                                label: '石化财务',
                                id:'duties01',
                                type:'duties',
                                },
                                {
                                label: '收费员',
                                id:'duties02',
                                type:'duties',
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            checked:''
        }
    },
    created(){
        this.$nextTick(()=>{
        })
    },
    computed:{
        
    },
    methods:{
        remove(){},
        onSubmit(){},
        getAll(){},
        renderContent(h, { node, data, store }) {
            if(data){
                if(data.type =="company"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-folder-opened"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    )
                }else if(data.type=="department"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-folder"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    )
                }else if(data.type=="duties"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-document"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    )
                }
            }  
        },
        //树结构点击事件
        handleNodeClick(data) {
            let treeType=data.type;
        },
        onCurrentChange(){

        },
        onSelectionChange(){

        },
        tableRowClassName(){

        },
        //创建角色详情页
        createRoleMainte(){
            this.rowNRMtype = true;
            let finandata={};
            finandata.finanrowname="";
            finandata.finanrowId="";
            finandata.nametitle="角色维护";
            this.rowNRMDataObj=finandata;
        },
        //角色详情页返回数据处理
        showAddUserFinace(data,type){
            if(type === false){
                this.rowNRMtype = false
            }else{
                this.rowNRMtype = true
            }
        }
    }
}
</script>
<style lang="scss" scoped>
 /deep/ .el-textarea .el-input__count{
     background: #fff0;
 }
/deep/ .el-select{
    width: 100%;
}
 /deep/ .el-dropdown-menu__item{
    padding: 0;
}
.el-dropdown-link {
cursor: pointer;
color: #409EFF;
margin-right: 10px;
}
.el-icon-arrow-down {
font-size: 12px;
}
.box-card:first-child{
    margin-bottom: 16px;
}
.search-all{
    margin-left: 50px;
}
.dataForm {
    margin-top: 10px;
}
.elrowStyle {
    margin-top: 20px;
}
.elColCenter {
    text-align: center;
}
.pbackground {
    text-align: center;
    height: 30px;
    font-size: 15px;
    line-height: 30px;
    background-color: skyblue;
}
</style>
<style lang='scss'>
.replydiag {
    .el-textarea__inner {
        min-height: 300px !important;
    }
}
.el-dialog__body{
    padding: 0;
}
.el-card__header{
    padding: 10px 20px;
}
</style>