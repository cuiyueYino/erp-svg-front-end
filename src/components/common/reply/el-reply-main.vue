<template>
    <div>
        <el-menu class="sidebar-el-menu">
            <elreplyitem v-for="(ReplyItemData,index) in ReplyData" :key="index" :ReplyItemData="ReplyItemData"></elreplyitem>
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
        ReplyData: Array
    },
    data(){
        return{
            rowRMPDataObj:{},
            accordion:false,
            rowRMPtype:false
        }
    },
    methods: {
    }
}
</script>