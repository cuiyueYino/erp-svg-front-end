const creditTypepage = () => import(/* webpackChunkName: "task-context" */ './BasicData/credit-type.vue');
const creditvarietiespage = () => import(/* webpackChunkName: "task-context" */ './BasicData/credit-varieties.vue');
const InterestPaymentMethod = () => import(/* webpackChunkName: "task-context" */ './BasicData/Interest-payment-method.vue');
const pledgeTypepage = () => import(/* webpackChunkName: "task-context" */ './BasicData/pledge-type.vue');
const FCRegistration = () => import(/* webpackChunkName: "task-context" */ './FinancingContract/financing-contract-Registration.vue');
const PROJECT = [
    {
        path: 'creditType',
        name: 'creditType',
        component: creditTypepage,
        meta: {
            title: '授信品种'
        }
    },
    {
        path: 'creditVarietie',
        name: 'creditVarietie',
        component: creditvarietiespage,
        meta: {
            title: '用信品种'
        }
    },
    {
        path: 'InterestPayment',
        name: 'InterestPayment',
        component: InterestPaymentMethod,
        meta: {
            title: '付息方式'
        }
    },
    {
        path: 'pledgeType',
        name: 'pledgeType',
        component: pledgeTypepage,
        meta: {
            title: '质押物类型'
        }
    },
    {
        path: 'financingContractRegistration',
        name: 'financingContractRegistration',
        component: FCRegistration,
        meta: {
            title: '综合授信合同登记'
        }
    },
];
export default PROJECT;
