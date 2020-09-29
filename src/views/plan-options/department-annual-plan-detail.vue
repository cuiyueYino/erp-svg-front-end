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
                    <el-form-item label="单据号：">
                        <el-input v-model="formdata.voucherId" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="版本：">
                        <el-input v-model="formdata.editId" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="年份：">
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
                    <el-form-item label="计划部门：">
                        <el-input v-model="formdata.planDepName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                <el-form-item label="编制日期：" :label-width="formLabelWidth" prop="editDate">
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
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办人：">
                        <el-input v-model="formdata.gestorName" :disabled="true"></el-input>
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
            <el-tabs v-model="atctiveName" @tab-click="handleClick">
                <el-tab-pane label="年计划编制" name="first">
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
                            label="部门"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="taskLevel"
                            label="任务级别"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="periodicityTask"
                            label="周期性任务"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="periodicityMonth"
                            label="跨月任务"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="workName"
                            label="工作名称"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="workStandard"
                            label="工作标准"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="planFinish"
                            label="Q累计预计计划完成指标"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="unit"
                            label="计量单位"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="emphasisLevel"
                            label="重点级别"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="beginDate"
                            label="开始时间"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="endDate"
                            label="结束时间"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="glResponsibleName"
                            label="责任人"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="responsibleName"
                            label="协办人"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="secretaryName"
                            label="秘书"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="examinerName"
                            label="检查人"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="assignerName"
                            label="交办人"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="completion"
                            label="完成情况"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="noFinishReason"
                            label="情况说明"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="remark"
                            label="备注"
                            >
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="附件" name="second">
                    <enclosureFile ref="child" :enclosureConfig="enclosureConfig"/>
                </el-tab-pane>
            </el-tabs> 
        </el-form>
        </el-dialog>
    </div>
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
import enclosureFile from '../inside-mail/enclosure-file.vue';
export default {
    props: {
        rowDepartAnnPlanDetDataObj: "",
        rowDepartAnnPlanDettype:Boolean,
        disFlag:Boolean
    },
    components: {
        DynamicTable,
        enclosureFile
    },
    data(){
        return{
             // 附件
            enclosureConfig:{
                voucherId: '',
                isShowButton: false,
                menuCode: 'insideMail',
                isDownload:true,
                isSearch:false,
                haveAttachment:false,
                authStatus:false
            },
            formLabelWidth: "120px",
            ShowFinancVisible:false,
            disabled:false,
            labelPosition: 'left',
            formdata:{
                companyName:'',
                voucherId:'',
                editId:'',
                year:'',
                planDepName:'',
                editDate:'',
                gestorName:'',
                remark:'',
            },
            companyData:[],
            yearsData:[],
            atctiveName:'first',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            attachData:[],
            tableData:[],
        }
    },
    methods: {
        handleClick() {
            
        },
        getDepYearPlanDetail(data) {
        this.$api.processSet.getDepYearPlanDetail(data)
        .then((res) => {
            console.log(res);
                if(res.data != ""){
                this.formdata = res.data;
                var tableObj = res.data.line;
                for(var i=0;i<tableObj.length;i++){
                   var periodicityTaskData = tableObj[i].periodicityTask;
                   var periodicityMonthData = tableObj[i].periodicityMonth;
                    tableObj[i]['index'] = i + 1;
                    if(periodicityTaskData) {
                        tableObj[i].periodicityTask = "是"
                    } else {
                        tableObj[i].periodicityTask = "否"
                    }
                    if(periodicityMonthData) {
                        tableObj[i].periodicityMonth = "是"
                    } else {
                        tableObj[i].periodicityMonth = "否"
                    }
                    this.enclosureConfig.voucherId = JSON.parse(data).id;
                    // tableObj[i]['num'] = i + 1;
                //     switch(taskTypeParams) {
                //         case 1: 
                //             tableObj[i].taskType = '主任务';
                //             break;
                //         case 2:
                //             tableObj[i].taskType = '临时任务';
                //             break;
                //         default:
                //             break; 
                // }
                }
                this.tableData = tableObj;
                } else {
                    this.$message.error("服务器异常!");
                }
            }),error => {
            console.log(error);
            }
        },
        
    },
    watch:{
        rowDepartAnnPlanDettype(oldVal,newVal){
            this.ShowFinancVisible=this.rowDepartAnnPlanDettype;
            let EACHPerEachJobDataSelected = {};
            EACHPerEachJobDataSelected.id = this.rowDepartAnnPlanDetDataObj;
            this.getDepYearPlanDetail(JSON.stringify(EACHPerEachJobDataSelected));
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