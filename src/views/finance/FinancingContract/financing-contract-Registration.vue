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
                            v-for="item in address"
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
                    <div class="frdiv" v-else-if="formInline.searchName === '005'">
                        <el-select v-model="formInline.CreditSub" placeholder="--" clearable>
                            <el-option
                                v-for="item in CreditSubject"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="frdiv" v-else-if="formInline.searchName === '006'">
                        <el-select v-model="formInline.searchblank" placeholder="--" clearable>
                            <el-option
                                v-for="item in Creditblank"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
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
        <el-dialog title="综合授信合同登记缺省查询方案" :visible.sync="MoreSearchVisible" :append-to-body="true" v-if="MoreSearchVisible" :close-on-click-modal="false" width="50%">
            <el-form
                label-width="100px"
                v-model="dialog"
                class="dataForm"
                :label-position="labelPosition"
            >
            <el-card>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="pbackground">查询条件</el-col>
                    <el-col :span="6"  class="pbackground">操作符</el-col>
                    <el-col :span="12" class="pbackground">条件值</el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">单据号</el-col>
                    <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.documentNo"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">公司</el-col>
                    <el-col :span="6" class="elColCenter">等于</el-col>
                    <el-col :span="8">
                        <el-select v-model="dialog.company">
                            <el-option
                                v-for="item in companyoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">单据日期</el-col>
                    <el-col :span="6"  class="elColCenter">大于等于</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.docDateStart"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">单据日期</el-col>
                    <el-col :span="6"  class="elColCenter">小于等于</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.docDateEnd"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">授信合同编码</el-col>
                    <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.codeNomber"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">合同名称</el-col>
                    <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.name"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">授信主体</el-col>
                    <el-col :span="6"  class="elColCenter">等于</el-col>
                    <el-col :span="8">
                       <el-select v-model="dialog.CreditSub" placeholder="--" clearable>
                            <el-option
                                v-for="item in CreditSubject"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">授信银行</el-col>
                    <el-col :span="6"  class="elColCenter">等于</el-col>
                    <el-col :span="8">
                       <el-select v-model="dialog.searchblank" placeholder="--" clearable>
                            <el-option
                                v-for="item in Creditblank"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">授信品种</el-col>
                    <el-col :span="6"  class="elColCenter">等于</el-col>
                    <el-col :span="8">
                       <el-select v-model="dialog.searchcreditType" placeholder="--" clearable>
                            <el-option
                                v-for="item in creditType"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">授信额度</el-col>
                    <el-col :span="6"  class="elColCenter">大于等于</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.Creditline"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">授信余额</el-col>
                    <el-col :span="6"  class="elColCenter">大于等于</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.Creditbalance"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">经办人</el-col>
                    <el-col :span="6"  class="elColCenter">等于</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.operator"></el-input>
                    </el-col>
                    <el-col :span="2">
                    <el-button type="primary" icon="el-icon-search" @click="MoreSearchuserVisible = true"></el-button>
                    </el-col>
                </el-row>
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="MoreSearchVisible = false">取 消</el-button>
                <el-button type="primary" @click="onHandleMoreSearch">查询</el-button>
            </span>
        </el-dialog>
        <el-dialog title="用户缺省查询方案" :visible.sync="MoreSearchuserVisible" :append-to-body="true" v-if="MoreSearchuserVisible" :close-on-click-modal="false" width="40%">
            <el-form
                label-width="100px"
                v-model="dialog"
                class="dataForm"
                :label-position="labelPosition"
            ></el-form>
        </el-dialog>
        <NewfinancingPage  :Newfinancingtype="Newfinancingtype" @changeShow="showAddFinace"/>
        <EditfinancingPage :saveflage="saveflage" :EditfinanrowId="EditfinanrowId" :Editfinancingtype="Editfinancingtype" @changeShow="showLookOrUpdate"/>
    </div>
</template>

