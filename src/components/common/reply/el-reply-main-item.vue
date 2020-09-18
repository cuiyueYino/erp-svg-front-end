<template>
    <div>
        <el-submenu v-if="ReplyItemData.childReply" :index="ReplyItemData.index">
            <template slot="title">
                <el-row>
                    <el-col :span="2">
                        {{ ReplyItemData.staffName }}
                    </el-col>
                    <el-col :span="1" :offset="1">
                        回复:
                    </el-col>
                    <el-col :span="2" :offset="1">
                        {{ ReplyItemData.replyedName }}
                    </el-col>
                    <el-col :span="12" :offset="1">
                    {{ ReplyItemData.replycontent }}
                    </el-col>
                    <el-col :span="2" :offset="1">
                        <el-button @click="onRowbuttonClick(ReplyItemData)" size="small" type="primary">回复</el-button>
                    </el-col>   
                </el-row>
            </template>
            <elreplyitem 
                v-for="(ChildrenItem,index) in ReplyItemData.resub"
                :key="index"
                :fparentId="fparentId"
                :ReplyItemData="ChildrenItem"
            ></elreplyitem>
        </el-submenu>
        <el-menu-item v-else>
            <template  slot="title">
                <el-row>
                    <el-col :span="2">
                        {{ ReplyItemData.staffName }}
                    </el-col>
                    <el-col :span="1" :offset="1">
                        回复:
                    </el-col>
                    <el-col :span="2" :offset="1">
                        {{ ReplyItemData.replyedName }}
                    </el-col>
                    <el-col :span="12" :offset="1">
                    {{ ReplyItemData.replyContent }}
                    </el-col>
                    <el-col :span="2" :offset="1">
                        <el-button @click="onRowbuttonClick(ReplyItemData)" size="small" type="primary">回复</el-button>
                    </el-col>   
                </el-row>
            </template>
        </el-menu-item>
        <replypage  :rowRMPDataObj="rowRMPDataObj" :rowRMPtype="rowRMPtype" @changeShow="closeReplyPage"/>     
    </div>
</template>
<script>
import elreplyitem from './el-reply-main-item.vue';
import replypage from './reply-main-page.vue';
export default {
    name: 'elreplyitem',
    components: {
        elreplyitem,
        replypage
    },
    data() {
        return {
            rowRMPDataObj:{},
            accordion:false,
            rowRMPtype:false
        };
    },             
    props: {
        ReplyItemData: Object,
        fparentId:String
    },
    methods: {
        onRowbuttonClick(data){
            let rowdata=data;
            rowdata.senduser=localStorage.getItem('ms_username');
            rowdata.senduserId=localStorage.getItem('ms_userId');
            rowdata.staffId=data.staffId;
            rowdata.staffName=data.staffName;
            rowdata.foid=data.foid;
            rowdata.fparentreply=this.fparentId;
            this.rowRMPDataObj=rowdata;
            this.rowRMPtype= true;
        },
        //回复关闭
        closeReplyPage(data,type){
            this.rowRMPtype = false
            /*if(type === false){
                
            }else{
                this.rowRMPtype = true
            }*/
        }
    }
}
</script>