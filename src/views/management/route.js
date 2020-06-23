const organManage = () => import('./organization-management.vue');
const MANAGEMENT = [
    {
        path: 'organizationManagement',
        name: 'organizationManagement',
        component: organManage,
        meta: {
            title: '工作流程维护'
        }
    },
];
export default MANAGEMENT;
