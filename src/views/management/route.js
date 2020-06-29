const organManage = () => import('./organization-management.vue');
const workBusiGroup = () => import('./work-busi-group.vue');

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
        path: 'workBusiGroup',
        name: 'workBusiGroup',
        component: workBusiGroup,
        meta: {
            title: '工作业务组'
        }
    },
];
export default MANAGEMENT;
