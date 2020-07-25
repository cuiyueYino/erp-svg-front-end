const confOffice = () => import('./conference-office.vue');
const confApply = () => import('./conference-apply.vue');
const confUsageDetail = () => import('./conference-usage-detail.vue');

const confMangement = [
    {
        path: 'confOffice',
        name: 'confOffice',
        component: confOffice,
        meta: {
            title: '会议室'
        }
    },
    {
        path: 'confApply',
        name: 'confApply',
        component: confApply,
        meta: {
            title: '会议申请'
        }
    },
    {
        path: 'confUsageDetail',
        name: 'confUsageDetail',
        component: confUsageDetail,
        meta: {
            title: '会议室使用详情'
        }
    }
   
];
export default confMangement;
