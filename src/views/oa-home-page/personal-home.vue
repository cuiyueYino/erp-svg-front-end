<template>
    <div>
        <el-container>
            <el-main>
                <el-card class="box-card">
                    <span class="tab-title">流程中心</span>
                    <span class="tab-title-tips">Workflow</span>
                    <el-divider></el-divider>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="待办事项" name="1">
                            <template v-for="item in getunhandledTaskList" class="li-box">
                                <ul class="ul-middle" @click="toLookItems(item)" :key="item.foid">
                                    <li>{{item.fsubject}}<span class="li-after" v-show="item.fisread=='0'"></span></li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li @click="taskDetail(item.fsrcoId,item.classId,item.factivity,item.fsubject,item.foid,)">{{item.fsrcCompany}}</li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.faddresser}}</li>
                                </ul>
                                <ul class="ul-middle" @click="toLookItems(item)" :key="item.foid">
                                    <li>{{item.freceiveTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="关注事项" name="2">
                            <template v-for="item in getAttentionTaskList" class="li-box">
                                <ul class="ul-middle" @click="toLookItems(item)" :key="item.foid">
                                    <li>{{item.fsubject}}<span class="li-after" v-show="item.fisread=='0'"></span></li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.fsrcCompany}}</li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.faddresser}}</li>
                                </ul>
                                <ul class="ul-middle" @click="toLookItems(item)" :key="item.foid">
                                    <li>{{item.freceiveTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="已办事项" name="3">
                            <template v-for="item in getHunTableDataList" class="li-box">
                                <ul class="ul-middle" @click="toLookItems(item)" :key="item.foid">
                                    <li>{{item.fsubject}}<span class="li-after" v-show="item.fisread=='0'"></span></li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.fsrcCompany}}</li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.faddresser}}</li>
                                </ul>
                                <ul class="ul-middle" @click="toLookItems(item)" :key="item.foid">
                                    <li>{{item.freceiveTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="已发事项" name="4">
                            <template v-for="item in getIssuedItemsList" class="li-box">
                                <ul class="ul-middle" @click="toLookItems(item)" :key="item.foid">
                                    <li>{{item.fsubject}}<span class="li-after" v-show="item.fisread=='0'"></span></li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.fsrcCompany}}</li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.entityoName}}</li>
                                </ul>
                                <ul class="ul-middle" @click="toLookItems(item)" :key="item.foid">
                                    <li>{{item.freceiveTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="回收站" name="5">
                            <template v-for="item in getRecycleBinList" class="li-box">
                                <ul class="ul-middle" @click="toLookItems(item)" :key="item.foid">
                                    <li>{{item.fsubject}}<span class="li-after" v-show="item.fisread=='0'"></span></li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.fsrcCompany}}</li>
                                </ul>
                                <ul class="ul-middle" :key="item.foid">
                                    <li>{{item.faddresser}}</li>
                                </ul>
                                <ul class="ul-middle" @click="toLookItems(item)" :key="item.foid">
                                    <li>{{item.freceiveTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>   
                    </el-tabs>
                </el-card>
                <el-card class="box-card">
                    <span class="tab-title">我的邮件</span>
                    <span class="tab-title-tips">Mail</span>
                    <span class="tab-title-more-tips" @click="toOaSER">more</span>
                    <el-divider></el-divider>
                    <el-tabs v-model="activeNameMail" @tab-click="handleClickMail">
                        <el-tab-pane label="收件箱" name="1">
                            <template v-for="item in getReceiveMailList" class="li-box">
                                <ul class="ul-left" @click="toLookMail(item)" :key="item.foid">
                                    <li>{{item.subject}}<span class="li-after" v-show="item.isRead== 0"></span></li>
                                </ul>
                                <ul class="ul-right" @click="toLookMail(item)" :key="item.foid">
                                    <li>{{item.createTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="草稿箱" name="2">
                            <template v-for="item in getDraftMailList" class="li-box">
                                <ul class="ul-left" @click="toLookMail(item)" :key="item.foid">
                                    <li>{{item.subject}}<span class="li-after" v-show="item.isRead== 0"></span></li>
                                </ul>
                                <ul class="ul-right" @click="toLookMail(item)" :key="item.foid">
                                    <li>{{item.createTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="发件箱" name="3">
                            <template v-for="item in getSendMailList" class="li-box">
                                <ul class="ul-left" @click="toLookMail(item)" :key="item.foid">
                                    <li>{{item.subject}}<span class="li-after" v-show="item.isRead== 0"></span></li>
                                </ul>
                                <ul class="ul-right" @click="toLookMail(item)" :key="item.foid">
                                    <li>{{item.createTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="回收站" name="4">
                            <template v-for="item in getRecycleMailList" class="li-box">
                                <ul class="ul-left" @click="toLookMail(item)" :key="item.foid">
                                    <li>{{item.subject}}<span class="li-after" v-show="item.isRead== 0"></span></li>
                                </ul>
                                <ul class="ul-right" @click="toLookMail(item)" :key="item.foid">
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
            <WAApage  :rowWAADataObj="rowWAADataObj" :rowWAAtype="rowWAAtype" :isOa="isOa" @changeShow="showORhideForWAA" :functionType="functionType" />
        </el-container>
    </div>
</template>

<script>
import WAApage from '../process-set/warehousing-applicant-approval';
import enclosurefile from '../inside-mail/enclosure-file.vue';
import { quillEditor } from 'vue-quill-editor'; //调用编辑器
import 'quill/dist/quill.snow.css';
import * as Quill from 'quill';
export default {
    name:'oaPersonalHome',
    data() {
        return {
            labelPosition: 'left',
            atctiveName:'article',
            functionType:'',
            factivity:'',
            fsubject:'',
            isOa:false,
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
            },
        };
    },
    components: {
        WAApage,
        quillEditor,
        enclosurefile
    },
    created(){
        /*this.$nextTick(()=>{
            this.getReceiveMail()
            this.getunhandledTask()
        })*/
    },
    computed:{
        
    },
    methods:{
        toOaSER() {
            sessionStorage.setItem("oaMenu", false);
            //根据token查询登陆人的信息并存入缓存
            //通过用户ID查询菜单
            this.$api.common.findMenuByComputer({
                userId: localStorage.getItem('ms_userId')
            }).then(data2 => {
                //菜单放入本地缓存,并跳转首页
                sessionStorage.setItem("menuList", JSON.stringify(data2.data.data));
                this.$parent.show()
                this.$router.push({
                    name: "insideMailCommon"
                });
            }) //获取员工树信息
            this.getStaffTreeList()
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
                this.rowWAAtype = false
            }else{
                this.rowWAAtype = true
            }
        },
        closeDialog(){
            // this.detailMsg.isRead = 1
            // this.childList.forEach((items,index)=>{
            //     items.forEach((item,idx)=>{
            //         if( item.foid == this.detailMsg.foid ){
            //             this.$set(items,idx, this.detailMsg);
            //             this.dialogVisible = false
            //         }
            //         })
            // });
        },
        toLookItems(val){
            let  finandata={}
            let data={
                oid:val.foid
            }
            //去未读红点
            let localKey = localStorage.getItem('ms_userId') + "_" + val.foid;
            localStorage.setItem(localKey, "1");
            this.$api.processSet.getunhandledTask(data).then(
                res => {
                    finandata.finanrowname="人员缺省查询方案";
                    finandata.finanrowId="QS_0056";
                    finandata.nametitle="入库申请申请人审批";
                    this.rowWAADataObj=finandata;
                    this.detailMsg = '流程中心';
                    this.rowWAAtype=true;
                    this.isOa = true;
                }
            )
        },
        toLookMail(val){
            let data={
                id:val.id
            }
            this.$api.insideMail.getMailById(data).then(
                res => {
                    this.formData={};
                    this.formData = res.data.data;
                    this.content=this.formData.content;
                    this.enclosureConfig.voucherId = this.formData.mailCode;
                    this.dialogVisible = true
                    console.log(this.formData )
                }
            )
        },
        handleClick() {
            switch (this.activeName) {
                    case '1':
                        this.getunhandledTask()
                        break;
                    case '2':
                        this.getAttentionTask()
                        break;
                    case '3':
                        this.getHunTableData()
                        break;
                    case '4':
                        this.getIssuedItems()
                        break;
                    case '5':
                        this.getRecycleBinItems()
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
                this.getunhandledTaskList=[];
                this.getunhandledTaskList = res.data.data.rows; 
                console.log(this.getunhandledTaskList);
                //去未读红点
                this.getunhandledTaskList.forEach((item, index) => {
                    let finandata = {};
                    finandata.selectData = item;
                    finandata.nametitle = "入库申请申请人审批";
                    finandata.foid = item.foid;
                    this.rowWAADataObj = finandata;
                    this.functionType = item.classId;
                    let localKey = localStorage.getItem('ms_userId') + "_" + item.foid;
                    item.fisread = "0";
                    if (localStorage.getItem(localKey)){
                        item.fisread = "1";
                    }
                });
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
                this.getAttentionTaskList=[];
                this.getAttentionTaskList = res.data.data.rows;
                console.log(this.getAttentionTaskList);
                //去未读红点
                this.getAttentionTaskList.forEach((item, index) => {
                    let localKey = localStorage.getItem('ms_userId') + "_" + item.foid;
                    item.fisread = "0";
                    if (localStorage.getItem(localKey)){
                        item.fisread = "1";
                    }
                });
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
                this.getHunTableDataList=[];
                this.getHunTableDataList = res.data.data.rows;
                console.log(this.getHunTableDataList);
                //去未读红点
                this.getHunTableDataList.forEach((item, index) => {
                    let localKey = localStorage.getItem('ms_userId') + "_" + item.foid;
                    item.fisread = "0";
                    if (localStorage.getItem(localKey)){
                        item.fisread = "1";
                    }
                });
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
                this.getIssuedItemsList=[];
                this.getIssuedItemsList = res.data.data.rows;
                console.log(this.getIssuedItemsList);
                //去未读红点
                this.getIssuedItemsList.forEach((item, index) => {
                    let localKey = localStorage.getItem('ms_userId') + "_" + item.foid;
                    item.fisread = "0";
                    if (localStorage.getItem(localKey)){
                        item.fisread = "1";
                    }
                });
           })
      },
       //回收站
      getRecycleBinItems(){
          let data={
                infosBeginNum: 1,
                infosEndNum: 10,
                userId: localStorage.getItem('ms_userId')
          }
           this.$api.processSet.getRecycleBinList(data).then(res=>{
                this.getRecycleBinList=[];
                this.getRecycleBinList = res.data.data.rows;
                console.log(this.getRecycleBinList);
                //去未读红点
                this.getRecycleBinList.forEach((item, index) => {
                    let localKey = localStorage.getItem('ms_userId') + "_" + item.foid;
                    item.fisread = "0";
                    if (localStorage.getItem(localKey)){
                        item.fisread = "1";
                    }
                });
           })
      },

      handleClickMail() {
        switch (this.activeNameMail) {
            case '1':
                this.getReceiveMail()
                break;
            case '2':
                this.getDraftMail()
                break;
            case '3':
                this.getSendMail()
                break;
            case '4':
                this.getRecycleMail()
                break;
        
            default:
                break;
        }
      },
      /**
     * 获取收件箱信息
     */
       getReceiveMail(){
           let data ={
                //owner:"BFPID000000LSN000E",
                //owner: localStorage.getItem('ms_userId'),
                owner: localStorage.getItem('ms_staffId'),
                page: 1,
                size: 10
           }
        this.$api.insideMail.getReceiveMail(data).then(res=>{
            this.getReceiveMailList=[];
            this.getReceiveMailList = res.data.data.rows
            console.log( this.getReceiveMailList)
        })
       },
    //    草稿箱
    getDraftMail(){
        let data ={
                //owner: localStorage.getItem('ms_userId'),
                owner: localStorage.getItem('ms_staffId'),
                //owner:"BFPID000000LSN000E",
                page: 1,
                size: 10
           }
        this.$api.insideMail.getDraftMail(data).then(res=>{
            this.getDraftMailList=[];
            this.getDraftMailList = res.data.data.rows
            console.log( this.getDraftMailList)
        })
    },
     //    发件箱
    getSendMail(){
        let data ={
                //owner: localStorage.getItem('ms_userId'),
                owner: localStorage.getItem('ms_staffId'),
                //owner:"BFPID000000LSN000E",
                page: 1,
                size: 10
           }
        this.$api.insideMail.getSendMail(data).then(res=>{
            this.getSendMailList=[];
            this.getSendMailList = res.data.data.rows
            console.log( this.getSendMailList)
        })
    },
     //    回收站
    getRecycleMail(){
        let data ={
                //owner: localStorage.getItem('ms_userId'),
                owner: localStorage.getItem('ms_staffId'),
                //owner:"BFPID000000LSN000E",
                page: 1,
                size: 10
           }
        this.$api.insideMail.getRecycleMail(data).then(res=>{
            this.getRecycleMailList=[];
            this.getRecycleMailList = res.data.data.rows
            console.log( this.getRecycleMailList)
        })
    },
        toWebsite() {
      window.open("http://www.fujiagroup.com/");
    },
    toTel() {
      window.open("http://192.168.85.96:8092/file/txl.htm");
    },
    },
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
.dialog-content {
  overflow-y:auto;
  overflow-x:auto;
}

.dialog-h5 >>> img,p,span {
  width: 100%;
}
</style>