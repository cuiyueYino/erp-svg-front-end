<template>
    <div>
        <el-menu class="sidebar-el-menu">
            <elreplyitem v-for="(ReplyItemData,index) in (UpdateData.length>0?UpdateData:ReplyData)" @changeShow="closeReplyPage" :fparentId="fparentId" :key="index" :ReplyItemData="ReplyItemData"></elreplyitem>
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
        UpdateData: Array,
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
            let Formdata={};
            Formdata.foid=data.fparentreply;
            this.$api.processSet.getReplyMsgByAudit(Formdata).then(res=>{
                if(res.data){
                    if(res.data.code ==0){
                        let resData=res.data.data;
                        this.UpdateData=resData;
                    }else{
                        this.$message.error(res.data.msg+'!');
                    }
                }else{
                    this.$message.error('更新回复信息失败!');
                }
            },error=>{
                console.log(error)
            })
        }
    }
}
</script>