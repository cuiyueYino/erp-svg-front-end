<template>
    <div>
        <!-- 搜索框 -->
        <el-card class="box-card">
           <el-row :gutter="24" style='text-align:right'>
                 <el-col :span="10" :offset="14">
                     <el-button type="primary" icon="el-icon-refresh-right" size="small" plain @click="refresh">刷新</el-button>
                     <el-button type="primary" icon="el-icon-search" size="small" plain @click="search">查询</el-button>
                     <el-button type="info" icon="el-icon-view" size="small" plain @click="Tolook">查看</el-button>
                     <el-button type="success" icon="el-icon-position" size="small" plain @click="baseInputTable('转发')">转发</el-button>
                     <el-button type="warning" icon="el-icon-plus" size="small" plain @click="AddRow">添加</el-button>
                     <el-button type="warning" icon="el-icon-close" size="small" plain @click="DisableRow">取消</el-button>
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
                :tableRowClassName="tableRowClassName"
                v-loading="false"
                element-loading-text="加载中"
            ></dynamic-table>
        </el-card>
        <!-- 查询 -->
        <el-dialog title="关注事项" :visible.sync="dialogWFMVisible" :close-on-click-modal="false" width="50%">
            <el-form
                :model="DataForm"
                label-width="100px"
                class="dataForm"
                size="mini"
                :label-position="labelPosition">
                <el-card>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="pbackground">查询条件</el-col>
                        <el-col :span="6"  class="pbackground">操作符</el-col>
                        <el-col :span="12" class="pbackground">条件值</el-col>
                    </el-row>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="elColCenter">来源单据公司</el-col>
                        <el-col :span="6" class="elColCenter">等于</el-col>
                        <el-col :span="6">
                            <el-select v-model="DataForm.srcCompany" size="mini">
                                <el-option
                                    v-for="item in companyoptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="elColCenter">业务数据</el-col>
                        <el-col :span="6" class="elColCenter">等于</el-col>
                        <el-col :span="6">
                            <el-select v-model="DataForm.metaClass" size="mini">
                                <el-option
                                    v-for="item in WFMtypeoptions"
                                    :key="item.foid"
                                    :label="item.fname"
                                    :value="item.foid"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" size="mini">
                        <el-col :span="6" class="elColCenter">业务工作</el-col>
                        <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                        <el-col :span="6">
                        <el-input v-model="DataForm.activityName" size="mini"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" size="mini">
                        <el-col :span="6" class="elColCenter">主题</el-col>
                        <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                        <el-col :span="6">
                        <el-input v-model="DataForm.subject" size="mini"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="elColCenter">接收时间</el-col>
                        <el-col :span="6"  class="elColCenter">大于等于</el-col>
                        <el-col :span="6">
                            <el-date-picker
                                v-model="DataForm.receiveTimeFrom"
                                type="datetime"
                                size="mini"
                                default-time="12:00:00"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="elColCenter">接收时间</el-col>
                        <el-col :span="6"  class="elColCenter">小于等于</el-col>
                        <el-col :span="6">
                            <el-date-picker
                                v-model="DataForm.receiveTimeTo"
                                type="datetime"
                                size="mini"
                                default-time="12:00:00"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" size="mini">
                        <el-col :span="6" class="elColCenter">发起人</el-col>
                        <el-col :span="6"  class="elColCenter">等于</el-col>
                        <el-col :span="5">
                        <el-input v-model="DataForm.displaystartMan" size="mini"></el-input>
                        </el-col>
                        <el-col :span="1">
                        <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPS(DataForm)"></el-button>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="elColCenter">发起时间</el-col>
                        <el-col :span="6"  class="elColCenter">大于等于</el-col>
                        <el-col :span="6">
                            <el-date-picker
                                v-model="DataForm.startTimeFrom"
                                type="datetime"
                                size="mini"
                                default-time="12:00:00"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" >
                        <el-col :span="6" class="elColCenter">发起时间</el-col>
                        <el-col :span="6"  class="elColCenter">小于等于</el-col>
                        <el-col :span="6">
                            <el-date-picker
                                v-model="DataForm.startTimeTo"
                                type="datetime"
                                size="mini"
                                default-time="12:00:00"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <el-row class="elrowStyle" size="mini">
                        <el-col :span="6" class="elColCenter">超时</el-col>
                        <el-col :span="6"  class="elColCenter">等于</el-col>
                        <el-col :span="6">
                            <el-radio v-model="DataForm.overTime" label="1">是</el-radio>
                            <el-radio v-model="DataForm.overTime" label="2">否</el-radio>
                        </el-col>
                    </el-row>
                </el-card>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type='success' size="small" icon='el-icon-check' @click="onHandleMoreSearch()">确定</el-button>
                <el-button type='primary' icon='el-icon-refresh' size="small" @click="reset()">重置</el-button>
                <el-button type='warning' icon='el-icon-close' size="small" @click="dialogWFMVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <PSpage  :rowPSDataObj="rowPSDataObj" :rowPStype="rowPStype" @changeShow="showORhideForPS"/>
        <baseInfoDialog  :rowUTSDataObj="rowUTSDataObj" :rowUTStype="rowUTStype" @changeShow="closeBaseInfo"/>
        <flowchart  :rowFCDDataObj="rowFCDDataObj" :rowFCDtype="rowFCDtype" @changeShow="closeflowchart"/>
        <addConcItem  :rowACIDataObj="rowACIDataObj" :rowACItype="rowACItype" @changeShow="closeaddConcItem"/>
        <WAApage  :rowWAADataObj="rowWAADataObj" :rowWAAtype="rowWAAtype" :functionType="functionType" :seeFlag="seeFlag" @changeShow="showORhideForWAA"/>
    </div>
