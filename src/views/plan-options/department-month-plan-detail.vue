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
                        <el-select v-model="formdata.companyName" value-key="value" :disabled="true">
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
                        <el-input v-model="formdata.planId" :disabled="true"></el-input>
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
                <el-col :span="6" :offset="2">
                    <el-form-item label="计划部门：">
                        <el-input v-model="formdata.planDepName" :disabled="true"></el-input>
                    </el-form-item>
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
                        <el-input v-model="formdata.gestorName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办日期：" :label-width="formLabelWidth">
                        <el-date-picker
                            clearable
                            v-model="formdata.voucherDate"
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
                    <el-table :data="tableData" border>
                        <el-table-column
                            prop="index"
                            label="序号"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="companyName"
                            label="公司"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="departmentName"
                            label="部门">
                        </el-table-column>
                        <el-table-column
                            prop="taskType"
                            label="任务类型">
                        </el-table-column>
                        <el-table-column
                            prop="taskLevel"
                            label="任务级别">
                        </el-table-column>
                        <el-table-column
                            prop="periodicityTask"
                            label="周期性任务">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.periodicityTask" disabled></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="workName"
                            label="工作名称">
                        </el-table-column>
                        <el-table-column
                            prop="workStandard"
                            label="工作标准">
                        </el-table-column>
                        <el-table-column
                            prop="planFinish"
                            label="Q累计预计计划完成指标">
                        </el-table-column>
                        <el-table-column
                            prop="unit"
                            label="计量单位">
                        </el-table-column>
                        <el-table-column
                            prop="emphasisLevel"
                            label="重点级别">
                        </el-table-column>
                        <el-table-column
                            prop="beginDate"
                            label="开始时间">
                        </el-table-column>
                        <el-table-column
                            prop="endDate"
                            label="结束时间">
                        </el-table-column>
                        <el-table-column
                            prop="responsibleName"
                            label="责任人">
                        </el-table-column>
                        <el-table-column
                            prop="glResponsibleName"
                            label="协办人">
                        </el-table-column>
                        <el-table-column
                            prop="secretaryName"
                            label="秘书">
                        </el-table-column>
                        <el-table-column
                            prop="examinerName"
                            label="检查人">
                        </el-table-column>
                        <el-table-column
                            prop="assignerName"
                            label="交办人">
                        </el-table-column>
                        <el-table-column
                            prop="completion"
                            label="完成情况">
                        </el-table-column>
                        <el-table-column
                            prop="noFinishReason"
                            label="情况说明">
                        </el-table-column>
                        <el-table-column
                            prop="remark"
                            label="备注">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="附件" name="second">
                    <el-table :data="tableAttachData" border>
                        <el-table-column
                            prop="num"
                            label="序号"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="名称"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="option"
                            label="操作"
                            >
                        </el-table-column>
                    </el-table>
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
        rowDepartMonPlanDetDataObj: String,
        rowDepartMonPlanDettype:Boolean,
        disFlag:Boolean
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            formLabelWidth: "120px",
            ShowFinancVisible:false,
            labelPosition: 'left',
            checked:false,
            formdata:{
                companyName:'',
                planId:'',
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
            tableData:[],
            tableAttachData:[],
        }
    },
    methods: {
        handleClick() {},
        //部门月度计划
        getmonthlyPlan(data) {
        this.$api.processSet.getMonthlyPlanDetail({
        id: data.id,
        }) 
        .then((res) => {
                if(res.data.code == 0){
                this.formdata = res.data.data;
                this.formdata.companyName = res.data.data.departmentMonthPlanLine[0].companyName;
                var tableObj = res.data.data.departmentMonthPlanLine;
                // this.tableAttachData.push(tableObj);
                let taskTypeParams = "";
                for(var i=0;i<tableObj.length;i++){
                    taskTypeParams = tableObj[i].taskType;
                    tableObj[i]['index'] = i + 1;
                    // tableObj[i]['num'] = i + 1;
                    switch(taskTypeParams) {
                        case 1: 
                            tableObj[i].taskType = '主任务';
                            break;
                        case 2:
                            tableObj[i].taskType = '临时任务';
                            break;
                        default:
                            break; 
                }
                }
                this.tableData = tableObj;
                // this.tableAttachData = tableObj;
                }
            }),error => {
            console.log(error);
            }
        },
    },
    watch:{
        rowDepartMonPlanDettype(oldVal,newVal){
            // voucherId、menuCode
            this.ShowFinancVisible=this.rowDepartMonPlanDettype;
            let EACHPerEachJobDataSelected = {};
            EACHPerEachJobDataSelected.id = this.rowDepartMonPlanDetDataObj;
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