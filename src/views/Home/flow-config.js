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
            type: 'Task',
            name: '任务',
            icon: 'el-icon-plus-workflow',
            options: {
                ...nodeConfig.task,
                x: 0,
                y: 0,
                draggable: true
            },
            data: {
                name: 'Task',
                displayName: '新建任务',
                type: 'NORMAL'
            }
        },
        {
            type: 'Condition',
            name: '条件',
            icon: 'el-icon-plus-progress',
            options: {
                ...nodeConfig.condition,
                x: 0,
                y: 0,
                draggable: true
            },
            data: {
                name: 'Condition',
                displayName: '新建条件'
            }
        },
        {
            type: 'Fork',
            name: '分支',
            icon: 'el-icon-plus-supply-chain',
            options: {
                ...nodeConfig.fork,
                x: 0,
                y: 0,
                draggable: true
            },
            data: {
                name: 'Fork',
                displayName: '新建分支'
            }
        },
        {
            type: 'Join',
            name: '聚合',
            icon: 'el-icon-plus-param',
            options: {
                ...nodeConfig.join,
                x: 0,
                y: 0,
                draggable: true
            },
            data: {
                name: 'Join',
                displayName: '新建聚合'
            }
        }
    ];
};
