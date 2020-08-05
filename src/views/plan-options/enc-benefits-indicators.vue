<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
    <div>经济效益指标试开始。。。。。。。。。。</div>
        <el-form
            label-width="110px"
            v-model="formdata"
            class="dataForm"
            :rules="rules"
            size="mini"
            :model="formdata"
            :label-position="labelPosition"
        >
            <el-row>
                <el-col :span="12">
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
                    <el-form-item label="单据号">
                        <el-input v-model="formdata.code" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="年度">
                        <el-input v-model="formdata.bumen" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="月份">
                        <el-input v-model="formdata.gangwei" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="经办人">
                        <el-input v-model="formdata.name" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办部门">
                        <el-input v-model="formdata.nianfen" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经经办日期">
                        <el-input v-model="formdata.nianfen" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="formdata.remark" :rows="3" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-tabs v-model="atctiveName" @tab-click="handleClick">
                <el-tab-pane label="经济指标得分" name="first">
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
                    <el-row>
                        <el-col :span="5">
                            <el-button size="small" :disabled="isLook"  v-show="!isEdit" type="success" plain @click="baseInputTable('新增一岗一表')">新增</el-button>
                            <el-button size="small" :disabled="isLook" type="danger" plain @click="deleteRow()">删除</el-button>
                        </el-col>
                    </el-row>
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
    <div>经济效益指标计划结束。。。。。。。。</div>
    </div>
    
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    props: {
        rowEACHPerEachJobDataObj: Object,
        rowEACHPerEachJobtype:Boolean,
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
                    key: 'key1',
                    title: '序号'
                },
                {
                    key: 'key2',
                    title: '名称'
                },
                {
                    key: 'key3',
                    title: '人员'
                },
                {
                    key: 'key4',
                    title: '初始计划值'
                },
                {
                    key: 'key5',
                    title: '计划值'
                },
                {
                    key: 'key6',
                    title: '实际值'
                },
                {
                    key: 'key7',
                    title: '比例(%)'
                },
                {
                    key: 'key7',
                    title: '修改原因'
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
            rules: {
                name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                company:[{ required: true, message: '请选择公司', trigger: 'blur' }],
                code:[{ required: true, message: '请输入编码', trigger: 'blur' }],
            },
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
        rowEACHPerEachJobtype(oldVal,newVal){
            this.ShowFinancVisible=this.rowEACHPerEachJobtype;
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