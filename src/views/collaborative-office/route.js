const templateMainTableClassification = () => import('./template-main-table-classification.vue');
const templateMainTable = () => import('./template-main-table.vue');
const enumerationList = () => import('./enumerationList.vue');

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
        path: 'enumerationList',
        name: 'enumerationList',
        component: enumerationList,
        meta: {
            title: '枚举内容'
        }
    }
];

export default InsideMail;
