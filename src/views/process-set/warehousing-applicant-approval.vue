<template>
    <div>
        <el-dialog :title="title" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="60%">
            <el-form
                label-width="110px"
                v-model="formdata"
                class="dataForm"
                size="mini"
                :model="formdata"
                :label-position="labelPosition"
            >
                <el-card>
                    <el-row :gutter="24">
                        <el-col :span="12" :offset="12">
                            <el-button type="danger" icon="el-icon-circle-plus-outline" plain @click="effectOrDisableMsg">加签</el-button>
                            <el-button type="success" icon="el-icon-share" plain @click="effectOrDisableMsg">转发</el-button>
                            <el-button type="danger" icon="el-icon-s-order" plain @click="effectOrDisableMsg">委托</el-button>
                            <el-button type="danger" icon="el-icon-view" plain @click="effectOrDisableMsg">关注</el-button>
                            <el-button type="success" icon="el-icon-success" plain @click="effectOrDisableMsg">提交</el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <LookcreditPage  :rowLFCADataObj="rowLFCADataObj" :financingLFCAtype="financingLFCAtype" @changeShow="showLookOrUpdate"/>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="22">
                        </el-col>
                    </el-row>
                    <el-tabs v-model="atctiveName" @tab-click="handleClick">
                        <el-tab-pane label="审批意见" name="first">
                            <el-row >
                                <el-col :span="12" >
                                    <el-form-item label="决策类型" prop="code">
                                        <el-radio v-model="formdata.radio" label="1">同意</el-radio>
                                        <el-radio v-model="formdata.radio" label="2">不同意</el-radio>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="23">
                                    <el-form-item label="审批意见">
                                        <el-input type="textarea" v-model="formdata.remark" :rows="5"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="附件" name="second">
                            <creditEnclFilelist :rowEFListDataObj="rowEFListDataObj" :financingEFListtype="financingEFListtype" />
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
import LookcreditPage from './financing-contract-Adjust-list.vue';
import creditEnclFilelist from '../finance/enclosure-file.vue';
export default {
    props: {
        rowWAADataObj: Object,
        rowWAAtype:{
             type: Boolean,
             default: false
        },
    },
    name: 'basetable',
    components: {
        DynamicTable,
        creditEnclFilelist,
        LookcreditPage
    },
    inject: ['reload'],
    data: function() {   
        return {
            atctiveName: 'first',
            ShowFinancVisible:false,
            labelPosition: 'left',
            disabled:false,
            finanLFCRtype:false,
            financingLFCAtype:false,
            financingEFListtype:false,
            companyData:new proData().company,
            objectoptions:new proData().project,
            formdata: {
                radio:1,
                remark:''
            },
            rowLFCADataObj: {},
            rowLFCRDataObj: {},
            rowCDLDataObj: [],
            rowPDLDataObj: [],
            rowEFListDataObj: {},
            rowEFListDataObj: {},
            rowDataprocessObj:{},
            financingCDLtype:false,
            financingPDLtype:false,
            financingEFListtype:false,
            pageNum: 1,
            pageSize: 10,
            total: 20,
            prechecked:'',
            title:''
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
         //控制查看显示影藏
        showLookOrUpdate(data){
            if(data === false){
                this.financingLFCAtype = false
            }else{
                this.financingLFCAtype = true
            }
        },
        //滑块切换
        handleClick(tab){
            var tabsname =tab.paneName;
            if(tabsname){
                if(tabsname ==="first"){
                    //授信合同记录
                    //this.financingLFCAtype=true;
                }else if(tabsname ==="second"){
                    //授信品种管理
                    this.financingCVMListtype=true;
                }else{
                    //附件列表
                    this.financingEFListtype=true;
                    
                }
            }
        },
        effectOrDisableMsg(){

        }
    },
    mounted() {
    },
    watch:{
        rowWAAtype(oldVal,newVal){ console.log(oldVal,newVal)
            this.ShowFinancVisible=this.rowWAAtype;
            let finandata=this.rowWAADataObj.finanrowId;
            let formDataA ={};
            formDataA.id=finandata;
            this.title=this.rowWAADataObj.nametitle;
            console.log(this.financingLFCAtype)
            console.log(2222)
            //this.financingLFCAtype=true;
            this.rowLFCADataObj.finanrowId='2160a15037e640628e135a4efd2adfd3';
            console.log(this.financingLFCAtype)
            /*this.$api.task.getUserCreditContractRegisterVO(formDataA).then(response => {
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
            });*/
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