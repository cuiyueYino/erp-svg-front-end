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
                    <div class="frdiv" v-else-if="formInline.searchName === '002'">
                        <el-select v-model="formInline.serchcompany" placeholder="公司" clearable>
                            <el-option
                                v-for="item in companyData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="frdiv" v-else-if="formInline.searchName === '003'">
                        <el-select v-model="formInline.serchfcRegidst" placeholder="综合授信合同" clearable>
                            <el-option
                                v-for="item in fcRegidstData"
                                :key="item.contractcode"
                                :label="item.contractname"
                                :value="item.contractcode"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="frdiv" v-else-if="formInline.searchName === '005'">
                        <el-select v-model="formInline.CreditSub" placeholder="授信品种调整" clearable >
                            <el-option
                                v-for="item in creditType"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="frdiv" v-else-if="formInline.searchName === '006'">
                        <el-select v-model="formInline.headerS" placeholder="经办人" clearable >
                            <el-option
                                v-for="item in headerSData"
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
        <el-dialog title="综合授信合同调整" :visible.sync="MoreSearchVisible" :append-to-body="true" v-if="MoreSearchVisible" :close-on-click-modal="false" width="50%">
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
                <el-row class="elrowStyle" size="mini">
                    <el-col :span="6" class="elColCenter">调整单号</el-col>
                    <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.documentNo" size="mini"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle" >
                    <el-col :span="6" class="elColCenter">综合授信合同</el-col>
                    <el-col :span="6" class="elColCenter">等于</el-col>
                    <el-col :span="8">
                        <el-select v-model="dialog.fcRegidst" size="mini">
                            <el-option
                                v-for="item in fcRegidstData"
                                :key="item.contractcode"
                                :label="item.contractname"
                                :value="item.contractcode"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle" >
                    <el-col :span="6" class="elColCenter">调整日期</el-col>
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
                    <el-col :span="6" class="elColCenter">授信额度调整</el-col>
                    <el-col :span="6"  class="elColCenter">大于等于</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.docfcreditadjust" size="mini"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle" >
                    <el-col :span="6" class="elColCenter">授信品种调整</el-col>
                    <el-col :span="6"  class="elColCenter">等于</el-col>
                    <el-col :span="8">
                       <el-select v-model="dialog.CreditSub" placeholder="--" clearable size="mini">
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
                    <el-col :span="6" class="elColCenter">经办人</el-col>
                    <el-col :span="6"  class="elColCenter">等于</el-col>
                    <el-col :span="8">
                       <el-select v-model="dialog.headerS" placeholder="--" clearable size="mini">
                            <el-option
                                v-for="item in headerSData"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="MoreSearchVisible = false">取 消</el-button>
                <el-button type="primary" @click="onHandleMoreSearch">查询</el-button>
            </span>
        </el-dialog>
        <UserListPage  :userListtype="userListtype" :rowUserDataObj="rowUserDataObj" @changeShow="showAddFinace"/>
        <NewfinancingPage  :NewFCAtype="NewFCAtype" :rowNewFCADataObj="rowNewFCADataObj" @changeShow="showAddFinace"/>
        <LookfinancingPage  :rowLFCADataObj="rowLFCADataObj" :financingLFCAtype="financingLFCAtype" @changeShow="showLookOrUpdate"/>
    </div>
</template>

