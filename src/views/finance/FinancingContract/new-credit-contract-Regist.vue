<template>
    <div>
        <el-dialog title="用信合同登记" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="70%">
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
                            <el-form-item label="授信业务编码" prop="awardcode">
                                <el-input v-model="formdata.awardcode" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="2">
                            <el-form-item  v-if="this.creditcontractNameFlage" prop="creditcontractame">
                                <el-link slot="label" :underline="false" @click="MoreSearCCSubject(formdata)">综合授信合同</el-link>
                                <el-input v-model="formdata.creditcontractame" ></el-input>
                            </el-form-item>
                            <el-form-item label="综合授信合同" v-else prop="creditcontractame">
                                <el-input v-model="formdata.creditcontractame" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchcreditSubject(formdata)"></el-button>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="用信合同名称" prop="contractname">
                                <el-input v-model="formdata.contractname" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信主体" prop="partaname">
                                <el-input v-model="formdata.partaname" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="2">
                            <el-form-item label="用信品种">
                                <el-input v-model="formdata.usercreditbreedname" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchUsercreditVisible(formdata)"></el-button>
                        </el-col>
                        <el-col :span="5" :offset="2">
                            <el-form-item label="业务币种" prop="servicecurrencyname">
                                <el-input v-model="formdata.servicecurrencyname" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchBCSVisible('servicecurrencyname',formdata)"></el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信银行" prop="awardbankname">
                                <el-input v-model="formdata.awardbankname" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="2">
                            <el-form-item label="付息方式" prop="payinterestname">
                                <el-input v-model="formdata.payinterestname"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchpayinterestVisible(formdata)"></el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="放款日" prop="loandate">
                                <el-date-picker
                                    v-model="formdata.loandate"
                                    type="date"
                                    @change="updateShouxinStartDate(formdata)"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="到期日" prop="duedate">
                                <el-date-picker
                                    v-model="formdata.duedate"
                                    type="date"
                                    @change="updateShouxinStartDate(formdata)"
                                    placeholder="选择日期">
                                </el-date-picker>
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
                            <el-form-item label="融资金额-原币" prop="moneyorigcurrency">
                                <el-input v-model="formdata.moneyorigcurrency" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="融资金额-人民币" prop="moneycny">
                                <el-input v-model="formdata.moneycny" ></el-input>
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
                            <el-form-item label="授信占用(人民币)" prop="awardoccupy">
                                <el-input v-model="formdata.awardoccupy" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="敞口金额-人民币">
                                <el-input v-model="formdata.opencny" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="综合费率-%">
                                <el-input v-model="formdata.complexrate" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="融资利率-%" prop="moneyinterestrate">
                                <el-input v-model="formdata.moneyinterestrate" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="2">
                            <el-form-item label="质押物类型" prop="pledgetypename">
                                <el-input v-model="formdata.pledgetypename" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPTSVisible(formdata)"></el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item label="质押银行">
                                <el-input v-model="formdata.pledgebankname" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchBankVisible(formdata)"></el-button>
                        </el-col>
                        <el-col :span="5" :offset="2">
                            <el-form-item label="质押币种">
                                <el-input v-model="formdata.pledgecurrencyname" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchBCSVisible('pledgecurrencyname',formdata)"></el-button>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="质押金额">
                                <el-input v-model="formdata.pledgeamount" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item label="质押主体">
                                <el-input v-model="formdata.pledgepartaname" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchCSCSubject(formdata)"></el-button>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="质押金额调整">
                                <el-input v-model="formdata.pledgeadjamount" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="质押余额">
                                <el-input v-model="formdata.pledgeover" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="保证比例-%">
                                <el-input v-model="formdata.ensurescale" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="存款起始日">
                                <el-date-picker
                                    v-model="formdata.depositstartdate"
                                    type="date"
                                    @change="updateShouxinStartDate(formdata)"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="存款到期日">
                                <el-date-picker
                                    v-model="formdata.depositenddate"
                                    type="date"
                                    @change="updateShouxinStartDate(formdata)"
                                    placeholder="选择日期">
                                </el-date-picker>
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
                                <el-input v-model="formdata.depositinterestrate" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信余额">
                                <el-input v-model="formdata.creditbalance" ></el-input>
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
                                <el-input v-model="formdata.invoicematched" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="收益情况">
                                <el-input v-model="formdata.incomesituation" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="收益金额">
                                <el-input v-model="formdata.incomeamount" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="6">
                            <el-form-item label="收益率">
                                <el-input v-model="formdata.yieldrate" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="发票提供期限">
                                <el-input v-model="formdata.invoicedeliveryperiod" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="贸易背景及货品">
                                <el-input v-model="formdata.tradebackgroundandgoods" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6" >
                            <el-form-item label="">
                                <el-checkbox v-model="prechecked" >是否前置</el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="合同利息">
                                <el-input v-model="formdata.contractinterest" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="用途">
                                <el-input type="textarea" v-model="formdata.purpose" :rows="2" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="备注">
                                <el-input type="textarea" v-model="formdata.remark" :rows="3" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-tabs v-model="atctiveName" @tab-click="handleClick">
                        <el-tab-pane label="收款明细行" name="first">
                           <NewcollectionDetail :rowNCDDataObj="rowNCDDataObj" :financingNCDype="financingNCDype"  @changeShow="showvarietData"/> 
                        </el-tab-pane>
                        <el-tab-pane label="付款明细行" name="second">
                            <NewPaymentDetail :rowNPDDataObj="rowNPDDataObj" :financingNPDype="financingNPDype" @changeShow="showFileData"/> 
                        </el-tab-pane>
                        <el-tab-pane label="附件" name="third">
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
        <creditBankSearch :rowBankDataObj="rowBankDataObj" :financingBanktype="financingBanktype" @changeShow="showfinancingBankData"/>
        <LookfinancingPage  :rowLFCRDataObj="rowLFCRDataObj" :finanLFCRtype="finanLFCRtype" @changeShow="showLookOrUpdate"/>
        <creditVarietiesSearch  :rowCVSDataObj="rowCVSDataObj" :financingCVStype="financingCVStype" @changeShow="showfinancCVSData"/>
        <InterestPaymentSearch  :rowIPSDataObj="rowIPSDataObj" :financingIPStype="financingIPStype" @changeShow="showfinancRPSData"/>
        <businessCurrencySearch  :rowBCSDataObj="rowBCSDataObj" :financingBCStype="financingBCStype" @changeShow="showfinancBCSData"/>
        <pledgetypeSearch  :rowPTSDataObj="rowPTSDataObj" :financingPTStype="financingPTStype" @changeShow="showfinancPTSData"/>
        <creditSubjectSearch :rowDataObj="rowDataObj" :financingtype="financingtype" @changeShow="showfinancCSCData"/>
    </div>
