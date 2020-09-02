<template>
  <div
    v-if="ShowFinancVisible"
    class="itemDivStyle"
  >
    <el-form
      label-width="110px"
      :model="searchForm"
      ref="searchForm"
      class="dataForm"
      size="mini"
      :label-position="labelPosition"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="公司："
            prop="fcompany"
          >
            <el-input
              v-model="searchForm.fcompanyname"
              autocomplete="off"
              size="small"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="编码："
            prop="fcode"
          >
            <el-input
              v-model="searchForm.fcode"
              :disabled="true"
              size="small"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="6" :offset="2"
        >
          <el-form-item
            label="名称："
            prop="fname"
          >
            <el-input
              v-model="searchForm.fname"
              :disabled="true"
              size="small"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-form-item
            label="召集人："
            prop="fconvenername"
          >
            <el-input
              v-model="searchForm.fconvenername"
              :disabled="true"
              size="small"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-row>
            <el-col :span="6">
                <el-form-item
                    label="召集人部门："
                    prop="fconvenerdeptname"
                >
                    <el-input
                    class="unfocus"
                    v-model="searchForm.fconvenerdeptname"
                    :disabled="true"
                    size="small"
                    autocomplete="off"
                    ></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                <el-form-item
                    label="联系人："
                    prop="fcontactname"
                >
                    <el-input
                    v-model="searchForm.fcontactname"
                    :disabled="true"
                    size="small"
                    autocomplete="off"
                    ></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                <el-form-item
                    label="联系人部门："
                    prop="fconvenerdept"
                >
                    <el-input
                    class="unfocus"
                    v-model="searchForm.fcontactdeptname"
                    :disabled="true"
                    size="small"
                    autocomplete="off"
                    ></el-input>
                </el-form-item>
                </el-col>
        </el-row>
        <el-row>

        </el-row>
            <el-col :span="6">
                <el-form-item
                    label="联系方式："
                    prop="fphone"
                >
                    <el-input
                    v-model="searchForm.fphone"
                    :disabled="true"
                    size="small"
                    autocomplete="off"
                    ></el-input>
                </el-form-item>
                </el-col>
                <el-col
                :span="6" :offset="2"
                >
                <el-form-item
                    label="参会人数："
                    prop="fcpmcount"
                >
                    <el-input
                    v-model="searchForm.fcpmcount"
                    :disabled="true"
                    size="small"
                    autocomplete="off"
                    ></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                <el-form-item
                    label="起始时间："
                    prop="fstartdate"
                >
                    <el-date-picker
                    clearable
                    v-model="searchForm.fstartdate"
                    value-format="yyyy-MM-dd HH:mm"
                    format="yyyy-MM-dd HH:mm"
                    type="datetime"
                    size="small"
                    placeholder="选择日期"
                    :disabled="true"
                    ></el-date-picker>
                </el-form-item>
                </el-col>
        </el-row>
        <el-row>
            <el-col
            :span="6"
            >
            <el-form-item
                label="结束时间："
                prop="fenddate"
            >
                <el-date-picker
                clearable
                v-model="searchForm.fenddate"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                type="datetime"
                size="small"
                placeholder="选择日期"
                :disabled="true"
                ></el-date-picker>
            </el-form-item>
            </el-col>
            <el-col :span="6" :offset="2">
            <el-form-item
                label="会议室："
                prop="fconfname"
            >
                <el-input
                v-model="searchForm.fconfname"
                :disabled="true"
                size="small"
                autocomplete="off"
                ></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="6" :offset="2">
            <el-form-item
                label="是否公开："
                prop="fovertValue"
            >
                <el-switch
                v-model="searchForm.fovert"
                active-color="#409EFF"
                inactive-color="#cccccc"
                :active-value="0"
                :inactive-value="1"
                :disabled="true"
                ></el-switch>
            </el-form-item>
            </el-col>
        </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item
            label="重要程度："
            prop="fimportanceValue"
          >
            <el-select
              size="small"
              v-model="searchForm.fimportanceValue"
              :disabled="true"
              placeholder="请选择"
            >
              <el-option
                label="重要"
                value="1"
              ></el-option>
              <el-option
                label="一般"
                value="0"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="6" :offset="2"
        >
          <el-form-item
            label="是否对外："
            prop="fexternalVaule"
          >
            <el-switch
              v-model="searchForm.fexternal"
              active-color="#409EFF"
              inactive-color="#cccccc"
              :active-value="1"
              :inactive-value="0"
              :disabled="true"
            ></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item
            label="内部参与人："
            prop="internalMansName"
          >
            <el-input
              maxlength="3000"
              size="small"
              show-word-limit
              autosize
              type="textarea"
              class="unfocus"
              v-model="searchForm.internalMansName"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item
            label="外部参与人："
            prop="fexternalman"
          >
            <el-input
              maxlength="3000"
              size="small"
              show-word-limit
              autosize
              type="textarea"
              :disabled="true"
              v-model="searchForm.fexternalman"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item
            label="会议内容："
            prop="fmeetcontent"
          >
            <el-input
              maxlength="3000"
              size="small"
              show-word-limit
              autosize
              type="textarea"
              :disabled="true"
              v-model="searchForm.fmeetcontent"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import proData from "../../components/common/proData/proData";
