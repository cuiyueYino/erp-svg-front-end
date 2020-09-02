<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
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
                <el-col :span="6" :offset="2">
                    <el-form-item label="项目：">
                        <el-select v-model="formdata.projectId" value-key="value" :disabled="true">
                            <el-option
                                v-for="item in projectIdData"
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
                    <el-form-item label="部门：">
                        <el-input v-model="formdata.departmentName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="任务状态：">
                        <el-input v-model="formdata.taskStatusName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="任务类型：">
                        <el-input v-model="formdata.taskType" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="任务级别：">
                        <el-input v-model="formdata.taskLevel" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1">
                    <el-form-item label="周期性任务：" ><el-checkbox v-model="formdata.periodicityTask" :disabled="true"></el-checkbox></el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item label="年计划调整：" ><el-checkbox v-model="formdata.yearPlan" :disabled="true"></el-checkbox></el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="重点级别：">
                        <el-checkbox-group v-model="focusLevelCheckList">
                            <el-checkbox v-for="item in itemOptions"  :label="item" :key="item" disabled>{{item}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>  
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="工作名称：">
                        <el-input v-model="formdata.workName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="14" :offset="2">
                    <el-form-item label="工作标准：">
                        <el-input v-model="formdata.workStandard" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>  
            <el-row>
                <el-col :span="6">
                    <el-form-item label="责任人：">
                        <el-input v-model="formdata.responsibleName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="检查人：">
                        <el-input v-model="formdata.examinerName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="交办人：">
                        <el-input v-model="formdata.assignerName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="开始时间：">
                        <el-input v-model="formdata.beginDate" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="完成时间：">
                        <el-input v-model="formdata.endDate" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="秘书：">
                        <el-input v-model="formdata.secretaryName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                     <el-form-item label="完成情况(%)：">
                        <el-input v-model="formdata.completion" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办人：">
                        <el-input v-model="formdata.gestorName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办时间：">
                        <el-input v-model="formdata.voucherDate" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                    :span-method="objectSpanMethod"
                    :data="tableFirstData"
                    height="250"
                    border
                    style="width: 100%">
                        <el-table-column
                        prop="number"
                        label="序号"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="参数名称"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="num"
                        label="数值">
                        </el-table-column>
                        <el-table-column
                        prop="unit"
                        label="单位">
                        </el-table-column>
                </el-table>
            </el-row>
            <el-row class="table-bottom">
                <el-col :span="22">
                    <el-form-item label="情况说明：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="备注：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
    
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    props: {
        rowEachPerEachTableDetailDataObj: "",
        rowEachPerEachTableDetailtype:Boolean,
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            itemOptions:['集团重点','公司重点','部门重点'],
            focusLevelCheckList:[],
            formLabelWidth: '120px',
            tableFirstData:[
                {
                    number: '计划值',
                    name: 'Q 累计预计计划完成指标',
                    num: '',
                    unit: '',
                }, 
                {
                    number: '实际填入值',
                    name: 'F 价差完成率',
                    num: '',
                    unit: '',
                }, 
                {
                    number: '实际填入值',
                    name: 'J 客户提出偏差数价差完成率',
                    num: '',
                    unit: '',
                }, 
                {
                    number: '实际填入值',
                    name: 'H 离职人数',
                    num: '',
                    unit: '',
                }, 
                {
                    number: '实际填入值',
                    name: 'N 实际综合费率/问卷得分/期权平均完成率',
                    num: '',
                    unit: '',
                }, 
                {
                    number: '实际填入值',
                    name: 'O 前月及本月末在编人数和',
                    num: '',
                    unit: '',
                }, 
                {
                    number: '实际填入值',
                    name: 'P 实际完成值、巡检、检查、走访等每日或每天进行的工作次数、累计完成金额、实支物流费、实际价差、实际到货量、实际发货量、当月受载期内抵达装货港船舶数量',
                    num: '',
                    unit: '',
                }, 
                {
                    number: '实际填入值',
                    name: 'X 最终偏差数价差完成率',
                    num: '',
                    unit: '',
                }, 
                {
                    number: '实际填入值',
                    name: 'Y 出错/失误次数/超期时数（小时或天）',
                    num: '',
                    unit: '',
                }, 
            ],
            ShowFinancVisible:false,
            peopleJobgsTableVisible: false,
            labelPosition: 'left',
            formdata:{
                company:'',
                projectId:'',
                // departmentName,
                // taskStatusName,
                // taskType,
                // taskLevel,
                // periodicityTask,
                // yearPlan,
                // workName,
                // workStandard,
                // responsibleName,
                // examinerName,
                // assignerName,
                // beginDate,
                // endDate,
                // secretaryName,
                // completion,
                // gestorName,
                // voucherDate,
            },
            companyData:[],
            projectIdData:[],
            pageNum: 1,
            pageSize: 10,
            total: 20,
            isEdit: false,
            isLook:false,
            focusLevelCheckList: ['集团重点','公司重点'],
            peopleTableForm:{
                zhibiaoku: "",
                guanjinzhibiao: "",
                zizhibiao:'',
                dingyizhibiao:'',
                kaopingfangfa:'',
                beizhu:''
            },
        }
    },
    methods: {
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex === 1) {
                    return {
                    rowspan: 8,
                    colspan: 1
                    };
                } else if (rowIndex === 0) {
                return {
                    rowspan: 1,
                    colspan: 1
                    };
                } else {
                    return {
                    rowspan: 0,
                    colspan: 0
                    };
                }
            }
        },
        //pop框里面的新增表格行
        baseInputTable(Str) {
            this.peopleJobgsTableVisible = true;
        },
        MoreSearchPS(){

        },
        //获取一人一表任务表详情
        getPersonalTableTaskDetail(data) {
        this.$api.processSet.getPersonalTableTaskDetail(data)
        .then((res) => {
                if(res.data.code == 0){
                this.formdata = res.data.data;
                let tableDataObj = {};
                // debugger;
                }
            }),error => {
            console.log(error);
            }
        },
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
        rowEachPerEachTableDetailtype(oldVal,newVal){
            this.ShowFinancVisible=this.rowEachPerEachTableDetailtype;
            let PersonalTableTaskSelected = {};
            PersonalTableTaskSelected.id = this.rowEachPerEachTableDetailDataObj;
            this.getPersonalTableTaskDetail(PersonalTableTaskSelected);
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
.table-bottom {
    margin-top:18px;
}
</style>