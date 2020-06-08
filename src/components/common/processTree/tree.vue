<template>
    <div :ref="treeRefName"
        :class="treeClassName"
    >
        <div v-for="(item,index) in convertData" :key="index">
            <treeitem :itemdata="item" :index="index"/>
        </div>
        <div class="process-tree-end"
            :class="isChild?'single-node':''"
        >
            <div>
                <span class="process-tree-fontend">End</span>
            </div>
        </div>
    </div>
</template>
<script>
import treeitem from './tree-item'
export default {
    name:'processTree',
    components:{
        treeitem
    },
    props:{
        data:{
            type:Array,
            default:()=>{
                return []
            }
        },
        isChild:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            convertData:this.convert(this.data),
            rootStyle:{}
        }
    },
    watch:{
        data(){
            this.convertData=this.convert(this.data);
        }
    },
    computed:{
        treeRefName(){
            return this.isChild?'childTree':'baseTree'
        },
        treeClassName(){
            return this.isChild?'':'process-tree'
        }
    },
    methods:{
        convert(arr){
            return arr.map((item)=>{
                if(item.children && item.children.length>0){
                    item.children=this.convert(item.children);
                }
                return item
            })
        },
    }
}

</script>
<style scoped>
.process-tree{
    padding: 10px;
    overflow: scroll;
    padding-bottom: 27px;
    width: 100%;
    padding-right:0;
    font-size:0;
    line-height:0

}
.single-node::before{
    content:"";
    display:block;
    position: absolute;
    width:23px;
    height:3px;
    background:rgba(203,221,238,1);
    left:-23px;
    top:52%;
}
.process-tree-fontend{
    position: relative;
    background:red;  
    color:#333;
    display:inline-block;
    cursor: pointer;
    width:31px;
    text-align:center;
    font-size: 12px;
    line-height: 1.8em;
    vertical-align: middle;
    height:31px;
    border-radius:12px;
}


.process-tree-end{
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-left:43px;
}
</style>