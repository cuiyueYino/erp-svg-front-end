<template>
    <div>
        <el-card>
            <div slot="header" class="result">
                <div class="fr">
                    <el-select v-model="formInline.company" placeholder="公司" clearable>
                        <el-option
                            v-for="item in companyData"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
                <div class="inline fr">
                    <el-button class="sky" size="small" icon="el-icon-edit" @click="onRowAddButtonClick" round>新建</el-button>
                    <el-button class="sky" size="small" icon="el-icon-edit" @click="onRowUpdateButtonClick" round >修改</el-button>
                    <el-button class="sky" size="small" icon="el-icon-link" @click="onRowRemoveButtonClick" round>删除</el-button>
                    <el-button class="sky" size="small" icon="el-icon-link"  @click="onRowLookButtonClick" round>查看</el-button>
                    <el-button class="sky" size="small" icon="el-icon-link"  @click="onRowCCButtonClick" round>收款</el-button>
                    <el-button class="sky" size="small" icon="el-icon-link"  @click="onRowLookButtonClick" round>付款</el-button>
                    <el-button class="sky" size="small" icon="el-icon-link"  @click="onRowLookButtonClick" round>关闭</el-button>
                    <el-button class="sky" size="small" icon="el-icon-link"  @click="onRowLookButtonClick" round>反关闭</el-button>
                </div>
            </div>
            <div class="container">
                <div class="search-left">
                    <el-select v-model="formInline.searchName" placeholder="名称" clearable>
                        <el-option
                            v-for="item in searchlist"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <div class="frdiv" v-if="formInline.searchName === '001'"><el-input v-model="formInline.searchValue"></el-input></div>
                    <div class="frdiv" v-else-if="formInline.searchName === '4F190401083128560E'">
                        <el-select v-model="formInline.serchcompany" placeholder="公司" clearable>
                            <el-option
                                v-for="item in companyData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="frdiv" v-else-if="formInline.searchName === '005'">
                        <el-select v-model="formInline.CreditSub" placeholder="--" clearable>
                            <el-option
                                v-for="item in CreditSubject"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="frdiv" v-else-if="formInline.searchName === '006'">
                        <el-select v-model="formInline.searchblank" placeholder="--" clearable>
                            <el-option
                                v-for="item in Creditblank"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="frdiv" v-else-if="formInline.searchName === '007'">
                        <el-select v-model="formInline.searchcreditType" placeholder="--" clearable>
                            <el-option
                                v-for="item in creditType"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="frdiv" v-else ><el-input v-model="formInline.searchValue"></el-input></div>
                </div>
                <div class="search-right">
                    <div class="fr">
                        <el-button class="sky" size="small" @click="onHandleSearch" round>查询</el-button>
                        <el-button class="sky" size="small" @click="MoreSearchVisible = true" round>高级查询</el-button>
                    </div>
                </div>
            </div>
            <dynamic-table
                :columns="columns"
                :table-data="tableData"
                :total="total"
                ref="multipleTable"
                :page-num="pageNum"
                :page-size="pageSize"
                @current-change="onCurrentChange"
                @selection-change="onSelectionChange"
                @size-change="onSizeChange"
                v-loading="false"
                element-loading-text="加载中"
            ></dynamic-table>
        </el-card>
        <el-dialog title="用信合同登记缺省查询方案" :visible.sync="MoreSearchVisible" :append-to-body="true" v-if="MoreSearchVisible" :close-on-click-modal="false" width="50%">
            <el-form
                label-width="100px"
                v-model="dialog"
                class="dataForm"
                size="mini"
                :label-position="labelPosition"
            >
            <el-card>
                <el-row class="elrowStyle" >
                    <el-col :span="6" class="pbackground">查询条件</el-col>
                    <el-col :span="6"  class="pbackground">操作符</el-col>
                    <el-col :span="12" class="pbackground">条件值</el-col>
                </el-row>
                <el-row class="elrowStyle" size="mini">
                    <el-col :span="6" class="elColCenter">单据号</el-col>
                    <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.documentNo" size="mini"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle" >
                    <el-col :span="6" class="elColCenter">公司</el-col>
                    <el-col :span="6" class="elColCenter">等于</el-col>
                    <el-col :span="8">
                        <el-select v-model="dialog.company" size="mini">
                            <el-option
                                v-for="item in companyoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle" >
                    <el-col :span="6" class="elColCenter">单据日期</el-col>
                    <el-col :span="6"  class="elColCenter">大于等于</el-col>
                    <el-col :span="8">
                        <el-date-picker
                            v-model="dialog.docDateStart"
                            type="date"
                            size="mini"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle" >
                    <el-col :span="6" class="elColCenter">单据日期</el-col>
                    <el-col :span="6"  class="elColCenter">小于等于</el-col>
                    <el-col :span="8">
                        <el-date-picker
                            v-model="dialog.docDateEnd"
                            type="date"
                            size="mini"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle" >
                    <el-col :span="6" class="elColCenter">授信合同编码</el-col>
                    <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.codeNomber" size="mini"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle" >
                    <el-col :span="6" class="elColCenter">合同名称</el-col>
                    <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.name" size="mini"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle" >
                    <el-col :span="6" class="elColCenter">授信主体</el-col>
                    <el-col :span="6"  class="elColCenter">等于</el-col>
                    <el-col :span="8">
                       <el-select v-model="dialog.CreditSub" placeholder="--" clearable size="mini">
                            <el-option
                                v-for="item in CreditSubject"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle" >
                    <el-col :span="6" class="elColCenter">授信银行</el-col>
                    <el-col :span="6"  class="elColCenter">等于</el-col>
                    <el-col :span="8">
                       <el-select v-model="dialog.searchblank" placeholder="--" clearable size="mini">
                            <el-option
                                v-for="item in Creditblank"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle" >
                    <el-col :span="6" class="elColCenter">授信品种</el-col>
                    <el-col :span="6"  class="elColCenter">等于</el-col>
                    <el-col :span="8">
                       <el-select v-model="dialog.searchcreditType" placeholder="--" clearable size="mini">
                            <el-option
                                v-for="item in creditType"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle" >
                    <el-col :span="6" class="elColCenter">授信额度</el-col>
                    <el-col :span="6"  class="elColCenter">大于等于</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.Creditline" size="mini"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle" >
                    <el-col :span="6" class="elColCenter">授信余额</el-col>
                    <el-col :span="6"  class="elColCenter">大于等于</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.Creditbalance" size="mini"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle" >
                    <el-col :span="6" class="elColCenter">经办人</el-col>
                    <el-col :span="6"  class="elColCenter">等于</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.operator" size="mini"></el-input>
                    </el-col>
                    <el-col :span="2">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchuserVisible(dialog)"></el-button>
                    </el-col>
                </el-row>
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="MoreSearchVisible = false">取 消</el-button>
                <el-button type="primary" @click="onHandleMoreSearch">查询</el-button>
            </span>
        </el-dialog>
        <UserListPage  :userListtype="userListtype" :rowUserDataObj="rowUserDataObj" @changeShow="showAddUserFinace"/>
        <NewcreditCRPage  :financingNCCRtype="financingNCCRtype" :rowNewCCRDataObj="rowNewCCRDataObj" @changeShow="showAddFinace"/>
        <LookcreditPage  :rowLCCRDataObj="rowLCCRDataObj" :financingLCCRtype="financingLCCRtype" @changeShow="showLookOrUpdate"/>
        <creditCollectionPage  :rowCCDataObj="rowCCDataObj" :financingCCtype="financingCCtype" @changeShow="CCShowOrhide"/>
    </div>
