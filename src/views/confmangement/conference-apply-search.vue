<template>
  <div>
    <el-dialog
      :title="'会议'"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :modal="false"
      :close-on-click-modal="closeConfig"
      :close-on-press-escape="closeConfig"
      @close="closeDialog"
      style="z-index:2007"
    >
      <el-form>
        <div>
          <dynamic-table
            :columns="columns"
            :table-data="tableData"
            v-loading="false"
            element-loading-text="加载中"
            :isShowPager="false"
          ></dynamic-table>
        </div>
        <el-row :gutter="20"></el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import DynamicTable from "../../components/common/dytable/dytable.vue";

  export default {
    name: "confApplyDetail",
    components: {
      DynamicTable
    },
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      fconfid: {
        type: String,
        default: ""
      },
    },
    watch: {
      // 对话框显示 自动聚焦name输入框
      visible(bool) {
        this.dialogVisible = bool;
        this.getTableData();
      },
    },
    data() {
      return {
        pageNum:1,
        pageSize:999,
        closeConfig: false,
        dialogVisible: false,
        tableData: [],
        columns: [
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
            key: "fstartdate",
            title: "起始时间",
          },
          {
            key: "fenddate",
            title: "结束时间",
          },
          {
            key: "fimportanceValue",
            title: "重要程度",
          },
          {
            key: "fexternalVaule",
            title: "对外/对外",
          },
        ],
      }
    },
    methods: {
      getTableData() {
        if(this.fconfid != ""){
          this.$api.confMangement.getTodayApplyList(this.fconfid).then((res) => {
            if (res.data.code == 0) {
              let tableData = res.data.data;
              for(let i in tableData){
                // 是否对外 0：对内 1：对外
                switch (tableData[i].fexternal) {
                  case 0:
                    tableData[i].fexternalVaule = "否";
                    break;
                  case 1:
                    tableData[i].fexternalVaule = "是";
                    break;
                  default:
                    break;
                }
                // 重要程度 0：一般 1：重要
                switch (tableData[i].fimportance) {
                  case 0:
                    tableData[i].fimportanceValue = "一般";
                    break;
                  case 1:
                    tableData[i].fimportanceValue = "重要";
                    break;
                  default:
                    break;
                }
                // 不公开
                if(tableData[i].fovert == 1){
                  tableData[i].fphone = tableData[i].fphone.substring(0,3)+"********";
                }
              }
              this.tableData = tableData;
            }
          })
        }
      },
      // 关闭模态框时子组件传值给父组件
      closeDialog() {
        let serchData = [];
        this.$emit("closeDialog", serchData);
      },
    },
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-table__fixed-body-wrapper {
    height: 450px;
    overflow-y: scroll;
    width: 100%;
  }

  /deep/ .el-table__body-wrapper{
    height: 450px;
  }
</style>
