<template>
  <div>
    <!-- 新增，修改，修订弹出框 -->
    <el-dialog
      :title="title"
      center
      :visible.sync="dialogVisible"
      v-if="dialogVisible && (title === '新建会议申请' || title === '修改会议申请' || title === '修订会议申请')"
      :close-on-click-modal="false"
      :close-on-press-escape="closeConfig"
      @close="closeDialog"
      style="z-index:2007"
    >
      <el-form :model="searchForm" :rules="rules" ref="searchForm" style="margin: 0px 20px;">
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="公司：" :label-width="formLabelWidth" class="pop-select" prop="fcompany">
              <el-select v-model="searchForm.fcompany" size="small" clearable placeholder="请选择" @change="setCompany">
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
<!--            <el-form-item-->
<!--              label="公司："-->
<!--              :label-width="formLabelWidth"-->
<!--              style="position:relative;"-->
<!--              prop="fcompany"-->
<!--            >-->
<!--              <el-input-->
<!--                v-model="searchForm.fcompanyname"-->
<!--                autocomplete="off"-->
<!--                size="small"-->
<!--                @focus="baseInputTable('1','组织机构查询')"-->
<!--              ></el-input>-->
<!--            </el-form-item>-->
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="编码：" :label-width="formLabelWidth" prop="fcode">
              <el-input v-if="title == '新建会议申请' || title == '修改会议申请'" v-model="searchForm.fcode" size="small"
                        autocomplete="off"></el-input>
              <el-input v-else v-model="searchForm.fcode" :disabled="true" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="margin-left: 32px;">
            <el-form-item label="名称：" :label-width="formLabelWidth" prop="fname">
              <el-input v-if="title == '新建会议申请' || title == '修改会议申请'" v-model="searchForm.fname" size="small"
                        autocomplete="off"></el-input>
              <el-input v-else v-model="searchForm.fname" :disabled="true" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="召集人：" :label-width="formLabelWidth" prop="fconvenername">
              <el-input
                v-model="searchForm.fconvenername"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-positionType">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              @click="baseInputTable('2','用户查询')"
            ></el-button>
          </el-col>
          <el-col :span="11">
            <el-form-item label="召集人部门：" :label-width="formLabelWidth">
              <el-input
                class="unfocus"
                v-model="searchForm.fconvenerdeptname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系人：" :label-width="formLabelWidth" prop="fcontactname">
              <el-input
                v-model="searchForm.fcontactname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-positionType">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              @click="baseInputTable('3','用户查询')"
            ></el-button>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系人部门：" :label-width="formLabelWidth">
              <el-input
                class="unfocus"
                v-model="searchForm.fcontactdeptname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系方式：" :label-width="formLabelWidth">
              <el-input v-model="searchForm.fphone" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="margin-left: 32px;">
            <el-form-item label="参会人数：" :label-width="formLabelWidth" prop="fcpmcount">
              <el-input v-model="searchForm.fcpmcount" size="small" autocomplete="off" @change="fcpmcountMethod"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="起始时间：" :label-width="formLabelWidth" prop="fstartdate">
              <el-date-picker
                clearable
                v-model="searchForm.fstartdate"
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"
                type="datetime"
                size="small"
                placeholder="选择日期"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="margin-left: 32px;">
            <el-form-item label="结束时间：" :label-width="formLabelWidth" prop="fenddate">
              <el-date-picker
                clearable
                v-model="searchForm.fenddate"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                type="datetime"
                size="small"
                placeholder="选择日期"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="会议室：" :label-width="formLabelWidth" prop="fconfname">
              <el-input
                v-model="searchForm.fconfname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-positionType">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              @click="queryConfOffice('1')"
            ></el-button>
          </el-col>
          <el-col :span="11">
            <el-form-item label="是否公开：" :label-width="formLabelWidth">
              <el-switch
                v-model="searchForm.fovert"
                active-color="#409EFF"
                inactive-color="#cccccc"
                :active-value="0"
                :inactive-value="1"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="重要程度：" :label-width="formLabelWidth" prop="fimportanceValue">
              <el-select size="small" v-model="searchForm.fimportanceValue" placeholder="请选择">
                <el-option label="重要" value="1"></el-option>
                <el-option label="一般" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="padding-left: 48px !important;">
            <el-form-item label="是否对外：" :label-width="formLabelWidth">
              <el-switch
                v-model="searchForm.fexternal"
                active-color="#409EFF"
                inactive-color="#cccccc"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="22">
            <el-form-item label="内部参与人：" :label-width="formLabelWidth">
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
          <el-col :span="2" class="el-internalMansName_" style="padding: 10px 0px 0px 0px !important;">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              @click="baseInputTable('4','用户查询')"
            ></el-button>
	    <el-button
              type="primary"
              size="mini"
              icon="el-icon-close"
              style="padding:7px 8px"
              @click="closePerson"
            ></el-button>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="23">
            <el-form-item label="外部参与人：" :label-width="formLabelWidth">
              <el-input
                maxlength="3000"
                size="small"
                show-word-limit
                autosize
                type="textarea"
                v-model="searchForm.fexternalman"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="23">
            <el-form-item label="会议内容：" :label-width="formLabelWidth">
              <el-input
                maxlength="3000"
                size="small"
                show-word-limit
                autosize
                type="textarea"
                v-model="searchForm.fmeetcontent"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- todo -->
      <div slot="footer" class="dialog-footer">
        <el-button type="success" icon="el-icon-copy-document" size="small" @click="submitConfApply('searchForm')">提交</el-button>
        <el-button type="success" icon="el-icon-folder-remove" size="small" v-if="title == '新建会议申请' || title == '修改会议申请'" @click="stagingConfApply('searchForm')">暂存</el-button>
      </div>
    </el-dialog>
    <!-- 查看模态框 -->
    <el-dialog
      :title="title"
      center
      :visible.sync="dialogVisible"
      v-if="dialogVisible && title === '查看会议申请'"
      :modal="false"
      :close-on-click-modal="closeConfig"
      :close-on-press-escape="closeConfig"
      @close="closeDialog"
      style="z-index:2007"
    >
      <el-form :model="searchForm" ref="searchForm" style="margin: 0px 20px;">
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item
              label="公司："
              :label-width="formLabelWidth"
              style="position:relative;"
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
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="编码：" :label-width="formLabelWidth" prop="fcode">
              <el-input v-model="searchForm.fcode" :disabled="true" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="margin-left: 32px;">
            <el-form-item label="名称：" :label-width="formLabelWidth" prop="fname">
              <el-input v-model="searchForm.fname" :disabled="true" size="small" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="召集人：" :label-width="formLabelWidth" prop="fconvenername">
              <el-input
                v-model="searchForm.fconvenername"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-positionType">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              :disabled="true"
            ></el-button>
          </el-col>
          <el-col :span="11">
            <el-form-item label="召集人部门：" :label-width="formLabelWidth" prop="fconvenerdeptname">
              <el-input
                class="unfocus"
                v-model="searchForm.fconvenerdeptname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系人：" :label-width="formLabelWidth" prop="fcontactname">
              <el-input
                v-model="searchForm.fcontactname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-positionType">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              :disabled="true"
            ></el-button>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系人部门：" :label-width="formLabelWidth" prop="fconvenerdept">
              <el-input
                class="unfocus"
                v-model="searchForm.fcontactdeptname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系方式：" :label-width="formLabelWidth" prop="fphone">
              <el-input
                v-model="searchForm.fphone"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="margin-left: 32px;">
            <el-form-item label="参会人数：" :label-width="formLabelWidth" prop="fcpmcount">
              <el-input
                v-model="searchForm.fcpmcount"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="起始时间：" :label-width="formLabelWidth" prop="fstartdate">
              <el-date-picker
                clearable
                v-model="searchForm.fstartdate"
                value-format="yyyy-MM-dd HH:mm"
                format="yyyy-MM-dd HH:mm"
                type="datetime"
                size="small"
                placeholder="选择日期"
                style="width: 100%;"
                :disabled="true"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="margin-left: 32px;">
            <el-form-item label="结束时间：" :label-width="formLabelWidth" prop="fenddate">
              <el-date-picker
                clearable
                v-model="searchForm.fenddate"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                type="datetime"
                size="small"
                placeholder="选择日期"
                style="width: 100%;"
                :disabled="true"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="会议室：" :label-width="formLabelWidth" prop="fconfname">
              <el-input
                v-model="searchForm.fconfname"
                :disabled="true"
                size="small"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="el-positionType">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              :disabled="true"
            ></el-button>
          </el-col>
          <el-col :span="11">
            <el-form-item label="是否公开：" :label-width="formLabelWidth" prop="fovertValue">
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
        <el-row :gutter="24">
          <el-col :span="11">
            <el-form-item label="重要程度：" :label-width="formLabelWidth" prop="fimportanceValue">
              <el-select
                size="small"
                v-model="searchForm.fimportanceValue"
                :disabled="true"
                placeholder="请选择"
              >
                <el-option label="重要" value="1"></el-option>
                <el-option label="一般" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" style="padding-left: 48px !important;">
            <el-form-item label="是否对外：" :label-width="formLabelWidth" prop="fexternalVaule">
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
        <el-row :gutter="24">
          <el-col :span="23">
            <el-form-item label="内部参与人：" :label-width="formLabelWidth" prop="internalMansName">
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
          <el-col :span="1" class="el-internalMansName_" style="padding: 10px 0px 0px 0px !important;">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-search"
              style="padding:7px 8px"
              :disabled="true"
            ></el-button>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="23">
            <el-form-item label="外部参与人：" :label-width="formLabelWidth" prop="fexternalman">
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
        <el-row :gutter="24">
          <el-col :span="23">
            <el-form-item label="会议内容：" :label-width="formLabelWidth" prop="fmeetcontent">
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
    </el-dialog>
    <!-- 用户或组织机构模态框 -->
    <el-form :model="formProcess" ref="formProcess">
      <staff-tree-search
        class="children-dialog"
        :visible="staffTableVisible"
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
        :type="type"
        :visible="officeTableVisible"
        :fcompanyid="fcompanyid"
        :fstartdate="fstartdate"
        :fenddate="fenddate"
        :fvolume="fvolume"
        @closeDialog="closeConfOffice"
      ></conference-office-search>
    </el-form>
    <input v-model="formFlag" style="display:none;">
  </div>
