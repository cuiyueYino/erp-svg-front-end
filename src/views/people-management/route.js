const peopleManagement = () => import('./people-set.vue');
const Peoples = [
    {
        path: 'peopleSet',
        name: 'peopleSet',
        component: peopleManagement,
        meta: {
            title: '人员管理'
        }
    },
   
];
export default Peoples;
