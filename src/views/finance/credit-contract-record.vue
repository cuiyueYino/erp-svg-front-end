<template>
    <div>
        <dynamic-table
            :columns="Registrationcolumns"
            :table-data="RegistrationtableData"
            :total="total"
            ref="multipleTable"
            :page-num="pageNum"
            :page-size="pageSize"
            @current-change="onCurrentChange"
            @selection-change="onSelectionChange"
            @size-change="onSizeChange"
            v-loading="false"
            element-loading-text="加载中"
        ></dynamic-table>
    </div>
</template>
<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
export default {
    props: {
        rowCCRecordDataObj:Object,
        financingCCRecordtype: Boolean
    },
    name: 'basetable',
    components: {
        DynamicTable,
    },
    inject: ['reload'],
    data: function() {
        const { renderCCrecordtaskid } = this;
        return{
            title:'',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            Registrationcolumns:[
                {
                    key: 'contractcode',
                    title: '授信业务编码',
                    render:renderCCrecordtaskid
                },
                {
                    key: 'parta',
                    title: '授信主体'
                },
                {
                    key: 'contractname',
                    title: '用信合同名称'
                },
                {
                    key: 'statusString',
                    title: '融资金额-人民币'
                },
                {
                    key: 'statusString',
                    title: '质押金额'
                },
                {
                    key: 'statusString',
                    title: '用途'
                },
                {
                    key: 'statusString',
                    title: '到期日'
                },
                {
                    key: 'statusString',
                    title: '业务币种'
                },
                {
                    key: 'statusString',
                    title: '融资金额-原币'
                },
                {
                    key: 'statusString',
                    title: '授信占用(人民币)'
                },
            ],
            RegistrationtableData: [],
            labelPosition: 'left',
        }
    },
    methods: {
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //分页
        onSizeChange(val) {
            this.pageSize = val;
        },
        //下一页
        onCurrentChange(val) {
            let formDataA ={};
            formDataA.page=val;
            formDataA.size=this.pageSize;
            formDataA.company=localStorage.getItem('ms_companyId');
            this.$api.task.findFundCustomerPage(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.rows;
                    for(var i =0;i<tableDataArr.length;i++){
                        if(tableDataArr[i].status === 1){
                            tableDataArr[i].statusString="暂存";
                        }else if(tableDataArr[i].status === 2){
                            tableDataArr[i].statusString="提交";
                        }else if(tableDataArr[i].status === 3){
                            tableDataArr[i].statusString="有效";
                        }else {
                            tableDataArr[i].statusString="作废";
                        }
                    }
                    this.tableData = tableDataArr;
                    this.total = returndata.total;
                } else {
                    this.$message.success('没有查到数据!');
                }
            });
        },
        onRowCCrecordClick(row){
            localStorage.setItem('list', JSON.stringify(true));
            localStorage.setItem('New', JSON.stringify(false));
            let projectS = row.projectname;
            let projectIdS = projectS.split('-(')[1];
            projectIdS = projectIdS.split(')')[0];
            this.dialogVisible = true;
            // let projectObjectId = {};
            // projectObjectId.id = row.id;
            localStorage.setItem('pro_id', projectIdS);
            let proName=projectS.split("-(")[0];
            localStorage.setItem('pro_name', proName);
        },
        renderCCrecordtaskid(V){
            const { onRowCCrecordClick } = this;
            const  ret =[];
            let proIDStr="";
            let proName="";
            if(V.row.contractcode){
                proIDStr=V.row.contractcode;
                ret.push(
                    <div>
                        <el-button type="text" icon="el-icon-link" onClick={() => onRowCCrecordClick(V.row)}>
                            {proIDStr}
                        </el-button>
                    </div>
                );
            }
            return <div>{ret}</div>; 
        },
    },
    watch:{
        financingCCRecordtype(oldVal,newVal){
            this.ShowFinancVisible=this.financingCCRecordtype;
            let rowDataObj=this.rowCCRecordDataObj;
            /*this.title=rowDataObj.nametitle;
            this.formdata.searchName=rowDataObj.finanrowId;
            this.rowFincename=rowDataObj.finanrowname;
            let formDataA ={};
            formDataA.page=this.pageNum;
            formDataA.size=this.pageSize;
            formDataA.company=localStorage.getItem('ms_companyId');
            this.$api.task.findFundCustomerPage(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.rows;
                    for(var i =0;i<tableDataArr.length;i++){
                        if(tableDataArr[i].status === 1){
                            tableDataArr[i].statusString="暂存";
                        }else if(tableDataArr[i].status === 2){
                            tableDataArr[i].statusString="提交";
                        }else if(tableDataArr[i].status === 3){
                            tableDataArr[i].statusString="有效";
                        }else {
                            tableDataArr[i].statusString="作废";
                        }
                    }
                    this.tableData = tableDataArr;
                    this.total = returndata.total;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });*/
        }
    }
}
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
.el-dialog__body{
    padding: 0;
}
.el-card__header{
    padding: 10px 20px;
}
</style>