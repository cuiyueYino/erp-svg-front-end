<template>
  <div>
    <!-- 搜索框 -->
    <el-card class="box-card">
       <el-row :gutter="24">
               <el-col :span="18">
                    <el-form :inline="true"  class="demo-form-inline">
                       <el-col :span="3">
                       <el-form-item >
                        <el-select v-model="form.region" placeholder="请选择">
                          <el-option label="名称" value="shanghai"></el-option>
                          <el-option label="编码" value="beijing"></el-option>
                          <el-option label="描述" value="miaoshu"></el-option>
                          <el-option label="公司" value="gongsi"></el-option>
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
                 <el-col :span="6" style="text-align: right;">
                     <el-button type="success" plain class="el-icon-plus" @click="add">新增</el-button>
                     <el-button type="danger" plain class="el-icon-delete" @click="deleteMsg">删除</el-button>
                     <el-button type="warning" plain class="el-icon-edit"  @click="toEdit('编辑')">编辑</el-button>
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
    <el-dialog :title="isEdit?'编辑职务':'新建职务'" 
    class="add-user"
    center
     :visible.sync="dialogFormVisible"
      :close-on-click-modal="false">
        
            <el-form :model="form" :rules="rules"  ref="form">
                <el-row :gutter="24">
                     <el-col :span="12">
                    <el-form-item label="公司："  :label-width="formLabelWidth" class="pop-select" prop="formCtionTypeCon">
                        <el-select v-model="form.formCtionTypeCon"
                         size="small"
                          clearable placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="编码：" :label-width="formLabelWidth" prop="fname">
                    <el-input v-model="form.fname" size="small"  autocomplete="off"></el-input>
                    </el-form-item>
                   
                </el-col>
                 <el-col :span="12">
                   <el-form-item label="名称：" :label-width="formLabelWidth" prop="fcode">
                    <el-input v-model="form.fcode" size="small"  autocomplete="off"></el-input>
                    </el-form-item>
                     <el-form-item label="描述：" :label-width="formLabelWidth">
                        <el-input
                            maxlength="1000"
                            size="small" 
                            show-word-limit
                            autosize
                            type="textarea"
                            v-model="form.fremark"
                        ></el-input>
                    </el-form-item>
                 </el-col>
                </el-row>
                
            </el-form>
        
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit('form')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DynamicTable from "../../components/common/dytable/dytable.vue";
export default {
  name: "jobSet",
  data() {
    return {
      dialogFormVisible: false,
      userVisible:false,
      isEdit:false,
      searchName:'',
      formCode: "",
      filterText: '',
       treeData:[
        {
            label: '一级 1',
            children: [{
                label: '二级 1-1',
                children: [{
                label: '三级 1-1-1'
                }]
            }]
        },{
            label: '一级 1',
            children: [{
                label: '二级 1-1',
                // children: [{
                // label: '三级 1-1-1'
                // }]
            }]
        },
            ],
        defaultProps: {
        children: 'children',
        label: 'label'
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
          key: "fstatus",
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
        },
        ],
      tableData: [],
       tableData2: [],
      radio: "1",
      multipleSelection: [],
      checked: false,
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
    baseInputTable() {
      this.userVisible = true;
    },
    searchDepart(){

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
    //新增
    add() {
      this.dialogFormVisible = true;
      this.isEdit = false;
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
        if(Str == '编辑'){
            this.isEdit = true;
        }
      
     
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
  left: 230px;
  cursor: pointer;
}

</style>