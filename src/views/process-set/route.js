const workProcesspage = () => import('./work-process.vue');
const businessProcesspage = () => import('./process-business.vue');

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
        path: 'businessProcess',
        name: 'businessProcess',
        component: businessProcesspage,
        meta: {
            title: '流程业务'
        }
    },
    
];
export default PROJECT;
