const jobManagement = () => import('./job-set.vue');
const positionType = () => import('./position-type.vue');
const Jobs = [
    {
        path: 'jobSet',
        name: 'jobSet',
        component: jobManagement,
        meta: {
            title: '职务管理'
        }
    },
    {
        path: 'positionType',
        name: 'positionType',
        component: positionType,
        meta: {
            title: '职务管理'
        }
    },
   
];
export default Jobs;
