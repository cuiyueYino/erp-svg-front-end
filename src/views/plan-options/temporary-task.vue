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
                    <el-form-item label="公司：" prop="company">
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
                    <el-form-item label="部门：" >
                        <el-input v-model="formdata.departmentName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="责任部门：">
                        <el-input v-model="formdata.cooperateTaskDepartmentName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="检查人：">
                        <el-input v-model="formdata.examinerName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="交办人：">
                        <el-input v-model="formdata.assignedPersonName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="任务状态：" >
                        <el-input v-model="formdata.taskState" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <el-form-item label="责任人：">
                        <el-input v-model="formdata.personResponsibleName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="调整：">
                        <el-checkbox v-model="formdata.timechange" :disabled="true">时间调整</el-checkbox>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="协办人：">
                        <el-input v-model="formdata.cooperateWithStaffName" :disabled="true"></el-input>
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
                    <el-form-item label="开始时间：">
                        <el-date-picker
                            v-model="formdata.startTime"
                            type="date"
                            :disabled="true"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="结束时间：">
                        <el-date-picker
                            v-model="formdata.fanishTime"
                            type="date"
                            :disabled="true"
                            placeholder="选择日期">
                        </el-date-picker>
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
                    <el-form-item label="任务等级：">
                        <el-input v-model="formdata.taskLevel" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="任务名称：">
                        <el-input v-model="formdata.workeName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办人：" >
                        <el-input v-model="formdata.gestorName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="经办时间：">
                        <el-date-picker
                            v-model="formdata.voucherDate"
                            type="date"
                            :disabled="true"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="14" :offset="2">
                    <el-form-item label="重点级别：" >
                        <el-checkbox-group v-model="focusLevelCheckList">
                            <el-checkbox v-for="item in itemOptions"  :label="item" :key="item" disabled>{{item}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="工作标准：">
                        <el-input type="textarea" v-model="formdata.workStandard" :rows="5" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="描述：">
                        <el-input type="textarea" v-model="formdata.remark" :rows="5" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22"> 
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
        rowTEMTaskDataObj: Object,
        rowTEMTasktype:Boolean,
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            itemOptions:['集团重点','公司重点','部门重点'],
            focusLevelCheckList:[],
            ShowFinancVisible:false,
            labelPosition: 'left',
            formdata:{
                company:'',
                voucherId:'',
                departmentName:'',
                cooperateTaskDepartmentName:'',
                examinerName:'',
                assignedPersonName:'',
                taskState:'',
                personResponsibleName:'',
                timechange:false,
                cooperateWithStaffName:'',
                secretaryName:'',
                startTime:'',
                fanishTime:'',
                taskType:'',
                taskLevel:'',
                workeName:'',
                gestorName:'',
                voucherDate:'',
                workStandard:'',
                remark:'',
            },
            companyData:[],
            atctiveName:'first',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            tableData:[],
            columns:[
                {
                    key: 'key1',
                    title: '序号'
                },
                {
                    key: 'key2',
                    title: '参数名称'
                },
                {
                    key: 'optionValue',
                    title: '期权数值'
                },
                {
                    key: 'unit',
                    title: '计量单位'
                },
            ],
        }
    },
    created() {
       
    },
    methods: {
    //获取临时任务派发详情
    getTemporaryMission(data) {
      this.$api.processSet.getTemporaryMissionDetail({
        id: data.id,
        userId:data.userId,
      })
      .then((res) => {
            if(res.data.code == 0){
              this.formdata = res.data.data;
              let tableDataObj = {};
              tableDataObj["key1"] = '计划值';
              tableDataObj["key2"] = 'Q 累计预计计划完成指标';
              tableDataObj["optionValue"] = res.data.data.optionValue;
              tableDataObj["unit"] = res.data.data.unit;
              this.tableData.push(tableDataObj);
              let taskStateParams = res.data.data.taskState;
              let taskTypeParams = res.data.data.taskType;
              let taskLeveParams = res.data.data.taskLevel;
            switch(taskStateParams) {
                case "1": 
                    this.formdata.taskState = '可执行';
                    break;
                case "2":
                    this.formdata.taskState = '已完成';
                    break;
                case "3":
                    this.formdata.taskState = '未完成';
                    break;
                case "4":
                    this.formdata.taskState = '延期';
                    break;
                case '5':
                    this.formdata.taskState ='作废';
                    break;
                case '0':
                    this.formdata.taskState ='未发生';
                    break;
                case '10':
                    this.formdata.taskState ='已报待批';
                    break;
                default:
                    break; 
            }
            // debugger;
            console.log(taskTypeParams);
            switch(taskTypeParams) {
                case 1: 
                    this.formdata.taskType = '主任务';
                    break;
                case 2:
                    this.formdata.taskType = '临时任务';
                    break;
                case 3:
                    this.formdata.taskType = '配合任务';
                    break;
                default:
                    break; 
            }
            switch(taskLeveParams) {
                case 1: 
                    this.formdata.taskLevel = '一';
                    break;
                case 2:
                    this.formdata.taskLevel = '二';
                    break;
                case 3:
                    this.formdata.taskLevel = '三';
                    break;
                case 4:
                    this.formdata.taskLevel = '四';
                    break;
                case 5:
                    this.formdata.taskLevel ='五';
                    break;
                case 6:
                    this.formdata.taskLevel ='六';
                    break;
                case 7:
                    this.formdata.taskLevel ='七';
                    break;
                case 8:
                    this.formdata.taskLevel ='八';
                    break;
                case 9:
                    this.formdata.taskLevel ='九';
                    break;
                case 10:
                    this.formdata.taskLevel ='十';
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


                // this.getTreeData.forEach((item,index) => {
                //    this.treeData.push(
                //       {
                //         label:item.fname,
                //         foid:item.foid,
                //       }
                //    )
                // })
            }
        }),error => {
          console.log(error);
        }
    },
    },
    watch:{
        rowTEMTasktype(oldVal){
            this.ShowFinancVisible=this.rowTEMTasktype;
            let temporartSelected = {};     
            temporartSelected.id = this.rowTEMTaskDataObj;
            temporartSelected.userId = localStorage.getItem("ms_userId");
            this.getTemporaryMission(temporartSelected);
            },
    }
}
</script>
<style lang='scss' scoped>
.itemDivStyle{
    margin-left: 20px;
}
</style>
