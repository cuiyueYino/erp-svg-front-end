<template>
    <div>
        <el-dialog title="综合授信合同登记" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="70%">
            <el-form
                label-width="110px"
                v-model="formdata"
                class="dataForm"
                :rules="rules"
                :model="formdata"
                size="mini"
                :label-position="labelPosition"
            >
                <el-card>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="公司" prop="company">
                                <el-select v-model="formdata.company" value-key="value" v-bind:disabled="disabled">
                                    <el-option
                                        v-for="item in companyoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" :offset="3">
                            <el-form-item >
                                <el-checkbox v-model="checked">连续追加</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信合同编码" prop="contractcode">
                                <el-input v-model="formdata.contractcode" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="合同名称">
                                <el-input v-model="formdata.contractname" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="2">
                            <el-form-item label="授信主体" prop="partaname">
                                <el-input v-model="formdata.partaname" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                        <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchcreditSubject(formdata)"></el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信额度" prop="awardamount">
                                <el-input v-model="formdata.awardamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信品种">
                                <el-input v-model="formdata.awardcreditbreedname" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="2">
                            <el-form-item label="授信银行" prop="awardbankname">
                                <el-input v-model="formdata.awardbankname" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchBankVisible(formdata)"></el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信调整额度">
                                <el-input v-model="formdata.awardadjamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信占用">
                                <el-input v-model="formdata.awardoccupy" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信天数" prop="awarddays">
                                <el-input v-model="formdata.awarddays" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" >
                            <el-form-item label="授信可用额度">
                                <el-input v-model="formdata.awardableamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信余额">
                                <el-input v-model="formdata.awardover" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信起始日" prop="startdate">
                                <el-date-picker
                                    v-model="formdata.startdate"
                                    type="date"
                                    @change="updateShouxinStartDate(formdata)"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" >
                            <el-form-item label="授信到期日" prop="enddate">
                                <el-date-picker
                                    v-model="formdata.enddate"
                                    type="date"
                                    @change="updateShouxinEndDate(formdata)"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="剩余天数">
                                <el-input v-model="formdata.overdays" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="经办人">
                                <el-input v-model="formdata.handler" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" >
                            <el-form-item label="经办部门">
                                <el-input v-model="formdata.gestordeptname" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="经办时间">
                                <el-input v-model="formdata.voucherdateStr" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="项目描述">
                                <el-input type="textarea" v-model="formdata.remark" :rows="8" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-tabs v-model="atctiveName" @tab-click="handleClick">
                        <el-tab-pane label="授信品种管理" name="first">
                           <Newcreditvarieties :rowDatavarietObj="rowDatavarietObj" :financingCVMListtype="financingCVMListtype"  @changeShow="showvarietData"/> 
                        </el-tab-pane>
                        <el-tab-pane label="附件" name="second">
                            <enclosurefile :rowDataFileObj="rowDataFileObj"  @changeShow="showFileData"/> 
                        </el-tab-pane>
                    </el-tabs>
                    <processnodelist :rowDataprocessObj="rowDataprocessObj"  @changeShow="showprocessData"/> 
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveNewAndEdit()">提交</el-button>
                <el-button @click="ZancunNewAndEdit()">暂存</el-button>
            </span>
        </el-dialog>
        <creditSubjectSearch :rowDataObj="rowDataObj" :financingtype="financingtype" @changeShow="showfinancingData"/>
        <creditBankSearch :rowBankDataObj="rowBankDataObj" :financingBanktype="financingBanktype" @changeShow="showfinancingBankData"/>
    </div>
</template>

