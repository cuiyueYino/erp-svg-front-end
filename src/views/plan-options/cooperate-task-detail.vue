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
                    <el-form-item label="公司：" prop="company">
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
                    <el-form-item label="部门：">
                        <el-input v-model="formdata.departmentName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="配合任务部门：">
                        <el-input v-model="formdata.cooperateTaskDepartmentName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="检查人：">
                        <el-input v-model="formdata.examinerName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="任务类型：">
                        <el-input v-model="formdata.taskType" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="任务等级：">
                        <el-input v-model="formdata.taskLevel" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="状态：">
                        <el-input v-model="formdata.taskState" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="交办人：">
                        <el-input v-model="formdata.assignedPersonName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="开始时间：">
                        <el-input v-model="formdata.startTime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="结束时间：">
                        <el-input v-model="formdata.fanishTime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="任务名称：">
                        <el-input v-model="formdata.workeName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办人：" >
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
                <el-col :span="6">
                    <el-form-item label="秘书：">
                        <el-input v-model="formdata.secretary" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10" :offset="2">
                    <el-form-item label="重点级别：">
                        <el-checkbox-group v-model="focusLevelCheckList">
                            <el-checkbox v-for="item in itemOptions"  :label="item" :key="item" disabled>{{item}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>  
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="责任人：">
                        <el-input v-model="formdata.personResponsibleTaskName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="工作标准：">
                        <el-input v-model="formdata.workStandard" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="描述：">
                        <el-input v-model="formdata.remark" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
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
        </el-form>
        </el-dialog>
    </div>
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    props: {
        rowCooTaskDetailDataObj: Object,
        rowCooTaskDetailtype:Boolean,
    },
    components: {
        DynamicTable,
    },
    created() {
      // this.getPositionTypeTableData("");
    // getunhandledTaskFormDetail("");
    },
    data(){
        return{
            itemOptions:['集团重点','公司重点','部门重点'],
            focusLevelCheckList:[],
            formLabelWidth: "120px",
            ShowFinancVisible:false,
            labelPosition: 'left',
            formdata:{
                company:'',
                // departmentName,
                // examinerName,
                // taskType,
                // taskLevel,
                // taskState,
                // assignedPersonName,
                // startTime,
                // fanishTime,
                // workeName,
                // gestorName,
                // voucherDate,
                // secretary,
                // personResponsibleTaskName,
                // workStandard,
                // remark
            },
            companyData:[],
            yearsData:[],
            atctiveName:'first',
            pageNum: 1,
            pageSize: 10,
            total: 20,
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
                    key: 'key3',
                    title: '期权数值'
                },
                {
                    key: 'key4',
                    title: '计量单位'
                },
            ],
            tableData:[],
        }
    },
    methods: {
        //获取配合任务详情
        getCoordinationTaskDetail(data) {
            debugger;
        this.$api.processSet.getCoordinationTaskDetail({
            id: data.id,
        })
        .then((res) => {
                if(res.data.code == 0){
                this.formdata = res.data.data;

                }
            }),error => {
            console.log(error);
            }
        },

    },
    watch:{
        rowCooTaskDetailtype(oldVal,newVal){
            this.ShowFinancVisible=this.rowCooTaskDetailtype;
             let coordinationSelected = {};
            coordinationSelected.id = this.rowCooTaskDetailDataObj.fsrcoId;
            this.getCoordinationTaskDetail(coordinationSelected);
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