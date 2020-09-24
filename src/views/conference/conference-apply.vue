<template>
  <div>
    <!-- 搜索框 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col :span="15">
          <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
            <el-col :span="4">
              <el-form-item prop="select">
                <el-select v-model="form.select" placeholder="请选择">
                  <el-option label="公司" value="fcompanyname"></el-option>
                  <el-option label="编码" value="fcode"></el-option>
                  <el-option label="名称" value="fname"></el-option>
                  <el-option label="会议室" value="fconfname"></el-option>
                  <el-option label="参会人数" value="fcpmcount"></el-option>
                  <el-option label="是否公开" value="fovert"></el-option>
                  <el-option label="起始时间" value="fstartdate"></el-option>
                  <el-option label="结束时间" value="fenddate"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item prop="selectVal">
              <el-input v-if="isNormal" clearable v-model="form.selectVal" placeholder="请输入任意查询内容"></el-input>
              <el-select v-model="form.selectVal" v-if="isCompany" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
              <el-date-picker
                v-if="isDate"
                clearable
                v-model="form.selectVal"
                value-format="yyyy-MM-dd HH:mm"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
              <el-select v-if="isOvert" v-model="form.selectVal" placeholder="请选择">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon='el-icon-search' size="small"   @click="onSubmit">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon='el-icon-tickets' size="small"   @click="resetForm('form')" class="search-all">显示全部信息</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="9" style="text-align: right;">
          <el-button type="success"   icon="el-icon-folder-add" size="small" @click="add">新增</el-button>
          <el-button type="warning"   icon="el-icon-edit-outline" size="small" @click="toEdit">修改</el-button>
          <el-button type="warning"   icon="el-icon-edit-outline" size="small" @click="toRevise">修订</el-button>
          <el-button type="warning"   icon="el-icon-close" size="small" @click="cancelMsg">取消</el-button>
          <el-button type="info"   icon="el-icon-view" size="small" @click="queryMsg">查看</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card">
      <dynamic-table
        :columns="columns"
        :table-data="tableData"
        :total="total"
        :page-num="pageNum"
        :page-size="pageSize"
        @current-change="onCurrentChange"
        @selection-change="onSelectionChange"
        v-loading="false"
        element-loading-text="加载中"
      ></dynamic-table>
    </el-card>
    <!-- 新增，修改，修订，查看模态框 -->
    <el-form :model="formProcess" ref="formProcess">
      <conference-apply-dialog
        class="children-dialog"
        :title="title"
        :visible="dialogVisible"
        :foid="foid"
        @closeDialog="closeApplyDialog"
      ></conference-apply-dialog>
    </el-form>
  </div>
</template>

