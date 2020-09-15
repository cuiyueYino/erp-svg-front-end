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
              <el-button type="primary" icon='el-icon-search' size="medium" plain @click="onSubmit">搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-tickets" size="medium" plain @click="resetForm('form')" class="search-all">显示全部信息</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" style="text-align: right;">
          <el-button type="success" plain icon="el-icon-folder-add" size="medium" @click="add">新增</el-button>
          <el-button type="warning" plain icon="el-icon-edit-outline" size="medium" @click="toEdit">修改</el-button>
          <el-button type="danger" plain icon="el-icon-delete" size="medium" @click="deleteMsg">删除</el-button>
          <el-button type="info" plain icon="el-icon-view"  size="medium" @click="queryMsg">查看</el-button>
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
    <!-- 新增弹出框 -->
    <el-dialog
      :title="'新建职务类型'"
      class="add-type"
      center
      :visible.sync="addFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="searchForm" :rules="rules" ref="searchForm">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="编码：" :label-width="formLabelWidth" prop="fcode">
              <el-input v-model="searchForm.fcode" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称：" :label-width="formLabelWidth" prop="fname">
              <el-input v-model="searchForm.fname" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="描述：" prop="fremark" :label-width="formLabelWidth">
            <el-input
              maxlength="500"
              size="small"
              show-word-limit
              autosize
              type="textarea"
              v-model="searchForm.fremark"
            ></el-input>
          </el-form-item>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="success" icon='el-icon-copy-document' size="medium" @click="addSubmit('searchForm')">保存</el-button>
        <el-button type='warning' icon='el-icon-close' size="medium" @click="addFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹出框 -->
    <el-dialog
      :title="'编辑职务类型'"
      class="edit-type"
      center
      :visible.sync="editFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="searchForm" :rules="rules" ref="searchForm">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="编码：" :label-width="formLabelWidth" prop="fcode">
              <el-input v-model="searchForm.fcode" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称：" :label-width="formLabelWidth" prop="fname">
              <el-input v-model="searchForm.fname" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="描述：" prop="fremark" :label-width="formLabelWidth">
            <el-input
              maxlength="500"
              size="small"
              show-word-limit
              autosize
              type="textarea"
              v-model="searchForm.fremark"
            ></el-input>
          </el-form-item>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="success" icon='el-icon-copy-document' size="medium" @click="addSubmit('searchForm')">保存</el-button>
        <el-button type='warning' icon='el-icon-close' size="medium" @click="editFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 查看弹出框 -->
    <el-dialog
      :title="'查看职务类型'"
      class="query-type"
      center
      :visible.sync="queryFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="searchForm" :rules="rules" ref="searchForm">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="编码：" :label-width="formLabelWidth" prop="fcode">
              <el-input :disabled="true" v-model="searchForm.fcode" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名称：" :label-width="formLabelWidth" prop="fname">
              <el-input :disabled="true" v-model="searchForm.fname" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="描述：" prop="fremark" :label-width="formLabelWidth">
            <el-input
              maxlength="500"
              size="small"
              show-word-limit
              autosize
              :disabled="true"
              type="textarea"
              v-model="searchForm.fremark"
            ></el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import DynamicTable from "../../components/common/dytable/dytable.vue";
export default {
  name: "positionType",
  data() {
    return {
      editFormVisible: false,
      addFormVisible: false,
      queryFormVisible: false,
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
        fremark: "",
        fcreator: localStorage.getItem('ms_userId'),
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
      this.isEdit = false;
      this.getPositionTypeTableData("");
    },
    // 搜索
    onSubmit() {
      console.log(this.form.select);
      this.pageNum = 1;
      this.isEdit = false;
      this.getPositionTypeTableData(this.form.select);
    },
    // 显示全部信息
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.pageNum = 1;
      this.isEdit = false;
      this.getPositionTypeTableData("");
    },
    // 获取表格数据
    getPositionTypeTableData(params) {
      let data;
      switch (this.isEdit) {
        case true:
          data = {
            [params]: this.multipleSelection[0].foid,
            page: 1,
            size: 10
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
            this.total = res.data.data.total;
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
      this.addFormVisible = true;
      this.pageNum = 1;
      this.searchForm = {
        fname: "",
        fcode: "",
        fpositioncategory: "",
        fremark: ""
      };
      this.isEdit = false;
    },
    // 编辑
    toEdit() {
      if (this.multipleSelection.length != 1) {
        this.$message.error("请选择一条数据进行编辑");
        return;
      }
      this.isEdit = true;
      this.getPositionTypeTableData("foid");
      this.editFormVisible = true;
    },
    // 保存
    addSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          switch (this.isEdit) {
            case true:
              this.$api.jobUserManagement
                .updatePositionTypeTableData(this.searchForm)
                .then(res => {
                  if (res.data.code == 0) {
                    this.editFormVisible = false;
                    this.isEdit = false;
                    this.$message.success("修改成功");
                    //刷新表格
                    this.getPositionTypeTableData("");
                  } else {
                    this.$message.error(res.data.msg);
                  }
                }),
                error => {
                  console.log(error);
                };
              break;
            case false:
              this.$api.jobUserManagement
                .addPositionTypeTableData(this.searchForm)
                .then(res => {
                  if (res.data.code == 0) {
                    this.addFormVisible = false;
                    this.isEdit = false;
                    this.$message.success("新增成功");
                    //刷新表格
                    this.getPositionTypeTableData("");
                  } else {
                    this.$message.error(res.data.msg);
                  }
                }),
                error => {
                  console.log(error);
                };
              break;

            default:
              break;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除
    deleteMsg() {
      if (this.multipleSelection.length > 1) {
        this.$message.error("只能选择一个删除");
        return;
      }
      this.$api.jobUserManagement
        .deletePositionTypeTableData(this.multipleSelection[0].foid)
        .then(res => {
          if (res.data.code == 0) {
            this.$message.success("删除成功!");
            this.isEdit = false;
            //刷新表格
            this.getPositionTypeTableData("");
          }else{
            this.$message.error(res.data.msg);
          }
        }),
        error => {
          console.log(error);
        };
    },

    //查看
    queryMsg() {
      if (this.multipleSelection.length != 1) {
        this.$message.error("请选择一条数据查看详情");
        return;
      }
      this.isEdit = true;
      this.getPositionTypeTableData("foid");
      this.queryFormVisible = true;
    }
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

/deep/ .el-table__fixed-right::before {
  background-color: revert;
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
