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
                  <el-option label="名称" value="tname"></el-option>
                  <el-option label="编码" value="tcode"></el-option>
                  <el-option label="职位" value="ffirmpositionname"></el-option>
                  <el-option label="描述" value="tdescription"></el-option>
                  <el-option label="公司" value="tcompanyname"></el-option>
                  <el-option label="部门" value="tdepartmentname"></el-option>
                  <el-option label="在职状态" value="fpositionstate"></el-option>
                  <el-option label="是否兼职" value="tispluralism"></el-option>
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
          <el-button type="danger" plain class="el-icon-delete" @click="deleteMsg">删除</el-button>
          <el-button type="warning" plain class="el-icon-edit" @click="toEdit('编辑')">编辑</el-button>
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
      :title="isEdit?'编辑人员':'新建人员'"
      class="add-user"
      center
      top="20px"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="peopleForm" :rules="rules" ref="peopleForm">
        <el-row :gutter="22">
          <el-col :span="11">
            <el-form-item
              label="公司："
              :label-width="formLabelWidth"
              class="pop-select"
              prop="tcompanyoid"
            >
              <el-select
                v-model="peopleForm.tcompanyoid"
                size="small"
                :disabled="isEdit"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="在职状态："
              :label-width="formLabelWidth"
              class="pop-select"
              prop="fpositionstate"
            >
              <el-select
                v-model="peopleForm.fpositionstate"
                size="small"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门：" :label-width="formLabelWidth" prop="tdepartmentname">
              <el-input v-model="peopleForm.tdepartmentname" size="small" autocomplete="off"></el-input>
              <img
                class="icon-search"
                src="../../assets/img/search.svg"
                @click="baseInputData('选择部门')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="编码：" :label-width="formLabelWidth" prop="tcode">
              <el-input v-model="peopleForm.tcode" size="small" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="名称：" :label-width="formLabelWidth" prop="tname">
              <el-input v-model="peopleForm.tname" size="small" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="职位：" :label-width="formLabelWidth" prop="ffirmpositionname">
              <el-input v-model="peopleForm.ffirmpositionname" size="small" autocomplete="off"></el-input>
              <img
                class="icon-search"
                src="../../assets/img/search.svg"
                @click="baseInputData('选择职位')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="22">
             <el-form-item label="描述：" :label-width="formLabelWidth">
              <el-input type="textarea" v-model="peopleForm.tdescription"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
       <h4>兼职记录</h4>
            <el-divider></el-divider>
            <el-row :gutter="24">
              <el-col :span="19">
                 <dynamic-table
                  :columns="columns3"
                  :table-data="tableData3"
                  :total="total"
                  :isShowPager="false"
                  :height="200"
                  :page-num="pageNum"
                  :page-size="pageSize"
                  @current-change="onCurrentChange"
                  @selection-change="onChange"
                  v-loading="false"
                  element-loading-text="加载中"
                ></dynamic-table>
              </el-col>
              <el-col :span="5">
                 <el-button size="small" :disabled="isLook"  v-show="!isEdit" type="success" plain @click="baseInputTable('新增兼职')">新增</el-button>
                 <el-button size="small" :disabled="isLook" type="danger" plain @click="deleteRow()">删除</el-button>
              </el-col>
            </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit('peopleForm')">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 部门/职位弹窗 -->
    <el-dialog
      :title="choseDepart"
      top="20px"
      :visible.sync="userVisible"
      :close-on-click-modal="false"
    >
      <el-input placeholder="输入关键字进行过滤" v-model="filterText">></el-input>
      <!-- 树状图 -->
      <el-tree
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree"
        @node-click="handleNodeClick"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDepart()">确 定</el-button>
      </div>
    </el-dialog>
      <!-- 是否兼职弹窗 -->
    <el-dialog
      :title="choseDepart"
      top="20px"
      :visible.sync="peopleTableVisible"
      :close-on-click-modal="false"
    >
     <el-form :model="peopleTableForm" :rules="peopleTableRules" ref="peopleTableForm">
        <el-col :span="11">
          <el-form-item label="公司：" :label-width="formLabelWidth"  prop="tcompanyoid">
            <el-input v-model="peopleTableForm.tcompanyoid" size="small" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门：" :label-width="formLabelWidth" prop="tdepartmentoid">
            <el-input v-model="peopleTableForm.tdepartmentoid" size="small" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="职位：" :label-width="formLabelWidth" prop="ffirmposition">
            <el-input v-model="peopleTableForm.ffirmposition" size="small" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="生效：" :label-width="formLabelWidth" >
           <el-checkbox v-model="checked" size="small" ></el-checkbox>
          </el-form-item>
        </el-col>
     </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="peopleTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit('peopleTableForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DynamicTable from "../../components/common/dytable/dytable.vue";
