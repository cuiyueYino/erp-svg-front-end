<template>
  <div class="wrapper">
    <v-head></v-head>
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-button size="small" plain class="header-button">公司</el-button>
          <el-select size="small" v-model="fcompanyid" placeholder="福佳集团" class="comSelect" @change="search()">
            <el-option
              v-for="item in options"
              :key="item.foid"
              :label="item.name"
              :value="item.id"
              :fcompanyid="item.foid"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-arrow-left" size="mini"></el-button>
          <el-date-picker
            class="dateSelect"
            v-model="value2"
            align="right"
            type="datetime"
            format="M月d日"
            size="small"
            :picker-options="pickerOptions"
          ></el-date-picker>
          <el-button type="primary" icon="el-icon-arrow-right" size="mini"></el-button>
        </el-col>
        <el-col :span="9" style="text-align: right;" v-if="buttonShow">
          <el-button type="success" plain class="el-icon-plus" size="medium" @click="editStatus(0)">开始</el-button>
          <el-button type="warning" plain class="el-icon-edit" size="medium" @click="editStatus(1)">停止</el-button>
          <el-button type="primary" plain class="el-icon-unlock" size="medium" @click="outTime">超时</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 表格 -->
    <div class="row-list">
      <el-row :gutter="24">
        <div v-for="(item,index) in tableData" :key="item.foid">
          <div :class="isclick != index ? 'moduleCut' : 'moduleCutClose'" :style="item.fconfshow == null ? moduleCut1 : moduleCut2" @click="button(item,index)"
               @dblclick="showConf(item)">
            <div class="second-li">
              <label class="confName_style">{{item.fname}}</label>
            </div>
            <div v-if="item.fconfshow != null" class="third-li">
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.fconfshow.fconvenerdept"
                placement="top-start"
              >
                <label
                  show-overflow-tooltip
                  width="80"
                  class="confSecond_style"
                >{{item.fconfshow.fconvenerdept}}</label>
              </el-tooltip>
              <label class="confThird_style">{{item.fconfshow.fimportance==0?'一般':'重要'}}</label>
              <label class="confThird_style">{{item.fconfshow.fexternal==0?'对内':'对外'}}</label>
            </div>
            <div v-if="item.fconfshow != null" class="four-li">
              <label class="confFour_style">{{item.fconfshow.confDatePeriod}}</label>
            </div>
          </div>
        </div>
      </el-row>
    </div>

    <!-- 会议模态框 -->
    <el-form :model="formProcess" ref="formProcess">
      <conference-apply-search
        class="children-dialog"
        :visible="dialogVisible"
        :fconfid="fconfid"
        @closeDialog="closeConf"
      ></conference-apply-search>
    </el-form>
  </div>
</template>

