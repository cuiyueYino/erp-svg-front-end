<template>
 <el-container>
    <el-container>
        <el-main>
             <el-card class="box-card">
                 <span class="tab-title">通知公告</span>
                 <span class="tab-title-tips">Notice</span>
                 <el-divider></el-divider>
                 <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-menu-item index="3" >消息中心</el-menu-item>
               </el-menu>
             </el-card>
        </el-main>
    </el-container>
    <el-aside width="30%">
        <div class="img1">
            <img src="../../assets/img/oa2.png">
            <img src="../../assets/img/oa5.png" class="img5">
        </div>
        <div class="img2">
            <!-- <img src="../../assets/img/oa1.png"> -->
        </div>
        <el-card class="box-card-right">
             <span class="tab-title">日历行程</span>
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
    name:'oaCompanyHome',
    data() {
        return {
            activeIndex: '1',
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
        handleSelect(key, keyPath) {
        console.log(key, keyPath);
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
      .el-divider--horizontal{
        margin:11px 0 18px 0;
        width: 63vw;
      }
      .el-menu.el-menu--horizontal{
              border-bottom:none;
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
        // background-size: cover;
        // background-position: center;
        object-fit: cover;
        object-position: center top;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .img2{
      background-image: url("../../assets/img/oa3.png");
        max-width: 520px;
        height: 270px;
        margin: 15px 0;
        object-fit: cover;
        object-position: center top;
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
    }
</style>