</template>
<style>
.el-table .green {
  background: rgba(130, 255, 140, 0.2);
}
.el-table .gray {
  background: rgba(192, 192, 192, 0.616);
}
.el-table .red {
  background: rgba(248, 15, 15, 0.178);
}
.el-table .white {
  background: rgba(255, 255, 255, 1);
}
.el-table .orange {
  background: #ffa000;
}
</style>
<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import PSpage from '../comment/personnel-search.vue';
import baseInfoDialog from './user-tree-search.vue';
import flowchart from '../comment/flow-chart-detail.vue';
import addConcItem from './add-concerns-item.vue';
import proData from '../../components/common/proData/proData';
import WAApage from './warehousing-applicant-approval.vue';
export default {
    name:'workProcess',
    components: {
      DynamicTable,
      flowchart,
      baseInfoDialog,
      addConcItem,
      PSpage,
      WAApage,
    },
    inject: ['reload'],
    data() {
        return {
            seeFlag:false,
            functionType:'',
            companyoptions:[],
            dialogWFMVisible:false,
            rowPStype:false,
            rowUTStype:false,
            rowFCDtype:false,
            baseInputTableF:false,
            financingLFCAtype:false,
            rowWAAtype:false,
            rowACItype:false,
            baseInputType:'',
            baseInputTitle:'',
            rowWAADataObj:{},
            rowPSDataObj:{},
            rowUTSDataObj:{},
            rowFCDDataObj:{},
            rowACIDataObj:{},
            pageNum: 1,
            pageSize: 10,
            total: 20,
            labelPosition: 'left',
            columns: [
                {
                    type: 'selection'
                },
                {
                    key: 'fstatus',
                    title: '状态'
                },
                {
                    key: 'fsrcCompany',
                    title: '单据类型'
                },
                {
                    key: 'factivityName',
                    title: '业务工作'
                },
                {
                    key: 'faddresser',
                    title: '发起人'
                },
                {
                    key: 'freceiveTime',
                    title: '发起时间'
                },
                {
                    key: 'entityoName',
                    title: '当前审批人'
                },
                {
                    key: 'fsubject',
                    title: '主题'
                },
                {
                    key: 'fpreReceiveTime',
                    title: '审批人接收时间'
                },
                {
                    key: 'fmaxWorkTime',
                    title: '标准用时'
                },
                {
                    key: 'takeTime',
                    title: '已耗时'
                },{
                    key: 'repeat',
                    title: '转发人'
                },
                {
                    key: 'repeatTime',
                    title: '转发时间'
                },
                {
                    key: 'trustMan',
                    title: '委托人'
                },
                {
                    key: 'trustTime',
                    title: '委托时间'
                }
            ],
            tableData:[],
            multipleSelection: [],
            checked:false,
            DataForm: {
                WFMtype: '',
                radio: 1,
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                fremark: ''
            },
            WFMtypeoptions:[],
            formLabelWidth: '120px',
        };
    },

    created(){
        let fromdata={};
        fromdata.infosBeginNum=1;
        fromdata.infosEndNum=this.pageSize;
        fromdata.userId=localStorage.getItem("ms_userId")
        this.getAttentionTask(fromdata);
        //查找业务数据
        let fromdata1={};
        //fromdata1.infosBeginNum=0;
        //fromdata1.infosEndNum=2000;
        this.getmetaClass(fromdata1);
        this.selectCom();
    },
    computed:{

    },
    methods:{
        selectCom(){
            this.$api.jobUserManagement.getCompanyData().then((res) => {
                if (res.status == "200") {
                    this.companyoptions= res.data.data.rows;
                }
            }),
            (error) => {
                console.log(error);
            };
        },
        //根据状态改背景色
        tableRowClassName({ row }) {
            if (row.fstatus === '暂停') {
                return 'gray';
            } else if (row.fstatus === '已作废') {
                return 'red';
            } else if (row.fstatus === '已完结') {
                return 'green';
            }else if(row.timeOutStatus =='1'){
                return "orange";
            }
            return '';
        },
        //查找业务数据
        getmetaClass(data){
            let fromdata={
                page:1,
                size:99999
            };
            this.$api.processSet.getProcessClass(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    this.WFMtypeoptions=returndata.data.rows;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        //查询关注事项
        getAttentionTask(data){
            let fromdata=data;
            this.$api.processSet.attentionTask(fromdata).then(response => {
                let responsevalue = response;
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
        baseInputTable(data){
            if(this.multipleSelection.length > 1){
                this.$message.error('只能选择一个');
            }else if(this.multipleSelection.length == 0){
                this.$message.error('请选择一项');
            }else{
                this.rowUTStype = true;
                let finandata={};
                finandata.finanrowname="人员缺省查询方案";
                finandata.finanrowId="QS_0056";
                finandata.nametitle="关注事项";
                finandata.SelectionData=this.multipleSelection;
                finandata.FunctionType=data;
                this.rowUTSDataObj=finandata;
            };
        },
        closeBaseInfo(data){
            if(data === false){
                this.rowUTStype = false
            }else{
                this.rowUTStype = true
            }
        },
        //多选
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //分页、下一页
        onCurrentChange(val){
            this.pageNum = val;
        },
        //刷新
        refresh(){
            this.reload();
        },
        //添加
        AddRow(){
            this.rowACItype = true;
            let finandata={};
            finandata.finanrowname="";
            finandata.finanrowId="";
            finandata.nametitle="关注事项";
            this.rowACIDataObj=finandata;
        },
        closeaddConcItem(data){
            if(data === false){
                this.rowACItype = false
            }else{
                this.rowACItype = true
            }
        },
        //取消
        DisableRow(){
            if(this.multipleSelection.length > 1){
                this.$message.error('只能选择一个');
            }else if(this.multipleSelection.length == 0){
                this.$message.error('请选择一项');
            }else{
                let selectData=this.multipleSelection;
                let fromdata={};
                fromdata.fvoucherOid=selectData[0].fsrcoId;
                fromdata.fattentionOid=localStorage.getItem("ms_staffId");
                this.$api.processSet.deleteAttention(fromdata).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data;
                        this.$message.success('删除关注成功!');
                        this.reload();
                    } else {
                        this.$message.success('数据库没有该条数据!');
                    }
                });
            }
        },
        //查看
        Tolook(){
            if(this.multipleSelection.length > 1){
                this.$message.error('只能选择一个');
            }else if(this.multipleSelection.length == 0){
                this.$message.error('请选择一项');
            }else{
                this.seeFlag = true;
                let selectData=this.multipleSelection;
                this.functionType = this.multipleSelection[0].classId;
                let finandata={};
                finandata.selectData=selectData;
                finandata.finanrowname="人员缺省查询方案";
                finandata.finanrowId="QS_0056";
                finandata.nametitle=this.multipleSelection[0].fsrcCompany;
                finandata.relay = true,
                finandata.attention = false,
                finandata.sign = false,
                finandata.commit = false,
                finandata.read = false,
                finandata.trust = false,
                this.rowWAADataObj=finandata;
                this.rowWAAtype=true;
                this.financingLFCAtype=true;
            }
        },

        //查看返回处理
        showORhideForWAA(data){
            if(data === false){
                this.rowWAAtype = false
            }else{
                this.rowWAAtype = true
            }
        },
        //流程图查看
        flowChart(){
            let selectData=this.multipleSelection;
            let finandata={};
            finandata.finanrowname="人员缺省查询方案";
            finandata.finanrowId="QS_0056";
            finandata.nametitle="入库申请申请人审批";
            this.rowFCDDataObj=finandata;
            this.rowFCDtype=true;
        },
        //流程图关闭
        closeflowchart(data){
            if(data === false){
                this.rowFCDtype = false
            }else{
                this.rowFCDtype = true
            }
        },
        //查询
        search(){
            this.dialogWFMVisible=true;
        },
        reset(){
            this.DataForm = {}
        },
        //高级搜索关注事项
        onHandleMoreSearch(){
            let fromdata={};
            fromdata.page=this.pageNum;
            fromdata.size=this.pageSize;
            let CompanyS=this.DataForm.srcCompany;
            if(CompanyS && CompanyS!=''){
                fromdata.srcCompany=this.DataForm.srcCompany;
            }
            let MetaCS=this.DataForm.metaClass;
            if(MetaCS && MetaCS!=''){
                fromdata.metaClass=this.DataForm.metaClass;
            }
            let activNS=this.DataForm.activityName;
            if(activNS && activNS!=''){
                fromdata.activityName=this.DataForm.activityName;
            }
            let subjectS=this.DataForm.subject;
            if(subjectS && subjectS!=''){
                fromdata.subject=this.DataForm.subject;
            }
            let receTFS=this.DataForm.receiveTimeFrom;
            if(receTFS && receTFS!=''){
                fromdata.receiveTimeFrom=this.DataForm.receiveTimeFrom;
            }
            let receTTS=this.DataForm.receiveTimeTo;
            if(receTTS && receTTS!=''){
                fromdata.receiveTimeTo=this.DataForm.receiveTimeTo;
            }
            let dispsMS=this.DataForm.displaystartMan;
            if(dispsMS && dispsMS!=''){
                fromdata.displaystartMan=this.DataForm.displaystartManId;
            }
            let StartTFS=this.DataForm.startTimeFrom;
            if(StartTFS && StartTFS!=''){
                fromdata.startTimeFrom=this.DataForm.startTimeFrom;
            }
            let StartTTS=this.DataForm.startTimeTo;
            if(StartTTS && StartTTS!=''){
                fromdata.startTimeTo=this.DataForm.startTimeTo;
            }
            let overTimeS=this.DataForm.overTime;
            if(overTimeS && overTimeS!=''){
                fromdata.overTime=this.DataForm.overTime;
            }
            this.getAttentionTask(fromdata);
        },
        //查询发起人员
        MoreSearchPS(data){
            this.rowPStype = true;
            let finandata=data;
            finandata.finanrowname="人员缺省查询方案";
            finandata.finanrowId="QS_0056";
            finandata.nametitle="工作流监控";
            this.rowPSDataObj=finandata;
        },
        //获取人员查询结果
        showORhideForPS(data,type){
            if(type === false){
                this.rowPStype = false
            }else{
                this.rowPStype = true
            }
            if(data.selectOptionID){
                this.DataForm.displaystartMan=data.selectOptionName;
                this.DataForm.displaystartManId=data.selectOptionID;
                this.DataForm.displaystartMancode=data.selectOptionCode;
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
