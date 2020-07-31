<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :modal="false"
      :close-on-click-modal="closeConfig"
      :close-on-press-escape="closeConfig"
      @close="closeDialog"
      style="z-index:2007"
    >
      <el-card class="box-card" v-if="!strictly">
        <el-row :gutter="14">
          <el-col :span="22">
            <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
              <el-form-item prop="selectVal">
                <el-input
                  class="selectVal"
                  size="mini"
                  clearable
                  v-model="form.selectVal"
                  placeholder="请输入员工姓名"
                ></el-input>
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
      <el-form>
        <div style="height:350px;overflow:auto">
          <el-tree
            :data="treeData"
            ref="tree"
            node-key="foid"
            :props="defaultProps"
            :check-strictly="strictly"
            show-checkbox
            check-on-click-node
            @check-change="handleNodeClick"
          ></el-tree>
        </div>
        <el-row :gutter="20"></el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="saveConfig" v-if="strictly">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "staffTreeSearch",
  components: {},
  props: {
    type: {
      type: String,
      default: "",
    },
    fcompanyid: {
      type: String,
      default: "_DefaultCompanyOId",
    },
    // 当前配置节点类型
    title: {
      type: String,
      default: "",
    },
    // 配置对话框显示标识
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        selectVal: "",
      },
      // 关闭对话框配置
      closeConfig: false,
      // 对话框显示标识
      dialogVisible: this.visible,
      treeData: [],
      strictly: false,
      defaultProps: {
        label: "fname",
        children: "children",
      },
    };
  },
  computed: {},
  watch: {
    // 对话框显示 自动聚焦name输入框
    visible(bool) {
      this.dialogVisible = bool;
      this.treeData = [];
      if (this.title == "用户查询") {
        this.strictly = false;
        let fromdata = {};
        fromdata.id = this.fcompanyid;
        this.$api.confMangement.getStaffTreeList(fromdata).then(
          (res) => {
            let resData = res.data.data;
            let resDataArr = eval("(" + resData + ")");
            this.treeData = resDataArr;
          },
          (error) => {
            console.log(error);
          }
        );
      } else if (this.title == "组织机构查询") {
        this.strictly = true;
        let fromdata = {};
        fromdata.orgUnitId = this.fcompanyid;
        fromdata.queryType = "org";
        this.$api.confMangement.getOrgunitTree(fromdata).then(
          (res) => {
            let resData = res.data.data;
            let resDataArr = eval("(" + resData + ")");
            this.treeData = resDataArr;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
  },
  methods: {
    // 查询
    searchKey() {
      if (this.title == "用户查询") {
        let fromdata = {};
        fromdata.id = this.fcompanyid;
        fromdata.name = this.form.selectVal;
        this.$api.confMangement.getStaffTreeList(fromdata).then(
          (res) => {
            let resData = res.data.data;
            let resDataArr = eval("(" + resData + ")");
            this.treeData = resDataArr;
          },
          (error) => {
            console.log(error);
          }
        );
      } else if (this.title == "组织机构查询") {
        let fromdata = {};
        fromdata.orgUnitId = this.fcompanyid;
        fromdata.queryType = "org";
        this.$api.confMangement.getOrgunitTree(fromdata).then(
          (res) => {
            let resData = res.data.data;
            let resDataArr = eval("(" + resData + ")");
            this.treeData = resDataArr;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    // 保存
    saveConfig() {
      let selectData = null;
      if (this.title == "用户查询") {
        selectData = this.$refs.tree.getCheckedNodes(true, true);
      } else {
        selectData = this.$refs.tree.getCheckedNodes();
      }
      console.log(selectData);
      if (selectData.length > 0) {
        if (selectData.length > 1 && this.type != "4") {
          this.$message.error("只能选择一条数据!");
        } else {
          let dialogType = this.title;
          let typeS = this.type;
          if (this.title == "用户查询" && this.type != "4") {
            // 获取员工信息
            this.$api.confMangement
              .getStaffInfoById(selectData[0].foid)
              .then((res) => {
                if (res.data.code == 0) {
                  let serchData = {
                    foid: res.data.data.toid,
                    fname: res.data.data.tname,
                    fdeptid: res.data.data.tdepartmentoid,
                    fdeptname: res.data.data.tdepartmentname,
                  };
                  this.$emit("closeDialog", serchData, dialogType, typeS);
                } else {
                  this.$message.error(res.data.msg);
                }
              }),
              (error) => {
                console.log(error);
              };
          } else if (this.title == "用户查询" && this.type == "4") {
            // 查询内部参与人员时不需要获取员工的部门信息,所以直接返回选中的值即可
            this.$emit("closeDialog", selectData, dialogType, typeS);
          } else if (this.title == "组织机构查询") {
            let serchData = {
              foid: selectData[0].foid,
              fname: selectData[0].fname,
            };
            this.$emit("closeDialog", serchData, dialogType, typeS);
          }
        }
      } else {
        this.$message.error("请选择一行数据!");
      }
    },
    handleNodeClick(data, checked) {
      if (checked) {
        if (this.type != "4") {
          this.$refs.tree.setCheckedNodes([data]);
          if (this.$refs.tree.getCheckedNodes(true).length > 1) {
            this.goOut("清单选");
          }
        }
      }
    },
    // 关闭模态框时子组件传值给父组件
    closeDialog() {
      let serchData = [];
      let title = this.title;
      let typeS = this.type;
      this.$emit("closeDialog", serchData, title, typeS);
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
  width: 30% !important;
}

/deep/ .el-dialog__header {
  padding: 15px 20px 0px !important;
}

/deep/ .el-dialog__body {
  padding: 12px 20px !important;
}

.box-card:first-child {
  margin-bottom: 16px;
  height: 53px;
}
</style>