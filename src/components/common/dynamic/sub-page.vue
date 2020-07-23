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
        dataS:  [
            {name: 'name1',label:'111',required:true, type:'input'},
            {name: 'name2',label:'112', required:true, type: 'checkbox'},
            {name: 'name3',label:'113', required:false, type: 'input'},
            {name: 'name4',label:'114', required:false, type: 'textarea'},
            {name: 'name5',label:'115', required:false, type: 'textarea'},
            {name: 'name6',label:'116', required:true, type:'input'},
            {name: 'name7',label:'117', required:false, type: 'checkbox'},
            {name: 'name8',label:'118', required:true, type: 'input'},
            {name: 'name9',label:'119', required:false, type: 'textarea'},
            {name: 'name10',label:'1110', required:true, type:'input'},
            {name: 'name11',label:'1111', required:true, type: 'checkbox'},
            {name: 'name12',label:'1112', required:false, type: 'textarea'},
            {name: 'name13',label:'1113', required:false, type:'input'},
            {name: 'name14',label:'1114', required:false, type: 'checkbox'},
            {name: 'name15',label:'1115', required:true, type: 'input'},
        ]
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
         * 判断每个item的位置,第4个换行.
         * 返回值为[[{1},{2},{3}],[{4}],[{5},{6},{7}]]
         * @param {data} props 传入数组
        */
        checkposition(data){
            let parent = [];
            let Lineindex=0;
            let stynum=0;
            for (let i = 0; i < data.length; i++) {
                if(data.type ==='textarea'){
                    stynum=2;
                    parent.push(Lineindex);
                    Lineindex++;
                }else if(Stynum == 3){
                    Stynum=0;
                    parent.push(Lineindex);
                    Lineindex++;
                    
                }
                parent[Lineindex].push(data[i]);
                stynum++;
            }
            var data=[
                {name: 'name1',label:'111',required:true, type:'input'},
                {name: 'name2',label:'112', required:true, type: 'checkbox'},
                {name: 'name3',label:'113', required:false, type: 'input'},
                {name: 'name4',label:'114', required:false, type: 'textarea'},
                {name: 'name5',label:'115', required:false, type: 'textarea'},
                {name: 'name6',label:'116', required:true, type:'input'},
                {name: 'name7',label:'117', required:false, type: 'checkbox'},
                {name: 'name8',label:'118', required:true, type: 'input'},
                {name: 'name9',label:'119', required:false, type: 'textarea'},
                {name: 'name10',label:'1110', required:true, type:'input'},
                {name: 'name11',label:'1111', required:true, type: 'checkbox'},
                {name: 'name12',label:'1112', required:false, type: 'textarea'},
                {name: 'name13',label:'1113', required:false, type:'input'},
                {name: 'name14',label:'1114', required:false, type: 'checkbox'},
                {name: 'name15',label:'1115', required:true, type: 'input'},
            ];
            var parent = [];
            var Stynum=0;
            var Lineindex=0;
            for (var i = 0; i < data.length; i++) {
                if(data[i].type ==='textarea'){
                    Stynum=2;
                    Lineindex++;
                }else if(Stynum == 3){
                    Stynum=0;
                    Lineindex++;
                }
                data[i].Lineindex=Lineindex;
                Stynum++;
            }
            for(var j = 0; j <= Lineindex; j++){
                let linedata=[];
                for (var i = 0; i < data.length; i++) {
                    if(data[i].Lineindex === j){
                        linedata.push(data[i]);
                    }
                }
                parent.push(linedata);
            }
            parent;
        }
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

</style>