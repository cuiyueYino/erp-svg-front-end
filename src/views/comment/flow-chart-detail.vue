<template>
    <div>
        <el-dialog :title="title" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false"  width="60%">
            <el-card>
                <div class="titleClass">{{titleName}}</div>
                <div class="tree-tyle">
                    <div class="tree-tyle-Closed">已处理节点</div>
                    <div class="tree-tyle-current">当前节点</div>
                    <div class="tree-tyle-after">未处理的节点</div>
                </div>
                <div class="div-style">
                    <Workflowtree  :convertData="treeData" />
                </div>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import PSpage from '../comment/personnel-search.vue';
import Prosstree from '../../components/common/processTree/index.vue'
import Workflowtree from '../../components/common/processTree/workflow-tree.vue'
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
                    tatile:'wqwq',
                    type:'closed'
                },
                {
                    name:'节点A1',
                    tatile:'wqwq',
                    type:'current'
                },
                {
                    name:'节点B11111',
                    tatile:'wqwq',
                    type:'after'
                },
                {
                    name:'节点C1',
                    tatile:'wqwq',
                    type:'after'
                },
                {
                    name:'节点C12',
                    tatile:'wqwq',
                    type:'after'
                },
                {
                    name:'节点C13',
                    tatile:'wqwq',
                    type:'after'
                },
                {
                    name:'节点C14',
                    tatile:'wqwq',
                    type:'after'
                },
                {
                    name:'节点C15',
                    tatile:'wqwq',
                    remak:'error end',
                    type:'after'
                },
                {
                    name:'节点C122',
                    tatile:'wq22wq',
                    remak:'error end',
                    type:'after'
                },
                {
                    name:'节点C322',
                    tatile:'wq22wq',
                    remak:'error end',
                    type:'after'
                },
                {
                    name:'节点C34',
                    tatile:'wq22wq',
                    remak:'error end',
                    type:'after'
                },
                {
                    name:'节点C344',
                    tatile:'wq22wq',
                    remak:'error end',
                    type:'after'
                },
                {
                    name:'节点C344',
                    tatile:'wq22wq',
                    remak:'error end',
                    type:'after'
                },
                {
                    name:'节点C344',
                    tatile:'wq22wq',
                    remak:'error end',
                    type:'after'
                },
                {
                    name:'节点C344',
                    tatile:'wq22wq',
                    remak:'error end',
                    type:'after'
                },
                {
                    name:'节点C344',
                    tatile:'wq22wq',
                    remak:'error end',
                    type:'after'
                }
            ]
        };
    },
    components: {
      DynamicTable,
      Prosstree,
      Workflowtree
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
            this.titleName='工程付款流程';
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
.tree-tyle{
    width: 100%;
    height: 100px;
    top:0;
    left:10px;
}
.tree-tyle-Closed{
    float: left;
    width: 100px;
    height: 30px;
    line-height: 30px;
    margin-left: 20px;
    text-align: center;
    border-radius: 10px;
    background-color: aquamarine;
}
.tree-tyle-current{
    float: left;
    width: 100px;
    height: 30px;
    line-height: 30px;
    margin-left: 20px;
    text-align: center;
    border-radius: 10px;
    background-color:#E6A23C;
}
.tree-tyle-after{
    float: left;
    width: 100px;
    height: 30px;
    line-height: 30px;
    margin-left: 20px;
    text-align: center;
    border-radius: 10px;
    background-color:darkgray;
}
</style>