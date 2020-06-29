const menuManage = () => import('./menu-management.vue');
const MenuMen = [
    {
        path: 'menuManagement',
        name: 'menuManagement',
        component: menuManage,
        meta: {
            title: '功能菜单'
        }
    },
];
export default MenuMen;