<script>
  import vHead from '../../components/common/Header.vue';
  import conferenceApplySearch from "./conference-apply-search";

  export default {
    name: "confManagements",
    components: {
      // eslint-disable-next-line vue/no-unused-components
      vHead,
      conferenceApplySearch
    },
    created() {

      this.$nextTick(() => {
        this.getNowDate();
        this.getCompanyInfo();
        this.getTableData();
      });
    },
    watch: {
      companyName(val) {
        console.log("1" + val);
      },
      fcompanyid(val) {
        console.log("21" + val);
      }
    },
    data() {
      return {
        tagsList: [],
        collapse: false,
        inject: ['bus'],
        options: [],
        value1: "",
        value2: "",
        isclick: -1,
        clickData: {},
        formProcess: {},
        buttonShow: false,
        isOutTime: false,
        dialogVisible: false,
        fouttime: new Date(2016, 9, 10, 18, 40),
        fconfid: "",
        companyName: "福佳集团",
        fcompanyid: "_DefaultCompanyOId",
        pageNum: 1,
        pageSize: 10,
        total: 20,
        tableData: [],
        imgSrc: "",
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [
            {
              text: "今天",
              onClick(picker) {
                picker.$emit("pick", new Date());
              },
            },
            {
              text: "昨天",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit("pick", date);
              },
            },
            {
              text: "一周前",
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", date);
              },
            },
          ],
        },
        moduleCut1: {
          backgroundImage: "url(" + require("./el-icon-leisure.png") + ")",
        },
        moduleCut2: {
          backgroundImage: "url(" + require("./el-icon-using.png") + ")",
        },
      };
    },
    methods: {
      //分页、下一页
      onCurrentChange(val) {
        this.pageNum = val;
        this.getTableData("");
      },
      // 查询
      search() {
        this.getTableData();
      },
      // 显示功能按钮
      button(item,index) {
        this.clickData = {};
        this.clickData = item;
        this.buttonShow = true;
        this.isclick = index;
      },
      // 获取当前时间
      getNowDate() {
        const nowDate = new Date();
        let date = {
          year: nowDate.getFullYear(),
          month: nowDate.getMonth() + 1,
          date: nowDate.getDate(),
        };
        this.value2 = date.month + "-" + date.date;
      },
      // 开始按钮
      editStatus(fstatus) {
        let data = {}
        if (fstatus == 0) {
          // 会议开始
          data.fconfid = this.clickData.foid
        } else if (fstatus == 1) {
          // 结束
          data.foid = this.clickData.fconfshow.foid;
          data.fstatus = fstatus;
        } else if (fstatus == 2) {
          // 超时
          data.foid = this.clickData.fconfshow.foid;
          data.fstatus = fstatus;
          data.fouttime = this.fouttime;
        }
        this.$api.confMangement.editConfMnt(data).then(
          (res) => {
            if (res.data.code == 0) {
              this.$message.success("当前会议开始");
            } else {
              this.$message.error(res.data.msg);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      outTime() {
        // this.$refs.import.focus();
        // this.isOutTime = true;
      },
      // 会议模态框
      showConf(item) {
        this.fconfid = item.foid;
        this.dialogVisible = true;
      },
      // 获取公司信息，用作下拉框展示
      getCompanyInfo() {
        this.$api.jobUserManagement.getCompanyData().then(res => {
          if (res.status == '200') {
            this.options = res.data.data.rows
          }
        }), error => {
          console.log(error);
        }
      },
      // 获取表格数据
      getTableData() {
        let data = {
          fcompany: this.fcompanyid,
          page: this.pageNum,
          size: this.pageSize,
        };
        this.$api.confMangement.getConfMntList(data).then(
          (res) => {
            let resRows = res.data.data.rows;
            for (let i in resRows) {
              if (resRows[i].fconfshow != null) {
                switch (resRows[i].fconfshow.fimportance) {
                  case 0:
                    resRows[i].fconfshow.fimportanceValue = "一般";
                    break;
                  case 1:
                    resRows[i].fconfshow.fimportanceValue = "重要";
                }
                switch (resRows[i].fconfshow.fexternal) {
                  case 0:
                    resRows[i].fconfshow.fexternal = "对内";
                    break;
                  case 1:
                    resRows[i].fconfshow.fexternal = "对外";
                }
                let startDate = resRows[i].fconfshow.fstartdate.substring(11, 16);
                let endDate = resRows[i].fconfshow.fenddate.substring(11, 16);
                // 正在进行的会议时间段
                resRows[i].fconfshow.confDatePeriod = startDate + "-" + endDate;
              }
            }
            this.tableData = resRows;
            console.log(this.tableData);
            this.total = res.data.data.total;
          },
          (error) => {
            console.log(error);
          }
        );
      },
      // 关闭模态框
      closeConf() {
        this.dialogVisible = false;
        this.getTableData();
      }
    },
  };
</script>
<style lang="scss" scoped>
  .box-card {
    margin: 16px 30px;
    height: 80px;
  }

  .row-list{
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
    border-radius: 4px;
    margin: 16px 30px;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    height: 730px;
    overflow: auto;
  }

  .wrapper{
    background: aliceblue;
  }

  .confName_style {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    text-align: center;
  }

  .confSecond_style {
    font-size: 9px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    padding-right: 10px;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 80px;
  }

  .moduleCut {
    width: 350px;
    height: 255px;
    float: left;
    margin: 60px 90px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .moduleCutClose {
    width: 350px;
    height: 255px;
    float: left;
    margin: 60px 90px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    box-shadow: 0px 0px 20px 1px #b0c1ff;
    border-radius: 10px;
  }

  .confThird_style {
    font-size: 9px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    padding-right: 0px;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 50px;
  }

  .confFour_style {
    font-size: 9px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    padding-right: 0px;
    display: inline-block;
  }

  .second-li {
    width: 100px;
    margin: 70px 130px;
    position: absolute;
  }

  .third-li {
    width: 190px;
    margin: 110px 90px;
    position: absolute;
  }

  .four-li {
    width: 90px;
    margin: 140px 135px;
    position: absolute;
  }

  .timeDialog {
    width: 183px !important;
    position: absolute;
    left: 10%;
    top: 20%;
  }

  .header-button {
    border: 1px solid #2989ff !important;
    border-radius: 3px 0px 0px 3px !important;
    font-size:12px;
    color:rgba(41,137,255,1);
  }

  /deep/ .el-col-6 {
    padding-left: 92px !important;
  }

  /deep/ .el-row {
    margin-left: 120px !important;
  }

  /deep/ .el-date-editor.el-input {
    width: 115px;
  }

  /deep/ .el-card__body{
    height: 100%;
  }

  /deep/ .dateSelect .el-input__inner {
    border: none !important;
  }

  /deep/ .dateSelect .el-input__prefix {
    display: none;
  }

  /deep/ .comSelect .el-input__inner {
    border-radius: 0px 3px 3px 0px;
    border: 0px solid #DCDFE6;
    background-color: #2989ff !important;
    color: #f9fbff;
  }
</style>
