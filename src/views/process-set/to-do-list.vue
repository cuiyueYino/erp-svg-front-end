<template>

  <div>
    <!-- 搜索框 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col
          :span="14"
          :offset="10"
        >
          <el-button
            type="success"
            icon="el-icon-more"
            plain
            @click="remove"
          >移除</el-button>
          <el-button
            type="success"
            icon="el-icon-refresh"
            plain
            @click="refresh"
          >刷新</el-button>
          <el-button
            type="success"
            icon="el-icon-search"
            plain
            @click="search"
          >查询</el-button>
          <el-button
            type="danger"
            icon="el-icon-notebook-2"
            plain
            @click="flowChart()"
          >流程图</el-button>
          <el-button
            type="warning"
            icon="el-icon-document-checked"
            plain
            @click="handle()"
          >处理</el-button>
          <el-button
            type="success"
            icon="el-icon-share"
            plain
            @click="baseInputTable('转发')"
          >转发</el-button>
          <el-button
            type="danger"
            icon="el-icon-s-order"
            plain
            @click="baseInputTable('委托')"
          >委托</el-button>
          <el-button
            type="danger"
            icon="el-icon-view"
            plain
            @click="basefollow()"
          >关注</el-button>
          <el-button
            type="danger"
            icon="el-icon-circle-plus-outline"
            plain
            @click="baseInputTable('加签')"
          >加签</el-button>
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
        :tableRowClassName="tableRowClassName"
        v-loading="false"
        element-loading-text="加载中"
      ></dynamic-table>
    </el-card>
    <!-- 查询 -->
    <el-dialog
      title="待办事项"
      :visible.sync="dialogWFMVisible"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form
        :model="DataForm"
        label-width="100px"
        class="dataForm"
        size="mini"
        :label-position="labelPosition"
      >
        <el-card>
          <el-row class="elrowStyle">
            <el-col
              :span="6"
              class="pbackground"
            >查询条件</el-col>
            <el-col
              :span="6"
              class="pbackground"
            >操作符</el-col>
            <el-col
              :span="12"
              class="pbackground"
            >条件值</el-col>
          </el-row>
          <el-row class="elrowStyle">
            <el-col
              :span="6"
              class="elColCenter"
            >来源单据公司</el-col>
            <el-col
              :span="6"
              class="elColCenter"
            >等于</el-col>
            <el-col :span="6">
              <el-select
                v-model="DataForm.srcCompany"
                size="mini"
              >
                <el-option
                  v-for="item in companyoptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="elrowStyle">
            <el-col
              :span="6"
              class="elColCenter"
            >常用业务数据</el-col>
            <el-col
              :span="6"
              class="elColCenter"
            >等于</el-col>
            <el-col :span="6">
              <el-select
                v-model="DataForm.commonMetaClass"
                size="mini"
              >
                <el-option
                  v-for="item in commonMeta"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="elrowStyle">
            <el-col
              :span="6"
              class="elColCenter"
            >业务数据</el-col>
            <el-col
              :span="6"
              class="elColCenter"
            >等于</el-col>
            <el-col :span="6">
              <el-select
                v-model="DataForm.metaClass"
                size="mini"
              >
                <el-option
                  v-for="item in WFMtypeoptions"
                  :key="item.foid"
                  :label="item.fname"
                  :value="item.foid"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row
            class="elrowStyle"
            size="mini"
          >
            <el-col
              :span="6"
              class="elColCenter"
            >业务工作</el-col>
            <el-col
              :span="6"
              class="elColCenter"
            >左右匹配</el-col>
            <el-col :span="6">
              <el-input
                v-model="DataForm.activityName"
                size="mini"
              ></el-input>
            </el-col>
          </el-row>
          <el-row
            class="elrowStyle"
            size="mini"
          >
            <el-col
              :span="6"
              class="elColCenter"
            >主题</el-col>
            <el-col
              :span="6"
              class="elColCenter"
            >左右匹配</el-col>
            <el-col :span="6">
              <el-input
                v-model="DataForm.subject"
                size="mini"
              ></el-input>
            </el-col>
          </el-row>
          <el-row class="elrowStyle">
            <el-col
              :span="6"
              class="elColCenter"
            >接收时间</el-col>
            <el-col
              :span="6"
              class="elColCenter"
            >大于等于</el-col>
            <el-col :span="6">
              <el-date-picker
                v-model="DataForm.receiveTimeFrom"
                type="datetime"
                size="mini"
                default-time="12:00:00"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row class="elrowStyle">
            <el-col
              :span="6"
              class="elColCenter"
            >接收时间</el-col>
            <el-col
              :span="6"
              class="elColCenter"
            >小于等于</el-col>
            <el-col :span="6">
              <el-date-picker
                v-model="DataForm.receiveTimeTo"
                type="datetime"
                size="mini"
                default-time="12:00:00"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row
            class="elrowStyle"
            size="mini"
          >
            <el-col
              :span="6"
              class="elColCenter"
            >发起人</el-col>
            <el-col
              :span="6"
              class="elColCenter"
            >等于</el-col>
            <el-col :span="5">
              <el-input
                v-model="DataForm.displaystartMan"
                size="mini"
              ></el-input>
            </el-col>
            <el-col :span="1">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-search"
                @click="MoreSearchPS(DataForm)"
              ></el-button>
            </el-col>
          </el-row>
          <el-row class="elrowStyle">
            <el-col
              :span="6"
              class="elColCenter"
            >发起时间</el-col>
            <el-col
              :span="6"
              class="elColCenter"
            >大于等于</el-col>
            <el-col :span="6">
              <el-date-picker
                v-model="DataForm.startTimeFrom"
                type="datetime"
                size="mini"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row class="elrowStyle">
            <el-col
              :span="6"
              class="elColCenter"
            >发起时间</el-col>
            <el-col
              :span="6"
              class="elColCenter"
            >小于等于</el-col>
            <el-col :span="6">
              <el-date-picker
                v-model="DataForm.startTimeTo"
                type="datetime"
                size="mini"
                default-time="12:00:00"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row
            class="elrowStyle"
            size="mini"
          >
            <el-col
              :span="6"
              class="elColCenter"
            >超时</el-col>
            <el-col
              :span="6"
              class="elColCenter"
            >等于</el-col>
            <el-col :span="6">
              <el-radio
                v-model="DataForm.overTime"
                label="1"
              >是</el-radio>
              <el-radio
                v-model="DataForm.overTime"
                label="2"
              >否</el-radio>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="reset()">重 置</el-button>
        <el-button @click="dialogWFMVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="onHandleMoreSearch()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <PSpage
      :rowPSDataObj="rowPSDataObj"
      :rowPStype="rowPStype"
      @changeShow="showORhideForPS"
    />
    <WAApage
      :rowWAADataObj="rowWAADataObj"
      :rowWAAtype="rowWAAtype"
      :functionType="functionType"
      @changeShow="showORhideForWAA"
    />
    <baseInfoDialog
      :rowUTSDataObj="rowUTSDataObj"
      :rowUTStype="rowUTStype"
      @changeShow="closeBaseInfo"
    />
    <flowchart
      :rowFCDDataObj="rowFCDDataObj"
      :rowFCDtype="rowFCDtype"
      @changeShow="closeflowchart"
    />
  </div>
