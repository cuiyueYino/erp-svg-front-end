<template>
    <div>
        <el-card class="box-card">
           <el-row :gutter="24">
                <el-col :span="12">
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-col :span="8">
                            <el-form-item >
                                <el-select v-model="formInline.company" @change="Comchange" placeholder="公司" clearable>
                                    <el-option
                                        v-for="item in companyData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                       </el-col>
                    </el-form>
                </el-col>
                 <el-col :span="10" :offset="2">
                    <el-button type="success" icon="el-icon-refresh" plain @click="createRoleMainte">新建</el-button> 
                    <el-button type="success" icon="el-icon-refresh" plain @click="modifyRoleMainte">修改</el-button>
                    <el-button type="success" icon="el-icon-search" plain @click="lookRoleMainte">查看</el-button>
                    <el-button type="danger" icon="el-icon-notebook-2" plain @click="removeRoleMainte">删除</el-button>
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
        <el-dialog title="角色类别维护" 
            @close="handleClose" 
            :visible.sync="ShowFinancVisible" 
            :append-to-body="true"
            v-if="ShowFinancVisible" 
            :close-on-click-modal="false" 
            width="40%">
            <el-form
                label-width="110px"
                v-model="formdata"
                class="dataForm"
                :rules="rules"
                :model="formdata"
                size="mini"
                :label-position="labelPosition"
            >
                <el-card>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="公司">
                                <el-select v-model="company" placeholder="公司" disabled clearable>
                                    <el-option
                                        v-for="item in companyData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                       </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="编码" prop="code">
                                <el-input v-model="formdata.code" :disabled="forDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="2">
                            <el-form-item label="名称" prop="name">
                                <el-input v-model="formdata.name" :disabled="forDisabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="22">
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="formdata.remark" :disabled="forDisabled" :rows="2" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ShowFinancVisible = false">取 消</el-button>
                <el-button type="primary" @click="onHandleSave(formdata)">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
