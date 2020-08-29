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
                <el-col :span="5">
                    <el-form-item label="计划部门：">
                        <el-input v-model="formdata.planDepName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" :disabled="true"></el-button>
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
                        <el-input v-model="formdata.gestor" :disabled="true"></el-input>
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
        rowDepartAnnPlanDetDataObj: Object,
        rowDepartAnnPlanDettype:Boolean,
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            formLabelWidth: "120px",
            ShowFinancVisible:false,
            disabled:false,
            labelPosition: 'left',
            formdata:{
                company:'',
                voucherId:'',
                editId:'',
                year:'',
                planDepName:'',
                editDate:'',
                gestor:'',
                remark:'',
            },
            companyData:[],
            yearsData:[],
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
                    title: '任务级别'
                },
                {
                    key: 'key5',
                    title: '周期性任务'
                },
                {
                    key: 'key6',
                    title: '跨月任务'
                },
                {
                    key: 'key7',
                    title: '工作名称'
                },
                {
                    key: 'key8',
                    title: '工作标准'
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
        handleClick() {
            
        },
    //获取临时任务派发详情
    getDepYearPlanDetail(data) {
        debugger;
      this.$api.processSet.getDepYearPlanDetail(data)
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
        rowDepartAnnPlanDettype(oldVal,newVal){
            this.ShowFinancVisible=this.rowDepartAnnPlanDettype;
            let EACHPerEachJobDataSelected = {};
            EACHPerEachJobDataSelected.id = this.rowDepartAnnPlanDetDataObj;
            this.getDepYearPlanDetail(EACHPerEachJobDataSelected);
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