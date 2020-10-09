<template>
    <div>
        <el-container>
            <el-main>
                <el-card class="box-card">
                    <span class="tab-title">流程中心</span>
                    <span class="tab-title-tips">Workflow</span>
                    <span class="tab-title-more-tips" @click="toOaSER('Workflow')">more</span>
                    <el-divider></el-divider>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="待办事项" name="1">
                            <template v-for="item in getunhandledTaskList" class="li-box">
                                <ul :class="{'ul-middle':true ,'subjectStyle':item.fisread=='0' }" @click="toLookItems(item,'1')" :key="item.foid">
                                    <li>{{item.fsubject}}<span class="li-after" v-show="item.fisread=='0'"></span></li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <!--<li @click="taskDetail(item.fsrcoId,item.classId,item.factivity,item.fsubject,item.foid,)">{{item.fsrcCompany}}</li>-->
                                    <li>{{item.fsrcCompany}}</li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.faddresser}}</li>
                                </ul>
                                <ul class="ul-middle" @click="toLookItems(item,'1')" :key="item.foid">
                                    <li>{{item.freceiveTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="关注事项" name="2">
                            <template v-for="item in getAttentionTaskList" class="li-box">
                                <ul :class="{'ul-middle':true ,'subjectStyle':item.fisread=='0' }" @click="toLookItems(item,'2')" :key="item.foid">
                                    <li>{{item.fsubject}}<span class="li-after" v-show="item.fisread=='0'"></span></li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.fsrcCompany}}</li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.faddresser}}</li>
                                </ul>
                                <ul class="ul-middle" @click="toLookItems(item,'2')" :key="item.foid">
                                    <li>{{item.freceiveTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="已办事项" name="3">
                            <template v-for="item in getHunTableDataList" class="li-box">
                                <ul :class="{'ul-middle':true ,'subjectStyle':item.fisread=='0' }" @click="toLookItems(item,'3')" :key="item.foid">
                                    <li>{{item.fsubject}}<span class="li-after" v-show="item.fisread=='0'"></span></li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.fsrcCompany}}</li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.faddresser}}</li>
                                </ul>
                                <ul class="ul-middle" @click="toLookItems(item,'3')" :key="item.foid">
                                    <li>{{item.freceiveTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="已发事项" name="4">
                            <template v-for="item in getIssuedItemsList" class="li-box">
                                <ul :class="{'ul-middle':true ,'subjectStyle':item.fisread=='0' }" @click="toLookItems(item,'4')" :key="item.foid">
                                    <li>{{item.fsubject}}<span class="li-after" v-show="item.fisread=='0'"></span></li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.fsrcCompany}}</li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.entityoName}}</li>
                                </ul>
                                <ul class="ul-middle" @click="toLookItems(item,'4')" :key="item.foid">
                                    <li>{{item.freceiveTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="回收站" name="5">
                            <template v-for="item in getRecycleBinList" class="li-box">
                                <ul :class="{'ul-middle':true}" :key="item.foid">
                                    <li>{{item.subject}}</li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.metaClassName}}</li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.startMan}}</li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.receiveTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
                <el-card class="box-card">
                    <span class="tab-title">我的邮件</span>
                    <span class="tab-title-tips">Mail</span>
                    <span class="tab-title-more-tips" @click="toOaSER('Mail')">more</span>
                    <el-divider></el-divider>
                    <el-tabs v-model="activeNameMail" @tab-click="handleClickMail">
                        <el-tab-pane label="收件箱" name="1">
                            <template v-for="item in getReceiveMailList" class="li-box">
                                <ul :class="{'ul-left':true ,'subjectStyle':item.isRead==0 }" @click="toLookMail(item,'1')" :key="item.foid">
                                    <li>{{item.subject}}<span class="li-after" v-show="item.isRead== 0"></span></li>
                                </ul>
                                <ul class="ul-right" @click="toLookMail(item,'1')" :key="item.foid">
                                    <li>{{item.createTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="草稿箱" name="2">
                            <template v-for="item in getDraftMailList" class="li-box">
                                <ul class="ul-left" @click="toLookMail(item,'')" :key="item.foid">
                                    <li>{{item.subject}}<span class="li-after" v-show="item.isRead== 0"></span></li>
                                </ul>
                                <ul class="ul-right" @click="toLookMail(item,'')" :key="item.foid">
                                    <li>{{item.createTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="发件箱" name="3">
                            <template v-for="item in getSendMailList" class="li-box">
                                <ul class="ul-left" @click="toLookMail(item,'')" :key="item.foid">
                                    <li>{{item.subject}}<span class="li-after" v-show="item.isRead== 0"></span></li>
                                </ul>
                                <ul class="ul-right" @click="toLookMail(item,'')" :key="item.foid">
                                    <li>{{item.createTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="回收站" name="4">
                            <template v-for="item in getRecycleMailList" class="li-box">
                                <ul class="ul-left" @click="toLookMail(item,'')" :key="item.foid">
                                    <li>{{item.subject}}<span class="li-after" v-show="item.isRead== 0"></span></li>
                                </ul>
                                <ul class="ul-right" @click="toLookMail(item,'')" :key="item.foid">
                                    <li>{{item.createTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-main>
            <el-aside  width="530px">
                <div class="img1 website"  @click="toWebsite">
                    <div  >
                        <img src="../../assets/img/oa2.png">
                        <img src="../../assets/img/oa5.png" class="img5">
                    </div>
                </div>
                <div class="img2 website" @click="toTel">
                    <div  >
                        <img src="../../assets/img/oa4.png">
                        <span>通讯录</span>
                    </div>
                </div>
                <el-card class="box-card-right">
                    <span class="tab-title">日历</span>
                    <span class="tab-title-tips">Calendar</span>
                    <el-divider></el-divider>
                    <el-calendar v-model="value">
                    </el-calendar>
                </el-card>
            </el-aside>
            <el-dialog
                :title="formData.fname"
                :visible.sync="dialogVisible"
                center
                :close-on-click-modal="false"
            >
                <el-form
                    :model="formData"
                    label-width="100px"
                    class="dataForm"
                    size="mini"
                    :label-position="labelPosition"
                >
                    <el-row>
                        <el-col :span="14">
                            <el-form-item label="发件人" prop="senderName">
                                <el-input  size="small" v-model="formData.senderName" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="14">
                            <el-form-item label="主送" prop="addresseeName">
                                <el-input  size="small" v-model="formData.addresseeName" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="14">
                            <el-form-item label="抄送" prop="duplicateName">
                                <el-input  size="small" v-model="formData.duplicateName" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="14">
                            <el-form-item label="主题" prop="subject">
                                <el-input  size="small" v-model="formData.subject"  readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="14">
                            <el-form-item label="发送时间" prop="sendTime">
                                <el-input  size="small" v-model="formData.sendTime" readonly></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-tabs v-model="atctiveName" @tab-click="changeTabs">
                                <el-tab-pane label="内容" name="article">
                                    <quill-editor
                                        v-model="content"
                                        ref="myQuillEditor"
                                        :options="editorOption"
                                        style="height:400px"
                                    ></quill-editor>
                                </el-tab-pane>
                                <el-tab-pane label="附件" name="enclosure">
                                    <enclosurefile :enclosureConfig="enclosureConfig"/>
                                </el-tab-pane>
                            </el-tabs>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
            <WAApage  :rowWAADataObj="rowWAADataObj" :rowWAAtype="rowWAAtype" :isOa="isOa" @changeShow="showORhideForWAA" :seeFlag="seeFlag" :functionType="functionType" />
        </el-container>
    </div>
</template>
<script>
import WAApage from '../process-set/warehousing-applicant-approval.vue';
import enclosurefile from '../inside-mail/enclosure-file.vue';
import { quillEditor } from 'vue-quill-editor'; //调用编辑器
import 'quill/dist/quill.snow.css';
import * as Quill from 'quill';
export default {
    name:'oaPersonalHome',
    components: {
        WAApage,
        quillEditor,
        enclosurefile
    },
    inject: ["reload"],
    data() {
        return{
            labelPosition: 'left',
            atctiveName:'article',
            functionType:'',
            factivity:'',
            fsubject:'',
            isOa:false,
            seeFlag:false,
            rowWAADataObj:{},
            rowWAAtype:false,
            dialogVisible:false,
            detailMsg:[],
            activeName: '1',
            activeNameMail:'1',
            value: new Date(),
            getReceiveMailList:[],
            getRecycleMailList:[],
            getDraftMailList:[],
            getSendMailList:[],
            getunhandledTaskList:[],
            getAttentionTaskList:[],
            getHunTableDataList:[],
            getIssuedItemsList:[],
            getRecycleBinList:[],
            formData:{},
            //文本编辑器
            content: '',
            editorOption: {
                placeholder: '请输入内容',
                modules: {
                    toolbar: null
                }
            },
            // 附件
            enclosureConfig:{
                voucherId: '',
                isShowButton: false,
                menuCode: 'insideMail',
                isDownload:true,
                isSearch:false,
                authStatus:true,
            },
        }
    },
    created(){
        this.$nextTick(()=>{
            this.getReceiveMail();
            this.getunhandledTask();
        })
    },
    computed:{

    },
    methods:{
        toOaSER(ValStr) {
            sessionStorage.setItem("oaMenu", false);
            //根据token查询登陆人的信息并存入缓存
            //通过用户ID查询菜单
            this.$api.common.findMenuByComputer({
                userId: localStorage.getItem('ms_userId')
            }).then(data2 => {
                //菜单放入本地缓存,并跳转首页
                sessionStorage.setItem("menuList", JSON.stringify(data2.data.data));
                //获取员工树信息
                this.getStaffTreeList(ValStr)
            })
        },
        //登录时获取员工树信息
        getStaffTreeList(ValStr) {
            this.$api.confMangement.getStaffTreeList({}).then(res => {
                let resData = res.data.data;
                let resDataArr = eval("(" + resData + ")");
                localStorage.setItem('conf_staffTree', JSON.stringify(resDataArr));
                this.$parent.show()
                if(ValStr=='Workflow'){
                    this.$router.push({
                        name: "todolist"
                    });
                }else{
                    this.$router.push({
                        name: "insideMailCommon"
                    });
                }
            })
        },
        changeTabs(tab){
            let name = tab.name;
            this.atctiveName  = name
        },
        taskDetail(fsrcoId,type,factivity,fsubject,foid) {
            this.rowWAAtype = true;
            this.isOa = true;
            this.functionType = type;
            this.rowWAADataObj.fsrcoId = fsrcoId;
            this.rowWAADataObj.factivity = factivity;
            this.rowWAADataObj.fsubject = fsubject;
            this.rowWAADataObj.foid = foid;
        },
        showORhideForWAA(data){
            if(data == false){
                this.reload();
                this.rowWAAtype = false
            }else{
                this.rowWAAtype = true
            }
        },
        toLookItems(val,activeName){
            let finandata = val;
            //finandata.selectData = val;
            finandata.finanrowname="人员缺省查询方案";
            finandata.finanrowId="QS_0056";
            finandata.nametitle = val.fsrcCompany;
            finandata.fsubjectName = val.fsubject;
            finandata.foid = val.foid;
            this.functionType = val.classId;
            this.isOa = true;
            if(activeName=='3'){
                this.seeFlag = true;
                finandata.relay = true;
                finandata.attention = true;
                finandata.print = true;
                finandata.sign = false;
                finandata.commit = false;
                finandata.read = false;
                finandata.trust = false;
                finandata.NewOrEditFlag = 'SHOW';
            }
            if(activeName=='1'){
                this.seeFlag = false;
                let subject = val.fsubject;
                subject= subject.substring(0,4);
                if (subject.indexOf("加签") > -1) {
                    finandata.relay = false;
                    finandata.attention = false;
                    finandata.sign = false;
                    finandata.commit = true;
                    finandata.read = false;
                    finandata.trust = false;
                    finandata.NewOrEditFlag = 'NEW';
                }else{
                    finandata.relay = true;
                    finandata.attention = true;
                    finandata.sign = true;
                    finandata.commit = true;
                    finandata.read = true;
                    finandata.trust = true;
                    finandata.NewOrEditFlag = 'NEW';
                }
            }
            if(activeName=='2'){
                this.seeFlag = true;
                finandata.relay = true;
                finandata.attention = false;
                finandata.sign = false;
                finandata.commit = false;
                finandata.read = false;
                finandata.trust = false;
                finandata.NewOrEditFlag = 'SHOW';
            }
            if(activeName=='4'){
                this.seeFlag = true;
                finandata.relay = true;
                finandata.attention = true;
                finandata.sign = false;
                finandata.commit = false;
                finandata.read = false;
                finandata.trust = false;
                finandata.NewOrEditFlag = 'SHOW';
            }
            let selectData=[];
            selectData.push(val);
            finandata.selectData=selectData;
            this.rowWAADataObj = finandata;
            this.rowWAAtype=true;
            let localKey = localStorage.getItem('ms_userId') + "_" + val.foid;
            localStorage.setItem(localKey, "1");
            /*
            let data={
                oid:val.foid,
                userId:localStorage.getItem('ms_userId')
            }
            let localKey = localStorage.getItem('ms_userId') + "_" + val.foid;
            localStorage.setItem(localKey, "1");
            this.$api.processSet.getunhandledTask(data).then(res => {
                let  finandata={}
                finandata.finanrowname="人员缺省查询方案";
                finandata.finanrowId="QS_0056";
                finandata.nametitle="入库申请申请人审批";
                this.rowWAADataObj=finandata;
                this.detailMsg = '流程中心';
                this.rowWAAtype=true;
                this.isOa = true;
            })*/
            // 点击后刷新
            switch (activeName) {
                case '1':
                    this.getunhandledTask();
                    break;
                case '2':
                    this.getAttentionTask();
                    break;
                case '3':
                    this.getHunTableData();
                    break;
                case '4':
                    this.getIssuedItems();
                    break;
                case '5':
                    this.getRecycleBinItems();
                    break;
                default:
                    break;
            }
        },
        toLookMail(val,activeNameMail){
            let data={
                id:val.id
            }
            this.$api.insideMail.getMailById(data).then(res => {
                this.formData={};
                this.formData = res.data.data;
                this.content=this.formData.content;
                this.enclosureConfig.voucherId = this.formData.mailCode;
                this.dialogVisible = true;
            })
            // 点击后刷新
            switch (activeNameMail) {
                case '1':
                    this.getReceiveMail();
                    break;
            }
        },
        handleClick() {
            switch (this.activeName) {
                case '1':
                    this.getunhandledTask();
                    break;
                case '2':
                    this.getAttentionTask();
                    break;
                case '3':
                    this.getHunTableData();
                    break;
                case '4':
                    this.getIssuedItems();
                    break;
                case '5':
                    this.getRecycleBinItems();
                    break;
                default:
                    break;
            }
        },
        //待办事项
        getunhandledTask(){
            let data={
                infosBeginNum: 1,
                infosEndNum: 10,
                userId:localStorage.getItem('ms_userId')
            }
            this.$api.processSet.getunhandledTask(data).then(res=>{
                let unhandledTaskList=[];
                unhandledTaskList = res.data.data.rows;
                //去未读红点
                unhandledTaskList.forEach((item, index) => {
                    let localKey = localStorage.getItem('ms_userId') + "_" + item.foid;
                    item.fisread = "0";
                    if (localStorage.getItem(localKey)){
                        item.fisread = "1";
                    }
                });
                this.getunhandledTaskList = unhandledTaskList;
           })
        },
        //关注事项
        getAttentionTask(){
            let data={
                infosBeginNum: 1,
                infosEndNum: 10,
                userId: localStorage.getItem('ms_userId')
            }
            this.$api.processSet.attentionTask(data).then(res=>{
                let AttentionTaskList=[];
                AttentionTaskList = res.data.data.rows;
                //去未读红点
                AttentionTaskList.forEach((item, index) => {
                    let localKey = localStorage.getItem('ms_userId') + "_" + item.foid;
                    item.fisread = "0";
                    if (localStorage.getItem(localKey)){
                        item.fisread = "1";
                    }
                });
                this.getAttentionTaskList =AttentionTaskList;
            })
        },
        //已办事项
        getHunTableData(){
            let data={
                infosBeginNum: 1,
                infosEndNum: 10,
                userId: localStorage.getItem('ms_userId')
            }
            this.$api.processSet.handledTask(data).then(res=>{
                let HunTableDataList=[];
                HunTableDataList = res.data.data.rows;
                //去未读红点
                HunTableDataList.forEach((item, index) => {
                    let localKey = localStorage.getItem('ms_userId') + "_" + item.foid;
                    item.fisread = "0";
                    if (localStorage.getItem(localKey)){
                        item.fisread = "1";
                    }
                });
                this.getHunTableDataList =HunTableDataList;
           })
        },
        //已发事项
        getIssuedItems(){
            let data={
                infosBeginNum: 1,
                infosEndNum: 10,
                userId: localStorage.getItem('ms_userId')
            }
            this.$api.processSet.sendedTask(data).then(res=>{
                let IssuedItemsList=[];
                IssuedItemsList = res.data.data.rows;
                //去未读红点
                IssuedItemsList.forEach((item, index) => {
                    let localKey = localStorage.getItem('ms_userId') + "_" + item.foid;
                    item.fisread = "0";
                    if (localStorage.getItem(localKey)){
                        item.fisread = "1";
                    }
                });
                this.getIssuedItemsList =IssuedItemsList;
            })
        },
        //回收站
        getRecycleBinItems(){
            let data={
                page: 1,
                size: 10,
                oid: localStorage.getItem('ms_userId')
            }
            this.$api.processSet.getRecycleBinList(data).then(res=>{
                let RecycleBinList=[];
                RecycleBinList= res.data.data.rows;
                //去未读红点
                RecycleBinList.forEach((item, index) => {
                    let localKey = localStorage.getItem('ms_userId') + "_" + item.foid;
                    item.fisread = "0";
                    if (localStorage.getItem(localKey)){
                        item.fisread = "1";
                    }
                });
                this.getRecycleBinList=RecycleBinList;
            })
        },
        handleClickMail() {
            switch (this.activeNameMail) {
                case '1':
                    this.getReceiveMail();
                    break;
                case '2':
                    this.getDraftMail();
                    break;
                case '3':
                    this.getSendMail();
                    break;
                case '4':
                    this.getRecycleMail();
                    break;
                default:
                    break;
            }
        },
        //获取收件箱信息
        getReceiveMail(){
            let data ={
                //owner:"BFPID000000LSN000E",
                //owner: localStorage.getItem('ms_userId'),
                owner: localStorage.getItem('ms_staffId'),
                page: 1,
                size: 10
            }
            this.$api.insideMail.getReceiveMail(data).then(res=>{
                this.getReceiveMailList = res.data.data.rows;
            })
        },
        //草稿箱
        getDraftMail(){
            let data ={
                //owner: localStorage.getItem('ms_userId'),
                owner: localStorage.getItem('ms_staffId'),
                //owner:"BFPID000000LSN000E",
                page: 1,
                size: 10
            }
            this.$api.insideMail.getDraftMail(data).then(res=>{
                this.getDraftMailList = res.data.data.rows;
            })
        },
        //发件箱
        getSendMail(){
            let data ={
                //owner: localStorage.getItem('ms_userId'),
                owner: localStorage.getItem('ms_staffId'),
                //owner:"BFPID000000LSN000E",
                page: 1,
                size: 10
            }
            this.$api.insideMail.getSendMail(data).then(res=>{
                this.getSendMailList = res.data.data.rows;
            })
        },
        //回收站
        getRecycleMail(){
            let data ={
                //owner: localStorage.getItem('ms_userId'),
                owner: localStorage.getItem('ms_staffId'),
                //owner:"BFPID000000LSN000E",
                page: 1,
                size: 10
            }
            this.$api.insideMail.getRecycleMail(data).then(res=>{
                this.getRecycleMailList = res.data.data.rows
            })
        },
        toWebsite() {
            window.open("http://www.fujiagroup.com/");
        },
        toTel() {
            window.open("http://192.168.85.96:8093/file/txl.html");
        },
    }
}
</script>
<style lang="scss" scoped>
    .el-container{
        font-family: MicrosoftYaHei;
        overflow-y: auto;
        width: 100%;
        height: 88vh;
        // margin-bottom: 20px;
    }
  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
    overflow: unset;
    width: 100%;
  }

  .el-main {
    padding: 0;
    margin-right: 20px;
    width: 100%;
    height: 100%;
    overflow: unset !important;
  }
  .box-card{
      display: flex;
      margin-bottom: 20px;
      .el-divider--horizontal{
        margin:11px 0 0 0;
        width: 55vw;
      }
      .el-tab-pane{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
     /deep/ .el-tabs__nav-wrap::after{
          display: none !important;
      }
       /deep/ .el-tabs__content{
              width: 96%;
      }
    .ul-left {
        width: 50%;
    }
    .ul-middle {
        width: 25%;
    }
    .ul-right {
        width: 50%;
        text-align: right;
    }
        ul li{
            list-style: none;
            cursor: pointer;
        line-height: 34px;
        }
    }
    .tab-title{
        font-size:18px;
        color: #2D72C9;
        line-height:16px;
    }
    .tab-title-tips{
        color: #B8B8B8;
        font-size:14px;
        margin-left: 10px;
    }
    .tab-title-more-tips{
        color: #181717;
        font-size:18px;
        float:right;
        margin-right: 10px;
    }
    .img1{
      background-image: url("../../assets/img/oa1.png");
        max-width: 520px;
        height: 20vh;
        display: flex;
        justify-content: center;
        align-items: center;
        // background-size: cover;
        // background-position: center;
        object-fit: cover;
        object-position: center top;
        div{
            display: flex;
            flex-wrap: wrap;
            width: 200px;
            justify-content: center;
        }
        img{
            display: block;
        }
    }
    .img2{
      background-image: url("../../assets/img/oa3.png");
        max-width: 520px;
        height: 20vh;
        margin: 15px 0;
        object-fit: cover;
        object-position: center top;
        display: flex;
        justify-content: center;
        align-items: center;
         div{
            display: flex;
            flex-wrap: wrap;
            width: 100px;
            justify-content: center;
            img{
                display: block;
            }
            span{
                font-size:20px;
                line-height: 16px;
                margin-top: 30px;
                color: #FFFFFF;

            }
        }
    }
    .box-card-right{
        display: flex;
         max-width: 520px;
         text-align: left;
         height: 396px;
         line-height: 16px;
         margin-bottom: 20px;
          .el-divider--horizontal{
                margin:11px 0 18px 0;
            }
        .el-calendar{
            height: 300px;
            /deep/ .el-calendar-table .el-calendar-day{
                height: 34px;
            }
        }
    }
    .img5{
        width: 140px;
        height: 34px;
        margin-top: 30px;
    }
    .li-after{
      display: inline-block;
          margin: 0 0 4px 4px;
        width: 6px;
        height: 6px;
        background-color: red;
        border-radius: 4px;
  }
  .website {
  cursor: pointer;
}
.li-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.subjectStyle {
    color: red !important;
}
</style>
