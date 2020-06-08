<template>
    <div>
        <div class="tree-tyle">
            <div class="tree-tyle-Closed">已处理节点</div>
            <div class="tree-tyle-current">当前节点</div>
            <div class="tree-tyle-after">未处理的节点</div>
        </div>
        <div class="tree-wrap">
            
            <ProcessTree ref="tree" :isChild="isChild" :data="treeData" />
        </div>
    </div>
</template>
<script>
import ProcessTree from './tree.vue'
export default {
    props:{
        treeData:{
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
        }
    },
    mounted(){
        this.$refs.tree.initDomWidth();
    },
    watch:{
        treeData(){
            this.$nextTick(this.$refs.tree.initDomWidth)
        }
    },
    components:{
        ProcessTree
    }
}
</script>
<style scoped>
.tree-wrap{
    width:100%;
    height:100%;
    top:0;
    left:0
}
.tree-tyle{
    width: 100%;
    height: 100px;
    top:0;
    left:10px;
}
.tree-tyle-Closed{
    float: left;
    width: 100px;
    height: 30px;
    line-height: 30px;
    margin-left: 20px;
    text-align: center;
    border-radius: 10px;
    background-color: aquamarine;
}
.tree-tyle-current{
    float: left;
    width: 100px;
    height: 30px;
    line-height: 30px;
    margin-left: 20px;
    text-align: center;
    border-radius: 10px;
    background-color:red;
}
.tree-tyle-after{
    float: left;
    width: 100px;
    height: 30px;
    line-height: 30px;
    margin-left: 20px;
    text-align: center;
    border-radius: 10px;
    background-color:darkgray;
}
.tree-wrap>div{
    width:calc(100% + 17px);
    height:calc(100% + 17px);
}
</style>