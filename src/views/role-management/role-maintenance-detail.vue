<template>
    <div>
        <el-dialog :title="title" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="50%">
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
                            <el-tree
                                :data="treeData"
                                :props="defaultProps"
                                node-key="id"
                                :render-content="renderContent"
                                accordion
                                @node-click="handleNodeClick">
                            </el-tree>
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
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ShowFinancVisible = false">取 消</el-button>
                <el-button type="primary" @click="onHandleSave">保存</el-button>
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
            treeData:[
                {
                    label: '角色类别',
                    id:'company01',
                    type:'company',
                    children: [
                        {
                            label: '个人事务角色',
                            id:'duties03',
                            type:'duties',  
                        },
                        {
                            label: '公司架构角色-财务',
                            id:'department01',
                            type:'department',
                            children: [
                                {
                                label: '石化财务',
                                id:'duties01',
                                type:'duties',
                                },
                                {
                                label: '收费员',
                                id:'duties02',
                                type:'duties',
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            pageNum: 1,
            pageSize: 10,
            total: 2,
            columns: [
                {
                    type: 'selection'
                },
                {
                    key: 'fcode',
                    title: '编码'
                },
                {
                    key: 'name',
                    title: '名称'
                },
                {
                    key: 'roletype',
                    title: '状态'
                },
                {
                    key: 'remake',
                    title: '描述'
                },
            ],
            tableData:[
                {
                    fcode:'0001',
                    name:'wqwqw',
                    roletype:'3qqw',
                    remake:'qww'
                }
            ],
        }
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.$emit('changeShow',this.rowRMDDataObj,false);
        },
        renderContent(h, { node, data, store }) {
            if(data){
                if(data.type =="company"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-folder-opened"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    )
                }else if(data.type=="department"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-folder"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    )
                }else if(data.type=="duties"){
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-document"></i></span>
                            <span style="margin-left: 5px;">{node.label}</span>
                        </span>
                    )
                }
            }  
        },
        //树结构点击事件
        handleNodeClick(data) {
            let treeType=data.type;
        },
        onCurrentChange(){

        },
        onSelectionChange(){

        },
        tableRowClassName(){

        },
        onHandleSave(){
            this.$emit('changeShow',this.rowRMDDataObj,false);
        }
    },
    watch:{
        rowRMDtype(oldVal,newVal){
            this.ShowFinancVisible=this.rowRMDtype;
            this.title=this.rowRMDDataObj.nametitle;
        }
    }
}
</script>