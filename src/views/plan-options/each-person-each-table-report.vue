<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
        <el-form
            label-width="110px"
            v-model="formdata"
            class="dataForm"
            size="mini"
            :model="formdata"
            :label-position="labelPosition" :disabled="!disFlag"
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
                <el-col :span="6">
                    <el-form-item label="原完成时间："> 
                        <el-input v-model="formdata.yendDate" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="延期完成时间：" :label-width="formLabelWidth" :disabled="true">
                        <el-input v-model="formdata.delayEndDate" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="考核指标(%)：">
                        <el-input v-model="formdata.target" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="是否开会"><el-checkbox v-model="formdata.metting" :disabled="true"></el-checkbox></el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="拟定开会时间：" :label-width="formLabelWidth">
                        <el-date-picker
                            clearable
                            v-model="formdata.meetDate"
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
                <el-col :span="22">
                    <el-form-item label="解决方案：" >
                        <el-input v-model="formdata.solution" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="协办人：" >
                        <el-input v-model="formdata.sponsorsName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-tabs v-model="atctiveName" @tab-click="handleClick">
                    <el-tab-pane label="附件" name="second">
                        <enclosureFile ref="child" :enclosureConfig="enclosureConfig"/>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="附件" name="first">
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
                    </el-tab-pane> -->
                </el-tabs>
            </el-row>
        </el-form>
    </div>
    
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
import enclosureFile from '../inside-mail/enclosure-file.vue';
export default {
    props: {
        rowEachPerEachTableReportDataObj: String,
        rowEachPerEachTableReporttype:Boolean,
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
            attachColumns:[
                {
                    key: 'num',
                    title: '序号'
                },
                {
                    key: 'fileName',
                    title: '名称'
                },
                {
                    key: 'key3',
                    title: '操作'
                },
            ],
            itemOptions:['集团重点','公司重点','部门重点'],
            formLabelWidth: '120px',
            ShowFinancVisible:false,
            projectData:[],
            peopleJobgsTableVisible: false,
            labelPosition: 'left',
            formdata:{
                companyName:'',
                projectName:'',
                departmentName:'',
                taskStatus:'',
                taskType:'',
                taskLevel:'',
                periodicityTask:'',
                yearPlan:'',
                workName:'',
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
                yendDate:'',
                delayEndDate:'',
                target:'',
                metting:'',
                meetDate:'',
                solution:'',
                sponsorsName:'',
            },
            companyData:[],
            atctiveName:'second',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            isEdit: false,
            isLook:false,
            focusLevelCheckList: ['集团重点','公司重点'],
            tableData:[],
        }
    },
    methods: {
        handleClick(){

        },
        //获取任务报备详情
        getReportDetail(data) {
            this.$api.processSet.getPersonalTableTaskDetail({
                id: data.id,
                userId: localStorage.getItem("ms_userId")
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
                this.enclosureConfig.voucherId = data.id;
                }
            }),error => {
            console.log(error);
            }
            
        },
    },
    watch:{
        rowEachPerEachTableReporttype(oldVal,newVal){
            this.ShowFinancVisible=this.rowEachPerEachTableReporttype;
             let reportSelected = {};
             reportSelected.id = this.rowEachPerEachTableReportDataObj;
             this.getReportDetail(reportSelected);
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