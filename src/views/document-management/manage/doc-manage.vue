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
                        <el-row :gutter="14">
                            <el-col :span="4">
                                <el-select v-model="formInline.document" @change="selectChange" placeholder="-请选择-" clearable>
                                    <el-option
                                        v-for="item in documentData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5">
                              <el-input v-model="input" placeholder="请输入内容" v-if="isInput" clearable></el-input>
                            </el-col>
                            <el-col :span="5">
                                <el-date-picker
                                  value-format="yyyy-MM-dd"
                                  v-if="isDate"
                                  clearable
                                  v-model="beginDate"
                                  type="date"
                                  placeholder="选择开始日期"
                                ></el-date-picker>
                            </el-col>
                            <el-col :span="5">
                              <el-date-picker
                                value-format="yyyy-MM-dd"
                                v-if="isDate"
                                clearable
                                v-model="endDate"
                                type="date"
                                placeholder="选择结束日期"
                              ></el-date-picker>
                            </el-col>
                            <el-col :span="1">
                                <el-button type="primary" size="small" icon="el-icon-search"  @click="findData">查询</el-button>
                            </el-col>
                        </el-row>

                        <el-row :gutter="14">
                            <el-col :span="16" style="margin-top: 20px;">
                              <el-button type="success"  icon="el-icon-folder-add" size="small" :disabled='disFlag' @click="createDocumentCategory">新增</el-button>
                              <el-button type="warning"  icon="el-icon-edit-outline" size="small" @click="editDocumentCategory()" >修改</el-button>
                              <el-button type="success" icon="el-icon-upload2" size="small"  @click="operateDocumentCategory(1)">置顶</el-button>
                              <el-button type="warning" icon="el-icon-download" size="small"   @click="operateDocumentCategory(2)">取消置顶</el-button>
                              <el-button type="success" icon="el-icon-plus" size="small"  @click="operateDocumentCategory(3)">发布</el-button>
                              <el-button type="warning" icon="el-icon-folder-delete" size="small"  @click="operateDocumentCategory(4)">取消发布</el-button>
                              <el-button type="info"  icon="el-icon-view" size="small" @click="showDocumentCategory">查看</el-button>
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
            //判断新增按钮的属性
            disFlag:true,
            isFind : false,
            isInput: true,
            isDate:false,
            beginDate:'',
            endDate:'',
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
            // 共享参数列表（用于分页时带着条件）
            params: {},
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
            this.isFind = true;
            this.pageNum = 1;
            let field = this.formInline.document;
            let fromdata={
              page : 1,
              size : this.pageSize,
            };

            if("fcode" == field){
                this.params={
                  fcode:this.input,
                };
                // fromdata.fcode=this.input;
            } else if ("fname" == field){
              this.params={
                fname:this.input,
              };
                // fromdata.fname=this.input;
            } else if ("fcreatetime" == field){
              this.params={
                fbegintime : this.beginDate,
                fendtime : this.endDate,
              };
                // fromdata.fbegintime = this.beginDate;
                // fromdata.fendtime=this.endDate;
            } else if ("fdescription" == field){
                this.params={
                  fdescription : this.input,
                };
                // fromdata.fdescription=this.input;
            } else if ("fdocstatus" == field){
                this.params={
                  fdocstatus : this.input,
                };
                // fromdata.fdocstatus=this.input;
            } else if ("fcreator" == field){
                this.params={
                  fcreator : this.input,
                };
                // fromdata.fcreator=this.input;
            }
            this.searchMenutable(fromdata);
        },
        //下拉框改变
        selectChange(data){
            this.formInline.document=data;
            if(data == 'fcreatetime'){
                this.isInput = false;
                this.isDate = true;
            } else {
                this.isInput = true;
                this.isDate = false;
            }

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
            if(this.documentFpid && this.documentFpid != '1'){
                this.rowNMMtype = true;
                let finandata={};
                finandata.fpid=this.documentFpid;
                finandata.nametitle="文档管理新增";
                finandata.NewOrEditFlag="NEW";
                this.rowNMMDataObj=finandata;
            } else {
                this.$message.error("请选择一个文档类别!");
            }
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
                    //标识：操作为发布/取消发布/置顶/取消置顶操作，后台区分 update 操作记录
                    finandata.flag = '1';
                    if(1 == param){
                        finandata.fistop="1";
                    } else if(2 == param){
                        finandata.fistop="2";
                    } else if(3 == param){
                        finandata.fdocstatus="3";
                        finandata.fpublisher=localStorage.getItem('ms_userId');
                    } else if(4 == param){
                      if(SelectData[0].fdocstatus != "已发布"){
                        this.$message.error("该文档状态无法取消发布！");
                        return;
                      } else {
                        finandata.fdocstatus="2";
                        finandata.fpublisher=localStorage.getItem('ms_userId');
                      }

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
            this.isFind = false;
            this.isInput = true;
            this.isDate = false;
            this.formInline.document='';
            this.input='';
            this.beginDate='';
            this.endDate='';
            this.emptyParam();
            this.documentLevel = data.flevel;
            this.documentFpid = data.foid;
            this.pageNum=1;
            let fromdata={};
            fromdata.page=this.pageNum;
            fromdata.size=this.pageSize;
            if(data.foid != '0' && data.fcode!='000'){
                fromdata.fpid=data.foid;
            }
            if(data.flevel != '2') {
                this.disFlag = true;
            } else {
                this.disFlag = false;
            }
            this.searchMenutable(fromdata);
        },
        //分页，下一页
        onCurrentChange(val){
            this.pageNum = val;
            // let field = this.formInline.document;
            let formDataA ={};
            // if("fcode" == field){
            //   formDataA.fcode=this.input;
            // } else if ("fname" == field){
            //   formDataA.fname=this.input;
            // } else if ("fcreatetime" == field){
            //   formDataA.fbegintime = this.beginDate;
            //   formDataA.fendtime=this.endDate;
            // } else if ("fdescription" == field){
            //   formDataA.fdescription=this.input;
            // } else if ("fdocstatus" == field){
            //   formDataA.fdocstatus=this.input;
            // } else if ("fcreator" == field){
            //   formDataA.fcreator=this.input;
            // }
            formDataA.page=val;
            formDataA.size=this.pageSize;
            if(this.documentFpid !='0'){
                formDataA.fpid=this.documentFpid;
            }
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
            if(this.isFind){
              //拼入其他条件参数
              Object.assign(fromdata,this.params);
            }
            fromdata.fuserid = localStorage.getItem('ms_userId');
            this.$api.documentManagement.findDocumentManageByPage(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableArr=returndata.data.rows;
                    for (let i = 0; i < tableArr.length; i++) {
                        //时间格式化
                        if(tableArr[i].fcreatetime){
                            tableArr[i].fcreatetime = this.formateDate(tableArr[i].fcreatetime);
                        }
                        if(tableArr[i].fpublishtime){
                            tableArr[i].fpublishtime= this.formateDate(tableArr[i].fpublishtime);
                        }
                    }
                    this.tableData=tableArr;
                    this.total=returndata.data.total;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        /**
         * 清空共享参数列表
         */
        emptyParam(){
          for(let key of Object.keys(this.params)){
            delete this.params[key];
          }
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
