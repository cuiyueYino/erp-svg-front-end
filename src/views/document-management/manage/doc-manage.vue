<template>
    <div>
        <el-card>
            <el-row>
                <el-col :span="4" class="treeStyle">
                    <el-tree
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
                                        <el-input v-model="input" placeholder="请输入内容" v-if="false"></el-input>
                                        <el-date-picker
                                          v-if="true"
                                          clearable
                                          v-model="input"
                                          value-format="yyyy-MM-dd HH:mm"
                                          type="date"
                                          placeholder="选择日期"
                                        ></el-date-picker>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-button type="primary" plain @click="findData">查询</el-button>
                                    </el-col>
                                </el-form>
                            </el-col>
                            <el-col :span="16">
                                <el-button type="success" icon="el-icon-plus" plain @click="createDocumentCategory">新建</el-button>
                                <el-button type="success" icon="el-icon-edit" plain @click="editDocumentCategory()" >修改</el-button>
                                <el-button type="primary" icon="el-icon-top" plain @click="operateDocumentCategory(1)">置顶</el-button>
                                <el-button type="primary" icon="el-icon-bottom" plain @click="operateDocumentCategory(2)">取消置顶</el-button>
                                <el-button type="primary" icon="el-icon-star-on" plain @click="operateDocumentCategory(3)">发布</el-button>
                                <el-button type="primary" icon="el-icon-star-off" plain @click="operateDocumentCategory(4)">取消发布</el-button>
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
        //生成文档管理树结构
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
            } else if ("fbegintime" == field){
                fromdata.fbegintime = this.input;
            } else if ("fendtime" == field){
                fromdata.fendtime=this.input;
            } else if ("fdescription" == field){
                fromdata.fdescription=this.input;
            } else if ("fdocstatus" == field){
                fromdata.fdocstatus=this.input;
            }
            this.searchMenutable(fromdata);
        },
        //下拉框改变
        selectChange(data){
            this.formInline.document=data;
        },
        //删除文档管理
        // removeDocumentCategory(){
        //     let SelectData=this.multipleSelection;
        //     if(SelectData.length > 1){
        //         this.$message.error("只能选择一个!");
        //     }else{
        //         if(SelectData[0]){
        //             let fromdata={};
        //             fromdata.id=SelectData[0].foid;
        //             this.$api.documentManagement.deleteDocumentCategory(fromdata).then(response => {
        //                 let responsevalue = response;
        //                 if (responsevalue.data.data.msg=="success") {
        //                     this.$message.success('删除成功!');
        //                     this.reload();
        //                 } else {
        //                     this.$message.error(responsevalue.data.msg);
        //                 }
        //             });
        //         }else{
        //             this.$message.error("请选择一行数据!");
        //         }
        //     }
        //     maketree();
        // },
        //查看文档管理
        showDocumentCategory(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    this.rowNMMtype = true;
                    let finandata={};
                    finandata.nametitle="文档管理查看";
                    finandata.NewOrEditFlag="SHOW";
                    finandata.foid=SelectData[0].foid;
                    this.rowNMMDataObj=finandata;
                }else{
                    this.$message.error("请选择一行数据!");
                }
            }
        },
        //新增文档管理
        createDocumentCategory(){
            this.rowNMMtype = true;
            let finandata={};
            finandata.fpid=this.documentFpid;
            finandata.nametitle="文档管理新增";
            finandata.NewOrEditFlag="NEW";
            this.rowNMMDataObj=finandata;
        },
        //修改文档管理
        editDocumentCategory(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    this.rowNMMtype = true;
                    let finandata={};
                    finandata.nametitle="文档管理编辑";
                    finandata.NewOrEditFlag="EDIT";
                    finandata.foid=SelectData[0].foid;
                    this.rowNMMDataObj=finandata;
                }else{
                    this.$message.error("请选择一行数据!");
                }
            }
        },
        //置顶 文档管理
        operateDocumentCategory(param){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    let finandata={};
                    if(1 == param){
                        finandata.fistop="1";
                    } else if(2 == param){
                        finandata.fistop="2";
                    } else if(3 == param){
                        finandata.fdocstatus="3";
                        finandata.fpublisher=localStorage.getItem('ms_userId');
                    } else if(4 == param){
                        finandata.fdocstatus="2";
                        finandata.fpublisher=localStorage.getItem('ms_userId');
                    }
                    finandata.foid=SelectData[0].foid;
                    let creator = localStorage.getItem('ms_userId');
                    finandata.fcreator = creator;
                    this.$api.documentManagement.updateDocumentManage(finandata).then(response => {
                        let responsevalue = response;
                        if (responsevalue.data.data) {
                            this.$message.success('修改成功!');
                            this.reload();
                        } else {
                            this.$message.error(responsevalue.data.msg);
                        }
                    });


                }else{
                    this.$message.error("请选择一行数据!");
                }
            }
        },
        //取消置顶
        unTopDocumentCategory(){
            debugger;
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    let finandata={};
                    finandata.fistop="2";
                    finandata.foid=SelectData[0].foid;
                    this.$api.documentManagement.updateDocumentManage(finandata).then(response => {
                        let responsevalue = response;
                        if (responsevalue.data.data) {
                            this.$message.success('修改成功!');
                        } else {
                            this.$message.error(responsevalue.data.msg);
                        }
                    });


                }else{
                    this.$message.error("请选择一行数据!");
                }
            }
        },
        //已发布
        publishDocumentCategory(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    let finandata={};
                    finandata.fdocstatus="3";
                    finandata.foid=SelectData[0].foid;
                    this.$api.documentManagement.updateDocumentManage(finandata).then(response => {
                        let responsevalue = response;
                        if (responsevalue.data.data) {
                            this.$message.success('修改成功!');
                        } else {
                            this.$message.error(responsevalue.data.msg);
                        }
                    });


                }else{
                    this.$message.error("请选择一行数据!");
                }
            }
        },
        //取消发布
        unpublishDocumentCategory(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    let finandata={};
                    finandata.fdocstatus="2";
                    finandata.foid=SelectData[0].foid;
                    this.$api.documentManagement.updateDocumentManage(finandata).then(response => {
                        let responsevalue = response;
                        if (responsevalue.data.data) {
                            this.$message.success('修改成功!');
                        } else {
                            this.$message.error(responsevalue.data.msg);
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
        //是否展示dialog弹窗
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

    }
};
</script>

<style lang="scss" scoped>
   .treeStyle{
       height: 400px;
       overflow-y:auto;
   }
</style>
