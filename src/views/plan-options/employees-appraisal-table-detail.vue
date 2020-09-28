<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
        <el-form
            :label-width="formLabelWidth"
            v-model="formdata"
            class="dataForm"
            size="mini"
            :model="formdata"
            :label-position="labelPosition"
             :disabled="!disFlag"
        >
            <el-row>
                <el-col :span="6">
                    <el-form-item label="公司：">
                        <el-select v-model="formdata.company" value-key="value" :disabled="true">
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
                    <el-form-item label="员工考评编号：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="部门：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="2">
                    <el-form-item label="岗位：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" :disabled="true"></el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="姓名：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" :disabled="true"></el-button>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="年份：">
                        <el-select v-model="formdata.text" value-key="value" :disabled="true">
                            <el-option  
                                v-for="item in yearData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="月份：">
                        <el-select v-model="formdata.text" value-key="value" :disabled="true">
                            <el-option  
                                v-for="item in monthData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="版本：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" :disabled="true"></el-button>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="大学生：" ><el-checkbox v-model="formdata.checked" :disabled="true"></el-checkbox></el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="试用期：" ><el-checkbox v-model="formdata.checked" :disabled="true"></el-checkbox></el-form-item>
                </el-col>
            </el-row>
            <el-row>
                 <el-col :span="6">
                    <el-form-item label="总分：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
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
                </el-tab-pane>
                <el-tab-pane label="期权详情" name="second">
                    <dynamic-table
                        :columns="detailsColumns"
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
                        :columns="encColumns"
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
                <el-tab-pane label="公司指标" name="fouth">
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
        </el-dialog>
    </div>
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    props: {
        rowEmpApprTabDetailDataObj: String,
        rowEmpApprTabDetailtype:Boolean,
        disFlag:Boolean
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            yearData:[],
            monthData:[],
            formLabelWidth: "120px",
            ShowFinancVisible:false,
            labelPosition: 'left',
            formdata:{},
            companyData:[],
            yearsData:new proData().years,
            atctiveName:'first',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            columns:[
                {
                    type: "selection"
                },
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
            ],
            detailsColumns:[
                {
                    type: "selection"
                },
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
                    title: '否决项扣除'
                },
                {
                    key: 'key9',
                    title: '最终得分'
                },
                {
                    key: 'key10',
                    title: '期权扣除比例及原因'
                },
            ],
            encColumns:[
                {
                    type: "selection"
                },
                {
                    key: 'key1',
                    title: '指标分类名称'
                },
                {
                    key: 'key2',
                    title: '指标类型'
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
                    type: "selection"
                },
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
        }
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
        handleClick() {

        }
    },
    watch:{
        rowEmpApprTabDetailtype(oldVal,newVal){
            this.selectCom();
            this.ShowFinancVisible=this.rowEmpApprTabDetailtype;
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
</style>