const docCategoryPage = () => import('./doc-category.vue');
const Document = [
    {
        path: 'docCategory',
        name: 'docCategory',
        component: docCategoryPage,
        meta: {
            title: '文档类别维护'
        }
    },
   
];
export default Document;