<template>
    <div>
        <el-menu class="sidebar-el-menu">
            <elreplyitem v-for="(ReplyItemData,index) in ReplyData" @changeShow="closeReplyPage" :fparentId="fparentId" :key="index" :ReplyItemData="ReplyItemData"></elreplyitem>
        </el-menu>
    </div>
</template>
<script>
import elreplyitem from './el-reply-main-item.vue';

export default {
    components: {
        elreplyitem,
    },
    props: {
        ReplyData: Array,
        fparentId:String
    },
    data(){
        return{
            rowRMPDataObj:{},
            accordion:false,
            rowRMPtype:false
        }
    },
    methods: {
        closeReplyPage(data){
            this.$emit('changeShow',data);
        }
    }
}
</script>