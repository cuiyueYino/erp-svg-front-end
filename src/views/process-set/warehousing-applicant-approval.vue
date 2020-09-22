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
                :rules="rules"
                ref="ruleForm"
            >
                <el-card>
                    <el-row :gutter="24" style="text-align: right">
                        <el-col :span="10" :offset="14" v-if="rowFstatus == 4?true:false">
                            <el-button type="success" icon="el-icon-position" size="small" plain @click="baseInputTable('转发')" v-if="rowWAADataObj.sign">转发</el-button>
                            <!-- <el-button type="success" icon="el-icon-star-off" size="small" plain @click="basefollow()">关注</el-button> -->
                            <el-button type="primary" icon="el-icon-postcard" size="small" plain @click="removeBizMail" v-if="rowWAADataObj.read">已阅</el-button>
                        </el-col>
                        <el-col :span="12" :offset="12" v-else-if="rowFstatus == 1?true:false">
                            <el-button type="success" icon="el-icon-circle-plus-outline" size="small" plain @click="baseInputTable('加签')" v-if="rowWAADataObj.sign">加签</el-button>
                            <el-button type="success" icon="el-icon-position" size="small" plain @click="baseInputTable('转发')" v-if="rowWAADataObj.relay">转发</el-button>
                            <el-button type="success" icon="el-icon-circle-check" size="small" plain @click="baseInputTable('委托')" v-if="rowWAADataObj.trust">委托</el-button>
                            <el-button type="success" icon="el-icon-star-off" size="small" plain @click="basefollow()" v-if="rowWAADataObj.attention">关注</el-button>
                            <el-button type="success" icon="el-icon-copy-document" size="small" plain @click="effectOrDisableMsg('ruleForm')" v-if="rowWAADataObj.commit">提交</el-button>
                            <el-button type="info" icon="el-icon-printer" size="small" v-print="printObj" plain v-if="rowWAADataObj.print" >打印</el-button>
                        </el-col>
                        <el-col :span="12" :offset="12" v-else>
                            <el-button type="success" icon="el-icon-circle-plus-outline" size="small" plain @click="baseInputTable('加签')" v-if="rowWAADataObj.sign">加签</el-button>
                            <el-button type="success" icon="el-icon-position" size="small" plain @click="baseInputTable('转发')" v-if="rowWAADataObj.relay">转发</el-button>
                            <el-button type="success" icon="el-icon-circle-check" size="small"  plain @click="baseInputTable('委托')" v-if="rowWAADataObj.trust">委托</el-button>
                            <el-button type="success" icon="el-icon-star-off" size="small" plain @click="basefollow()" v-if="rowWAADataObj.attention">关注</el-button>
                            <el-button type="info" icon="el-icon-printer" size="small" v-print="printObj" plain v-if="rowWAADataObj.print" >打印</el-button>
                        </el-col>
                    </el-row>
                    <div  id="print">
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
                        <ConferenceApplyPage  :rowConferenceApplyDataObj="rowConferenceApplyDataObj" :rowConferenceApplytype="rowConferenceApplytype" @changeShow="showLookOrUpdate"/>
                        <EconomicIndicatorsPage  :rowEconomicIndicatorsDataObj="rowEconomicIndicatorsDataObj" :rowEconomicIndicatorstype="rowEconomicIndicatorstype" @changeShow="showLookOrUpdate"/>
                        <WorkItemPage  v-if="itemsFlag" :context="context" :showSeeOrUpd ="showSeeOrUpd" :todoFlag="todoFlag" @changeShow="showLookOrUpdate" />
			            <EachPerEachTableModifyPage  :rowEachPerEachTableModifyDataObj="rowEachPerEachTableModifyDataObj" :rowEachPerEachTableModifyype="rowEachPerEachTableModifyype" @changeShow="showLookOrUpdate"/>
                    </el-row>

                    <el-row>
                        <el-col :span="22">
                            <processnodelist :rowDataprocessObj="rowDataprocessObj" :rowDataprocessOid="rowDataprocessOid"  @changeShow="showprocessData"/>
                        </el-col>
                    </el-row>
                    <el-tabs v-model="atctiveName" @tab-click="handleClick">
                        <el-tab-pane label="审批意见" name="first" v-if="!seeFlag && (rowFstatus == 4?false:true)">
                            <el-row >
                                <el-col :span="12" >
                                    <!-- prop="code" -->
                                    <el-form-item label="决策类型" >
                                        <el-radio-group v-model="formdata.fresult">
                                            <el-radio :label="1" v-if="fresultArray.indexOf('1') !=-1">{{fresultObject['1']}}</el-radio>
                                            <el-radio :label="2" v-if="fresultArray.indexOf('2') !=-1">{{fresultObject['2']}}</el-radio>
                                            <el-radio :label="3" v-if="fresultArray.indexOf('3') !=-1">{{fresultObject['3']}}</el-radio>
                                            <el-radio :label="4" v-if="fresultArray.indexOf('4') !=-1">{{fresultObject['4']}}</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="23">
                                    <el-form-item label="审批意见" prop="remark">
                                        <el-input type="textarea" v-model="formdata.remark" :rows="5"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="附件" name="second">
                            <creditEnclFilelist :rowEFListDataObj="rowEFListDataObj" :financingEFListtype="financingEFListtype" :fileFlag='rowFstatus' :seeFlag="seeFlag" />
                        </el-tab-pane>
                    </el-tabs>
    </div>
                </el-card>
            </el-form>
        </el-dialog>
        <baseInfoDialog  :rowUTSDataObj="rowUTSDataObj" :rowUTStype="rowUTStype" @changeShow="closeBaseInfo"/>
	<!-- 部门/职位弹窗 -->
	<erpDialog erpDialogwidth="false" title="选择岗位" :dialogShow="jobVisible">
		<!-- 岗位表格 -->
		<dynamic-table :columns="columns" :table-data="tableData" :isShowPager="false" @current-change="onCurrentChange" @selection-change="onSelectionChange" v-loading="false" element-loading-text="加载中"></dynamic-table>
		<div slot="footer">
			<el-button type='success' size="small" icon='el-icon-check' @click="submitMethodGW('','');">确定</el-button>
			<el-button type='warning' icon='el-icon-close' size="small" @click="jobVisibleGW">取消</el-button>
		</div>
	</erpDialog>
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
import EachPerEachTableModifyPage from '../plan-options/each-person-each-table-modify.vue';//一人一表任务表（任务自评修改申请）
import DepartAnnPlanDetPage from '../plan-options/department-annual-plan-detail.vue';//部门年度计划  B
import DepartMonPlanDetPage from '../plan-options/department-month-plan-detail.vue';//部门月度计划  D
import EmpApprTabDetailPage from '../plan-options/employees-appraisal-table-detail.vue';//员工考评表 P
import EmpApprTabNumDetailPage from '../plan-options/employees-appraisal-table-num-detail.vue';//员工考评表汇总 S
import CooTaskDetailPage from '../plan-options/cooperate-task-detail.vue';// 配合任务  A
import ConferenceApplyPage from '../plan-options/conference-apply-detail.vue';// 会议申请
import EconomicIndicatorsPage from '../plan-options/economic-Indicators-detail.vue';// 经济指标
import WorkItemPage from '../../views/collaborative-office/components/see-work-items.vue';// 工作事项的详情


