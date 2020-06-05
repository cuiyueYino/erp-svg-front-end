<template>
    <div>
        <el-dialog title="综合授信合同登记" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="60%">
            <el-form
                label-width="110px"
                v-model="formdata"
                class="dataForm"
                :rules="rules"
                size="mini"
                :model="formdata"
                :label-position="labelPosition"
            >
                <el-card>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="公司" prop="company">
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
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信合同编码" prop="code">
                                <el-input v-model="formdata.contractcode" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="合同名称" prop="name">
                                <el-input v-model="formdata.contractname" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="用信品种">
                                <el-input v-model="formdata.usercreditbreed" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信主体" prop="code">
                                <el-input v-model="formdata.partaname" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信额度" prop="name">
                                <el-input v-model="formdata.awardamount" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信品种">
                                <el-input v-model="formdata.awardcreditbreedname" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信银行" prop="code">
                                <el-input v-model="formdata.awardbankname" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信调整额度" prop="name">
                                <el-input v-model="formdata.awardamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信占用">
                                <el-input v-model="formdata.awardoccupy" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信天数" prop="code">
                                <el-input v-model="formdata.awarddays" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信可用额度" prop="name">
                                <el-input v-model="formdata.awardableamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信余额">
                                <el-input v-model="formdata.awardover" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信起始日" prop="code">
                                <el-input v-model="formdata.startdateStr" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信到期" prop="name">
                                <el-input v-model="formdata.enddateStr" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7" :offset="2">
                            <el-form-item label="剩余天数">
                                <el-input v-model="formdata.overdays" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="经办人" prop="code">
                                <el-input v-model="formdata.handler" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="经办时间" prop="name">
                                <el-input v-model="formdata.voucherdateStr" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7" :offset="2">
                            <el-form-item label="经办部门">
                                <el-input v-model="formdata.gestordeptname" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="项目描述">
                                <el-input type="textarea" v-model="formdata.remark" :rows="8" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-tabs v-model="atctiveName" @tab-click="handleClick">
                        <el-tab-pane label="用信合同记录" name="first">
                            <creditContractRecord :rowCCRecordDataObj="rowCCRecordDataObj" :financingCCRecordtype="financingCCRecordtype" />
                        </el-tab-pane>
                        <el-tab-pane label="授信品种管理" name="second">
                            <creVMlist :rowCVMListDataObj="rowCVMListDataObj" :financingCVMListtype="financingCVMListtype" />
                        </el-tab-pane>
                        <el-tab-pane label="附件" name="third">
                            <creditEnclFilelist :rowEFListDataObj="rowEFListDataObj" :financingEFListtype="financingEFListtype" />
                        </el-tab-pane>
                    </el-tabs>
                    <processnodelist :rowDataprocessObj="rowDataprocessObj"  @changeShow="showprocessData"/> 
                </el-card>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import DynamicTable from '../../../components/common/dytable/dytable.vue';
import proData from '../../../components/common/proData/proData';
import creditContractRecord from '../credit-contract-record.vue';
import creVMlist from '../credit-varieties-management-list.vue';
import creditEnclFilelist from '../enclosure-file-list.vue';
import processnodelist from '../process-node-list.vue';
export default {
    props: {
        rowLFCRDataObj: Object,
        finanLFCRtype: Boolean
    },
    name: 'basetable',
    components: {
        DynamicTable,
        creditContractRecord,
        creVMlist,
        creditEnclFilelist,
        processnodelist
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
            rowCCRecordDataObj: {},
            rowCVMListDataObj: [],
            rowEFListDataObj: {},
            rowDataprocessObj:{},
            financingCCRecordtype:false,
            financingCVMListtype:false,
            financingEFListtype:false,
            pageNum: 1,
            pageSize: 10,
            total: 20,
            rules: {
                name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                company:[{ required: true, message: '请选择公司', trigger: 'blur' }],
                code:[{ required: true, message: '请输入编码', trigger: 'blur' }],
            }
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
        finanLFCRtype(oldVal,newVal){
            this.ShowFinancVisible=this.finanLFCRtype;
            let finandata=this.rowLFCRDataObj.finanrowId;
            let formDataA ={};
            formDataA.id=finandata;
            this.$api.task.getComplexCreditContractRegisterVO(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data;
                    this.disabled = true;
                    this.editabled=false; 
                    tableDataArr.startdateStr=this.$Uformat.formatDateTYMD(tableDataArr.startdate);
                    tableDataArr.enddateStr=this.$Uformat.formatDateTYMD(tableDataArr.enddate);
                    tableDataArr.voucherdateStr=this.$Uformat.formatDateTYMD(tableDataArr.voucherdate);
                    this.formdata=tableDataArr;
                    this.rowCVMListDataObj=tableDataArr.complexCreditContractRegisterLineResVos;
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