export default {
    name: 'basetable',
    components: {
        DynamicTable,
    },
    inject: ['reload'],
    data(){
        return{
            formInline: {
                company:'',
            },
            treeData:[],
            //默认展开id
            firstnode:[],
            NodeClickData:{},
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            CeateTypeflag:'',
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
                    key: 'remark',
                    title: '描述'
                },
                {
                    key: 'statusName',
                    title: '状态'
                },
            ],
            tableData:[],
            multipleSelection: [],
            companyData:new proData().company,
            ShowFinancVisible:false,
            forDisabled:false,
            company:'_DefaultCompanyOId',
            formdata:{
                company:'_DefaultCompanyOId',
            },
            labelPosition: 'left',
            rules: {
                code: [
                    { required: true, message: '请输入编码', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ]
            }
        }
    },
    created() {
        this.maketree(this.company);
        this.searchRoleType(1,10);
    },
    mounted() {
        //获取查询全部角色类别
    },
    methods:{
        //公司改变
        Comchange(data){
            this.company=data;
            this.maketree(data);
        },
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
        //查询角色类别列表
        searchRoleType(page,size){
            let fromdata={};
            fromdata.page=page;
            fromdata.size=size;
            this.$api.RoleManagement.findRoleTypePage(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.rows;
                    for(var i=0;i<tableDataArr.length;i++){
                        if(tableDataArr[i].status==3){
                            tableDataArr[i].statusName='有效';
                        }else{
                            tableDataArr[i].statusName='失效';
                        }
                    }
                    this.tableData = tableDataArr;
                    this.total=returndata.total;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.ShowFinancVisible=false;
        },
        //修改角色类别
        modifyRoleMainte(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    //this.ShowFinancVisible=true;
                    //this.CeateTypeflag='EDIT';
                    //this.forDisabled=false;
                    this.getRoleMainte(SelectData[0],'EDIT',true,false);
                }else{
                    this.$message.error("请选择一行数据!");
                }
                
            }
        },
        //删除角色类别
        removeRoleMainte(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    let fromdata={};
                    fromdata.id=SelectData[0].id;
                    this.$api.RoleManagement.deleteRoleTypeModel(fromdata).then(response => {
                        let responsevalue = response;
                        if (responsevalue.data.data=="success") {
                            this.$message.success('删除成功!');
                            this.reload();
                        } else {
                            this.$message.error(responsevalue.data.msg);
                        }
                    });
                    
                    this.getRoleMainte(SelectData[0]);
                }else{
                    this.$message.error("请选择一行数据!");
                }
                
            }    
        },
        //查看角色类别
        lookRoleMainte(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    //this.ShowFinancVisible=true;
                    //this.CeateTypeflag='Look';
                    //this.forDisabled=true;
                    this.getRoleMainte(SelectData[0],'Look',true,true);
                }else{
                    this.$message.error("请选择一行数据!");
                }
            }
        },
        //ID 查询角色类别
        getRoleMainte(data,Ctype,stype,ftype){
            let SelectData=data;
            let fromdata={};
            fromdata.id=SelectData.id;
            this.$api.RoleManagement.getRoleTypeModel(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data;
                    this.ShowFinancVisible=stype;
                    this.CeateTypeflag=Ctype;
                    this.forDisabled=ftype;
                    this.formdata = tableDataArr;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        //创建角色类别按钮点击事件
        createRoleMainte(){
            this.ShowFinancVisible=true;
            this.CeateTypeflag='NEW';
            this.formdata={};
        },
        // 创建角色类别保存事件
        onHandleSave(data){
            let savetype=false;
            if(this.CeateTypeflag=='Look'){
                this.ShowFinancVisible=false;
            }else{
                if(this.CeateTypeflag=='EDIT'){
                    let fromdata=data;
                    if(this.formdata.code){
                        fromdata.code=this.formdata.code;
                        savetype=true;
                    }else{
                        this.$message.error('请输入编号!');
                        savetype=false
                    }
                    if(this.formdata.name){
                        fromdata.name=this.formdata.name;
                        savetype=true;
                    }else{
                        this.$message.error('请输入名称!');
                        savetype=false
                    }
                    if(this.formdata.remark){
                        fromdata.remark=this.formdata.remark;
                    }
                    fromdata.creator=localStorage.getItem('ms_userId');
                    this.$api.RoleManagement.updateRoleTypeModel(fromdata).then(response => {
                        let responsevalue = response;
                        if (responsevalue.data.data=="success") {
                            this.ShowFinancVisible=false;
                            this.reload();
                        } else {
                            this.$message.error(responsevalue.data.msg);
                        }
                    });
                }else{
                    let fromdata={};
                    let SelectData=this.NodeClickData;
                    if(SelectData.id){
                        fromdata.parentId=SelectData.id;
                    }
                    fromdata.company=this.company;
                    if(this.formdata.code){
                        fromdata.code=this.formdata.code;
                        savetype=true;
                    }else{
                        this.$message.error('请输入编号!');
                        savetype=false
                    }
                    if(this.formdata.name){
                        fromdata.name=this.formdata.name;
                        savetype=true;
                    }else{
                        this.$message.error('请输入名称!');
                        savetype=false
                    }
                    if(this.formdata.remark){
                        fromdata.remark=this.formdata.remark;
                    }
                    fromdata.creator=localStorage.getItem('ms_userId');
                    this.$api.RoleManagement.insertRoleTypeModel(fromdata).then(response => {
                        let responsevalue = response;
                        if (responsevalue.data.data=="success") {
                            this.ShowFinancVisible=false;
                            this.reload();
                        } else {
                            this.$message.error(responsevalue.data.msg);
                        }
                    });
                }
            }
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
            this.NodeClickData=data;
            let treeType=data.type;
            if(treeType==1 || treeType==2){
                if(data.children.length > 0){
                    let dataA=[];
                    let dataB=[];
                    dataA.push(data);
                    dataB=dataB.concat(dataA,data.children);
                    this.tableData =dataB;
                    this.total=(data.children.length+1);
                }else{
                    let dataA=[];
                    dataA.push(data);
                    this.tableData =dataA;
                    this.total=1;   
                }
            }else{
                let dataA=[];
                dataA.push(data);
                this.tableData =dataA;
                this.total=1; 
            }
        },
        //分页、下一页
        onCurrentChange(val){
            this.searchRoleType(val,this.pageSize)
        },
        //多选
        onSelectionChange(val){
            this.multipleSelection = val;
        },
        // 为行设置样式
        tableRowClassName(){

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