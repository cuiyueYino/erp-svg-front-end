<template>
    <div>
        <el-submenu v-if="ReplyItemData.childReply" :index="ReplyItemData.foid">
            <template slot="title">
                <el-row>
                    <el-col :span="3">
                        {{ ReplyItemData.userName }}
                    </el-col>
                    <el-col :span="1" :offset="1">
                        回复:
                    </el-col>
                    <el-col :span="3" :offset="1">
                        {{ ReplyItemData.replyedName }}
                    </el-col>
                    <el-col :span="9" :offset="1">
                        <div v-if="ReplyItemData.replyContent.length > 15">
                            <template>
                                <el-tooltip class="item" effect="dark" :content="ReplyItemData.replyContent" placement="top">
                                    <div>{{ReplyItemData.replyContent.substr(0, 15)}} ...</div>
                                </el-tooltip>
                            </template>
                        </div>
                        <div v-else>
                            {{ReplyItemData.replyContent}}
                        </div>
                    </el-col>
                    <el-col :span="2" :offset="1">
                        <el-link type="primary" @click="downLoadFile(ReplyItemData)">下载附件</el-link>
                    </el-col>
                    <el-col :span="1">
                        <el-button @click="onRowbuttonClick(ReplyItemData)" size="small" type="primary">回复</el-button>
                    </el-col>   
                </el-row>
            </template>
            <elreplyitem 
                v-for="(ChildrenItem,index) in ReplyItemData.childReply"
                :key="index"
                :fparentId="fparentId"
                @changeShow="closeReplyPageMM"
                :ReplyItemData="ChildrenItem"
            ></elreplyitem>
        </el-submenu>
        <el-menu-item v-else>
            <template  slot="title">
                <el-row>
                    <el-col :span="3">
                        {{ ReplyItemData.userName }}
                    </el-col>
                    <el-col :span="1" :offset="1">
                        回复:
                    </el-col>
                    <el-col :span="3" :offset="1">
                        {{ ReplyItemData.replyedName }}
                    </el-col>
                    <el-col :span="9" :offset="1">
                        <div v-if="ReplyItemData.replyContent.length > 15">
                            <template>
                                <el-tooltip class="item" effect="dark" :content="ReplyItemData.replyContent" placement="top">
                                    <div>{{ReplyItemData.replyContent.substr(0, 15)}} ...</div>
                                </el-tooltip>
                            </template>
                        </div>
                        <div v-else>
                            {{ReplyItemData.replyContent}}
                        </div>
                    </el-col>
                    <el-col :span="2" :offset="1" >
                        <el-link type="primary" @click="downLoadFile(ReplyItemData)">下载附件</el-link>
                    </el-col>
                    <el-col :span="1">
                        <el-button @click="onRowbuttonClick(ReplyItemData)" size="small" type="primary">回复</el-button>
                    </el-col>   
                </el-row>
            </template>
        </el-menu-item>
        <replypage  :rowRMPDataObj="rowRMPDataObj" :rowRMPtype="rowRMPtype" @changeShow="closeReplyPage"/>     
    </div>
</template>
<script>
import axios from 'axios';
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
            showFullName:false,
            rowRMPtype:false
        };
    },             
    props: {
        ReplyItemData: Object,
        fparentId:String
    },
    methods: {
        //附件查询
        findAttachmentInfosList(data){
            let formDataA ={};
            let creator = localStorage.getItem('ms_userId');
            formDataA.voucherId = data.foid;
            formDataA.menuCode = this.fparentId;
            if(creator){
                formDataA.userCode =  creator;
            } else {
                formDataA.userCode =  'test';
            }
            return this.$api.documentManagement.findInfosList(formDataA);
        },
        async downLoadFile(data){
            let fileData = await this.findAttachmentInfosList(data);
            if(fileData.data){
                if(fileData.data.data){
                    let Fdata=fileData.data.data;
                    console.log(Fdata[0])
                    //拦截器放入token
                    axios.interceptors.request.use(
                    config => {
                            if(localStorage.getItem('ms_tokenId')){
                                config.headers.Authorization = 'bearer '+localStorage.getItem('ms_tokenId');
                            }
                            return config;
                        },
                        error => Promise.error(error)
                    );
                    axios({
                        method: 'post',
                        url: '/api/interfaces/attachment/downloadFile',
                        params: {
                            attachmentId: Fdata[0].id
                        },
                        responseType: 'blob'
                    }).then(response => {
                        this.download(response,Fdata[0].fileName);
                    }).catch((error) => {
                    })
                }else{
                    this.$message.error('查询附件失败!');
                }
            }else{
                this.$message.error('查询附件失败!');
            }
        },
        //下载文件
        download (data,fileName) {
            if (!data) {
                return
            }
            let url = window.URL.createObjectURL(new Blob([data.data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            // let fileName = decodeURIComponent(data.headers.realname);
            link.setAttribute('download', fileName)
            document.body.appendChild(link)
            link.click()
        },
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
            if(type){
                this.$emit('changeShow',data);
                this.rowRMPtype = false
            }else{
                this.rowRMPtype = false
            }
        },
        closeReplyPageMM(data){
            this.$emit('changeShow',data);
        }
    }
}
</script>