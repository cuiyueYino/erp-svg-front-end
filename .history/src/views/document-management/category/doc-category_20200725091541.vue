<template>
    <div>
        <!-- <el-card class="box-card">
           <el-row :gutter="24">
                <el-col :span="12">
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-col :span="5">
                            <el-select v-model="formInline.company" @change="Comchange" placeholder="公司" clearable>
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
                    <el-button type="success" icon="el-icon-refresh" plain @click="editMainte">修改</el-button>
                    <el-button type="danger" icon="el-icon-notebook-2" plain @click="removeMainte">删除</el-button>
                 </el-col>
            </el-row>
        </el-card> -->
        <el-card>
            <el-row>
                <el-col :span="6" class="treeStyle">
                    <el-tree
                        :data="treeData"
                        :props="defaultProps"
                        node-key="id"
                        ref="tree"
                        :render-content="renderContent"
                        accordion
                        :default-expanded-keys="firstnode"
                        @node-click="handleNodeClick">
                    </el-tree>
                </el-col>
                <el-row>
                    <el-col :span="15" :offset="1">
                        <el-card class="box-card">
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form :inline="true"  class="demo-form-inline">
                                        <el-col :span="10">
                                            <el-select v-model="formInline.company" @change="Comchange" placeholder="公司" clearable>
                                                <el-option
                                                    v-for="item in companyData"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                                ></el-option>
                                            </el-select>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                                        </el-col>
                                    </el-form>
                                </el-col>
                                <el-col :span="10" :offset="2">
                                    <el-button type="success" icon="el-icon-refresh" plain @click="createMainte">新建</el-button> 
                                    <el-button type="success" icon="el-icon-refresh" plain @click="editMainte">修改</el-button>
                                    <el-button type="danger" icon="el-icon-notebook-2" plain @click="removeMainte">删除</el-button>
                                    <el-button type="danger" icon="el-icon-notebook-2" plain @click="removeMainte">查看</el-button>
                                </el-col>
                            </el-row>
                        </el-card>
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
            </el-row>
        </el-card>
        <NewMenupage  :rowNMMtype="rowNMMtype" :rowNMMDataObj="rowNMMDataObj" @changeShow="showAddMenu"/>
    </div>
</template>
<script>
import proData from '../../../components/common/proData/proData';
import DynamicTable from '../../../components/common/dytable/dytable.vue';
import NewMenupage from '../../system-setting/new-menu-management.vue';
export default {
    name:'workProcess',
    components: {
      DynamicTable,
      NewMenupage
    },
    inject: ['reload'],
    data(){
        return{
            input: '',
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
                    key: 'code',
                    title: '编码'
                },
                {
                    key: 'name',
                    title: '名称'
                },
                {
                    key: 'activityName',
                    title: '业务功能'
                },
                {
                    key: 'orderNum',
                    title: '显示顺序'
                },
                {
                    key: 'visibleName',
                    title: '是否可见'
                },
                {
                    key: 'url',
                    title: '链接'
                },
                {
                    key: 'remark',
                    title: '描述'
                },
            ],
            tableData:[],
            treeData:[],
            firstnode:[],
            multipleSelection:[],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
        };
    },
    created(){
        this.maketree(this.formInline.company);
        let fromdata={};
        fromdata.page=this.pageNum;
        fromdata.size=this.pageSize;
        fromdata.company=this.formInline.company;
        this.searchMenutable(fromdata);
    },
    methods:{
        //公司改变
        Comchange(data){
            this.formInline.company=data;
            this.maketree(data);
            let fromdata={};
            fromdata.page=this.pageNum;
            fromdata.size=this.pageSize;
            fromdata.company=data;
            this.searchMenutable(fromdata);
        },
        //删除菜单
        removeMainte(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    let fromdata={};
                    fromdata.id=SelectData[0].id;
                    this.$api.SystemSet.deleteMenuModel(fromdata).then(response => {
                        let responsevalue = response;
                        if (responsevalue.data.data=="success") {
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
        },
        //创建菜单详情页
        createMainte(){
            this.rowNMMtype = true;
            let finandata={};
            finandata.finanrowname="";
            finandata.finanrowId="";
            finandata.nametitle="菜单管理";
            finandata.NewOrEditFlag="NEW";
            finandata.company=this.formInline.company;
            this.rowNMMDataObj=finandata;
        },
        //修改菜单详情
        editMainte(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    this.rowNMMtype = true;
                    let finandata={};
                    finandata.finanrowname="";
                    finandata.finanrowId="";
                    finandata.nametitle="菜单管理";
                    finandata.NewOrEditFlag="EDIT";
                    finandata.MenuID=SelectData[0].id;
                    this.rowNMMDataObj=finandata;
                }else{
                    this.$message.error("请选择一行数据!");
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
                    );
                }else if(data.type==2){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-folder"></i></span>
                            <span style="margin-left: 5px;">{node.data.name}</span>
                        </span>
                    );
                }else if(data.type==3){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-document"></i></span>
                            <span style="margin-left: 5px;">{node.data.name}</span>
                        </span>
                    );
                }
            }  
        },
        //树结构点击事件
        handleNodeClick(data) {
            let fromdata={};
            fromdata.page=this.pageNum;
            fromdata.size=this.pageSize;
            if(data.children.length >0){
                fromdata.parentId=data.id;
            }else{
                fromdata.id=data.id;
            }
            fromdata.company=this.formInline.company;
            this.searchMenutable(fromdata);
        },
        //下一页
        onCurrentChange(val){
            let formDataA ={};
            formDataA.page=val;
            formDataA.size=this.pageSize;
            formDataA.company=this.formInline.company;
            this.searchMenutable(formDataA);
        },
        //table选中事件
        onSelectionChange(data){
            this.multipleSelection = data;
        },
        // 改变table行样式
        tableRowClassName(){},
        showAddMenu(type){
            if(type === false){
                this.rowNMMtype = false;
            }else{
                this.rowNMMtype = true;
            }
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
            this.$api.SystemSet.findMenuByParam(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    this.terrAllMenuData=returndata.data;
                    this.treeData = this.toTreeData(returndata.data,"id","parentId","name","code");
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        //分页查询菜单
        searchMenutable(data){
            let fromdata=data;
            this.$api.SystemSet.findMenuPage(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableArr=returndata.rows;
                    for(var i=0;i<tableArr.length;i++){
                        if(tableArr[i].visible){
                            tableArr[i].visibleName="是";
                        }else{
                            tableArr[i].visibleName="否";
                        }
                    }
                    this.tableData=tableArr;
                    this.total=returndata.total;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            }); 
        },
    }
};
</script>