<script>
import DynamicTable from '../../../components/common/dytable/dytable.vue';
import proData from '../../../components/common/proData/proData';
import NewfinancingPage from './new-finance-contract-adjust.vue';
import LookfinancingPage from './look-financing-contract-Adjust.vue';
import UserListPage from '../user-list.vue';
export default {
    name: 'basetable',
    components: {
        DynamicTable,
        NewfinancingPage,
        LookfinancingPage,
        UserListPage
    },
    inject: ['reload'],
    data() {
        return {
            rowLFCADataObj:{},
            rowNewFCADataObj:{},
            rowUserDataObj:{},
            searchuserformdata:{},
            NewFCAtype:false,
            financingLFCAtype:false,
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
                searchName: '001',
                serchfcRegidst: '',
                searchValue: '',
                serchcompany:'',
                CreditSub:'',
                company:'',
                headerS:'',
            },
            companyoptions: new proData().company,
            companyData:new proData().company,
            objectoptions:new proData().project,
            CreditSubject:[
                {
                    value: 'BFPID000000NKF0DA2',
                    label: '大连金新房地产开发有限公司备查爱心'
                },
                {
                    value: 'BFPID000000NKF0CW4',
                    label: '大连金新房地产开发有限公司备查'
                }
            ],
            Creditblank:[
                {
                    value: 'BFPID000000NPI1EKT',
                    label: '南洋商业银行'
                },
                {
                    value: 'BFPID000000NRT1791',
                    label: '瑞士信贷银行'
                }
            ],
            creditType:[],
            headerSData:[],
            searchlist: [
                {
                    value: '001',
                    label: '调整单号'
                },
                {
                    value: '002',
                    label: '公司'
                },
                {
                    value: '003',
                    label: '综合授信合同'
                },
                {
                    value: '004',
                    label: '授信调整额度'
                },
                {
                    value: '005',
                    label: '授信品种调整'
                },
                {
                    value: '006',
                    label: '经办人'
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
                    key: 'voucherid',
                    title: '调整单号'
                },
                {
                    key: 'creditcontractname',
                    title: '综合授信合同'
                },
                {
                    key: 'adjustdate',
                    title: '调整日期'
                },
                {
                    key: 'awardadjamount',
                    title: '授信调整额度'
                },
                {
                    key: 'newawardcreditbreed',
                    title: '授信品种调整'
                },
                {
                    key: 'handler',
                    title: '经办人'
                },
                {
                    key: 'remark',
                    title: '备注'
                }
            ],
            fcRegidstData:[],
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
                fcRegidst: '',
                documentNo: '',
                docDateStart:'',
                CreditSub:'',
                docfcreditadjust:'',
                headerS:'',
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
        //获取综合授信合同登记
        this.$api.task.findSearchList().then(response => {
            let responsevalue = response;
            if (responsevalue) {
                let returndata = responsevalue.data;
                this.fcRegidstData = returndata.data;
            } else {
                this.$message.success('数据库没有该条数据!');
            }
        });
        //获取综合授信合同调整
        let fromdata={};
        fromdata.page=1;
        fromdata.size=10;
        this.$api.task.findComplexCreditContractAdjustPage(fromdata).then(response => {
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
        //控制查看修改显示影藏
        showLookOrUpdate(data){
            if(data === false){
                this.financingLFCAtype = false
            }else{
                this.financingLFCAtype = true
            }
        },
        //控制添加显示影藏
        showAddFinace(data){
            if(data === false){
                this.NewFCAtype = false
            }else{
                this.NewFCAtype = true
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
                let valueS=this.formInline.serchfcRegidst;
                if(valueS && valueS!=''){
                    fromdata.creditcontract=this.formInline.serchfcRegidst;
                }
            }else if(compV ==="004"){
                let valueS=this.formInline.searchValue;
                if(valueS && valueS!=''){
                    fromdata.awardadjamount=this.formInline.searchValue;
                }
            }else if(compV ==="005"){
                let valueS=this.formInline.CreditSub;
                if(valueS && valueS!=''){
                    fromdata.newawardcreditbreed=this.formInline.CreditSub;
                }
            }else if(compV ==="006"){
                let valueS=this.formInline.headerS;
                if(valueS && valueS!=''){
                    fromdata.handler=this.formInline.headerS;
                }
            }
            this.$api.task.findComplexCreditContractAdjustPage(fromdata).then(response => {
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
                fromdata.voucherid=this.dialog.documentNo;
            }
            let codeS=this.dialog.fcRegidst;
            if(codeS && codeS!=''){
                fromdata.creditcontract=this.dialog.fcRegidst;
            }
            let DateStS=this.dialog.docDateStart;
            if(DateStS && DateStS!=''){
                fromdata.adjustdate=this.dialog.docDateStart;
            }
            let fcreditadjustS=this.dialog.docfcreditadjust;
            if(fcreditadjustS && fcreditadjustS!=''){
                fromdata.awardadjamount=this.dialog.docfcreditadjust;
            }
            let CreditSubS=this.dialog.CreditSub;
            if(CreditSubS && CreditSubS!=''){
                fromdata.newawardcreditbreed=this.dialog.CreditSub;
            }
            let operatorS=this.dialog.headerS;
            if(operatorS && operatorS!=''){
                fromdata.handler=this.dialog.headerS;
            }
            this.$api.task.findComplexCreditContractAdjustPage(fromdata).then(response => {
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
            this.$api.task.findComplexCreditContractAdjustPage(fromdata).then(response => {
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
            this.NewFCAtype= true;
            let dataObj = {};
            dataObj.Newflag="New";
            dataObj.EditfinanrowId='';
            this.rowNewFCADataObj=dataObj;
        },
        // 查看
        onRowLookButtonClick() {
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    this.financingLFCAtype=true;
                    this.rowLFCADataObj.finanrowId=selectOption[0].id;
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
                    if(selectOption[0].status === 1 || selectOption[0].status === 2 || selectOption[0].status === 3){
                        this.NewFCAtype= true;
                        let dataObj = {};
                        dataObj.Newflag="Edit";
                        dataObj.EditfinanrowId=selectOption[0].id;
                        this.rowNewFCADataObj=dataObj;
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
                    let messageStr="确认删除 "+selectOption[0].voucherid+"?";
                    let tital="删除综合授信合同登记";
                    if(selectOption[0].status ==2 || selectOption[0].status ==3){
                        this.$message.error('综合授信合同调整：'+selectOption[0].voucherid+' 不能删除!');
                    }else{
                        this.$Uconfirm(tital,messageStr).then(() => {
                            let formDataA ={};
                            formDataA.id=selectOption[0].id;
                            this.$api.task.delComplexCreditContractAdjustVO(formDataA).then(response => {
                                this.$message.success('删除成功!');
                                this.reload();
                            });
                        }).catch(() => {
                            this.$message.success('取消删除!');
                        });
                    }
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