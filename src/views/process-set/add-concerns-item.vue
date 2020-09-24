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
                <el-card>
                    <el-row :gutter="24">
                        <el-col :span="9" :offset="15">
                            <el-button type="primary" icon="el-icon-refresh-right" size="small"  @click="refresh">刷新</el-button>
                            <el-button type="primary" icon="el-icon-search" size="small"  @click="search">查询</el-button>
                            <el-button type="info" icon="el-icon-view" size="small"  @click="Tolook">查看</el-button>
                            <el-button type="success" icon="el-icon-star-off" size="small"  @click="effectOrDisableMsg">关注</el-button>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card>
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
            </el-form>
        </el-dialog>
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
                                    v-for="item in companyData"
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
                <el-button type='warning' icon='el-icon-close' size="small" @click="dialogWFMVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <PSpage  :rowPSDataObj="rowPSDataObj" :rowPStype="rowPStype" @changeShow="showORhideForPS"/>
        <WAApage  :rowWAADataObj="rowWAADataObj" :rowWAAtype="rowWAAtype" :functionType="functionType" :seeFlag="seeFlag" @changeShow="showORhideForWAA"/>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
import PSpage from '../comment/personnel-search.vue';
import WAApage from './warehousing-applicant-approval.vue';
export default {
    props: {
        rowACIDataObj: Object,
        rowACItype:{
             type: Boolean,
             default: false
        },
    },
    name: 'basetable',
    components: {
        DynamicTable,
        PSpage,
        WAApage
    },
    inject: ['reload'],
    data: function() {   
        return {
            atctiveName: 'first',
            ShowFinancVisible:false,
            labelPosition: 'left',
            disabled:false,
            functionType:'',
            seeFlag:false,
            dialogWFMVisible:false,
            rowPStype:false,
            rowWAAtype:false,
            rowWAADataObj:{},
            rowPSDataObj:{},
            companyData:[],
            commonMeta:new proData().commonMetaClass,
            objectoptions:new proData().project,
            formdata: {
                radio:1,
                remark:''
            },
            DataForm:{
            },
            WFMtypeoptions:[],
            multipleSelection:[],
            pageNum: 1,
            pageSize: 10,
            total: 20,
            prechecked:'',
            title:'',
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
                    key: 'fpreAddresser',
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
                }
            ],
            tableData:[],
        };
    },
    methods: {
        selectCom(){
            this.$api.jobUserManagement.getCompanyData().then((res) => {
                if (res.status == "200") {
                    this.companyData= res.data.data.rows;
                }
            }),
            (error) => {
                console.log(error);
            };
        },
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.ShowFinancVisible=false;
            this.$emit('changeShow',false);
        },
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //分页
        onSizeChange(val) {
            this.pageSize = val;
        },
        //下一页
        onCurrentChange(val) {
            let fromdata={};
            fromdata.infosBeginNum=(val-1)*10 +1;
            fromdata.infosEndNum=val*10;
            fromdata.type='1';
            fromdata.userId=localStorage.getItem("ms_userId");
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
            this.getHunTableData(fromdata);
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
        //流程图
        showprocessData(data){
            console.log(data)
        },
        //刷新
        refresh(){
            let fromdata={};
            fromdata.infosBeginNum=1;
            fromdata.infosEndNum=this.pageSize;
            fromdata.type='1';
            fromdata.userId=localStorage.getItem("ms_userId")
            this.getHunTableData(fromdata);
        },
        //查询
        search(){
            this.dialogWFMVisible=true;
        },
        //查看
        Tolook(){
            if(this.multipleSelection){
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
                    finandata.relay = false,
                    finandata.attention = false,
                    finandata.sign = false,
                    finandata.commit = false,
                    finandata.read = false,
                    finandata.trust = false,
                    this.rowWAADataObj=finandata;
                    this.rowWAAtype=true;
                    this.financingLFCAtype=true;
                }
            }else {
                this.$message.error('请选择一项');
            }
        },
        showORhideForWAA(data){
            if(data === false){
                this.rowWAAtype = false
            }else{
                this.rowWAAtype = true
            }
        },
        //查询搜索
        onHandleMoreSearch(){
            let fromdata={};
            fromdata.infosBeginNum=1;
            fromdata.infosEndNum=this.pageSize;
            fromdata.type='1';
            fromdata.userId=localStorage.getItem("ms_userId");
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
            this.dialogWFMVisible = false;
            this.getHunTableData(fromdata);
        },
        //关注按钮点击事件
        effectOrDisableMsg(){
            if(this.multipleSelection.length > 1){
                this.$message.error('只能选择一个');
            }else if(this.multipleSelection.length == 0){
                this.$message.error('请选择一项');
            }else{
                let selectData=this.multipleSelection;
                /*let subject=selectData[0].fsubject;
                subject= subject.substring(0,3);
                if(subject.indexOf('转发')>-1){
                    this.$message.error('转发邮件不能添加关注!');
                }else if(subject.indexOf('抄送')>-1){
                    this.$message.error('抄送邮件不能添加关注!');
                }else if(subject.indexOf('加签')>-1){
                    this.$message.error('加签邮件不能添加关注!');
                }else{
                    let fromdata={};
                    fromdata.fvoucherOid=selectData[0].fsrcoId;
                    fromdata.fattentionOid=localStorage.getItem("ms_userId");
                    this.$api.processSet.addAttention(fromdata).then(response => {
                        let responsevalue = response;
                        if (responsevalue) {
                            let returndata = responsevalue.data;
                            this.$message.success('添加关注成功!');
                            this.reload();
                        } else {
                            this.$message.success('数据库没有该条数据!');
                        }
                    });
                }*/
                // bug 730
                let fromdata={};
                fromdata.fvoucherOid=selectData[0].fsrcoId;
                fromdata.fattentionOid=localStorage.getItem("ms_userId");
                this.$api.processSet.addAttention(fromdata).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data;
                        this.$message.success('添加关注成功!');
                        this.reload();
                    } else {
                        this.$message.success('数据库没有该条数据!');
                    }
                });
            }
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
        //获取待办事项
        getHunTableData(data){
            let fromdata=data;
            this.$api.processSet.getunhandledTask(fromdata).then(response => {
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
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            }); 
        },
        //查找业务数据
        getmetaClass(data){
            let fromdata=data;
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
    },
    mounted() {
    },
    watch:{
        rowACItype(oldVal,newVal){
            if(this.rowACItype){
                this.ShowFinancVisible=this.rowACItype;
                let finandata=this.rowACIDataObj.finanrowId;
                let formDataA ={};
                formDataA.id=finandata;
                this.title=this.rowACIDataObj.nametitle;
                let fromdata={};
                fromdata.infosBeginNum=1;
                fromdata.infosEndNum=this.pageSize;
                fromdata.type='1';
                fromdata.userId=localStorage.getItem("ms_userId");
                this.getHunTableData(fromdata);
                //查找业务数据
                let fromdata1={};
                //fromdata1.infosBeginNum=0;
                //fromdata1.infosEndNum=2000;
                this.getmetaClass(fromdata1);
                this.selectCom();
            }
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
.el-dialog__body{
    padding: 0;
}
.el-card__header{
    padding: 10px 20px;
}
</style>
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