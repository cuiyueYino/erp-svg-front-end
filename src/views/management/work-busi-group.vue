<template>
  <div>
    <!-- 搜索框 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col :span="16">
          <el-form :inline="true" class="demo-form-inline">
            <el-col :span="3">
                <el-form-item>
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option label="公司名称" value="fcompanyoid"></el-option>
                        <el-option label="编码" value="fteamid"></el-option>
                        <el-option label="组名" value="fteamname"></el-option>
                        <el-option label="组长名称" value="fteamleader"></el-option>
                        <el-option label="组员" value="staffNames"></el-option>
                        <el-option label="离职、调转人员" value="transStaffNames"></el-option>
                        <el-option label="备注" value="fremark"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-form-item>
                <el-input clearable v-model="formCode" placeholder="请输入任意查询内容"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain @click="onSubmit">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain @click="getAll" class="search-all">显示全部信息</el-button>
            </el-form-item>
        </el-form>
       </el-col>
        <el-col :span="8" style="text-align: right;">
            <el-button type="success" icon="el-icon-folder-add" size="medium" plain @click="toEdit('新增')"> 新增</el-button>
            <el-button type="danger" plain icon="el-icon-delete" size="medium" @click="deleteMsg"> 删除</el-button>
            <el-button type="warning" plain icon="el-icon-document-copy" size="medium" @click="toEdit('编辑')"> 编辑</el-button>
            <el-button type="info" plain icon="el-icon-view"  size="medium" @click="toEdit('查看')"> 查看</el-button>
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
    <!-- 弹出框 -->
    <el-dialog
      :title="isEdit?'编辑工作业务组':(isLook?'查看工作业务组':'新建工作业务组')"
      class="add-user"
      center
      width="50%"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-row :gutter="22">
          <el-col :span="11">
            <el-form-item label="公司：" :label-width="formLabelWidth" class="pop-select" prop="fcompanyoid">
              <el-select size="small" :disabled="isLook" placeholder="请选择" value-key="id" v-model="form.fcompanyName" @change="selectCompanyChanged">
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="组名：" :label-width="formLabelWidth">
              <el-input v-model="form.fteamname" :disabled="isLook" size="small" maxlength="50" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="离职、调转人员：" label-width="134px" prop="transStaffRelUser">
              <el-input :disabled="true" type="textarea" autosize size="small" placeholder="" :value="getTransStaffRelUser()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="编码：" :label-width="formLabelWidth" prop="fteamid">
              <el-input v-model="form.fteamid" :disabled="isLook" size="small" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="组长：" :label-width="formLabelWidth" prop="fteamleaderName">
              <el-input v-model="form.fteamleaderName" :disabled="isLook" placeholder="请选择组长" size="small" autocomplete="off" readonly></el-input>
              <img class="icon-search" v-show="!isLook" src="../../assets/img/search.svg" @click="addFteamleader('1','用户查询',)"/>
            </el-form-item>
            <el-form-item label="组员：" :label-width="formLabelWidth" prop="staffRelUsersNames">
               <el-input type="textarea" autosize :disabled="isLook" size="small" placeholder="请选择组员" v-model="form.staffRelUsersNames" readonly></el-input>
               <img class="icon-search" v-show=" !isLook" src="../../assets/img/search.svg" @click="addFteamleader('4','用户查询',)"/>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="备注：" maxlength="3000" :label-width="formLabelWidth" prop="fremark">
              <el-input type="textarea" autosize :disabled="isLook" size="small" v-model="form.fremark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button :disabled="saveBtnFlag"
          type="success" icon='el-icon-copy-document' size="medium"
          @click="addSubmit('form')"
        >保存</el-button>
        <el-button type='warning' icon='el-icon-close' size="medium" @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 用户或组织机构模态框 -->
    <el-form :model="formProcess" ref="formProcess">
      <staff-tree-search
        class="children-dialog"
        :visible="staffTableVisible"
        :type="baseInputType"
        :title="baseInputTitle"
        @closeDialog="closeBaseInfo"
      ></staff-tree-search>
      <!-- :fcompanyid="fcompanyid" -->
    </el-form>
  </div>
