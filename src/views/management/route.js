const organManage = () => import('./organization-management.vue');
const MANAGEMENT = [
    {
        path: 'organizationManagement',
        name: 'organizationManagement',
        component: organManage,
        meta: {
            title: '组织机构维护'
        }
    },
];
export default MANAGEMENT;