<script>
  import DynamicTable from "../../components/common/dytable/dytable.vue";
  import conferenceApplyDialog from "../conference/conference-apply-dialog";

  export default {
    name: "confOffice",
    components: {
      DynamicTable,
      conferenceApplyDialog,
    },
    data() {
      return {
        options: [],
        isCompany: false,
        isDate: false,
        isNormal: true,
        isOvert: false,
        dialogVisible: false,
        pageNum: 1,
        pageSize: 10,
        total: 20,
        title: "",
        foid: "",
        formProcess: {},
        tableData: [],
        multipleSelection: [],
        form: {
          select: [],
          selectVal: "",
        },
        columns: [
          {
            type: "selection",
          },
          {
            key: "fstatusValue",
            title: "状态",
          },
          {
            key: "fcode",
            title: "编码",
          },
          {
            key: "fname",
            title: "名称",
          },
          {
            key: "fconfname",
            title: "会议室",
          },
          {
            key: "fconvenername",
            title: "召集人",
          },
          {
            key: "fconvenerdeptname",
            title: "召集人部门",
          },
          {
            key: "fcontactname",
            title: "联系人",
          },
          {
            key: "fcontactdeptname",
            title: "联系人部门",
          },
          {
            key: "fphone",
            title: "联系方式",
          },
          {
            key: "fcpmcount",
            title: "参会人数(人)",
          },
          {
            key: "fstartdate",
            title: "起始时间",
          },
          {
            key: "fenddate",
            title: "结束时间",
          },
          {
            key: "fovertValue",
            title: "是否公开",
          },
          {
            key: "fexternalVaule",
            title: "是否对外",
          },
          {
            key: "fimportanceValue",
            title: "重要程度",
          },
        ],

          reqParam:{},
      };
    },
    created() {
      this.$nextTick(() => {
        this.getTableData("");
      });
    },
    computed: {
      querySelect() {
        return this.form.select;
      },
    },
    watch: {
      querySelect(val) {
        this.form.selectVal = null;
        if (val == "fstartdate" || val == "fenddate") {
          // 开始，结束时间查询时
          this.isDate = true;
          this.isNormal = false;
          this.isOvert = false;
          this.isCompany = false;
        } else if (val == "fovert") {
          // 是否公开查询时
          this.isOvert = true;
          this.isDate = false;
          this.isNormal = false;
          this.isCompany = false;
        } else if(val == 'fcompanyname'){
          this.isNormal = false;
          this.isDate = false;
          this.isOvert = false;
          this.isCompany = true;
          this.getCompany();
        } else {
          this.isNormal = true;
          this.isDate = false;
          this.isOvert = false;
          this.isCompany = false;
        }
      },
    },
    methods: {
      //公司
      getCompany() {
        this.$api.jobUserManagement.getCompanyData().then(res => {
          if(res.status == '200') {
            this.$nextTick(() => {
              this.options = res.data.data.rows;
            });
          }
        }), error => {
          console.log(error);
        }
      },
      //分页、下一页
      onCurrentChange(val) {
        this.pageNum = val;
        this.getTableData(this.form.select);
      },
      //多选
      onSelectionChange(val) {
        this.multipleSelection = val;
        if (this.multipleSelection.length > 1) {
          this.$message.error("只能选择一个");
          return;
        }
      },
      // 搜索
      onSubmit() {
        this.pageNum = 1;
        this.reqParam = {
            [this.form.select] :this.form.selectVal,
        }
        this.getTableData();
      },
      // 获取列表数据
      getTableData(params) {
        let fcreator = localStorage.getItem('ms_userId');
        if(fcreator === "admin" || fcreator === "admin01" || fcreator === "admin02"){
          fcreator = null;
        }
        let data = {
          page: this.pageNum,
          size: this.pageSize,
          fcreator: fcreator,
        };
        Object.assign(data,this.reqParam);
        this.$api.confMangement.getApplyList(data).then(
          (res) => {
            let taData = res.data.data.rows;
            for (let i in taData) {
              // 状态 0：暂存 1：提交 2：生效 3：作废
              switch (taData[i].fstatus) {
                case 0:
                  taData[i].fstatusValue = "暂存";
                  break;
                case 1:
                  taData[i].fstatusValue = "提交";
                  break;
                case 2:
                  taData[i].fstatusValue = "生效";
                  break;
                case 3:
                  taData[i].fstatusValue = "作废";
                  break;
                default:
                  break;
              }
              // 是否公开 0：公开 1：不公开
              switch (taData[i].fovert) {
                case 0:
                  taData[i].fovertValue = "是";
                  break;
                case 1:
                  taData[i].fovertValue = "否";
                  break;
                default:
                  break;
              }
              // 是否对外 0：对内 1：对外
              switch (taData[i].fexternal) {
                case 0:
                  taData[i].fexternalVaule = "否";
                  break;
                case 1:
                  taData[i].fexternalVaule = "是";
                  break;
                default:
                  break;
              }
              // 重要程度 0：一般 1：重要
              switch (taData[i].fimportance) {
                case 0:
                  taData[i].fimportanceValue = "一般";
                  break;
                case 1:
                  taData[i].fimportanceValue = "重要";
                  break;
                default:
                  break;
              }
            }
            this.searchForm = {};
            this.total = res.data.data.total;
            this.tableData = taData;
            console.log(this.tableData);
          },
          (error) => {
            console.log(error);
          }
        );
      },
      // 新增
      add() {
        this.foid = "";
        this.title = '新建会议申请';
        this.dialogVisible = true;
      },
      // 修改
      toEdit() {
        if (this.multipleSelection.length != 1) {
          this.$message.error("请选择一条数据进行编辑");
          return;
        }
        if (this.multipleSelection[0].fstatusValue != "暂存") {
          this.$message.error("只有暂存状态的数据可以修改");
          return;
        }
        this.foid = this.multipleSelection[0].foid;
        this.title = '修改会议申请';
        this.dialogVisible = true;
      },
      // 修订
      toRevise() {
        if (this.multipleSelection.length != 1) {
          this.$message.error("请选择一条数据进行编辑");
          return;
        }
        if (this.multipleSelection[0].fstatusValue != "生效") {
          this.$message.error("只有生效状态的数据可以修改");
          return;
        }
        this.foid = this.multipleSelection[0].foid;
        this.title = '修订会议申请';
        this.dialogVisible = true;
      },
      // 取消
      cancelMsg() {
        if (this.multipleSelection.length != 1) {
          this.$message.error("请选择一条数据进行编辑");
          return;
        }
        if(this.multipleSelection[0].fstatus != 2){
          this.$message.error("非生效状态的会议申请不可取消！");
          return;
        }
        this.$confirm("确定要取消当前选择的记录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$api.confMangement
              .cancelConfApply(this.multipleSelection[0].foid)
              .then((res) => {
                if (res.data.code == 0) {
                  this.$message.success("已取消!");
                  //刷新表格
                  this.getTableData("");
                }
                // else {
                //   let errorMsg = res.data.msg;
                //   const h = this.$createElement;
                //   let params = h("p", null, [
                //     h("span", null, ""),
                //     h("p", null, errorMsg),
                //   ]);
                //   this.errorOpen(params);
                // }
              }),
              (error) => {
                console.log(error);
              };
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },
      // 错误提示框
      errorOpen(params) {
        this.$msgbox({
          title: "错误",
          message: params,
          showCancelButton: false,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }).then((action) => {
        });
      },
      // 显示全部信息
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.pageNum = 1;
        this.getTableData("");
      },
      //查看
      queryMsg() {
        if (this.multipleSelection.length != 1) {
          this.$message.error("请选择一条数据查看详情");
          return;
        }
        this.foid = this.multipleSelection[0].foid;
        this.title = '查看会议申请';
        this.dialogVisible = true;
      },
      // 关闭模态框
      closeApplyDialog(data) {
        this.foid = "";
        this.dialogVisible = false;
        this.getTableData("");
      },
    },
  };
