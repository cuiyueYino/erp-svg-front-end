<template>

  <div
    v-if="ShowFinancVisible"
    class="itemDivStyle"
  >
    <el-form
      label-width="110px"
      v-model="formdata"
      class="dataForm"
      size="mini"
      :model="formdata"
      :label-position="labelPosition"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="公司1111">
            <el-select
              v-model="formdata.company"
              value-key="value"
              :disabled="true"
            >
              <el-option
                v-for="item in companyData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="年度">
            <el-input
              v-model="formdata.voucherid"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="14"
          :offset="2"
        >
          <el-form-item label="计划名称">
            <el-input
              v-model="formdata.creditcontract"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="编制人：">
            <el-input
              v-model="formdata.text1"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
          :offset="2"
        >
          <el-form-item label="编制时间：">
            <el-input
              v-model="formdata.adjustdateStr"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
          :offset="2"
        >
          <el-form-item label="汇总编号：">
            <el-input
              v-model="formdata.voucherid"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="汇总部门：">
            <el-input
              v-model="formdata.text1"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="计划说明">
            <el-input
              v-model="formdata.text1"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-tabs
        v-model="atctiveName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="汇总部门明细"
          name="first"
        >
          <dynamic-table
            :columns="columns"
            :table-data="tableData"
            :total="total"
            size="mini"
            :isShowPager="false"
            ref="multipleTable"
            :page-num="pageNum"
            :page-size="pageSize"
            v-loading="false"
            element-loading-text="加载中"
          ></dynamic-table>
        </el-tab-pane>
        <el-tab-pane
          label="附件"
          name="second"
        >
          <dynamic-table
            :columns="attachColumns"
            :table-data="attachData"
            :total="total"
            size="mini"
            :isShowPager="false"
            ref="multipleTable"
            :page-num="pageNum"
            :page-size="pageSize"
            v-loading="false"
            element-loading-text="加载中"
          ></dynamic-table>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
import proData from "../../components/common/proData/proData";
import DynamicTable from "../../components/common/dytable/dytable.vue";
export default {
  props: {
    rowComPanDetaiDataObj: Object,
    rowComPanDetaitype: Boolean,
  },
  components: {
    DynamicTable,
  },
  data() {
    return {
      ShowFinancVisible: false,
      disabled: false,
      labelPosition: "left",
      formdata: {},
      companyData: new proData().company,
      atctiveName: "first",
      pageNum: 1,
      pageSize: 10,
      total: 20,
      columns: [
        {
          key: "key1",
          title: "部门名称",
        },
        {
          key: "key2",
          title: "部门编码",
        },
        {
          key: "key3",
          title: "备注",
        },
      ],
      attachColumns: [
        {
          key: "key1",
          title: "序号",
        },
        {
          key: "key2",
          title: "名称",
        },
      ],
      tableData: [],
      attachData: [],
    };
  },
  created() {
    // this.$api.processSet.getunhandledTaskForm({
    //     id: finandata[0].foid,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   });
  },
  methods: {
    handleClick() {},
    //获取公司年度计划汇总详情
    getAnnualPlan(data) {
      this.$api.processSet.getAnnualPlanDetail({
        id: data.id,
        userId:data.userId,
      })
      .then((res) => {
            if(res.data.code == 0){
              this.formdata = res.data.data;
              let tableDataObj = {};
              tableDataObj["key1"] = '计划值';
              tableDataObj["key2"] = 'Q 累计预计计划完成指标';
              tableDataObj["optionValue"] = res.data.data.optionValue;
              tableDataObj["unit"] = res.data.data.unit;
              this.tableData.push(tableDataObj);
              let taskStateParams = res.data.data.taskState;
              let taskTypeParams = res.data.data.taskType;
              let taskLeveParams = res.data.data.taskLevel;
            switch(taskStateParams) {
                case "1": 
                    this.formdata.taskState = '可执行';
                    break;
                case "2":
                    this.formdata.taskState = '已完成';
                    break;
                case "3":
                    this.formdata.taskState = '未完成';
                    break;
                case "4":
                    this.formdata.taskState = '延期';
                    break;
                case '5':
                    this.formdata.taskState ='作废';
                    break;
                case '0':
                    this.formdata.taskState ='未发生';
                    break;
                case '10':
                    this.formdata.taskState ='已报待批';
                    break;
                default:
                    break; 
            }
            // debugger;
            console.log(taskTypeParams);
            switch(taskTypeParams) {
                case 1: 
                    this.formdata.taskType = '主任务';
                    break;
                case 2:
                    this.formdata.taskType = '临时任务';
                    break;
                case 3:
                    this.formdata.taskType = '配合任务';
                    break;
                default:
                    break; 
            }
            switch(taskLeveParams) {
                case 1: 
                    this.formdata.taskLevel = '一';
                    break;
                case 2:
                    this.formdata.taskLevel = '二';
                    break;
                case 3:
                    this.formdata.taskLevel = '三';
                    break;
                case 4:
                    this.formdata.taskLevel = '四';
                    break;
                case 5:
                    this.formdata.taskLevel ='五';
                    break;
                case 6:
                    this.formdata.taskLevel ='六';
                    break;
                case 7:
                    this.formdata.taskLevel ='七';
                    break;
                case 8:
                    this.formdata.taskLevel ='八';
                    break;
                case 9:
                    this.formdata.taskLevel ='九';
                    break;
                case 10:
                    this.formdata.taskLevel ='十';
                    break;
                default:
                    break; 
            }
            if(res.data.data.groupPoint) {
                this.focusLevelCheckList.push('集团重点');
            } else if(res.data.data.companyPoint) {
                this.focusLevelCheckList.push('公司重点');
            }  else if(res.data.data.departmentPoint) {
                 this.focusLevelCheckList.push('部门重点')
            } else {
                this.focusLevelCheckList.push('');
            }


                // this.getTreeData.forEach((item,index) => {
                //    this.treeData.push(
                //       {
                //         label:item.fname,
                //         foid:item.foid,
                //       }
                //    )
                // })
            }
        }),error => {
          console.log(error);
        }
    },
  },
  watch: {
    rowComPanDetaitype(oldVal, newVal) {
      this.ShowFinancVisible = this.rowComPanDetaitype;
    },
  },
};
</script>
<style lang='scss' scoped>
.itemDivStyle {
  margin-left: 20px;
}
</style>