</template>

<script>
import DynamicTable from "../../components/common/dytable/dytable.vue";
import staffTreeSearch from "../conference/staff-tree-search";

export default {
  name: "workBusiGroup",
  inject: ['reload'],
  data() {
    return {
      saveBtnFlag:false,
      baseInputType: "",
      formProcess: {},
      baseInputTitle: "",
      staffTableVisible: false,
      loading: false,
      treeData:[],
      filterText: '',
      userVisible:false,
      defaultexpanded: [],
      treeloading: false,
      rowOPStype: false ,
      pageSource: 'worBusi',
      rowOPSDataObj: {},
      rowDUTStype: false,
      rowDUTSDataObj: {},
      rowPOSStype: false,
      rowPOSSDataObj: {},
      dialogFormVisible: false,
      isEdit: false,
      isLook: false,
      isAdd: false,
      checkdata: ["duties03", "duties02"],
      searchName: "",
      formCode: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      treeData2: [
        {
          label: "角色类别",
          id: "company01",
          type: "company",
          children: [
            {
              label: "个人事务角色",
              id: "duties03",
              type: "duties",
            },
            {
              label: "公司架构角色-财务",
              id: "department01",
              type: "department",
              children: [
                {
                  label: "石化财务",
                  id: "duties01",
                  type: "duties",
                },
                {
                  label: "收费员",
                  id: "duties02",
                  type: "duties",
                },
              ],
            },
          ],
        },
      ],
      pageNum: 1,
      pageSize: 10,
      total: 20,
      columns: [
        {
          type: "selection",
        },
        {
          key: "fcompanyName",
          title: "公司名称",
        },
        {
          key: "fteamid",
          title: "编码",
        },
        {
          key: "fteamname",
          title: "组名",
        },
        {
          key: "fteamleaderName",
          title: "组长名称",
        },
        {
          key: "staffRelUserNameList",
          title: "组员",
        },
        {
          key: "transStaffRelUserNameList",
          title: "离职、调转人员",
        },
        {
          key: "fremark",
          title: "备注",
        },
      ],
      tableData: [],
      tableData2: [],
      radio: "1",
      multipleSelection: [],
      checked: false,
      form: {
        fcompanyName:'',
        fcompanyoid:'',
        fteamleaderName:'',
        fteamleader: "",
        fteamname: "",
        fteamid: "",
        fremark: "",
        transStaffRelUser: {},
        staffRelUsers:{},
        staffRelUsersNames:[],
      },
      searchForm: {},
      userForm: {},
      options: JSON.parse(localStorage.getItem('CompanyData')),
      choseDepart: "",
      formLabelWidth: "120px",
      rules: {
        fteamid: [
            { required: true, message: "请输入编码", trigger: "blur" },
            {
                pattern: /^[a-z_A-Z0-9-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]\/",'<>~\·`\?:;|]+$/,
                message: '请输入英文、数字、英文符号的编码'
            }
         ],
        fteamleaderName: [
          { required: true, message: "请选择组长名称", trigger: "blur" },
        ],
        staffRelUsersNames: [
          { required: true, message: "请选择组员名称", trigger: "blur" },
        ],
      },

      reqData:{},
    };
  },
  components: {
    DynamicTable,
    staffTreeSearch
  },
  created() {
    this.getTableDataGroup();
    this.form.fcompanyName = this.options[0].id
  },
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    this.treeloading = true;
    this.$api.management.selectAllOrganizationInfo().then((response) => {
      let responsevalue = response;
      if (responsevalue) {
        let tabledata = eval("(" + responsevalue.data.data + ")");
        this.treeData = tabledata;
      }
      this.treeloading = false;
    });
  },
  methods: {
    //公司切换选择方法
    selectCompanyChanged(value){
      this.form.fcompanyoid = value;
    },
    // 工作业务组（查看、编辑）
    getWorkGroupDetail(data) {
      this.$api.processSet.getWorkGroupDetail({
          foid: data,
      }).then((res) => {
        if (res.data.code == 0) {
            this.form.fcompanyName = res.data.data.fcompanyName;
            this.form.fcompanyoid = res.data.data.fcompanyoid;
            this.form.fteamleaderName = res.data.data.fteamleaderName;
            this.form.fteamleader = res.data.data.fteamleader;
            this.form.fteamname = res.data.data.fteamname;
            this.form.fteamid = res.data.data.fteamid;
            this.form.fremark = res.data.data.fremark;
            this.form.transStaffRelUser = res.data.data.transStaffRelUser;
            this.form.staffRelUsers = res.data.data.staffRelUsers;
            // this.form.staffRelUsersNames = res.data.data.staffRelUsersNames;
            // res.data.data;
            console.log("8888888888");
            console.log(res.data.data);
            this.form.staffRelUsersNames = Object.values(res.data.data.staffRelUsers);
            // this.form.transStaffRelUser = Object.values(res.data.data.transStaffRelUser);
            // this.form.fcompanyName = this.form.fcompanyName
            console.log(res.data.data);
          // this.options = res.data.data.rows;
        }
      }),
        (error) => {
          console.log(error);
        };
    },
    //获取离职、调转人员信息
    getTransStaffRelUser() {
      return(String(Object.values(this.form.transStaffRelUser)));
    },
    //组员信息
    // getStaffRelUsers() {
    //   return(String(Object.values(this.transStaffRelUser)));
    // },
    // 打开组织架构弹窗
      addFteamleader(type,title) {
        this.staffTableVisible = true;
        this.baseInputType = type; //组长:2,组员:4
        this.baseInputTitle = title; //如:用户查询
      },

    // 关闭组织架构弹窗
      closeBaseInfo(data, title, type) {
        if (data == null || data.length === 0) {
        } else {
          if (type === "1") {
            // 组长
            this.form.fteamleader = data.foid;
            this.form.fteamleaderName = data.fname;
            // this.searchForm.fconvenername = data.fname;
            // this.searchForm.fconvener = data.foid;
            // this.searchForm.fconvenerdeptname = data.fdeptname;
            // this.searchForm.fconvenerdept = data.fdeptid;
          } else if (type === "4") {
            let internalmans = {};
            let internalMansName = "";
            for (let i in data) {
              if (i < data.length - 1) {
                internalMansName += data[i].fname + ",";
              } else {
                internalMansName += data[i].fname;
              }

              // let staff ={};
              internalmans[data[i].foid] = data[i].fname;
              // staff[data[i].fname] = data[i].fname;
              // let staff = {
              //   id : data[i].foid,
              //   fname: data[i].fname,
              // };
              // internalmans.push(staff);
            }

            this.form.staffRelUsers = internalmans;
            console.log("2222222222");
            console.log(internalmans);
            this.form.staffRelUsersNames = internalMansName;
            this.transStaffRelUser = {};
            // this.searchForm.internalmans = internalmans;
            // this.searchForm.internalMansName = internalMansName;
          }
        }
        this.staffTableVisible = false;
      },
      // // 关闭组织架构弹窗
      // closeBaseInfo(data, title) {
      //   if (data == null || data.length === 0) {
      //   } else {
      //     this.form.fteamleader = data.fname;
      //     // this.searchForm.fconvenername = data.fname;
      //     //   this.searchForm.fconvener = data.foid;
      //     //   this.searchForm.fconvenerdeptname = data.fdeptname;
      //     //   this.searchForm.fconvenerdept = data.fdeptid;
      //   }
      //   this.staffTableVisible = false;
      // },

    sureDepart(){
      this.userVisible = false
    },
    // 查询行政上级，业务上级的返回值处理
    showORhideForPOSS(data, type) {
      if (type === false) {
        this.rowPOSStype = false;
      } else {
        this.rowPOSStype = true;
      }
      if (data.SearchData) {
        let Sdata = data.SearchData;
        if (data.Searchtype == "Multiple") {
          let FnameS = "";
          let FoidS = "";
          for (var i = 0; i < Sdata.length; i++) {
            FnameS += Sdata[i].fname + ",";
            FoidS += Sdata[i].foid + ",";
          }
          FnameS = FnameS.slice(0, FnameS.length - 1);
          FoidS = FoidS.slice(0, FoidS.length - 1);
          this.DutformData.businessLeaderName = FnameS;
          this.DutformData.businessLeaderId = FoidS;
        } else {
          this.DutformData.directLeaderName = Sdata[0].fname;
          this.DutformData.directLeaderId = Sdata[0].foid;
        }
      }
    },
    renderContent(h, { node, data, store }) {
      if (data) {
        if (data.ftype == "1") {
          return (
            <span class="custom-tree-node">
              <span>
                <i class="el-icon-office-building"></i>
              </span>
              <span style="margin-left: 5px;">{node.label}</span>
            </span>
          );
        } else if (data.ftype == "2") {
          return (
            <span class="custom-tree-node">
              <span>
                <i class="el-icon-s-help"></i>
              </span>
              <span style="margin-left: 5px;">{node.label}</span>
            </span>
          );
        } else if (data.ftype == "3") {
          return (
            <span class="custom-tree-node">
              <span>
                <i class="el-icon-s-check"></i>
              </span>
              <span style="margin-left: 5px;">{node.label}</span>
            </span>
          );
        }
      }
    },
    searchDepart() {},

    // 获取公司方法
    getCompany() {
      this.$api.jobUserManagement.getCompanyData().then((res) => {
        if (res.status == "200") {
          this.options = res.data.data.rows;
        }
      }),
        (error) => {
          console.log(error);
        };
    },
    //树结构点击事件
    nodeClick(data) {
      let treeType = data.type;
    },
    //树结构点击事件
    handleNodeClick(data) {
      this.form.fteamleader = data.name;
      // this.form.departmentname = data.departmentname;
      // this.form.fstaffId = data.staffOid;
    },
    //多选
    onSelectionChange(val) {
      this.multipleSelection = val;
    },
    //分页、下一页
    onCurrentChange(val) {
      this.pageNum = val;
      this.getTableDataGroup();
    },
    // 搜索
    onSubmit() {
        if(this.form.region!=undefined){
            this.reqData = {
                [this.form.region]:this.formCode
            }
        }
        this.pageNum = 1;
      this.getTableDataGroup();
    },
    getAll() {
        this.form.region=undefined
        this.formCode = ''
        this.reqData = {}
      this.getTableDataGroup();
    },
    // 获取表格数据
    getTableDataGroup() {
      let data={
        page : this.pageNum,
        size : this.pageSize,
        fcreator : localStorage.getItem("ms_userId"),
      };
        Object.assign(data,this.reqData);
      this.$api.processSet.getTableDataGroup(data).then(
        (res) => {
          this.tableData = res.data.data.rows;
          this.total = res.data.data.total;
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
            switch (this.tableData[i].fsubprocess) {
              case 1:
                this.tableData[i].fsubprocess = "是";
                break;
              case 0:
                this.tableData[i].fsubprocess = "否";
                break;
              default:
                break;
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    addPeople() {
      this.userVisible = false;
    },

    addSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("11111111111111");
          console.log(this.form);
          this.$api.processSet.addWorkGroup(this.form).then((res) => {
            if (res.data.code == 0) {
              this.dialogFormVisible = false;
              this.$message.success("新增成功");
              //刷新表格
              this.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          },
          (error) => {
            console.log(error);
          }
          );
        }
      });
    },
    //删除
    deleteMsg() {
      if (this.multipleSelection.length > 1) {
        this.$message.error("只能选择一个删除");
        return;
      }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.$api.processSet.delWorkGroupList(this.multipleSelection[0].foid).then((res) => {
                if ((res.data.data.msg = "success")) {
                    this.$message.success("删除成功");
                    //刷新表格
                    this.reload();
                }
            }),
                (error) => {
                    console.log(error);
                };
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });
    },
    //生效/禁用
    effectOrDisableMsg() {
      let status = this.multipleSelection[0];
      if (this.multipleSelection.length > 1) {
        this.$message.error("只能选择一个删除");
        return;
      } else if ((this.multipleSelection.length = 0)) {
        this.$message.error("请选择一项删除");
        return;
      }

      switch (status.fstatus) {
        case "生效":
          status.fstatus = 3;
          break;
        case "禁用":
          status.fstatus = 8;
          break;
        default:
          break;
      }
      let data = {
        foid: status.foid,
        status: status.fstatus,
      };
      this.$api.processSet.effectOrDisable(data).then((res) => {
        if ((res.data.data.msg = "success")) {
          this.$message.success("操作成功");
          //刷新表格
          this.reload();
        }
      }),
        (error) => {
          console.log(error);
        };
    },
    toEdit(Str) {
      switch (Str) {
        case "新增":
            this.form.fcompanyName = this.options[0].id;
            this.form.fcompanyoid = this.options[0].id;
            this.form.fteamleader = '';
            this.form.fteamname = '';
            this.form.fteamid = '';
            this.form.fremark = '';
            this.form.transStaffRelUser ={};
            this.form.staffRelUsers ={};
            this.form.fteamleaderName = '';
            this.form.staffRelUsersNames = '';
          this.saveBtnFlag = false;
          this.isAdd = true;
          this.isEdit = false;
          this.isLook = false;
          this.dialogFormVisible = true;
          break;
        case "查看":
          if (this.multipleSelection.length != 1) {
          this.$message.error("请选择一条数据查看详情");
          return;
        } else {
          this.saveBtnFlag = true;
          this.dialogFormVisible = true;
          this.isLook = true;
          this.isEdit = false;
          this.isAdd = false;
          let foid = this.multipleSelection[0].foid;
          this.getWorkGroupDetail(foid);
        }
          break;
        case "编辑":
          if (this.multipleSelection.length != 1) {
          this.$message.error("请选择一条数据查看详情");
          return;
        } else {
          this.saveBtnFlag = false;
          this.isEdit = true;
          this.isLook = false;
          this.isAdd = false;
          this.dialogFormVisible = true;
          let foid = this.multipleSelection[0].foid;
          this.getWorkGroupDetail(foid);
        }
          break;
        default:
          break;
      }
    },
    renderContent(h, { node, data, store }) {
      if (data) {
        if (data.type == "company") {
          return (
            <span class="custom-tree-node">
              <span>
                <i class="el-icon-folder-opened"></i>
              </span>
              <span style="margin-left: 5px;">{node.label}</span>
            </span>
          );
        } else if (data.type == "department") {
          return (
            <span class="custom-tree-node">
              <span>
                <i class="el-icon-folder"></i>
              </span>
              <span style="margin-left: 5px;">{node.label}</span>
            </span>
          );
        } else if (data.type == "duties") {
          return (
            <span class="custom-tree-node">
              <span>
                <i class="el-icon-document"></i>
              </span>
              <span style="margin-left: 5px;">{node.label}</span>
            </span>
          );
        }
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

.box-card:first-child {
  margin-bottom: 16px;
}
.search-all {
  margin: 0 50px;
}
.icon-search {
  width: 24px;
  height: auto;
  position: absolute;
  top: 8px;
  left: 292px;
  cursor: pointer;
}
</style>
