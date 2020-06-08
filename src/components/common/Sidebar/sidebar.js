class ITEMData {
    constructor() {
        this.ITEMAdmin = [
            {
                index: 'Process',
                title: '流程设置',
                subs: [
                    {
                        index: 'workProcess',
                        title: '工作流程维护',
                    },
                    {
                        index: 'workflowMonitoring',
                        title: '工作流监控',
                    },
                    {
                        index: 'todolist',
                        title: '待办事项',
                    },
                    {
                        index: 'concernsItemList',
                        title: '关注事项',
                    },
                    {
                        index: 'businessProcess',
                        title: '流程业务',
                    },
                ]
            },
            {
                index: 'Finance',
                title: '融资管理',
                subs: [
                    {
                        index: 'FinanceData',
                        title: '融资合同基础数据',
                        subs: [
                            {
                            index: 'creditType',
                            title: '授信品种'
                            },
                            {
                            index: 'creditVarietie',
                            title: '用信品种'
                            },
                            {
                            index: 'InterestPayment',
                            title: '付息方式'
                            },
                            {
                            index: 'pledgeType',
                            title: '质押物类型'
                            }
                        ]
                    },
                    {
                        index: 'FinanceRegistration',
                        title: '融资合同',
                        subs: [
                            {
                            index: 'financingContractRegistration',
                            title: '综合授信合同登记'
                            },
                            {
                            index: 'financingContractAdjustment',
                            title: '综合授信合同调整'
                            },
                            {
                            index: 'creditContractRegistration',
                            title: '用信合同登记'
                            }
                        ]
                    }
                ]
            }
        ];
        this.ITEMother = [];
    };
}
export default ITEMData