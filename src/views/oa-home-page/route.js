const oaCompanyHome = () => import('./company-home.vue');
const oaPersonalHome = () => import('./personal-home.vue');
const OaHome = [
    {
        path: 'oaCompanyHome',
        name: 'oaCompanyHome',
        component: oaCompanyHome,
        meta: {
            title: '集团门户'
        }
    },
    {
        path: 'oaPersonalHome',
        name: 'oaPersonalHome',
        component: oaPersonalHome,
        meta: {
            title: '个人门户'
        }
    },
   
];
export default OaHome;
