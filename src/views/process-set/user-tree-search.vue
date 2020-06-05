<template>
    <div>
        <el-dialog :title="title" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="60%">
            <el-form
                label-width="110px"
                v-model="formdata"
                class="dataForm"
                size="mini"
                :model="formdata"
                :label-position="labelPosition"
            >
                <el-row>
                    <el-col :span="12" class="tree-class">
                        <!-- 树状图 -->
                        <el-tree
                            :data="treeData"
                            :props="defaultProps"
                            accordion
                            @node-click="handleNodeClick">
                        </el-tree>
                    </el-col>
                    <el-col :span="12" class="tree-class">
                        <el-row :gutter="24">
                            <el-col :span="18">
                                <el-form-item label="搜索" >
                                    <el-input v-model="formdata.searchKeyW" clearable></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-button type="primary" plain  size="small" @click="searchKey">查询</el-button>
                            </el-col>
                        </el-row>
                        <!-- 表格 -->
                        <dynamic-table
                            class="workTable"
                            :height="310"
                            :columns="columns3"
                            :table-data="gridData"
                            :total="total"
                            :page-num="pageNum"
                            :page-size="pageSize"
                            @current-change="onCurrentChange"
                            @selection-change="onSelectionChange"
                            v-loading="tableLoading"
                            element-loading-text="加载中"
                        ></dynamic-table>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="13" style="text-align: right;margin-top: 18px;">
                        <el-button  size="small" @click="saveConfig">确定</el-button>
                    </el-col>   
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
export default {
    props: {
        rowUTSDataObj: Object,
        rowUTStype: Boolean
    },
    name: 'basetable',
    components: {
        DynamicTable,
    },
    inject: ['reload'],
    data: function() {   
        return {
            pageNum: 1,
            pageSize: 10,
            total: 20,
            title:'',
            formdata:{
                searchKeyW:'',
            },
            tableLoading:false,
            ShowFinancVisible:false,
            labelPosition: 'left',
            columns3: [
                {
                    type: 'selection'
                },
                {
                    key: 'name',
                    title: '名称'
                },
                {
                    key: 'jobString',
                    title: '职位'
                },
            ],
            treeData:[
                {
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                        label: '三级 1-1-1'
                        }]
                    }]
                },{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                        label: '三级 1-1-1'
                        }]
                    }]
                },
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            gridData:[
                {
                    name:'黎明',
                    jobString:'歌手'
                },
                {
                    name:'张静',
                    jobString:'演员'
                }
            ],
        };
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.$emit('changeShow',false);
        },
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        searchKey(){

        },
        //分页
        onSizeChange(val) {
            this.pageSize = val;
        },
        //下一页
        onCurrentChange(val) {},
        handleNodeClick(data) {
            console.log(data);
        },
        saveConfig(){
            console.log(this.multipleSelection)
        },
    },
    mounted() {
    },
    watch:{
        rowUTStype(oldVal,newVal){
            this.ShowFinancVisible=this.rowUTStype;
            let finandata=this.rowUTSDataObj.finanrowId;
            let formDataA ={};
            formDataA.id=finandata;
            this.title=this.rowUTSDataObj.nametitle;
            /*this.$api.task.getUserCreditContractRegisterVO(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data;
                    this.disabled = true;
                    this.editabled=false;
                    tableDataArr.loandateStr=this.$Uformat.formatDateTYMD(tableDataArr.loandate);
                    tableDataArr.duedateStr=this.$Uformat.formatDateTYMD(tableDataArr.duedate);
                    tableDataArr.depositstartdateStr=this.$Uformat.formatDateTYMD(tableDataArr.depositstartdate);
                    tableDataArr.depositenddateStr=this.$Uformat.formatDateTYMD(tableDataArr.depositenddate);
                    tableDataArr.voucherdateStr=this.$Uformat.formatDateTYMD(tableDataArr.voucherdate);
                    if(tableDataArr.pre == true){
                        this.prechecked='是';
                    }else if(tableDataArr.pre == false){
                        this.prechecked='否';
                    }
                    this.formdata=tableDataArr;
                    this.rowPDLDataObj=[];
                    this.rowCDLDataObj=[];
                    this.NewEditVisible= true;
                    this.showCheckBox= false;
                    this.checked=false;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });*/
        }
    }
};
</script>

<style lang='scss' scoped>
.el-form-item__label {
    text-align: left;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.topinput {
    width: 100px;
}
.topselect {
    width: 242px;
}
.datatable {
    margin-top: 20px;
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
</style>
<style lang='scss'>
.replydiag {
    .el-textarea__inner {
        min-height: 300px !important;
    }
}
.tree-class{
    height: 310px;
    overflow: auto;
}
.el-dialog__body{
    padding: 0;
}
.el-card__header{
    padding: 10px 20px;
}
</style>