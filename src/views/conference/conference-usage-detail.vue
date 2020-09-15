<template>
  <div>
    <!-- 搜索框 -->
    <el-card class="box-card">
      <el-form :model="form" ref="form" style="margin-right: 60px;">
        <el-row :gutter="14">
          <el-col :span="4">
            <el-form-item label="公司：" label-width="100px" class="pop-select" prop="fcompany">
              <el-select v-model="form.fcompanyid" size="small" clearable placeholder="请选择" @focus="getCompany">
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="会议室：" label-width="100px" prop="fconfname">
              <el-select v-model="form.fconfname" size="small" clearable placeholder="请选择" @focus="getTableDataAll">
                <el-option v-for="item in confOptions" :key="item.foid" :label="item.fname" :value="item.fname"></el-option>
              </el-select>
<!--              <el-input v-model="form.fconfname" :disabled="true" size="small" autocomplete="off" clearable></el-input>-->
            </el-form-item>
          </el-col>
<!--          <el-col :span="1" class="el-positionType">-->
<!--            <el-button-->
<!--              type="primary"-->
<!--              size="mini"-->
<!--              icon="el-icon-search"-->
<!--              style="padding:7px 8px"-->
<!--              @click="queryConfOffice('2')"-->
<!--            ></el-button>-->
<!--          </el-col>-->
<!--          <el-col :span="4">-->
<!--            <el-form-item label="会议室地点：" label-width="100px" prop="fsite">-->
<!--              <el-input v-model="form.fsite" size="small" autocomplete="off" clearable></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <el-col :span="4">
            <el-form-item label="起始时间：" label-width="100px" prop="fstartdate">
              <el-date-picker
                clearable
                v-model="form.fstartdate"
                value-format="yyyy-MM-dd HH:mm"
                type="date"
                size="small"
                style="width:145px"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="结束时间：" label-width="100px" prop="fenddate">
              <el-date-picker
                clearable
                v-model="form.fenddate"
                value-format="yyyy-MM-dd HH:mm"
                type="date"
                size="small"
                style="width:145px"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="14">
<!--          <el-col :span="4">-->
<!--            <el-form-item label="人员：" label-width="100px" prop="fstaffname">-->
<!--              <el-input v-model="form.fstaffname" :disabled="true" size="small" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="1" class="el-positionType">-->
<!--            <el-button-->
<!--              type="primary"-->
<!--              size="mini"-->
<!--              icon="el-icon-search"-->
<!--              style="padding:7px 8px"-->
<!--              @click="baseInputTable('2','用户查询')"-->
<!--            ></el-button>-->
<!--          </el-col>-->
<!--          <el-col :span="4">-->
<!--            <el-form-item label="联系方式：" label-width="100px" prop="fphone">-->
<!--              <el-input v-model="form.fphone" size="small" autocomplete="off" clearable></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
          <el-col :span="4">
            <el-form-item label="对内对外：" label-width="100px" prop="fexternal">
              <el-select v-model="form.fexternal" placeholder="请选择" clearable size="small">
                <el-option label="对外" value="1"></el-option>
                <el-option label="对内" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="重要程度：" label-width="100px" prop="fimportance">
              <el-select v-model="form.fimportance" placeholder="请选择" clearable size="small">
                <el-option label="重要" value="1"></el-option>
                <el-option label="一般" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" plain @click="search">查询</el-button>
              <el-button
                type="info"
                size="medium"
                plain
                icon="el-icon-notebook-2"
                @click="upload"
              >导出</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card">
      <el-table :data="tableData" class="table_" style="width: 100%">
        <el-table-column
          prop="fconfname"
          label="会议室"
          show-overflow-tooltip
          width="135"
          class="office_usage"
        ></el-table-column>
        <el-table-column
          prop="fconfsite"
          label="会议室地点"
          show-overflow-tooltip
          width="135"
          class="office_usage"
        ></el-table-column>
        <el-table-column label="使用时间" class="office_usage_max">
          <el-table-column
            prop="fstartdate"
            label="起始时间"
            show-overflow-tooltip
            width="135"
            class="office_usage"
          ></el-table-column>
          <el-table-column
            prop="fenddate"
            label="结束时间"
            show-overflow-tooltip
            width="135"
            class="office_usage"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          prop="fconvener"
          label="召集人"
          show-overflow-tooltip
          width="135"
          class="office_usage"
        ></el-table-column>
        <el-table-column
          prop="fconvenerdept"
          label="召集人部门"
          show-overflow-tooltip
          width="135"
          class="office_usage"
        ></el-table-column>
        <el-table-column
          prop="fcontact"
          label="联系人"
          show-overflow-tooltip
          width="135"
          class="office_usage"
        ></el-table-column>
        <el-table-column
          prop="fcontactdept"
          label="联系人部门"
          show-overflow-tooltip
          width="135"
          class="office_usage"
        ></el-table-column>
        <el-table-column
          prop="fphone"
          label="联系方式"
          show-overflow-tooltip
          width="135"
          class="office_usage"
        ></el-table-column>
        <el-table-column
          prop="fimportanceValue"
          label="重要程度"
          show-overflow-tooltip
          width="135"
          class="office_usage"
        ></el-table-column>
        <el-table-column
          prop="fexternal"
          label="对内对外"
          show-overflow-tooltip
          width="135"
          class="office_usage"
        ></el-table-column>
        <el-table-column
          prop="fcpmcount"
          label="参与人数"
          show-overflow-tooltip
          width="135"
          class="office_usage"
        ></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next,jumper,total"
        :total="total"
        :current-page="pageNum"
        :page-size="pageSize"
        @current-change="onCurrentChange"
      ></el-pagination>
    </el-card>

    <!-- 用户或组织机构模态框 -->
    <el-form :model="formProcess" ref="formProcess">
      <staff-tree-search
        class="children-dialog"
        :visible="staffTableVsible"
        :type="baseInputType"
        :title="baseInputTitle"
        :fcompanyid="fcompanyid"
        @closeDialog="closeBaseInfo"
      ></staff-tree-search>
    </el-form>

    <!-- 会议室模态框 -->
    <el-form :model="formProcess" ref="formProcess">
      <conference-office-search
        class="children-dialog"
        :visible="officeTableVsible"
        :type="type"
        :fcompanyid="fcompanyid"
        @closeDialog="closeConfOffice"
      ></conference-office-search>
    </el-form>
  </div>
