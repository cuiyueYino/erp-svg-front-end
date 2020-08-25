<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
        <el-form
            :label-width="formLabelWidth"
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
                    <el-form-item label="月计划编号：">
                        <el-input v-model="formdata.planIdParam" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="版本：">
                        <el-input v-model="formdata.editId" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="年度：" prop="year">
                        <el-select v-model="formdata.year" value-key="value" :disabled="true">
                            <el-option  
                                v-for="item in yearsData"
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
                    <el-form-item label="月度：" prop="month">
                        <el-select v-model="formdata.month" value-key="value" :disabled="true">
                            <el-option  
                                v-for="item in monthData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="2">
                    <el-form-item label="计划部门：">
                        <el-input v-model="formdata.planDepName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" :disabled="true"></el-button>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="编制日期：" :label-width="formLabelWidth">
                        <el-date-picker
                            clearable
                            v-model="formdata.editDate"
                            format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm"
                            type="datetime"
                            size="small"
                            placeholder="选择日期"
                            style="width: 100%;"
                            :disabled="true"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="经办人：">
                        <el-input v-model="formdata.jingbanren" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办日期：" :label-width="formLabelWidth">
                        <el-date-picker
                            clearable
                            v-model="formdata.handleDate"
                            format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm"
                            type="datetime"
                            size="small"
                            placeholder="选择日期"
                            style="width: 100%;"
                            :disabled="true"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-tabs v-model="atctiveName" @tab-click="handleClick">
                <el-tab-pane label="月计划编制" name="first">
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
                <el-tab-pane label="附件" name="fourth">
                    <dynamic-table
                        :columns="attachColumns"
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
        rowDepartMonPlanDetDataObj: Object,
        rowDepartMonPlanDettype:Boolean,
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            formLabelWidth: "120px",
            ShowFinancVisible:false,
            labelPosition: 'left',
            formdata:{
                company:'',
                planIdParam:'',
                editId:'',
                year:'',
                month:'',
                planDepName:'',
                editDate:'',
                gestorName:'',
                handleDate:'',
            },
            companyData:[],
            yearsData:[],
            monthData:[
                1,2,3,4,5,6,7,8,9,10,11,12
            ],
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
                    title: '公司'
                },
                {
                    key: 'key3',
                    title: '部门'
                },
                {
                    key: 'key4',
                    title: '任务类型'
                },
                {
                    key: 'key5',
                    title: '任务级别'
                },
                {
                    key: 'key6',
                    title: '周期性任务'
                },
                {
                    key: 'key7',
                    title: '工作名称'
                },
                {
                    key: 'key8',
                    title: '工作标准'
                },
                {
                    key: 'key9',
                    title: 'Q累计预计计划完成指标'
                },
                {
                    key: 'key10',
                    title: '计量单位'
                },
                {
                    key: 'key11',
                    title: '重点级别'
                },
                {
                    key: 'key12',
                    title: '开始时间'
                },
                {
                    key: 'key13',
                    title: '结束时间'
                },
                {
                    key: 'key14',
                    title: '责任人'
                },
                {
                    key: 'key15',
                    title: '协办人'
                },
                {
                    key: 'key16',
                    title: '秘书'
                },
                {
                    key: 'key17',
                    title: '检查人'
                },
                {
                    key: 'key18',
                    title: '交办人'
                },
                {
                    key: 'key19',
                    title: '完成情况'
                },
                {
                    key: 'key20',
                    title: '情况说明'
                },
                {
                    key: 'key21',
                    title: '备注'
                },
            ],
            attachColumns:[
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
        }
    },
    methods: {
        handleClick() {},
        //部门月度计划
        getmonthlyPlan(data) {
        debugger;
        this.$api.processSet.getMonthlyPlanDetail({
        id: data.id,
        }) 
        .then((res) => {
                if(res.data.code == 0){
                this.formdata = res.data.data;
                // let tableDataObj = {};
                // tableDataObj["key1"] = '计划值';
                // tableDataObj["key2"] = 'Q 累计预计计划完成指标';
                // tableDataObj["optionValue"] = res.data.data.optionValue;
                // tableDataObj["unit"] = res.data.data.unit;
                // this.tableData.push(tableDataObj);
                // let taskTypeParams = res.data.data.taskType;
                // let taskLeveParams = res.data.data.taskLevel;
                // if(res.data.data.groupPoint) {
                //     this.focusLevelCheckList.push('集团重点');
                // } else if(res.data.data.companyPoint) {
                //     this.focusLevelCheckList.push('公司重点');
                // }  else if(res.data.data.departmentPoint) {
                //     this.focusLevelCheckList.push('部门重点')
                // } else {
                //     this.focusLevelCheckList.push('');
                // }

                }
            }),error => {
            console.log(error);
            }
        },
    },
    watch:{
        rowDepartMonPlanDettype(oldVal,newVal){
            debugger;
            // voucherId、menuCode
            this.ShowFinancVisible=this.rowDepartMonPlanDettype;
            let EACHPerEachJobDataSelected = {};
            EACHPerEachJobDataSelected.id = this.rowDepartMonPlanDetDataObj.fsrcoId;
            this.getmonthlyPlan(EACHPerEachJobDataSelected);
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