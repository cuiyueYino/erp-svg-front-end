<template>
  <div>
    <!-- 搜索框 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col :span="18">
          <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
            <el-col :span="3">
              <el-form-item prop="select">
                <el-select v-model="form.select" placeholder="请选择">
                  <el-option label="名称" value="fname"></el-option>
                  <el-option label="编码" value="fcode"></el-option>
                  <el-option label="描述" value="fremark"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-form-item prop="selectVal">
              <el-input clearable v-model="form.selectVal" placeholder="请输入任意查询内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="onSubmit">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="resetForm('form')" class="search-all">显示全部信息</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align: right;">
          <el-button type="success" plain class="el-icon-plus" @click="add">新增</el-button>
          <el-button type="warning" plain class="el-icon-edit" @click="toEdit('修改')">修改</el-button>
          <el-button type="danger" plain class="el-icon-delete" @click="deleteMsg">删除</el-button>
          <el-button type="danger" plain class="el-icon-delete" @click="queryMsg">查看</el-button>
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
  </div>
</template>

<script>
import DynamicTable from "../../components/common/dytable/dytable.vue";
export default {
  name: "positionType",
  data() {
    return {
      dialogFormVisible: false,
      userVisible: false,
      isEdit: false,
      searchName: "",
      filterText: "",
      treeData: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1"
              // children: [{
              // label: '三级 1-1-1'
              // }]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      pageNum: 1,
      pageSize: 10,
      total: 20,
      columns: [
        {
          type: "selection"
        },
        {
          key: "fcode",
          title: "编码"
        },
        {
          key: "fname",
          title: "名称"
        },
        {
          key: "fremark",
          title: "描述"
        }
      ],

      columns2: [
        {
          type: "selection"
        },
        {
          key: "fstatus",
          title: "操作时间"
        },
        {
          key: "fstatus",
          title: "操作内容"
        },
        {
          key: "fstatus",
          title: "操作原因"
        }
      ],
      tableData: [],
      tableData2: [],
      radio: "1",
      multipleSelection: [],
      checked: false,
      form: {
        select: [],
        selectVal: ""
      },
      searchForm: {
        fname: "",
        fcode: "",
        fremark: ""
      },
      userForm: {},
      options: [],
      formLabelWidth: "120px",
      rules: {
        fcode: [
          { required: true, message: "请输入编码", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 50 个字符",
            trigger: "blur"
          }
        ],
        fname: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    DynamicTable
  },
  created() {
    this.$nextTick(() => {
      this.getPositionTypeTableData("");
    });
  },
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    baseInputTable() {
      this.userVisible = true;
    },
    searchDepart() {},
    handleNodeClick(data) {
      console.log(data);
    },
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
      this.getPositionTypeTableData("");
    },
    // 搜索
    onSubmit() {
      console.log(this.form.select);
      this.getPositionTypeTableData(this.form.select);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getPositionTypeTableData("");
    },
    // 获取表格数据
    getPositionTypeTableData(params) {
      let data;
      switch (this.isEdit) {
        case true:
          data = {
            [params]: this.multipleSelection[0].foid,
            page: this.pageNum,
            size: this.pageSize
          };
          break;
        case false:
          data = {
            [params]: this.form.selectVal,
            page: this.pageNum,
            size: this.pageSize
          };
          break;

        default:
          break;
      }

      this.$api.jobUserManagement.getPositionTypeTableData(data).then(
        res => {
          if (this.isEdit) {
            this.searchForm = res.data.data.rows[0];
          } else {
            this.tableData = res.data.data.rows;
          }
          for (let i in this.tableData) {
            switch (this.tableData[i].fstatus) {
              case 3:
                this.tableData[i].fstatus = "禁用";
                break;
              case 8:
                this.tableData[i].fstatus = "生效";
                break;
              default:
                break;
            }
          }
        },
        error => {
          console.log(error);
        }
      );
    },

    // 新增
    add() {
      this.dialogFormVisible = true;
      this.isEdit = false;
    },

    // 编辑
    toEdit(Str) {
      if (Str == "编辑") {
        if (this.multipleSelection.length != 1) {
          this.$message.error("请选择一条数据进行编辑");
          return;
        }
        this.isEdit = true; //console.log(this.multipleSelection)
        this.getPositionTypeTableData("foid");
      }
      this.dialogFormVisible = true;
    },

    //删除
    deleteMsg() {
      if (this.multipleSelection.length > 1) {
        this.$message.error("只能选择一个删除");
        return;
      }
      this.$api.jobUserManagement
        .getPositionTypeTableData(this.multipleSelection[0].foid)
        .then(res => {
          if ((res.data.data = "success")) {
            this.$message.success("删除成功!");
            //刷新表格
            this.getPositionTypeTableData("");
          }
        }),
        error => {
          console.log(error);
        };
    },

    //查看
    queryMsg() {}
  }
};
</script>
<style lang="scss" scoped>
// /deep/ .el-textarea .el-input__count {
//   background: #fff0;
// }
// /deep/ .el-select {
//   width: 100%;
// }
// /deep/ .el-positionType {
//     padding-left: 0px !important;
//     padding-top: 6px;
// }

.box-card:first-child {
  margin-bottom: 16px;
}
// .search-all {
//   margin: 0 50px;
// }
// .icon-search {
//   width: 24px;
//   height: auto;
//   position: absolute;
//   top: 8px;
//   left: 230px;
//   cursor: pointer;
// }
</style>