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
                        <el-select v-model="formdata.companyName" value-key="value" :disabled="true" placeholder="">
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
                        <el-select v-model="formdata.projectName" value-key="value" :disabled="true" placeholder="">
                            <el-option
                                v-for="item in projectData"
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
                        <el-input v-model="formdata.taskStatus" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="工作名称：">
                        <el-input v-model="formdata.workName" :disabled="true"></el-input>
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
                    <el-form-item label="周期性任务："><el-checkbox v-model="formdata.periodicityTask" :disabled="true"></el-checkbox></el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item label="年计划调整："><el-checkbox v-model="formdata.yearPlan" :disabled="true"></el-checkbox></el-form-item>
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
                    <el-form-item label="任务类型：">
                        <el-input v-model="formdata.taskType" :disabled="true"></el-input>
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
                        <el-input v-model="formdata.reasonInfo" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="备注：">
                        <el-input v-model="formdata.remark" :disabled="true"></el-input>
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
        rowEachPerEachTableModifyDataObj: String,
        rowEachPerEachTableModifyype:Boolean,
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            itemOptions:['集团重点','公司重点','部门重点'],
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
                companyName:'',
                projectName:'',
                departmentName:'',
                taskStatus:'',
                workName:'',
                taskLevel:'',
                periodicityTask:'',
                yearPlan:'',
                taskType:'',
                workStandard:'',
                responsibleName:'',
                examinerName:'',
                assignerName:'',
                beginDate:'',
                endDate:'',
                secretaryName:'',
                completion:'',
                gestorName:'',
                voucherDate:'',
                reasonInfo:'',
                remark:''
            },
            companyData:[],
            pageNum: 1,
            pageSize: 10,
            total: 20,
            isEdit: false,
            isLook:false,
            focusLevelCheckList: [],
        }
    },
    methods: {
        //表格排序
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
        //获取任务调整详情
        getModifyDetail(data) {
        this.$api.processSet.getPersonalTableModifyDetail({
            id: data.id,
        })
        .then((res) => {
                if(res.data.code == 0){
                this.formdata = res.data.data;
                let taskStateParams = res.data.data.taskStatus;
                switch(taskStateParams) {
                    case 1: 
                        this.formdata.taskStatus = '可执行';
                        break;
                    case 2:
                        this.formdata.taskStatus = '已完成';
                        break;
                    case 3:
                        this.formdata.taskStatus = '未完成';
                        break;
                    case 4:
                        this.formdata.taskStatus = '延期';
                        break;
                    case 5:
                        this.formdata.taskStatus ='作废';
                        break;
                    case 0:
                        this.formdata.taskStatus ='未发生';
                        break;
                    case 10:
                        this.formdata.taskStatus ='已报待批';
                        break;
                    default:
                        break; 
                }
                if(res.data.data.groupPoint) {
                    this.focusLevelCheckList.push('集团重点');
                } else if(res.data.data.companyPoint) {
                    this.focusLevelCheckList.push('公司重点');
                }  else if(res.data.data.departmentPoint) {
                    this.focusLevelCheckList.push('部门重点')
                } else {
                    this.focusLevelCheckList.push('');
                }
                //页面返回的值得赋值
                let tableDataObj = {};
                this.tableFirstData[0].num = res.data.data.planFinish;
                this.tableFirstData[0].unit = res.data.data.unit;
                this.tableFirstData[1].num = res.data.data.fvalue;
                this.tableFirstData[1].unit = res.data.data.funit;
                this.tableFirstData[2].num = res.data.data.jvalue;
                this.tableFirstData[2].unit = res.data.data.junit;
                this.tableFirstData[3].num = res.data.data.hvalue;
                this.tableFirstData[3].unit = res.data.data.hunit;
                this.tableFirstData[4].num = res.data.data.nvalue;
                this.tableFirstData[4].unit = res.data.data.nvalue;
                this.tableFirstData[5].num = res.data.data.ovalue;
                this.tableFirstData[5].unit = res.data.data.ounit;
                this.tableFirstData[6].num = res.data.data.pvalue;
                this.tableFirstData[6].unit = res.data.data.punit;
                this.tableFirstData[7].num = res.data.data.xvalue;
                this.tableFirstData[7].unit = res.data.data.xunit;
                this.tableFirstData[8].num = res.data.data.yvalue;
                this.tableFirstData[8].unit = res.data.data.yunit;
                }
            }),error => {
            console.log(error);
            }
        },
    },
    watch:{
        rowEachPerEachTableModifyype(oldVal,newVal){
            this.ShowFinancVisible=this.rowEachPerEachTableModifyype;
             let modifySelected = {};
            modifySelected.id = this.rowEachPerEachTableModifyDataObj;
            this.getModifyDetail(modifySelected);
        }
    }
}
</script>
<style lang='scss' scoped>
.itemDivStyle{
    margin-left: 20px;
}
</style>
