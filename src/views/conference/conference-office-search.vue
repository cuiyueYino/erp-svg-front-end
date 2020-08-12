<template>
  <div>
    <el-dialog
      :title="'会议室查询'"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :modal="false"
      :close-on-click-modal="closeConfig"
      :close-on-press-escape="closeConfig"
      @close="closeDialog"
      style="z-index:2007"
    >
      <el-card class="box-card">
        <el-row :gutter="14">
          <el-col :span="22">
            <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
              <el-col :span="5">
                <el-form-item prop="select">
                  <el-select size="mini" v-model="form.select" placeholder="请选择">
                    <el-option label="编码" value="fcode"></el-option>
                    <el-option label="名称" value="fname"></el-option>
                    <el-option label="地点" value="fsite"></el-option>
                    <el-option label="描述" value="fremark"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-form-item prop="selectVal">
                <el-input class="selectVal" size="mini" clearable v-model="form.selectVal"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" plain @click="searchKey">搜索</el-button>
              </el-form-item>
              <el-form-item>
                <el-button size="small" @click="saveConfig">确 定</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
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
    </el-dialog>
  </div>
</template>

<script>
  import DynamicTable from "../../components/common/dytable/dytable.vue";

  export default {
    name: "staffTreeSearch",
    components: {
      DynamicTable,
    },
    props: {
      fcompanyid: {
        type: String,
        default: "_DefaultCompanyOId",
      },
      fstartdate: {
        type: String,
        default: "",
      },
      fenddate: {
        type: String,
        default: "",
      },
      fvolume: {
        type: Number,
        default: 0,
      },
      // 配置对话框显示标识
      visible: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        defaule: "1",
      },
    },
    data() {
      return {
        pageNum: 1,
        pageSize: 10,
        total: 20,
        form: {
          select: "",
          selectVal: "",
        },
        // 关闭对话框配置
        closeConfig: false,
        // 对话框显示标识
        dialogVisible: this.visible,
        multipleSelection: [],
        tableData: [],
        columns: [
          {
            type: "selection",
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
            key: "fsite",
            title: "地点",
          },
          {
            key: "fvolume",
            title: "容量",
          },
          {
            key: "fdevice",
            title: "设备",
          },
          {
            key: "fremark",
            title: "描述",
          },
        ],
      };
    },
    computed: {},
    watch: {
      // 对话框显示 自动聚焦name输入框
      visible(bool) {
        this.dialogVisible = bool;
        let data = {};
        if (this.type == "1") {
          this.getTableData(data);
        } else if (this.type == "2") {
          this.getTableDataAll(data);
        }
      },
    },
    methods: {
      //分页、下一页
      onCurrentChange(val) {
        this.pageNum = val;
        let data = {};
        if (this.type == "1") {
          this.getTableData(data);
        } else if (this.type == "2") {
          this.getTableDataAll(data);
        }
      },
      //多选
      onSelectionChange(val) {
        this.multipleSelection = val;
        if (this.multipleSelection.length > 1) {
          this.$message.error("只能选择一个");
          return;
        }
      },
      // 查询
      searchKey() {
        let params = this.form.select;
        let data = {
          [params]: this.form.selectVal,
        };
        if (this.type == "1") {
          this.getTableData(data);
        } else if (this.type == "2") {
          this.getTableDataAll(data);
        }
      },
      // 查询有效会议室列表数据
      getTableData(data) {
        data.page = this.pageNum;
        data.size = this.pageSize;
        data.fcompany = this.fcompanyid;
        data.fstartdate = this.fstartdate;
        data.fenddate = this.fenddate;
        data.fvolume = Number(this.fvolume);
        this.$api.confMangement.getAvailableConfOffice(data).then(
          (res) => {
            if (res.data.code == 0) {
              this.tableData = res.data.data.rows;
              this.total = res.data.data.total;
            } else {
              this.$message.error(res.data.msg);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      // 查询会议室列表数据
      getTableDataAll(data) {
        data.page = this.pageNum;
        data.size = this.pageSize;
        data.fcompany = this.fcompanyid;
        this.$api.confMangement.getConfOfficeList(data).then(
          (res) => {
            if (res.data.code == 0) {
              this.tableData = res.data.data.rows;
              this.total = res.data.data.total;
            } else {
              this.$message.error(res.data.msg);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      // 保存
      saveConfig() {
        if (this.multipleSelection.length != 1) {
          this.$message.error("请选择一条数据进行编辑");
          return;
        }
        let serchData = this.multipleSelection[0];
        this.$emit("closeDialog", serchData);
      },

      // 关闭模态框时子组件传值给父组件
      closeDialog() {
        let serchData = [];
        this.$emit("closeDialog", serchData);
      },
    },
  };
</script>
<style lang="less" scoped>
  /deep/ .selectVal .el-input__inner {
    width: 100%;
  }

  /deep/ .el-card__body {
    padding: 6px !important;
  }

  /deep/ .el-dialog {
    width: 40% !important;
  }

  /deep/ .el-dialog__header {
    padding: 15px 20px 0px !important;
  }

  /deep/ .el-dialog__body {
    padding: 12px 20px !important;
  }

  /deep/ .el-table .cell{
    overflow: inherit !important;
  }

  .box-card:first-child {
    margin-bottom: 16px;
    height: 53px;
  }
</style>
