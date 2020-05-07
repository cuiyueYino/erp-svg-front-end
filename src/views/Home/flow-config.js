export function NodeConfig () {
    return {
        start: {
            width: 100,
            height: 100,
            color: '#67C23A',
            allowIn: false,
            allowOut: true
        },
        end: {
            width: 100,
            height: 100,
            color: '#F56C6C',
            allowIn: true,
            allowOut: false
        },
        task: {
            width: 200,
            height: 100,
            visible: false
        },
        condition: {
            width: 200,
            height: 100,
            visible: false,
            color: '#409EFF'
        },
        fork: {
            width: 200,
            height: 100,
            visible: false,
            color: '#E6A23C'
        },
        join: {
            width: 200,
            height: 100,
            visible: false,
            color: '#909399'
        },
        package: {
            width: 200,
            height: 100,
            visible: false,
        },
        router:{
            width: 200,
            height: 100,
            visible: false,
        }
    };
};

export function TerminalNode () {
    const nodeConfig = NodeConfig();
    return [
        {
            type: 'Start',
            options: {
                draggable: true,
                x: 300,
                y: 50,
                ...nodeConfig.start
            },
            data: {
                name: 'start',
                displayName: '开始'
            },
            key: 'Start'
        },
        {
            type: 'End',
            options: {
                draggable: true,
                x: 450,
                y: 50,
                ...nodeConfig.end
            },
            data: {
                name: 'end',
                displayName: '结束'
            },
            key: 'End'
        }
    ];
} ;

export function NodesData () {
    const nodeConfig = NodeConfig();
    return [
        {
            type: 'router',
            name: '路由',
            icon: 'el-icon-setting',
            options: {
                ...nodeConfig.router,
                x: 0,
                y: 0,
                draggable: true
            },
            data: {
                name: 'router',
                displayName: '新建路由',
                type: 'NORMAL'
            }
        },
        {
            type: 'package',
            name: '包',
            icon: 'el-icon-suitcase',
            options: {
                ...nodeConfig.package,
                x: 0,
                y: 0,
                draggable: true
            },
            data: {
                name: 'package',
                displayName: '新建包',
                type: 'NORMAL'
            }
        },
        {
            type: 'Task',
            name: '子流程',
            icon: 'el-icon-plus-workflow',
            options: {
                ...nodeConfig.task,
                x: 0,
                y: 0,
                draggable: true
            },
            data: {
                name: 'Subprocess',
                displayName: '新建子流程',
                type: 'NORMAL'
            }
        },
        {
            type: 'Condition',
            name: '手工活动',
            icon: 'el-icon-user',
            options: {
                ...nodeConfig.condition,
                x: 0,
                y: 0,
                draggable: true
            },
            data: {
                name: 'Condition',
                displayName: '新建手工活动'
            }
        },
        {
            type: 'Fork',
            name: '自由活动',
            icon: 'el-icon-plus-supply-chain',
            options: {
                ...nodeConfig.fork,
                x: 0,
                y: 0,
                draggable: true
            },
            data: {
                name: 'Fork',
                displayName: '新建自由活动'
            }
        },
        {
            type: 'Join',
            name: '审核活动',
            icon: 'el-icon-plus-param',
            options: {
                ...nodeConfig.join,
                x: 0,
                y: 0,
                draggable: true
            },
            data: {
                name: 'Join',
                displayName: '新建审核活动'
            }
        }
    ];
};
