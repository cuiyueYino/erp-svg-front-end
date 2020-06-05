//
import { NodeConfig } from './flow-config';


export default {
    data () {
        return {
            //
            anchorWidth: 16,
            //
            saveBtnStatus: true,
            //
            turningDistance: 50
        };
    },
    computed: {
        // 绘制辅助路径
        assistedLine () {
            if (this.assistedLineStart === '' && this.assistedLineEnd === '') {
                return '';
            }
            const STX = this.assistedLineStart.split(',')[0];
            const STY = this.assistedLineStart.split(',')[1];
            const ENX = this.assistedLineEnd.split(',')[0];
            const ENY = this.assistedLineEnd.split(',')[1];
            if (STX === ENX) {
                return `${this.assistedLineStart} ${this.assistedLineEnd}`;
            } else {
                const turningPoint = (Number(ENY) - Number(STY)) / 2 + Number(STY);
                if (isNaN(turningPoint)) return;
                return `${this.assistedLineStart} ${STX},${turningPoint} ${ENX},${turningPoint} ${this.assistedLineEnd}`;
            }
        },
        // 计算生成连接线数组
        lineData: {
            get () {
                this.linkData.map(item => {
                    if (Object.keys(item).length > 2) {
                        // 添加连接线类型
                        item.type = 'Line';
                        // 获取连接线连接点坐标 以及连接线文本偏移量
                        const { coordinate, textAlign } = this.endToEndLink(item);
                        // 设置连接线连接点坐标
                        item.coordinate = coordinate;
                        // 设置连接线文本偏移
                        item.left = textAlign[0];
                        item.top = textAlign[1];
                        // 设置连接线唯一键
                        item.key = `${Date.parse(new Date())}_${Math.ceil(Math.random() * 99999)}`;
                    }
                });
                // 生成链接同时改变保存按钮状态
                this.changeBtnStatus(this.workflowNodes);
                // 返回非空对象的连接数组
                return this.linkData.filter(item => Object.keys(item).length > 0);
            },
            set () { }
        }
    },
    watch: {
        //
        workflowNodes: {
            handler (arr) {
                this.changeBtnStatus(arr);
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 解析节点后生成连接线
        async compileXMLToObj (dataObj) {
            
             // 解析成为XML格式数据
            const dataStr = await this.compileObjToXMLLoading(dataObj)
            // console.log(dataStr)
            const data = await this.compileNodes(dataStr);
            this.workflowNodes.map(item => {
                data.map(node => {
                    if (item.data.name === node.to.data.name) {
                        node.to = {
                            ...item,
                            target: node.to.target,
                            point: this.computedLinkPoint(item.options, node.to.target)
                        };
                        this.$set(this.linkData, this.linkData.length, node);
                    }
                    if (item.data.name === node.from.data.name) {
                        item.transition.push(node);
                    }
                });
            });
        },
         // 解析成为XML格式数据_加载
         compileObjToXMLLoading (obj) {
            //  debugger
            const finalWorkflow = obj.filter(item => Object.keys(item).length > 0);
            let compileXML = `
                <?xml version="1.0" encoding="UTF-8" standalone="no" ?>
                <process name="${obj.name}" displayName="${obj.displayName}">
            `;
            finalWorkflow.map(item => {
                const tagName = item.type.toLowerCase();
                let extend = '';
                if (item.type === 'Task') {
                    extend = ` assignee="apply.taskAssignee" performType="${item.data.type}"`;
                }
                compileXML += `<${tagName} layout="${item.options.x},${item.options.y}" name="${item.data.name}" displayName="${item.data.displayName}"${extend}>`;
                if (item.type !== 'End') {
                    item.transition.map(link => {
                        compileXML += `
                            <transition offset="${link.from.target},${link.to.target}" to="${link.to.data.name}" name="${link.data.name}" displayName="${link.data.displayName}" />
                        `;
                    });
                }
                compileXML += `</${tagName}>`;
            });
            compileXML += '</process>';
            console.log(compileXML)
            return compileXML;
        },
        // 解析成为XML格式数据_保存
        compileObjToXML (obj) {
            const finalWorkflow = this.workflowNodes.filter(item => Object.keys(item).length > 0);
            let compileXML = `
                <?xml version="1.0" encoding="UTF-8" standalone="no" ?>
                <process name="${obj.name}" displayName="${obj.displayName}">
            `;
            finalWorkflow.map(item => {
                const tagName = item.type.toLowerCase();
                let extend = '';
                if (item.type === 'Task') {
                    extend = ` assignee="apply.taskAssignee" performType="${item.data.type}"`;
                }
                compileXML += `<${tagName} layout="${item.options.x},${item.options.y}" name="${item.data.name}" displayName="${item.data.displayName}"${extend}>`;
                if (item.type !== 'End') {
                    item.transition.map(link => {
                        compileXML += `
                            <transition offset="${link.from.target},${link.to.target}" to="${link.to.data.name}" name="${link.data.name}" displayName="${link.data.displayName}" />
                        `;
                    });
                }
                compileXML += `</${tagName}>`;
            });
            compileXML += '</process>';
            return compileXML;
        },
        // 改变保存按钮状态
        changeBtnStatus (arr) {
            /* eslint-disable no-unused-vars */
            let flag = false;
            //
            for (let i = 0, len = arr.length; i < len; i++) {
                const item = arr[i];
                if (item.type !== 'End' &&
                    !Object.keys(item).some(val => val === 'transition')
                ) {
                    flag = true;
                    break;
                }
            }
            const newArr = arr.filter(item => Object.keys(item).length > 0);
            //
            this.saveBtnStatus = newArr.length === 2;
        },
        // 解析节点方法
        compileNodes (dataStr) {
            return new Promise((resolve, reject) => {
                const { upperCase } = this.$helpers;
                this.workflowNodes = [];
                // 需要解析的 xml 字符串
                // 从后端获取
                const str = dataStr;
                // debugger
                const newArr = [];
                // 创建文档对象
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(str, 'text/html');
                const process = xmlDoc.getElementsByTagName('process')[0];
                const target = process.children;
                // 设置流程模型配置数据
                this.$set(this.workflowData, 'name', process.attributes.name.nodeValue);
                this.$set(this.workflowData, 'displayName', process.attributes.displayName.nodeValue);
                // 获取节点数据
                for (let j = 0, len = target.length; j < len; j++) {
                    const { attributes, children, localName } = target[j];
                    //
                    const nodeConfig = NodeConfig();
                    //
                    let nodeObj = {};
                    //
                    nodeObj = {
                        type: upperCase(localName),
                        options: {
                            ...nodeConfig[localName],
                            x: Number(attributes.layout.nodeValue.split(',')[0]),
                            y: Number(attributes.layout.nodeValue.split(',')[1]),
                            draggable: true
                        },
                        data: {
                            name: attributes.name.nodeValue,
                            displayName: attributes.displayName.nodeValue
                        },
                        transition: [],
                        key: `${Date.parse(new Date())}_${Math.ceil(Math.random() * 99999)}`
                    };
                    if (localName === 'start') {
                        nodeObj.key = 'Start';
                    } else if (localName === 'end') {
                        nodeObj.key = 'End';
                    } else if (localName === 'task') {
                        nodeObj.data.performType = attributes.performType.nodeValue;
                    }
                    this.$set(this.workflowNodes, this.workflowNodes.length, nodeObj);
                    // 获取连接线数据
                    if (localName !== 'end') {
                        const linkObj = this.compileLink(localName, nodeObj, children);
                        newArr.push(linkObj);
                    }
                }
                resolve(newArr);
            });
        },
        // 解析连接线数据
        compileLink (name, obj, arr) {
            for (let t = 0, tLen = arr.length; t < tLen; t++) {
                const { attributes } = arr[t];
                //
                const nodeConfig = NodeConfig();
                //
                const nodeObj = nodeConfig[name];
                //
                const target = attributes.offset.nodeValue.split(',')[0];
                const toTarget = attributes.offset.nodeValue.split(',')[1];
                const toName = attributes.to.nodeValue;
                //
                const point = this.computedLinkPoint(nodeObj, target);
                //
                return {
                    from: {
                        ...obj,
                        target,
                        point
                    },
                    to: {
                        data: {
                            name: toName
                        },
                        target: toTarget
                    },
                    data: {
                        name: attributes.name.nodeValue,
                        displayName: attributes.displayName.nodeValue
                    },
                    key: `${Date.parse(new Date())}_${Math.ceil(Math.random() * 99999)}`,
                    lineEdit: true,
                    visible: false
                };
            }
        },
        // 计算连接点相对坐标
        computedLinkPoint (obj, param) {
            //
            if (param === 'T') {
                return [obj.width / 2, 0];
            } else if (param === 'R') {
                return [obj.width, obj.height / 2];
            } else if (param === 'B') {
                return [obj.width / 2, obj.height];
            } else {
                return [0, obj.height / 2];
            }
        },
        //
        dragStartEvent (event) {
            const evt = window.event || event;
            //
            const { browserType } = this.$helpers;
            if (browserType() === 'FF') {
                // 要给FF设置一堆东西才能执行拖拽~
                const key = `${Date.parse(new Date())}_${Math.ceil(Math.random() * 99999)}`;
                evt.dataTransfer.setData('flowNode', key);
            }
        },
        // 点到点连接线生成事件
        endToEndLink ({ from, to }) {
            if (typeof from === 'undefined' || typeof to === 'undefined') return;
            // 结构出发和到达目标对象
            const fromPoint = from.target;
            const STX = from.options.x + from.point[0];
            const STY = from.options.y + from.point[1];
            const ENX = to.options.x + to.point[0];
            const ENY = to.options.y + to.point[1];
            const toPoint = to.target;
            const { anchorWidth, turningDistance } = this;
            // 声明转折点横纵坐标 连接点字符 连接线文本偏移量
            const turningPointA = (STY + ENY) / 2;
            let turningPointB = (STX + ENX) / 2;
            let coordinate = '';
            let textAlign = [];
            // 起点到终点判断
            if (fromPoint === 'B') {
                if (toPoint === 'T') {
                    // B -> T
                    coordinate = `${STX},${STY} ${STX},${turningPointA} ${ENX},${turningPointA} ${ENX},${ENY - anchorWidth}`;
                    textAlign = [turningPointB - 40, turningPointA - 16];
                } else if (toPoint === 'L') {
                    // B -> L
                    coordinate = `${STX},${STY} ${STX},${turningPointA} ${ENX - turningDistance},${turningPointA} ${ENX - turningDistance},${ENY} ${ENX - anchorWidth},${ENY}`;
                    textAlign = [turningPointB - 60, turningPointA - 16];
                } else if (toPoint === 'R') {
                    // B -> R
                    coordinate = `${STX},${STY} ${STX},${turningPointA} ${ENX + turningDistance},${turningPointA} ${ENX + turningDistance},${ENY} ${ENX + anchorWidth},${ENY}`;
                    textAlign = [turningPointB - 20, turningPointA - 16];
                }
            } else if (fromPoint === 'R') {
                if (toPoint === 'T') {
                    // R -> T
                    coordinate = `${STX},${STY} ${STX + turningDistance},${STY} ${STX + turningDistance},${turningPointA} ${ENX},${turningPointA} ${ENX},${ENY - anchorWidth}`;
                    textAlign = [turningPointB - 20, turningPointA - 16];
                } else if (toPoint === 'L') {
                    // R -> L
                    coordinate = `${STX},${STY} ${turningPointB},${STY} ${turningPointB},${ENY} ${ENX - anchorWidth},${ENY}`;
                    textAlign = [turningPointB - 40, turningPointA - 16];
                } else if (toPoint === 'R') {
                    // R -> R
                    coordinate = `${STX},${STY} ${ENX + turningDistance},${STY} ${ENX + turningDistance},${ENY} ${ENX + anchorWidth},${ENY}`;
                    textAlign = [ENX + turningDistance - 40, turningPointA - 16];
                }
            } else if (fromPoint === 'L') {
                if (toPoint === 'T') {
                    // L -> T
                    coordinate = `${STX},${STY} ${STX - turningDistance},${STY} ${STX - turningDistance},${turningPointA} ${ENX},${turningPointA} ${ENX},${ENY - anchorWidth}`;
                    textAlign = [turningPointB - 70, turningPointA - 16];
                } else if (toPoint === 'L') {
                    // L -> L
                    coordinate = `${STX},${STY} ${STX - turningDistance},${STY} ${STX - turningDistance},${turningPointA} ${ENX - turningDistance},${turningPointA} ${ENX - turningDistance},${ENY} ${ENX - anchorWidth},${ENY}`;
                    textAlign = [turningPointB - 85, turningPointA - 16];
                } else if (toPoint === 'R') {
                    // L -> R
                    coordinate = `${STX},${STY} ${STX - turningDistance},${STY} ${STX - turningDistance},${turningPointA} ${ENX + turningDistance},${turningPointA} ${ENX + turningDistance},${ENY} ${ENX + anchorWidth},${ENY}`;
                    textAlign = [turningPointB - 40, turningPointA - 16];
                }
            } else if (fromPoint === 'T') {
                // 重新计算转折点横坐标
                turningPointB = ENX + turningDistance;
                if (toPoint === 'T') {
                    // T -> T
                    coordinate = `${STX},${STY} ${STX},${STY - turningDistance} ${turningPointB},${STY - turningDistance} ${turningPointB},${turningPointA} ${ENX},${turningPointA} ${ENX},${ENY - anchorWidth}`;
                    textAlign = [turningPointB - 40, turningPointA - 16];
                } else if (toPoint === 'L') {
                    // T -> L
                    coordinate = `${STX},${STY} ${STX},${STY - turningDistance} ${STX - from.options.width / 2 - turningDistance},${STY - turningDistance} ${STX - from.options.width / 2 - turningDistance},${ENY} ${ENX - anchorWidth},${ENY}`;
                    textAlign = [STX - from.options.width / 2 - turningDistance - 40, turningPointA - 16];
                } else if (toPoint === 'B') {
                    // T -> B
                    coordinate = `${STX},${STY} ${STX},${STY - turningDistance} ${STX - from.options.width / 2 - turningDistance},${STY - turningDistance} ${STX - from.options.width / 2 - turningDistance},${ENY + turningDistance} ${ENX},${ENY + turningDistance} ${ENX},${ENY + anchorWidth}`;
                    textAlign = [STX - from.options.width / 2 - turningDistance - 40, turningPointA - 16];
                } else if (toPoint === 'R') {
                    // T -> R
                    coordinate = `${STX},${STY} ${STX},${STY - turningDistance} ${turningPointB},${STY - turningDistance} ${turningPointB},${ENY} ${ENX + anchorWidth},${ENY}`;
                    textAlign = [turningPointB - 40, turningPointA - 16];
                }
            }
            // 返回计算生成连接线坐标字符 文本偏移量
            return {
                coordinate,
                textAlign
            };
        },
        // 配置节点 连接线 以及文件事件
        handleSaveEvent (obj) {
            if (this.saveFlag === 'workflow') {
                // 工作流文件配置
                // this.compileObjToXML(obj);
            } else if (this.saveFlag === 'line') {
                // 连接线配置
                const index = this.lineData.findIndex(item => item.key === this.selectedNode.key);
                // 设置连接线编辑标识
                this.$set(this.linkData[index], 'lineEdit', true);
                // 保存配置数据
                this.selectedNode.data = obj;
            } else {
                // 节点配置
                this.selectedNode.data = obj;
                // 更改节点信息 同步更新终点为当前配置节点的to属性
                this.workflowNodes.map(node => {
                    if (node.type !== 'End') {
                        if (node.transition) {
                            node.transition.map(item => {
                                if (item.to.key === this.selectedNode.key) {
                                    item.to.data = obj;
                                }
                            });
                        }
                    }
                });
            }
        },
        // 节点连接线按下事件
        handleMousedown (target, point, node) {
            //
            this.endObj = {};
            //
            const cx = node.options.x;
            const cy = node.options.y;
            this.assistedLineStart = `${cx + point[0]},${cy + point[1]}`;
            this.startObj = {
                ...node,
                point,
                target
            };
            // 绘制辅助连接线
            document.onmousemove = e => {
                const evt = window.event || e;
                this.assistedLineEnd = `${evt.clientX},${evt.clientY}`;
            };
            // 鼠标抬起 获取起始和终点节点对象
            document.onmouseup = () => {
                //
                node.transition = [];
                //
                this.assistedLineStart = this.assistedLineEnd = '';
                // 防止起点连接终点
                if (this.startObj.type === 'Start' && this.endObj.type === 'End') return false;
                // 防止节点自身连接点连接
                if (this.startObj.key === this.endObj.key) return false;
                //
                if (Object.keys(this.endObj).length > 0) {
                    this.linkData.push({
                        from: this.startObj,
                        to: this.endObj,
                        lineEdit: false
                    });
                    this.lineData.map((item, index) => {
                        if (item.from.key === node.key) {
                            node.transition.push(item);
                        }
                        // 添加连接线数据
                        if (!item.lineEdit) {
                            this.$set(item, 'data', {
                                name: 'Line',
                                displayName: '新建连接'
                            });
                        }
                        // 添加删除提示框标识
                        this.$set(item, 'visible', false);
                    });
                }
                //
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
        // 连接线点击配置事件
        linkLineConfig (obj) {
            // 缓存连接线数据
            this.selectedNode = obj;
            // 保存编辑标识
            this.nodeType = obj.type;
            // 设置保存标识
            this.saveFlag = 'line';
            // 打开配置对话框
            this.dialogVisible = true;
        },
        // 删除连接线事件
        linkLineDelete (line) {
            // 声明索引变量
            let index = -1;
            // 循环连接线数组
            for (let h = 0, hLen = this.linkData.length; h < hLen; h++) {
                if (this.linkData[h].from.key === line.from.key &&
                    this.linkData[h].to.key === line.to.key) {
                    // 当前循环起始对象键等于目标起始键 并且终止键终止键 则保存索引 并跳出循环体
                    index = h;
                    break;
                }
            }
            // 根据索引删除目标连接数据
            this.linkData.splice(index, 1);
        },
        // 点击保存工作流按钮执行事件
        saveWorkflow (workflowNodes) {console.log(workflowNodes)
            //
            this.selectedNode = {};
            // 设置保存标识
            this.saveFlag = 'workflow';
            // 清空配置类型
            this.nodeType = '';
            //
            this.$set(this.selectedNode, 'data', this.workflowData);
            // 打开配置对话框
            this.dialogVisible = true;
        }
    }
};
