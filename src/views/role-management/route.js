const roleManage = () => import('./role-maintenance.vue');
const roleManageCate = () => import('./role-maintenance-category.vue');
const RoleMen = [
    {
        path: 'rolemaintenance',
        name: 'rolemaintenance',
        component: roleManage,
        meta: {
            title: '角色维护'
        }
    },
    {
        path: 'rolemaintenancecategory',
        name: 'rolemaintenancecategory',
        component: roleManageCate,
        meta: {
            title: '角色类别维护'
        }
    },
];
export default RoleMen;
