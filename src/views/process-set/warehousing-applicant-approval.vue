<template>

    <div>
        <el-dialog :title="title" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="60%">
            <el-form
                label-width="110px"
                v-model="formdata"
                class="dataForm"
                size="mini"
                :model="formdata"
                :label-position="labelPosition"
            >
                <el-card>
                    <el-row :gutter="24" v-show="!isOa">
                        <el-col :span="12" :offset="12">
                            <el-button type="danger" icon="el-icon-circle-plus-outline" plain @click="baseInputTable('加签')">加签</el-button>
                            <el-button type="success" icon="el-icon-share" plain @click="baseInputTable('转发')">转发</el-button>
                            <el-button type="danger" icon="el-icon-s-order" plain @click="baseInputTable('委托')">委托</el-button>
                            <el-button type="danger" icon="el-icon-view" plain @click="basefollow()">关注</el-button>
                            <el-button type="success" icon="el-icon-success" plain @click="effectOrDisableMsg">提交</el-button>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <ComAnnDetaiPage  :rowComPanDetaiDataObj="rowComPanDetaiDataObj" :rowComPanDetaitype="rowComPanDetaitype" @changeShow="showLookOrUpdate"/>
                        <TempTaskPage  :rowTEMTaskDataObj="rowTEMTaskDataObj" :rowTEMTasktype="rowTEMTasktype" @changeShow="showLookOrUpdate"/>
                        <EachPerEachJobDetailPage  :rowEACHPerEachJobDetDataObj="rowEACHPerEachJobDetDataObj" :rowEACHPerEachJobDettype="rowEACHPerEachJobDettype" @changeShow="showLookOrUpdate"/>
                        <EachPerEachTableReportPage  :rowEachPerEachTableReportDataObj="rowEachPerEachTableReportDataObj" :rowEachPerEachTableReporttype="rowEachPerEachTableReporttype" @changeShow="showLookOrUpdate"/>
                        <EachPerEachTableInvalidPage  :rowEachPerEachTableInvalidDataObj="rowEachPerEachTableInvalidDataObj" :rowEachPerEachTableInvalidtype="rowEachPerEachTableInvalidtype" @changeShow="showLookOrUpdate"/>
                        <EachPerEachTablePersonPage  :rowEachPerEachTablePersonDataObj="rowEachPerEachTablePersonDataObj" :rowEachPerEachTablePersontype="rowEachPerEachTablePersontype" @changeShow="showLookOrUpdate"/>
                        <EachPerEachTableDelayPage  :rowEachPerEachTableDelayDataObj="rowEachPerEachTableDelayDataObj" :rowEachPerEachTableDelaytype="rowEachPerEachTableDelaytype" @changeShow="showLookOrUpdate"/>
                        <EachPerEachTableAssPage  :rowEachPerEachTableAssDataObj="rowEachPerEachTableAssDataObj" :rowEachPerEachTableAsstype="rowEachPerEachTableAsstype" @changeShow="showLookOrUpdate"/>
                        <EachPerEachTableEntrustPage  :rowEachPerEachTableEntrustDataObj="rowEachPerEachTableEntrustDataObj" :rowEachPerEachTableEntrusttype="rowEachPerEachTableEntrusttype" @changeShow="showLookOrUpdate"/>
                        <EachPerEachTableDetailPage  :rowEachPerEachTableDetailDataObj="rowEachPerEachTableDetailDataObj" :rowEachPerEachTableDetailtype="rowEachPerEachTableDetailtype" @changeShow="showLookOrUpdate"/>
                        <DepartAnnPlanDetPage  :rowDepartAnnPlanDetDataObj="rowDepartAnnPlanDetDataObj" :rowDepartAnnPlanDettype="rowDepartAnnPlanDettype" @changeShow="showLookOrUpdate"/>
                        <DepartMonPlanDetPage  :rowDepartMonPlanDetDataObj="rowDepartMonPlanDetDataObj" :rowDepartMonPlanDettype="rowDepartMonPlanDettype" @changeShow="showLookOrUpdate"/>
                        <EmpApprTabDetailPage  :rowEmpApprTabDetailDataObj="rowEmpApprTabDetailDataObj" :rowEmpApprTabDetailtype="rowEmpApprTabDetailtype" @changeShow="showLookOrUpdate"/>
                        <EmpApprTabNumDetailPage  :rowEmpApprTabNumDetailDataObj="rowEmpApprTabNumDetailDataObj" :rowEmpApprTabNumDetailtype="rowEmpApprTabNumDetailtype" @changeShow="showLookOrUpdate"/>
                        <CooTaskDetailPage  :rowCooTaskDetailDataObj="rowCooTaskDetailDataObj" :rowCooTaskDetailtype="rowCooTaskDetailtype" @changeShow="showLookOrUpdate"/>
                        <EachPerEachTableAdjPage  :rowEachPerEachTableAdjDataObj="rowEachPerEachTableAdjDataObj" :rowEachPerEachTableAdjtype="rowEachPerEachTableAdjtype" @changeShow="showLookOrUpdate"/>
                    </el-row>  
                    <el-row>
                        <el-col :span="22">
                            <processnodelist :rowDataprocessObj="rowDataprocessObj"  @changeShow="showprocessData"/> 
                        </el-col>
                    </el-row>
                    <el-tabs v-model="atctiveName" @tab-click="handleClick">
                        <el-tab-pane label="审批意见" name="first">
                            <el-row >
                                <el-col :span="12" >
                                    <el-form-item label="决策类型" prop="code">
                                        <el-radio v-model="formdata.radio" label="1">同意</el-radio>
                                        <el-radio v-model="formdata.radio" label="2">不同意</el-radio>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="23">
                                    <el-form-item label="审批意见">
                                        <el-input type="textarea" v-model="formdata.remark" :rows="5"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="附件" name="second">
                            <creditEnclFilelist :rowEFListDataObj="rowEFListDataObj" :financingEFListtype="financingEFListtype" />
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-form>
        </el-dialog>
        <baseInfoDialog  :rowUTSDataObj="rowUTSDataObj" :rowUTStype="rowUTStype" @changeShow="closeBaseInfo"/>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
