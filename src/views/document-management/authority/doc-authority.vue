<template>
    <div>
        <el-card>
            <el-row>
                <el-col :span="4" class="treeStyle">
                    <el-row>
                        <el-col>
                            <el-select v-model="formInSelect.select" @change="selectDocAuthorityChange">
                                <el-option
                                    v-for="item in docAuthorityData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row>
                        权限
                        <el-col>
                            <el-tree
                              highlight-current
                            :data="treeData"
                            :props="defaultProps"
                            node-key="foid"
                            ref="tree"
                            show-checkbox
                            @check="checkboxClick"
                            accordion
                            >
                              <div slot-scope="{node,data}" class="customize-tree-p">
                                <el-tooltip class="item" effect="dark" :content="data.fname" placement="top-start">
                                  <span>{{data.fname|labelShow}}</span>
                                </el-tooltip>
                              </div>
                        </el-tree>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="18" :offset="1">
                    <el-card class="box-card">
                        <el-row :gutter="24">
                            <el-col :span="16">
                                <el-form :inline="true"  class="demo-form-inline">
                                    <el-col :span="6">
                                        <el-select v-model="formInline.auth" @change="selectChange" placeholder="-请选择-" clearable>
                                            <el-option
                                                v-for="item in docRoleAuthData"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-button type="primary" icon="el-icon-help" size="medium" plain @click="findData(1)">过滤</el-button>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-button type="primary" icon="el-icon-menu" size="medium" plain @click="findData(2)">全部</el-button>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-button type="success" icon="el-icon-circle-check" size="medium" plain @click="findData(3)">已选中</el-button>
                                    </el-col>
                                </el-form>
                            </el-col>
                            <el-col :span="1" :offset="5">
                                <el-button type="success" icon='el-icon-check' size="medium" plain @click="submitAuth">确定</el-button>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="18" :offset="1">
                    <div>
                        <el-table
                            ref="roleTable"
                            :data="tableData"
                            tooltip-effect="dark"
                            size="small"
                            border
                            style="width: 100%"
                            @select-all="onSelectionChange"
                            @select="onSelectionChange">
                            <el-table-column type="selection" min-width="5%"></el-table-column>
                            <el-table-column prop="code" size="small" label="角色编码" ></el-table-column>
                            <el-table-column prop="name" size="small" label="角色名称" ></el-table-column>
                            <el-table-column prop="companyName" size="small" label="公司名称" ></el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <NewDocument  :rowNMMtype="rowNMMtype" :rowNMMDataObj="rowNMMDataObj" @changeShow="showAddMenu"/>
    </div>
