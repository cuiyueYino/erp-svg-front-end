<template>
    <div>
        <el-dialog title="综合授信合同调整" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="70%">
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
                        <el-col :span="6">
                            <el-form-item label="公司">
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
                        <el-col :span="6" :offset="2">
                            <el-form-item >
                                <el-checkbox v-model="changechecked" @change="UpdateCchecked()">授信额度调整</el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item >
                                <el-checkbox v-model="checked" >连续追加</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="调整单号">
                                <el-input v-model="formdata.voucherid" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="2">
                            <el-form-item label="综合授信合同" prop="creditcontractName">
                                <el-input v-model="formdata.creditcontractName" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                        <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchcreditSubject(formdata)"></el-button>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="调整日期" prop="adjustdate">
                                <el-date-picker
                                    v-model="formdata.adjustdate"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信额度" prop="awardamount">
                                <el-input v-model="formdata.awardamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信余额">
                                <el-input v-model="formdata.awardover" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信调整额度">
                                <el-input v-model="formdata.awardadjamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" >
                            <el-form-item label="授信占用">
                                <el-input v-model="formdata.creditoccupation" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信占用调整">
                                <el-input v-model="formdata.creditoccadjust" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信可用额度">
                                <el-input v-model="formdata.awardableamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" >
                            <el-form-item label="经办人">
                                <el-input v-model="formdata.handler" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
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
                           <testtable :rowDatatestObj="rowDatatestObj" :UpdCchecked="UpdCchecked" :testCVMListtype="testCVMListtype" @changeShow="showvarietData"/>
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
        <compCCSearch :rowCCDataObj="rowCCDataObj" :financingCCtype="financingCCtype" @changeShow="showfinancingData"/>
    </div>
</template>

