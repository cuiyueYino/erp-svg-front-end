const creditTypepage = () => import(/* webpackChunkName: "task-context" */ './BasicData/credit-type.vue');
const PROJECT = [
    {
        path: 'creditType',
        name: 'creditType',
        component: creditTypepage,
        meta: {
            title: '授信品种'
        }
    }
];
export default PROJECT;
