<template>
    <div>
    <!-- 搜索框 -->
        <el-card class="box-table">
           <el-row :gutter="24">
                <el-col :span="11" :offset="13">
                    <el-button type="success" icon="el-icon-refresh" plain @click="refresh">刷新</el-button>
                    <el-button type="success" icon="el-icon-search" plain @click="search">查询</el-button>
                    <el-button type="warning" icon="el-icon-document" plain @click="Tolook">查看</el-button>
                    <el-button type="success" icon="el-icon-share" plain @click="baseInputTable('转发')">转发</el-button>
                    <el-button type="danger" icon="el-icon-more" plain @click="AdditionalApp()">加批</el-button>
                    <el-button type="danger" icon="el-icon-view" plain @click="basefollow()">关注</el-button>
                    <el-button type="danger" icon="el-icon-printer" plain @click="basePrinting()">打印</el-button>
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
        <el-dialog title="已办事项查询" :visible.sync="dialogWFMVisible" :close-on-click-modal="false" width="50%">
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
                <el-button type="primary" @click="addSubmit()" size="medium">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="已办事项" :visible.sync="dialogAddVisible" :close-on-click-modal="false" width="30%">
            <el-form
                :model="DataAddForm"
                label-width="97px"
                label-suffix="："
                size="small"
                :rules="rules"
                @submit.native.prevent
                label-position="right">
                    <el-row>
                        <el-col>
                            <el-form-item label="加批意见" prop="remark" style="margin-left: 10px;">
                                <el-input type="textarea" v-model="DataAddForm.remark" :rows="6" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false" size="medium">取 消</el-button>
                <el-button type="primary" @click="AdditionalSubmit()" size="medium">确 定</el-button>
            </div>
        </el-dialog>
        <PSpage  :rowPSDataObj="rowPSDataObj" :rowPStype="rowPStype" @changeShow="showORhideForPS"/>
        <baseInfoDialog  :rowUTSDataObj="rowUTSDataObj" :rowUTStype="rowUTStype" @changeShow="closeBaseInfo"/>
        <WAApage  :rowWAADataObj="rowWAADataObj" :rowWAAtype="rowWAAtype" @changeShow="showORhideForWAA"/>
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
      PSpage
    },
    inject: ['reload'],
    data() {
        return {
            companyoptions:[],
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
            proApartDialogF:false,
            dialogFormVisible:false,
            dialogWFMVisible:false,
            dialogAddVisible:false,
            titleStr:'',
            formCode:'',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            columns: [
            {
                type: 'selection'
            },
            {
                key: 'fcode',
                title: '用户名称'
            },
            {
                key: 'fname',
                title: '角色'
            },

        ],
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
                key: 'faddresser',
                title: '发起人'
            },
            {
                key: 'freceiveTime',
                title: '发起时间'
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
                key: 'processTime',
                title: '审批时间'
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
                key: 'entityoName',
                title: '当前审批人'
            },
             {
                key: 'trustMan',
                title: '转发人'
            },
             {
                key: 'trustTime',
                title: '转发时间'
            },
            {
                key: 'repeat',
                title: '委托人'
            },
             {
                key: 'repeatTime',
                title: '委托时间'
            },

        ],
        tableData:[],
        options:[],
        WFMtypeoptions:[],
        multipleSelection: [],
        checked:false,
         form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          fremark: ''
        },
        DataForm: {},
        DataAddForm: {},
        formLabelWidth: '120px',
        rules: {
          remark: [
            { required: true, message: '请输入加批意见', trigger: 'blur' },
          ]
         },
        };
    },

    created(){
        let fromdata={};
        fromdata.infosBeginNum=1;
        fromdata.infosEndNum=this.pageSize;
        fromdata.userId=localStorage.getItem("ms_userId")
        this.getHunTableData(fromdata);
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
        // 获取已办事项数据
        getHunTableData(params){
            let fromdata=params;
            this.$api.processSet.handledTask(fromdata).then(response => {
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
            this.getHunTableData(fromdata);
        },
        //刷新
        refresh(){
            this.reload();
        },
        //查询按钮点击事件
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
                let finandata={};
                finandata.selectData=selectData;
                finandata.finanrowname="人员缺省查询方案";
                finandata.finanrowId="QS_0056";
                finandata.nametitle="入库申请申请人审批";
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
            this.rowUTStype = false
        },
        //打印
        basePrinting(){

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
            fromdata.userId=localStorage.getItem("ms_userId");
            this.getHunTableData(fromdata);
        },
        //加批按钮点击事件
        AdditionalApp(){
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    let messageStr="确认要对选中的邮件进行附加批注么？";
                    let tital="已办事项加批";
                    this.$Uconfirm(tital,messageStr).then(() => {
                        this.dialogAddVisible=true;
                    }).catch(() => {
                        this.$message.success('取消加批!');
                    });
                }
            }else{
                this.$message.error('请选择一行你要加批的数据!');
            }
        },
        // 加批提交按钮点击事件
        AdditionalSubmit(){
            let remakeS=this.DataAddForm.remark;
            if(remakeS && remakeS!=''){
                let selectOption= this.multipleSelection;
                let fromdata={};
                fromdata.currUserId=localStorage.getItem('ms_userId');
                fromdata.bizMailId=selectOption[0].foid;
                fromdata.advice=this.DataAddForm.remark;
                this.$api.processSet.addSign(fromdata).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        this.dialogAddVisible=false;
                    } else {
                        this.$message.success('邮件加批失败!');
                    }
                });
            }else{
                this.$message.error('请选择一行你要加批的数据!');
            }
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
 /deep/ .el-textarea .el-input__count{
     background: #fff0;
 }
 /deep/ .el-textarea{
      width: 70%;
 }
 .Carfiles{
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
