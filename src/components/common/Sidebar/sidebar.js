class ITEMData {
    constructor() {
        this.ITEMother = [{
                index: 'Business',
                title: '业务协同',
                subs: [{
                    index: 'insideMailCommon',
                    title: '内部邮件',
                }]
            },
            {
                index: 'workItems',
                title: '工作事项',
                subs: [{
                        index: 'templateMainTableClassification',
                        title: '工作事项模板主表分类',
                    },
                    {
                        index: 'templateMainTable',
                        title: '工作事项模板主表',
                    },
                    {
                        index: 'templateMainTableClassificationChild',
                        title: '工作事项模板子表分类',
                    },
                    {
                        index: 'templateMainTableChild',
                        title: '工作事项模板子表',
                    }
                ]
            },
            {
                index: 'systemManagement',
                title: '系统管理',
                subs: [{
                    index: 'systemSettings',
                    title: '系统设置',
                    subs: [{
                        index: 'enumerationList',
                        title: '枚举内容',
                    }]
                }]
            }
        ];
        this.ITEMAUAT = [{
                index: 'Mydesk',
                title: '我的办公桌',
                subs: [{
                        index: 'todolist',
                        title: '待办事项',
                    },
                    {
                        index: 'concernsItemList',
                        title: '关注事项',
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
                index: 'togetherWorking',
                title: '协同办公',
                subs: [{
                        index: 'confMangement',
                        title: '会议管理',
                        subs: [{
                                index: 'confOffice',
                                title: '会议室'
                            },
                            {
                                index: 'confApply',
                                title: '会议室申请'
                            },
                            {
                                index: 'confUsageDetail',
                                title: '会议室使用详情'
                            }
                        ]
                    },
                    {
                        index: 'insideMailCommon',
                        title: '内部邮件',
                    },
                    {
                        index: 'workItems',
                        title: '工作事项',
                        subs: [{
                                index: 'templateMainTableClassification',
                                title: '主表分类模板',
                            },
                            {
                                index: 'templateMainTable',
                                title: '主表模板',
                            },
                            {
                                index: 'templateMainTableClassificationChild',
                                title: '子表分类模板',
                            },
                            {
                                index: 'templateMainTableChild',
                                title: '子表模板',
                            },
                            {
                                index: 'workItems',
                                title: '工作事项',
                            },
                            {
                                index: 'workItemsToGrant',
                                title: '工作事项模板授权',
                                subs: [{
                                    index: 'templateAuthorizationRole',
                                    title: '模板角色授权',
                                }, {
                                    index: 'templateAuthorizationPersonnel',
                                    title: '模板人员授权',
                                }]
                            }
                        ]
                    },
                    {
                        index: 'documentManagement',
                        title: '文档管理',
                        subs: [{
                                index: 'docCategory',
                                title: '文档类别维护'
                            },
                            {
                                index: 'docManage',
                                title: '文档管理'
                            },
                            {
                                index: 'docAuthority',
                                title: '文档授权'
                            },
                            {
                                index: 'docBrowse',
                                title: '文档浏览'
                            }
                        ]
                    },
                ]
            },
            {
                index: 'systemManagement',
                title: '系统管理',
                subs: [{
                        index: 'systemSettings',
                        title: '系统设置',
                        subs: [{
                                index: 'enumerationList',
                                title: '枚举内容',
                            },
                            {
                                index: 'menuManagement',
                                title: '功能菜单'
                            },
                        ]
                    },
                    {
                        index: 'Management',
                        title: '组织机构',
                        subs: [{
                                index: 'organizationManagement',
                                title: '组织机构维护'
                            },
                            {
                                index: 'workBusiGroup',
                                title: '工作业务组'
                            },
                            /*{
                            	index: 'proBusiGroup',
                            	title: '流程业务组'
                            },*/
                            {
                                index: 'businessProcess',
                                title: '流程业务组',
                            },
                            {
                                index: 'peopleSet',
                                title: '人员维护'
                            },
                            {
                                index: 'jobSet',
                                title: '职务维护'
                            },
                            {
                                index: 'positionType',
                                title: '职务类型维护'
                            }
                        ]
                    },
                    {
                        index: 'Process',
                        title: '流程设置',
                        subs: [{
                                index: 'workProcess',
                                title: '工作流程维护',
                            },
                            {
                                index: 'workflowMonitoring',
                                title: '工作流监控',
                            },
                        ]
                    },
                    {
                        index: 'userManagement',
                        title: '用户管理',
                        subs: [{
                                index: 'userSet',
                                title: '用户管理'
                            }

                        ]
                    },
                    {
                        index: 'roleManagement',
                        title: '权限管理',
                        subs: [{
                                index: 'rolemaintenance',
                                title: '角色维护'
                            },
                            {
                                index: 'rolemaintenancecategory',
                                title: '角色类别维护'
                            },
                            {
                                index: 'userAuthorization',
                                title: '用户授权'
                            },
                        ]
                    },
                ]
            },
            {
                index: 'OaHome',
                title: '门户首页',
                subs: [{
                    index: 'oaCompanyHome',
                    title: '集团门户',
                }, {
                    index: 'oaPersonalHome',
                    title: '个人门户',
                }]
            },
        ];
        this.ITEMoa = [{
                index: 'oaCompanyHome',
                title: '集团门户',
            },
            {
                index: 'oaPersonalHome',
                title: '个人门户',
            }
        ];
    };
}
export default ITEMData;