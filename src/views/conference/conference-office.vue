<template>
  <div>
    <!-- 搜索框 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col :span="15">
          <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
            <el-col :span="3">
              <el-form-item prop="select">
                <el-select v-model="form.select" placeholder="请选择">
                  <el-option label="编码" value="fcode"></el-option>
                  <el-option label="名称" value="fname"></el-option>
                  <el-option label="地点" value="fsite"></el-option>
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
        <el-col :span="9" style="text-align: right;">
          <el-button type="success" plain class="el-icon-plus" size="medium" @click="add">新增</el-button>
          <el-button
            type="warning"
            plain
            class="el-icon-edit"
            size="medium"
            @click="toEdit('修改')"
          >修改
          </el-button>
          <el-button
            type="primary"
            plain
            class="el-icon-unlock"
            size="medium"
            @click="toUpdate(0)"
          >生效
          </el-button>
          <el-button type="primary" plain class="el-icon-lock" size="medium" @click="toUpdate(1)">禁用</el-button>
          <el-button type="danger" plain class="el-icon-delete" size="medium" @click="deleteMsg">删除</el-button>
          <el-button type="primary" plain class="el-icon-search" size="medium" @click="queryMsg">查看</el-button>
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
    <!-- 提交弹出框 -->
    <el-dialog
      :title="isEdit?'编辑会议室':'新建会议室'"
      class="add-office"
      center
      :visible.sync="addFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="searchForm" :rules="rules" ref="searchForm" style="margin-right: 60px;">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="公司：" :label-width="formLabelWidth" class="pop-select" prop="fcompany">
              <el-select v-model="searchForm.fcompany" size="small"  @change="selectChange(searchForm.fcompany)" clearable placeholder="请选择">
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
<!--            <el-form-item-->
<!--              label="公司："-->
<!--              :label-width="formLabelWidth"-->
<!--              style="position:relative;"-->
<!--              prop="fcompany"-->
<!--            >-->
<!--              <el-input-->
<!--                v-model="searchForm.fcompanyname"-->
<!--                autocomplete="off"-->
<!--                size="small"-->
<!--                @focus="baseInputTable('用户','组织结构查询')"-->
<!--              ></el-input>-->
<!--            </el-form-item>-->
          </el-col>
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
          <el-col :span="12">
            <el-form-item label="容量：" :label-width="formLabelWidth" prop="fvolume">
              <el-input v-model="searchForm.fvolume" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="地点：" :label-width="formLabelWidth" prop="fsite">
            <el-input
              maxlength="3000"
              size="small"
              show-word-limit
              autosize
              type="textarea"
              v-model="searchForm.fsite"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="设备：" :label-width="formLabelWidth" prop="fdevice">
            <el-input
              maxlength="3000"
              size="small"
              show-word-limit
              autosize
              type="textarea"
              v-model="searchForm.fdevice"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="描述：" :label-width="formLabelWidth" prop="fremark">
            <el-input
              maxlength="3000"
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
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit('searchForm')">提 交</el-button>
      </div>
    </el-dialog>
    <!-- 查看弹出框 -->
    <el-dialog
      :title="'查看会议室'"
      class="query-office"
      center
      :visible.sync="queryFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="searchForm" :rules="rules" ref="searchForm" style="margin-right: 60px;">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item
              label="公司："
              :label-width="formLabelWidth"
              style="position:relative;"
              prop="fcompany"
            >
              <el-input
                v-model="searchForm.fcompanyname"
                autocomplete="off"
                size="small"
                :disabled="true"
                @focus="baseInputTable('用户','组织结构查询')"
              ></el-input>
            </el-form-item>
          </el-col>
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
          <el-col :span="12">
            <el-form-item label="容量：" :label-width="formLabelWidth" prop="fvolume">
              <el-input
                :disabled="true"
                v-model="searchForm.fvolume"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="地点：" :label-width="formLabelWidth" prop="fsite">
            <el-input
              maxlength="3000"
              size="small"
              show-word-limit
              autosize
              type="textarea"
              :disabled="true"
              v-model="searchForm.fsite"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="设备：" :label-width="formLabelWidth" prop="fdevice">
            <el-input
              maxlength="3000"
              size="small"
              show-word-limit
              autosize
              :disabled="true"
              type="textarea"
              v-model="searchForm.fdevice"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="描述：" :label-width="formLabelWidth" prop="fremark">
            <el-input
              maxlength="3000"
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

    <el-form :model="formProcess" ref="formProcess">
      <!-- 第三层弹窗 -->
      <base-info-dialog
        class="children-dialog"
        :visible="baseInputTableF"
        :type="baseInputType"
        :title="baseInputTitle"
        @closeDialog="closeBaseInfo"
      ></base-info-dialog>
    </el-form>
  </div>
