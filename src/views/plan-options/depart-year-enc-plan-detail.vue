<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
    <div>部门年度经济指标计划开始。。。。。。。。。。</div>
        <el-form
            label-width="110px"
            v-model="formdata"
            class="dataForm"
            size="mini"
            :model="formdata"
            :label-position="labelPosition"
        >
            <el-row>
                <el-col :span="6">
                    <el-form-item label="公司：">
                        <el-select v-model="formdata.company" value-key="value" :disabled="true">
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
                    <el-form-item label="单据号：">
                        <el-input v-model="formdata.code" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="部门：">
                        <el-input v-model="formdata.bumen" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="年度：">
                        <el-input v-model="formdata.gangwei" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="经办人：">
                        <el-input v-model="formdata.name" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办日期：">
                        <el-input v-model="formdata.nianfen" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-tabs v-model="atctiveName" @tab-click="handleClick">
                <el-tab-pane label="经济指标" name="first">
                    <dynamic-table
                        :columns="columns"
                        :table-data="tableData"
                        :total="total"
                        size="mini"
                        :isShowPager="false"    
                        ref="multipleTable"
                        :page-num="pageNum"
                        :page-size="pageSize"
                        v-loading="false"
                        element-loading-text="加载中"
                    ></dynamic-table>
                </el-tab-pane>
                <el-tab-pane label="附件" name="second">
                    <dynamic-table
                        :columns="attachmentColumns"
                        :table-data="tableData"
                        :total="total"
                        size="mini"
                        :isShowPager="false"
                        ref="multipleTable"
                        :page-num="pageNum"
                        :page-size="pageSize"
                        v-loading="false"
                        element-loading-text="加载中"
                    ></dynamic-table>
                </el-tab-pane>
            </el-tabs> 
            
        </el-form>
    <div>部门年度经济指标计划结束。。。。。。。。</div>
    </div>
    
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    props: {
        rowDepartYearEncPlanDetailtype: Object,
        rowDepartYearEncPlanDetailtype:Boolean,
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            ShowFinancVisible:false,
            peopleJobgsTableVisible: false,
            disabled:false,
            labelPosition: 'left',
            formdata:{},
            companyData:new proData().company,
            atctiveName:'first',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            isEdit: false,
            isLook:false,
            columns:[
                {
                    type: 'selection'
                },
                {
                    key: 'key1',
                    title: '序号'
                },
                {
                    key: 'key2',
                    title: '指标项名称'
                },
                {
                    key: 'key3',
                    title: '人员'
                },
                {
                    key: 'key4',
                    title: '年度计划值'
                },
                {
                    key: 'key5',
                    title: '1月计划值'
                },
                {
                    key: 'key6',
                    title: '2月计划值'
                },
                {
                    key: 'key7',
                    title: '3月计划值'
                },
                {
                    key: 'key7',
                    title: '3月计划值'
                },
                {
                    key: 'key8',
                    title: '4月计划值'
                },
                {
                    key: 'key9',
                    title: '5月计划值'
                },
                {
                    key: 'key10',
                    title: '6月计划值'
                },
                {
                    key: 'key11',
                    title: '7月计划值'
                },
                {
                    key: 'key12',
                    title: '8月计划值'
                },
                {
                    key: 'key13',
                    title: '9月计划值'
                },
                {
                    key: 'key14',
                    title: '10月计划值'
                },
                {
                    key: 'key15',
                    title: '11月计划值'
                },
                {
                    key: 'key16',
                    title: '12月计划值'
                },
                {
                    key: 'key16',
                    title: '备注'
                },
            ],
            peopleTableForm:{
                zhibiaoku: "",
                guanjinzhibiao: "",
                zizhibiao:'',
                dingyizhibiao:'',
                kaopingfangfa:'',
                beizhu:''
            },
            attachmentColumns:[
                {
                    key: 'key1',
                    title: '序号'
                },
                {
                    key: 'key2',
                    title: '名称'
                },
                {
                    key: 'key3',
                    title: '操作'
                },
            ],
            tableData:[],
            peopleTableRules:{ 
                zhibiaoku: [
                { required: true, message: "请输入xxxxxx", trigger: "blur" }
                ],
                guanjinzhibiao: [
                { required: true, message: "请输入xxxxxxxxxx", trigger: "blur" }
                ],
                zizhibiao: [
                { required: true, message: "请输入xxxxxx", trigger: "blur" }
                ],
            },
        }
    },
    methods: {
        //pop框里面的新增表格行
        baseInputTable(Str) {
            alert("新增111111111");
            this.peopleJobgsTableVisible = true;
        },
        MoreSearchPS(){

        },
        handleClick(){

        }
    },
    watch:{
        //新建一岗一表行数据清空
        peopleJobgsTableVisible(val){
            switch (val) {
                case false:
                    this.$refs['peopleTableForm'].resetFields();
                    this.checked = false;
                break;
            
                default:
                break;
            }
            },
        rowDepartYearEncPlanDetailtype(oldVal,newVal){
            this.ShowFinancVisible=this.rowDepartYearEncPlanDetailtype;
        }
    }
}
</script>
<style lang='scss' scoped>
.itemDivStyle{
    margin-left: 20px;
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