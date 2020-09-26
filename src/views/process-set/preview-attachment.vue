<template>
    <div>
        <el-dialog
            @close="handleClose"
            :visible.sync="ShowFinancVisible"
            :append-to-body="true"
            v-if="ShowFinancVisible"
            :close-on-click-modal="false"
            :close-on-press-escape="true"
            :center="true"
            width="100%"
            :fullscreen="true">
            <p v-html="html"></p>
        </el-dialog>
    </div>
</template>

<script>

export default {
    props: {
        rowNMMDataObj:Object,
        rowNMMtype: Boolean
    },
    data(){
        return{
            html:'',
            ShowFinancVisible:false,
        }
    },
    mounted(){
        //生成文档浏览树结构
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.ShowFinancVisible=false;
            this.$emit('changeShow',false);
        },
    },
    watch:{
        rowNMMtype(oldVal,newVal){
            if(oldVal){
                this.ShowFinancVisible=true;
                this.html=this.rowNMMDataObj.value;
            }

        }
    }
}
</script>
