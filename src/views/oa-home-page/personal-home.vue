<template>
 <el-container>
    <el-container>
        <el-main>
             <el-card class="box-card">
                 <span class="tab-title">流程中心</span>
                 <span class="tab-title-tips">Workflow</span>
                 <el-divider></el-divider>
                  <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="处理中心" name="1">
                            <ul class="ul-left">
                                <li>关于岗位调整公示</li>
                            </ul>
                            <ul class="ul-right">
                                <li>2020-7-30</li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="消息中心" name="2">
                        </el-tab-pane>
                    </el-tabs>
             </el-card>
             <el-card class="box-card">
                 <span class="tab-title">我的邮件</span>
                 <span class="tab-title-tips">Mail</span>
                 <el-divider></el-divider>
                  <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="处理中心" name="1">
                            <ul class="ul-left">
                                <li>关于岗位调整公示</li>
                            </ul>
                            <ul class="ul-right">
                                <li>2020-7-30</li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="消息中心" name="2">
                        </el-tab-pane>
                    </el-tabs>
             </el-card>
        </el-main>
    </el-container>
    <el-aside width="30%">
        <div class="img1">
            <div>
                <img src="../../assets/img/oa2.png">
                <img src="../../assets/img/oa5.png" class="img5">
            </div>
        </div>
        <div class="img2">
            <div>
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
 </el-container>
</template>

<script>
export default {
    name:'oaPersonalHome',
    data() {
        return {
            activeName: '1',
            value: new Date()
        };
    },
    components: {
    },
    created(){
        this.$nextTick(()=>{

        })
    },
    computed:{
        
    },
    methods:{
        handleClick(tab, event) {
        console.log(tab, event);
      },
        //删除
        deleteMsg(){
            this.$api.processSet.deleteMsg().then(res=>{
                    if(res.data.data.msg = "success"){
                        this.$message.success('删除成功');
                    }
                }),error=>{
                    console.log(error);
                }
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
      }
     /deep/ .el-tabs__nav-wrap::after{
          display: none !important;
      }
       /deep/ .el-tabs__content{
              width: 96%;
      }
      .ul-left{
        //   float: left;
      }
       .ul-right{
        //   float: right;
      }
      ul li{
          list-style: none;
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
</style>