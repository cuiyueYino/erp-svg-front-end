<template>

  <div>
    <!-- 搜索框 -->
    <el-card class="box-card">
      <el-row :gutter="24" style='text-align:right'>
        <el-col
          :span="14"
          :offset="10"
        >
          <el-button
            type="danger"
            icon="el-icon-error"
            @click="remove"
            size="small"
          >移除</el-button>
          <el-button
            type="success"
            icon="el-icon-refresh-right"
            @click="refresh"
            size="small"
          >刷新</el-button>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="search"
            size="small"
          >查询</el-button>
          <el-button
            type="danger"
            icon="el-icon-picture-outline"
            @click="flowChart()"
            size="small"
          >流程图</el-button>
          <el-button
            type="success"
            icon="el-icon-folder-checked"
            @click="handle()"
            size="small"
          >处理</el-button>
          <el-button
            type="success"
            icon="el-icon-position"
            @click="baseInputTable('转发')"
            size="small"
          >转发</el-button>
          <el-button
            type="success"
            icon="el-icon-circle-check"
            @click="baseInputTable('委托')"
            size="small"
          >委托</el-button>
          <el-button
            type="success"
            icon="el-icon-star-off"
            @click="basefollow()"
            size="small"
          >关注</el-button>
          <el-button
            type="success"
            icon="el-icon-circle-plus-outline"
            @click="baseInputTable('加签')"
            size="small"
          >加签</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card">
      <dynamic-table
        ref="dataTable"
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
        @Row-Click="clickRow"
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
        <el-button
          type="success"
          size="small"
          @click="onHandleMoreSearch()"
          icon="el-icon-check"
        >确 定</el-button>
        <el-button @click="reset()" icon="el-icon-refresh" type="primary" size="small">重 置</el-button>
        <el-button @click="dialogWFMVisible = false" icon="el-icon-close" type="warning" size="small">取 消</el-button>
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
      :seeFlag="seeFlag"
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
    <div class="toast" v-show="toastShow">
		{{toastText}}
		</div>
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
.el-table .orange {
  background: #ffa000;
}
.el-table .yellow {
  background: yellow;
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
      toastText:'',
      toastShow:false,
      tableData: [],
      seeFlag:false,
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

      // 查询条件
        fromdata: {},
    };
  },
  created() {
    let fromdata = {};
    fromdata.infosBeginNum = 1;
    fromdata.infosEndNum = this.pageSize;
    fromdata.userId = localStorage.getItem("ms_userId");
    this.getHunTableData(fromdata);
    //查找业务数据

    //fromdata1.infosBeginNum=0;
    //fromdata1.infosEndNum=2000;
    //let fromdata1 = {};
    //this.getmetaClass(fromdata1);
    this.selectCom();
  },
  computed: {},
  methods: {
    //不走工作流程的数据，点击‘处理’按钮，弹出toast的提示
			toast (e) {
				let self = this
				self.toastText = e
				self.toastShow = true
				setTimeout(function(){
				self.toastShow = false
				}, 1500)
			},
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
      let fromdata = {
          page:1,
          size:99999
      };
      this.$api.processSet.getProcessClass(fromdata).then((response) => {
        let responsevalue = response;
        if (responsevalue.data) {
          let returndata = responsevalue.data;
          this.WFMtypeoptions = response.data.data.rows;
        } else {
          this.$message.success("数据库没有业务数据!");
        }
        this.dialogWFMVisible = true;
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
      // debugger
      if (row.fstatus === "暂停") {
        return "gray";
      } else if (row.fstatus === "已作废") {
        return "red";
      } else if (row.fstatus === "已完结") {
        return "green";
      }else if(row.timeOutStatus =='1'){
        return "orange";
      }else if((row.fsubject.substring(0,3) == '退回：' && row.fcreator == localStorage.getItem("ms_userId")) ||  row.fcode == 'manpower') {
        return 'yellow'
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
        let selectData = this.multipleSelection;
        if(selectData[0].repeat && selectData[0].repeat!=''){
          if(data =='委托' || data =='加签'){
            this.$message.error("当前邮件是转发邮件，不能进行"+data+"!");
            return;
          }
        }
        if(data =='委托'){
          let subject =selectData[0].fsubject;
          subject= subject.substring(0,4);
          if (subject.indexOf("正在加签") > -1) {
            this.$message.error('当前邮件是正在加签邮件，不能进行委托!');
            return;
          }else{
            subject= subject.substring(0,2);
            if (subject.indexOf("加签") > -1) {
              this.$message.error('当前邮件是加签邮件，不能进行委托!');
              return;
            }
          }
        }
        if(data =='加签'){
          let subject1 =selectData[0].fsubject;
          subject1= subject1.substring(0,4);
          if (subject1.indexOf("正在加签") > -1) {}else{
            subject1= subject1.substring(0,2);
            if (subject1.indexOf("加签") > -1) {
              this.$message.error('当前邮件是加签邮件，不能进行加签!');
              return;
            }
          }
        }
        if((selectData[0].fsubject.substring(0, 3) == '退回：' && selectData[0].fcreator == localStorage.getItem("ms_userId")) || selectData[0].fcode == 'manpower') {
          this.$message.error('编辑节点不可加签，不可委托，不可转发!');
          return;
        }
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
        /*let subject = selectData[0].fsubject;
        subject= subject.substring(0,4);
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
        }*/
        //bug 730
        let fromdata = {};
        fromdata.fvoucherOid = selectData[0].fsrcoId;
        fromdata.fattentionOid = localStorage.getItem("ms_userId");
        fromdata.fwfBizMailOid = selectData[0].foid;
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
    },
    //table多选
    onSelectionChange(val) {
      this.multipleSelection = val;
    },
    //分页、下一页
    onCurrentChange(val) {
      this.fromdata.infosBeginNum = ((val - 1) * 10)+1;
      this.fromdata.infosEndNum = val * 10;
      this.fromdata.userId = localStorage.getItem("ms_userId");
      this.getHunTableData(this.fromdata);
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
        if(this.multipleSelection[0].classId == 'StaffAppraisals') {
          this.toast('页面不存在，请联系系统管理员！')
        } else {
          let selectData = this.multipleSelection;
          this.functionType = this.multipleSelection[0].classId;
          let finandata = {};
          finandata.selectData = selectData;
          finandata.finanrowname = "人员缺省查询方案";
          finandata.finanrowId = "QS_0056";
          finandata.nametitle = this.multipleSelection[0].fsrcCompany;
          finandata.fsubjectName = this.multipleSelection[0].fsubject;
          let subject = selectData[0].fsubject;
          subject= subject.substring(0,4);
          if (subject.indexOf("加签") > -1) {
            finandata.relay = false;
            finandata.attention = false;
            finandata.sign = false;
            finandata.commit = true;
            finandata.read = false;
            finandata.trust = false;
            finandata.NewOrEditFlag = 'NEW';
          }else{
            finandata.relay = true;
            finandata.attention = true;
            finandata.sign = true;
            finandata.commit = true;
            finandata.read = true;
            finandata.trust = true;
            finandata.NewOrEditFlag = 'NEW';
          }
          this.rowWAADataObj = finandata;
          this.rowWAAtype = true;
          this.financingLFCAtype = true;
        }

      }
    },
    showORhideForWAA(data) {
      if (data === false) {
        this.rowWAAtype = false;
        this.reload();
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
      }
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
    async search() {
      let fromdata1 = {};
      await this.getmetaClass(fromdata1);
    },
    reset(){
        this.DataForm = {}
    },
    //查询搜索
    onHandleMoreSearch() {
      this.fromdata = {};
        this.fromdata.infosBeginNum = this.pageNum;
        this.fromdata.infosEndNum = this.pageSize;
      let CompanyS = this.DataForm.srcCompany;
      if (CompanyS && CompanyS != "") {
          this.fromdata.srcCompany = this.DataForm.srcCompany;
      }
      let ComMCS = this.DataForm.commonMetaClass;
      if (ComMCS && ComMCS != "") {
          this.fromdata.commonMetaClass = this.DataForm.commonMetaClass;
      }
      let MetaCS = this.DataForm.metaClass;
      if (MetaCS && MetaCS != "") {
          this.fromdata.metaClass = this.DataForm.metaClass;
      }
      let activNS = this.DataForm.activityName;
      if (activNS && activNS != "") {
          this.fromdata.activityName = this.DataForm.activityName;
      }
      let subjectS = this.DataForm.subject;
      if (subjectS && subjectS != "") {
          this.fromdata.subject = this.DataForm.subject;
      }
      let receTFS = this.DataForm.receiveTimeFrom;
      if (receTFS && receTFS != "") {
          this.fromdata.receiveTimeFrom = this.DataForm.receiveTimeFrom;
      }
      let receTTS = this.DataForm.receiveTimeTo;
      if (receTTS && receTTS != "") {
          this.fromdata.receiveTimeTo = this.DataForm.receiveTimeTo;
      }
      let dispsMS = this.DataForm.displaystartMan;
      if (dispsMS && dispsMS != "") {
          this.fromdata.displaystartMan = this.DataForm.displaystartManId;
      }
      let StartTFS = this.DataForm.startTimeFrom;
      if (StartTFS && StartTFS != "") {
          this.fromdata.startTimeFrom = this.DataForm.startTimeFrom;
      }
      let StartTTS = this.DataForm.startTimeTo;
      if (StartTTS && StartTTS != "") {
          this.fromdata.startTimeTo = this.DataForm.startTimeTo;
      }
      let overTimeS = this.DataForm.overTime;
      if (overTimeS && overTimeS != "") {
          this.fromdata.overTime = this.DataForm.overTime;
      }
        this.fromdata.userId = localStorage.getItem("ms_userId");
      this.getHunTableData(this.fromdata);
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
      //  选中点击
    clickRow(val) {
          this.$refs.dataTable.toggleRowSelection(val);
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
.toast{
    position: fixed;
    z-index: 2000;
    left: 50%;
    top:45%;
    transition:all .5s;
    -webkit-transform: translateX(-50%) translateY(-50%);
       -moz-transform: translateX(-50%) translateY(-50%);
        -ms-transform: translateX(-50%) translateY(-50%);
         -o-transform: translateX(-50%) translateY(-50%);
            transform: translateX(-50%) translateY(-50%);
    text-align: center;
    border-radius: 5px;
    color:#FFF;
    background: rgba(17, 17, 17, 0.7);
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    max-width: 300px;
  }
</style>