export default {
    props: {
        //判断上个页面跳转过来的类型
        seeFlag:Boolean,
        rowWAADataObj: Object,
        functionType:String,
        factivity:String,
        fsubject:String,
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
        CooTaskDetailPage,
        ConferenceApplyPage,
        EconomicIndicatorsPage,
        WorkItemPage,
        EachPerEachTableModifyPage
    },
    inject: ['reload'],
    data: function() {
            var validateRemark = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入审批意见'));
                } else {
                    callback();
                }
        };
        return {
		columns: [{
						type: "selection"
					},
					{
						key: "index",
						title: "序号"
					},
					{
						key: "firmpositioName",
						title: "岗位名称"
					},
	        ],
            tableData: [],
            jobVisible: false,
            fresultObject:{},
            fresultArray:[],
            itemsFlag:false,
            todoFlag:true,
            showSeeOrUpd:'',
            atctiveName: 'first',
            ShowFinancVisible:false,
            labelPosition: 'left',
            disabled:false,
            objectoptions:new proData().project,
            formdata: {
                fresult:1,
                remark:''
            },
            participator:'',
            rules: {
                remark: [
                    { validator: validateRemark, trigger: 'blur' }
                ],
            },
            rowFstatus:0,
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
	        rowEachPerEachTableModifyype:false,
            rowEachPerEachTableDetailtype:false,
            rowDepartAnnPlanDettype:false,
            rowDepartMonPlanDettype:false,
            rowEmpApprTabDetailtype:false,
            rowEmpApprTabNumDetailtype:false,
            rowCooTaskDetailtype:false,
            rowEachPerEachTableAdjtype:false,
            rowConferenceApplytype:false,
            rowEconomicIndicatorstype:false,
            rowUTSDataObj:{},
            rowDataprocessObj: [],
            rowDataprocessOid:{},
            rowCOOTaskDataObj: {},
            rowComPanDetaiDataObj: {},
            rowEFListDataObj: {},
            rowTEMTaskDataObj: "",
            rowEACHPerEachJobDetDataObj: "",
            rowEachPerEachTableDelayDataObj: "",
            rowEachPerEachTableReportDataObj: '',
            rowEachPerEachTableInvalidDataObj: '',
            rowEachPerEachTablePersonDataObj: '',
            rowEachPerEachTableAssDataObj: "",
            rowEachPerEachTableEntrustDataObj: "",
            rowEachPerEachTableModifyDataObj:'',
            rowEachPerEachTableDetailDataObj: "",
            rowDepartAnnPlanDetDataObj:'',
            rowDepartMonPlanDetDataObj:"",
            rowEmpApprTabDetailDataObj:'',
            rowEmpApprTabNumDetailDataObj:'',
            rowCooTaskDetailDataObj:"",
            rowEachPerEachTableAdjDataObj:"",
            rowConferenceApplyDataObj:'',
            rowEconomicIndicatorsDataObj:"",
            contextObj:{},
            context:{},
            pageNum: 1,
            pageSize: 10,
            total: 20,
            prechecked:'',
            title:'',
            printObj:{
                id:"print",
                title:"打印"
            },
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
            this.rowEachPerEachTableModifyype=false;
            this.rowEachPerEachTableDetailtype=false;
            this.rowDepartAnnPlanDettype=false;
            this.rowDepartMonPlanDettype=false;
            this.rowEmpApprTabDetailtype=false;
            this.rowEmpApprTabNumDetailtype=false;
            this.rowCooTaskDetailtype=false;
            this.rowEachPerEachTableAdjtype=false;
            this.rowConferenceApplytype=false;
            this.rowEconomicIndicatorstype=false;
            //this.reload();
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
        //判断当前节点是否是手工指定下一节点
        checkMaile(){
            let DataF={};
            if(this.isOa) {
                DataF.foid=this.rowWAADataObj.foid;
            }else{
                DataF.foid=this.rowWAADataObj.selectData[0].foid;
            }
            this.$confirm('单据提交后将流转到下一个节点，确实要提交当前数据吗？', '确认', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.processSet.getProcessorByMaile(DataF).then(res=>{
                        if(res.data){
                            if(res.data.code ==0){
                                if(res.data.data){
                                    //手工指定下一节点
                                    if(res.data.data.fmntnextjoin ===1){
                                        this.baseInputTable("手工指定下一节点");
                                    }else{
                                        //正常提交
                                        this.submitMethod('','');
                                    }
                                }else{
                                    //正常提交
                                    this.submitMethod('','');
                                }
                            }else{
                                this.$message.error(res.data.msg);
                            }
                        }else{
                            this.$message.error("保存失败,请填联系管理员!");
                        }
                    },error=>{
                        console.log(error)
                    });
            })
        },
        //提交按钮点击事件
        effectOrDisableMsg(formName){
            if(this.formdata.fresult == 2) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //this.submitMethod();
                        this.checkMaile()
                    } else {}
                    return false;
                })
            } else {
                //this.submitMethod();
                this.checkMaile()
            }
	    },
        //提交保存的接口
        submitData(Data){
            const loading = this.$loading({
                 lock: true,
                 text: 'Loading',
                 spinner: 'el-icon-loading',
                 background: 'rgba(0, 0, 0, 0.7)'
             });
            let paramsData = {};
            let twfbizmailReqVoObj = {};
            if(this.isOa) {
                paramsData["mactivityOid"] = this.rowWAADataObj.factivity;
                paramsData["srcOid"] = this.rowWAADataObj.fsrcoId;
                paramsData["subject"] = this.rowWAADataObj.fsubject;
                twfbizmailReqVoObj["foid"] = this.rowWAADataObj.foid;
            } else {
                paramsData["mactivityOid"] = this.rowWAADataObj.selectData[0].factivity;
                paramsData["srcOid"] = this.rowWAADataObj.selectData[0].fsrcoId;
                paramsData["subject"] = this.rowWAADataObj.selectData[0].fsubject;
                twfbizmailReqVoObj["foid"] = this.rowWAADataObj.selectData[0].foid;
            }
            paramsData["currUserId"] = localStorage.getItem("ms_userId");
            paramsData["processCode"] = "schedule";
            paramsData["twfbizmailReqVo"] = twfbizmailReqVoObj;
            let twfauditObj = {};
            twfauditObj["fresult"] = this.formdata.fresult;
            twfauditObj["fopinion"] = this.formdata.remark;
            paramsData["twfaudit"] = twfauditObj;
            if(this.participator!=''){
                paramsData["participator"] = this.participator;
            }
            if(Data){
                paramsData["position"] = Data;
            }
            this.$api.processSet.addWfsubmit(paramsData).then(res=>{
                if( res.data.code == 0 ){
                    this.$message.success('保存成功');
                    // loading.close();
                    this.ShowFinancVisible = false;
                    this.participator="";
                    this.$emit('changeShow',false);
                    this.reload();
                }else{
                    loading.close();
                    this.participator="";
                    this.$message.error(res.data.msg);
                }

            },error=>{
                // loading.close();
                console.log(error)
            });
        },
        //选择岗位关闭
        jobVisibleGW(){
            this.participator="";
            this.jobVisible =false;
            this.multipleSelection=[];
        },
        //选择岗位
        submitMethodGW(){
            let SelectData=this.multipleSelection;
            if(SelectData.length == 0){
                this.$message.error("请选择岗位!");
            }else{
                if(SelectData.length == 1){
                    this.jobVisible =false;
                    this.submitData(this.multipleSelection[0].foid);
                }else{
                   this.$message.error("只能选择一个岗位!");     
                } 
            }
        },
        submitMethod(name,val) {
            if(name ==='手工指定'){
                this.participator= "3|"+val;
            }
            //获取人员岗位的接口
            this.$api.processSet.getStaffAllFirmpositionname(
                {foid: localStorage.getItem('ms_userId')}
            ).then(res=>{
                if(res.data){
                    if(res.data.code ==0){
                        if(res.data.data.length >=2) {
                            //当存在兼职的时候，弹出pop框
                            this.jobVisible = true;
                            for(var i=0;i<res.data.data.length;i++){
                                res.data.data[i]['index'] = i + 1;
                            }
                            this.tableData = res.data.data;
                        } else {
                            this.submitData();
                        }
                    }else{
                        this.$message.error(res.data.msg);
                    }
                } else{
                    this.$message.error("系统异常,请填联系管理员!");
                }
            },error=>{
                console.log(error)
            })
            
         },
        showprocessData(){},
        //判断
        DisplayOrHide(dataType,dataContent){
            var currentDatd = "";
            if(this.isOa) {
                currentDatd = dataContent.fsrcoId;
            } else {
                currentDatd = dataContent.selectData[0].fsrcoId;
            }
            if((dataContent.selectData[0].fsubject.substring(0,3) == '退回：' & dataContent.selectData[0].fcreator == localStorage.getItem("ms_userId")) ||  dataContent.selectData[0].fcode == 'manpower') {
                this.showSeeOrUpd = "3";
            } else {
                this.showSeeOrUpd = "1";
            }
            // 判断是否为工作事项的flag
            if(dataType.indexOf("OA")  == 0) {
                this.itemsFlag = true;
                // alert("OA项目");
                // this.rowCooTaskDetailtype=true;
                //获取工作事项的请求参数接口
                return this.$api.processSet.getWorkItemsParams({
                    srcId: currentDatd,
                })
                .then((res) => {
                        if(res.data.code == 0){
                            this.contextObj['srcId'] = res.data.data.srcId;
                            this.contextObj['status'] = res.data.data.status;
                            this.contextObj['tableName'] = res.data.data.tableName;
                            this.contextObj['tempId'] = res.data.data.tempId;
                            //相关事项的详情接口
                            this.$api.collaborativeOffice.findDataBySrcId({
                                srcId: this.contextObj['srcId'],
                                tempId: this.contextObj['tempId'],
                                tableName: this.contextObj['tableName']
                            }).then(data => {
                                if(this.dataBack(data)) {
                                    this.$api.collaborativeOffice.findlnfosList({
                                        voucherId: JSON.parse(data.data.data).id,
                                        userCode: localStorage.getItem('ms_userId'),
                                        menuCode: "workItem"
                                    }).then(val => {
                                        this.context = JSON.parse(data.data.data);
                                        this.context.tempId = res.data.data.tempId;
                                        this.context.files = val.data.data;

                                    })
                                }
                            })
                        }
                    }),error => {
                    console.log(error);
                    }
            } else {
                if(dataType === 'CoordinationTask'){
                    this.rowCooTaskDetailtype=true;
                    this.rowCooTaskDetailDataObj = currentDatd;
                }else if(dataType === 'DepartmentYearPlan'){
                    this.rowDepartAnnPlanDettype=true;
                    this.rowDepartAnnPlanDetDataObj = currentDatd;
                }else if(dataType === 'CompanyYearPlanCollect'){
                    this.rowComPanDetaitype=true;
                    this.rowComPanDetaiDataObj = currentDatd;
                } else if(dataType === 'DepartmentMonthPlan'){
                    this.rowDepartMonPlanDettype=true;
                    this.rowDepartMonPlanDetDataObj = currentDatd;
                } else if(dataType === 'TemporaryMission'){
                    this.rowTEMTasktype=true;
                    this.rowTEMTaskDataObj = currentDatd;
                } else if(dataType === 'FormPost'){
                    this.rowEACHPerEachJobDettype=true;
                    this.rowEACHPerEachJobDetDataObj = currentDatd;
                } else if(dataType === 'TaskReport'){
                    this.rowEachPerEachTableReporttype=true;
                } else if(dataType === 'TaskSelfEvaluateApply'){
                    this.rowEachPerEachTableAsstype=true;
                    this.rowEachPerEachTableAssDataObj = currentDatd;
                } else if(dataType === 'TaskDelayApply'){
                    this.rowEachPerEachTableDelaytype=true;
                    this.rowEachPerEachTableDelayDataObj = currentDatd;
                } else if(dataType === 'TaskCancelApply'){
                    this.rowEachPerEachTableInvalidtype=true;
                    this.rowEachPerEachTableInvalidDataObj = currentDatd;
                } else if(dataType === 'TaskAdjust'){
                    this.rowEachPerEachTableAdjtype=true;
                    this.rowEachPerEachTableAdjDataObj = currentDatd;
                } else if(dataType === 'AssignerChange'){
                    this.rowEachPerEachTablePersontype=true;
		            this.rowEachPerEachTablePersonDataObj = currentDatd;
                } else if(dataType === 'TaskEntrust'){
                    this.rowEachPerEachTableEntrusttype=true;
                    this.rowEachPerEachTableEntrustDataObj = currentDatd;
                } else if(dataType === 'PersonalTableTask'){
                    this.rowEachPerEachTableDetailtype=true;
                    this.rowEachPerEachTableDetailDataObj = currentDatd;
                } else if(dataType === 'StaffAppraisals'){
                    this.rowEmpApprTabDetailtype=true;
                } else if(dataType === 'StaffAppraisalsCollect'){
                    this.rowEmpApprTabNumDetailtype=true;
                } else if(dataType === 'Meetingapplication'){
                    this.rowConferenceApplytype=true;
                } else if(dataType === 'OptionIndex'){
                    this.rowEconomicIndicatorstype=true;
                    this.rowEconomicIndicatorsDataObj = currentDatd;
                } else if(dataType === 'TaskSelfUpdateApply'){
                    this.rowEachPerEachTableModifyype=true;
                    this.rowEachPerEachTableModifyDataObj = currentDatd;
                }
                return;
            }
        },
        //转发按钮点击事件
        baseInputTable(data){
            let selectData=[];
            if(!this.isOa){
                selectData = this.rowWAADataObj.selectData;
            }else{
                selectData.push(this.rowWAADataObj);
            }
            if(selectData[0].repeat && selectData[0].repeat!=''){
                if(data =='委托' || data =='加签'){
                    this.$message.error("被转发邮件不能"+data+"!");
                    return;
                }
            }
            this.rowUTStype = true;
            let finandata={};
            finandata.finanrowname="人员缺省查询方案";
            finandata.finanrowId="QS_0056";
            finandata.nametitle="待办事项";
            finandata.SelectionData=selectData;
            finandata.FunctionType=data;
            this.rowUTSDataObj=finandata;
        },
        closeBaseInfo(type,data){
            if(type === false){
                this.rowUTStype = false
            }else{
                this.rowUTStype = true
            }
            if(data){
                if(data[0].userid){
                    this.submitMethod('手工指定',data[0].userid);
                }
            }
        },
        //关注点击事件
        basefollow(){
            let selectData=[];
            if(!this.isOa){
                selectData = this.rowWAADataObj.selectData;
            }else{
                selectData.push(this.rowWAADataObj);
            }
            let subject=selectData[0].fsubject;
            subject= subject.substring(0,3);
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
                        this.reload();
                        this.$message.success('添加关注成功!');
                        this.$emit('changeShow',false);
                        //this.WFMtypeoptions=returndata.data.rows;
                    } else {
                        this.$message.success('数据库没有该条数据!');
                    }
                });
            }
        },
        //已阅处理
        removeBizMail(){
            let selectData=[];
            if(!this.isOa){
                selectData = this.rowWAADataObj.selectData;
            }else{
                selectData.push(this.rowWAADataObj);
            }
            let fromdata={};
            fromdata.bizMailId=selectData[0].foid;
            fromdata.currUserId=localStorage.getItem("ms_userId");
            this.$api.processSet.removeBizMail(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue.code != 999) {
                    this.reload();
                    this.$message.success('已阅成功!');
                    this.$emit('changeShow',false);
                    //this.WFMtypeoptions=returndata.data.rows;
                } else {
                    this.$message.error(responsevalue.msg+'!');
                }
            });
        },
        //获取审核消息
        getDataprocess(data){
            let DataF={};
            DataF.foid=data;
            return this.$api.processSet.getAuditAndReplyMsg(DataF).then(res=>{
                if(res.data.code ==0){
                    this.rowDataprocessObj=res.data.data;
                }else{
                    this.rowDataprocessObj=[];
                }
            },error=>{
                console.log(error)
            })
        },
        //判断转发 或委托
        getDataType(data){
            let DataF={};
            DataF.bizmailId=data;
            DataF.currentUserId=localStorage.getItem("ms_userId");
            return this.$api.processSet.getWFBizMailInfoByUserId(DataF).then(res=>{
                if(res.data.code == 0){
                    let SetelData=res.data.data;
                    this.rowFstatus=SetelData.fstatus;
                }
            },error=>{
                console.log(error)
            })
        },
        //获取决策类型数据
        getDecisionType(data){
            let DataF={};
            DataF.mailId = data;
            return this.$api.processSet.getWfDecisionTypeConByCurNode(DataF).then(res=>{
                if(res.data.code == 0){
                    let SetelData=res.data.data;
                    this.fresultArray = Object.keys(SetelData);
                    this.fresultObject = res.data.data;
                }
            },error=>{
                console.log(error)
            })
        },
        //异步变同步
        async asyncCall(type,data,foid) {
            await this.getDataprocess(foid);
            await this.getDataType(foid);
            await this.getDecisionType(foid);
            await this.DisplayOrHide(this.functionType,this.rowWAADataObj);
            return;
        },

        prints(){
            var prints = document.getElementById('print');
            prints.title = "标题";

        }
    },
    mounted() {

    },
    watch:{
        rowWAAtype(oldVal,newVal){
            this.formdata.remark = "";
            if(this.rowWAAtype){
                let formDataA ={};
                if(!this.isOa){
                    this.title=this.rowWAADataObj.nametitle;
                    let finandata=this.rowWAADataObj.selectData;
                    let rowData= {};
                    rowData.finanrowname = finandata[0].fsrcCompany+"/"+finandata[0].factivityName;
                    rowData.finanrowId = finandata[0].foid;
                    rowData.nametitle = finandata[0].fsubject;
                    this.rowDataprocessOid=rowData;
                    formDataA.oid=finandata[0].foid;
                    formDataA.userId=localStorage.getItem("ms_userId");
                } else {
                    let rowData= {};
                    rowData.finanrowname = this.rowWAADataObj.fsrcCompany+"/"+this.rowWAADataObj.factivityName;
                    rowData.finanrowId = this.rowWAADataObj.foid;
                    rowData.nametitle = this.rowWAADataObj.fsubject;
                    this.rowDataprocessOid=rowData;
                    formDataA.oid= this.rowWAADataObj.fsrcoId;
                    formDataA.userId=localStorage.getItem("ms_userId");
                    this.title = "入库申请申请人审批";
                }
                this.$api.processSet.getunhandledTask(formDataA).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data;
                        this.asyncCall(this.functionType,this.rowWAADataObj,this.rowDataprocessOid.finanrowId);
                        this.ShowFinancVisible=this.rowWAAtype;
                    } else {
                        this.$message.success('数据库没有该条数据!');
                    }
                });
            }
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
