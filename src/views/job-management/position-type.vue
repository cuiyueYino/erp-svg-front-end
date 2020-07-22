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
      
  }
};
</script>