</template>
<style>
.el-table .green {
  background: rgba(130, 255, 140, 0.2);
}
.el-table .gray {
  background: rgba(192, 192, 192, 0.616);
}
.el-table .red {
  background: rgba(248, 15, 15, 0.178);
}
.el-table .white {
  background: rgba(255, 255, 255, 1);
}
</style>
<script>
import DynamicTable from "../../components/common/dytable/dytable.vue";
import PSpage from "../comment/personnel-search.vue";
import WAApage from "./warehousing-applicant-approval.vue";
import baseInfoDialog from "./user-tree-search.vue";
import flowchart from "../comment/flow-chart-detail.vue";
import proData from "../../components/common/proData/proData";
export default {
  name: "workProcess",
  components: {
    DynamicTable,
    WAApage,
    flowchart,
    baseInfoDialog,
    PSpage,
    proData,
  },
  inject: ["reload"],
  data() {
    return {
      functionType:'',
      detail: false,
      dialogWFMVisible: false,
      rowPStype: false,
      rowWAAtype: false,
      rowUTStype: false,
      rowFCDtype: false,
      baseInputTableF: false,
      financingLFCAtype: false,
      baseInputType: "",
      baseInputTitle: "",
      rowPSDataObj: {},
      rowWAADataObj: {},
      rowUTSDataObj: {},
      rowFCDDataObj: {},
      pageNum: 1,
      pageSize: 10,
      total: 20,
      labelPosition: "left",
      columns: [
        {
          type: "selection",
        },
        {
          key: "fstatus",
          title: "状态",
        },
        {
          key: "fsrcCompany",
          title: "单据类型",
        },
        {
          key: "factivityName",
          title: "业务工作",
        },
        {
          key: "faddresser",
          title: "发起人",
        },
        {
          key: "freceiveTime",
          title: "发起时间",
        },
        {
          key: "fsubject",
          title: "主题",
        },
        {
          key: "fpreAddresser",
          title: "上一节点",
        },
        {
          key: "fpreReceiveTime",
          title: "审批人接收时间",
        },
        {
          key: "fmaxWorkTime",
          title: "标准用时",
        },
        {
          key: "takeTime",
          title: "已耗时",
        },
        {
          key: "repeat",
          title: "转发人",
        },
        {
          key: "repeatTime",
          title: "转发时间",
        },
        {
          key: "trustMan",
          title: "委托人",
        },
        {
          key: "trustTime",
          title: "委托时间",
        },
      ],
      tableData: [],
      multipleSelection: [],
      checked: false,
      DataForm: {},
      WFMtypeoptions: [],
      companyoptions:[],
      commonMeta: new proData().commonMetaClass,
      formLabelWidth: "120px",
    };
  },
  created() {
    let fromdata = {};
    fromdata.infosBeginNum = 1;
    fromdata.infosEndNum = this.pageSize;
    fromdata.userId = localStorage.getItem("ms_userId");
    this.getHunTableData(fromdata);
    //查找业务数据
    let fromdata1 = {};
    //fromdata1.infosBeginNum=0;
    //fromdata1.infosEndNum=2000;
    this.getmetaClass(fromdata1);
    this.selectCom();
  },
  computed: {},
  methods: {
    selectCom(){
      this.$api.jobUserManagement.getCompanyData().then((res) => {
        if (res.status == "200") {
          this.companyoptions= res.data.data.rows;
        }
      }),
      (error) => {
        console.log(error);
      };
    },
    //获取待办事项
    getHunTableData(data) {
      let fromdata = data;
      this.$api.processSet.getunhandledTask(fromdata).then((response) => {
        let responsevalue = response;
        if (responsevalue) {
          let returndata = responsevalue.data;
          if (returndata.data) {
            if (this.detail) {
              this.searchForm = returndata.data.rows[0];
            } else {
              let tableArr = returndata.data.rows;
              this.tableData = tableArr;
              this.total = returndata.data.total;
            }
          } else {
            this.tableData = [];
            this.total = 0;
          }
          this.dialogWFMVisible = false;
        } else {
          this.$message.success("数据库没有该条数据!");
        }
      });
    },
    //查找业务数据
    getmetaClass(data) {
      let fromdata = data;
      this.$api.processSet.getProcessClass(fromdata).then((response) => {
        let responsevalue = response;
        if (responsevalue) {
          let returndata = responsevalue.data;
          this.WFMtypeoptions = returndata.data.rows;
        } else {
          this.$message.success("数据库没有该条数据!");
        }
      });
    },
    //移除
    remove() {
      if (this.multipleSelection.length > 1) {
        this.$message.error("只能选择一个");
      } else if (this.multipleSelection.length == 0) {
        this.$message.error("请选择一项");
      } else {
        this.$confirm("是否确认移除此单据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let selectData = this.multipleSelection;
          let fromdata = {};
          fromdata.foids = selectData[0].foid;
          fromdata.oid = localStorage.getItem("ms_userId");
          this.$api.processSet.RemoveTBin(fromdata).then(
            (res) => {
              let resData = res;
              this.ShowFinancVisible = false;
              this.reload();
              this.$emit("changeShow", false);
            },
            (error) => {
              console.log(error);
            }
          );
        }).catch(() => {
            this.$message({
              type: "info",
              message: "已取消移除",
            });
          });
      }
    },
    //根据状态改背景色
    tableRowClassName({ row }) {
      if (row.fstatus === "暂停") {
        return "gray";
      } else if (row.fstatus === "已作废") {
        return "red";
      } else if (row.fstatus === "已完结") {
        return "green";
      }
      return "";
    },
    //转发按钮点击事件
    baseInputTable(data) {
      if (this.multipleSelection.length > 1) {
        this.$message.error("只能选择一个");
      } else if (this.multipleSelection.length == 0) {
        this.$message.error("请选择一项");
      } else {
        this.rowUTStype = true;
        let finandata = {};
        finandata.finanrowname = "人员缺省查询方案";
        finandata.finanrowId = "QS_0056";
        finandata.nametitle = "待办事项";
        finandata.SelectionData = this.multipleSelection;
        finandata.FunctionType = data;
        this.rowUTSDataObj = finandata;
      }
    },
    closeBaseInfo(data) {
      if (data === false) {
        this.rowUTStype = false;
        this.reload();
      } else {
        this.rowUTStype = true;
      }
    },
    //关注点击事件
    basefollow() {
      if (this.multipleSelection.length > 1) {
        this.$message.error("只能选择一个");
      } else if (this.multipleSelection.length == 0) {
        this.$message.error("请选择一项");
      } else {
        let selectData = this.multipleSelection;
        let subject = selectData[0].fsubject;
        if (subject.indexOf("转发") > -1) {
          this.$message.error("转发邮件不能添加关注!");
        } else if (subject.indexOf("抄送") > -1) {
          this.$message.error("抄送邮件不能添加关注!");
        } else if (subject.indexOf("加签") > -1) {
          this.$message.error("加签邮件不能添加关注!");
        } else {
          let fromdata = {};
          fromdata.fvoucherOid = selectData[0].fsrcoId;
          fromdata.fattentionOid = localStorage.getItem("ms_userId");
          this.$api.processSet.addAttention(fromdata).then((response) => {
            let responsevalue = response;
            if (responsevalue) {
              let returndata = responsevalue.data;
              this.$message.success("添加关注成功!");
              this.reload();
            } else {
              this.$message.success("数据库没有该条数据!");
            }
          });
        }
      }
    },
    //table多选
    onSelectionChange(val) {
      this.multipleSelection = val;
    },
    //分页、下一页
    onCurrentChange(val) {
      let fromdata = {};
      fromdata.infosBeginNum = (val - 1) * 10;
      fromdata.infosEndNum = val * 10;
      fromdata.userId = localStorage.getItem("ms_userId");
      this.getHunTableData(fromdata);
    },
    //刷新
    refresh() {
      this.reload();
    },
    //处理
    handle() {
      this.detail = true;
      if (this.multipleSelection.length > 1) {
        this.$message.error("只能选择一个");
      } else if (this.multipleSelection.length == 0) {
        this.$message.error("请选择一项");
      } else {
        let selectData = this.multipleSelection;
        this.functionType = this.multipleSelection[0].classId;
        let finandata = {};
        finandata.selectData = selectData;
        finandata.finanrowname = "人员缺省查询方案";
        finandata.finanrowId = "QS_0056";
        finandata.nametitle = this.multipleSelection[0].fsrcCompany;
        this.rowWAADataObj = finandata;
        this.rowWAAtype = true;
        this.financingLFCAtype = true;
      }
    },
    showORhideForWAA(data) {
      if (data === false) {
        this.rowWAAtype = false;
      } else {
        this.rowWAAtype = true;
      }
    },
    //流程图查看
    flowChart() {
      if (this.multipleSelection.length > 1) {
        this.$message.error("只能选择一个");
      } else if (this.multipleSelection.length == 0) {
        this.$message.error("请选择一项");
      } else {
        let selectData = this.multipleSelection;
        let finandata = {};
        finandata.finanrowname = selectData[0].fsrcCompany+"/"+selectData[0].factivityName;
        finandata.finanrowId = selectData[0].foid;
        finandata.nametitle = selectData[0].fsubject;
        this.rowFCDDataObj = finandata;
        this.rowFCDtype = true;
        console.log(selectData)
      }

      /*let finandata = {};
      finandata.finanrowname = "人员缺省查询方案";
      finandata.finanrowId = "QS_0056";
      finandata.nametitle = "入库申请申请人审批";
      this.rowFCDDataObj = finandata;
      this.rowFCDtype = true;*/
    },
    //流程图关闭
    closeflowchart(data) {
      if (data === false) {
        this.rowFCDtype = false;
      } else {
        this.rowFCDtype = true;
      }
    },
    //查询
    search() {
      this.dialogWFMVisible = true;
    },
    reset(){
        this.DataForm = {}
    },
    //查询搜索
    onHandleMoreSearch() {
      let fromdata = {};
      fromdata.infosBeginNum = this.pageNum;
      fromdata.infosEndNum = this.pageSize;
      let CompanyS = this.DataForm.srcCompany;
      if (CompanyS && CompanyS != "") {
        fromdata.srcCompany = this.DataForm.srcCompany;
      }
      let ComMCS = this.DataForm.commonMetaClass;
      if (ComMCS && ComMCS != "") {
        fromdata.commonMetaClass = this.DataForm.commonMetaClass;
      }
      let MetaCS = this.DataForm.metaClass;
      if (MetaCS && MetaCS != "") {
        fromdata.metaClass = this.DataForm.metaClass;
      }
      let activNS = this.DataForm.activityName;
      if (activNS && activNS != "") {
        fromdata.activityName = this.DataForm.activityName;
      }
      let subjectS = this.DataForm.subject;
      if (subjectS && subjectS != "") {
        fromdata.subject = this.DataForm.subject;
      }
      let receTFS = this.DataForm.receiveTimeFrom;
      if (receTFS && receTFS != "") {
        fromdata.receiveTimeFrom = this.DataForm.receiveTimeFrom;
      }
      let receTTS = this.DataForm.receiveTimeTo;
      if (receTTS && receTTS != "") {
        fromdata.receiveTimeTo = this.DataForm.receiveTimeTo;
      }
      let dispsMS = this.DataForm.displaystartMan;
      if (dispsMS && dispsMS != "") {
        fromdata.displaystartMan = this.DataForm.displaystartManId;
      }
      let StartTFS = this.DataForm.startTimeFrom;
      if (StartTFS && StartTFS != "") {
        fromdata.startTimeFrom = this.DataForm.startTimeFrom;
      }
      let StartTTS = this.DataForm.startTimeTo;
      if (StartTTS && StartTTS != "") {
        fromdata.startTimeTo = this.DataForm.startTimeTo;
      }
      let overTimeS = this.DataForm.overTime;
      if (overTimeS && overTimeS != "") {
        fromdata.overTime = this.DataForm.overTime;
      }
      fromdata.userId = localStorage.getItem("ms_userId");
      this.getHunTableData(fromdata);
    },
    //查询发起人员
    MoreSearchPS(data) {
      this.rowPStype = true;
      let finandata = data;
      finandata.finanrowname = "人员缺省查询方案";
      finandata.finanrowId = "QS_0056";
      finandata.nametitle = "工作流监控";
      this.rowPSDataObj = finandata;
    },
    //获取人员查询结果
    showORhideForPS(data, type) {
      if (type === false) {
        this.rowPStype = false;
      } else {
        this.rowPStype = true;
      }
      if (data.selectOptionID) {
        this.DataForm.displaystartMan = data.selectOptionName;
        this.DataForm.displaystartManId = data.selectOptionID;
        this.DataForm.displaystartMancode = data.selectOptionCode;
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
  margin-left: 50px;
}
.dataForm {
  margin-top: 10px;
}
.elrowStyle {
  margin-top: 20px;
}
.elColCenter {
  text-align: center;
}
.pbackground {
  text-align: center;
  height: 30px;
  font-size: 15px;
  line-height: 30px;
  background-color: skyblue;
}
</style>
<style lang='scss'>
.replydiag {
  .el-textarea__inner {
    min-height: 300px !important;
  }
}
.el-dialog__body {
  padding: 0;
}
.el-card__header {
  padding: 10px 20px;
}
</style>
