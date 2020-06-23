<script>
/**
 * 流程图
 */
export default {
    name: 'Ltree',
    props: {
        convertData:{
            type:Array,
        },
    },
    data() {
        return {
            linetotal:4,
            pageSizes: [10, 20, 50, 100]
        };
    },
    created() {
        let targetInstance = window;
        if (window.top !== targetInstance) {
            targetInstance = window.top;
        }
        if (targetInstance.dynamicTablePageSizes && typeof targetInstance.dynamicTablePageSizes === 'string') {
            this.pageSizes = targetInstance.dynamicTablePageSizes.split(',');
        }
    },
    mounted() {

    },
    methods: {
        /**
         * 
         * 判断每个item的位置,第linetotal个换行.
         * @param {index} props 传入数组的下标属性
        */
        checkLineStyle(index){
            let lineNum=this.linetotal;
            let Stynum=0;
            let cindex = index;
            let lindex = cindex/lineNum;
            let Numindex= Math.floor(lindex);
            if(Numindex % 2 ==0){
                Stynum = 0;
            }else{
                Stynum = 1;
            }
            return Stynum;
        },
        /**
         * 
         * 渲染每个item
         * @param {item,index.type,state} props 传入数组的下标属性
         * 
        */
        CreateTreeItem(column){
            let ret = [];
            if(column.type ==="closed"){
                ret.push(
                    <div class="single-closed">
                        <div>{column.name}</div>
                        <div>{column.tatile}</div>
                        <div>{column.remak}</div>
                    </div>
                );
            }else if(column.type ==="current"){
                ret.push(
                    <div class="single-current">
                        <div>{column.name}</div>
                        <div>{column.tatile}</div>
                        <div>{column.remak}</div>
                    </div>
                );
            }else if(column.type ==="after"){
                ret.push(
                    <div class="single-after">
                        <div>{column.name}</div>
                        <div>{column.tatile}</div>
                        <div>{column.remak}</div>
                    </div>
                );
            }
            return ret;
        },
        /**
         * 
         * 判断位置item
         * @param {Lindex,index,column} props 传入数组的下标属性
         * 
        */
        checkposition(Lindex,index,column,total){
            let lineNum=this.linetotal;
            let childList = this.CreateTreeItem(column);
            //单数行
            if(Lindex ==0){
                //单数行的第一行
                if(index < lineNum){
                    if(index == 0){
                       //整体的开始
                        return (
                            <div class="item-main-odd" >
                                <div class="item-main-content">
                                    {childList}
                                </div>
                                <div class="item-main-content-after"></div>
                            </div>
                        );
                    }else if(index ==lineNum-1){
                        if(index == total-1){
                           //整体结束
                           return (
                                <div class="item-main-odd">
                                    <div class="item-main-content-before"></div>
                                    <div class="item-main-content">
                                        {childList}
                                    </div>
                                </div>
                            );
                        }else{
                           //单行结束
                           return (
                                <div class="item-main-odd">
                                    <div class="item-main-content-before"></div>
                                    <div class="item-main-content">
                                        {childList}
                                    </div>
                                    <div class="item-main-content-bottom"></div>
                                </div>
                            );
                        }
                    }else{
                        if(index == total-1){
                           //整体结束
                           return (
                                <div class="item-main-odd">
                                    <div class="item-main-content-before"></div>
                                    <div class="item-main-content">
                                        {childList}
                                    </div>
                                </div>
                            );
                        }else{
                            return (
                                <div class="item-main-odd">
                                    <div class="item-main-content-before"></div>
                                    <div class="item-main-content">
                                        {childList}
                                    </div>
                                    <div class="item-main-content-after"></div>
                                </div>
                            );
                        }
                        //单行中间件
                    }
                }else{
                    if(index % lineNum ==0){
                        if(index == (total-1)){
                            //单行整体结束
                            return (
                                <div class="item-main-odd">
                                    <div class="item-main-content-before"></div>
                                    <div class="item-main-content">
                                        {childList}
                                    </div>
                                    <div class="item-main-content-after"></div>
                                </div>
                            );
                        }else{
                            //单行开始
                            return (
                                <div class="item-main-odd">
                                    <div class="item-main-content-top"></div>
                                    <div class="item-main-content-odd">
                                    {childList}
                                    </div>
                                    <div class="item-main-content-odd-after"></div>
                                </div>
                            );
                        }
                    }else if((index+1) % lineNum ==0){
                        if(index == (total-1)){
                            //单行整体结束
                            return (
                                <div class="item-main-odd">
                                    <div class="item-main-content-before"></div>
                                    <div class="item-main-content">
                                        {childList}
                                    </div>
                                </div>
                            );
                        }else{
                            //单行结束
                            return (
                                <div class="item-main-odd">
                                    <div class="item-main-content-before"></div>
                                    <div class="item-main-content">
                                    {childList}
                                    </div>
                                    <div class="item-main-content-bottom"></div>
                                </div>
                            );
                        }
                    }else{
                        //单行中间件
                        if(index == (total-1)){
                            //单行整体结束
                            return (
                                <div class="item-main-odd">
                                    <div class="item-main-content-before"></div>
                                    <div class="item-main-content">
                                        {childList}
                                    </div>
                                </div>
                            );
                        }else{
                            return (
                                <div class="item-main-odd">
                                    <div class="item-main-content-before"></div>
                                    <div class="item-main-content">
                                    {childList}
                                    </div>
                                    <div class="item-main-content-after"></div>
                                </div>
                            );
                        } 
                    }
                }
            }else{
                //双数行
                if(index % lineNum ==0){
                    if(index+1 == total){
                        //双行整体结束
                        return (
                            <div class="item-main-even">
                                <div class="item-main-content-top"></div>
                                <div class="item-main-content-even">
                                    {childList}
                                </div>
                            </div>
                        );
                    }else{
                        //双行开始
                        return (
                            <div class="item-main-even">
                                <div class="item-main-content-top"></div>
                                <div class="item-main-content-even-before"></div>
                                <div class="item-main-content-even">
                                    {childList}
                                </div>
                            </div>
                        );
                    }
                }else if((index+1) % lineNum ==0){
                    if(index == (total-1)){
                        //双行整体结束
                        return (
                            <div class="item-main-even" >
                                <div class="item-main-content">
                                    {childList}
                                </div>
                                <div class="item-main-content-after"></div>
                            </div>
                        );
                    }else{
                        //双行结束
                        return (
                            <div class="item-main-even">
                                <div class="item-main-content-even-midd">
                                    {childList}
                                </div>
                                <div class="item-main-content-after"></div>
                                <div class="item-main-content-bottom"></div>
                            </div>
                        );
                    }   
                }else{
                    //双数行中间件
                    if(index == (total-1)){
                        //双行整体结束
                        return (
                            <div class="item-main-even" >
                                <div class="item-main-content">
                                    {childList}
                                </div>
                                <div class="item-main-content-after"></div>
                            </div>
                        );
                    }else{
                        return (
                            <div class="item-main-even">
                                <div class="item-main-content-even-midd-before"></div>
                                <div class="item-main-content-even-midd">
                                    {childList}
                                </div>
                                <div class="item-main-content-after"></div>
                            </div>
                        );
                    }
                }
            }
        },
    },
    /**
     * Vue实例渲染函数，生成组件模版
    */
    render(){
        const{
            linetotal,
            checkLineStyle,
            convertData,
            checkposition,
            CreateTreeItem,
        }=this;
        const renderColumns = [];
        const totalNum =convertData.length; 
        convertData.forEach((item,index) => {
            const cindex = checkLineStyle(index);
            
            const litemList = checkposition(cindex,index,item,totalNum);
            renderColumns.push(litemList);
        })
        return(
            <div class="tree-main">
                <div class="tree-wrap">
                    {renderColumns}
                </div>
            </div>
        );
   }
}
</script>
<style>
.tree-main{
    width: 100%;
    margin: 0 auto;
    height: 600px;
    overflow-y: auto;
}
.tree-wrap{
    width: 800px;
    margin: 0 auto;
    height: 600px;
}
.item-main-odd{
    width: 200px;
    height: 200px;
    float: left;
}
.item-main-content{
    position: relative;
    top:30px;
    left: 30px;
    width: 140px;
    height: 140px;
    background-color: blueviolet;
}
.item-main-content-after{
    float: right;
    width: 30px;
    height: 5px;
    background-color: cyan;
    margin-top: -40px;
}
.item-main-content-before{
    float: left;
    width: 30px;
    height: 5px;
    background-color: cyan;
    margin-top: 100px;
}
.item-main-content-bottom{
    float: left;
    width: 5px;
    height: 30px;
    background-color: cyan;
    margin-top: 30px;
    margin-left: 100px;
}
.item-main-content-top{
    width: 5px;
    height: 30px;
    background-color: cyan;
    margin-left: 100px;
}
.item-main-content-odd{
    position: relative;
    left: 30px;
    width: 140px;
    height: 140px;
    background-color: blueviolet;
}
.item-main-content-odd-after{
    float: right;
    width: 30px;
    height: 5px;
    background-color: cyan;
    margin-top: -70px;
}
.item-main-even{
    width: 200px;
    height: 200px;
    float: right;
}
.item-main-content-even{
    position: relative;
    left: 30px;
    width: 140px;
    height: 140px;
    background-color: blueviolet;
}
.item-main-content-even-before{
    float: left;
    width: 30px;
    height: 5px;
    background-color: cyan;
    margin-top: 70px;
}
.item-main-content-even-midd{
    position: relative;
    top: 30px;
    left: 30px;
    width: 140px;
    height: 140px;
    background-color: blueviolet;
}
.item-main-content-even-midd-before{
    float: left;
    width: 30px;
    height: 5px;
    background-color: cyan;
    margin-top: 100px;
}
.single-closed{
    background-color: aquamarine;
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
}
.single-current{
    background-color:#E6A23C;
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
}
.single-after{
    background-color:darkgray;
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
}
</style>