</template>

<script>
import DynamicTable from '../../../components/common/dytable/dytable.vue';
import proData from '../../../components/common/proData/proData';
import compCCSearch from '../comp-credit-contract-search.vue';
import creditBankSearch from '../credit-bank-search.vue';
import NewcollectionDetail from '../new-collection-detail.vue';
import LookfinancingPage from './look-financing-contract-Regis.vue';
import enclosurefile from '../enclosure-file.vue';
import processnodelist from '../process-node-list.vue';
import creditVarietiesSearch from '../credit-varieties-search.vue';
import InterestPaymentSearch from '../Interest-payment-search.vue';
import businessCurrencySearch from '../business-currency-search.vue';
import pledgetypeSearch from '../pledge-type-search.vue';
import creditSubjectSearch from '../credit-subject-search.vue';
import NewPaymentDetail from '../new-payment-detail.vue';
export default {
    props: {
        financingNCCRtype: Boolean,
        rowNewCCRDataObj:Object
    },
    name: 'basetable',
    components: {
        DynamicTable,
        compCCSearch,
        creditBankSearch,
        NewcollectionDetail,
        LookfinancingPage,
        enclosurefile,
        creditVarietiesSearch,
        InterestPaymentSearch,
        businessCurrencySearch,
        pledgetypeSearch,
        creditSubjectSearch,
        NewPaymentDetail,
        processnodelist
    },
    inject: ['reload'],
    data: function() {   
        return {
            sdddd:[],
            rowLFCRDataObj:{},
            rowCCDataObj:{},
            rowCVSDataObj:{},
            rowBankDataObj:{},
            rowNCDDataObj:{},
            rowDataFileObj:{},
            rowDataprocessObj:{},
            rowIPSDataObj:{},
            rowBCSDataObj:{},
            rowPTSDataObj:{},
            rowDataObj:{},
            rowNPDDataObj:{},
            FiletableData: [],
            RegistrationtableData: [],
            nametitle:'用信合同登记',
            financingCCtype:false,
            financingBanktype:false,
            financingNCDype:false,
            financingNPDype:false,
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
            finanLFCRtype:false,
            financingCVStype:false,
            financingIPStype:false,
            financingBCStype:false,
            financingPTStype:false,
            creditcontractNameFlage:false,
            financingtype:false,
            companyoptions:new proData().company,
            objectoptions:new proData().project,
            prechecked:false,
            formdata: {
                company: '',
                awardcode:'',
                creditcontractame: '',
                creditcontract: '',
                contractname: '',
                parta: '',
                partaname: '',
                usercreditbreed: '',
                usercreditbreedname: '',
                servicecurrency:'',
                servicecurrencyname:'',
                awardbank: '',
                awardbankname: '',
                payinterest: '',
                payinterestname: '',
                loandate: '',
                duedate:'',
                loandays:0,
                moneyorigcurrency:'',
                moneycny:'',
                overdays:0,
                awardoccupy: 0.00,
                opencny: 0.00,
                complexrate: 0,
                moneyinterestrate: 0,
                pledgetypename:'',
                pledgetype:'',
                pledgebankname:'',
                pledgebank:'',
                pledgecurrencyname:'',
                pledgecurrency:'',
                pledgeamount: 0,
                pledgepartaname:'',
                pledgeparta:'',
                pledgeadjamount: 0.00,
                pledgeover: 0.00,
                ensurescale: 0,
                depositstartdate:'',
                depositenddate:'',
                depositdays: 0,
                depositinterestrate: 0,
                creditbalance: 0.00,
                invoicematched: '',
                incomesituation: '',
                incomeamount: 0,
                yieldrate: 0,
                invoicedeliveryperiod:  0,
                tradebackgroundandgoods: '',
                contractinterest:  0,
                purpose: '',
                handler: '',
                handlerName: '',
                voucherdate: '',
                voucherdateStr: '',
                gestordept: '',
                gestordeptname: '',
                remark: '',
            },
            searchBlankFile:'',
            rules: {
                awardcode:[{ required: true, message: '请选输入授信业务编码', trigger: 'blur' }],
                creditcontractame:[{ required: true, message: '请选择综合授信合同', trigger: 'blur' }],
                contractname:[{ required: true, message: '请输入用信合同名称', trigger: 'blur' }],
                partaname:[{ required: true, message: '请输入授信主体', trigger: 'blur' }],
                servicecurrencyname:[{ required: true, message: '请选择业务币种', trigger: 'blur' }],
                company:[{ required: true, message: '请选择公司', trigger: 'blur' }],
                awardbankname:[{ required: true, message: '授信银行不能为空', trigger: 'blur' }],
                payinterestname:[{ required: true, message: '请选择付息方式', trigger: 'blur' }],
                loandate:[{ required: true, message: '请输入放款日', trigger: 'blur' }],
                duedate:[{ required: true, message: '请输入到期日', trigger: 'blur' }],
                moneyorigcurrency:[{ required: true, message: '请输入融资金额-原币', trigger: 'blur' }],
                moneycny:[{ required: true, message: '请输入融资金额-人民币', trigger: 'blur' }],
                awardoccupy:[{ required: true, message: '请输入授信占用-人民币', trigger: 'blur' }],
                moneyinterestrate:[{ required: true, message: '请输入融资利率', trigger: 'blur' }],
                pledgetypename:[{ required: true, message: '请选择质押物类型', trigger: 'blur' }],
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
                    this.financingNCDype=true;
                    this.financingNPDype=false;
                }else if(tabsname ==="second"){
                    this.financingNCDype=false;
                    this.financingNPDype=true;
                }else{
                    //附件列表
                    this.financingNCDype=false;
                    this.financingNPDype=false;
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
            fromObj.pre=this.prechecked;
            fromObj.complexCreditContractRegisterLineSaveVos=this.RegistrationtableData;
            let checkedS = this.checked; 
            let nameS= this.formdata.contractname;
            let messageStr=codeS+":"+nameS+"?";
            let tital="提交确认:";
            if(savreFlag){
                this.$Uconfirm(tital,messageStr).then(() => {
                    this.$api.task.insertUserCreditContractRegisterVO(fromObj).then(response => {
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
            fromObj.pre=this.prechecked;
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
        //查询综合授信合同数据
        MoreSearchcreditSubject(data){
            let finanrwodata=data;
            finanrwodata.finanrowname="综合授信合同登记缺省查询方案";
            finanrwodata.finanrowId="4F1904010848766606";
            finanrwodata.nametitle="综合授信合同调整";
            this.rowCCDataObj=finanrwodata;
            this.financingCCtype=true;
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
                        this.formdata.creditcontractame=tableDataArr.contractname;
                        this.formdata.creditcontract=tableDataArr.contractcode;
                        this.formdata.parta=tableDataArr.parta;
                        this.formdata.partaname=tableDataArr.partaname;
                        this.formdata.awardbankname=tableDataArr.awardbankname;
                        this.formdata.awardbank=tableDataArr.awardbank;
                        this.formdata.pledgebankname=tableDataArr.awardbankname;
                        this.formdata.pledgebank=tableDataArr.awardbank;
                        this.formdata.pledgepartaname=tableDataArr.partaname;
                        this.formdata.pledgeparta=tableDataArr.parta;
                        if(type === false){
                            this.financingCCtype = false;
                        }else{
                            this.financingCCtype = true;
                        }
                        this.creditcontractNameFlage= true;
                    } else {
                        this.$message.success('数据库没有该条数据!');
                    }
                });
            }else{
                if(type === false){
                    this.financingCCtype = false;
                }else{
                    this.financingCCtype = true;
                }
            }
        },
        //查询用信品种
        MoreSearchUsercreditVisible(data){
            let finanrwodata=data;
            finanrwodata.finanrowname="综合授信合同登记缺省查询方案";
            finanrwodata.finanrowId="4F1904010848766606";
            finanrwodata.nametitle="综合授信合同调整";
            this.rowCVSDataObj=finanrwodata;
            this.financingCVStype=true;
        },
        //获取用信品种
        showfinancCVSData(data,type){
            if(data.searchRowCVScodeId){
                this.formdata.usercreditbreedname=data.searchRowCVScodename;
                this.formdata.usercreditbreed=data.searchRowCVScodeId;
            }
            if(type === false){
                this.financingCVStype = false;
            }else{
                this.financingCVStype = true;
            }
        },
        //查询付息方式
        MoreSearchpayinterestVisible(data){
            let finanrwodata=data;
            finanrwodata.finanrowname="综合授信合同登记缺省查询方案";
            finanrwodata.finanrowId="4F1904010848766606";
            finanrwodata.nametitle="综合授信合同调整";
            this.rowIPSDataObj=finanrwodata;
            this.financingIPStype=true;
        },
        //获取付息方式
        showfinancRPSData(data,type){
            if(data.searchRowRPSId){
                this.formdata.payinterestname=data.searchRowRPSname;
                this.formdata.payinterest=data.searchRowRPSId;
                
            }
            if(type === false){
                this.financingIPStype = false;
            }else{
                this.financingIPStype = true;
            }
        },
        //查询业务币种
        MoreSearchBCSVisible(filename,data){
            this.searchBlankFile=filename;
            let finanrwodata=data;
            finanrwodata.finanrowname="币种缺省查询方案";
            finanrwodata.finanrowId="640804032236013902";
            finanrwodata.nametitle="综合授信合同调整";
            this.rowBCSDataObj=finanrwodata;
            this.financingBCStype=true;
        },
        //获取业务币种
        showfinancBCSData(data,type){
            if(data.searchRowBCSId){
                let BlankFile=this.searchBlankFile;
                if(BlankFile!='' && BlankFile ==='pledgecurrencyname'){
                    this.formdata.pledgecurrencyname=data.searchRowBCSname;
                    this.formdata.pledgecurrency=data.searchRowBCSId;
                }else if(BlankFile!='' && BlankFile ==='servicecurrencyname'){
                    this.formdata.servicecurrencyname=data.searchRowBCSname;
                    this.formdata.servicecurrency=data.searchRowBCSId;
                }
                
            }
            if(type === false){
                this.financingBCStype = false;
            }else{
                this.financingBCStype = true;
            }
        },
         //查询质押物类型
        MoreSearchPTSVisible(data){
            let finanrwodata=data;
            finanrwodata.finanrowname="质押物类型缺省查询方案";
            finanrwodata.finanrowId="4F1903301512848104";
            finanrwodata.nametitle="综合授信合同调整";
            this.rowPTSDataObj=finanrwodata;
            this.financingPTStype=true;
        },
        //获取质押物类型
        showfinancPTSData(data,type){
            if(data.searchRowBCSId){
                this.formdata.pledgetypename=data.searchRowPTSname;
                this.formdata.pledgetype=data.searchRowPTSId; 
            }
            if(type === false){
                this.financingPTStype = false;
            }else{
                this.financingPTStype = true;
            }
        },
        //查询质押主体
        MoreSearchCSCSubject(data){
            let finanrwodata=data;
            finanrwodata.finanrowname="甲方单位";
            finanrwodata.finanrowId="4E1712231426568201";
            finanrwodata.nametitle="用信合同登记";
            this.rowDataObj=finanrwodata;
            this.financingtype=true;
        },
        //获取质押主体
        showfinancCSCData(data,type){
            if(data.searchRowBCSId){
                this.formdata.pledgepartaname=data.searchRowCSSname;
                this.formdata.pledgeparta=data.searchRowCSSid;
            }
            if(type === false){
                this.financingtype = false
            }else{
                this.financingtype = true
            }
        },
        //综合授信合同查看详情
        MoreSearCCSubject(data){
            if(data.SerachID){
                this.finanLFCRtype=true;
                this.rowLFCRDataObj.finanrowId=data.SerachID;
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
        //查询质押银行
        MoreSearchBankVisible(data){
            let finandata=data;
            finandata.finanrowname="资金类客户缺省查询方案";
            finandata.finanrowId="401901281025522001";
            finandata.nametitle="综合授信合同登记";
            this.rowBankDataObj=finandata;
            this.financingBanktype=true;
        },
        //获取质押银行
        showfinancingBankData(data,type){
            if(data.awardbank){
                this.formdata.pledgebankname=data.searchRowBankname;
                this.formdata.pledgebank=data.searchRowBankid;   
            }
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
        financingNCCRtype(oldVal,newVal){
            this.ShowFinancVisible=this.financingNCCRtype;
            let DataObj = this.rowNewCCRDataObj;
            if(DataObj.Newflag ==="Edit"){
                let finandata=DataObj.EditfinanrowId;
                let formDataA ={};
                formDataA.id=finandata;
                this.newOrEdit="Edit";
                this.$api.task.getUserCreditContractRegisterVO(formDataA).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data;
                        let tableDataArr=returndata.data;
                        tableDataArr.loandateStr=this.$Uformat.formatDateTYMD(tableDataArr.loandate);
                        tableDataArr.duedateStr=this.$Uformat.formatDateTYMD(tableDataArr.duedate);
                        tableDataArr.depositstartdateStr=this.$Uformat.formatDateTYMD(tableDataArr.depositstartdate);
                        tableDataArr.depositenddateStr=this.$Uformat.formatDateTYMD(tableDataArr.depositenddate);
                        tableDataArr.voucherdateStr=this.$Uformat.formatDateTYMD(tableDataArr.voucherdate);
                        if(tableDataArr.creditcontractame && tableDataArr.creditcontractame !=''){
                            this.creditcontractNameFlage=true;
                        }
                        this.formdata=tableDataArr;
                        this.rowNCDDataObj.RegistrationtableData=tableDataArr.collectDetailsLineResVos;
                        this.rowNCDDataObj.RegisType='Edit';
                        this.rowNCDDataObj.titleStr='用信合同登记';
                        this.rowNPDDataObj.RegistrationtableData=tableDataArr.paymentDetailsLineResVos;
                        this.rowNPDDataObj.RegisType='Edit';
                        this.rowNPDDataObj.titleStr='用信合同登记';
                        this.financingNCDype=true;  
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
                this.rowNCDDataObj.RegistrationtableData=[];
                this.rowNCDDataObj.RegisType='New';
                this.rowNCDDataObj.titleStr='综合授信合同登记';
                this.rowNPDDataObj.RegistrationtableData=[];
                this.rowNPDDataObj.RegisType='Edit';
                this.rowNPDDataObj.titleStr='用信合同登记';
                this.financingNCDype=true;
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