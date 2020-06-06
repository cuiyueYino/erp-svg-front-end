<template>
    <div>
        <el-dialog :title="title" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="60%">  
        <div id="mountNode">
        </div>
        </el-dialog>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import PSpage from '../comment/personnel-search.vue';
export default {
    name:'workProcess',
    props: {
        rowFCDDataObj: Object,
        rowFCDtype: Boolean
    },
    data() {
        return {
            ShowFinancVisible:false,
            pageNum: 1,
            pageSize: 10,
            total: 20,
            labelPosition: 'left',
            data:{
                nodes: [
                    {
                        id: '1',
                        dataType: 'alps',
                        name: 'alps_file1',
                        conf: [
                        {
                            label: 'conf',
                            value: 'pai_graph.conf',
                        },
                        {
                            label: 'dot',
                            value: 'pai_graph.dot',
                        },
                        {
                            label: 'init',
                            value: 'init.rc',
                        },
                        ],
                    },
                    {
                        id: '2',
                        dataType: 'alps',
                        name: 'alps_file2',
                        conf: [
                        {
                            label: 'conf',
                            value: 'pai_graph.conf',
                        },
                        {
                            label: 'dot',
                            value: 'pai_graph.dot',
                        },
                        {
                            label: 'init',
                            value: 'init.rc',
                        },
                        ],
                    },
                    {
                        id: '3',
                        dataType: 'alps',
                        name: 'alps_file3',
                        conf: [
                        {
                            label: 'conf',
                            value: 'pai_graph.conf',
                        },
                        {
                            label: 'dot',
                            value: 'pai_graph.dot',
                        },
                        {
                            label: 'init',
                            value: 'init.rc',
                        },
                        ],
                    },
                    {
                        id: '4',
                        dataType: 'sql',
                        name: 'sql_file1',
                        conf: [
                        {
                            label: 'conf',
                            value: 'pai_graph.conf',
                        },
                        {
                            label: 'dot',
                            value: 'pai_graph.dot',
                        },
                        {
                            label: 'init',
                            value: 'init.rc',
                        },
                        ],
                    },
                    {
                        id: '5',
                        dataType: 'sql',
                        name: 'sql_file2',
                        conf: [
                        {
                            label: 'conf',
                            value: 'pai_graph.conf',
                        },
                        {
                            label: 'dot',
                            value: 'pai_graph.dot',
                        },
                        {
                            label: 'init',
                            value: 'init.rc',
                        },
                        ],
                    },
                    {
                        id: '6',
                        dataType: 'feature_etl',
                        name: 'feature_etl_1',
                        conf: [
                        {
                            label: 'conf',
                            value: 'pai_graph.conf',
                        },
                        {
                            label: 'dot',
                            value: 'pai_graph.dot',
                        },
                        {
                            label: 'init',
                            value: 'init.rc',
                        },
                        ],
                    },
                    {
                        id: '7',
                        dataType: 'feature_etl',
                        name: 'feature_etl_1',
                        conf: [
                        {
                            label: 'conf',
                            value: 'pai_graph.conf',
                        },
                        {
                            label: 'dot',
                            value: 'pai_graph.dot',
                        },
                        {
                            label: 'init',
                            value: 'init.rc',
                        },
                        ],
                    },
                    {
                        id: '8',
                        dataType: 'feature_extractor',
                        name: 'feature_extractor',
                        conf: [
                        {
                            label: 'conf',
                            value: 'pai_graph.conf',
                        },
                        {
                            label: 'dot',
                            value: 'pai_graph.dot',
                        },
                        {
                            label: 'init',
                            value: 'init.rc',
                        },
                        ],
                    },
                ],
                edges: [
                    {
                        source: '1',
                        target: '2',
                    },
                    {
                        source: '1',
                        target: '3',
                    },
                    {
                        source: '2',
                        target: '4',
                    },
                    {
                        source: '3',
                        target: '4',
                    },
                    {
                        source: '4',
                        target: '5',
                    },
                    {
                        source: '5',
                        target: '6',
                    },
                    {
                        source: '6',
                        target: '7',
                    },
                    {
                        source: '6',
                        target: '8',
                    },
                ],
            },
        };
    },
    components: {
      DynamicTable,
    },
    created(){
        this.$G6.G6init(mountNode,500,500,this.data);
    },
    computed:{
        
    },
    methods:{
        handleClose(){
            this.$emit('changeShow',false);
        },
    },
    watch:{
        rowFCDtype(oldVal,newVal){
            this.ShowFinancVisible=this.rowFCDtype;
            let finandata=this.rowFCDDataObj.finanrowId;
            let formDataA ={};
            formDataA.id=finandata;
            this.title=this.rowWAADataObj.nametitle;
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
}
</script>
<style lang="scss" scoped>
 /deep/ .el-textarea .el-input__count{
     background: #fff0;
 }
/deep/ .el-select{
    width: 100%;
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
<style>
  #mountNode{
    width: 500px;
    height:  500px;
    border:1px saddlebrown solid;
  }
</style>