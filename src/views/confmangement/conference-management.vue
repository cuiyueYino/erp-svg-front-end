<template>
  <div class="wrapper">
    <v-head></v-head>
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-button size="medium" plain class="header-button">公司</el-button>
          <el-select size="small" v-model="value" placeholder="福佳集团" class="comSelect" @change="search(value)">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
<!--          <el-button type="primary" icon="el-icon-arrow-left" size="mini"></el-button>-->
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
<!--          <el-button type="primary" icon="el-icon-arrow-right" size="mini"></el-button>-->
        </el-col>
        <el-col :span="9" style="text-align: right;" v-if="buttonShow">
          <button class="bt-style bt-start" size='medium' @click="editStatus(0)">开始</button>
          <button class="bt-style bt-end" size='medium' @click="editStatus(1)">停止</button>
          <button class="bt-style bt-outTime" size='medium' @click="outTime">超时</button>
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
          {'module background-img-4 using-click': (item.fconfshow != null && isclick == index)},
          {'module background-img-5': (item.fstatus != null && item.fstatus == 1)}
          ]"
               @click="button(item,index)"
               @dblclick="showConf(item)">
            <div :class="[
              {'mark-style mark-un-using': (item.fconfshow == null && isclick != index)},
              {'mark-style mark-un-using-click': (item.fconfshow == null && isclick == index)},
              {'mark-style mark-using': (item.fconfshow != null && isclick != index)},
              {'mark-style mark-using-click': (item.fconfshow != null && isclick == index)},
              {'mark-style mark-unusing': (item.fstatus != null && item.fstatus == 1)}
            ]">
              {{index + 1}}
            </div>
            <div class="second-li">
              <label
                :class="item.fconfshow == null ? 'unUsingConf-fontStyle confFirst_style' : 'usingConf-fontStyle confFirst_style'">{{item.fname}}</label>
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

    <!-- 超时弹出框 -->
    <div class="out-time-visible" v-show="outTimeVisible">
      <div class="el-dialog__header">
        <slot name="title">
          <span class="el-dialog__title">超时时间</span>
        </slot>
        <button
          type="button"
          class="el-dialog__headerbtn"
          aria-label="Close"
          v-if="showClose"
          @click="handleClose">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </div>
      <el-col class="out-time-body">
        <label>会议超时至：</label>
        <el-time-picker
          class="dateSelect_outTime"
          v-model="fouttime"
          format="HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          size="small"
          :clearable="false"
          :editable="false"
        ></el-time-picker>
      </el-col>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" icon='el-icon-check' size="medium" @click="confirm('fouttime')">确定</el-button>
        <el-button type="warning" plain icon="el-icon-close" size="medium" @click="cancel()">取消</el-button>
      </div>
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
    watch: {
      value(id){
        this.fcompanyid = id;
      }
    },
    data() {
      return {
        tagsList: [],
        collapse: false,
        inject: ['bus'],
        options: [],
        value:"",
        value1: "",
        value2: "",
        nowDate: "",
        isclick: -1,
        clickData: {},
        formProcess: {},
        buttonShow: false,
        isOutTime: false,
        dialogVisible: false,
        outTimeVisible: false,
        fouttime: "",
        fconfid: "",
        companyName: "福佳集团",
        fcompanyid: "_DefaultCompanyOId",
        pageNum: 1,
        pageSize: 10,
        total: 20,
        tableData: [],
        imgSrc: "",
        backgroundImg: "",
        showClose: true,
      };
    },
    methods: {
      //分页、下一页
      onCurrentChange(val) {
        this.pageNum = val;
        this.getTableData("");
      },
      // 查询
      search(value) {
        this.fcompanyid = value;
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
      handleClose() {
        this.outTimeVisible = false;
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
          data.fconfapplyid = confShow.fconfapplyid;
          data.fconfid = this.clickData.foid;
          data.fouttime = this.fouttime;
        }
        this.$api.confMangement.editConfMnt(data).then(
          (res) => {
            if (res.data.code == 0) {
              this.$message.success("设置成功");
              this.outTimeVisible = false;
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
            debugger;
            this.tableData = resRows;
            console.log(this.tableData);
            this.total = res.data.data.total;
          },
          (error) => {
            console.log(error);
          }
        );
      },
      // 超时弹出框
      outTime() {
        if (this.clickData.fconfshow == null) {
          this.$message.error("当前会议室没有开始状态的会议！");
          return;
        }
        this.fouttime = "";
        this.outTimeVisible = true;
      },
      // 超时确认
      confirm(fouttime){
        let endDate = this.clickData.fconfshow.fenddate.replace('T',' ').substring(0,16);
        console.log("结束时间：" + endDate);
        console.log("超时时间：" + this.fouttime);
        if(this.fouttime == null || this.fouttime == ""){
          this.$message.error("超时时间不可为空！");
          return;
        }
        if(this.fouttime <= endDate){
          this.$message.error("超时时间需大于会议结束时间！");
          return;
        }
        this.editStatus(2);
      },
      // 超时取消
      cancel(){
        this.outTimeVisible = false;
        this.fouttime = "";
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

  /deep/ .el-input__inner {
    &::placeholder {
      color: #f9fbff;
    }

    &::-webkit-input-placeholder {
      /* WebKit browsers 适配谷歌 */
      color: #f9fbff;
    }

    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 适配火狐 */
      color: #f9fbff;
    }

    &::-moz-placeholder {
      /* Mozilla Firefox 19+ 适配火狐 */
      color: #f9fbff;
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10+  适配ie*/
      color: #f9fbff;
    }
  }
</style>
