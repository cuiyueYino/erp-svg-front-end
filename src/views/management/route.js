const organManage = () => import('./organization-management.vue');
const roleManage = () => import('./role-maintenance.vue');
const MANAGEMENT = [
    {
        path: 'organizationManagement',
        name: 'organizationManagement',
        component: organManage,
        meta: {
            title: '组织机构维护'
        }
    },
    {
        path: 'rolemaintenance',
        name: 'rolemaintenance',
        component: roleManage,
        meta: {
            title: '角色维护'
        }
    },
];
export default MANAGEMENT;
