<template>
  <div>
    <!-- 搜索框 -->
    <el-card class="box-card">
       <el-row :gutter="24">
               <el-col :span="16">
                    <el-form :inline="true"  class="demo-form-inline">
                       <el-col :span="3">
                       <el-form-item >
                        <el-select v-model="form.region" placeholder="请选择">
                          <el-option label="状态" value="shanghai"></el-option>
                          <el-option label="部门" value="beijing"></el-option>
                          <el-option label="公司" value="miaoshu"></el-option>
                        </el-select>
                      </el-form-item>
                       </el-col>
                    <el-form-item >
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
                     <el-button type="success" plain class="el-icon-plus" @click="toEdit('新增')"> 新增</el-button>
                     <el-button type="danger" plain class="el-icon-delete" @click="deleteMsg"> 删除</el-button>
                     <el-button type="warning" plain class="el-icon-edit"  @click="toEdit('编辑')"> 编辑</el-button>
                     <el-button type="primary" plain class="el-icon-view" @click="toEdit('查看')"> 查看</el-button>
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
    <el-dialog :title="isEdit?'编辑流程业务组':(isLook?'查看流程业务组':'新建流程业务组')" 
    class="add-user"
    center
    width="50%"
     :visible.sync="dialogFormVisible"
      :close-on-click-modal="false">
            <el-form :model="form" :rules="rules"  ref="form">
                <el-row :gutter="22">
                     <el-col :span="11">
                    <el-form-item label="公司："  :label-width="formLabelWidth" class="pop-select" prop="formCtionTypeCon">
                        <el-select v-model="form.formCtionTypeCon"
                         size="small"
                         :disabled="isLook"
                          clearable placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                     <el-col :span="11">
                    <el-form-item label="部门：" label-width="134px" prop="fname">
                      <el-input
                          :disabled="isLook"
                          type="textarea"
                          autosize
                           size="small"
                          placeholder="请选择部门"
                          v-model="form.fname">
                        </el-input>
                      <img class="icon-search" v-show="!isLook" src="../../assets/img/search.svg" @click="baseInputTable('选择部门')" />
                    </el-form-item>
                </el-col>
                </el-row>
                
            </el-form>
            <h4>流程业务行</h4>
            <el-divider></el-divider>
            <el-row :gutter="24">
              <el-col :span="19">
                 <dynamic-table
                  :columns="columns3"
                  :table-data="tableData3"
                  :total="total"
                  :page-num="pageNum"
                  :page-size="pageSize"
                  @current-change="onCurrentChange"
                  @selection-change="onSelectionChange"
                  v-loading="false"
                  element-loading-text="加载中"
                ></dynamic-table>
              </el-col>
              <el-col :span="5">
                 <el-button size="small" :disabled="isLook"  v-show="!isEdit" type="success" plain @click="baseInputTable('新增')">新增</el-button>
                 <el-button size="small" v-show="isEdit" type="warning" plain @click="baseInputTable('编辑')">编辑</el-button>
                 <el-button size="small" :disabled="isLook" type="danger" plain @click="deleteRow()">删除</el-button>
              </el-col>
            </el-row>
        
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit('form')" :disabled="isLook">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 部门/职位弹窗 -->
      <el-dialog :title="choseDepart" 
       top="20px"
       width="60%"
      :visible.sync="userVisible"
      :close-on-click-modal="false">
        <!-- 部门 -->
          <el-row :gutter="24" v-show="isDepart">
               <el-col :span="24">
                    <el-form :inline="true"  class="demo-form-inline">
                       <el-col :span="4">
                       <el-form-item >
                        <el-select v-model="form.region" placeholder="请选择">
                          <el-option label="状态" value="shanghai"></el-option>
                          <el-option label="部门" value="beijing"></el-option>
                          <el-option label="公司" value="miaoshu"></el-option>
                        </el-select>
                       </el-form-item>
                       </el-col>
                      <el-form-item >
                          <el-input clearable v-model="formCode" placeholder="请输入任意查询内容"></el-input>
                      </el-form-item>
                      
                      <el-form-item>
                          <el-button type="primary" plain @click="onSubmit">搜索</el-button>
                      </el-form-item>
                    </el-form>
                    <el-divider></el-divider>
                        <dynamic-table
                          :columns="columns2"
                          :table-data="tableData2"
                          :total="total"
                          :page-num="pageNum"
                          :page-size="pageSize"
                          @current-change="onCurrentChange"
                          @selection-change="onSelectionChange"
                          v-loading="false"
                          element-loading-text="加载中"
                        ></dynamic-table>
               </el-col>
          </el-row>
          <el-row :gutter="24" v-show="addRow">
            <el-col :span="8">
                <h4>用户查询</h4>
                <el-divider></el-divider>
               <el-input placeholder="输入关键字进行过滤" v-model="filterText">></el-input>
                <!-- 树状图 -->
                <el-tree
                    class="filter-tree"
                    :data="treeData"
                    :props="defaultProps"
                    :render-content="renderContent"
                     :default-expanded-keys="checkdata"
                    :default-checked-keys="checkdata"
                    :filter-node-method="filterNode"
                    ref="tree"
                    node-key="id"
                    accordion
                    show-checkbox
                    @node-click="handleNodeClick">
                </el-tree>
            </el-col>
            <el-col :span="16">
               <h4>角色查询</h4>
                <el-divider></el-divider>
                 <pro-busi-detail  v-show="rowRMDtype" :rowRMDDataObj="rowRMDDataObj" @changeShow="showMoreRMD"></pro-busi-detail>
            </el-col>
          </el-row>
         <div slot="footer" class="dialog-footer">
            <el-button @click="userVisible = false">取 消</el-button>
            <el-button type="primary" @click="addPeople()">确 定</el-button>
        </div>
      </el-dialog>
      
  </div>