</template>

<script>
import DynamicTable from '../../../components/common/dytable/dytable.vue';
import proData from '../../../components/common/proData/proData';
import NewcreditCRPage from './new-credit-contract-Regist.vue';
import LookcreditPage from './look-credit-contract-Regist.vue';
import UserListPage from '../user-list.vue';
import creditCollectionPage from '../credit-collection.vue';
export default {
    name: 'basetable',
    components: {
        DynamicTable,
        NewcreditCRPage,
        LookcreditPage,
        creditCollectionPage,
        UserListPage
    },
    inject: ['reload'],
    data() {
        return {
            rowLCCRDataObj:{},
            rowCCDataObj:{},
            rowNewCCRDataObj:{},
            rowUserDataObj:{},
            searchuserformdata:{},
            financingNCCRtype:false,
            financingLCCRtype:false,
            financingCCtype:false,
            MoreSearchVisible: false,
            userListtype: false,
            disabled: false,
            editabled:false,
            showCheckBox: false,
            dialogImageUrl: '',
            dialogVisible: false,
            checked: false,
            labelPosition: 'left',
            formInline: {
                searchName: '',
                searchValue: '',
                serchcompany:'',
                CreditSub:'',
                searchblank:'',
                searchcreditType:'',
                company:''
            },
            companyoptions: new proData().company,
            companyData:new proData().company,
            objectoptions:new proData().project,
            CreditSubject:[],
            Creditblank:[],
            creditType:[],
            searchlist: [
                {
                    value: '4F190401083128460D',
                    label: '授信业务编码'
                },
                {
                    value: '4F190401083128560E',
                    label: '公司'
                },
                {
                    value: '25190515093620000F',
                    label: '项目'
                },
                {
                    value: '25190515093634290G',
                    label: '授信业务编码'
                },
                {
                    value: '25190515093663740H',
                    label: '用信合同名称'
                },
                {
                    value: '25190515093780870I',
                    label: '授信主体'
                },
                {
                    value: '25190515093787670J',
                    label: '授信银行'
                },
                {
                    value: '25190515093855030K',
                    label: '融资金额-原币'
                },
                {
                    value: '25190515093856890L',
                    label: '融资金额-人民币'
                },
                {
                    value: '25190515093862300M',
                    label: '质押金额'
                },
                {
                    value: '25190515093872000N',
                    label: '用途'
                },
                {
                    value: '25190515141567301D',
                    label: '经办人'
                },
                {
                    value: '471911151520255001',
                    label: '状态'
                },
                {
                    value: '471911191400388902',
                    label: '综合授信合同'
                },
                {
                    value: '471911191411796007',
                    label: '业务币种'
                },
            ],
            columns: [
                {
                    type: 'selection'
                },
                {
                    key: 'statusString',
                    title: '状态'
                },
                {
                    key: 'companyname',
                    title: '公司'
                },
                {
                    key: 'awardcode',
                    title: '授信业务编码'
                },
                {
                    key: 'contractname',
                    title: '用信合同名称'
                },
                {
                    key: 'partaname',
                    title: '授信主体'
                },
                {
                    key: 'awardbankname',
                    title: '授信银行'
                },
                {
                    key: 'moneyorigcurrency',
                    title: '融资金额-原币'
                },
                {
                    key: 'moneycny',
                    title: '融资金额-人民币'
                },
                {
                    key: 'pledgeamount',
                    title: '质押金额'
                },
                {
                    key: 'purpose',
                    title: '用途'
                },
                {
                    key: 'handler',
                    title: '经办人'
                },
                {
                    key: 'creditcontractame',
                    title: '综合授信合同'
                },
                {
                    key: 'loandate',
                    title: '放款日'
                },{
                    key: 'duedate',
                    title: '到期日'
                },
                {
                    key: 'servicecurrencyname',
                    title: '业务币种'
                },
            ],
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 20,
            formdata: {
                company: '',
                objectName:'',
                code: '',
                remark: '',
                name: ''
            },
            dialog: {
                company: '',
                codeNomber: '',
                documentNo: '',
                docDateStart:'',
                docDateEnd:'',
                CreditSub:'',
                searchblank:'',
                searchcreditType:'',
                Creditline:'',
                Creditbalance:'',
                operator:'',
                name: ''
            },
            multipleSelection: [],
            headtype: '1',
            handletype: '', //维修类型
            visibleSub: 'block',
            replycon: '',
            rules: {
                name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                company:[{ required: true, message: '请选择公司', trigger: 'blur' }],
                code:[{ required: true, message: '请输入编码', trigger: 'blur' }],
            }
        };
    },
    mounted() {
        this.formInline.company=localStorage.getItem("ms_companyId");
        //获取授信品种
        this.$api.task.findCreditBreedSearchList().then(response => {
            let responsevalue = response;
            if (responsevalue) {
                let returndata = responsevalue.data;
                this.creditType = returndata.data;
            } else {
                this.$message.success('数据库没有该条数据!');
            }
        });
        //授信主体下拉框
        this.$api.task.findprojectPartnerSearchList().then(response => {
            let responsevalue = response;
            if (responsevalue) {
                let returndata = responsevalue.data;
                this.CreditSubject = returndata.data;
            } else {
                this.$message.success('数据库没有该条数据!');
            }
        });
        //授信银行查询下拉框接口
        this.$api.task.findBlankSearchList().then(response => {
            let responsevalue = response;
            if (responsevalue) {
                let returndata = responsevalue.data;
                this.Creditblank = returndata.data;
            } else {
                this.$message.success('数据库没有该条数据!');
            }
        });
        //获取用信合同登记
        let fromdata={};
        fromdata.page=1;
        fromdata.size=10;
        this.$api.task.findUserCreditContractRegisterPage(fromdata).then(response => {
            let responsevalue = response;
            if (responsevalue) {
                let returndata = responsevalue.data;
                let tableDataArr=returndata.rows;
                for(var i =0;i<tableDataArr.length;i++){
                    if(tableDataArr[i].status === 1){
                        tableDataArr[i].statusString="暂存";
                    }else if(tableDataArr[i].status === 2){
                        tableDataArr[i].statusString="提交";
                    }else if(tableDataArr[i].status === 3){
                        tableDataArr[i].statusString="有效";
                    }else {
                        tableDataArr[i].statusString="作废";
                    }
                }
                this.tableData = tableDataArr;
                this.total = returndata.total;
            } else {
                this.$message.success('没有查到数据!');
            }
        });
    },
    methods: {
        //查询用户
        MoreSearchuserVisible(data){
            let finandata=data;
            finandata.finanrowname="全集团人员架构查询方案";
            finandata.finanrowId="4B1811281826545301";
            finandata.nametitle="综合授信合同登记";
            this.rowUserDataObj=finandata;
            this.userListtype=true;
        },
        //获取查询用户信息
        showAddUserListValue(data,type){
            this.searchuserformdata=data;
            if(type === false){
                this.userListtype = false
            }else{
                this.userListtype = true
            }
        },
        //控制查看显示影藏
        showLookOrUpdate(data){
            if(data === false){
                this.financingLCCRtype = false
            }else{
                this.financingLCCRtype = true
            }
        },
        //控制收款显示影藏
        CCShowOrhide(data){
            if(data === false){
                this.financingCCtype = false
            }else{
                this.financingCCtype = true
            }
        },
        //控制新建user显示影藏
        showAddUserFinace(data){
            if(data === false){
                this.financingNCCRtype = false
            }else{
                this.financingNCCRtype = true
            }
        },
        //新建用信合同页面关闭时判断新建显示隐藏
        showAddFinace(data){
            if(data === false){
                this.financingNCCRtype = false
            }else{
                this.financingNCCRtype = true
            }
        },
        // 搜索按钮
        onHandleSearch() {
            let fromdata={};
            fromdata.page=this.pageNum;
            fromdata.size=this.pageSize;
            let compV  = this.formInline.searchName;
            if(compV ==="001"){
                let valueS=this.formInline.searchValue;
                if(valueS && valueS!=''){
                    fromdata.id=this.formInline.searchValue;
                }
            }else if(compV ==="002"){
                let valueS=this.formInline.serchcompany;
                if(valueS && valueS!=''){
                    fromdata.company=this.formInline.serchcompany;
                }
            }else if(compV ==="003"){
                let valueS=this.formInline.searchValue;
                if(valueS && valueS!=''){
                    fromdata.contractcode=this.formInline.searchValue;
                }
            }else if(compV ==="004"){
                let valueS=this.formInline.searchValue;
                if(valueS && valueS!=''){
                    fromdata.contractname=this.formInline.searchValue;
                }
            }else if(compV ==="005"){
                let valueS=this.formInline.CreditSub;
                if(valueS && valueS!=''){
                    fromdata.parta=this.formInline.CreditSub;
                }
            }else if(compV ==="006"){
                let valueS=this.formInline.searchblank;
                if(valueS && valueS!=''){
                    fromdata.awardbank=this.formInline.searchblank;
                }
            }else if(compV ==="007"){
                let valueS=this.formInline.searchcreditType;
                if(valueS && valueS!=''){
                    fromdata.awardcreditbreedoid=this.formInline.searchcreditType;
                }
            }else if(compV ==="008"){
                let valueS=this.formInline.searchValue;
                if(valueS && valueS!=''){
                    fromdata.awardamount=this.formInline.searchValue;
                }
            }else if(compV ==="009"){
                let valueS=this.formInline.searchValue;
                if(valueS && valueS!=''){
                    fromdata.awardover=this.formInline.searchValue;
                }
            }else{
                let valueS=this.formInline.searchValue;
                if(valueS && valueS!=''){
                    fromdata.handler=this.formInline.searchValue;
                }
            }
            this.$api.task.findComplexCreditContractRegisterPage(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.rows;
                    for(var i =0;i<tableDataArr.length;i++){
                        if(tableDataArr[i].status === 1){
                            tableDataArr[i].statusString="暂存";
                        }else if(tableDataArr[i].status === 2){
                            tableDataArr[i].statusString="提交";
                        }else if(tableDataArr[i].status === 3){
                            tableDataArr[i].statusString="有效";
                        }else {
                            tableDataArr[i].statusString="作废";
                        }
                    }
                    this.tableData = tableDataArr;
                    this.total = returndata.total;
                } else {
                    this.$message.success('没有查到数据!');
                }
            });
        },
        onHandleMoreSearch() {
            let fromdata={};
            fromdata.page=this.pageNum;
            fromdata.size=this.pageSize;
            let compvalueS=this.dialog.company;
            if(compvalueS && compvalueS!=''){
                fromdata.company=this.dialog.company;
            }
            let novalueS=this.dialog.documentNo;
            if(novalueS && novalueS!=''){
                fromdata.id=this.dialog.documentNo;
            }
            let DateStS=this.dialog.docDateStart;
            if(DateStS && DateStS!=''){
                fromdata.startdate=this.dialog.docDateStart;
            }
            let DateEnS=this.dialog.docDateEnd;
            if(DateEnS && DateEnS!=''){
                fromdata.enddate=this.dialog.docDateEnd;
            }
            let codeS=this.dialog.codeNomber;
            if(codeS && codeS!=''){
                fromdata.contractcode=this.dialog.codeNomber;
            }
            let nameS=this.dialog.name;
            if(nameS && nameS!=''){
                fromdata.contractname=this.dialog.name;
            }
            let CreditSubS=this.dialog.CreditSub;
            if(CreditSubS && CreditSubS!=''){
                fromdata.parta=this.dialog.CreditSub;
            }
            let blankS=this.dialog.searchblank;
            if(blankS && blankS!=''){
                fromdata.awardbank=this.dialog.searchblank;
            }
            let TypeS=this.dialog.searchcreditType;
            if(TypeS && TypeS!=''){
                fromdata.awardcreditbreedoid=this.dialog.searchcreditType;
            }
            let CreditlineS=this.dialog.Creditline;
            if(CreditlineS && CreditlineS!=''){
                fromdata.awardamount=this.dialog.Creditline;
            }
            let CreditBaS=this.dialog.Creditbalance;
            if(CreditBaS && CreditBaS!=''){
                fromdata.awardover=this.dialog.Creditbalance;
            }
            let operatorS=this.dialog.operator;
            if(operatorS && operatorS!=''){
                fromdata.handler=this.dialog.operator;
            }
            this.$api.task.findComplexCreditContractRegisterPage(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.rows;
                    for(var i =0;i<tableDataArr.length;i++){
                        if(tableDataArr[i].status === 1){
                            tableDataArr[i].statusString="暂存";
                        }else if(tableDataArr[i].status === 2){
                            tableDataArr[i].statusString="提交";
                        }else if(tableDataArr[i].status === 3){
                            tableDataArr[i].statusString="有效";
                        }else {
                            tableDataArr[i].statusString="作废";
                        }
                    }
                    this.tableData = tableDataArr;
                    this.total = returndata.total;
                    this.MoreSearchVisible = false;
                } else {
                    this.$message.success('没有查到数据!');
                }
            });
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
            fromdata.page=val;
            fromdata.size=this.pageSize;
            this.$api.task.findUserCreditContractRegisterPage(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.rows;
                    for(var i =0;i<tableDataArr.length;i++){
                        if(tableDataArr[i].status === 1){
                            tableDataArr[i].statusString="暂存";
                        }else if(tableDataArr[i].status === 2){
                            tableDataArr[i].statusString="提交";
                        }else if(tableDataArr[i].status === 3){
                            tableDataArr[i].statusString="有效";
                        }else {
                            tableDataArr[i].statusString="作废";
                        }
                    }
                    this.tableData = tableDataArr;
                    this.total = returndata.total;
                } else {
                    this.$message.success('没有查到数据!');
                }
            });
        },
        // 新建
        onRowAddButtonClick() {
            this.financingNCCRtype= true;
            let dataObj = {};
            dataObj.Newflag="New";
            dataObj.EditfinanrowId='';
            this.rowNewCCRDataObj=dataObj;
        },
        // 查看
        onRowLookButtonClick() {
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    this.financingLCCRtype=true;
                    this.rowLCCRDataObj.finanrowId=selectOption[0].id;
                }
            }else{
                this.$message.error('请选择一行你要查看的数据!');
            }
        },
        onRowCCButtonClick(){
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    this.financingCCtype=true;
                    this.rowCCDataObj.finanrowId=selectOption[0].id;
                }
            }else{
                this.$message.error('请选择一行你要查看的数据!');
            }
        },
        //修改
        onRowUpdateButtonClick() {
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    if(selectOption[0].status === 3){
                        this.financingNCCRtype= true;
                        let dataObj = {};
                        dataObj.Newflag="Edit";
                        dataObj.EditfinanrowId=selectOption[0].id;
                        this.rowNewCCRDataObj=dataObj;
                    }else{
                        this.$message.error('当前记录已被其他人处理或者已处理完毕，不能回收修改!');
                    }
                }
            }else{
                this.$message.error('请选择一行你要查看的数据!');
            }
        },
        //删除
        onRowRemoveButtonClick(){
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    let messageStr="确认删除 "+selectOption[0].contractname+":"+selectOption[0].contractcode+"?";
                    let tital="删除用信合同登记";
                    this.$Uconfirm(tital,messageStr).then(() => {
                        let formDataA ={};
                        formDataA.id=selectOption[0].id;
                        this.$api.task.delUserCreditContractRegisterVO(formDataA).then(response => {
                            this.$message.success('删除成功!');
                            this.reload();
                        });
                    }).catch(() => {
                        this.$message.success('取消删除!');
                    });
                }
            }else{
                this.$message.error('请选择一行你要删除的数据!');
            }
        },
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