const insideMailCommon = () => import('./inside-mail-common.vue');
const newMailMessage = ()=> import('./new-mail-message.vue');

const InsideMail = [
    {
        path: 'insideMailCommon',
        name: 'insideMailCommon',
        component: insideMailCommon,
        meta: {
            title: '内部邮件'
        }
    },
    {
        path: 'newMailMessage',
        name: 'newMailMessage',
        component: newMailMessage,
        meta: {
            title: '写信'
        }
    }
];

export default InsideMail;