</template>

<script>
import DynamicTable from "../../components/common/dytable/dytable.vue";
import proBusiDetail from './pro-busi-group-detail.vue'
export default {
  name: "proBusiGroup",
   components: {
        proBusiDetail,
        DynamicTable,
    },
  data() {
    return {
      dialogFormVisible: false,
      userVisible:false,
      isEdit:false,
      isLook:false,
      isAdd:false,
      isMembers:false,
      isLeader:false,
      addRow:false,
      isDepart:false,
      rowRMDtype:false,
      checkdata:['duties03','duties02'],
      searchName:'',
      formCode: "",
      filterText: '',
      pageNum: 1,
      pageSize: 10,
      total: 20,
      columns: [
        {
          type: "selection"
        },
         {
          key: "fname",
          title: "状态"
        },
        {
          key: "fcode",
          title: "部门"
        },
        {
          key: "fname",
          title: "公司"
        }
      ],
      columns3: [
        {
          type: "selection"
        },
         {
          key: "fname",
          title: "用户名称"
        },
        {
          key: "fcode",
          title: "角色"
        }
      ],
       columns2: [
        {
          type: "selection"
        },
         {
          key: "fname",
          title: "编码"
        },
        {
          key: "fcode",
          title: "名称"
        },
        {
          key: "fname",
          title: "描述"
        },
        {
          key: "fname",
          title: "虚拟组织"
        },
      ],
      tableData: [],
      tableData2: [],
      tableData3: [],
      radio: "1",
      multipleSelection: [],
      checked: false,
      formdata:{},
       rowRMDDataObj:{},
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        fremark: ""
      },
      searchForm: {},
      userForm:{},
      options: [],
      choseDepart:'',
      formLabelWidth: "120px",
       filterText: '',
       treeData:[
          {
              label: '角色类别',
              id:'company01',
              type:'company',
              children: [
                  {
                      label: '个人事务角色',
                      id:'duties03',
                      type:'duties',  
                  },
                  {
                      label: '公司架构角色-财务',
                      id:'department01',
                      type:'department',
                      children: [
                          {
                          label: '石化财务',
                          id:'duties01',
                          type:'duties',
                          },
                          {
                          label: '收费员',
                          id:'duties02',
                          type:'duties',
                          }
                      ]
                  }
              ]
          },
        ],
        defaultProps: {
        children: 'children',
        label: 'label'
        },
        checkdata:['duties03','duties02'],
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
  created() {
    this.$nextTick(() => {
      this.getTableData("");
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
    baseInputTable(Str) {
      this.userVisible = true;
      this.choseDepart = Str;
      switch (Str) {
        case '选择部门':
          this.isDepart = true;
          this.addRow = false;
          break;
        case '新增':
            this.isDepart = false;
            this.addRow = true;
            this.rowRMDtype = true;
            let finandata=this.formdata;
            finandata.finanrowname="";
            finandata.finanrowId="";
            finandata.nametitle="角色维护";
            this.rowRMDDataObj=finandata;
          break;
         case '编辑':
            this.isDepart = false;
            this.addRow = true;
            this.rowRMDtype = true;
            finandata=this.formdata;
            finandata.finanrowname="";
            finandata.finanrowId="";
            finandata.nametitle="角色维护";
            this.rowRMDDataObj=finandata;
          break;
      
        default:
          break;
      }
    },
     //角色查询返回值处理
        showMoreRMD(data,type){
            if(type === false){
                this.rowRMDtype = false
            }else{
                this.rowRMDtype = true
            }
        },
    searchDepart(){

    },
    deleteRow(){
      
    },
    renderContent(h, { node, data, store }) {
        if(data){
            if(data.type =="company"){
                return(
                    <span class="custom-tree-node">
                        <span><i class="el-icon-folder-opened"></i></span>
                        <span style="margin-left: 5px;">{node.label}</span>
                    </span>
                )
            }else if(data.type=="department"){
                return(
                    <span class="custom-tree-node">
                        <span><i class="el-icon-folder"></i></span>
                        <span style="margin-left: 5px;">{node.label}</span>
                    </span>
                )
            }else if(data.type=="duties"){
                return(
                    <span class="custom-tree-node">
                        <span><i class="el-icon-document"></i></span>
                        <span style="margin-left: 5px;">{node.label}</span>
                    </span>
                )
            }
        }  
        },

     //树结构点击事件
    nodeClick(data){
      let treeType=data.type;
    },
    handleNodeClick(data) {
            console.log(data);
        },
    //多选
    onSelectionChange(val) {
      this.multipleSelection = val;
    },
    //分页、下一页
    onCurrentChange(val) {
      this.pageNum = val;
      this.getTableData("");
    },
    // 搜索
    onSubmit() {
      this.getTableData(this.formCode);
    },
    getAll() {
      this.getTableData("");
    },
    // 获取表格数据
    getTableData(params) {
      let data = {
        fcode: params,
        page: this.pageNum,
        size: this.pageSize
      };
      this.$api.processSet.getTableData(data).then(
        res => {
          this.tableData = res.data.data.rows;
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
        error => {
          console.log(error);
        }
      );
    },
    addPeople(){
      this.userVisible =false
    },
   
    addSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.processSet.addSubmit(this.form).then(res => {
            if ((res.data.data.msg = "success")) {
              this.dialogFormVisible = false;
              this.$message.success("新增成功");
              //刷新表格
              this.getTableData("");
            }
          }),
            error => {
              console.log(error);
            };
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
      this.$api.processSet
        .deleteMsg(this.multipleSelection[0].foid)
        .then(res => {
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
        status: status.fstatus
      };
      this.$api.processSet.effectOrDisable(data).then(res => {
        if ((res.data.data.msg = "success")) {
          this.$message.success("操作成功");
          //刷新表格
          this.getTableData("");
        }
      }),
        error => {
          console.log(error);
        };
    },
    toEdit(Str) {
        this.dialogFormVisible = true;
        switch (Str) {
           case '新增':
            this.isAdd = true;
            this.isEdit = false;
            this.isLook = false;
            break;
          case '查看':
            this.isLook = true;
            this.isEdit = false;
            this.isAdd = false;
            break;
          case '编辑':
            this.isEdit = true;
            this.isLook = false;
            this.isAdd = false;
            break;
        
          default:
            break;
        }
    },
     renderContent(h, { node, data, store }) {
        if(data){
            if(data.type =="company"){
                return(
                    <span class="custom-tree-node">
                        <span><i class="el-icon-folder-opened"></i></span>
                        <span style="margin-left: 5px;">{node.label}</span>
                    </span>
                )
            }else if(data.type=="department"){
                return(
                    <span class="custom-tree-node">
                        <span><i class="el-icon-folder"></i></span>
                        <span style="margin-left: 5px;">{node.label}</span>
                    </span>
                )
            }else if(data.type=="duties"){
                return(
                    <span class="custom-tree-node">
                        <span><i class="el-icon-document"></i></span>
                        <span style="margin-left: 5px;">{node.label}</span>
                    </span>
                )
            }
        }  
        },
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