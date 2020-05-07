class optionData {
    constructor() {
        this.option = {
            //color: ['#4cabce', '#006699', '#4cabce', '#e5323e','#003366', '#006699', '#4cabce', '#e5323e','#006699'],
            title: {
                text: '功能点击量统计',
                subtext: '功能点击量'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['2011年'],
                textStyle: {
                    color: '#4cabce',
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            calculable: true,
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['新闻通告', '活动中心', '缴费管理', '巡检报修', '业主申报', '邀请注册','联系方式','地图找房','绿色就医']
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230,232323,332323,344444]
                }
            ]
        },
        this.optionA2 = {
            title: {
                text: '功能点击量统计',
                subtext: '功能点击量'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            calculable: true,
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['新闻通告', '活动中心', '缴费管理', '巡检报修', '业主申报', '邀请注册','联系方式','地图找房','绿色就医']
            },
            series: [
                {
                    name: '2011年',
                    type: 'bar',
                    barWidth : 20,
                    data: [
                        {
                            itemStyle: {
                                color:'#4cabce',
                            },
                            label:{ 
                                normal:{ 
                                    show: true, 
                                    position: 'right',
                                    textStyle:{
                                        color:"black"
                                    }
                                } 
                            },
                            value:18203
                        },
                        {
                            itemStyle: {
                                color:'#006699'
                            },
                            label:{ 
                                normal:{ 
                                    show: true, 
                                    position: 'right',
                                    textStyle:{
                                        color:"black"
                                    }
                                } 
                            },
                            value:23489
                        },
                        {
                            itemStyle: {
                                color:'#e5323e'
                            },
                            label:{ 
                                normal:{ 
                                    show: true, 
                                    position: 'right',
                                    textStyle:{
                                        color:"black"
                                    }
                                } 
                            },
                            value:29034
                        },
                        {
                            itemStyle: {
                                color:'#003366'
                            },
                            label:{ 
                                normal:{ 
                                    show: true, 
                                    position: 'right',
                                    textStyle:{
                                        color:"black"
                                    }
                                } 
                            },
                            value:104970
                        },
                        {
                            itemStyle: {
                                color:'#e5323e'
                            },
                            label:{ 
                                normal:{ 
                                    show: true, 
                                    position: 'right',
                                    textStyle:{
                                        color:"black"
                                    }
                                } 
                            },
                            value:131744
                        },
                        {
                            itemStyle: {
                                color:'#006699'
                            },
                            label:{ 
                                normal:{ 
                                    show: true, 
                                    position: 'right',
                                    textStyle:{
                                        color:"black"
                                    }
                                } 
                            },
                            value:630230
                        },
                        {
                            itemStyle: {
                                color:'#e5323e'
                            },
                            label:{ 
                                normal:{ 
                                    show: true, 
                                    position: 'right',
                                    textStyle:{
                                        color:"black"
                                    }
                                } 
                            },
                            value:232323
                        },
                        {
                            itemStyle: {
                                color:'#003366'
                            },
                            label:{ 
                                normal:{ 
                                    show: true, 
                                    position: 'right',
                                    textStyle:{
                                        color:"black"
                                    }
                                } 
                            },
                            value:332323
                        },
                        {
                            itemStyle: {
                                color:'#006699'
                            },
                            label:{ 
                                normal:{ 
                                    show: true, 
                                    position: 'right',
                                    textStyle:{
                                        color:"black"
                                    }
                                } 
                            },
                            value:344444
                        }
                    ]
                }
            ]
        },
        this.optionAA = {
            dataset: {
                source: [
                    ['score', 'amount', 'product'],
                    [89.3, 582, 'Matcha Latte'],
                    [57.1, 782, 'Milk Tea'],
                    [74.4, 410, 'Cheese Cocoa'],
                    [50.1, 127, 'Cheese Brownie'],
                    [89.7, 201, 'Matcha Cocoa'],
                    [68.1, 791, 'Tea'],
                    [19.6, 918, 'Orange Juice'],
                    [10.6, 101, 'Lemon Juice'],
                    [32.7, 201, 'Walnut Brownie']
                ]
            },
            grid: {containLabel: true},
            xAxis: {name: 'amount'},
            yAxis: {type: 'category'},
            visualMap: {
                orient: 'horizontal',
                left: 'center',
                min: 10,
                max: 100,
                text: ['High Score', 'Low Score'],
                // Map the score column to color
                dimension: 0,
                inRange: {
                    color: ['#D7DA8B', '#E15457']
                }
            },
            series: [
                {
                    type: 'bar',
                    encode: {
                        // Map the "amount" column to X axis.
                        x: 'amount',
                        // Map the "product" column to Y axis
                        y: 'product'
                    }
                }
            ]
        },
        this.optionYear ={
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}月份:数目{c}'
            },
            xAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name:'2020年度',
                data: [820, 932, 901, 934, 1290, 1330, 1320,233,1245,980,1255,902],
                type: 'line'
            }]
        },
        this.optionMonth ={
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}号:数目{c}'
            },
            xAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name:'3月份',
                data: [290, 1330, 1320,820, 932, 901, 934, 1290, 1330, 132,820, 932, 901, 934, 1290, 1330, 132,820, 932, 901, 934, 1290, 1330, 132,820, 932, 901, 934, 1290, 1330, 132],
                type: 'line'
            }]
        }
    }
}
export default optionData