<script>
import DynamicTable from '../../../components/common/dytable/dytable.vue';
import proData from '../../../components/common/proData/proData';
import creditSubjectSearch from '../credit-subject-search.vue';
import creditBankSearch from '../credit-bank-search.vue';
import Newcreditvarieties from '../New-credit-varieties-management.vue';
import enclosurefile from '../enclosure-file.vue';
import processnodelist from '../process-node-list.vue';
export default {
    props: {
        NewFCRtype: Boolean,
        rowNewFCRDataObj:Object
    },
    name: 'basetable',
    components: {
        DynamicTable,
        creditSubjectSearch,
        creditBankSearch,
        Newcreditvarieties,
        enclosurefile,
        processnodelist
    },
    inject: ['reload'],
    data: function() {   
        return {
            sdddd:[],
            rowDataObj:{},
            rowBankDataObj:{},
            rowDatavarietObj:{},
            rowDataFileObj:{},
            rowDataprocessObj:{},
            FiletableData: [],
            RegistrationtableData: [],
            nametitle:'综合授信合同登记',
            financingtype:false,
            financingBanktype:false,
            financingCVMListtype:false,
            newOrEdit:'New',
            finanrowId:'',
            finanrowname:'',
            financingformdata:{},
            financingBankformdata:{},
            atctiveName: 'first',
            ShowFinancVisible:false,
            labelPosition: 'left',
            disabled:false,
            checked:false,
            companyoptions:new proData().company,
            objectoptions:new proData().project,
            formdata: {
                company: '',
                contractcode:'',
                contractname: '',
                parta: '',
                partaname: '',
                awardamount: 0.00,
                awardcreditbreed: '',
                awardcreditbreedname: '',
                awardbank: '',
                awardbankname: '',
                awardadjamount: 0.00,
                awardoccupy: 0.00,
                awarddays: 0,
                awardableamount: 0.00,
                awardover: 0.00,
                startdate: '',
                enddate: '',
                overdays: 0,
                handler: '',
                handlerName: '',
                voucherdate: '',
                voucherdateStr: '',
                gestordept: '',
                gestordeptname: '',
                remark: '',
            },
            rules: {
                partaname:[{ required: true, message: '请选择授信主体', trigger: 'blur' }],
                company:[{ required: true, message: '请选择公司', trigger: 'blur' }],
                contractcode:[{ required: true, message: '请输入授信合同编码', trigger: 'blur' }],
                awardamount:[{ required: true, message: '请输入授信额度', trigger: 'blur' }],
                awardbankname:[{ required: true, message: '请选择授信银行', trigger: 'blur' }],
                awarddays:[{ required: true, message: '授信天数', trigger: 'blur' }],
                startdate:[{ required: true, message: '请输入授信起始日', trigger: 'blur' }],
                enddate:[{ required: true, message: '请输入授信到期日', trigger: 'blur' }],
            }
        };
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.$emit('changeShow',false);
        },
        //滑块切换
        handleClick(tab){
            var tabsname =tab.paneName;
            if(tabsname){
                if(tabsname ==="first"){
                    //授信品种管理
                    this.financingCVMListtype=true;
                }else{
                    //附件列表
                    this.financingCVMListtype=false;
                }
            }
        },
        //提交确认
        saveNewAndEdit(){
            let savreFlag=true;
            let companyS= this.formdata.company;
            if(companyS== ''){
                savreFlag=false;
                this.$message.error('请选择公司!');
            }else{
                let RegistrData=this.RegistrationtableData;
                for(var k=0;k<RegistrData.length;k++){
                    RegistrData[k].company=companyS;
                }
                this.RegistrationtableData=RegistrData;
            }
            let codeS= this.formdata.contractcode;
            if(codeS== ''){
                savreFlag=false;
                this.$message.error('请输入授信合同编码!');
            }
            let partaS= this.formdata.partaname;
            if(partaS== ''){
                savreFlag=false;
                this.$message.error('请选择授信主体!');
            }
            let awardamountS= this.formdata.awardamount;
            if(awardamountS== ''){
                savreFlag=false;
                this.$message.error('请输入授信额度!');
            }
            let awardbankNameS= this.formdata.awardbankname;
            if(awardbankNameS== ''){
                savreFlag=false;
                this.$message.error('请选择授信银行!');
            }
            let awarddaysS= this.formdata.awarddays;
            if(awarddaysS== ''){
                savreFlag=false;
                this.$message.error('授信天数不能为空!');
            }
            let startdateS= this.formdata.startdate;
            if(startdateS== ''){
                savreFlag=false;
                this.$message.error('请输入授信起始日!');
            }
            let enddateS= this.formdata.enddate;
            if(enddateS== ''){
                savreFlag=false;
                this.$message.error('请输入授信到期日!');
            }
            let remarkS= this.formdata.remark;
            let fromObj={};
            fromObj=this.formdata;
            fromObj.creator=localStorage.getItem('ms_userId');
            if(this.newOrEdit == 'New'){
                fromObj.oprStatus=1;
            }else if(this.newOrEdit == 'Edit'){
                fromObj.oprStatus=2;
            }else{
                fromObj.oprStatus=0;    
            }
            fromObj.complexCreditContractRegisterLineSaveVos=this.RegistrationtableData;
            let checkedS = this.checked; 
            let nameS= this.formdata.contractname;
            let messageStr=codeS+":"+nameS+"?";
            let tital="提交确认:";
            if(savreFlag){
                this.$Uconfirm(tital,messageStr).then(() => {
                    this.$api.task.insertComplexCreditContractRegisterVO(fromObj).then(response => {
                        let responsevalue = response;
                        if (responsevalue) {
                            let returndata = responsevalue.data;
                            if(checkedS ===true){
                                this.reload();
                                this.$emit('changeShow',true);
                                //this.onRowAddButtonClick();
                            }else{
                                this.reload();
                                this.$emit('changeShow',false);
                            }
                        } else {
                            this.$message.success('数据库没有该条数据!');
                        }
                    });
                }).catch(() => {
                    this.$message.success('取消提交!');
                });
            }
        },
        ZancunNewAndEdit(){
            let savreFlag=true;
            let companyS= this.formdata.company;
            if(companyS== ''){
                savreFlag=false;
                this.$message.error('请选择公司!');
            }else{
                let RegistrData=this.RegistrationtableData;
                for(var k=0;k<RegistrData.length;k++){
                    RegistrData[k].company=companyS;
                }
                this.RegistrationtableData=RegistrData;
            }
            let codeS= this.formdata.contractcode;
            if(codeS== ''){
                savreFlag=false;
                this.$message.error('请输入授信合同编码!');
            }
            let partaS= this.formdata.partaname;
            if(partaS== ''){
                savreFlag=false;
                this.$message.error('请选择授信主体!');
            }
            let awardamountS= this.formdata.awardamount;
            if(awardamountS== ''){
                savreFlag=false;
                this.$message.error('请输入授信额度!');
            }
            let awardbankNameS= this.formdata.awardbankname;
            if(awardbankNameS== ''){
                savreFlag=false;
                this.$message.error('请选择授信银行!');
            }
            let awarddaysS= this.formdata.awarddays;
            if(awarddaysS== ''){
                savreFlag=false;
                this.$message.error('授信天数不能为空!');
            }
            let startdateS= this.formdata.startdate;
            if(startdateS== ''){
                savreFlag=false;
                this.$message.error('请输入授信起始日!');
            }
            let enddateS= this.formdata.enddate;
            if(enddateS== ''){
                savreFlag=false;
                this.$message.error('请输入授信到期日!');
            }
            let remarkS= this.formdata.remark;
            let fromObj={};
            fromObj=this.formdata;
            fromObj.creator=localStorage.getItem('ms_userId');
            if(this.newOrEdit == 'New'){
                fromObj.oprStatus=1;
            }else if(this.newOrEdit == 'Edit'){
                fromObj.oprStatus=2;
            }else{
                fromObj.oprStatus=0;    
            }
            fromObj.complexCreditContractRegisterLineSaveVos=this.RegistrationtableData;
            let checkedS = this.checked; 
            let nameS= this.formdata.contractname;
            let messageStr=codeS+":"+nameS+"?";
            let tital="提交确认:";
            if(savreFlag){
                this.$Uconfirm(tital,messageStr).then(() => {
                    this.$api.task.insertZCComplexCreditContractRegisterVO(fromObj).then(response => {
                        let responsevalue = response;
                        if (responsevalue) {
                            let returndata = responsevalue.data;
                            if(checkedS ===true){
                                this.reload();
                                this.$emit('changeShow',true);
                                //this.onRowAddButtonClick();
                            }else{
                                this.reload();
                                this.$emit('changeShow',false);
                            }
                        } else {
                            this.$message.success('数据库没有该条数据!');
                        }
                    });
                }).catch(() => {
                    this.$message.success('取消提交!');
                });
            }
        },
        //查询授信主体
        MoreSearchcreditSubject(data){
            let finanrwodata=data;
            finanrwodata.finanrowname="甲方单位";
            finanrwodata.finanrowId="4E1712231426568201";
            finanrwodata.nametitle="综合授信合同登记";
            this.rowDataObj=finanrwodata;
            this.financingtype=true;
        },
        //获取授信主题数据
        showfinancingData(data,type){
            if(data.searchRowCSSid){
                this.formdata.parta=data.searchRowCSSid;
                this.formdata.partaname=data.searchRowCSSname;
            }
            this.financingformdata=data;
            if(type === false){
                this.financingtype = false
            }else{
                this.financingtype = true
            }
        },
        //查询授信银行
        MoreSearchBankVisible(data){
            let finandata=data;
            finandata.finanrowname="资金类客户缺省查询方案";
            finandata.finanrowId="401901281025522001";
            finandata.nametitle="综合授信合同登记";
            this.rowBankDataObj=finandata;
            this.financingBanktype=true;
        },
        //获取授信银行
        showfinancingBankData(data,type){
            this.financingBankformdata=data;
            this.formdata.awardbankname=data.searchRowBankname;
            this.formdata.awardbank=data.searchRowBankid;
            if(type === false){
                this.financingBanktype = false
            }else{
                this.financingBanktype = true
            }
        },
        //授信品种管理
        showvarietData(data){
            if(data){
                this.formdata.awardamount=data.totalValue;
                this.formdata.awardableamount=data.totalValue;
                this.formdata.awardover=data.totalValue;
                this.formdata.awardcreditbreedname=data.FinNameS;
                this.formdata.awardcreditbreedoid=data.FinIDS;
                this.RegistrationtableData=data.RegistrationtableData;
            }
        },
        //附件
        showFileData(data){
            this.FiletableData=data;
        },
        //流程图
        showprocessData(data){
            console.log(data)
        },
        //授信起始日期
        updateShouxinStartDate(data){
            if(data.startdate){
                if(data.enddate){
                    let DateS=new Date();
                    let endDateS= this.$Uformat.formatedateforT(data.enddate);
                    let TodayS=this.$Uformat.formatDateTime(DateS);
                    let stratdate=this.$Uformat.formatDateTime(data.startdate);
                    let enddate=this.$Uformat.formatDateTime(endDateS);
                    let checkDate=this.$Uformat.compareTime(stratdate,enddate);
                    if(checkDate){
                        let days=this.$Uformat.DateDiff(enddate,stratdate);
                        this.formdata.awarddays=days;
                    }else{
                        this.$message.error('授信到期日期必须大于授信开始时间!');
                    }
                    let checkTodayDate=this.$Uformat.compareTime(TodayS,enddate);
                    if(checkTodayDate){
                        let Todays=this.$Uformat.DateDiff(enddate,TodayS);
                        this.formdata.overdays=Todays;
                    }else{
                        this.$message.error('授信到期日期必须大于今天!');
                    }
                }
            }else{
                this.$message.error('请选择授信起始日期!');
            }
        },
        //授信到期日期
        updateShouxinEndDate(data){
            if(data.enddate){
                let DateS=new Date();
                let TodayS=this.$Uformat.formatDateTime(DateS);
                let enddate=this.$Uformat.formatDateTime(data.enddate);
                let checkTodayDate=this.$Uformat.compareTime(TodayS,enddate);
                if(checkTodayDate){
                    let Todays=this.$Uformat.DateDiff(enddate,TodayS);
                    this.formdata.overdays=Todays;
                }else{
                    this.$message.error('授信到期日期必须大于今天!');
                }
                if(data.startdate){
                    let stratDateS= this.$Uformat.formatedateforT(data.startdate);
                    let stratdate=this.$Uformat.formatDateTime(stratDateS);
                    let checkDate=this.$Uformat.compareTime(stratdate,enddate);
                    if(checkDate){
                        let days=this.$Uformat.DateDiff(enddate,stratdate);
                        this.formdata.awarddays=days; 
                    }else{
                        this.$message.error('授信到期日期必须大于授信开始时间!');
                    }
                }
            }else{
                this.$message.error('请选择授信到期日期!');
            }
        }
    },
    watch:{
        NewFCRtype(oldVal,newVal){
            this.ShowFinancVisible=this.NewFCRtype;
            let DataObj = this.rowNewFCRDataObj;
            if(DataObj.Newflag ==="Edit"){
                let finandata=DataObj.EditfinanrowId;
                let formDataA ={};
                formDataA.id=finandata;
                this.newOrEdit="Edit";
                this.$api.task.getComplexCreditContractRegisterVO(formDataA).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data;
                        let tableDataArr=returndata.data;
                        tableDataArr.startdateStr=this.$Uformat.formatDateTYMD(tableDataArr.startdate);
                        tableDataArr.enddateStr=this.$Uformat.formatDateTYMD(tableDataArr.enddate);
                        tableDataArr.voucherdateStr=this.$Uformat.formatDateTYMD(tableDataArr.voucherdate);
                        this.formdata=tableDataArr;
                        this.rowDatavarietObj.RegistrationtableData=tableDataArr.complexCreditContractRegisterLineResVos;
                        this.rowDatavarietObj.RegisType='Edit';
                        this.rowDatavarietObj.titleStr='综合授信合同登记';
                        this.financingCVMListtype=true;
                    } else {
                        this.$message.success('数据库没有该条数据!');
                    }
                });
            }else{
                this.formdata.gestordeptname=localStorage.getItem("ms_userDepartName");
                this.formdata.gestordept=localStorage.getItem("ms_userDepartId");
                this.formdata.handler=localStorage.getItem("ms_username");
                this.formdata.gestor=localStorage.getItem("ms_userId");
                let DateS=new Date();
                let TodayS=this.$Uformat.formatDate(DateS);
                this.formdata.voucherdate=DateS;
                this.formdata.voucherdateStr=TodayS;
                this.rowDatavarietObj.RegistrationtableData=[];
                this.rowDatavarietObj.RegisType='New';
                this.rowDatavarietObj.titleStr='综合授信合同登记';
                this.financingCVMListtype=true;
                this.newOrEdit='New';
            }
            //this.formdata.startdate=TodayS;
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