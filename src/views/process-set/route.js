const workProcesspage = () => import('./work-process.vue');
const businessProcesspage = () => import('./process-business.vue');
const workflowMonitorn = () => import('./workflow-monitoring.vue');
const todolist = () => import('./to-do-list.vue');
const concernsItemlist = () => import('./concerns-item-list.vue');
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
        path: 'concernsItemList',
        name: 'concernsItemList',
        component: concernsItemlist,
        meta: {
            title: '关注事项'
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
