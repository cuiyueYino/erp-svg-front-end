<template>
  <el-container>
    <el-main>
      <el-card class="box-card" v-for="(item,idx) in menuList" :key="item.foid">
        <span class="tab-title">{{item.fname}}</span>
        <el-divider></el-divider>
        <el-tabs :v-model="activeName[idx]" @tab-click="handleClick">
          <el-tab-pane
            v-for="(childrenItem,index) in item.children"
            :key="index"
            :label="childrenItem.fname"
            :name="index.toString()"
          >
            <span v-for="(childListItems,indx) in childList[idx]" class="li-box">
              <ul class="ul-left" @click="toLook(childListItems)">
                <li>
                  {{childListItems.fname}}
                  <span class="li-after" v-show="childListItems.fisread=='0'"></span>
                </li>
              </ul>
              <ul class="ul-right" @click="toLook(childListItems)">
                <li>{{$Uformat.formatDateTYMD(childListItems.fcreatetime)}}</li>
              </ul>
            </span>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-main>
    <el-aside width="30%">
      <div class="img1" @click="toWebsite">
        <div class="website">
          <img src="../../assets/img/oa2.png" />
          <img src="../../assets/img/oa5.png" class="img5" />
        </div>
      </div>
      <div class="img2" @click="toTel">
        <div class="website">
          <img src="../../assets/img/oa4.png" />
          <span>通讯录</span>
        </div>
      </div>
      <el-card class="box-card-right">
        <span class="tab-title">日历</span>
        <span class="tab-title-tips">Calendar</span>
        <el-divider></el-divider>
        <el-calendar v-model="value"></el-calendar>
      </el-card>
    </el-aside>
    <el-dialog
      :title="detailMsg.fname"
      :visible.sync="dialogVisible"
      center
      :close-on-click-modal="false"
    >
      <span v-html="detailMsg.fcontent"></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">关 闭</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: "oaCompanyHome",
  data() {
    return {
      dialogVisible:false,
      activeName: "0",
      value: new Date(),
      menuList: [],
      childList: [],
      detailMsg:[]
    };
  },
  components: {},
  created() {
    this.$nextTick(() => {});
  },
  watch:{
      
  },
  computed: {},
  created() {
    this.$nextTick(() => {
        this.getMenuList()
        this.firstGetMenu();
    });
  },
  methods: {
    async firstGetMenu(){
      let getItems = []
       this.$api.documentManagement
        .getDocumentCategoryOrgArch()
        .then((res) => {
          this.menuList = eval("(" + res.data.data + ")")[0].children; //console.log(this.menuList )
          if (this.menuList) { 
            this.menuList.forEach((item, index) => {
              if(item.children){
                  getItems.push( this.firstGetItem(item.children[0].foid) )
              }
             Promise.all(getItems).then(res=>{
                  this.childList = res
             })
            })     
          }
        })
    },
    async firstGetItem(data){
      let getDetail = await this.getChildList(data)
      return getDetail
    },
    handleClick(tab) {
    //   console.log(tab);
      this.menuList.forEach((item, index) => {
        item.children.forEach((childrenItem, idx) => {
          if (childrenItem.fname == tab.label) {//console.log(childrenItem);
          let data={
               fpid: childrenItem.foid,
               fuserid:localStorage.getItem('ms_userId'),
                page: 1,
                size: 10,
          }
            this.$api.documentManagement.findDocumentManageByPage(data)
                .then((res) => {
                   this.$set(this.childList,index, res.data.data.rows);
                    // console.log(this.childList)
                })
                .catch((err) => {
                    console.log(err);
                });
          }
        });
      });
    },

    // 获取二级菜单详情列表
     async getChildList(item) {//console.log(item)
      let getChildListNew = [];
      this.childList = [];
      let getItems = [];
      let data = {
        fpid: item,
        fuserid:localStorage.getItem('ms_userId'),
        page: 1,
        size: 10,
      };
       return new Promise((resolve,reject)=>{
          this.$api.documentManagement.findDocumentManageByPage(data)
          .then((res) => { 
               resolve(res.data.data.rows)
          })
          .catch((err) => {
            console.log(err);
          });
         
          })
      
    },
    //   获取菜单list
    getMenuList() {
      this.$api.documentManagement
        .getDocumentCategoryOrgArch()
        .then((res) => {
          this.menuList = eval("(" + res.data.data + ")")[0].children;
        //   console.log(this.menuList);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closeDialog(){
        this.detailMsg.fisread = '1'
            this.childList.forEach((items,index)=>{
                items.forEach((item,idx)=>{
                    if( item.foid == this.detailMsg.foid ){
                        this.$set(items,idx, this.detailMsg);
                        this.dialogVisible = false
                    }
                })
        });
    },
    toWebsite() {
      window.open("http://www.fujiagroup.com/");
    },
    toTel() {
      window.open("http://192.168.85.96:8092/file/txl.htm");
    },
    //查看页面详情
    toLook(val) {console.log(val)
    let data ={
        "from": "1",
        "foid": val.foid,
        "fuserid": localStorage.getItem('ms_userId')
        }
      this.$api.documentManagement.findDocumentManageById(data).then(res => {
        if (res.data.data) {
            this.dialogVisible = true;
            this.detailMsg = res.data.data
        } else {
            this.$message.error('查询失败!');
        }
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.el-container {
  font-family: MicrosoftYaHei;
  overflow-y: auto;
  overflow-x: hidden;
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
/deep/ .el-dialog--center .el-dialog__body {
  overflow: auto;
}
.el-main {
  padding: 0;
  margin-right: 20px;
  width: 100%;
  height: 100%;
  overflow: unset !important;
}
.box-card {
  display: flex;
  margin-bottom: 20px;
  .el-divider--horizontal {
    margin: 11px 0 0 0;
    width: 63vw;
  }
  .el-tab-pane {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  /deep/ .el-tabs__nav-wrap::after {
    display: none !important;
  }
  /deep/ .el-tabs__content {
    width: 96%;
  }
  .li-after {
    display: inline-block;
    margin: 0 0 4px 4px;
    width: 6px;
    height: 6px;
    background-color: red;
    border-radius: 4px;
  }
  .ul-left {
    width: 50%;
  }
  .ul-right {
    width: 50%;
    text-align: right;
  }
  ul li {
    list-style: none;
    cursor: pointer;
    line-height: 34px;
  }
}
.tab-title {
  font-size: 18px;
  color: #2d72c9;
  line-height: 16px;
}
.tab-title-tips {
  color: #b8b8b8;
  font-size: 14px;
  margin-left: 10px;
}
.img1 {
  background-image: url("../../assets/img/oa1.png");
  max-width: 520px;
  cursor: pointer;
  height: 270px;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-size: cover;
  // background-position: center;
  object-fit: cover;
  object-position: center top;
  div {
    display: flex;
    flex-wrap: wrap;
    width: 200px;
    justify-content: center;
  }
  img {
    display: block;
  }
}
.img2 {
  background-image: url("../../assets/img/oa3.png");
  cursor: pointer;
  max-width: 520px;
  height: 270px;
  margin: 15px 0;
  object-fit: cover;
  object-position: center top;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    flex-wrap: wrap;
    width: 100px;
    justify-content: center;
    img {
      display: block;
    }
    span {
      font-size: 20px;
      line-height: 16px;
      margin-top: 30px;
      color: #ffffff;
    }
  }
}
.box-card-right {
  display: flex;
  max-width: 520px;
  text-align: left;
  height: 396px;
  line-height: 16px;
  margin-bottom: 20px;
  .el-divider--horizontal {
    margin: 11px 0 18px 0;
  }
  .el-calendar {
    height: 300px;
    /deep/ .el-calendar-table .el-calendar-day {
      height: 34px;
    }
  }
}
.img5 {
  width: 140px;
  height: 34px;
  margin-top: 30px;
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