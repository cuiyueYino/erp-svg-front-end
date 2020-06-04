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
                <el-button @click="ShowFinancVisible = false">取 消</el-button>
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
                <el-row class="elrowStyle">
                    <el-col :span="6" class="pbackground">查询条件</el-col>
                    <el-col :span="6"  class="pbackground">操作符</el-col>
                    <el-col :span="12" class="pbackground">条件值</el-col>
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
                    <el-col :span="6" class="elColCenter">编码</el-col>
                    <el-col :span="6" class="elColCenter">右匹配</el-col>
                    <el-col :span="8">
                        <el-input v-model="dialog.code"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">名称</el-col>
                    <el-col :span="6" class="elColCenter">左右匹配</el-col>
                    <el-col :span="8">
                        <el-input v-model="dialog.name"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">收支类型</el-col>
                    <el-col :span="6" class="elColCenter">等于</el-col>
                    <el-col :span="8">
                        <el-select v-model="dialog.inExpenseProperty">
                            <el-option
                                v-for="item in IEPoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">收支性质</el-col>
                    <el-col :span="6" class="elColCenter">等于</el-col>
                    <el-col :span="8">
                        <el-select v-model="dialog.inExpenseType">
                            <el-option
                                v-for="item in IEToptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
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
    </div>
</template>
<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
export default {
    props: {
        rowPNSDataObj:Object,
        financingPNStype: Boolean
    },
    name: 'basetable',
    components: {
        DynamicTable,
    },
    inject: ['reload'],
    data: function() {
        return{
            title:'',
            ShowFinancVisible:false,
            MoreSearchVisible:false,
            disabled:false,
            checked:false,
            pageNum: 1,
            pageSize: 10,
            total: 20,
            rowFincename:'',
            formdata:{
                searchName:'',
                company:'',
            },
            dialog:{
                name:'',
                code:'',
                inExpenseProperty:'',
                company:'',
                inExpenseType:'',
            },
            companyoptions: new proData().company,
            companyData:new proData().company,
            objectoptions:new proData().project,
            IEPoptions:[
                {
                value: '-1',
                label: '--'
                },
                {
                value: '-2',
                label: '支出'
                },
                {
                value: '2',
                label: '收入'
                }
            ],
            IEToptions:[
                {
                value: '-1',
                label: '--'
                },
                {
                value: '1',
                label: '首付房款'
                },
                {
                value: '2',
                label: '商业贷款'
                },
                {
                value: '3',
                label: '公积金贷款'
                },
                {
                value: '4',
                label: '房款'
                },
                {
                value: '5',
                label: '面积补差款'
                },
                {
                value: '6',
                label: '代收费用'
                },
                {
                value: '7',
                label: '排号费'
                },
                {
                value: '8',
                label: '变更费'
                },
                {
                value: '9',
                label: '抵付款'
                },
                {
                value: '20',
                label: '租金'
                },
                {
                value: '40',
                label: '物业费'
                },
                {
                value: '60',
                label: '预收款'
                },
                {
                value: '80',
                label: '订金'
                },
                {
                value: '81',
                label: '定金'
                },
                {
                value: '82',
                label: '押金'
                },
                {
                value: '83',
                label: '违约金'
                },
                {
                value: '84',
                label: '质保金'
                },
                {
                value: '85',
                label: '资金调拨'
                },
                {
                value: '99',
                label: '其它'
                },
                {
                value: '100',
                label: '预付款'
                },
                {
                value: '101',
                label: '借款'
                },
                {
                value: '102',
                label: '合同款'
                }
            ],
            columns:[
                {
                    type: 'selection'
                },
                {
                    key: 'statusString',
                    title: '状态'
                },
                {
                    key: 'companyName',
                    title: '公司'
                },
                {
                    key: 'code',
                    title: '编码'
                },
                {
                    key: 'name',
                    title: '名称'
                },
                {
                    key: 'inExpenseProperty',
                    title: '收支类型'
                },
                {
                    key: 'inExpenseType',
                    title: '收支性质'
                },
                {
                    key: 'remark',
                    title: '描述'
                }
            ],
            tableData:[],
            address: new proData().address,
            labelPosition: 'left',
        }
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.$emit('changeShow',this.rowPNSDataObj,false);
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
            formDataA.company=localStorage.getItem('ms_companyId');
            this.$api.task.findMoneyNamePage(formDataA).then(response => {
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
        //提交授信主体值
        savefinanceValue(){
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    //返回选中的父组件选中的row,并修某些改值
                    this.rowPNSDataObj.searchRowPNSid=selectOption[0].id;
                    this.rowPNSDataObj.searchRowPNSname=selectOption[0].name;
                    this.$emit('changeShow',this.rowPNSDataObj,false);
                    this.ShowFinancVisible = false;
                }
            }else{
                this.$message.error('请选择一行数据!');
            }
        },
        //高级查询
        onHandleMoreSearch(){
            let formDataA ={};
            formDataA.page=this.pageNum;
            formDataA.size=this.pageSize;
            let namevalueS=this.dialog.name;
            if(namevalueS && namevalueS!=''){
                formDataA.name=this.dialog.name;
            }
            let codeS=this.dialog.code;
            if(codeS && codeS!=''){
                formDataA.code=this.dialog.code;
            }
            let compvalueS=this.dialog.company;
            if(compvalueS && compvalueS!=''){
                formDataA.company=this.dialog.company;
            }
            let IEPvalueS=this.dialog.inExpenseProperty;
            if(IEPvalueS && IEPvalueS!=''){
                formDataA.inExpenseProperty=this.dialog.inExpenseProperty;
            }
            let IETvalueS=this.dialog.inExpenseType;
            if(IETvalueS && IETvalueS!=''){
                formDataA.inExpenseType=this.dialog.inExpenseType;
            }
            this.$api.task.findMoneyNamePage(formDataA).then(response => {
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
                }else {
                    this.$message.success('没有查到数据!');
                }
            });
            this.MoreSearchVisible = false;
        }

    },
    watch:{
        financingPNStype(oldVal,newVal){
            this.ShowFinancVisible=this.financingPNStype;
            let rowDataObj=this.rowPNSDataObj;
            this.title=rowDataObj.nametitle;
            this.formdata.searchName=rowDataObj.finanrowId;
            this.rowFincename=rowDataObj.finanrowname;
            let formDataA ={};
            formDataA.page=this.pageNum;
            formDataA.size=this.pageSize;
            formDataA.company=localStorage.getItem('ms_companyId');
            this.$api.task.findMoneyNamePage(formDataA).then(response => {
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