<template>
  <div>
    <!-- 职务类型 弹出框 -->
    <el-dialog
      :title="'职务类型'"
      @close="handleClose"
      :visible.sync="typeFormVisible"
      :append-to-body="true"
      v-if="typeFormVisible"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form label-width="110px" class="typeForm" :label-position="labelPosition">
        <!-- 表格 -->
        <el-card class="box-card">
          <dynamic-table
            ref="type"
            :columns="columns"
            :table-data="tableTypeData"
            :total="total"
            :page-num="pageNum"
            :page-size="pageSize"
            :show-checkbox="showcheckbox"
            @current-change="onCurrentChange"
            @selection-change="onSelectionChange"
            v-loading="false"
            element-loading-text="加载中"
          ></dynamic-table>
        </el-card>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="onHandleMoreSave">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>>

<script>
import DynamicTable from "../../components/common/dytable/dytable.vue";
export default {
  props: {
    rowPOSSDataObj: Object,
    rowPOSStype: Boolean,
  },
  components: {
    DynamicTable,
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 5,
      total: 20,
      labelPosition: "left",
      showcheckbox: false,
      typeFormVisible: false,
      NodeClickData: {},
      tableTypeData: [],
      multipleSelection: [],
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
          key: "fremark",
          title: "描述",
        },
      ],
    };
  },
  methods: {
    //多选
    onSelectionChange(val) {
      this.multipleSelection = val;
      if (this.multipleSelection.length > 1) {
        this.$message.error("只能选择一个");
        return;
      }
    },
    //分页、下一页
    onCurrentChange(val) {
      this.pageNum = val;
      this.queryPositionType("");
    },
    //获取职务类型
    queryPositionType() {
      let data;
      data = {
        page: this.pageNum,
        size: this.pageSize,
      };
      this.$api.jobUserManagement.getPositionTypeTableData(data).then((res) => {
        if (res.data.code == 0) {
          this.tableTypeData = res.data.data.rows;
        } else {
          this.$message.error(res.data.msg);
        }
      }),
        (error) => {
          console.log(error);
        };
      this.typeFormVisible = true;
    },
    //关闭当前dialog时给父组件传值
    handleClose() {
      //返回选中的父组件选中的row,并修某些改值
      this.$emit("changeShow", this.rowPOSSDataObj, false);
    },

    onHandleMoreSave() {
      let SearchData = [];
      let SaveType = false;
      this.NodeClickData = this.multipleSelection[0];
      if (this.showcheckbox == true) {
        let NodeCheckData = this.$refs.type.getCheckedNodes(true, false);
        if (NodeCheckData) {
          SearchData = NodeCheckData;
          SaveType = true;
        } else {
          this.$message.error("请选择职务类别!");
          SaveType = false;
        }
      } else {
        let NodeClickData = this.NodeClickData;
        if (NodeClickData) {
          let fcode = NodeClickData.fcode;
          if (fcode != null) {
            SearchData.push(NodeClickData);
            SaveType = true;
          } else {
            this.$message.error("请选择职务类别!");
            SaveType = false;
          }
        } else {
          this.$message.error("请选择职务类别!");
          SaveType = false;
        }
      }
      if (SaveType) {
        this.rowPOSSDataObj.SearchData = SearchData;
        this.$emit("changeShow", this.rowPOSSDataObj, false);
        this.typeFormVisible = false;
      }
    },
  },
  watch: {
    rowPOSStype(oldVal, newVal) {
      this.typeFormVisible = this.rowPOSStype;
      let data = {
        page: this.pageNum,
        size: this.pageSize,
      };
      this.$api.jobUserManagement.getPositionTypeTableData(data).then((res) => {
        if (res.data.code == 0) {
          this.tableTypeData = res.data.data.rows;
        } else {
          this.$message.error(res.data.msg);
        }
      }),
        (error) => {
          console.log(error);
        };
    },
  },
};
</script>