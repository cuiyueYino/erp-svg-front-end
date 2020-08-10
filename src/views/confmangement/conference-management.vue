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
            type="date"
            format="M月d日"
            value-format="yyyy-MM-dd"
            size="small"
            :clearable="false"
            :editable="false"
            disabled
          ></el-date-picker>
          <el-button type="primary" icon="el-icon-arrow-right" size="mini"></el-button>
        </el-col>
        <el-col :span="9" style="text-align: right;" v-if="buttonShow">
          <button class="bt-style bt-start" @click="editStatus(0)">开始</button>
          <button class="bt-style bt-end" @click="editStatus(1)">停止</button>
          <button class="bt-style bt-outTime" @click="outTime">超时</button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 表格 -->
    <div class="row-list">
      <el-row :gutter="24">
        <div v-for="(item,index) in tableData" :key="item.foid">
          <div :class="[
          {'module background-img-1': (item.fconfshow == null && isclick != index)},
          {'module background-img-2 leisure-click': (item.fconfshow == null && isclick == index)},
          {'module background-img-3': (item.fconfshow != null && isclick != index)},
          {'module background-img-4 using-click': (item.fconfshow != null && isclick == index)}
          ]"
               @click="button(item,index)"
               @dblclick="showConf(item)">
            <div :class="[
              {'mark-style mark-un-using': (item.fconfshow == null && isclick != index)},
              {'mark-style mark-un-using-click': (item.fconfshow == null && isclick == index)},
              {'mark-style mark-using': (item.fconfshow != null && isclick != index)},
              {'mark-style mark-using-click': (item.fconfshow != null && isclick == index)}
            ]">
              {{index + 1}}
            </div>
            <div class="second-li">
              <label
                :class="item.fconfshow == null ? 'unusingConf-fontStyle confFirst_style' : 'usingConf-fontStyle confFirst_style'">{{item.fname}}</label>
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
                  class="usingConf-fontStyle confSecond_style"
                >{{item.fconfshow.fconvenerdept}}</label>
              </el-tooltip>
              <label
                class="usingConf-fontStyle confThird_style">{{item.fconfshow.fimportance==0?'一般':'重要'}}</label>
              <label
                class="usingConf-fontStyle confThird_style">{{item.fconfshow.fexternal==0?'对内':'对外'}}</label>
            </div>
            <div v-if="item.fconfshow != null" class="four-li">
              <label class="usingConf-fontStyle confFour_style">{{item.fconfshow.confDatePeriod}}</label>
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
  import './conference-style.css';
  import vHead from './conference-header.vue';
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
    watch: {},
    data() {
      return {
        tagsList: [],
        collapse: false,
        inject: ['bus'],
        options: [],
        value1: "",
        value2: "",
        nowDate: "",
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
        backgroundImg: "",
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
      button(item, index) {
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
        this.value2 = date.year + "-" + date.month + "-" + date.date;
      },
      // 开始，结束，超时
      editStatus(fstatus) {
        let data = {}
        let confShow = this.clickData.fconfshow;
        if (fstatus == 0) {
          // 会议开始
          data.fconfid = this.clickData.foid
        } else {
          // 结束，超时
          if (confShow == null) {
            this.$message.error("当前会议室没有开始状态的会议！");
            return;
          }
          data.foid = confShow.foid;
          data.fstatus = fstatus;
        }
        if (fstatus == 2) {
          // 超时
          data.fouttime = this.fouttime;
        }
        this.$api.confMangement.editConfMnt(data).then(
          (res) => {
            if (res.data.code == 0) {
              this.$message.success("设置成功");
              //刷新页面
              this.getTableData();
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
        this.isclick = -1;
        this.buttonShow = false;
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
  /deep/ .el-dialog {
    margin-top: 25vh !important;
    border-radius: 0px 0px 5px 5px;
  }

  /deep/ .el-dialog__headerbtn {
    top: 10px;
  }

  /deep/ .el-dialog__headerbtn .el-dialog__close {
    color: #FFFFFF;
  }

  /deep/ .el-table th {
    background-color: #EDF5FF !important;
  }

  /deep/ .el-table th > .cell {
    color: #2989FF;
  }

  /deep/ .el-dialog__body {
    padding: 0px 20px;
  }

  /deep/ .el-dialog__title {
    line-height: 26px;
    font-size: 16px;
    color: #FFFFFF;
  }

  /deep/ .el-dialog__header {
    padding: 6px 20px 0px !important;
    background-color: #2989FF !important;
    border-radius: 5px 5px 0px 0px !important;
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

  /deep/ .el-card__body {
    height: 100%;
  }

  /deep/ .dateSelect .el-input__inner {
    border: none !important;
    font-size: 14px;
    font-family: Microsoft YaHei;
    color: #2989FF;
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
