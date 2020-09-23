<template>
    <div>     
        <!-- 搜索框 -->
        <el-card class="box-card">
           <el-row :gutter="24">
                 <el-col :span="2" :offset="22">
                     <el-button type="warning" icon="el-icon-bangzhu" size="small"  @click="RestoreData">还原</el-button>
                 </el-col>
            </el-row>
        </el-card>
        <!-- 表格 -->
        <el-card class="box-card">
            <dynamic-table
                :columns="columns"
                :table-data="tableData"
                :total="total"
                :page-num="pageNum"
                :page-size="pageSize"
                @current-change="onCurrentChange"
                @selection-change="onSelectionChange"
                v-loading="false"
                element-loading-text="加载中"
            ></dynamic-table>
        </el-card>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    name:'recycleBin',
    components: {
      DynamicTable,
    },
    inject: ['reload'],
    data() {
        return {
            pageNum: 1,
            pageSize: 10,
            total: 20,
            columns: [
                {
                    type: 'selection'
                },
                {
                    key: 'statusStr',
                    title: '状态'
                },
                {
                    key: 'metaClassName',
                    title: '单据类型'
                },
                {
                    key: 'destNodeName',
                    title: '业务工作'
                },
                {
                    key: 'startMan',
                    title: '发起人'
                },
                {
                    key: 'startTime',
                    title: '发起时间'
                },
                {
                    key: 'subject',
                    title: '主题'
                },
                {
                    key: 'addresser',
                    title: '上一节点'
                },
                {
                    key: 'receiveTime',
                    title: '审批人接收时间'
                },
                {
                    key: 'standardTime',
                    title: '标准用时'
                },
                {
                    key: 'handleTime',
                    title: '已耗时'
                },
                {
                    key: 'encyclicMan',
                    title: '转发人'
                },
                {
                    key: 'encyclicTime',
                    title: '转发时间'
                },
                {
                    key: 'transmitMan',
                    title: '委托人'
                },
                {
                    key: 'transmitTime',
                    title: '委托时间'
                },
                {
                    key: 'completeTime',
                    title: '移除时间'
                },
            
            ],
            tableData:[],
            multipleSelection: []
            };
    },
    
    created(){
        let fromdata={};
        fromdata.infosBeginNum=0;
        fromdata.infosEndNum=this.pageSize;
        fromdata.size=this.pageSize;
        fromdata.page=this.pageNum;
        fromdata.oid=localStorage.getItem("ms_userId")
        this.getrecycleBin(fromdata);
    },
    computed:{
        
    },
    methods:{
        //查询回收站数据
        getrecycleBin(params){
            let fromdata=params;
            this.$api.processSet.getRecycleBinList(fromdata).then(response => {
                let responsevalue = response;
                console.log(response)
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    if(returndata.data){
                        let tableArr=returndata.data.rows;
                        this.tableData=tableArr;
                        this.total=returndata.data.total;
                    }else{
                        this.tableData=[];
                        this.total=0;
                    }
                    this.dialogWFMVisible=false;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        //多选
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //分页、下一页
        onCurrentChange(val){
            let fromdata={};
            fromdata.infosBeginNum=(val-1)*10;
            fromdata.infosEndNum=val*10;
            fromdata.size=this.pageSize;
            fromdata.page=this.pageNum;
            fromdata.oid=localStorage.getItem("ms_userId")
            this.getrecycleBin(fromdata);
        },
        //还原数据
        RestoreData(){
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                let IDStrL='';
                for(var i=0;i<selectOption.length;i++){
                    IDStrL+=selectOption[i].foid+',';
                }
                IDStrL=IDStrL.slice(0, IDStrL.length -1);
                let fromdata={};
                fromdata.foids=IDStrL;
                fromdata.oid=localStorage.getItem("ms_userId");
                this.$api.processSet.reductionRecycleBin(fromdata).then(response => {
                    let responsevalue = response;
                    if(responsevalue.data.data.msg=='success'){
                        this.$message.success('数据还原成功!');
                        this.reload();
                    }else{
                        this.$message.error('还原数据失败!');    
                    }
                });
            }else{
                this.$message.error('请选择一行你要还原的数据!');
            }
        },
    },
}
</script>
<style lang="scss" scoped>
 /deep/ .el-textarea .el-input__count{
     background: #fff0;
 }
/deep/ .el-select{
    width: 100%;
}
 /deep/ .el-textarea .el-input__count{
     background: #fff0;
 }
 /deep/ .el-textarea{
      width: 70%;
 }

.box-card:first-child{
    margin-bottom: 16px;
}
.search-all{
    margin-left: 50px;
}
.icon-search{
     width: 24px;
     height: auto;
     margin-left: 12px;
     cursor: pointer;
 }
 .joinTableBox{
     margin-bottom:30px;
 }
  .joinBtnBox{
     display: flex;
     align-items: center;
     flex-wrap: wrap;
     justify-content: center;
     button{
         margin-bottom: 10px;
     }
     /deep/ .el-button+.el-button{
         margin-left: 0; 
     }
 }
 

</style>