export default {
  props: {
    rowConferenceApplyDataObj: Object,
    rowConferenceApplytype: Boolean,
  },
  data() {
    return {
      ShowFinancVisible: false,
      labelPosition: "left",
      searchForm: {
        fovert: 0,
        fexternal: 0,
        fcompanyid: "_DefaultCompanyOId",
        fcompanyname: "福佳集团",
        fcreator: localStorage.getItem("ms_userId"),
      },
      companyData: [],
      atctiveName: "first",
      pageNum: 1,
      pageSize: 10,
      total: 20,
      tableData: [],
      columns: [
        {
          key: "key1",
          title: "序号",
        },
        {
          key: "key2",
          title: "参数名称",
        },
        {
          key: "optionValue",
          title: "期权数值",
        },
        {
          key: "unit",
          title: "计量单位",
        },
      ],
    };
  },
  created() {},
  methods: {
    //获取会议申请详情
    getConferenceApply(data) {
      this.$api.confMangement.getApplyList(data).then(
        (res) => {
          if (res.data.data.rows.length > 0) {
            let resData = res.data.data.rows[0];
            let internalMans = resData.internalmans;
            let internalMansName = "";
            for (let i in internalMans) {
              if (i < internalMans.length - 1) {
                internalMansName += internalMans[i].fname + ",";
              } else {
                internalMansName += internalMans[i].fname;
              }
            }
            switch (resData.fimportance) {
              case 0:
                resData.fimportanceValue = "一般";
                break;
              case 1:
                resData.fimportanceValue = "重要";
                break;
              default:
                break;
            }
            this.searchForm = resData;
            this.searchForm.internalMansName = internalMansName;
            this.searchForm.internalMans = internalMans;
            console.log(this.searchForm);
          } else {
            this.$message.error("数据获取失败");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    // getTemporaryMission(data) {
    //   this.$api.processSet
    //     .getTemporaryMissionDetail({
    //       id: data.id,
    //       userId: data.userId,
    //     })
    //     .then((res) => {
    //       if (res.data.code == 0) {
    //         this.formdata = res.data.data;
    //         let tableDataObj = {};
    //         tableDataObj["key1"] = "计划值";
    //         tableDataObj["key2"] = "Q 累计预计计划完成指标";
    //         tableDataObj["optionValue"] = res.data.data.optionValue;
    //         tableDataObj["unit"] = res.data.data.unit;
    //         this.tableData.push(tableDataObj);
    //         let taskStateParams = res.data.data.taskState;
    //         let taskTypeParams = res.data.data.taskType;
    //         let taskLeveParams = res.data.data.taskLevel;
    //         switch (taskStateParams) {
    //           case "1":
    //             this.formdata.taskState = "可执行";
    //             break;
    //           case "2":
    //             this.formdata.taskState = "已完成";
    //             break;
    //           case "3":
    //             this.formdata.taskState = "未完成";
    //             break;
    //           case "4":
    //             this.formdata.taskState = "延期";
    //             break;
    //           case "5":
    //             this.formdata.taskState = "作废";
    //             break;
    //           case "0":
    //             this.formdata.taskState = "未发生";
    //             break;
    //           case "10":
    //             this.formdata.taskState = "已报待批";
    //             break;
    //           default:
    //             break;
    //         }
    //         // debugger;
    //         console.log(taskTypeParams);
    //         switch (taskTypeParams) {
    //           case 1:
    //             this.formdata.taskType = "主任务";
    //             break;
    //           case 2:
    //             this.formdata.taskType = "临时任务";
    //             break;
    //           case 3:
    //             this.formdata.taskType = "配合任务";
    //             break;
    //           default:
    //             break;
    //         }
    //         switch (taskLeveParams) {
    //           case 1:
    //             this.formdata.taskLevel = "一";
    //             break;
    //           case 2:
    //             this.formdata.taskLevel = "二";
    //             break;
    //           case 3:
    //             this.formdata.taskLevel = "三";
    //             break;
    //           case 4:
    //             this.formdata.taskLevel = "四";
    //             break;
    //           case 5:
    //             this.formdata.taskLevel = "五";
    //             break;
    //           case 6:
    //             this.formdata.taskLevel = "六";
    //             break;
    //           case 7:
    //             this.formdata.taskLevel = "七";
    //             break;
    //           case 8:
    //             this.formdata.taskLevel = "八";
    //             break;
    //           case 9:
    //             this.formdata.taskLevel = "九";
    //             break;
    //           case 10:
    //             this.formdata.taskLevel = "十";
    //             break;
    //           default:
    //             break;
    //         }
    //         if (res.data.data.groupPoint) {
    //           this.focusLevelCheckList.push("集团重点");
    //         } else if (res.data.data.companyPoint) {
    //           this.focusLevelCheckList.push("公司重点");
    //         } else if (res.data.data.departmentPoint) {
    //           this.focusLevelCheckList.push("部门重点");
    //         } else {
    //           this.focusLevelCheckList.push("");
    //         }

    //         // this.getTreeData.forEach((item,index) => {
    //         //    this.treeData.push(
    //         //       {
    //         //         label:item.fname,
    //         //         foid:item.foid,
    //         //       }
    //         //    )
    //         // })
    //       }
    //     }),
    //     (error) => {
    //       console.log(error);
    //     };
    // },
  },
  watch: {
    rowConferenceApplytype(oldVal) {
      this.ShowFinancVisible = this.rowConferenceApplytype;
      let conferenceApplySelected = {
        foid: this.rowConferenceApplyDataObj.fsrcoId,
        page: 1,
        size: 999,
      };
      this.getConferenceApply(conferenceApplySelected);
    },
  },
};
</script>
<style lang='scss' scoped>
.itemDivStyle {
  margin-left: 20px;
}
</style>
