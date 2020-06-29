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
                    {
                        index: 'issuedItems',
                        title: '已发事项',
                    },
                    {
                        index: 'workdoneItemList',
                        title: '已办事项',
                    },
                    {
                        index: 'recycleBin',
                        title: '回收站',
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
            },
            {
                index: 'userManagement',
                title: '用户管理',
                subs: [
                    {
                    index: 'userSet',
                    title: '用户管理'
                    }
                   
                ]
            },
            {
                index: 'jobManagement',
                title: '职务管理',
                subs: [
                    {
                    index: 'jobSet',
                    title: '职务管理'
                    }
                   
                ]
            },
            {
                index: 'peopleManagement',
                title: '人员管理',
                subs: [
                    {
                    index: 'peopleSet',
                    title: '人员管理'
                    }
                   
                ]
            },
            {
                index: 'Management',
                title: '组织机构',
                subs: [
                    {
                    index: 'organizationManagement',
                    title: '组织机构维护'
                    },
                    {
                    index: 'rolemaintenance',
                    title: '角色维护'
                    }
                ]
            },
            
        ];
        this.ITEMother = [];
    };
}
export default ITEMData