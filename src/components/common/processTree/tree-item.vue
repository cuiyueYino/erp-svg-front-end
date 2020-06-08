<template>
    <div>
        <div class="process-tree-childNodes"
            :class="index>0?'single-node':''"
        >
            <div  class="process-tree-childNodes-row">
                <span class="process-tree-node" v-if="itemdata.type =='closed'" :class="itemdata.type =='closed'?'single-closed':''">{{itemdata.name}}</span>
                <span class="process-tree-node" v-if="itemdata.type =='current'" :class="itemdata.type =='current'?'single-current':''" >{{itemdata.name}}</span>
                <span class="process-tree-node" v-if="itemdata.type =='after'" :class="itemdata.type =='after'?'single-after':''">{{itemdata.name}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'processTree',
    props:{
        itemdata:{
            type:Object,
            default:()=>{
                return {}
            }
        },
        index:{
            type:Number,
            default:()=>{
                return 0
            }
        }
    },
    data(){
        return {
            convertData:{},
            rootStyle:{}
        }
    },
    watch:{
        itemdata(){
            this.convertData=this.itemdata;
        }
    },
    computed:{
       
    },
    methods:{
    }
}

</script>
<style scoped>
.process-tree-childNodes-row{
    position: relative;
    margin-bottom:10px
}
.single-closed{
    background-color: aquamarine;
}
.single-current{
    background-color:#E6A23C;
}
.single-after{
    background-color:darkgray;
}
.process-tree-node::after{
    content:'';
    display:block;
    width:20px;
    height:3px;
    background:rgba(203,221,238,1);
    position:absolute;
    left:100%;
    top:50%
}
.process-tree-childNodes{
    position: relative;
    float: left;
    display: inline-block;
    vertical-align: middle;
    margin-left:43px;
    top: -.5px;
}
.single-node::before{
    content:"";
    display:block;
    position: absolute;
    width:23px;
    height:3px;
    background:rgba(203,221,238,1);
    left:-23px;
    top:38%;
}
.process-tree-childNodes>div{
    display:flex;
    flex-direction: column;
    justify-content:space-between;
}
.process-tree-node{
    position: relative;
    padding:6px 10px;
    border-radius:2px;
    color:#333;
    display:inline-block;
    cursor: pointer;
    min-width:80px;
    text-align:center;
    font-size: 12px;
    line-height: 1.8em;
    vertical-align: middle;
    min-height:20px;
}
.leaf-node::after{
   display:none
}
</style>