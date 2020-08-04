<template>
    <div>
        <el-dialog :title="title" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="40%">
            <el-form
                label-width="110px"
                v-model="formdata"
                class="dataForm"
                :model="formdata"
                size="mini"
                :label-position="labelPosition"
            >
                <el-card>
                    <el-row>
                        <el-col :span="6">
                            <div class="El-tree">
                                <el-tree
                                    :data="treeData"
                                    :props="defaultProps"
                                    node-key="id"
                                    :render-content="renderContent"
                                    :default-expanded-keys="firstnode"
                                    accordion
                                    @node-click="handleNodeClick">
                                </el-tree>
                            </div>
                        </el-col>
                        <el-col :span="14" :offset="3">
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
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="onHandleSave">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    props: {
        rowRMDDataObj:Object,
        rowRMDtype: Boolean
    },
    name: 'basetable',
    components: {
        DynamicTable
    },
    data() {
        return {
            formdata:{},
            ShowFinancVisible:false,
            labelPosition: 'left',
            treeData:[],
            firstnode:[],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
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
                    key: 'statusName',
                    title: '状态'
                },
                {
                    key: 'remark',
                    title: '描述'
                },
            ],
            tableData:[],
            NodeClickData:{},
            multipleSelection: [],
        }
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.$emit('changeShow',this.rowRMDDataObj,false);
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
                }
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
            //fromdata.company=company;
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
        //改变table 行的样式
        tableRowClassName(){

        },
        onHandleSave(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    //this.ShowFinancVisible=true;
                    //this.CeateTypeflag='EDIT';
                    //this.forDisabled=false;
                    this.rowRMDDataObj.SelectRMDData=SelectData;
                    this.$emit('changeShow',this.rowRMDDataObj,false);
                }else{
                    this.$message.error("请选择一行数据!");
                }
                
            }
        }
    },
    watch:{
        rowRMDtype(oldVal,newVal){
            this.ShowFinancVisible=this.rowRMDtype;
            this.title=this.rowRMDDataObj.nametitle;
            this.maketree();
            this.searchRoleType(1,10);
        }
    }
}
</script>
<style lang="scss" scoped>
.El-tree{
    height: 300px;
    overflow-y:auto;
}
</style>