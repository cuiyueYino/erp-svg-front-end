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

const postBid = () => import('./post-bid.vue'); 

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
];
export default PROJECT;