</template>

<script>
import conferenceOfficeSearch from "../conference/conference-office-search";
import staffTreeSearch from "../conference/staff-tree-search";

export default {
  name: "officeUsageDetail",
  components: {
    conferenceOfficeSearch,
    staffTreeSearch,
  },
  created() {
    this.$nextTick(() => {
      this.getTableData();
    });
  },
  data() {
    return {
      options: [],
      confOptions: [],
      pageNum: 1,
      pageSize: 10,
      total: 20,
      baseInputTitle: "",
      baseInputType: "",
      fcompanyid: "_DefaultCompanyOId",
      staffTableVsible: false,
      officeTableVsible: false,
      type: "",
      form: {},
      formProcess: {},
      tableData: [],
    };
  },
  methods: {
    // 查询会议室列表数据
    getTableDataAll() {
      let data = {};
      if(this.form.fcompanyid){
        data.fcompany = this.form.fcompanyid;
      }
      data.page = 0;
      data.size = 10000;
      this.$api.confMangement.getConfOfficeList(data).then(
        (res) => {
          this.confOptions=[];
          this.confOptions = res.data.data.rows;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //公司
    getCompany() {
      this.$api.jobUserManagement.getCompanyData().then(res => {
        if(res.status == '200') {
          this.options = res.data.data.rows;
        }
      }), error => {
        console.log(error);
      }
    },
    //公司下拉选择
    // selectChange(value){
    //   this.options.forEach(item => {
    //     if(item.id == value) {
    //       this.$nextTick(() => {
    //         this.form.fcompanyname = item.name;
    //       });
    //     }
    //   });
    // },
    //分页、下一页
    onCurrentChange(val) {
      this.pageNum = val;
      this.isEdit = false;
      this.getTableData("");
    },
    // 查询
    search() {
      this.pageNum = 1;
      this.getTableData();
    },
    // 导出
    upload() {
      let data = this.form;
      data.page = this.pageNum;
      data.size = this.pageSize;
      this.$api.confMangement.confUsageDetailExport(data);
    },
    // 获取表格数据
    getTableData() {
      let data = this.form;
      data.page = this.pageNum;
      data.size = this.pageSize;
      this.$api.confMangement.getConfUsageDetail(data).then(
        (res) => {
          let resRows = res.data.data.rows;
          for (let i in resRows) {
            switch (resRows[i].fimportance) {
              case 0:
                resRows[i].fimportanceValue = "一般";
                break;
              case 1:
                resRows[i].fimportanceValue = "重要";
            }
            switch (resRows[i].fexternal) {
              case 0:
                resRows[i].fexternal = "对内";
                break;
              case 1:
                resRows[i].fexternal = "对外";
            }
          }
          this.tableData = resRows;
          this.total = res.data.data.total;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // 打开会议室弹窗
    queryConfOffice(type) {
      debugger;
      this.type = type;
      this.officeTableVsible = true;
    },
    // 关闭会议室弹窗
    closeConfOffice(data) {
      this.form.fconfname = data.fname;
      this.form.foid = data.foid;
      this.officeTableVsible = false;
    },
    // 打开组织架构弹窗
    baseInputTable(type, title) {
      this.staffTableVsible = true;
      this.baseInputType = type; //公司:1,召集人:2,联系人:3
      this.baseInputTitle = title; //如:用户查询
    },
    // 关闭组织架构弹窗
    closeBaseInfo(data, title, type) {
      if (data == null || data.length === 0) {
      } else {
        if (type === "2") {
          // 人员
          this.form.fstaffname = data.fname;
          this.form.fstaffid = data.foid;
        }
      }
      this.staffTableVsible = false;
    },

  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-table th {
  padding: 0px 0px !important;
  text-align: center;
}

/deep/ .el-table td {
  padding: 7px 7px !important;
  text-align: center;
}

.el-table {
  font-size: 12px;
}

.box-card:first-child {
  margin-bottom: 16px;
}

/deep/ .el-positionType {
  padding-left: 0px !important;
  padding-top: 6px;
}

.el-pagination {
  text-align: right;
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
}

/deep/ .el-form-item__content {
  text-align: right;
}
</style>
