const workProcesspage = () => import('./work-process.vue');
const businessProcesspage = () => import('./process-business.vue');
const workflowMonitorn = () => import('./workflow-monitoring.vue');
const todolist = () => import('./to-do-list.vue');
const concernsItemlist = () => import('./concerns-item-list.vue');
const issuedItems =() => import('./issued-items')
const workdoneItemList =() => import('./work-done-items');
const recycleBin =()=> import('./recycle-bin')
const structure = () => import('./task-structure.vue');
const temporaryMission = () => import('./temporary-mission.vue');
const coordinationTask = () => import('./coordination-task.vue');
const annualPlan = () => import('./annual-plan.vue');
const companyAnnual = () => import('./company-annual.vue');
const monthlyPlan = () => import('./monthly-plan.vue');
const personalTableTask = () => import('./personal-table-task.vue');
const summaryEmployeeEvaluation = () => import('./summary-employee-evaluation.vue');
const employeeAppraisal = () => import('./employee-appraisal.vue');
const indexLibrary = () => import('./index-library.vue');
const postBid = () => import('./post-bid.vue'); 
const setEndDate = () => import('./set-endDate.vue'); 
const billType = () => import('./bill-type.vue'); 
const paramType = () => import('./param-type.vue'); 
const version = () => import('./version.vue'); 
const indexProportion = () => import('./index-proportion.vue'); 
const reAndPuLibrary = () => import('./re-and-puLibrary.vue'); 
const paramsLibrary = () => import('./params-library.vue'); 
const indexClassification = () => import('./index-classification.vue'); 
const emphasisLevel = () => import('./emphasis-level.vue'); 
const rewardPunishmentType = () => import('./reward-punishment-type.vue'); 
const taskUpdateApply = () => import('./task-update-apply.vue'); 
const taskEvaluate = () => import('./task-evaluate.vue'); 
const personalTableResult = () => import('./personal-table-result.vue'); 
const changeResponsible = () => import('./change-responsible.vue');
const taskForceChangeRequest = () => import('./task-force-changeRequest.vue');
const taskOverTime = () => import('./task-over-time.vue');
const companyMonth = () => import('./company-month.vue');
const summaryEconomicIndicators = () => import('./summary-economic-indicators.vue');
const vetoDeduction = () => import('./veto-deduction.vue');
const optionApplication = () => import('./option-application.vue');
const economicIndicators = () => import('./economic-indicators.vue');
const rewardsApply = () => import('./rewards-apply.vue');
const optionRecord = () => import('./option-record.vue');
const recordOfLossesIncurred = () => import('./recordOf-lossesIncurred.vue');
const taskGeneralTable = () => import('./taskGeneral-table.vue');
const quantificationOfPlannedTasks = () => import('./quantification-ofPlannedTasks.vue');
const taskStatus = () => import('./task-status.vue');
const taskExtensionApproval = () => import('./task-extensionApproval.vue');
const temporaryTaskEstablishment = () => import('./temporary-taskEstablishment.vue');

