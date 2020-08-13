<template>
    <div>
        <el-card>
            <el-row>
                <el-col :span="4" class="treeStyle">
                    <el-tree
                        :data="treeData"
                        :props="defaultProps"
                        node-key="foid"
                        :render-content="renderContent"
                        accordion
                        @node-click="handleNodeClick">
                    </el-tree>
                </el-col>   
                <el-col :span="18" :offset="1">
                    <el-card class="box-card">
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form :inline="true"  class="demo-form-inline">
                                    <el-col :span="8">
                                        <el-select v-model="formInline.document" @change="selectChange" placeholder="-请选择-" clearable>
                                            <el-option
                                                v-for="item in documentData"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-button type="primary" plain @click="findData">查询</el-button>
                                    </el-col>
                                </el-form>
                            </el-col>
                            <el-col :span="9" :offset="3">
                                <el-button type="success" icon="el-icon-plus" plain @click="createDocumentCategory">新建</el-button> 
                                <el-button type="success" icon="el-icon-edit" plain @click="editDocumentCategory">修改</el-button>
                                <el-button type="danger" icon="el-icon-delete" plain @click="removeDocumentCategory">删除</el-button>
                                <el-button type="primary" icon="el-icon-notebook-2" plain @click="showDocumentCategory">查看</el-button>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="18" :offset="1">
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
        <NewDocument  :rowNMMtype="rowNMMtype" :rowNMMDataObj="rowNMMDataObj" @changeShow="showAddMenu"/>
    </div>
</template>
<script>
import proData from '../../../components/common/proData/proData';
import DynamicTable from '../../../components/common/dytable/dytable.vue';
import NewDocument from './new-document.vue';
import documentData from'../base/documentData';

export default {
    name:'workProcess',
    components: {
      DynamicTable,
      NewDocument
    },
    inject: ['reload'],
    data(){
        return{
            documentLevel: '',
            documentFpid:'',
            input: '',
            documentData: new documentData().document,
            formInline: {},
            rowNMMtype:false,
            rowNMMDataObj:{},
            pageNum: 1,
            pageSize: 10,
            total: 20,
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
                    key: 'fisportalshow',
                    title: '是否门户显示'
                },
                {
                    key: 'flevel',
                    title: '文档类别等级'
                },
                {
                    key: 'forder',
                    title: '显示顺序'
                },
                {
                    key: 'fdescription',
                    title: '描述'
                },
            ],
            tableData:[],
            treeData:[],
            firstnode:[],
            multipleSelection:[],
            defaultProps: {
                children: 'children',
                label: 'fname'
            },
        };
    },
    created(){
        this.maketree();
        let fromdata={};
        fromdata.page=this.pageNum;
        fromdata.size=this.pageSize;
        this.searchMenutable(fromdata);
    },
    mounted(){
        //生成文档类别树结构
        this.maketree();
    },
    methods:{
        //查询按钮
        findData(){
            let field = this.formInline.document;
            let fromdata={};
            fromdata.page=this.pageNum;
            fromdata.size=this.pageSize;
            if("fcode" == field){
                fromdata.fcode=this.input;
            } else if ("fname" == field){
                fromdata.fname=this.input;
            } else if ("fdescription" == field){
                fromdata.fdescription=this.input;
            }
            this.searchMenutable(fromdata);
        },
        //下拉框改变
        selectChange(data){
            this.formInline.document=data;
        },
        //删除文档类别维护
        removeDocumentCategory(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    let fromdata={};
                    fromdata.id=SelectData[0].foid;
                    this.$api.documentManagement.deleteDocumentCategory(fromdata).then(response => {
                        let responsevalue = response;
                        if (responsevalue.data.data.msg=="success") {
                            this.$message.success('删除成功!');
                            this.reload();
                        } else {
                            this.$message.error(responsevalue.data.msg);
                        }
                    });
                }else{
                    this.$message.error("请选择一行数据!");
                }
            }
            maketree();
        },
        //查看文档类别维护
        showDocumentCategory(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    this.rowNMMtype = true;
                    let finandata={};
                    finandata.nametitle="文档类别维护查看";
                    finandata.NewOrEditFlag="SHOW";
                    finandata.foid=SelectData[0].foid;
                    this.rowNMMDataObj=finandata;
                }else{
                    this.$message.error("请选择一行数据!");
                }
            }
        },
        //新增文档类别维护
        createDocumentCategory(){
            this.rowNMMtype = true;
            let finandata={};
            finandata.fpid=this.documentFpid;
            finandata.nametitle="文档类别维护新增";
            finandata.NewOrEditFlag="NEW";
            debugger
            finandata.flevel= ( this.documentLevel == null || this.documentLevel == '' )? '一级': '二级';
            this.rowNMMDataObj=finandata;
        },
        //修改文档类别维护
        editDocumentCategory(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    this.rowNMMtype = true;
                    let finandata={};
                    finandata.nametitle="文档类别维护编辑";
                    finandata.NewOrEditFlag="EDIT";
                    finandata.foid=SelectData[0].foid;
                    this.rowNMMDataObj=finandata;
                }else{
                    this.$message.error("请选择一行数据!");
                }
            }
        },
        //树结构节点样式设置
        renderContent(h, { node, data, store }) {
            if(data){
                if(data.flevel == null){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-folder-opened"></i></span>
                            <span style="margin-left: 5px;">{node.data.fname}</span>
                        </span>
                    );
                }else if(data.flevel==1){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-folder"></i></span>
                            <span style="margin-left: 5px;">{node.data.fname}</span>
                        </span>
                    );
                }else if(data.flevel==2){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-document"></i></span>
                            <span style="margin-left: 5px;">{node.data.fname}</span>
                        </span>
                    );
                }
            }  
        },
        //树结构点击事件
        handleNodeClick(data) {
            this.documentLevel = data.flevel;
            this.documentFpid = data.foid;
            let fromdata={};
            fromdata.page=this.pageNum;
            fromdata.size=this.pageSize;
            fromdata.fpid=data.foid;
            this.searchMenutable(fromdata);
        },
        //分页，下一页
        onCurrentChange(val){
            let formDataA ={};
            formDataA.page=val;
            formDataA.size=this.pageSize;
            this.searchMenutable(formDataA);
        },
        //table选中事件
        onSelectionChange(data){
            this.multipleSelection = data;
        },
        // 改变table行样式
        tableRowClassName(){},
        //是否展示dialog弹窗
        showAddMenu(type){
            if(type === false){
                this.rowNMMtype = false;
            }else{
                this.rowNMMtype = true;
            }
            this.reload();
        },
        //生成树
        maketree(){
            this.$api.documentManagement.getDocumentCategoryOrgArch().then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    this.treeData = eval('(' + responsevalue.data.data + ')');
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        //分页查询菜单
        searchMenutable(data){
            let fromdata=data;
            this.$api.documentManagement.findDocumentCategoryByPage(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableArr=returndata.data.rows;
                    this.tableData=tableArr;
                    for (let i = 0; i < tableArr.length; i++) {
                        if(1 == tableArr[i].flevel){
                            tableArr[i].flevel = '一级';
                        } else if(2 == tableArr[i].flevel){
                            tableArr[i].flevel = '二级';
                        }
                    }
                    this.total=returndata.data.total;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            }); 
        },
        
    }
};
</script>

<style lang="scss" scoped>
   .treeStyle{
       height: 400px;
       overflow-y:auto;
   }
</style>