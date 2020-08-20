<template>
 <el-container>
        <el-main>
             <el-card class="box-card">
                 <span class="tab-title">流程中心</span>
                 <span class="tab-title-tips">Workflow</span>
                 <el-divider></el-divider>
                  <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="待办事项" name="1">
                            <template v-for="item in getunhandledTaskList" class="li-box">
                            <ul class="ul-left" @click="toLookItems(item)">
                                <li>{{item.fsubject}}<span class="li-after" v-show="item.fisread=='0'"></span></li>
                            </ul>
                            <ul class="ul-right" @click="toLookItems(item)">
                                <li>{{item.freceiveTime}}</li>
                            </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="关注事项" name="2">
                            <template v-for="item in getAttentionTaskList" class="li-box">
                                <ul class="ul-left" @click="toLookItems(item)">
                                    <li>{{item.fsubject}}<span class="li-after" v-show="item.fisread=='0'"></span></li>
                                </ul>
                                <ul class="ul-right" @click="toLookItems(item)">
                                    <li>{{item.freceiveTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="已办事项" name="3">
                            <template v-for="item in getHunTableDataList" class="li-box">
                                <ul class="ul-left" @click="toLookItems(item)">
                                    <li>{{item.fsubject}}<span class="li-after" v-show="item.fisread=='0'"></span></li>
                                </ul>
                                <ul class="ul-right" @click="toLookItems(item)">
                                    <li>{{item.freceiveTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="已发事项" name="4">
                             <template v-for="item in getIssuedItemsList" class="li-box">
                                <ul class="ul-left" @click="toLookItems(item)">
                                    <li>{{item.fsubject}}<span class="li-after" v-show="item.fisread=='0'"></span></li>
                                </ul>
                                <ul class="ul-right" @click="toLookItems(item)">
                                    <li>{{item.freceiveTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="回收站" name="5">
                             <template v-for="item in getRecycleBinList" class="li-box">
                                <ul class="ul-left" @click="toLookItems(item)">
                                    <li>{{item.fsubject}}<span class="li-after" v-show="item.fisread=='0'"></span></li>
                                </ul>
                                <ul class="ul-right" @click="toLookItems(item)">
                                    <li>{{item.freceiveTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
             </el-card>
             <el-card class="box-card">
                 <span class="tab-title">我的邮件</span>
                 <span class="tab-title-tips">Mail</span>
                 <el-divider></el-divider>
                  <el-tabs v-model="activeNameMail" @tab-click="handleClickMail">
                        <el-tab-pane label="收件箱" name="1">
                            <template v-for="item in getReceiveMailList" class="li-box">
                                <ul class="ul-left" @click="toLookMail(item)">
                                    <li>{{item.subject}}<span class="li-after" v-show="item.isRead== 0"></span></li>
                                </ul>
                                <ul class="ul-right" @click="toLookMail(item)">
                                    <li>{{item.createTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="草稿箱" name="2">
                             <template v-for="item in getDraftMailList" class="li-box">
                                <ul class="ul-left" @click="toLookMail(item)">
                                    <li>{{item.subject}}<span class="li-after" v-show="item.isRead== 0"></span></li>
                                </ul>
                                <ul class="ul-right" @click="toLookMail(item)">
                                    <li>{{item.createTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="发件箱" name="3">
                              <template v-for="item in getSendMailList" class="li-box">
                                <ul class="ul-left" @click="toLookMail(item)">
                                    <li>{{item.subject}}<span class="li-after" v-show="item.isRead== 0"></span></li>
                                </ul>
                                <ul class="ul-right" @click="toLookMail(item)">
                                    <li>{{item.createTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="回收站" name="4">
                             <template v-for="item in getRecycleMailList" class="li-box">
                                <ul class="ul-left" @click="toLookMail(item)">
                                    <li>{{item.subject}}<span class="li-after" v-show="item.isRead== 0"></span></li>
                                </ul>
                                <ul class="ul-right" @click="toLookMail(item)">
                                    <li>{{item.createTime}}</li>
                                </ul>
                            </template>
                        </el-tab-pane>
                    </el-tabs>
             </el-card>
        </el-main>
    <el-aside width="30%">
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
        :title="detailMsg.fname"
        :visible.sync="dialogVisible"
        center
        :close-on-click-modal="false">
            <span v-html="detailMsg.content" ></span>
            <span>1111111111111</span>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">关 闭</el-button>
            </span>
        </el-dialog>
        <WAApage  :rowWAADataObj="rowWAADataObj" :rowWAAtype="rowWAAtype" :isOa="isOa" @changeShow="showORhideForWAA"/>
    </el-container>
 
</template>

<script>
import WAApage from '../process-set/warehousing-applicant-approval';
export default {
    name:'oaPersonalHome',
    data() {
        return {
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
        };
    },
    components: {
        WAApage
    },
    created(){
        this.$nextTick(()=>{
            this.getReceiveMail()
            this.getunhandledTask()
        })
    },
    computed:{
        
    },
    methods:{
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
                    this.detailMsg = res.data.data;
                    this.dialogVisible = true
                    console.log(this.detailMsg )
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
               this.getunhandledTaskList = res.data.data.rows
                console.log(this.getunhandledTaskList)
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
                this.getAttentionTaskList = res.data.data.rows
                console.log(this.getAttentionTaskList)
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
                this.getHunTableDataList = res.data.data.rows
                console.log(this.getHunTableDataList)
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
               this.getIssuedItemsList = res.data.data.rows
                console.log(this.getIssuedItemsList)
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
               this.getRecycleBinList = res.data.data.rows
                console.log(this.getRecycleBinList)
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
            //    owner: localStorage.getItem('ms_userId'),
                owner:"BFPID000000LSN000E",
                page: 1,
                size: 10
           }
        this.$api.insideMail.getReceiveMail(data).then(res=>{
            this.getReceiveMailList = res.data.data.rows
            console.log( this.getReceiveMailList)
        })
       },
    //    草稿箱
    getDraftMail(){
        let data ={
               //    owner: localStorage.getItem('ms_userId'),
                owner:"BFPID000000LSN000E",
                page: 1,
                size: 10
           }
        this.$api.insideMail.getDraftMail(data).then(res=>{
             this.getDraftMailList = res.data.data.rows
            console.log( this.getDraftMailList)
        })
    },
     //    发件箱
    getSendMail(){
        let data ={
              //    owner: localStorage.getItem('ms_userId'),
                owner:"BFPID000000LSN000E",
                page: 1,
                size: 10
           }
        this.$api.insideMail.getSendMail(data).then(res=>{
            this.getSendMailList = res.data.data.rows
            console.log( this.getSendMailList)
        })
    },
     //    回收站
    getRecycleMail(){
        let data ={
               //    owner: localStorage.getItem('ms_userId'),
                owner:"BFPID000000LSN000E",
                page: 1,
                size: 10
           }
        this.$api.insideMail.getRecycleMail(data).then(res=>{
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
        width: 63vw;
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
  .img1{
      background-image: url("../../assets/img/oa1.png");
        max-width: 520px;
        height: 270px;
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
        height: 270px;
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
</style>