export default {
  name: "peopleSet",
  data() {
    return {
      dialogFormVisible: false,
      userVisible: false,
      peopleTableVisible:false,
      isEdit: false,
      isLook:false,
      searchName: "",
      formCode: "",
      filterText: "",
      treeData: [],
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
          key: "tcode",
          title: "编码"
        },
        {
          key: "tname",
          title: "名称"
        },
        {
          key: "tdepartmentname",
          title: "部门"
        },
        {
          key: "ffirmpositionname",
          title: "职位"
        },
        {
          key: "fpositionstate",
          title: "在职状态"
        },
        {
          key: "tispluralism",
          title: "是否兼职"
        },
        {
          key: "tdescription",
          title: "描述"
        }
      ],
      columns3: [
        {
          type: "selection"
        },
          {
          key: "tcompanyoid",
          title: "公司"
        },
        {
          key: "tdepartmentoid",
          title: "部门"
        },
         {
          key: "ffirmposition",
          title: "职位"
        },
        {
          key: "tstatus",
          title: "生效"
        },
      ],
      editFormData:[],
      peopleTableForm:{
        tdepartmentoid: "",
        tcompanyoid: "",
        tstatus:'',
        ffirmposition:'',
      },
      tableData: [],
      tableData2: [],
      tableData3:[],
      getTreeData:[],
      radio: "1",
      onChangeSelection:[],
      multipleSelection: [],
      checked: false,
      form: {
        select: [],
        selectVal: ""
      },
      peopleForm: {
        tcompanyoid: "",
        fpositionstate: "",
        tdepartmentname: "",
        tname: "",
        tcode: "",
        ffirmposition: "",
        tdescription: ""
      },
      userForm: {},
      options: [],
      options2: [
        {
          label:'在职',
          value:'1'
        },
         {
          label:'离职',
          value:'0'
        },
      ],
      choseDepart: "",
      formLabelWidth: "120px",
      peopleTableRules:{
        tcompanyoid: [
          { required: true, message: "请输入公司", trigger: "blur" }
        ],
        tdepartmentoid: [
          { required: true, message: "请输入部门", trigger: "blur" }
        ],
        ffirmposition: [
          { required: true, message: "请输入职位", trigger: "blur" }
        ],
      },
      rules: {
        tcompanyoid: [{
           required: true, message: "请选择公司", trigger: "change" 
        }],
        fpositionstate: [{
          required: true, message: "请选择在职状态", trigger: "change" 
        }],
        tcode: [
          { required: true, message: "请输入编码", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 50 个字符",
            trigger: "blur"
          }
        ],
        tname: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 50 个字符",
            trigger: "blur"
          }
        ],
        ffirmposition: [
          { required: true, message: "请选择职位", trigger: "blur" },
         ]
      }
    };
  },
  components: {
    DynamicTable
  },
  created() {
    this.$nextTick(() => {
      this.getTableData("");
    });
  },
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val); 
    },
    peopleTableVisible(val){
       switch (val) {
         case false:
            this.$refs['peopleTableForm'].resetFields();
            this.checked = false;
           break;
       
         default:
           break;
       }
    },
    dialogFormVisible(val){
       switch (val) {
         case false:
            this.$refs['peopleForm'].resetFields();
            this.checked = false;
           break;
       
         default:
           break;
       }
    },
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    baseInputData(Str){
      this.userVisible = true;
      this.choseDepart = Str;
      switch (Str) {
        case '选择部门':
              this.searchDepart()
          break;
        case '选择职位':
              this.searchPosition()
          break;
      
        default:
          break;
      }
    },
    baseInputTable(Str) {
      this.peopleTableVisible = true;
      this.choseDepart = Str;
    },
    //部门
     searchDepart() {console.log(this.peopleForm)
         this.$api.jobUserManagement.getDepartData(this.peopleForm.tcompanyoid).then(res=>{
            if(res.status == '200'){
              this.getTreeData = res.data.data.rows;//console.log( this.getTreeData)
                this.getTreeData.forEach((item,index) => {
                   this.treeData.push(
                      {
                        label:item.fname,
                        foid:item.foid,
                      }
                   )
                })
               console.log( this.treeData)
            }
        }),error => {
          console.log(error);
        }
     },
    //职位
    searchPosition() {
        this.$api.jobUserManagement.getPositonData(this.peopleForm.tdepartmentoid).then(res=>{
            if(res.status == '200'){
                this.treeData = [];
                this.getTreeData = res.data.data.rows;//console.log( this.getTreeData)
                this.getTreeData.forEach((item,index) => {
                this.treeData.push(
                  {
                    label:item.fname,
                    foid:item.foid,
                  }
                )
                })
            }
        }),error => {
          console.log(error);
        }
        
     },
    addDepart(){
      this.userVisible = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getTableData("");
    },
    handleNodeClick(data) {
      switch (this.choseDepart) {
        case '选择部门':
              this.peopleForm.tdepartmentname = data.label
              this.peopleForm.tdepartmentoid = data.foid
          break;
        case '选择职位':
              this.peopleForm.ffirmpositionname = data.label
              this.peopleForm.ffirmposition = data.foid
          break;
      
        default:
          break;
      }
      
    },
    //多选兼职table
    onChange(val){
       this.onChangeSelection = val;
      if (this.onChangeSelection.length > 1) {
        this.$message.error("只能选择一个");
        return;
      }
    },
    //多选
    onSelectionChange(val) { console.log(val, this.multipleSelection)
      this.multipleSelection = val;
      if (this.multipleSelection.length > 1) {
        this.$message.error("只能选择一个");
        return;
      }
    },
    //分页、下一页
    onCurrentChange(val) {
      this.pageNum = val;
      this.getTableData("");
    },
    getCompany(){
        this.$api.jobUserManagement.getCompanyData().then(res=>{
            if(res.status == '200'){
               this.options = res.data.data.rows
            }
        }),error => {
          console.log(error);
        }
    },
    // 搜索
    onSubmit() {
      this.getTableData(this.form.select);
        
    },
    deleteRow(){ 
        this.tableData3.forEach((item,index)=>{
            if( item.fstaffoid == this.onChangeSelection[0].fstaffoid){
                this.tableData3.splice(index,1);
            }
        })
        console.log(this.tableData3)
    },
    // 获取表格数据
    getTableData(params) {
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
          if (params == "fpositionstate") {
            switch (this.form.selectVal) {
              case "在" || "在职":
                this.form.selectVal = "1";
                break;
              case "离" || "离职":
                this.form.selectVal = "0";
                break;

              default:
                break;
            }
          }
           if (params == "tispluralism") {
            switch (this.form.selectVal) {
              case "是":
                this.form.selectVal = "1";
                break;
              case "否" :
                this.form.selectVal = "0";
                break;

              default:
                break;
            }
          }
          data = {
            [params]: this.form.selectVal,
            page: this.pageNum,
            size: this.pageSize
          };
          break;

        default:
          break;
      }
      this.$api.jobUserManagement.getPeopleTableData(data).then(
        res => {
          this.tableData = res.data.data.rows;
          this.total = res.data.data.total;
          for (let i in this.tableData) {
            switch (this.tableData[i].fpositionstate) {
              case '1':
                this.tableData[i].fpositionstate = "在职";
                break;
              case '0':
                this.tableData[i].fpositionstate = "离职";
                break;
              default:
                break;
            }
            switch (this.tableData[i].tispluralism) {
              case '1':
                this.tableData[i].tispluralism = "是";
                break;
              case '0':
                this.tableData[i].tispluralism = "否";
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
    //新增 
    add() {
      this.dialogFormVisible = true;
      this.isEdit = false;
      this.getCompany()
    },
    addSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(formName == 'peopleTableForm'){
              this.tableData3.push({
                tcompanyoid:this.peopleTableForm.tcompanyoid,
                tdepartmentoid:this.peopleTableForm.tdepartmentoid,
                ffirmposition:this.peopleTableForm.ffirmposition,
                tstatus:this.checked?'是':'否',
              });
              this.peopleTableVisible = false;
             return
          }
          this.tableData3.forEach(item=>{
              item.tstatus = item.tstatus == '是'?'1':'0'
          })
          this.peopleForm.pluralismModels  = this.tableData3
          if(this.isEdit){// console.log( this.editFormData)
              this.peopleForm.ffirmposition  = this.editFormData.ffirmposition
              this.peopleForm.tcompanyoid  = this.editFormData.tcompanyoid
             
              this.$api.jobUserManagement.updatePeopleData(this.peopleForm).then(res => {
                  if ((res.data.data.msg = "success")) {
                    this.dialogFormVisible = false;
                    this.$message.success("修改成功");
                    //刷新表格
                    this.getTableData("");
                  }
                }),
                  error => {
                    console.log(error);
                  };
                
          }else{
              this.$api.jobUserManagement.addPeopleMsg(this.peopleForm).then(res => {
                debugger;
                  if (res.data.code == 0) {
                    this.dialogFormVisible = false;
                    this.$message.success("新增成功");
                    //刷新表格
                    this.getTableData("");
                  } else {
                    this.$message.error(res.data.msg);
                  }
                }),
                  error => {
                    console.log(res.data.code);
                    console.log(error);
                  };
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
      this.$api.jobUserManagement.deletePeopleMsg(this.multipleSelection[0].toid).then(res => {
          if ((res.data.data.msg = "success")) {
            this.$message.success("删除成功");
            //刷新表格
            this.getTableData("");
          }
        }),
        error => {
          console.log(error);
        };
    },

    //编辑
    toEdit() {
      this.dialogFormVisible = true;
      this.isEdit = true;
      this.$api.jobUserManagement.addPeopleData(this.multipleSelection[0].toid).then(res=>{
          if (res.status == '200' ) {
              let newData;
              newData = JSON.parse(JSON.stringify(res.data.data));
              this.editFormData =  res.data.data;
              this.peopleForm = newData;
              this.peopleForm.ffirmposition = res.data.data.ffirmpositionname;
              this.peopleForm.tcompanyoid = res.data.data.tcompanyname;
              this.tableData3 = res.data.data.pluralismModels == null?[]:res.data.data.pluralismModels ;
              // console.log(this.editFormData,res.data.data,newData )
         }
      }),
      error => {
        console.log(error);
      };
      this.isEdit = false;
    }
  }
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