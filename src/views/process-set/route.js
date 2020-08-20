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
        path: 'postBid',
        name: 'postBid',
        component: postBid,
        meta: {
            title: '一岗一表'
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
