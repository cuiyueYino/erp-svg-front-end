<template>
    <div>
    <!-- 搜索框 -->
        <el-card class="box-table">
           <el-row :gutter="24">
               <el-col :span="14">
                    <el-button type="primary" plain @click="onSerchSubmit('day')">当日</el-button>
                    <el-button type="primary" plain @click="onSerchSubmit('week')">本周</el-button>
                    <el-button type="primary" plain @click="onSerchSubmit('month')" >本月</el-button>
                </el-col>
                 <el-col :span="10">
                     <el-button type="primary" icon="el-icon-refresh" plain @click="Basecarsh">刷新</el-button>
                     <el-button type="primary" icon="el-icon-search" plain @click="search">查询</el-button>
                     <el-button type="primary" icon="el-icon-document"  plain @click="Tolook">查看</el-button>
                     <el-button type="primary" icon="el-icon-share" plain @click="baseInputTable('转发')">转发</el-button>
                     <el-button type="primary" icon="el-icon-view" plain @click="basefollow">关注</el-button>
                 </el-col>
            </el-row>
        </el-card>
    <!-- 表格 -->
        <el-card class="box-card">
            <dynamic-table
                :columns="columns1"
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
    <!-- 弹出框 查询 -->
        <el-dialog title="已发事项查询" :visible.sync="dialogWFMVisible" :close-on-click-modal="false" width="50%">
            <el-form
                :model="DataForm"
                label-width="97px"
                label-suffix="："
                size="small"
                @submit.native.prevent
                label-position="right">
                 <el-row :gutter="24" >
                 <el-col :span="22" class="box-card" :offset="2">
                            <el-form-item label="来源单据公司" label-width="120px">
                                <el-select v-model="DataForm.srcCompany" clearable placeholder="请选择">
                                    <el-option
                                    v-for="item in companyoptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                 </el-col>
                   <el-col :span="22" class="box-card" :offset="2">
                             <el-form-item label="业务数据" label-width="120px">
                                <el-select v-model="DataForm.metaClass" clearable placeholder="请选择">
                                    <el-option
                                    v-for="item in WFMtypeoptions"
                                    :key="item.foid"
                                    :label="item.fname"
                                    :value="item.foid"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                   </el-col>
                    <el-col :span="22" :offset="2">
                            <el-form-item label="业务工作" label-width="120px">
                                <el-input clearable v-model="DataForm.activityName" placeholder="请输入" class="Carfiles"></el-input>
                            </el-form-item>
                    </el-col>
                     <el-col :span="22" :offset="2">
                            <el-form-item label="主题" label-width="120px">
                                <el-input clearable  v-model="DataForm.subject" placeholder="请输入" class="Carfiles"></el-input>
                            </el-form-item>
                     </el-col>
                      <el-col :span="22" :offset="2">
                            <el-form-item label="接收时间" label-width="120px">
                                <el-date-picker
                                      v-model="DataForm.receiveTimeFrom"
                                      type="datetimerange"
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"
                                      placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                      </el-col>
                       <el-col :span="22" :offset="2">
                            <el-form-item label="发起人" label-width="120px">
                                <el-input clearable  v-model="DataForm.displaystartMan" placeholder="请输入" class="Carfiles"></el-input>
                                 <img class="icon-search"
                                    @click="MoreSearchPS(DataForm)"
                                    src="../../assets/img/search.svg">
                            </el-form-item>
                       </el-col>
                        <el-col :span="22" :offset="2">
                            <el-form-item label="发起时间" label-width="120px">
                                <el-date-picker
                                    v-model="DataForm.startTimeFrom"
                                     type="datetimerange"
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"
                                      placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                         <el-col :span="22" :offset="2">
                            <el-form-item label="超时" label-width="120px">
                               <el-radio-group v-model="DataForm.overTime">
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                            </el-form-item>
                         </el-col>
                 </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="reset()">重 置</el-button>
                <el-button @click="dialogWFMVisible = false" size="medium">取 消</el-button>
                <el-button type="primary" @click="addSubmit('form')" size="medium">确 定</el-button>
            </div>
        </el-dialog>
        <PSpage  :rowPSDataObj="rowPSDataObj" :rowPStype="rowPStype" @changeShow="showORhideForPS"/>
        <baseInfoDialog  :rowUTSDataObj="rowUTSDataObj" :rowUTStype="rowUTStype" @changeShow="closeBaseInfo"/>
        <WAApage  :rowWAADataObj="rowWAADataObj" :rowWAAtype="rowWAAtype" :functionType="functionType" @changeShow="showORhideForWAA"/>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
