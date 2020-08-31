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
            treeData:[]
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
            if(this.rowFCDtype){
                let finandata=this.rowFCDDataObj.finanrowId;
                let formDataA ={};
                formDataA.bizMailId=finandata;
                formDataA.currUserId=localStorage.getItem("ms_userId");
                this.title=this.rowFCDDataObj.nametitle;
                this.titleName=this.rowFCDDataObj.finanrowname;
                //fstatus 1-外处理 2当前节点 3 已处理 -2 结束
                this.$api.processSet.viewProcess(formDataA).then(response=>{
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data;
                        let tableDataArr=returndata.data;
                        for(let i=0;i<tableDataArr.length;i++){
                            if(tableDataArr[i].fstatus){
                                if(tableDataArr[i].fstatus ==='1'){
                                    tableDataArr[i].type="after";
                                }else if(tableDataArr[i].fstatus ==='2'){
                                    tableDataArr[i].type="current";
                                }else if(tableDataArr[i].fstatus ==='3'){
                                    tableDataArr[i].type="closed";
                                }else{
                                    tableDataArr[i].type="after";
                                }   
                            }else{
                                tableDataArr[i].type="after";
                            }
                            tableDataArr[i].remak=tableDataArr[i].fstatusDesc;
                            if(tableDataArr[i].participators){
                                let tatileS = tableDataArr[i].participators;
                                let tatileArr=tatileS.split(',');
                                if(tatileArr.length > 5){
                                    let tatileStr='';
                                    for(let j=0;j<5;j++){
                                        tatileStr+=tatileArr[j]+',';
                                    }   
                                    tableDataArr[i].tatile=tatileStr+"...";
                                }else{
                                    tableDataArr[i].tatile=tableDataArr[i].participators;
                                }
                            }else{
                                tableDataArr[i].tatile=tableDataArr[i].participators;
                            }
                            //tableDataArr[i].tatile=tableDataArr[i].participators;
                            tableDataArr[i].name=tableDataArr[i].name?tableDataArr[i].name:tableDataArr[i].activityName;
                        }
                        this.treeData=tableDataArr;
                        this.ShowFinancVisible=this.rowFCDtype;
                    } else {
                        this.$message.success('数据库没有该条数据!');
                    }
                });
            }
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