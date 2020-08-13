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
            get () {//console.log(this.linkData);//debugger
                this.linkData.map(item => {
                    if (Object.keys(item).length > 2) {//console.log(item)
                        // 添加连接线类型
                        item.type = 'Line';
                        // 获取连接线连接点坐标 以及连接线文本偏移量
                        const { coordinate, textAlign } = this.endToEndLink(item);
                        // 设置连接线连接点坐标
                        item.coordinate = coordinate;//console.log(coordinate)
                        // 设置连接线文本偏移
                        item.left = textAlign[0];
                        item.top = textAlign[1];
                        // 设置连接线唯一键
                        if(item.key){}else{
                            item.key = `${Date.parse(new Date())}_${Math.ceil(Math.random() * 99999)}`;
                        }
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
            // const dataStr = await this.compileObjToXMLLoading(dataObj);
            //let yData;
            let responData = await this.compileObjToXMLLoading(dataObj);
            this.compileNodes(responData).then(res=>{ //console.log(res);
                //遍历节点的返回值
                this.workflowNodes.map(item => {
                    //线置空，然后重新赋值
                    item.transition=[];
                    //遍历线的返回值
                    res.map(node => {//debugger
                        if (item.data.displayName === node.to.data.displayName) {
                            node.to = {
                                ...item,
                                target: node.to.target,
                                point: this.computedLinkPoint(item.options, node.to.target)
                            };
                            this.$set(this.linkData, this.linkData.length, node);
                        }
                        if (item.data.displayName === node.from.data.displayName) {
                            item.transition.push(node);//;console.log( item )
                        }
                    });
                });
            })
        },
        // 解析成为XML格式数据_加载
        compileObjToXMLLoading (obj) {
            return new Promise((resolve, reject) => {
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
                                <transition offset="${link.from.target},${link.to.target}" to="${link.to.data.displayName}" oid="${link.data.oid}" name="${link.data.name}" displayName="${link.data.displayName}" ></transition>`;
                        });
                    }
                    compileXML += `</${tagName}>`;
                });
                compileXML += '</process>';
                // console.log(compileXML)
                resolve(compileXML);
            });
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
                            <transition offset="${link.from.target},${link.to.target}" to="${link.to.data.name}" name="${link.data.name}"  displayName="${link.data.displayName}" />
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
            return new Promise((resolve, reject) => { //debugger
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
                const target = process.children;//console.log(target)
                // 设置流程模型配置数据
                this.$set(this.workflowData, 'name', process.attributes.name.nodeValue);
                this.$set(this.workflowData, 'displayName', process.attributes.displayName.nodeValue);
                // 获取节点数据
                let MMWFNodes=this.MMworkflowNodes;
                for (let j = 0, len = target.length; j < len; j++) {//console.log(target[j])
                    const { attributes, children, localName } = target[j];
                    //
                    let nodeObj = {};
                    const nodeConfig = NodeConfig();
                    // debugger
                    if(MMWFNodes && MMWFNodes.length >0){
                        nodeObj =MMWFNodes[j];
                        nodeObj.type=upperCase(localName);
                        nodeObj.options={
                            ...nodeConfig[localName],
                            x: Number(attributes.layout.nodeValue.split(',')[0]),
                            y: Number(attributes.layout.nodeValue.split(',')[1]),
                            draggable: true
                        };
                        nodeObj.transition=[];
                        nodeObj.key=`${Date.parse(new Date())}_${Math.ceil(Math.random() * 99999)}`;
                        if (localName === 'start') {
                            nodeObj.key = 'Start';
                        } else if (localName === 'end') {
                            nodeObj.key = 'End';
                        } else if (localName === 'task') {
                            nodeObj.data.performType = attributes.performType.nodeValue;
                        }
                    }else{
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
                    }
                    this.$set(this.workflowNodes, this.workflowNodes.length, nodeObj);
                    // 获取连接线数据
                    if (localName !== 'end') {//console.log(localName, nodeObj, children,target)
                        const linkObj = this.compileLink(localName, nodeObj, children,target);
                        linkObj.then(res=>{
                            for(let p = 0 ; p<res.length; p++){
                                newArr.push(res[p]);
                            }
                        })
                    }
                }
                resolve( newArr )
            });
        },
        // 解析连接线数据
        compileLink (name, obj, arr,allNodes) {
            return new Promise((resolve, reject) => { 
                let lineList = [];
                let toName;
                for (let t = 0, tLen = arr.length; t < tLen; t++) {
                    const { attributes } = arr[t];
                    //
                    const nodeConfig = NodeConfig();
                    //
                    const nodeObj = nodeConfig[name];
                    //
                    const target = attributes.offset.nodeValue.split(',')[0];
                    const toTarget = attributes.offset.nodeValue.split(',')[1];
                    const toDisplayName = attributes.to.nodeValue;
                    allNodes.forEach(item=>{
                        if( item.attributes.displayName.nodeValue === attributes.to.nodeValue ){
                            toName = item.attributes.name.nodeValue;
                        }
                    })
                    //
                    const point = this.computedLinkPoint(nodeObj, target);
                    lineList.push({
                        from: {
                            ...obj,
                            target,
                            point
                        },
                        to: {
                            data: {
                                name: toName,
                                displayName: toDisplayName,
                            },
                            target: toTarget
                        },
                        data: {
                            name: attributes.name.nodeValue,
                            oid: attributes.oid.nodeValue,
                            displayName: attributes.displayName.nodeValue
                        },
                        key: attributes.oid.nodeValue,
                        lineEdit: true,
                        visible: false
                    });
                }
                resolve( lineList ) ;
            });
        },
        // 计算连接点相对坐标
        computedLinkPoint (obj, param) {//debugger
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
        endToEndLink ({ from, to }) {//console.log( from, to);//debugger
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
                this.selectedNode.data = obj;console.log(obj)
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
                });console.log(this.workflowNodes)
            }
        },
        // 节点连接线按下事件
        handleMousedown (target, point, node) {console.log(node)
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
                this.assistedLineStart = this.assistedLineEnd = '';//console.log(this.startObj ,this.endObj)
                // 防止起点连接终点
                if (this.startObj.type === 'Start' && this.endObj.type === 'End') return false;
                // 防止节点自身连接点连接
                if ((this.startObj.type|| this.startObj.key) === this.endObj.key) return false;
                //
                if (Object.keys(this.endObj).length > 0) {
                    this.linkData.push({
                        from: this.startObj,
                        to: this.endObj,
                        lineEdit: false
                    });//console.log( this.lineData)
                    this.lineData.map((item, index) => {
                        if (item.from.key === node.key) {
                            node.transition.push(item);
                        }//debugger
                        // 添加连接线数据
                        if (!item.lineEdit && !item.data) {
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
        // 新增-点击保存工作流按钮执行事件
        saveNewWorkflow (workflowNodes) {console.log(workflowNodes) 
            let editMsg = JSON.parse( sessionStorage.getItem("eidtMsg") );
            let data = {
                    "code": editMsg.code,
                    "name":  editMsg.name,
                    "oid":  editMsg.oid,
                    "nodes": workflowNodes
                };
            
            console.log(data)
            console.log(JSON.stringify(data))
            //
            this.selectedNode = {};
            // 设置保存标识
            this.saveFlag = 'workflow';
            // 清空配置类型
            this.nodeType = '';
            //
            this.$set(this.selectedNode, 'data', this.workflowData);
            // 打开配置对话框   
            this.dialogSaveVisible = true;
            this.$api.svg.addSvg(data).then(res=>{
                if( res.data.data.msg == 'success' ){
                    this.$message.success('保存成功');
                    sessionStorage.setItem("eidtMsg",null);
                }else{
                    this.$message.error("保存失败,请填写完整信息");
                }
             
            },error=>{
                console.log(error)
            })
        },
        // 编辑-点击保存工作流按钮执行事件
        saveEditWorkflow (workflowNodes) {
            let editMsg = JSON.parse( sessionStorage.getItem("eidtMsg") );
            workflowNodes.forEach(item => {
                if(item.oid){
                    item.key = item.oid 
                }
                if(item.transition){
                    if(item.transition.length>0){
                        let newTransiton = item.transition;
                        newTransiton.forEach(items => {
                            if(items.oid){
                                items.key = items.oid 
                            }
                            if(items.from.data.displayName == item.data.displayName){
                                items.from.key = item.key
                            }
                            if(items.to.data.displayName == item.data.displayName){
                                items.to.key = item.key
                            }
                            delete items.from.transition;
                            delete items.to.transition;
                            
                        });
                        newTransiton.forEach(items => {//debugger
                            for(let i =1; i<workflowNodes.length; i++){
                                if(workflowNodes[i].oid){
                                    if(items.to.data.displayName == workflowNodes[i].data.displayName){
                                        items.to.key = workflowNodes[i].oid
                                    }
                                }
                                // else if(workflowNodes[i].data.name == "End" || workflowNodes[i].data.name == "Start"){
                                //         items.to.key = workflowNodes[i].data.name
                                // }
                            }
                        });
                    }
                } 
            });
            let data = {
                    "code": editMsg.code,
                    "name":  editMsg.name,
                    "oid":  editMsg.oid,
                    "nodes": workflowNodes
                };
            console.log("wwww")
            console.log(JSON.stringify(data))
            //
            this.selectedNode = {};
            // 设置保存标识
            this.saveFlag = 'workflow';
            // 清空配置类型
            this.nodeType = '';
            //
            this.$set(this.selectedNode, 'data', this.workflowData);
            // 打开配置对话框   
            this.dialogSaveVisible = true;
            this.$api.svg.addSvg(data).then(res=>{
                if( res.data.data.msg == 'success' ){
                    this.$message.success('保存成功');
                    sessionStorage.setItem("eidtMsg",null);
                }else{
                    this.$message.error("保存失败,请填写完整信息");
                }
            },error=>{
                console.log(error)
            })
            console.log(workflowNodes)
        }
    }
}