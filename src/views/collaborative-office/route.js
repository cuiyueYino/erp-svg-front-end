const templateMainTableClassification = () => import('./template-main-table-classification.vue');
const templateMainTable = () => import('./template-main-table.vue');
const aaaa = () => import('./aaaa.vue');

const InsideMail = [
    {
        path: 'templateMainTableClassification',
        name: 'templateMainTableClassification',
        component: templateMainTableClassification,
        meta: {
            title: '工作事项模板主表分类'
        }
    },
    {
        path: 'templateMainTable',
        name: 'templateMainTable',
        component: templateMainTable,
        meta: {
            title: '工作事项模板主表分类'
        }
    },
    {
        path: 'aaaa',
        name: 'aaaa',
        component: aaaa,
        meta: {
            title: '工作事项模板主表分类'
        }
    }
];

export default InsideMail;