import processnodelist from '../../views/comment/process-node-list.vue';//流程相关
import ComAnnDetaiPage from '../plan-options/company-Annual-plan-detail.vue';//公司年度计划汇总 C
import TempTaskPage from '../plan-options/temporary-task.vue';//临时任务派发 E
import creditEnclFilelist from '../comment/enclosure-file.vue';
import baseInfoDialog from './user-tree-search.vue';//转发加签委托人员选择
import EachPerEachJobDetailPage from '../plan-options/each-person-each-job-detail.vue';//一岗一表 F
import EachPerEachTableDelayPage from '../plan-options/each-person-each-table-delay.vue';//一人一表任务表（延期）I
import EachPerEachTableAssPage from '../plan-options/each-person-each-table-assessment.vue';//一人一表任务表（自评）H
import EachPerEachTableAdjPage from '../plan-options/each-person-each-table-adjust.vue';//一人一表任务表（任务调整）K
import EachPerEachTableReportPage from '../plan-options/each-person-each-table-report.vue';//一人一表任务表（报备）G
import EachPerEachTableInvalidPage from '../plan-options/each-person-each-table-invalid.vue';//一人一表任务表（作废）J
import EachPerEachTablePersonPage from '../plan-options/each-person-each-table-person.vue';//一人一表任务表（人员变更）L
import EachPerEachTableEntrustPage from '../plan-options/each-person-each-table-entrust.vue';//一人一表任务表（任务委托）M
import EachPerEachTableDetailPage from '../plan-options/each-person-each-table-detail.vue';//一人一表任务表（查看功能）O
import DepartAnnPlanDetPage from '../plan-options/department-annual-plan-detail.vue';//部门年度计划  B
import DepartMonPlanDetPage from '../plan-options/department-month-plan-detail.vue';//部门月度计划  D
import EmpApprTabDetailPage from '../plan-options/employees-appraisal-table-detail.vue';//员工考评表 P
import EmpApprTabNumDetailPage from '../plan-options/employees-appraisal-table-num-detail.vue';//员工考评表汇总 S
import CooTaskDetailPage from '../plan-options/cooperate-task-detail.vue';// 配合任务  A

