<template>
    <div>
        <el-dialog :title="title" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false"  width="60%">
            <el-card>
                <el-row>
                    <el-col :span="6" :offset="6">
                        
                    </el-col>
                </el-row>
                <div class="titleClass">{{titleName}}</div>
                <div class="div-style">
                    <Prosstree  :treeData="treeData" :isChild="isChild" />
                </div>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import PSpage from '../comment/personnel-search.vue';
import Prosstree from '../../components/common/processTree/index.vue'
export default {
    name:'workProcess',
    props: {
        rowFCDDataObj: Object,
        rowFCDtype: Boolean
    },
    data() {
        return {
            ShowFinancVisible:false,
            isChild:true,
            pageNum: 1,
            pageSize: 10,
            total: 20,
            titleName:'',
            labelPosition: 'left',
            treeData:[
                {
                    name:'节点1',
                    type:'closed'
                },
                {
                    name:'节点A1',
                    type:'current'
                },
                {
                    name:'节点B111111111111',
                    type:'after'
                },
                {
                    name:'节点C1',
                    type:'after'
                }
            ]
        };
    },
    components: {
      DynamicTable,
      Prosstree
    },
    created(){
    },
    computed:{
        
    },
    methods:{
        handleClose(){
            this.$emit('changeShow',false);
        },
        opentree(){
           this.ShowFinancVisible = true; 
        }
    },
    watch:{
        rowFCDtype(oldVal,newVal){
            this.ShowFinancVisible=this.rowFCDtype;
            let finandata=this.rowFCDDataObj.finanrowId;
            let formDataA ={};
            formDataA.id=finandata;
            this.title=this.rowFCDDataObj.nametitle;
            this.titleName='222222';
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
.titleClass{
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
}
</style>
<style>
  #mountNode{
    width: 500px;
    height:  500px;
    border:1px saddlebrown solid;
  }
  .div-style{
      width: 100%;
      height: 700px;
  }
</style>