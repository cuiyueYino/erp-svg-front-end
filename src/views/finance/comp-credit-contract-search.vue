<template>
    <div>
        <el-dialog :title="title" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="60%">
            <el-form
                label-width="110px"
                v-model="formdata"
                class="dataForm"
                :model="formdata"
                :label-position="labelPosition"
            >
                <el-card>
                    <div class="container">
                        <div class="search-left">
                            <el-select v-model="formdata.searchName" placeholder="" clearable disabled>
                                <el-option
                                    v-for="item in address"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                        <div class="search-right">
                            <div class="fr">
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
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="savefinanceValue">提交</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="title" :visible.sync="MoreSearchVisible" :append-to-body="true" v-if="MoreSearchVisible" :close-on-click-modal="false" width="50%">
            <el-form
                label-width="100px"
                v-model="dialog"
                class="dataForm"
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
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
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
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
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
    </div>
</template>
<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
import UserListPage from './user-list.vue';
export default {
    props: {
        rowCCDataObj:Object,
        financingCCtype: Boolean
    },
    name: 'basetable',
    components: {
        DynamicTable,
        UserListPage
    },
    inject: ['reload'],
    data: function() {
        return{
            title:'',
            ShowFinancVisible:false,
            MoreSearchVisible:false,
            disabled:false,
            checked:false,
            userListtype:false,
            rowUserDataObj:{},
            pageNum: 1,
            pageSize: 10,
            total: 20,
            rowFincename:'',
            companyoptions: new proData().company,
            creditType:[],
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
            formdata:{
                searchName:'',
                company:'',
            },
            dialog:{
                company:'',
                documentNo:'',
                codeNomber:'',
            },
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
                    key: 'contractcode',
                    title: '授信合同编码'
                },
                {
                    key: 'contractname',
                    title: '合同名称'
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
                    key: 'awardcreditbreedname',
                    title: '授信品种'
                },
                {
                    key: 'awardamount',
                    title: '授信额度'
                },
                {
                    key: 'awardableamount',
                    title: '授信余额'
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
            tableData:[],
            address: [
                {
                    value: '4E1712231426568201',
                    label: '甲方单位'
                },
                {
                    value: '640804022230210601',
                    label: '项目参见方缺省查询方案'
                },
                {
                    value: '4F1904010848766606',
                    label: '综合授信合同登记缺省查询方案'
                },
                {
                    value: '640804022242524502',
                    label: '生效状态的项目参建方查询'
                }
            ],
            labelPosition: 'left',
        }
    },
    mounted() {
        //获取授信品种
        var form = new FormData();
        form.append('page', this.pageNum);
        form.append('size', this.pageSize);
        form.append('company', localStorage.getItem('ms_companyId'));
        this.$api.task.findAwardCreditBreedPage(form).then(response => {
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
                this.creditType = tableDataArr;
            } else {
                this.$message.success('没有查到数据!');
            }
        });
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.$emit('changeShow',this.rowCCDataObj,false);
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
            let formDataA ={};
            formDataA.page=val;
            formDataA.size=this.pageSize;
            //formDataA.company=localStorage.getItem('ms_companyId');
            //formDataA.status=3;
            this.$api.task.findComplexCreditContractRegisterPage(formDataA).then(response => {
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
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        //查询用户
        MoreSearchuserVisible(data){
            let finandata=data;
            finandata.finanrowname="全集团人员架构查询方案";
            finandata.finanrowId="4B1811281826545301";
            finandata.nametitle="综合授信合同登记";
            this.rowUserDataObj=finandata;
            this.userListtype=true;
        },
        //控制查询用户显示影藏
        showAddUserFinace(data){
            if(data === false){
                this.userListtype = false
            }else{
                this.userListtype = true
            }
        },
        //提交授信主体值
        savefinanceValue(){
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    //返回选中的父组件选中的row,并修某些改值
                    this.rowCCDataObj.SerachID=selectOption[0].id;
                    this.$emit('changeShow',this.rowCCDataObj,false);
                    this.ShowFinancVisible = false;
                }
            }else{
                this.$message.error('请选择一行数据!');
            }
        },
        //高级查询
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
            fromdata.status=3;
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

    },
    watch:{
        financingCCtype(oldVal,newVal){
            this.ShowFinancVisible=this.financingCCtype;
            let rowCCDataObj=this.rowCCDataObj;
            this.title=rowCCDataObj.nametitle;
            this.formdata.searchName=rowCCDataObj.finanrowId;
            this.rowFincename=rowCCDataObj.finanrowname;
            let formDataA ={};
            formDataA.page=this.pageNum;
            formDataA.size=this.pageSize;
            //formDataA.status=3;
            //formDataA.company=localStorage.getItem('ms_companyId');
            this.$api.task.findComplexCreditContractRegisterPage(formDataA).then(response => {
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
                    this.$message.success('数据库没有该条数据!');
                }
            });
        }
    }
}
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