</template>
<script>
import proData from '../../../components/common/proData/proData';
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
            docAuthorityData: new documentData().docAuthority,
            docRoleAuthData: new documentData().docRoleAuth,
            formInline: {

            },
            formInSelect:{
                select:'1',
            },
            rowNMMtype:false,
            rowNMMDataObj:{},
            columns: [
                {
                    type: 'selection'
                },
                {
                    key: 'code',
                    title: '角色编码'
                },
                {
                    key: 'name',
                    title: '角色名称'
                },
                {
                    key: 'companyName',
                    title: '公司名称'
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
        fromdata.fauthtype = this.formInSelect.select; //权限类型
        this.searchMenutable(fromdata);
    },
    mounted(){
        //生成文档授权树结构
        this.maketree();
        this.findData(2);
        this.$refs.roleTable.toggleRowSelection(this.tableData[2],true);
    },
    methods:{
        //查询按钮
        findData(param){
            let field = this.formInline.auth;
            let fromdata={};
            fromdata.fauthtype = this.formInSelect.select; //权限类型
            if(1 == param){
                if("code" == field){
                    fromdata.code=this.input;
                } else if ("name" == field){
                    fromdata.name=this.input;
                } else if ("companyName" == field){
                    fromdata.companyName=this.input;
                }
            }else if(3 == param){
                fromdata.fauth = '1';//给个已选中标识，后台做筛选
            }
            let docmanageids= '';
            let nodes = this.$refs.tree.getCheckedNodes();
            let docmanageidSet = [];
            for(var i=0; i<nodes.length; i++){
                let node = nodes[i];
                if( node.flevel == 3) {
                    docmanageidSet.push(node.foid);
                    docmanageids = docmanageids + '\'' + node.foid +'\',';
                }
            }
            docmanageids = docmanageids.substring(0,docmanageids.length-1)
            fromdata.docmanageids = docmanageids;
            fromdata.docmanageidSet = docmanageidSet;
            console.log(fromdata.docmanageids);
            this.searchMenutable(fromdata);
        },
        //下拉框改变
        selectChange(data){
            this.formInline.auth=data;
        },
        //下拉框改变
        selectDocAuthorityChange(data){
            this.formInSelect.select=data;
            this.findData(1);
            this.$refs.tree.setCheckedKeys([]);
        },

        //提交文档授权
        submitAuth(){
            let nodes = this.$refs.tree.getCheckedNodes();
            let categoryfoids = []; //选中的文档类别
            let managefoids = [];   //选中的文档
            for(var i=0; i<nodes.length; i++){
                let node = nodes[i];
                if( ( node.flevel == 1 || node.flevel == 2 ) && node.children) {
                    categoryfoids.push(node.foid);
                } else if( node.flevel == 3) {
                    managefoids.push(node.foid);
                }
            }
            if(categoryfoids.length == 0 && managefoids.length ==0){
              this.$message.error("请选择有效二级的文档类别进行授权!");
              return;
            }
            let SelectData=this.multipleSelection; // 选中的角色
            // if(SelectData.length < 1){
            //     this.$message.error("请选择一个角色授权!");
            // }else{
                let rolefoids = [];
                for(var i=0; i<SelectData.length; i++){
                    rolefoids.push(SelectData[i].id);
                }
                let fromdata={};
                fromdata.categoryfoids=categoryfoids;
                fromdata.managefoids=managefoids;
                fromdata.rolefoids=rolefoids;
                fromdata.fauth = this.formInSelect.select;
                fromdata.fhandler = localStorage.getItem('ms_userId');
                this.$api.documentManagement.insertDocumentAuthority(fromdata).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data;
                        if(returndata.code == 999){
                            this.$message.error(returndata.msg);
                        }else{
                            this.$message.success('授权成功!');
                            this.reload();
                        }
                    } else {
                        this.$message.success('数据库没有该条数据!');
                    }
                });
            // }
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
        //树的多选框点击事件
        checkboxClick(data, checkedParm){
            this.documentLevel = data.flevel;
            this.documentFpid = data.foid;
            let fromdata={};
            let field = this.formInline.auth;
            if("code" == field){
                fromdata.code=this.input;
            } else if ("name" == field){
                fromdata.name=this.input;
            } else if ("companyName" == field){
                fromdata.companyName=this.input;
            }
            fromdata.fauthtype = this.formInSelect.select; //权限类型
            let docmanageids= '';
            let nodes = this.$refs.tree.getCheckedNodes();
            let docmanageidSet = [];
            for(var i=0; i<nodes.length; i++){
                let node = nodes[i];
                if( node.flevel == 3) {
                    docmanageidSet.push(node.foid);
                    docmanageids = docmanageids  + node.foid +',';
                }
            }
            docmanageids = docmanageids.substring(0,docmanageids.length-1)
            fromdata.docmanageids = docmanageids;
            fromdata.docmanageidSet = docmanageidSet;

            this.searchMenutable(fromdata);
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
            this.$api.documentManagement.getDocumentManageOrgArch('').then(response => {
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
            this.$api.documentManagement.findOARoleInfosByPage(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableArr=returndata.data;
                    this.tableData=tableArr;
                    //存在异步问题
                    this.$nextTick(() => {
                        this.$refs.roleTable.clearSelection();
                        if(this.tableData){
                            this.tableData.forEach(row => {
                              if (row.fauth == "1") {
                                this.$refs.roleTable.toggleRowSelection(row,true);
                            }
                        });
                        }
                    });
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
