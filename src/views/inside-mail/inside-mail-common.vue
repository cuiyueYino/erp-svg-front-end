<template>
    <div>
        <el-tabs tab-position="left" v-model="common" @tab-click="handleClick" type="border-card" style="height:800px;">
            <el-tab-pane name = "inbox">
                <span slot="label" ><i class="el-icon-receiving"></i>收件箱</span>
                <div>
                    <mailInbox :key="inboxTimer"></mailInbox>
                </div>
            </el-tab-pane>
            <el-tab-pane  name = "newMail">
                <span slot="label" ><i class="el-icon-edit"></i> 写信</span>
                <div>
                    <newMailPage :perData="perData" :key="newMailTimer" ></newMailPage>
                </div>
            </el-tab-pane>
            <el-tab-pane name = "drafts">
                <span slot="label" ><i class="el-icon-edit-outline"></i> 草稿箱</span>
                <div>
                    <mailDrafts :key="draftsTimer"></mailDrafts>
                </div>
            </el-tab-pane>
            <el-tab-pane name = "outbox">
                <span slot="label" ><i class="el-icon-message"></i> 发件箱</span>
                <div>
                    <mailOutbox :key="outboxTimer"></mailOutbox>
                </div>
            </el-tab-pane>
            <el-tab-pane name = "recycle">
                <span slot="label" ><i class="el-icon-delete"></i> 回收站</span>
                <div>
                    <mailRecycle :key="recycleTimer"></mailRecycle>
                </div>
            </el-tab-pane>
                <div v-if = "detailView" >
                    <mailDetail :id="mailId" :key="detailTimer" ></mailDetail>
                </div>
        </el-tabs>
                
    </div>
</template>
<script>
import newMailPage from './new-mail-message.vue';
import mailInbox from './inside-mail-inbox';
import mailOutbox from './inside-mail-outbox';
import mailDrafts from './inside-mail-drafts';
import mailRecycle from './inside-mail-recycle';
import mailDetail from './inside-mail-detail';
export default {
    components: {
        newMailPage,
        mailInbox,
        mailOutbox,
        mailDrafts,
        mailRecycle,
        mailDetail,
    },
    data(){
        return{
            common: "inbox",
            perData: {},
            mailId: "",
            lastPage:"",
            //标签刷新标识
            inboxTimer:'',
            newMailTimer:'',
            draftsTimer:'',
            outboxTimer:'',
            recycleTimer:'',
            detailTimer:'',

            detailView: false,
        }
    },
    methods: {
        toPage(data,page){
            this.common = page;
            this.perData = data;
            this.refresh(page);
        },

        /**
         * 标签点击事件
         */
        handleClick(tab, event) {
            this.refresh(tab.name)
             this.detailView = false
        },
        clearPerData(){
            this.perData = null;
        },

        /**
         * 去详情页
         */
        toDetail(data,last){
            this.common = "",
            this.detailView = true
            this.mailId = data,
            this.lastPage = last,
            this.refresh("detail");
        },

        /**
         * 返回
         */
        goBack(){
            this.detailView = false
            this.common = this.lastPage,
            this.refresh(this.lastPage)
        },

        /**
         * 通过Key刷新页面
         */
        refresh(pathName){
            if(pathName=="inbox"){
                this.inboxTimer = new Date().getTime();
            }
            if(pathName=="newMail"){
                this.newMailTimer = new Date().getTime();
            } 
            if(pathName=="drafts"){
                this.draftsTimer = new Date().getTime();
            } 
            if(pathName=="outbox"){
                this.outboxTimer = new Date().getTime();
            } 
            if(pathName=="recycle"){
                this.recycleTimer = new Date().getTime();
            }if(pathName=="detail"){
                this.detailTimer = new Date().getTime();
            }
        }
    }
    
}
</script>