import PSpage from '../comment/personnel-search.vue';
import WAApage from './warehousing-applicant-approval.vue';
import baseInfoDialog from './user-tree-search.vue';
export default {
    name:'issuedItems',
    components: {
      DynamicTable,
      WAApage,
      baseInfoDialog,
      PSpage,
    },
    inject: ['reload'],
    data() {
        return {
            functionType:'',
            homeTitle:'',
            userType:'',
            rowDStype:false,
            rowDSDataObj:{},
            rowPSDataObj:{},
            rowWAADataObj:{},
            rowUTSDataObj:{},
            rowPStype:false,
            rowUTStype:false,
            rowWAAtype:false,
            dialogWFMVisible:false,
            titleStr:'',
            formCode:'',
            pageNum: 1,
            pageSize: 10,
            total: 20,
        columns1: [
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
            },
             {
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
            },

        ],
        tableData:[],
        options:[],
        companyoptions:[],
        WFMtypeoptions:[],
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
        formLabelWidth: '120px',
         rules: {
          fcode: [
            { required: true, message: '请输入编码', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
           fname: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
          ],
         },
        };
    },

    created(){
        let fromdata={};
        fromdata.infosBeginNum=1;
        fromdata.infosEndNum=this.pageSize;
        fromdata.userId=localStorage.getItem("ms_userId")
        this.getIssuedItems(fromdata);
        //查找业务数据
        let fromdata1={};
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
            }
            return '';
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
        //已发事项查询
        getIssuedItems(data){
            let fromdata=data;
            this.$api.processSet.sendedTask(fromdata).then(response => {
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
        //查询按钮点击事件
        addSubmit(){
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
            let receTime= this.DataForm.receiveTimeFrom;
            if(receTime && receTime!=''){
                if(receTime[0]){
                    fromdata.receiveTimeFrom=receTime[0];
                }
                if(receTime[1]){
                    fromdata.receiveTimeTo=receTime[1];
                }
            }
            let dispsMS=this.DataForm.displaystartMan;
            if(dispsMS && dispsMS!=''){
                fromdata.displaystartMan=this.DataForm.displaystartManId;
            }
            let startTime= this.DataForm.startTimeFrom;
            if(startTime && startTime!=''){
                if(startTime[0]){
                    fromdata.startTimeFrom=startTime[0];
                }
                if(startTime[1]){
                    fromdata.startTimeTo=startTime[1];
                }
            }
            let overTimeS=this.DataForm.overTime;
            if(overTimeS && overTimeS!=''){
                fromdata.overTime=this.DataForm.overTime;
            }
            this.getIssuedItems(fromdata);
        },
        //转发按钮点击事件
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
                finandata.nametitle="待办事项";
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
        //查询已发事项
        search(){
           this.dialogWFMVisible =true;
        },
        reset(){
            this.DataForm = {}
        },
        //查看
        Tolook(){
            if(this.multipleSelection.length > 1){
                this.$message.error('只能选择一个');
            }else if(this.multipleSelection.length == 0){
                this.$message.error('请选择一项');
            }else{
                let selectData=this.multipleSelection;
                this.functionType = this.multipleSelection[0].classId;
                let finandata={};
                finandata.selectData=selectData;
                finandata.finanrowname="人员缺省查询方案";
                finandata.finanrowId="QS_0056";
                finandata.nametitle=this.multipleSelection[0].fsrcCompany;
                this.rowWAADataObj=finandata;
                this.rowWAAtype=true;
                this.financingLFCAtype=true;
            }
        },
        //查看详情页返回事件
        showORhideForWAA(data){
            if(data === false){
                this.rowWAAtype = false
            }else{
                this.rowWAAtype = true
            }
        },
        //刷新
        Basecarsh(){
            this.reload();
        },
        //关注点击事件
        basefollow(){
            if(this.multipleSelection.length > 1){
                this.$message.error('只能选择一个');
            }else if(this.multipleSelection.length == 0){
                this.$message.error('请选择一项');
            }else{
                let selectData=this.multipleSelection;
                let subject=selectData[0].fsubject;
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
                }
            }
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
            fromdata.userId=localStorage.getItem("ms_userId")
            this.getIssuedItems(fromdata);
        },
        onSerchSubmit(formName){
            let fromdata={};
            fromdata.infosBeginNum=0;
            fromdata.infosEndNum=10;
            fromdata.userId=localStorage.getItem("ms_userId");
            fromdata.buttonQuery=formName;
            this.getIssuedItems(fromdata);
        },
    },
}
</script>
<style lang="scss" scoped>
 /deep/ .el-textarea .el-input__count{
     background: #fff0;
 }
/deep/ .el-select{
    width: 70%;
}
 .Carfiles{
     width: 70%;
 }
 /deep/ .el-textarea .el-input__count{
     background: #fff0;
 }
 /deep/ .el-textarea{
      width: 70%;
 }
.box-table:first-child{
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
