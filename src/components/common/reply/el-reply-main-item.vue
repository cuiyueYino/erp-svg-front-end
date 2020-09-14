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
                        <el-button @click="onRowbuttonClick(ReplyItemData)" type="primary"  icon="el-icon-chat-line-round" size="medium">回复</el-button>
                    </el-col>   
                </el-row>
            </template>
            <elreplyitem 
                v-for="(ChildrenItem,index) in ReplyItemData.resub"
                :key="index"
                :ReplyItemData="ChildrenItem"
            ></elreplyitem>
        </el-submenu>
        <el-menu-item v-else>
            <template  slot="title">
                <el-row>
                    <el-col :span="2">
                        {{ ReplyItemData.fromusername }}
                    </el-col>
                    <el-col :span="1" :offset="1">
                        回复:
                    </el-col>
                    <el-col :span="2" :offset="1">
                        {{ ReplyItemData.tousername }}
                    </el-col>
                    <el-col :span="12" :offset="1">
                    {{ ReplyItemData.title }}
                    </el-col>
                    <el-col :span="2" :offset="1">
                        <el-button @click="onRowbuttonClick(ReplyItemData)" type="primary"  icon="el-icon-chat-line-round" size="medium">回复</el-button>
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
        ReplyItemData: Array
    },
    methods: {
        onRowbuttonClick(data){
            let rowdata=data;
            console.log("wesd")
            rowdata.senduser=localStorage.getItem('ms_name');
            rowdata.senduserId=localStorage.getItem('ms_userId');
            this.rowRMPDataObj=rowdata;
            this.rowRMPtype= true;
        },
        //回复关闭
        closeReplyPage(data,type){
            if(type === false){
                this.rowRMPtype = false
            }else{
                this.rowRMPtype = true
            }
        }
    }
}
</script>