const roleManage = () => import('./role-maintenance.vue');
const RoleMen = [
    {
        path: 'rolemaintenance',
        name: 'rolemaintenance',
        component: roleManage,
        meta: {
            title: '角色维护'
        }
    },
];
export default RoleMen;
