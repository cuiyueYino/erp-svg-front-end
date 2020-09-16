<template>
    <div>
        <el-card>
            <el-row>
                <el-col :span="4" class="treeStyle">
                    <el-tree
                        highlight-current
                        :data="treeData"
                        :props="defaultProps"
                        node-key="foid"
                        accordion
                        @node-click="handleNodeClick"
                        >
                        <div slot-scope="{data}" class="customize-tree-p">
                            <el-tooltip class="item" effect="dark" :content="data.fname" placement="top-start">
                             <span>{{data.fname|labelShow}}</span>
                            </el-tooltip>
                        </div>
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
                                        <el-button type="primary" size="small" icon="el-icon-search" plain @click="findData">查询</el-button>
                                    </el-col>
                                </el-form>
                            </el-col>
                            <el-col :span="9" :offset="3">
                                <el-button type="success" plain icon="el-icon-folder-add" size="small" @click="createDocumentCategory">新增</el-button>
                                <el-button type="warning" plain icon="el-icon-edit-outline" size="small" @click="editDocumentCategory">修改</el-button>
                                <el-button type="danger" icon="el-icon-delete" size="small" plain @click="removeDocumentCategory">删除</el-button>
                                <el-button type="info" plain icon="el-icon-view" size="small" @click="showDocumentCategory">查看</el-button>
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
    //树结构 label 过长，替换显示成"..."结构
    filters: {
        labelShow(value) {
            if(!value) return ''
            if(value.length > 10) {
                return value.slice(0, 10) + '...'
            }
            return value
        }
    },
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
            documentData: new documentData().docCategory,
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
                    title: '文档类别级别'
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
            treeData:[
              {
                foid : '0', //选中树节点时，判断需要foid,所以给个
                fcode : '000',
                fname : '文档类别',
                forder : 1,
                fisportalshow : '0',
                children : []
              }
            ],
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
            this.pageNum = 1;
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
                    //根节点
                    if(SelectData[0].fcode == '000'){
                        this.$message.error("根节点不可以删除!");
                    } else {
                        //文档类别是否被引用
                        let fromdata={};
                        fromdata.page=1;
                        fromdata.size=10;
                        fromdata.fpid=SelectData[0].foid;
                        this.$api.documentManagement.findDocumentCategoryByPage(fromdata).then(response => {
                            let responsevalue = response;
                            if (responsevalue) {
                                let returndata = responsevalue.data;
                                let tableArr=returndata.data.rows;
                                for (let i = 0; i < tableArr.length; i++) {
                                    if(1 == tableArr[i].flevel){
                                        tableArr[i].flevel = '一级';
                                    } else if(2 == tableArr[i].flevel){
                                        tableArr[i].flevel = '二级';
                                    }
                                }
                                this.tableData=tableArr;
                                if(tableArr.length > 1){
                                    this.$message.error("该文档类别已被引用，不可以删除!");
                                } else {
                                    //删除操作
                                    let fromdata={};
                                    fromdata.id=SelectData[0].foid;
                                    this.$api.documentManagement.deleteDocumentCategory(fromdata).then(response => {
                                        let responsevalue = response;
                                        if (responsevalue.data.code == 0 ) {
                                            this.$message.success('删除成功!');
                                            this.reload();
                                        } else {
                                            this.$message.error(responsevalue.data.msg);
                                        }
                                    });
                                }
                            } else {
                                this.$message.success('数据库没有该条数据!');
                            }
                        });
                    }

                }else{
                    this.$message.error("请选择一行数据!");
                }
            }
            //this.maketree();
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
            //校验当前是否为2级菜单
            if(this.documentLevel == 2){
                this.$message.error("不可增加三级菜单!");
            } else {
                if(this.documentFpid){
                    this.rowNMMtype = true;
                    let finandata={};
                    finandata.fpid=this.documentFpid;
                    finandata.nametitle="文档类别维护新增";
                    finandata.NewOrEditFlag="NEW";
                    finandata.flevel= ( this.documentLevel == null || this.documentLevel == '' )? '一级': '二级';
                    this.rowNMMDataObj=finandata;
                } else {
                    this.$message.error("请选择一个文档类别!");
                }
            }
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
            this.pageNum=1;
            this.documentLevel = data.flevel;
            this.documentFpid = data.foid;
            let fromdata={};
            fromdata.page=1;
            fromdata.size=10;
            if(data.foid != 0 && data.fcode!='000'){
                fromdata.fpid=data.foid;
            }
            this.searchMenutable(fromdata);
        },
        //分页，下一页
        onCurrentChange(val){
            this.pageNum = val;
            let formDataA ={};
            formDataA.page=val;
            formDataA.size=this.pageSize;
            formDataA.fpid=this.documentFpid;
            this.searchMenutable(formDataA);
        },
        //table选中事件
        onSelectionChange(data){
            this.multipleSelection = data;
        },
        // 改变table行样式
        tableRowClassName(){},
        //是否展示dialog弹窗 :
        showAddMenu(type,operate){
            if(type === false){
                this.rowNMMtype = false;
            }else{
                this.rowNMMtype = true;
            }
            //弹窗取消或×掉 时不刷新树结构
            if(operate == 0){
                this.reload();
            }
        },
        //生成树
        maketree(){
            this.$api.documentManagement.getDocumentCategoryOrgArch('').then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    this.treeData[0].children = eval('(' + responsevalue.data.data + ')');
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
                    for (let i = 0; i < tableArr.length; i++) {
                        if(1 == tableArr[i].flevel){
                            tableArr[i].flevel = '一级';
                        } else if(2 == tableArr[i].flevel){
                            tableArr[i].flevel = '二级';
                        }
                    }
                    this.tableData=tableArr;
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
   .show-ellipsis {
        display: block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