</template>

<script>
  import staffTreeSearch from "../conference/staff-tree-search";
  import conferenceOfficeSearch from "../conference/conference-office-search";
  import message from "../../components/common/message";

  export default {
    name: "ConfApplyDialog",
    components: {
      staffTreeSearch,
      conferenceOfficeSearch,
    },
    props: {
      // 当前配置节点类型
      title: {
        type: String,
        default: "",
      },
      // 配置对话框显示标识
      visible: {
        type: Boolean,
        default: false,
      },
      // 单据id
      foid: {
        type: String,
        default: "",
      },
    },
    computed: {},
    watch: {
      visible(bool) {
        if(bool && this.title === '新建会议申请'){
          this.getCurrentStaffInfo();
          this.searchForm.internalmans=[];
          this.searchForm.internalMansName="";
        }
        this.dialogVisible = bool;
        if (this.foid != null && this.foid != "") {
          // 修改或者修订
          let data = {
            foid: this.foid,
            page: 1,
            size: 999,
          };
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
                this.$set(this.searchForm,"fcompany",resData.fcompanyid)

              } else {
                this.$message.error("数据获取失败");
              }
            },
            (error) => {
              console.log(error);
            }
          );
        }
      }
    },
    created() {
        // this.searchForm.fcompany = JSON.parse(localStorage.getItem('CompanyData'))[0].id
    },
    data() {
      let checkInt = (rule, value, callback) => {
        if (Number(value) && value % 1 === 0) {
          callback();
        } else {
          return callback(new Error("请输入整数！"));
        }
      };
      return {
        formFlag:1,
        options: JSON.parse(localStorage.getItem('CompanyData')),
        pageNum: 1,
        pageSize: 10,
        total: 20,
        fvolume: 0,
        type: "",
        fenddate: "",
        fstartdate: "",
        fcompanyid: "",
        baseInputType: "",
        baseInputTitle: "",
        formLabelWidth: "120px",
        formProcess: {},
        tableData: [],
        rowPOSSDataObj: {},
        multipleSelection: [],
        searchForm: {
          fovert: 0,
          fexternal: 0,
          internalmans:[],
          internalMansName:"",
          // fcompanyid: "_DefaultCompanyOId",
          // fcompanyname: "福佳集团",
          fcreator: localStorage.getItem('ms_userId'),
        },
        isDate: false,
        isNormal: true,
        isOvert: false,
        closeConfig: false,
        dialogVisible: this.visible,
        queryFormVisible: false,
        staffTableVisible: false,
        officeTableVisible: false,
        rules: {
          fcode: [
            {required: true, message: "请输入编码", trigger: "blur"},
            {
              min: 1,
              max: 100,
              message: "长度在 1 到 50 个字符",
              trigger: "blur",
            },
          ],
          fname: [
            {required: true, message: "请输入名称", trigger: "blur"},
            {
              min: 1,
              max: 100,
              message: "长度在 1 到 100 个字符",
              trigger: "blur",
            },
          ],
          fcpmcount: [
            {required: true, message: "请输入参会人数（人）", trigger: "blur"},
            {validator: checkInt, trigger: "blur"}],
          fconvenername: [
            {required: true, message: "请输入召集人", trigger: "change"},
            {
              min: 1,
              max: 3000,
              message: "长度在 1 到 3000 个字符",
              trigger: "change",
            },
          ],
          fcontactname: [
            {required: true, message: "请输入联系人", trigger: "change"},
            {
              min: 1,
              max: 3000,
              message: "长度在 1 到 3000 个字符",
              trigger: "change",
            },
          ],
          fconfname: [
            {required: true, message: "请输入会议室", trigger: "change"},
            {
              min: 1,
              max: 3000,
              message: "长度在 1 到 3000 个字符",
              trigger: "change",
            },
          ],
          fimportanceValue: [
            {required: true, message: "请输入重要程度", trigger: "change"},
            {
              min: 1,
              max: 3000,
              message: "长度在 1 到 3000 个字符",
              trigger: "change",
            },
          ],
          fstartdate: [
            {
              type: "string",
              required: true,
              message: "起始时间格式错误",
              trigger: "change",
            },
          ],
          fenddate: [
            {
              type: "string",
              required: true,
              message: "结束时间格式错误",
              trigger: "change",
            },
          ],
          fcompany:[
            {
               type: "string",
               required: true,
               message: "请选择公司",
               trigger: "change",
            },
          ],
        },
      }
    },
    methods: {
      closePerson(){
        this.formFlag++;
        this.searchForm.internalmans = [];
        this.searchForm.internalMansName = '';
      },
      // 参会人数变化，清空会议室
      fcpmcountMethod(){
        this.searchForm.fconfname = '';
      },
      //新建弹窗赋值默认值：当前user对应的人员信息
      getCurrentStaffInfo(){
        let fromdata={};
        fromdata.fcode = 'service10';
        fromdata.fid=localStorage.getItem('ms_userId');
        this.$api.confMangement
          .findTServiceItemByParams(fromdata)
          .then((res) => {
            if (res.data.code == 0) {
              // 召集人
              // this.searchForm.fconvenername = data.fname;
              this.$set(this.searchForm,"fconvenername",res.data.data.tname)
              this.searchForm.fconvener = res.data.data.toid;
              this.searchForm.fconvenerdeptname = res.data.data.tdepartmentname;
              this.searchForm.fconvenerdept = res.data.data.tdepartmentoid;
              // 联系人
              // this.searchForm.fcontactname = data.fname;
              this.$set(this.searchForm,"fcontactname",res.data.data.tname)
              this.searchForm.fcontact = res.data.data.toid;
              this.searchForm.fcontactdeptname = res.data.data.tdepartmentname;
              this.searchForm.fcontactdept = res.data.data.tdepartmentoid;
              //默认会议重要程度
              this.searchForm.fimportanceValue = '0';
            } else {
              this.$message.error(res.data.msg);
            }
          }),
          (error) => {
            console.log(error);
          };
      },
       setCompany(){

           this.searchForm.fcompanyid = this.searchForm.fcompany;
           this.options.forEach(item => {
               if(item.id == this.searchForm.fcompany) {
                   this.searchForm.fcompanyname = item.name
               }
           })
           console.log( this.searchForm)
       },
      //公司
      getCompany() {
        this.$api.jobUserManagement.getCompanyData().then(res => {
          if(res.status == '200') {
            this.options = res.data.data.rows
          }
        }), error => {
          console.log(error);
        }
      },
      // 提交
      submitConfApply(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.check();
            this.$api.confMangement
              .submitConfApply(this.searchForm)
              .then((res) => {
                if (res.data.code != 0 && res.data.msg == null) {
                  this.$message.error("进入流程失败");
                } else if (res.data.code == 0) {
                  this.dialogVisible = false;
                  this.closeDialog();
                  this.pageNum = 1;
                  this.$message.success("提交成功");
                } else {
                  this.$message.error(res.data.msg);
                }
              }),
              (error) => {
                console.log(error);
              };
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      // 暂存
      stagingConfApply(formName) {
        this.check();
        console.log(this.searchForm);
        this.$api.confMangement
          .stagingConfApply(this.searchForm)
          .then((res) => {
            if (res.data.code == 0) {
              this.dialogVisible = false;
              this.closeDialog();
              this.pageNum = 1;
              this.$message.success("暂存成功");
            } else {
              this.$message.error(res.data.msg);
            }
          });
      },
      // 暂存或提交form表单校验
      check() {
        switch (this.searchForm.fimportanceValue) {
          case "0":
            this.searchForm.fimportance = 0;
            break;
          case "1":
            this.searchForm.fimportance = 1;
            break;
          default:
            break;
        }
      },
      // 打开组织架构弹窗
      baseInputTable(type, title) {
        this.staffTableVisible = true;
        this.baseInputType = type; //公司:1,召集人:2,联系人:3
        this.baseInputTitle = title; //如:用户查询
      },
      // 关闭组织架构弹窗
      closeBaseInfo(data, title, type) {
        if (data == null || data.length === 0) {
        } else {
          if (type === "1") {
            // 公司
            this.searchForm.fcompanyname = data.fname;
            this.searchForm.fcompanyid = data.foid;
            this.fcompanyid = data.foid;
          } else if (type === "2") {
            // 召集人
            // this.searchForm.fconvenername = data.fname;
            this.$set(this.searchForm,"fconvenername",data.fname)
            this.searchForm.fconvener = data.foid;
            this.searchForm.fconvenerdeptname = data.fdeptname;
            this.searchForm.fconvenerdept = data.fdeptid;
          } else if (type === "3") {
            // 联系人
            // this.searchForm.fcontactname = data.fname;
            this.$set(this.searchForm,"fcontactname",data.fname);
            this.searchForm.fcontact = data.foid;
            this.searchForm.fcontactdeptname = data.fdeptname;
            this.searchForm.fcontactdept = data.fdeptid;
          } else if (type === "4") {
            let internalmans = [];
            let internalMansName = "";
            for (let i in data) {
              if (i < data.length - 1) {
                internalMansName += data[i].fname + ",";
              } else {
                internalMansName += data[i].fname;
              }
              let staff = {
                foid: data[i].foid,
                fname: data[i].fname,
              };
              internalmans.push(staff);
            }
            this.searchForm.internalmans = this.searchForm.internalmans.concat(internalmans);
            console.log(this.searchForm.internalmans);
            if(this.searchForm.internalMansName == ""){
              this.searchForm.internalMansName += internalMansName;
            }else{
              this.searchForm.internalMansName += ',' + internalMansName;
            }
          }
          this.staffTableVisible = false;
        }
        this.staffTableVisible = false;
      },
      // 打开会议室弹窗
      queryConfOffice(type) {
        if (this.searchForm.fstartdate == null) {
          this.$message.error("会议开始时间不可为空");
          return;
        }
        if (this.searchForm.fenddate == null) {
          this.$message.error("会议结束时间不可为空");
          return;
        }
        if (this.searchForm.fcpmcount == null) {
          this.$message.error("会议参与人数不可为空");
          return;
        }
        if(!this.searchForm.fcompany){
            this.$message.error("请选择公司");
            return;
        }
        this.type = type;
        this.fcompanyid = this.searchForm.fcompany;
        this.fstartdate = this.searchForm.fstartdate;
        this.fenddate = this.searchForm.fenddate;
        this.fvolume = parseInt(this.searchForm.fcpmcount);
        this.officeTableVisible = true;
      },
      // 关闭会议室弹窗
      closeConfOffice(data) {
        if (data != null) {
          this.searchForm.fconfname = data.fname;
          this.searchForm.fconfid = data.foid;
        }
        this.officeTableVisible = false;
      },
      // 关闭模态框时子组件传值给父组件
      closeDialog() {
        this.searchForm = {
          fovert: 0,
          fexternal: 0,
          // fcompanyid: "_DefaultCompanyOId",
          // fcompanyname: "福佳集团",
          fcreator: localStorage.getItem('ms_userId'),
        };
        let serchData = [];
        this.$emit("closeDialog", serchData);
      },
    },
  }
</script>

<style scoped>
  /deep/ .el-positionType {
    padding-left: 0px !important;
    padding-top: 6px;
  }

  /deep/ .el-dialog {
    margin-top: 5vh !important;
  }

  .el-internalMansName_ {
    padding: 10px 0 0 0 !important;
  }
</style>