</template>

<script>
  import DynamicTable from "../../components/common/dytable/dytable.vue";
  import baseInfoDialog from "../Home/node-components/base-info-dialog";

  export default {
    name: "confOffice",
    components: {
      DynamicTable,
      baseInfoDialog,
    },
    data() {
      let checkInt = (rule, value, callback) => {
        if (Number(value) && value % 1 === 0) {
          callback();
        } else {
          return callback(new Error("请输入整数！"));
        }
      };
      return {
        options: [],
        isEdit: false,
        addFormVisible: false,
        queryFormVisible: false,
        baseInputTableF: false,
        pageNum: 1,
        pageSize: 10,
        total: 20,
        baseInputTitle: "",
        baseInputType: "",
        formLabelWidth: "120px",
        formProcess: {},
        tableData: [],
        multipleSelection: [],
        form: {
          select: [],
          selectVal: "",
        },
        value: "_DefaultCompanyOId",
        searchForm: {
          fcode: "",
          fname: "",
          fvolume: "",
          fsite: "",
          fdevice: "",
          fremark: "",
          fstatus: "",
          fcompany: "_DefaultCompanyOId",
          fcompanyname: "福佳集团",
          fcreator: localStorage.getItem('conf_ms_userId'),
        },
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
          {
            key: "fstatus",
            title: "状态",
          },
        ],
        rules: {
          fcompany: [
            {required: true, message: "请输入公司", trigger: "blur"},
            {
              min: 1,
              max: 100,
              message: "长度在 1 到 50 个字符",
              trigger: "blur",
            },
          ],
          fcode: [
            {required: true, message: "请输入编码", trigger: "blur"},
            {
              min: 1,
              max: 100,
              message: "长度在 1 到 50 个字符",
              trigger: "blur",
            },
          ],
          fname: [
            {required: true, message: "请输入名称", trigger: "blur"},
            {
              min: 1,
              max: 100,
              message: "长度在 1 到 100 个字符",
              trigger: "blur",
            },
          ],
          fvolume: [{required: true, validator: checkInt, trigger: "blur"}],
          fsite: [
            {required: true, message: "请输入地点", trigger: "blur"},
            {
              min: 1,
              max: 3000,
              message: "长度在 1 到 3000 个字符",
              trigger: "blur",
            },
          ],
          fdevice: [
            {required: false, message: "请输入设备", trigger: "blur"},
            {
              min: 1,
              max: 3000,
              message: "长度在 1 到 3000 个字符",
              trigger: "blur",
            },
          ],
          fdevice: [
            {required: false, message: "请输入描述", trigger: "blur"},
            {
              min: 1,
              max: 3000,
              message: "长度在 1 到 3000 个字符",
              trigger: "blur",
            },
          ],
        },
      };
    },
    created() {
      this.$nextTick(() => {
        this.getTableData("");
      });
    },
    computed: {},
    watch: {},
    methods: {
      //公司下拉选择
      selectChange(value){
        debugger;
        this.options.forEach(item => {
          if(item.id == value) {
            this.$nextTick(() => {
              this.searchForm.fcompanyname = item.name;
            });
          }
        });
      },
      //分页、下一页
      onCurrentChange(val) {
        this.isEdit = false;
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
        this.isEdit = false;
        this.pageNum = 1;
        this.getTableData(this.form.select);
      },
      // 新增
      add() {
        this.searchForm = {
          fcode: "",
          fname: "",
          fvolume: "",
          fsite: "",
          fdevice: "",
          fremark: "",
          fstatus: "",
          fcompany: "_DefaultCompanyOId",
          fcompanyname: "福佳集团",
          fcreator: localStorage.getItem('ms_userId'),
        };
        //等弹窗里的form表单的dom渲染完在执行this.$refs.searchForm.resetFields()，去除验证
        this.$nextTick(()=>{
          this.$refs.searchForm.resetFields();
        });
        this.addFormVisible = true;
        this.isEdit = false;
        this.getCompany();
      },
      // 修改
      toEdit(params) {
        if (this.multipleSelection.length != 1) {
          this.$message.error("请选择一条数据进行编辑");
          return;
        }
        this.isEdit = true;
        this.getTableData("foid");
        this.addFormVisible = true;
      },
      // 生效，禁用
      toUpdate(params) {
        if (this.multipleSelection.length != 1) {
          this.$message.error("请选择一条数据进行编辑");
          return;
        }
        let data = {
          foid: this.multipleSelection[0].foid,
          fstatus: params,
        };
        this.$api.confMangement.editConfOffice(data).then(
          (res) => {
            if (res.data.code == 0) {
              this.$message.success("修改成功");
              this.isEdit = false;
              //刷新表格
              this.getTableData("");
            } else {
              this.$message.error(res.data.msg);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      // 删除
      deleteMsg() {
        if (this.multipleSelection.length != 1) {
          this.$message.error("请选择一条数据进行编辑");
          return;
        }
        this.$confirm("确实要删除当前选择的记录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$api.confMangement
              .deleteConfOffice(this.multipleSelection[0].foid)
              .then((res) => {
                if (res.data.code == 0) {
                  this.$message.success("删除成功!");
                  this.isEdit = false;
                  //刷新表格
                  this.getTableData("");
                } else {
                  let errorMsg = res.data.msg;
                  const h = this.$createElement;
                  let params = h("p", null, [
                    h("span", null, ""),
                    h("p", null, errorMsg),
                  ]);
                  this.errorOpen(params);
                }
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
        this.isEdit = false;
        this.pageNum = 1;
        this.getTableData("");
      },
      // 获取列表数据
      getTableData(params) {
        let data;
        switch (this.isEdit) {
          case true:
            // 修改
            data = {
              [params]: this.multipleSelection[0].foid,
              page: 1,
              size: 10,
            };
            break;
          case false:
            // 新增
            data = {
              [params]: this.form.selectVal,
              page: this.pageNum,
              size: this.pageSize,
            };
            break;

          default:
            break;
        }
        this.$api.confMangement.getConfOfficeList(data).then(
          (res) => {
            if (this.isEdit) {
              this.searchForm = res.data.data.rows[0];
            } else {
              let taData = res.data.data.rows;
              for (let i in taData) {
                switch (taData[i].fstatus) {
                  case 1:
                    taData[i].fstatus = "禁用";
                    break;
                  case 0:
                    taData[i].fstatus = "生效";
                    break;
                  default:
                    break;
                }
              }
              this.total = res.data.data.total;
              this.tableData = taData;
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      // 提交
      addSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            switch (this.isEdit) {
              case true:
                debugger;
                this.$api.confMangement
                  .submitConfOffice(this.searchForm)
                  .then((res) => {
                    if (res.data.code == 0) {
                      this.addFormVisible = false;
                      this.isEdit = false;
                      this.$message.success("修改成功");
                      //刷新表格
                      this.getTableData("");
                    } else {
                      this.$message.error(res.data.msg);
                    }
                  }),
                  (error) => {
                    console.log(error);
                  };
                break;
              case false:
                let temp = this.searchForm;
                console.log(temp);
                debugger;
                this.$api.confMangement
                  .submitConfOffice(this.searchForm)
                  .then((res) => {
                    if (res.data.code == 0) {
                      this.addFormVisible = false;
                      this.isEdit = false;
                      this.pageNum = 1;
                      this.$message.success("新增成功");
                      //刷新表格
                      this.getTableData("");
                    } else {
                      this.$message.error(res.data.msg);
                    }
                  }),
                  (error) => {
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
      //查看
      queryMsg() {
        if (this.multipleSelection.length != 1) {
          this.$message.error("请选择一条数据查看详情");
          return;
        }
        this.isEdit = true;
        this.getTableData("foid");
        this.queryFormVisible = true;
      },
      // 打开组织架构弹窗
      baseInputTable(str, title) {
        this.baseInputTableF = true;
        this.baseInputTitle = title;
        this.baseInputType = str;
      },
      // 关闭组织架构弹窗
      closeBaseInfo(data, dialogtitle, type) {
        if (data.length > 0) {
          this.searchForm.fcompany = data[0].foid;
          this.searchForm.fcompanyname = data[0].fname;
        }
        this.baseInputTableF = false;
      },
      //公司
      getCompany() {
        this.$api.jobUserManagement.getCompanyData().then(res => {
          if(res.status == '200') {
            this.options = res.data.data.rows
          }
        }), error => {
          console.log(error);
        }
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

  /deep/ .el-confOffice {
    padding-left: 0px !important;
    padding-top: 6px;
  }

  /deep/ .el-table__fixed-right::before {
    background-color: revert;
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
