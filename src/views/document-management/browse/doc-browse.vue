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
                        @node-click="handleNodeClick">
                        <div slot-scope="{node,data}" class="customize-tree-p">
                          <el-tooltip class="item" effect="dark" :content="data.fname" placement="top-start">
                            <span>{{data.fname|labelShow}}</span>
                          </el-tooltip>
                        </div>
                    </el-tree>
                </el-col>
                <el-col :span="18" :offset="1">
                    <el-card class="box-card">
                        <el-row :gutter="24">
                            <el-col :span="8">
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
                                        <el-button type="primary" icon="el-icon-search" plain @click="findData">查询</el-button>
                                    </el-col>
                                </el-form>
                            </el-col>
                            <el-col :span="2" :offset="14">
                                <el-button type="primary" icon="el-icon-notebook-2" plain @click="showDocumentCategory" >查看</el-button>
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
            flag: '',
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
                    key: 'fdescription',
                    title: '描述'
                },
                {
                    key: 'fcreatorname',
                    title: '创建人'
                },
                {
                    key: 'fcreatetime',
                    title: '创建时间'
                },
                {
                    key: 'fpublishername',
                    title: '发布人'
                },
                {
                    key: 'fpublishtime',
                    title: '发布时间'
                },
                {
                    key: 'fdocstatus',
                    title: '状态'
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
        //生成文档管理树结构
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
        //查看文档管理
        showDocumentCategory(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                  debugger;
                    //验证是否有权限
                    let finandata={};
                    finandata.fdocmanageoid = SelectData[0].foid;
                    finandata.froleid = localStorage.getItem('ms_roles');
                    //测试暂用假数据
                    // finandata.froleid = '7f6496f161c14e2e83a7a5f8aa3b2ece';
                    finandata.fauth = '1';
                    this.$api.documentManagement.isHaveDocAuthority(finandata).then(response => {
                        let responsevalue = response;
                        if (responsevalue.data.data == 1) {
                            this.rowNMMtype = true;
                            let finandata={};
                            finandata.nametitle="文档浏览查看";
                            finandata.NewOrEditFlag="SHOW";
                            finandata.foid=SelectData[0].foid;
                            this.rowNMMDataObj=finandata;
                        } else {
                            this.$message.error("无该文档查看权限!");
                        }
                    });

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
            this.pageNum = val;
            let formDataA ={};
            formDataA.page=val;
            formDataA.size=this.pageSize;
            formDataA.fpid=this.documentFpid
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
            fromdata.fuserid = localStorage.getItem('ms_userId');
            fromdata.fdocstatus = '3';
            this.$api.documentManagement.findDocumentManageByPage(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableArr=returndata.data.rows;
                    this.tableData=tableArr;
                    for (let i = 0; i < tableArr.length; i++) {
                        //时间格式化
                        if(tableArr[i].fcreatetime){
                            tableArr[i].fcreatetime = this.formateDate(tableArr[i].fcreatetime);
                        }
                        if(tableArr[i].fpublishtime){
                            tableArr[i].fpublishtime= this.formateDate(tableArr[i].fpublishtime);
                        }
                    }
                    this.total=returndata.data.total;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        //格式化日期
        formateDate(date){
            let datetime= new Date(date);
            return new Date(Date.UTC(
                    datetime.getFullYear(),
                    datetime.getMonth(),
                    datetime.getDate(),
                    datetime.getHours(),
                    datetime.getMinutes(),
                    datetime.getSeconds()))
                    .toISOString()
                    .slice(0, 19).replace('T',' ');
        },
        //按钮权限控制
        buttonAuthControl(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    let finandata={};
                    finandata.fdocmanageoid = SelectData[0].fdocmanageoid;
                    finandata.froleid = SelectData[0].froleid;
                    finandata.fauth = SelectData[0].fauth;
                    this.$api.documentManagement.findDocumentAuthorityById(finandata).then(response => {
                        let responsevalue = response;
                        if (responsevalue.data == 1) {
                            this.isShowButton = true;
                        } else {
                            this.isShowButton = false;
                        }
                    });
                }else{
                    this.$message.error("请选择一行数据!");
                }
            }



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
