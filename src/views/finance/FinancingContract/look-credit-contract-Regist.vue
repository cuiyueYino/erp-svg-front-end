<template>
    <div>
        <el-dialog title="用信合同登记" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="60%">
            <el-form
                label-width="110px"
                v-model="formdata"
                class="dataForm"
                size="mini"
                :model="formdata"
                :label-position="labelPosition"
            >
                <el-card>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="公司">
                                <el-select v-model="formdata.company" value-key="value" v-bind:disabled="disabled">
                                    <el-option
                                        v-for="item in companyData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="项目" >
                                <el-select v-model="formdata.project" value-key="value" v-bind:disabled="disabled">
                                    <el-option
                                        v-for="item in objectoptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信业务编码" >
                                <el-input v-model="formdata.awardcode" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="综合授信合同" prop="creditcontractame">
                                <el-link :underline="false" @click="MoreSearCCSubject(formdata)">{{this.formdata.creditcontractame}}</el-link>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="用信合同名称">
                                <el-input v-model="formdata.contractname" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信主体" >
                                <el-input v-model="formdata.partaname" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="用信品种">
                                <el-input v-model="formdata.usercreditbreedname" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="业务币种">
                                <el-input v-model="formdata.servicecurrencyname" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信银行">
                                <el-input v-model="formdata.awardbankname" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="付息方式" >
                                <el-input v-model="formdata.payinterestname" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="用信币种" >
                                <el-input v-model="formdata.usercreditcurrencyname" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="放款日">
                                <el-input v-model="formdata.loandateStr" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="到期日">
                                <el-input v-model="formdata.duedateStr" disabled></el-input>
                            </el-form-item>
                        </el-col>
                       
                        <el-col :span="6" :offset="2">
                            <el-form-item label="贷款天数">
                                <el-input v-model="formdata.loandays" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="融资金额-原币">
                                <el-input v-model="formdata.moneyorigcurrency" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="融资金额-人民币">
                                <el-input v-model="formdata.moneycny" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        
                        <el-col :span="6" :offset="2">
                            <el-form-item label="剩余天数">
                                <el-input v-model="formdata.overdays" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信占用(人民币)">
                                <el-input v-model="formdata.awardoccupy" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="敞口金额-人民币">
                                <el-input v-model="formdata.opencny" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="综合费率-%">
                                <el-input v-model="formdata.complexrate" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="融资利率-%">
                                <el-input v-model="formdata.moneyinterestrate" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="质押物类型">
                                <el-input v-model="formdata.pledgetypename" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="质押银行">
                                <el-input v-model="formdata.pledgebankname" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="质押币种">
                                <el-input v-model="formdata.pledgecurrencyname" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="质押金额">
                                <el-input v-model="formdata.pledgeamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="质押主体">
                                <el-input v-model="formdata.pledgepartaname" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="质押金额调整">
                                <el-input v-model="formdata.pledgeadjamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="质押余额">
                                <el-input v-model="formdata.pledgeover" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="保证比例-%">
                                <el-input v-model="formdata.ensurescale" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="存款起始日">
                                <el-input v-model="formdata.depositstartdateStr" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="存款到期日">
                                <el-input v-model="formdata.depositenddateStr" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="存款天数">
                                <el-input v-model="formdata.depositdays" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="存款利率">
                                <el-input v-model="formdata.depositinterestrate" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信余额">
                                <el-input v-model="formdata.creditbalance" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" >
                            <el-form-item label="经办人">
                                <el-input v-model="formdata.handlerName" disabled></el-input>
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
                        <el-col :span="6">
                            <el-form-item label="应匹配发票流">
                                <el-input v-model="formdata.invoicematched" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="收益情况">
                                <el-input v-model="formdata.incomesituation" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="收益金额">
                                <el-input v-model="formdata.incomeamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="6">
                            <el-form-item label="收益率">
                                <el-input v-model="formdata.yieldrate" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="发票提供期限">
                                <el-input v-model="formdata.invoicedeliveryperiod" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="贸易背景及货品">
                                <el-input v-model="formdata.tradebackgroundandgoods" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" >
                            <el-form-item label="是否前置">
                                {{this.prechecked}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="合同利息">
                                <el-input v-model="formdata.contractinterest" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="用途">
                                <el-input type="textarea" v-model="formdata.purpose" :rows="2" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="formdata.remark" :rows="3" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-tabs v-model="atctiveName" @tab-click="handleClick">
                        <el-tab-pane label="收款明细行" name="first">
                            <collectiondetaillist :rowCDLDataObj="rowCDLDataObj" :financingCDLtype="financingCDLtype" />
                        </el-tab-pane>
                        <el-tab-pane label="付款明细行" name="second">
                            <paymentdetaillist :rowPDLDataObj="rowPDLDataObj" :financingPDLtype="financingPDLtype" />
                        </el-tab-pane>
                        <el-tab-pane label="收款记录" name="third">
                            <creditEnclFilelist :rowEFListDataObj="rowEFListDataObj" :financingEFListtype="financingEFListtype" />
                        </el-tab-pane>
                        <el-tab-pane label="付款记录" name="fourth">
                            <creditEnclFilelist :rowEFListDataObj="rowEFListDataObj" :financingEFListtype="financingEFListtype" />
                        </el-tab-pane>
                        <el-tab-pane label="附件" name="fifth">
                            <creditEnclFilelist :rowEFListDataObj="rowEFListDataObj" :financingEFListtype="financingEFListtype" />
                        </el-tab-pane>
                    </el-tabs>
                    <processnodelist :rowDataprocessObj="rowDataprocessObj"  @changeShow="showprocessData"/> 
                </el-card>
            </el-form>
        </el-dialog>
        <LookfinancingPage  :rowLFCRDataObj="rowLFCRDataObj" :finanLFCRtype="finanLFCRtype" @changeShow="showLookOrUpdate"/>
    </div>
</template>

<script>
import DynamicTable from '../../../components/common/dytable/dytable.vue';
import proData from '../../../components/common/proData/proData';
import collectiondetaillist from '../collection-detail-list.vue';
import paymentdetaillist from '../payment-detail-list.vue';
import creditEnclFilelist from '../enclosure-file-list.vue';
import processnodelist from '../process-node-list.vue';
import LookfinancingPage from './look-financing-contract-Regis.vue';
export default {
    props: {
        rowLCCRDataObj: Object,
        financingLCCRtype: Boolean
    },
    name: 'basetable',
    components: {
        DynamicTable,
        collectiondetaillist,
        paymentdetaillist,
        creditEnclFilelist,
        LookfinancingPage,
        processnodelist
    },
    inject: ['reload'],
    data: function() {   
        return {
            atctiveName: 'first',
            ShowFinancVisible:false,
            labelPosition: 'left',
            disabled:false,
            finanLFCRtype:false,
            companyData:new proData().company,
            objectoptions:new proData().project,
            formdata: {},
            rowLFCRDataObj: {},
            rowCDLDataObj: [],
            rowPDLDataObj: [],
            rowEFListDataObj: {},
            rowDataprocessObj:{},
            financingCDLtype:false,
            financingPDLtype:false,
            financingEFListtype:false,
            pageNum: 1,
            pageSize: 10,
            total: 20,
            prechecked:'',
        };
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
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
        onCurrentChange(val) {},
        //流程图
        showprocessData(data){
            console.log(data)
        },
        //综合授信合同查看详情
        MoreSearCCSubject(data){
            if(data.creditcontract){
                this.finanLFCRtype=true;
                this.rowLFCRDataObj.finanrowId=data.creditcontract;
            }else{
                this.$message.error('请选择综合授信合同!');
            }
        },
        //控制综合授信合同显示影藏
        showLookOrUpdate(data){
            if(data === false){
                this.finanLFCRtype = false
            }else{
                this.finanLFCRtype = true
            }
        },
        //滑块切换
        handleClick(tab){
            var tabsname =tab.paneName;
            if(tabsname){
                if(tabsname ==="first"){
                    //授信合同记录
                }else if(tabsname ==="second"){
                    //授信品种管理
                    this.financingCVMListtype=true;
                }else{
                    //附件列表
                    this.financingEFListtype=true;
                    
                }
            }
        },
    },
    mounted() {
    },
    watch:{
        financingLCCRtype(oldVal,newVal){
            this.ShowFinancVisible=this.financingLCCRtype;
            let finandata=this.rowLCCRDataObj.finanrowId;
            let formDataA ={};
            formDataA.id=finandata;
            this.$api.task.getUserCreditContractRegisterVO(formDataA).then(response => {
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
            });
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