const PROJECT = [
    {
        path: 'workProcess',
        name: 'workProcess',
        component: workProcesspage,
        meta: {
            title: '工作流程维护'
        }
    },
    { 
        path: 'workflowMonitoring',
        name: 'workflowMonitoring',
        component: workflowMonitorn,
        meta: {
            title: '工作流监控'
        }
    },
    {
        path: 'todolist',
        name: 'todolist',
        component: todolist,
        meta: {
            title: '待办事项'
        }
    },
    {
        path: 'taskStructure',
        name: 'taskStructure',
        component: structure,
        meta: {
            title: '任务结构编制'
        }
    },
    {
        path: 'temporaryMission',
        name: 'temporaryMission',
        component: temporaryMission,
        meta: {
            title: '临时任务派发'
        }
    },
    {
        path: 'coordinationTask',
        name: 'coordinationTask',
        component: coordinationTask,
        meta: {
            title: '配合任务'
        }
    },
    {
        path: 'annualPlan',
        name: 'annualPlan',
        component: annualPlan,
        meta: {
            title: '部门年度计划'
        }
    },
    {
        path: 'companyAnnual',
        name: 'companyAnnual',
        component: companyAnnual,
        meta: {
            title: '公司年度计划汇总'
        }
    },
    {
        path: 'monthlyPlan',
        name: 'monthlyPlan',
        component: monthlyPlan,
        meta: {
            title: '部门月度计划'
        }
    },
    {
        path: 'postBid',
        name: 'postBid',
        component: postBid,
        meta: {
            title: '一岗一表'
        }
    },
    {
        path: 'personalTableTask',
        name: 'personalTableTask',
        component: personalTableTask,
        meta: {
            title: '一人一表任务表'
        }
    },
    {
        path: 'summaryEmployeeEvaluation',
        name: 'summaryEmployeeEvaluation',
        component: summaryEmployeeEvaluation,
        meta: {
            title: '员工考评表汇总'
        }
    },
    {
        path: 'employeeAppraisal',
        name: 'employeeAppraisal',
        component: employeeAppraisal,
        meta: {
            title: '员工考评表'
        }
    },
    {
        path: 'concernsItemList',
        name: 'concernsItemList',
        component: concernsItemlist,
        meta: {
            title: '关注事项'
        }
    },
    {
        path: 'workdoneItemList',
        name: 'workdoneItemList',
        component: workdoneItemList,
        meta: {
            title: '已办事项'
        }
    },
    {
        path: 'issuedItems',
        name: 'issuedItems',
        component: issuedItems,
        meta: {
            title: '已发事项'
        }
    },
    {
        path: 'recycleBin',
        name: 'recycleBin',
        component: recycleBin,
        meta: {
            title: '回收站'
        }
    },
    {
        path: 'businessProcess',
        name: 'businessProcess',
        component: businessProcesspage,
        meta: {
            title: '流程业务'
        }
    },
    {
        path: 'indexLibrary',
        name: 'indexLibrary', 
        component: indexLibrary,
        meta: {
            title: '指标库'
        }
    },
    {
        path: 'setEndDate',
        name: 'setEndDate',
        component: setEndDate,
        meta: {
            title: '临时任务完成天数设定'
        }
    },
    {
        path: 'billType',
        name: 'billType',
        component: billType,
        meta: {
            title: '挂账类型'
        }
    },
    {
        path: 'paramType',
        name: 'paramType',
        component: paramType,
        meta: {
            title: '参数类别'
        }
    },
    {
        path: 'version',
        name: 'version',
        component: version,
        meta: {
            title: '版本设定'
        }
    },
    {
        path: 'indexProportion',
        name: 'indexProportion',
        component: indexProportion,
        meta: {
            title: '指标比例'
        }
    },
    {
        path: 'reAndPuLibrary',
        name: 'reAndPuLibrary',
        component: reAndPuLibrary,
        meta: {
            title: '奖惩库'
        }
    },
    {
        path: 'paramsLibrary',
        name: 'paramsLibrary',
        component: paramsLibrary,
        meta: {
            title: '参数库'
        }
    },
    {
        path: 'indexClassification',
        name: 'indexClassification',
        component: indexClassification,
        meta: {
            title: '指标分类'
        }
    },
    {
        path: 'emphasisLevel',
        name: 'emphasisLevel',
        component: emphasisLevel,
        meta: {
            title: '重点级别'
        }
    },
    {
        path: 'rewardPunishmentType',
        name: 'rewardPunishmentType',
        component: rewardPunishmentType,
        meta: {
            title: '奖惩类别'
        }
    },
    {
        path: 'taskUpdateApply',
        name: 'taskUpdateApply',
        component: taskUpdateApply,
        meta: {
            title: '任务自评修改申请'
        }
    },
    {
        path: 'taskEvaluate',
        name: 'taskEvaluate',
        component: taskEvaluate,
        meta: {
            title: '任务自评流程查看'
        }
    },
    {
        path: 'personalTableResult',
        name: 'personalTableResult',
        component: personalTableResult,
        meta: {
            title: '一人一表结果表'
        }
    },
    {
        path: 'changeResponsible',
        name: 'changeResponsible',
        component: changeResponsible,
        meta: {
            title: '责任人变更'
        }
    },
    {
        path: 'taskForceChangeRequest',
        name: 'taskForceChangeRequest',
        component: taskForceChangeRequest,
        meta: {
            title: '任务人员变更申请-部门'
        }
    },
    {
        path: 'taskOverTime',
        name: 'taskOverTime',
        component: taskOverTime,
        meta: {
            title: '任务过期时间'
        }
    },
    {
        path: 'companyMonth',
        name: 'companyMonth',
        component: companyMonth,
        meta: {
            title: '公司月度计划汇总'
        }
    },
    {
        path: 'summaryEconomicIndicators',
        name: 'summaryEconomicIndicators',
        component: summaryEconomicIndicators,
        meta: {
            title: '经济指标汇总'
        }
    },
    {
        path: 'vetoDeduction',
        name: 'vetoDeduction',
        component: vetoDeduction,
        meta: {
            title: '否决、扣减项库'
        }
    },
    {
        path: 'optionApplication',
        name: 'optionApplication',
        component: optionApplication,
        meta: {
            title: '期权修改申请'
        }
    },
    {
        path: 'economicIndicators',
        name: 'economicIndicators',
        component: economicIndicators,
        meta: {
            title: '经济指标'
        }
    },
    {
        path: 'rewardsApply',
        name: 'rewardsApply',
        component: rewardsApply,
        meta: {
            title: '奖惩情况申请'
        }
    },
    {
        path: 'optionRecord',
        name: 'optionRecord',
        component: optionRecord,
        meta: {
            title: '期权记录'
        }
    },
    {
        path: 'recordOfLossesIncurred',
        name: 'recordOfLossesIncurred',
        component: recordOfLossesIncurred,
        meta: {
            title: '挂账情况记录表'
        }
    },
    {
        path: 'taskGeneralTable',
        name: 'taskGeneralTable',
        component: taskGeneralTable,
        meta: {
            title: '任务情况通用表'
        }
    },
    {
        path: 'quantificationOfPlannedTasks',
        name: 'quantificationOfPlannedTasks',
        component: quantificationOfPlannedTasks,
        meta: {
            title: '计划任务量化统计表'
        }
    },
    {
        path: 'taskStatus',
        name: 'taskStatus',
        component: taskStatus,
        meta: {
            title: '计划情况表'
        }
    },
    {
        path: 'taskExtensionApproval',
        name: 'taskExtensionApproval',
        component: taskExtensionApproval,
        meta: {
            title: '任务延期审批'
        }
    },
    {
        path: 'temporaryTaskEstablishment',
        name: 'temporaryTaskEstablishment',
        component: temporaryTaskEstablishment,
        meta: {
            title: '临时任务编制情况表'
        }
    },
    
    
];
export default PROJECT;
