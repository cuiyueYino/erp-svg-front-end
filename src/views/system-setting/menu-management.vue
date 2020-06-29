<template>
    <div>
        <el-card class="box-card">
           <el-row :gutter="24">
                <el-col :span="12">
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-col :span="5">
                            <el-select v-model="formInline.company" placeholder="公司" clearable>
                                <el-option
                                    v-for="item in companyData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                       </el-col>
                    </el-form>
                </el-col>
                 <el-col :span="6" :offset="6">
                    <el-button type="success" icon="el-icon-refresh" plain @click="createMainte">新建</el-button> 
                    <el-button type="success" icon="el-icon-refresh" plain @click="remove">修改</el-button>
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
                <el-col :span="15" :offset="1">
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
        <NewMenupage  :rowNMMtype="rowNMMtype" :rowNMMDataObj="rowNMMDataObj" @changeShow="showAddMenu"/>
    </div>
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
import NewMenupage from './new-menu-management.vue'
export default {
    name:'workProcess',
    components: {
      DynamicTable,
      NewMenupage
    },
    data(){
        return{
            companyData:new proData().company,
            formInline: {
                company:'_DefaultCompanyOId'
            },
            rowNMMtype:false,
            rowNMMDataObj:{},
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
                    key: 'name',
                    title: '业务功能'
                },
                {
                    key: 'name',
                    title: '显示顺序'
                },
                {
                    key: 'name',
                    title: '是否可见'
                },
                {
                    key: 'name',
                    title: '显示位置'
                },
                {
                    key: 'name',
                    title: '提示信息'
                },
                {
                    key: 'roletype',
                    title: '链接'
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
        }
    },
    methods:{
        remove(){},
        //创建菜单详情页
        createMainte(){
            this.rowNMMtype = true;
            let finandata={};
            finandata.finanrowname="";
            finandata.finanrowId="";
            finandata.nametitle="菜单管理";
            this.rowNMMDataObj=finandata;
        },
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
        showAddMenu(data,type){
            if(type === false){
                this.rowNMMtype = false
            }else{
                this.rowNMMtype = true
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