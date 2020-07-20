export function NodeConfig () {
    return {
        start: {
            width: 55,
            height: 55,
            color: '#67C23A',
            allowIn: true,
            allowOut: true
        },
        end: {
            width: 55,
            height: 55,
            color: '#F56C6C',
            allowIn: true,
            allowOut: false
        },
        task: {
            width: 40,
            height: 40,
            color: '#25a3fd',
            visible: false
        },
        condition: {
            width: 120,
            height: 76,
            visible: false,
            color: '#f39c43'
        },
        fork: {
            width: 120,
            height: 76,
            visible: false,
            color: '#1ab4e2'
        },
        join: {
            width: 120,
            height: 76,
            visible: false,
            color: '#909399'
        },
        process: {
            width: 120,
            height: 76,
            visible: false,
            color: '#9389fb'
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
                x: 350,
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
            type: 'Task',
            name: '路由',
            icon: 'el-icon-setting',
            options: {
                ...nodeConfig.task,
                x: 0,
                y: 0,
                draggable: true
            },
            data: {
                name: 'Task',
                displayName: '路由',
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
                displayName: '手工活动'
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
                displayName: '自由活动'
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
                displayName: '审核活动'
            }
        },
        {
            type: 'Process',
            name: '子流程',
            icon: 'el-icon-connection',
            options: {
                ...nodeConfig.process,
                x: 0,
                y: 0,
                draggable: true
            },
            data: {
                name: 'Process',
                displayName: '子流程'
            }
        }
    ];
};