<script>
import DynamicTable from '../../../components/common/dytable/dytable.vue';
import proData from '../../../components/common/proData/proData';
import compCCSearch from '../comp-credit-contract-search.vue';
import Newcreditvarieties from '../New-credit-varieties-management.vue';
import enclosurefile from '../enclosure-file.vue';
import testtable from '../New-credit-varieties-adjust.vue';
import processnodelist from '../process-node-list.vue';
export default {
    props: {
        NewFCAtype: Boolean,
        rowNewFCADataObj:Object
    },
    name: 'basetable',
    components: {
        DynamicTable,
        compCCSearch,
        Newcreditvarieties,
        enclosurefile,
        processnodelist,
        testtable
    },
    inject: ['reload'],
    data: function() {   
        return {
            sdddd:[],
            rowCCDataObj:{},
            rowDatatestObj:{},
            rowDataFileObj:{},
            rowDataprocessObj:{},
            FiletableData: [],
            RegistrationtableData: [],
            nametitle:'综合授信合同登记',
            financingCCtype:false,
            financingBanktype:false,
            testCVMListtype:false,
            newOrEdit:'New',
            finanrowId:'',
            finanrowname:'',
            UpdCchecked:{
                checkedFlag:false,
                filedname:'lineofcredit'
            },
            financingformdata:{},
            financingBankformdata:{},
            atctiveName: 'first',
            ShowFinancVisible:false,
            labelPosition: 'left',
            disabled:false,
            checked:false,
            changechecked:false,
            companyoptions:new proData().company,
            objectoptions:new proData().project,
            formdata: {
                company:'',
                voucherid:'',
                creditcontract: '',
                creditcontractName: '',
                adjustdate: '',
                partaname: '',
                awardamount: 0.00,
                awardadjamount: 0.00,
                creditoccupation: 0.00,
                creditoccadjust: 0,
                awardableamount: 0.00,
                awardover: 0.00,
                handler: '',
                handlerName: '',
                voucherdate: '',
                voucherdateStr: '',
                gestordept: '',
                gestordeptname: '',
                remark: '',
            },
            rules: {
                creditcontractName:[{ required: true, message: '请选择综合授信合同', trigger: 'blur' }],
                adjustdate:[{ required: true, message: '请选择调整日期', trigger: 'blur' }],
                awardamount:[{ required: true, message: '请输入授信额度', trigger: 'blur' }],
            }
        };
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.reload();
            this.$emit('changeShow',false);
        },
        //滑块切换
        handleClick(tab){
            var tabsname =tab.paneName;
            if(tabsname){
                if(tabsname ==="first"){
                    //授信品种管理
                    this.testCVMListtype=true;
                }else if(tabsname ==="second"){
                    //附件列表
                    this.testCVMListtype=false;
                }else{
                    this.testCVMListtype=false;
                }
            }
        },
        //授信额度调整
        UpdateCchecked(){
            this.rowDatatestObj.UpdateCchecked= this.changechecked;
            this.UpdCchecked.checkedFlag= this.changechecked;
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
            let codeS= this.formdata.creditcontractName;
            if(codeS== ''){
                savreFlag=false;
                this.$message.error('请选择授信合同!');
            }
            let startdateS= this.formdata.adjustdate;
            if(startdateS== ''){
                savreFlag=false;
                this.$message.error('请输入调整日期!');
            }
            let awardS= this.formdata.awardamount;
            if(awardS== ''){
                savreFlag=false;
                this.$message.error('授信额度不能为空!');
            }
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
            fromObj.awardCreditBreedLineSaveVoList=this.RegistrationtableData;
            fromObj.awardadjamountswitch=this.changechecked;
            let checkedS = this.checked; 
            let nameS= this.formdata.contractname;
            let messageStr="综合授信合同调整："+codeS+"?";
            let tital="提交确认:";
            if(savreFlag){
                this.$Uconfirm(tital,messageStr).then(() => {
                    this.$api.task.insertComplexCreditContractAdjustVO(fromObj).then(response => {
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
                            this.$message.success('存储失败!');
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
            let codeS= this.formdata.creditcontractName;
            if(codeS== ''){
                savreFlag=false;
                this.$message.error('请选择授信合同!');
            }
            let startdateS= this.formdata.adjustdate;
            if(startdateS== ''){
                savreFlag=false;
                this.$message.error('请输入调整日期!');
            }
            let awardS= this.formdata.awardamount;
            if(awardS== ''){
                savreFlag=false;
                this.$message.error('授信额度不能为空!');
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
            fromObj.awardCreditBreedLineSaveVoList=this.RegistrationtableData;
            fromObj.awardadjamountswitch=this.changechecked;
            let checkedS = this.checked; 
            let nameS= this.formdata.contractname;
            let messageStr="综合授信合同调整："+codeS+"?";
            let tital="提交确认:";
            if(savreFlag){
                this.$Uconfirm(tital,messageStr).then(() => {
                    this.$api.task.insertZCComplexCreditContractAdjustVO(fromObj).then(response => {
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
                            this.$message.success('存储失败!');
                        }
                    });
                }).catch(() => {
                    this.$message.success('取消提交!');
                });
            }
        },
        //查询综合授信合同数据
        MoreSearchcreditSubject(data){
            let finanrwodata=data;
            finanrwodata.finanrowname="综合授信合同登记缺省查询方案";
            finanrwodata.finanrowId="4F1904010848766606";
            finanrwodata.nametitle="综合授信合同调整";
            this.rowCCDataObj=finanrwodata;
            this.financingCCtype=true;
            this.testCVMListtype=false;
        },
        //获取综合授信合同数据
        showfinancingData(data,type){
            this.financingformdata=data;
            //获取授信合同ID
            if(data.SerachID){
                let creditcontractId = data.SerachID;
                let formDataA ={};
                formDataA.id=creditcontractId;
                this.$api.task.getComplexCreditContractRegisterVO(formDataA).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data;
                        let tableDataArr=returndata.data;
                        this.formdata.creditcontract=tableDataArr.contractcode;
                        this.formdata.creditcontractName=tableDataArr.contractname;
                        this.formdata.creditcontractId=tableDataArr.id;
                        this.formdata.creditoccupationold=tableDataArr.awardoccupy;
                        this.formdata.creditcontractcode=tableDataArr.contractcode;
                        this.formdata.awardamount=tableDataArr.awardamount;
                        this.formdata.awardover=tableDataArr.awardover;
                        this.formdata.creditoccupation=tableDataArr.awardoccupy;
                        this.formdata.awardadjamount=tableDataArr.awardadjamount;
                        this.formdata.awardableamount=tableDataArr.awardableamount;
                        let RegisTD=tableDataArr.complexCreditContractRegisterLineResVos;
                        if(RegisTD){
                            for(var i=0;i<RegisTD.length;i++){
                                RegisTD[i].CreateOrSearchFlag="Search";
                                RegisTD[i].UpdateCchecked=this.changechecked;
                                RegisTD[i].lineofcreditadjustold=RegisTD[i].lineofcreditaudit;
                                RegisTD[i].lineofcredituseold=RegisTD[i].lineofcredituse;
                                RegisTD[i].lineofcreditadjust=RegisTD[i].lineofcreditaudit;
                                RegisTD[i].creditooccupation=RegisTD[i].creditaccount;
                                RegisTD[i].lineofcreditadjustthistime=0;
                                RegisTD[i].creditvariety=RegisTD[i].awardcreditbreed;
                                RegisTD[i].flag=true;
                                RegisTD[i].note='';
                                let params = RegisTD[i];
                                for(var item in params){
                                   if(params[item] ===null){
                                       params[item] = '';
                                   }
                                }
                                RegisTD[i] = params;
                            }

                            this.rowDatatestObj.RegistrationtableData=RegisTD;
                        }else{
                            this.rowDatatestObj.RegistrationtableData=tableDataArr.complexCreditContractRegisterLineResVos;
                        }
                        this.rowDatatestObj.RegisType=this.newOrEdit;
                        this.rowDatatestObj.UpdateCchecked= this.changechecked;
                        this.rowDatatestObj.titleStr='综合授信合同调整';
                        if(type === false){
                            this.financingCCtype = false;
                            this.testCVMListtype=true;
                        }else{
                            this.financingCCtype = true;
                            this.testCVMListtype=false;
                        }
                    } else {
                        this.$message.success('数据库没有该条数据!');
                    }
                });
            }else{
                if(type === false){
                    this.financingCCtype = false;
                    this.testCVMListtype=true;
                }else{
                    this.financingCCtype = true;
                    this.testCVMListtype=false;
                }
            }
        },
        //授信品种管理
        showvarietData(data){
            if(data){
                this.formdata.awardamount=data.Totallineofcredit;
                this.formdata.awardover=data.Totalcreditbalance;
                this.formdata.awardadjamount=data.Totallineofcreditaudit;
                this.formdata.creditoccupation=data.Totalcreditaccount+data.Totalcreditoccadjust;
                this.formdata.creditoccadjust=data.Totalcreditoccadjust;
                this.formdata.awardableamount=data.Totallineofcredituse;
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
    },
    watch:{
        NewFCAtype(oldVal,newVal){
            this.ShowFinancVisible=this.NewFCAtype;
            let DataObj = this.rowNewFCADataObj;
            if(DataObj.Newflag ==="Edit"){
                let finandata=DataObj.EditfinanrowId;
                let formDataA ={};
                formDataA.id=finandata;
                this.newOrEdit="Edit";
                this.$api.task.getComplexCreditContractAdjustVO(formDataA).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data;
                        let tableDataArr=returndata.data;
                        tableDataArr.startdateStr=this.$Uformat.formatDateTYMD(tableDataArr.startdate);
                        tableDataArr.enddateStr=this.$Uformat.formatDateTYMD(tableDataArr.enddate);
                        tableDataArr.voucherdateStr=this.$Uformat.formatDateTYMD(tableDataArr.voucherdate);
                        this.formdata=tableDataArr;
                        this.formdata.creditoccupationold=tableDataArr.awardoccupy;
                        let RegisTD=tableDataArr.awardCreditBreedLineResVos;
                        if(RegisTD){
                            for(var i=0;i<RegisTD.length;i++){
                                RegisTD[i].CreateOrSearchFlag="Search";
                                RegisTD[i].UpdateCchecked=this.changechecked;
                                RegisTD[i].lineofcreditadjustold=RegisTD[i].lineofcreditaudit;
                                RegisTD[i].lineofcredituseold=RegisTD[i].lineofcredituse;
                                RegisTD[i].flag=true;
                            }
                            this.rowDatatestObj.RegistrationtableData=RegisTD;
                        }else{
                            this.rowDatatestObj.RegistrationtableData=tableDataArr.awardCreditBreedLineResVos;
                        }
                        this.rowDatatestObj.RegisType='Edit';
                        this.rowDatatestObj.UpdateCchecked= this.changechecked;
                        this.rowDatatestObj.titleStr='综合授信合同调整';
                        this.testCVMListtype=true;
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
                this.rowDatatestObj.RegistrationtableData=[];
                this.rowDatatestObj.RegisType='New';
                this.rowDatatestObj.UpdateCchecked= this.changechecked;
                this.rowDatatestObj.titleStr='综合授信合同调整';
                this.testCVMListtype=false;
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