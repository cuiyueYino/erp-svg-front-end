const jobManagement = () => import('./job-set.vue');
const Jobs = [
    {
        path: 'jobSet',
        name: 'jobSet',
        component: jobManagement,
        meta: {
            title: '职务管理'
        }
    },
   
];
export default Jobs;