<script>
import DynamicTable from '../../../components/common/dytable/dytable.vue';
import proData from '../../../components/common/proData/proData';
import NewfinancingPage from './new-financing-contract-Regis.vue';
import EditfinancingPage from './edit-financing-contract-Regis.vue';
export default {
    name: 'basetable',
    components: {
        DynamicTable,
        NewfinancingPage,
        EditfinancingPage
    },
    inject: ['reload'],
    data() {
        return {
            Newfinancingtype:false,
            Editfinancingtype:false,
            EditfinanrowId:'',
            MoreSearchVisible: false,
            MoreSearchuserVisible: false,
            disabled: false,
            editabled:false,
            showCheckBox: false,
            dialogImageUrl: '',
            dialogVisible: false,
            saveflage:'New',
            checked: false,
            labelPosition: 'left',
            formInline: {
                searchName: '001',
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
            address: [
                {
                    value: '001',
                    label: '单据号'
                },
                {
                    value: '002',
                    label: '公司'
                },
                {
                    value: '003',
                    label: '授信合同编码'
                },
                {
                    value: '004',
                    label: '合同名称'
                },
                {
                    value: '005',
                    label: '授信主体'
                },
                {
                    value: '006',
                    label: '授信银行'
                },
                {
                    value: '007',
                    label: '授信品种'
                },
                {
                    value: '008',
                    label: '授信额度'
                },
                {
                    value: '009',
                    label: '授信余额'
                },
                {
                    value: '010',
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
                    key: 'contractcode',
                    title: '授信合同编码'
                },
                {
                    key: 'contractname',
                    title: '合同名称'
                },
                {
                    key: 'gestordeptname',
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
        //获取综合授信合同登记
        let fromdata={};
        fromdata.page=1;
        fromdata.size=10;
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
    methods: {
        //控制查看修改显示影藏
        showLookOrUpdate(data){
            if(data === false){
                this.Editfinancingtype = false
            }else{
                this.Editfinancingtype = true
            }
        },
        //控制添加显示影藏
        showAddFinace(data){
            if(data === false){
                this.Newfinancingtype = false
            }else{
                this.Newfinancingtype = true
            }
        },
        // 搜索按钮
        onHandleSearch() {
            var form = new FormData();
            form.append('page', this.pageNum);
            form.append('size', this.pageSize);
            let compV  = this.formInline.searchName;
            if(compV ==="001"){
                let valueS=this.formInline.searchValue;
                if(valueS && valueS!=''){
                    form.append('name', this.formInline.searchValue); 
                }
            }else if(compV ==="002"){
                let valueS=this.formInline.searchValue;
                if(valueS && valueS!=''){
                    form.append('code', this.formInline.searchValue);
                }
            }else if(compV ==="003"){
                let valueS=this.formInline.serchcompany;
                if(valueS && valueS!=''){
                    form.append('company', this.formInline.serchcompany);
                }
            }else{
                let valueS=this.formInline.searchValue;
                if(valueS && valueS!=''){
                    form.append('name', this.formInline.searchValue); 
                }
            }
            this.$api.task.findComplexCreditContractRegisterPage(form).then(response => {
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
            var form = new FormData();
            form.append('page', this.pageNum);
            form.append('size', this.pageSize);
            let namevalueS=this.dialog.name;
            if(namevalueS && namevalueS!=''){
                form.append('name', this.dialog.name); 
            }
            let codevalueS=this.dialog.codeNomber;
            if(codevalueS && codevalueS!=''){
                form.append('code', this.dialog.codeNomber);
            }
            let compvalueS=this.dialog.company;
            if(compvalueS && compvalueS!=''){
                form.append('company', this.dialog.company);
            }
            this.$api.task.findComplexCreditContractRegisterPage(form).then(response => {
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
        // 新建
        onRowAddButtonClick() {
            this.Newfinancingtype= true;
        },
        // 查看
        onRowLookButtonClick() {
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    this.Editfinancingtype=true;
                    this.EditfinanrowId=selectOption[0].id;
                    this.saveflage="Look";
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
                    this.Editfinancingtype=true;
                    this.EditfinanrowId=selectOption[0].id;
                    this.saveflage="Edit";
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
                    let messageStr="确认删除 "+selectOption[0].code+":"+selectOption[0].name+"?";
                    let tital="删除综合授信合同登记";
                    this.$Uconfirm(tital,messageStr).then(() => {
                        let formDataA ={};
                        formDataA.id=selectOption[0].id;
                        this.$api.task.delComplexCreditContractRegisterVO(formDataA).then(response => {
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