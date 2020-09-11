<template>
    <div class="processStyle">
        <el-table
            :data="processtableData"
            v-loading="false"
            size="mini"
            ref="table"
            @selection-change="onSelectionChange"
            element-loading-text="加载中"
        >
            <el-table-column label="流程节点" prop="fname"></el-table-column>
            <el-table-column label="审批人" prop="handler"></el-table-column>
            <el-table-column label="审批结论" prop="fresult"></el-table-column>
            <el-table-column label="审批说明" prop="fopinion"></el-table-column>
            <el-table-column label="审批时间" prop="fcreateTime"></el-table-column>
            <el-table-column label="标准时间" prop="fmaxWorkTime"></el-table-column>
            <el-table-column label="耗时" prop="takeTime"></el-table-column>
            <el-table-column label="回复" >
                <template slot-scope="scope" >
                    <el-button size="mini" type="primary" @click="onRowbuttonClick(scope.row)">回复</el-button>
                </template>
            </el-table-column>
            <el-table-column type="expand" >
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <elreplypage :ReplyData="props.row.auditReplyMsg"></elreplypage>
                    </el-form>
                </template>
            </el-table-column>
            <!--<el-table-column label="纸质签收日期" prop="frewritedate"></el-table-column> 孙双说删除-->
        </el-table>
        <!--<div class="pagination" v-if="processtableData.length > 0">
            <el-pagination
                :total="total"
                background
                layout="prev, pager, next,jumper,total"
                :page-size="pageSize"
                @size-change="onSizeChange"
                @current-change="onCurrentChange"
            >
            </el-pagination>
        </div>-->
        <div><el-button @click="EditFileVisible()">查看流程图</el-button></div>
        <flowchart  :rowFCDDataObj="rowFCDDataObj" :rowFCDtype="rowFCDtype" @changeShow="closeflowchart"/>
        <replypage  :rowRMPDataObj="rowRMPDataObj" :rowRMPtype="rowRMPtype" @changeShow="closeReplyPage"/>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
import flowchart from './flow-chart-detail.vue';
import replypage from '../../components/common/reply/reply-main-page.vue';
import elreplypage from '../../components/common/reply/el-reply-main.vue';
export default {
    props: {
        rowDataprocessObj:Array,
        rowDataprocessOid:Object
    },
    name: 'basetable',
    components: {
        DynamicTable,
        replypage,
        elreplypage,
        flowchart
    },
    inject: ['reload'],
    data() {
        return {
            pageNum: 1,
            pageSize: 10,
            total: 20,
            rowFCDDataObj:{},
            rowFCDtype:false,
            ShowFinancVisible:false,
            formdata:[],
            fileList: [],
            rowRMPDataObj:{},
            rowRMPtype:false,
            labelPosition:'left',
            processtableData:[],
            processtableTmp: [
                {
                    Cnumber1:'qqqq',
                    Cnumber2:'1111',
                    Cnumber3:'3333',
                    Cnumber4:'33333',
                    Cnumber5:'33333',
                    Cnumber6:'wqw',
                    Cnumber7:'swsw',
                    Cnumber8:'sww222',
                    Cnumber9:'dede',
                    replydata:[
                        {
                            key:'1',
                            fromusername:'徐小磊',
                            tousername:'马小龙',
                            title:'龙哥，大神啊',
                            resub:[
                                {
                                    key:'2',
                                    fromusername:'徐婷婷',
                                    tousername:'徐小磊',
                                    title:'逗逼一枚',
                                    resub:[
                                        {
                                            key:'4',
                                            fromusername:'马小龙',
                                            tousername:'徐婷婷',
                                            title:'赞，👍',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            key:'3',
                            fromusername:'马小龙',
                            tousername:'徐小磊',
                            title:'逗逼一枚',
                        }
                    ]
                }
            ],
        };
    },
    mounted() {
    },
    methods: {
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //分页
        onSizeChange(val) {
            this.pageSize = val;
        },
        //流程图关闭
        closeflowchart(data){
            if(data === false){
                this.rowFCDtype = false
            }else{
                this.rowFCDtype = true
            }
        },
        //回复页面关闭
        closeReplyPage(data,type){
            this.rowRMPtype = false
            if(type === false){
                this.rowRMPtype = false
            }else{
                this.rowRMPtype = false
                //获取最新的回复信息
                this.$api.processSet.getAuditAndReplyMsg(data.foid).then(res=>{
            },error=>{
                console.log(error)
            })
            }
        },
        //下一页
        onCurrentChange(val) {},
        EditFileVisible(){
            let selectData=this.rowDataprocessOid;
            //this.$emit('changeShow',this.rowDataprocessObj);
            if(selectData.finanrowId){
                let finandata = {};
                finandata.finanrowname = selectData.finanrowname;
                finandata.finanrowId = selectData.finanrowId;
                finandata.nametitle = selectData.nametitle;
                this.rowFCDDataObj = finandata;
                this.rowFCDtype = true;
            }
        },
        //回复按钮点击事件
        onRowbuttonClick(data){
            let rowdata={};
            rowdata.senduser=localStorage.getItem('ms_username');
            rowdata.senduserId=localStorage.getItem('ms_userId');
            rowdata.staffId=data.handler2;
            rowdata.staffName=data.handler;
            rowdata.foid=data.foid;
            this.rowRMPDataObj=rowdata;
            this.rowRMPtype= true;
        }
    },
    watch:{
            rowDataprocessObj(oldVal,newVal){
                this.processtableData = this.rowDataprocessObj
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
.processStyle{
    margin-top: 20px;
    margin-left: 10px;
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
.replybutton{
    float: left;
    width: 20px;
    height: 20px;
}
</style>
<style>
.el-upload--text {
  vertical-align: bottom;
  width: auto;
  height: auto;
  border: none;
}
</style>