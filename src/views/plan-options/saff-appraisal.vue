<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
    <div>员工考评测试开始。。。。。。。。。。</div>
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
                    <el-form-item label="员工考评编号">
                        <el-input v-model="formdata.code" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="部门">
                        <el-input v-model="formdata.bumen" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="岗位">
                        <el-input v-model="formdata.gangwei" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="姓名">
                        <el-input v-model="formdata.name" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPS(formdata)"></el-button>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="年份">
                        <el-input v-model="formdata.nianfen" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="月份">
                        <el-input v-model="formdata.month" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="大学生" ><el-checkbox v-model="formdata.checked"></el-checkbox></el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="试用期" ><el-checkbox v-model="formdata.checked"></el-checkbox></el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="总分">
                        <el-input v-model="formdata.zongfen" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-tabs v-model="atctiveName" @tab-click="handleClick">
                <el-tab-pane label="指标关联任务" name="first">
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
                <el-tab-pane label="期权详情" name="second">
                    <dynamic-table
                        :columns="limitPowerDelColumns"
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
                <el-tab-pane label="经济指标" name="third">
                    <dynamic-table
                        :columns="ecoColumns"
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
                <el-tab-pane label="公司指标" name="fourth">
                    <dynamic-table
                        :columns="comColumns"
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
    <div>员工考评结束。。。。。。。。</div>
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
                    title: '计算公式'
                },
                {
                    key: 'key2',
                    title: '考评项'
                },
                {
                    key: 'key3',
                    title: '指标定义'
                },
                {
                    key: 'key4',
                    title: '关键指标项'
                },
                {
                    key: 'key5',
                    title: '子指标'
                },
                {
                    key: 'key6',
                    title: '考评方法'
                },
                {
                    key: 'key7',
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
            limitPowerDelColumns:[
                {
                    key: 'key1',
                    title: '考评项(一级)'
                },
                {
                    key: 'key2',
                    title: '关键指标(二级)'
                },
                {
                    key: 'key3',
                    title: '子指标(三级)'
                },
                {
                    key: 'key4',
                    title: '指标权重'
                },
                {
                    key: 'key5',
                    title: '指标得分'
                },
                {
                    key: 'key6',
                    title: '扣减项名称'
                },
                {
                    key: 'key7',
                    title: '扣减项扣除'
                },
                {
                    key: 'key8',
                    title: '否决项名称'
                },
                {
                    key: 'key9',
                    title: '否决项扣除'
                },
                {
                    key: 'key10',
                    title: '最终得分'
                },
                 {
                    key: 'key11',
                    title: '期权扣除比例及原因'
                },
            ],
            ecoColumns:[
                {
                    key: 'key1',
                    title: '指标分类名称'
                },
                {
                    key: 'key2',
                    title: '称指标类型'
                },
                {
                    key: 'key3',
                    title: '权重'
                },
                {
                    key: 'key4',
                    title: '计划值'
                },
                {
                    key: 'key5',
                    title: '实际值'
                },
                {
                    key: 'key6',
                    title: '比例'
                },
                {
                    key: 'key7',
                    title: '否决项名称'
                },
                {
                    key: 'key8',
                    title: '否决项扣除'
                },
                {
                    key: 'key9',
                    title: '扣减项名称'
                },
                {
                    key: 'key10',
                    title: '扣减项扣除'
                },
                {
                    key: 'key11',
                    title: '得分'
                },
                {
                    key: 'key12',
                    title: '备注'
                },
            ],
            comColumns:[
                {
                    key: 'key1',
                    title: '公司名称'
                },
                {
                    key: 'key2',
                    title: '部门名称'
                },
                {
                    key: 'key3',
                    title: '权重'
                },
                {
                    key: 'key4',
                    title: '比例'
                },
                {
                    key: 'key5',
                    title: '否决项名称'
                },
                {
                    key: 'key6',
                    title: '否决项扣除'
                },
                {
                    key: 'key7',
                    title: '扣减项名称'
                },
                {
                    key: 'key8',
                    title: '扣减项扣除'
                },
                {
                    key: 'key9',
                    title: '得分'
                },
                {
                    key: 'key10',
                    title: '备注'
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