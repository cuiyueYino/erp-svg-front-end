const userManagement = () => import('./user-set.vue');
const Users = [
    {
        path: 'userSet',
        name: 'userSet',
        component: userManagement,
        meta: {
            title: '用户管理'
        }
    },
   
];
export default Users;
