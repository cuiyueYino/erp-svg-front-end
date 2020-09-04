<template>
    <div v-if="ShowFinancVisible" width="70%">
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
                    <el-col :span="12">
                        <el-form-item label="公司" prop="company">
                            <el-select v-model="formdata.company" value-key="value" v-bind:disabled="disabled">
                                <el-option
                                    v-for="item in companyData"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="调整单号" prop="code">
                            <el-input v-model="formdata.voucherid" v-bind:disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="综合授信合同" prop="name">
                            <el-input v-model="formdata.creditcontract" v-bind:disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="调整日期">
                            <el-input v-model="formdata.adjustdateStr" v-bind:disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="授信额度" prop="code">
                            <el-input v-model="formdata.awardamount" v-bind:disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="授信余额" prop="name">
                            <el-input v-model="formdata.awardover" v-bind:disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="授信调整额度">
                            <el-input v-model="formdata.awardadjamount" v-bind:disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="授信占用" prop="code">
                            <el-input v-model="formdata.creditoccupation" v-bind:disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="授信占用调整" prop="name">
                            <el-input v-model="formdata.creditoccadjust" disabled></el-input>
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
                        <el-form-item label="经办部门">
                            <el-input v-model="formdata.gestordeptname" v-bind:disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" :offset="2">
                        <el-form-item label="经办时间" prop="name">
                            <el-input v-model="formdata.voucherdateStr" disabled></el-input>
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
                    <el-tab-pane label="授信品种管理" name="first">
                        <creCVAlist :rowCVAListDataObj="rowCVAListDataObj" :financingCVAListtype="financingCVAListtype" />
                    </el-tab-pane>
                    <el-tab-pane label="附件" name="second">
                        <creditEnclFilelist :rowEFListDataObj="rowEFListDataObj" :financingEFListtype="financingEFListtype" />
                    </el-tab-pane>
                </el-tabs>
                <processnodelist :rowDataprocessObj="rowDataprocessObj"  @changeShow="showprocessData"/> 
            </el-card>
        </el-form>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
import creCVAlist from '../../views/finance/credit-varieties-adjust-list.vue';
import creditEnclFilelist from '../../views/finance/enclosure-file-list.vue';
import processnodelist from '../../views/finance/process-node-list.vue';
export default {
    props: {
        rowLFCADataObj: Object,
        financingLFCAtype: Boolean
    },
    name: 'basetable',
    components: {
        DynamicTable,
        creCVAlist,
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
            companyData:[],
            objectoptions:new proData().project,
            formdata: {},
            rowCCRecordDataObj: {},
            rowCVAListDataObj: [],
            rowEFListDataObj: {},
            rowDataprocessObj:{},
            financingCCRecordtype:false,
            financingCVAListtype:false,
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
        selectCom(){
            this.$api.jobUserManagement.getCompanyData().then((res) => {
                if (res.status == "200") {
                    this.companyData= res.data.data.rows;
                }
            }),
            (error) => {
                console.log(error);
            };
        },
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
                    //授信品种管理
                    this.financingCVAListtype=true;
                    this.financingEFListtype=false;
                }else{
                    //附件列表
                    this.financingEFListtype=true;
                    this.financingCVAListtype=false;
                }
            }
        },
    },
    mounted() {
    },
    watch:{
        financingLFCAtype(oldVal,newVal){
            if(this.financingLFCAtype){
                this.ShowFinancVisible=this.financingLFCAtype;
                this.selectCom();
                let finandata=this.rowLFCADataObj.finanrowId;
                let formDataA ={};
                formDataA.id=finandata;
                this.$api.task.getComplexCreditContractAdjustVO(formDataA).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data;
                        let tableDataArr=returndata.data;
                        this.disabled = true;
                        this.editabled=false; 
                        tableDataArr.createtimeStr=this.$Uformat.formatDateTYMD(tableDataArr.createtime);
                        tableDataArr.lastupdtimeStr=this.$Uformat.formatDateTYMD(tableDataArr.lastupdtime);
                        tableDataArr.adjustdateStr=this.$Uformat.formatDateTYMD(tableDataArr.adjustdate);
                        tableDataArr.voucherdateStr=this.$Uformat.formatDateTYMD(tableDataArr.voucherdate);
                        this.formdata=tableDataArr;
                        this.rowCVAListDataObj=tableDataArr.awardCreditBreedLineResVos;
                        this.NewEditVisible= true;
                        this.showCheckBox= false;
                        this.checked=false;
                        this.financingCVAListtype=true;
                    } else {
                        this.$message.success('数据库没有该条数据!');
                    }
                });
            }
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