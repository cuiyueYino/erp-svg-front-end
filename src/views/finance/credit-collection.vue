<template>
    <div>
        <el-dialog title="用信合同收款申请" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="60%">
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
                            <el-form-item label="单据号" >
                                <el-input v-model="formdata.awardcode" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授权业务编码">
                                <el-input v-model="formdata.awardcode" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="用信合同">
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
                            <el-form-item label="融资金额-人民币">
                                <el-input v-model="formdata.moneycny" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="用信品种">
                                <el-input v-model="formdata.usercreditbreed" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item label="授信银行" prop="awardbankname">
                                <el-input v-model="formdata.awardbankname" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchBankVisible(formdata)"></el-button>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="质押物类型">
                                <el-input v-model="formdata.pledgetypename" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="质押金额" >
                                <el-input v-model="formdata.pledgeamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="本次申请金额">
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
                        <el-col :span="6" >
                            <el-form-item label="预算外">
                                <el-checkbox v-model="prechecked" ></el-checkbox>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="经办日期">
                                <el-input v-model="formdata.contractinterest" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="经办人">
                                <el-input v-model="formdata.contractinterest" disabled></el-input>
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
                        <el-tab-pane label="收款明细" name="first">
                            <collectiondetaillist :rowCDLDataObj="rowCDLDataObj" :financingCDLtype="financingCDLtype" />
                        </el-tab-pane>
                        <el-tab-pane label="附件" name="second">
                            <creditEnclFilelist :rowEFListDataObj="rowEFListDataObj" :financingEFListtype="financingEFListtype" />
                        </el-tab-pane>
                    </el-tabs>
                    <processnodelist :rowDataprocessObj="rowDataprocessObj"  @changeShow="showprocessData"/> 
                </el-card>
            </el-form>
        </el-dialog>
        <creditBankSearch :rowBankDataObj="rowBankDataObj" :financingBanktype="financingBanktype" @changeShow="showfinancingBankData"/>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
import collectiondetaillist from './collection-detail-list.vue';
import creditEnclFilelist from './enclosure-file-list.vue';
import processnodelist from './process-node-list.vue';
import creditBankSearch from './credit-bank-search.vue';
export default {
    props: {
        rowCCDataObj: Object,
        financingCCtype: Boolean
    },
    name: 'basetable',
    components: {
        DynamicTable,
        collectiondetaillist,
        creditEnclFilelist,
        processnodelist,
        creditBankSearch
    },
    inject: ['reload'],
    data: function() {   
        return {
            atctiveName: 'first',
            ShowFinancVisible:false,
            labelPosition: 'left',
            disabled:false,
            companyData:new proData().company,
            objectoptions:new proData().project,
            formdata: {},
            rowBankDataObj:{},
            rowCDLDataObj: [],
            rowPDLDataObj: [],
            rowEFListDataObj: {},
            rowDataprocessObj:{},
            financingCDLtype:false,
            financingPDLtype:false,
            financingEFListtype:false,
            financingBanktype:false,
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
        //查询授信银行
        MoreSearchBankVisible(data){
            let finandata=data;
            finandata.finanrowname="资金类客户缺省查询方案";
            finandata.finanrowId="401901281025522001";
            finandata.nametitle="用信合同登记";
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
        financingCCtype(oldVal,newVal){
            this.ShowFinancVisible=this.financingCCtype;
            let finandata=this.rowCCDataObj.finanrowId;
            let formDataA ={};
            formDataA.id=finandata;
            console.log(finandata)
            this.$api.task.getUserCreditContractRegisterVO(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data;
                    this.disabled = true;
                    this.editabled=false;
                    /*tableDataArr.loandateStr=this.$Uformat.formatDateTYMD(tableDataArr.loandate);
                    tableDataArr.duedateStr=this.$Uformat.formatDateTYMD(tableDataArr.duedate);
                    tableDataArr.depositstartdateStr=this.$Uformat.formatDateTYMD(tableDataArr.depositstartdate);
                    tableDataArr.depositenddateStr=this.$Uformat.formatDateTYMD(tableDataArr.depositenddate);
                    tableDataArr.voucherdateStr=this.$Uformat.formatDateTYMD(tableDataArr.voucherdate);
                    if(tableDataArr.pre == true){
                        this.prechecked='是';
                    }else if(tableDataArr.pre == false){
                        this.prechecked='否';
                    }*/
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