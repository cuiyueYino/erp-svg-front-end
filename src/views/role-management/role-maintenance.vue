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
                                <el-option label="名称" value="name"></el-option>
                                <el-option label="编码" value="code"></el-option>
                                <el-option label="角色类别" value="roleType"></el-option>
                                </el-select>
                            </el-form-item>
                       </el-col>
                        <el-form-item >
                            <el-input clearable v-model="formCode" placeholder="请输入任意查询内容"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" icon='el-icon-search' size="small"   @click="onSubmit">搜索</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon='el-icon-tickets' size="small"   @click="getAll" class="search-all">显示全部信息</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                 <el-col :span="10" :offset="2">
                    <el-button type="success" icon='el-icon-folder-add' size="small"   @click="createRoleMainte">新增</el-button>
                    <el-button type="warning" icon="el-icon-edit-outline" size="small"   @click="modifyRoleMainte">修改</el-button>
                    <el-button type="danger" icon='el-icon-delete' size="small"   @click="removeRoleMainte">删除</el-button>
                 </el-col>
            </el-row>
        </el-card>
        <el-card>
            <el-row>
                <el-col :span="6">
                    <div class="El-tree">
                        <el-tree
                            :data="treeData"
                            :props="defaultProps"
                            node-key="code"
                            :render-content="renderContent"
                            :default-expanded-keys="firstnode"
                            accordion
                            @node-click="handleNodeClick">
                        </el-tree>
                    </div>
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
        <Nrmaintenpage  :rowNRMtype="rowNRMtype" :rowNRMDataObj="rowNRMDataObj" @changeShow="showRoleMainte"/>
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
    inject: ['reload'],
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
                    key: 'code',
                    title: '编码'
                },
                {
                    key: 'name',
                    title: '名称'
                },
                {
                    key: 'roleTypeName',
                    title: '角色类型'
                },
                {
                    key: 'remark',
                    title: '描述'
                },
            ],
            tableData:[],
            treeData:[],
            multipleSelection: [],
            //默认展开id
            firstnode:[],
            NodeClickData:{},
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            checked:'',
            company:'_DefaultCompanyOId',

            //搜索条件
            reqParam :{},
        }
    },
    created(){
        this.maketree(this.company);

        this.searchRole();
    },
    computed:{

    },
    mounted() {
    },
    methods:{
        // 循环生成树数据
        toTreeData(data,id,pid,name,code) {
        // 建立个树形结构,需要定义个最顶层的父节点，pId是1
            let parent = [];
            for (let i = 0; i < data.length; i++) {

                if(data[i][pid] !== null){

                }else{
                    let obj = data[i];
                    obj.children=[];
                    obj.type=1;
                    if(data[i].status== 3){
                        obj.statusName='有效';
                    }else{
                        obj.statusName='失效';
                    }
                    parent.push(obj);//数组加数组值
                    this.firstnode.push(obj.id);
                }

            }
            let index=1;
            children(parent,index);
            // 调用子节点方法,参数为父节点的数组
            function children(parent,index) {
                index=index+1;
                if (data.length !== 0) {
                    for (let i = 0; i < parent.length; i++) {
                        for (let j = 0; j < data.length; j++) {
                            if (parent[i].id == data[j][pid]){
                                let obj = data[j];
                                obj.children=[];
                                obj.type=index;
                                if(data[j].status ==3){
                                    obj.statusName='有效';
                                }else{
                                    obj.statusName='失效';
                                }
                                parent[i].children.push(obj);
                            }
                        }
                        children(parent[i].children,index);
                    }
                }
            }
            return parent;
        },
        //生成树
        maketree(company){
            let fromdata={};
            fromdata.company=company;
            this.$api.RoleManagement.findRoleTypeList(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    this.treeData = this.toTreeData(returndata.data,"id","parentId","name","code");
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        //查询角色列表
        searchRole(){
            let fromData={
                page : this.pageNum,
                size : this.pageSize,
            };
            Object.assign(fromData,this.reqParam)
            this.$api.RoleManagement.findRolePage(fromData).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.rows;
                    this.tableData = tableDataArr;
                    this.total=returndata.total;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        removeRoleMainte(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let fromdata={};
                        fromdata.id=SelectData[0].id;
                        this.$api.RoleManagement.deleteRoleModel(fromdata).then(response => {
                            let responsevalue = response;
                            if (responsevalue.data.data=="success") {
                                this.$message.success('删除成功!');
                                this.reload();
                            } else {
                                this.$message.error(responsevalue.data.msg);
                            }
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });

                }else{
                    this.$message.error("请选择一行数据!");
                }
            }
        },
        onSubmit(){
            //清除树形默认选择
            this.NodeClickData={};
            this.pageNum = 1;
            if(this.region=="name"){
                this.reqParam.name=this.formCode;
            }else if(this.region=="code"){
                this.reqParam.code=this.formCode;
            }else if(this.region=="roleType"){
                this.reqParam.roleTypeName=this.formCode;
            }
            this.searchRole();
        },
        getAll(){
            //清除树形默认选择，搜索条件数据
            this.NodeClickData={};
            this.region="";
            this.formCode="";
            this.pageNum=1;
            this.emptyParam();

            this.searchRole();
        },
        renderContent(h, { node, data, store }) {
            if(data){
                if(data.type ==1){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-folder-opened"></i></span>
                            <span style="margin-left: 5px;">{node.data.name}</span>
                        </span>
                    )
                }else if(data.type==2){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-folder"></i></span>
                            <span style="margin-left: 5px;">{node.data.name}</span>
                        </span>
                    )
                }else if(data.type==3){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-document"></i></span>
                            <span style="margin-left: 5px;">{node.data.name}</span>
                        </span>
                    )
                }else{
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-document"></i></span>
                            <span style="margin-left: 5px;">{node.data.name}</span>
                        </span>
                    )
                }
            }
        },
        //树结构点击事件
        handleNodeClick(data) {
            //清除树形默认选择，搜索条件数据
            this.region="";
            this.formCode="";
            this.NodeClickData=data;

            this.reqParam.roleType=data.id;
            this.searchRole();
        },
        //下一页，分页
        onCurrentChange(val){
            this.pageNum=val;
            this.searchRole();
        },
        //选择，多选
        onSelectionChange(val){
            this.multipleSelection = val;
        },
        //给table的行设置样式
        tableRowClassName(){

        },
        //创建角色详情页
        createRoleMainte(){
            let finandata={};
            finandata.finanrowname="";
            finandata.finanrowId="";
            finandata.nametitle="角色维护";
            finandata.createtype="NEW";
            finandata.SelectData=[];
            this.rowNRMDataObj=finandata;
            this.rowNRMtype = true;
        },
        //角色详情页返回数据处理
        showRoleMainte(type){
            if(type === false){
                this.rowNRMtype = false
            }else{
                this.rowNRMtype = true
            }
        },
        //修改
        modifyRoleMainte(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    let finandata={};
                    finandata.finanrowname="";
                    finandata.finanrowId="";
                    finandata.nametitle="角色维护";
                    finandata.createtype="EDIT";
                    finandata.SelectData=SelectData;
                    this.rowNRMDataObj=finandata;
                    this.rowNRMtype = true;
                }else{
                    this.$message.error("请选择一行数据!");
                }
            }
        },

        /**
         * 清空参数列表
         */
        emptyParam(){
            for(let key of Object.keys(this.reqParam)){
                delete this.reqParam[key];
            }
        },
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
.El-tree{
    height: 500px;
    overflow-y:auto;
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
