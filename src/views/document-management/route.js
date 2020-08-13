const docCategoryPage = () => import('./category/doc-category.vue');

const docManagePage = () => import('./manage/doc-manage.vue');

const docAuthorityPage = () => import('./authority/doc-authority.vue');

const docBrowsePage = () => import('./browse/doc-browse.vue');

const Document = [
    {
        path: 'docCategory',
        name: 'docCategory',
        component: docCategoryPage,
        meta: {
            title: '文档类别维护'
        }
    },
    {
        path: 'docManage',
        name: 'docManage',
        component: docManagePage,
        meta: {
            title: '文档管理'
        }
    },
    {
        path: 'docAuthority',
        name: 'docAuthority',
        component: docAuthorityPage,
        meta: {
            title: '文档授权'
        }
    },
    {
        path: 'docBrowse',
        name: 'docBrowse',
        component: docBrowsePage,
        meta: {
            title: '文档浏览'
        }
    },
   
];
export default Document;