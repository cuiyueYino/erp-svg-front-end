import G6 from '@antv/g6';
import insertCss from '@types/insert-css';

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
  .g6-tooltip {
    border-radius: 6px;
    font-size: 12px;
    color: #fff;
    background-color: #000;
    padding: 2px 8px;
    text-align: center;
  }
`);
const task = {
    G6init(ID,width,height,data){
        G6.registerNode('sql',{
            drawShape(cfg, group) {
                const rect = group.addShape('rect', {
                    attrs: {
                        x: -75,
                        y: -25,
                        width: 150,
                        height: 50,
                        radius: 10,
                        stroke: '#5B8FF9',
                        fill: '#C6E5FF',
                        lineWidth: 3,
                    },
                    name: 'rect-shape',
                });
                if (cfg.name) {
                    group.addShape('text', {
                        attrs: {
                            text: cfg.name,
                            x: 0,
                            y: 0,
                            fill: '#00287E',
                            fontSize: 14,
                            textAlign: 'center',
                            textBaseline: 'middle',
                            fontWeight: 'bold',
                        },
                        name: 'text-shape',
                    });
                }
                return rect;
            },
        },'single-node',);
        const graph = new G6.Graph({
            container: ID,
            width,
            height,
            layout: {
                type: 'dagre',
                nodesepFunc: d => {
                    if (d.id === '3') {
                        return 500;
                    }
                    return 50;
                },
                ranksep: 70,
                controlPoints: true
            },
            defaultNode: {
                type: 'sql',
            },
            defaultEdge: {
                type: 'polyline',
                style: {
                    radius: 20,
                    offset: 45,
                    endArrow: true,
                    lineWidth: 2,
                    stroke: '#C2C8D5',
                },
            },
            nodeStateStyles: {
                selected: {
                    stroke: '#d9d9d9',
                    fill: '#5394ef',
                }
            },
            modes: {
                default: [
                    'drag-canvas',
                    'zoom-canvas',
                    'click-select',
                    {
                        type: 'tooltip',
                        formatText(model) {
                            const cfg = model.conf;
                            const text = [];
                            cfg.forEach(row => {
                                text.push(row.label + ':' + row.value + '<br>');
                            });
                            return text.join('\n');
                        },
                        offset: 30
                    },
                ],
            },
            fitView: true,
        });
        graph.data(data);
        graph.render();
    }
}
export default task;