</script>

<style lang="scss" scoped>
  /deep/ .el-textarea .el-input__count {
    background: #fff0;
  }

  /deep/ .el-select {
    width: 100%;
  }

  /deep/ .el-col {
    padding-right: 6px !important;
  }

  /deep/ .el-confOffice {
    padding-left: 0px !important;
    padding-top: 6px;
  }

  /deep/ .el-table__fixed-right::before {
    background-color: revert;
  }

  /deep/ .el-positionType {
    padding-left: 0px !important;
    padding-top: 6px;
  }

  /deep/ .el-internalmans {
    padding-left: 0px !important;
    padding-top: 10px;
  }

  /deep/ .el-form-item .el-form-item__label {
    padding-left: 13px;
    text-align: left;
  }

  /deep/ .unfocus .el-textarea__inner {
    background-color: #e4e7ed;
    color: #606266;
  }

  /deep/ .unfocus .el-input__inner {
    background-color: #e4e7ed;
    color: #606266;
  }

  /deep/ .el-input.is-disabled .el-input__inner {
    color: #606266;
  }

  /deep/ .el-textarea.is-disabled .el-textarea__inner {
    color: #606266;
  }

  .el-internalMansName_ {
    padding: 10px 0 0 0 !important;
  }

  .box-card:first-child {
    margin-bottom: 16px;
  }

  .icon-search {
    width: 24px;
    height: auto;
    position: absolute;
    top: 8px;
    left: 230px;
    cursor: pointer;
  }
</style>