export default {
    props: {
        rowWAADataObj: Object,
        functionType:String,
        rowWAAtype:{
             type: Boolean,
             default: false
        },
        isOa:{
                type: Boolean,
             default: false
        }
    },
    name: 'basetable',
    components: {
        DynamicTable,
        creditEnclFilelist,
        ComAnnDetaiPage,
        processnodelist,
        baseInfoDialog,
        TempTaskPage,
        EachPerEachJobDetailPage,
        EachPerEachTableDelayPage,
        EachPerEachTableAssPage,
        EachPerEachTableAdjPage,
        EachPerEachTableReportPage,
        EachPerEachTableInvalidPage,
        EachPerEachTablePersonPage,
        EachPerEachTableEntrustPage,
        EachPerEachTableDetailPage,
        DepartAnnPlanDetPage,
        DepartMonPlanDetPage,
        EmpApprTabDetailPage,
        EmpApprTabNumDetailPage,
        CooTaskDetailPage    
    },
    inject: ['reload'],
    data: function() {   
        return {
            atctiveName: 'first',
            ShowFinancVisible:false,
            labelPosition: 'left',
            disabled:false,
            companyData:new proData().company,
            objectoptions:new proData().project,
            formdata: {
                radio:1,
                remark:''
            },
            rowUTStype:false,
            rowCOOTasktype:false,
            rowComPanDetaitype:false,
            financingEFListtype:false,
            rowTEMTasktype:false,
            rowEACHPerEachJobDettype:false,
            rowEachPerEachTableDelaytype:false,
            rowEachPerEachTableAsstype:false,
            rowEachPerEachTableReporttype:false,
            rowEachPerEachTableInvalidtype:false,
            rowEachPerEachTablePersontype:false,
            rowEachPerEachTableEntrusttype:false,
            rowEachPerEachTableDetailtype:false,
            rowDepartAnnPlanDettype:false,
            rowDepartMonPlanDettype:false,
            rowEmpApprTabDetailtype:false,
            rowEmpApprTabNumDetailtype:false,
            rowCooTaskDetailtype:false,
            rowEachPerEachTableAdjtype:false,
            rowUTSDataObj:{},
            rowDataprocessObj: [],
            rowCOOTaskDataObj: {},
            rowComPanDetaiDataObj: {},
            rowEFListDataObj: {},
            rowTEMTaskDataObj: {},
            rowEACHPerEachJobDetDataObj: {},
            rowEachPerEachTableDelayDataObj: {},
            rowEachPerEachTableReportDataObj: {},
            rowEachPerEachTableInvalidDataObj: {},
            rowEachPerEachTablePersonDataObj: {},
            rowEachPerEachTableAssDataObj: {},
            rowEachPerEachTableEntrustDataObj: {},
            rowEachPerEachTableDetailDataObj: {},
            rowDepartAnnPlanDetDataObj:{},
            rowDepartMonPlanDetDataObj:{},
            rowEmpApprTabDetailDataObj:{},
            rowEmpApprTabNumDetailDataObj:{},
            rowCooTaskDetailDataObj:{},
            rowEachPerEachTableAdjDataObj:{},
            pageNum: 1,
            pageSize: 10,
            total: 20,
            prechecked:'',
            title:''
        };
    },
    created() {

    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.rowCOOTasktype=false;
            this.rowComPanDetaitype=false;
            this.financingEFListtype=false;
            this.rowTEMTasktype=false;
            this.rowEACHPerEachJobDettype=false;
            this.rowEachPerEachTableDelaytype=false;
            this.rowEachPerEachTableAsstype=false;
            this.rowEachPerEachTableReporttype=false;
            this.rowEachPerEachTableInvalidtype=false;
            this.rowEachPerEachTablePersontype=false;
            this.rowEachPerEachTableEntrusttype=false;
            this.rowEachPerEachTableDetailtype=false;
            this.rowDepartAnnPlanDettype=false;
            this.rowDepartMonPlanDettype=false;
            this.rowEmpApprTabDetailtype=false;
            this.rowEmpApprTabNumDetailtype=false;
            this.rowCooTaskDetailtype=false;
            this.rowEachPerEachTableAdjtype=false;
            this.reload();
            this.$emit('changeShow',false);
        },
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //分页
        onSizeChange(val) {
            this.pageSize = val;
        },
        //下一页
        onCurrentChange(val) {},
        //流程图
        showprocessData(data){
            console.log(data)
        },
         //控制查看显示影藏
        showLookOrUpdate(data){
            if(data === false){
                this.financingLFCAtype = false
            }else{
                this.financingLFCAtype = true
            }
        },
        //滑块切换
        handleClick(tab){
            var tabsname =tab.paneName;
            if(tabsname){
                if(tabsname ==="first"){
                    //授信合同记录
                    //this.financingLFCAtype=true;
                }else if(tabsname ==="second"){
                    //授信品种管理
                    this.financingCVMListtype=true;
                }else{
                    //附件列表
                    this.financingEFListtype=true;
                    
                }
            }
        },
        //提交按钮点击事件
        effectOrDisableMsg(){

        },
        showprocessData(){},
        //判断
        DisplayOrHide(dataType,dataContent){
            if(dataType === 'CoordinationTask'){
                this.rowCooTaskDetailtype=true;
            }else if(dataType === 'DepartmentYearPlan'){
                this.rowDepartAnnPlanDettype=true;
            }else if(dataType === 'CompanyYearPlanCollect'){
                this.rowComPanDetaitype=true;
            } else if(dataType === 'DepartmentMonthPlan'){
                this.rowDepartMonPlanDettype=true;
            } else if(dataType === 'TemporaryMission'){
                this.rowTEMTasktype=true;
                this.rowTEMTaskDataObj = dataContent.selectData[0];
                console.log(this.rowTEMTaskDataObj);
            } else if(dataType === 'FormPost'){
                this.rowEACHPerEachJobDettype=true;
            } else if(dataType === 'TaskReport'){
                this.rowEachPerEachTableReporttype=true;
            } else if(dataType === 'TaskSelfEvaluateApplyzp'){
                this.rowEachPerEachTableAsstype=true;
            } else if(dataType === 'TaskDelayApply'){
                this.rowEachPerEachTableDelaytype=true;
            } else if(dataType === 'TaskCancelApply'){
                this.rowEachPerEachTableInvalidtype=true;
            } else if(dataType === 'TaskAdjust'){
                this.rowEachPerEachTableAdjtype=true;
            } else if(dataType === 'AssignerChange'){
                this.rowEachPerEachTablePersontype=true;
            } else if(dataType === 'TaskEntrust'){
                this.rowEachPerEachTableEntrusttype=true;
            } else if(dataType === 'PersonalTableTask'){
                this.rowEachPerEachTableDetailtype=true;
            } else if(dataType === 'StaffAppraisals'){
                this.rowEmpApprTabDetailtype=true;
            } else if(dataType === 'StaffAppraisalsCollect'){
                this.rowEmpApprTabNumDetailtype=true;
            }
        },
        //转发按钮点击事件
        baseInputTable(data){
            this.rowUTStype = true;
            let finandata={};
            finandata.finanrowname="人员缺省查询方案";
            finandata.finanrowId="QS_0056";
            finandata.nametitle="待办事项";
            finandata.SelectionData=this.rowWAADataObj.selectData;
            //finandata.FunctionType=data;
            this.rowUTSDataObj=finandata;
        },
        closeBaseInfo(data){
            if(data === false){
                this.rowUTStype = false
            }else{
                this.rowUTStype = true
            }
        },
        //关注点击事件
        basefollow(){
            let selectData=this.rowWAADataObj.selectData;
            let subject=selectData[0].fsubject;
            if(subject.indexOf('转发')>-1){
                this.$message.error('转发邮件不能添加关注!');
            }else if(subject.indexOf('抄送')>-1){
                this.$message.error('抄送邮件不能添加关注!');
            }else if(subject.indexOf('加签')>-1){
                this.$message.error('加签邮件不能添加关注!');
            }else{
                let fromdata={};
                fromdata.fvoucherOid=selectData[0].fsrcoId;
                fromdata.fattentionOid=localStorage.getItem("ms_userId");
                this.$api.processSet.addAttention(fromdata).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data;
                        //this.reload();
                        this.$message.success('添加关注成功!');
                        //this.WFMtypeoptions=returndata.data.rows;
                    } else {
                        this.$message.success('数据库没有该条数据!');
                    }
                });
            }
        },
    },
    mounted() {
    },
    watch:{
        rowWAAtype(oldVal,newVal){
            this.ShowFinancVisible=this.rowWAAtype;
            let formDataA ={};
            if(!this.isOa){
                this.title=this.rowWAADataObj.nametitle;
                let finandata=this.rowWAADataObj.selectData;
                formDataA.oid=finandata[0].foid;
            }
            this.$api.processSet.getunhandledTask(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    this.DisplayOrHide(this.functionType,this.rowWAADataObj);
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        }
    }
};
</script>

<style lang='scss' scoped>
.el-form-item__label {
    text-align: left;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.topinput {
    width: 100px;
}
.topselect {
    width: 242px;
}
.datatable {
    margin-top: 20px;
}
.dataForm {
    margin-top: 10px;
}
.elrowStyle {
    margin-top: 20px;
}
.elColCenter {
    text-align: center;
}
.pbackground {
    text-align: center;
    height: 30px;
    font-size: 15px;
    line-height: 30px;
    background-color: skyblue;
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